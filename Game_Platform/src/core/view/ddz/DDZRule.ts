module game {
    export enum CardRoot {
        THREE,
        FOUR,
        PLANE,
        SHUN_ZI,
        LIAN_DUI,
        KING_BOOM,
        BOOM
    }

    export class PokerCardMap {
        private map: { [index: number]: number; } = {};
        private cards:Array<number>;
        public getCountBySize(size:number):number{
            let c = 0;
            for(let k in this.map) {
                if(this.map[k] == size) {
                    c++;
                }
            }
            return c;
        }

        public getCountMorThanSize(size:number):number{
            let c = 0;
            for(let k in this.map) {
                if(this.map[k] >= size) {
                    c++;
                }
            }
            return c;
        }

        public getSingle(count:number):Array<number>  {
            let r = [];
            if(this.cards.length >= count) {
                CommonUtil.sortNumberArray(this.cards);
                for(let i=0;i<this.cards.length;i++) {
                    if(i < count) {
                        r.push(this.cards[i]);
                    }
                }
            }
            return r;
        }

        public getCardsBySize(size:number, count:number):Array<number> {
            let lianduiKeys = [];
            if(size == 2) {
                for(let execCard of DDZRule.analysis(this.cards, false, false)) {
                    if(execCard.cardRoot == CardRoot.LIAN_DUI) {
                        lianduiKeys = lianduiKeys.concat(execCard.getCardNumbers());
                    }
                }
            }
            let result = [];
            let klist = [];
            for(let k in this.map) {
                let kk = Number(k);
                if(this.map[k] == size && lianduiKeys.indexOf(kk) < 0) {
                    klist.push(kk);
                    count--;
                    if(count <= 0) {
                        break;
                    }
                }
            }

            for(let c of this.cards) {
                if(klist.indexOf(Math.floor(c / 4)) >= 0) {
                    result.push(c);
                }
            }
            return result;
        }

        public static convertFromCards(cards:Array<number>):PokerCardMap{
            let map: { [index: number]: number; } = {};
            for (let c of cards) {
                let p = new Poker(c);
                if (map[p.cardValue]) {
                    map[p.cardValue] = map[p.cardValue] + 1;
                } else {
                    map[p.cardValue] = 1;
                }
            }
            let pokerCardMap = new PokerCardMap();
            pokerCardMap.map = map;
            pokerCardMap.cards = cards;
            pokerCardMap.cards.sort((a:number, b:number):number=>{
                return a- b;
            })
            return pokerCardMap;
        }
    }

    export class PairInfo {
        public count: number = 0;
        public isDuizi: boolean = false;
        constructor(isDuizi: boolean, count: number) {
            this.isDuizi = isDuizi;
            this.count = count;
        }
    }

    export class BothSideFindPairInfo extends PairInfo {
        constructor(isDuizi: boolean, count: number,
            leftSide: number, rightSide: number, leftLimit: number) {
            super(isDuizi, count);
            this.leftSide = leftSide;
            this.leftLimit = leftLimit;
            this.rightSide = rightSide;
        }

        public leftSide: number;
        public rightSide: number;
        public leftLimit: number;

        public findDir = 1;

        private leftFail = false;
        private rightFail = false;

        public reset() {
            this.findDir = 1;
            this.leftFail = false;
            this.rightFail = false;
        }

        public fanxiang() {
            if (this.findDir == 1) this.findDir = -1;
            else {
                if (this.leftSide <= this.leftLimit) {
                    this.findDir = -1;
                    this.leftFail = true;
                }else {
                    this.findDir = 1;
                }
            }
        }

        public genNextFindTarget(): number {
            if (this.findDir == 1) {
                if (this.leftSide <= this.leftLimit) {
                    this.findDir = -1;
                    // 这种情况下 永远往右边找       
                    this.leftFail = true;
                    return this.rightSide + 1;
                }
                return this.leftSide - 1;
            }

            if (this.findDir == -1) {
                return this.rightSide + 1;
            }
        }

        public afterFindSuc() {
            if (this.findDir == 1) {
                this.leftSide--;
            }
            if (this.findDir == -1) {
                this.rightSide++;
            }
            this.count--;
        }

        public onFail() {
            if (this.findDir == 1) {
                this.leftFail = true;
            }
            if (this.findDir == -1) {
                this.rightFail = true;
            }
        }

        public isFail() {
            return this.leftFail && this.rightFail;
        }
    }

    export class DDZExecCards {
        public cardRoot: CardRoot;
        public cardList: Array<Poker> = [];

        public fixPlane() {
            if(this.cardRoot == CardRoot.THREE) {
                if(this.cardList.length >= 6) {
                    this.cardRoot = CardRoot.PLANE
                }
            }
        }

        public getCardNumbers():Array<number> {
            let result = [];
            for(let poker of this.cardList) {
                result.push(poker.cardNumber);
            }
            return result;
        }

        public equals(cards: DDZExecCards): boolean {
            if(!cards) return false;
            if (this.cardList.length != cards.cardList.length) return false;
            this.cardList.sort((a: Poker, b: Poker): number => { return a.cardNumber - b.cardNumber });
            cards.cardList.sort((a: Poker, b: Poker): number => { return a.cardNumber - b.cardNumber });
            let equal = true;
            for (let i = 0; i < this.cardList.length; i++) {
                if (!cards.cardList[i] || cards.cardList[i].cardNumber != this.cardList[i].cardNumber) {
                    equal = false;
                    break;
                }
            }
            return equal;
        }

        private _checkPairInfos: Array<PairInfo> = [];
        // 为了兼容之前的
        public get checkPaireInfo(): PairInfo {
            return this._checkPairInfos[0];
        }
        public set checkPaireInfo(pairInfo: PairInfo) {
            this._checkPairInfos[0] = pairInfo;
        }
        public addPairInfo(pairInfo: PairInfo) {
            this._checkPairInfos.push(pairInfo);
        }
        public get checkPairInfoList(): Array<PairInfo> {
            return this._checkPairInfos;
        }

        public getValueCount(cardValue: number) {
            let count = 0;
            for (let p of this.cardList) {
                if (p.cardValue == cardValue) count++;
            }
            return count;
        }
        public addRoot3Poker(poker: Poker) {
            if (this.getValueCount(poker.cardValue) >= 3) return;
            this.cardList.push(poker);
        }
        public addRoot2Poker(poker: Poker) {
            if (this.getValueCount(poker.cardValue) >= 2) return;
            this.cardList.push(poker);
        }
        private getCardRootStr(root: CardRoot) {
            if (root == CardRoot.THREE) {
                return "三张"
            } else if (root == CardRoot.FOUR) {
                return "四张"
            } else if (root == CardRoot.PLANE) {
                return "飞机"
            } else if (root == CardRoot.SHUN_ZI) {
                return "顺子"
            } else if (root == CardRoot.LIAN_DUI) {
                return "连对"
            } else if (root == CardRoot.KING_BOOM) {
                return "王炸"
            }
            return "";
        }
        public logSelf() {
            let log = "[Poker] : " + this.getCardRootStr(this.cardRoot) + "===";
            for (let card of this.cardList) {
                log += card.cardNumber + "|" + card.cardValue + ","
            }
            egret.log(log);
        }
    }

    export class Poker {
        public cardNumber: number;
        public cardValue: number;
        constructor(v: number) {
            this.cardNumber = v;
            this.cardValue = Math.floor(v / 4);
        }

    }

    export class DDZRule {

        public static IsDDZDebug:boolean = false;
        public static DEBUG_HAND_CARDS:Array<number> = [59,58,55,54,51,50,47,46,43,39,38,35,31,27,23,19];
        public static get DEBUG_TABLE_CARDS():game.ddz.TableCard {
            let tableCard = new game.ddz.TableCard();
			tableCard.setCards([23,22,35,34,33]);
			tableCard.cardType = game.ddz.CardType.THREE_TO_TWO;
            return tableCard;
        }

        private static findByRoot(cardRoot: CardRoot, minV: number, cards: Array<DDZExecCards>, limitCount: number): DDZExecCards {
            let list: Array<DDZExecCards> = [];
            for (let c of cards) {
                if (c.cardRoot == cardRoot && c.cardList.length == limitCount) {
                    list.push(c);
                }
            }
            if (list.length > 0) {
                list.sort((a: DDZExecCards, b: DDZExecCards): number => {
                    return a.cardList[0].cardNumber - b.cardList[0].cardNumber
                });
                for (let c of list) {
                    if (c.cardList[0].cardValue > minV) {
                        return c;
                    }
                }
            }
            return null;
        }

        private static findShunziMatch(minV: number, cards: Array<DDZExecCards>, limitCount: number): DDZExecCards {
            for (let card of cards) {
                if (card.cardRoot == CardRoot.SHUN_ZI) {
                    let begin = 0;
                    for (let i = 0; i < card.cardList.length; i++) {
                        if (card.cardList[i].cardValue >= minV) {
                            begin = i;
                            break;
                        }
                    }
                    let validCount = card.cardList.length - begin;
                    if (validCount < 4) continue;
                    if (validCount > limitCount) {
                        // 有多余//删除多余
                        let r = [];
                        for (let i = begin; i < begin + limitCount; i++) {
                            r.push(card.cardList[i]);
                        }
                        card.cardList = r;
                        return card;
                    } else {
                        let r = [];
                        for (let i = begin; i < begin + validCount; i++) {
                            r.push(card.cardList[i]);
                        }
                        card.cardList = r;
                        if (r.length < limitCount) {
                            // 设置查找对象
                            card.addPairInfo(new BothSideFindPairInfo(false, limitCount - validCount,
                                card.cardList[0].cardValue,
                                card.cardList[card.cardList.length - 1].cardValue,
                                minV));
                        }
                        return card;
                    }
                }
            }
            return null;
        }

        /*
        根据连对最小值 查找可以使用的连对（最起码两个匹配，后续再查找自动补牌）
        */
        private static findLianduiMatch(minV: number, cards: Array<DDZExecCards>): DDZExecCards {
            for (let card of cards) {
                if (card.cardRoot == CardRoot.LIAN_DUI) {
                    if (card.cardList.length < 4) continue;
                    let moreThanMinCount = 0;
                    let needRemoves = [];
                    for (let i = 0; i < card.cardList.length; i += 2) {
                        if (card.cardList[i].cardValue >= minV) {
                            moreThanMinCount++;
                        } else {
                            needRemoves.push(card.cardList[i], card.cardList[i + 1])
                        }
                    }
                    if (moreThanMinCount >= 2) {
                        // 可以作为选择
                        for (let p of needRemoves) {
                            let idx = card.cardList.indexOf(p);
                            card.cardList.splice(idx, 1);
                        }
                        return card;
                    }
                }
            }
            return null;
        }

        private static findMinBoom(cards: Array<DDZExecCards>): DDZExecCards {
            let boomList = [];
            for (let c of cards) {
                if (c.cardRoot == CardRoot.FOUR || c.cardRoot == CardRoot.KING_BOOM) {
                    boomList.push(c);
                }
            }
            if (boomList.length > 0) {
                boomList.sort((c1: DDZExecCards, c2: DDZExecCards): number => {
                    return c1.cardList[0].cardValue - c2.cardList[0].cardValue;
                });
                return boomList[0];
            }
            return null;
        }

        private static calcPlaneCount(cards: Array<number>): number {
            let map = DDZRule.convertToMap(cards);
            let c = 0;
            for (let k in map) {
                if (map[k] == 3) {
                    c++;
                }
            }
            return c;
        }

        public static selectOnTableNoBoom(pCards: Array<number>, tableCard: game.ddz.TableCard, selectCards:Array<number>): DDZExecCards {
            let pokerCards:Array<number> = DDZRule.excludeBoomCards(pCards);
            let cards = DDZRule.analysis(pokerCards, false, false)
            return DDZRule.selectOnTable(cards, tableCard, selectCards)            
        }

        public static excludeBoomCards(cards:Array<number>):Array<number>{
            // 先去除炸弹 出牌型
            let pokerCards = cards.concat([]);
            // 移除炸弹的选择项
            let map = DDZRule.convertToMap(pokerCards);
            let needRemove = [];
            for(let k in map) {
                if(map[k] == 4) {
                    // 需要移除k
                    let kk = Number(k);
                    needRemove.push(kk * 4, kk* 4+1, kk* 4+2, kk* 4+3);
                }
            }
            if(needRemove.length > 0) {
                for(let c of needRemove) {
                    let idx = pokerCards.indexOf(c);
                    if(idx >= 0) pokerCards.splice(idx,1);
                }
            }
            needRemove = [];
            for(let c of pokerCards) {
                if(c == 68 || c == 64) {
                    needRemove.push(c);
                }
            }
            if(needRemove.length == 2) {
                for(let c of needRemove) {
                    let idx = pokerCards.indexOf(c);
                    if(idx >= 0) pokerCards.splice(idx,1);
                }
            }
            
            return pokerCards
        }

        public static selectOnTable(cards: Array<DDZExecCards>, tableCard: game.ddz.TableCard, selectCards:Array<number>) {
            let cardResult: CardCheckResult = PokerUtil.checkType(tableCard.cards);
            let execCard: DDZExecCards = null;
            // 个人认为4带n的还是需要特殊处理一下
            if (tableCard.cardType == game.ddz.CardType.FOUR_TO_TWO) {
                if(selectCards.length >= 6) {
                    // 说明这个b还是选四带2 来压制 不是出炸来炸掉
                    execCard = DDZRule.findByRoot(CardRoot.FOUR, cardResult.card, cards, 4);
                    if(!execCard) {
                        // 你他妈选了牌 但是你这个4压根打不过对面，看样子 你还是要炸他吧 大哥
                        return DDZRule.findMinBoom(cards);
                    } else {
                        execCard.checkPaireInfo = new PairInfo(false, 2);
                        return execCard;
                    }
                } else {
                    // 否则直接炸掉
                    return DDZRule.findMinBoom(cards);
                }
            }
            if (tableCard.cardType == game.ddz.CardType.FOUR_TO_FOUR) {
                if(selectCards.length >= 8) {
                    // 说明这个b还是选四带2 来压制 不是出炸来炸掉
                    execCard = DDZRule.findByRoot(CardRoot.FOUR, cardResult.card, cards, 4);
                    if(!execCard) {
                        // 你他妈选了牌 但是你这个4压根打不过对面，看样子 你还是要炸他吧 大哥
                        return DDZRule.findMinBoom(cards);
                    } else {
                        execCard.checkPaireInfo = new PairInfo(true, 2);
                        return execCard;
                    }
                } else {
                    // 否则直接炸掉
                    return DDZRule.findMinBoom(cards);
                }
            }
            
            if (tableCard.cardType == game.ddz.CardType.THREE) {
                execCard = DDZRule.findByRoot(CardRoot.THREE, cardResult.card, cards, 3);
            }
            if (tableCard.cardType == game.ddz.CardType.THREE_TO_TWO) {
                execCard = DDZRule.findByRoot(CardRoot.THREE, cardResult.card, cards, 3);
                if (execCard) execCard.checkPaireInfo = new PairInfo(true, 1);
            }
            if (tableCard.cardType == game.ddz.CardType.THREE_TO_ONE) {
                execCard = DDZRule.findByRoot(CardRoot.THREE, cardResult.card, cards, 3);
                if (execCard) execCard.checkPaireInfo = new PairInfo(false, 1);
            }
            if (tableCard.cardType == game.ddz.CardType.PLANE) {
                // 飞机到底是几个 需要计算一下子
                let planeCount = DDZRule.calcPlaneCount(tableCard.cards);
                execCard = DDZRule.findByRoot(CardRoot.THREE, cardResult.card, cards, planeCount * 3);
                if (execCard) {
                    execCard.checkPaireInfo = new PairInfo((tableCard.cards.length - planeCount * 3) / planeCount == 2, planeCount);
                }
            }
            if (tableCard.cardType == game.ddz.CardType.MANY_DUAD) {
                //如果是连对的化 那么就找连对-1
                execCard = DDZRule.findLianduiMatch(cardResult.card, cards);
                if (execCard) {
                    let left = (tableCard.cards.length - execCard.cardList.length) / 2;
                    if (left > 0) {
                        execCard.addPairInfo(new BothSideFindPairInfo(true, left,
                            execCard.cardList[0].cardValue,
                            execCard.cardList[execCard.cardList.length - 1].cardValue,
                            tableCard.getFirstCard()));
                    } else {
                        for(let i=0;i<execCard.cardList.length;i++) {
                            if(i >= tableCard.cards.length) {
                                execCard.cardList.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
            }
            if (tableCard.cardType == game.ddz.CardType.SHUN_ZI) {
                execCard = DDZRule.findShunziMatch(cardResult.card + 1, cards, tableCard.cards.length);
            }
            
            return execCard;
        }

        public static findPlane(cards:Array<DDZExecCards>): DDZExecCards {
            for(let card of cards) {
                if(card.cardRoot == CardRoot.THREE && card.cardList.length > 3) {
                    // 是飞机
                    return card;
                }
            }
            return null;
        }

        public static selectOnConditionNoBoom(pokerCards:Array<number>): DDZExecCards {
            let cards = DDZRule.excludeBoomCards(pokerCards);
            let execCardsResults = DDZRule.analysis(cards, false, false);
            return DDZRule.select(execCardsResults);
        }

        public static selectBoom(pokerCards:Array<number>) {
            let execCardsResults = DDZRule.analysis(pokerCards, false, false);
            return DDZRule.findMinBoom(execCardsResults);
        }

        public static selectBoomCardNums(pokerCards:Array<number>):Array<number>{
            let execCardsResults = DDZRule.analysis(pokerCards, false, false);
            let c =  DDZRule.findMinBoom(execCardsResults);
            if(c) {
                return c.getCardNumbers();
            }
            return [];
        }

        public static selectKingBoomCardNums(pokerCards:Array<number>):Array<number>{
            let r = [];
            for(let c of pokerCards) {
                if(c == 68 || c == 64) {
                    r.push(c);
                }
            }
            if(r.length == 2) {
                return r;
            }
            return [];
        }

        public static selectBoomBiggerThan(pokerCards:Array<number>, limit:number):Array<number>{
            let map = DDZRule.convertToMap(pokerCards);
            for(let k in map) {
                let kk = Number(k);
                if(kk > limit && map[k] == 4) {
                    // 就是你了
                    let r = [];
                    for(let c of pokerCards) {
                        if(Math.floor(c / 4) == kk) {
                            r.push(c);
                        }
                    }
                    return r;
                }
            }
            return null;
        }

        public static select(cards: Array<DDZExecCards>): DDZExecCards {
            if(cards.length == 0) return null;
            if (cards.length == 1) {
                return cards[0];
            }
            
            let plane = DDZRule.findPlane(cards);
            if (plane) return plane;

            let max = cards[0].cardList.length;
            let maxExec = cards[0];
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].cardList.length > max) {
                    maxExec = cards[i];
                    max = cards[i].cardList.length;
                }
            }
            let avalibaleList:Array<DDZExecCards> = [];
            for(let card of cards) {
                if(card.cardList.length == max) {
                    avalibaleList.push(card);
                }
            }
            // 优先选择连对
            let liandui = null
            for(let card of avalibaleList) {
                if(card.cardRoot == CardRoot.LIAN_DUI) {
                    liandui = card;
                }
            }

            if(liandui) {
                return liandui;
            }

            return maxExec;
        }

        public static convertToMap(cards: Array<number>) {
            let map: { [index: number]: number; } = {};
            for (let c of cards) {
                let p = new Poker(c);
                if (map[p.cardValue]) {
                    map[p.cardValue] = map[p.cardValue] + 1;
                } else {
                    map[p.cardValue] = 1;
                }
            }
            return map;
        }

        private static findDirect2InCards(cards: Array<number>, cardValue: number, suggest: number = 2): number[] {
            let map = DDZRule.convertToMap(cards);
            for (let k in map) {
                if (map[k] == suggest) {
                    let cValue = Number(k);
                    if (cValue == cardValue) {
                        // 存在
                        let r = [];
                        for (let c of cards) {
                            if (Math.floor(c / 4) == cardValue) {
                                r.push(c);
                                if (r.length == 2) {
                                    return r;
                                }
                            }
                        }
                        return r;
                    }
                }
            }
            return [];
        }

        private static findSingleInCards(cards: Array<number>, cardValue: number, suggest: number = 1): number {
            let map = DDZRule.convertToMap(cards);
            for (let k in map) {
                if (map[k] == suggest) {
                    let cValue = Number(k);
                    if (cValue == cardValue) {
                        for (let c of cards) {
                            if (Math.floor(c / 4) == cardValue) {
                                return c;
                            }
                        }
                    }
                }
            }
            return 0;
        }

        private static findRandomSingleInCards(cards: Array<number>, count: number, suggest: number = 1): Array<number> {
            // 为了不污染传入数组参数，执行copy操作
            let clone = cards.concat([]);
            let map = DDZRule.convertToMap(clone);
            let keys:Array<number> = [];
            for (let k in map) {
                if (map[k] == suggest) {
                    keys.push(Number(k));
                }
            }
            keys.sort((a:number, b:number):number=>{return a - b;});
            let r = [];
            for(let k of keys) {
                if(r.length >= count) break;
                for(let i=0; i<clone.length;i++) {
                    let value = clone[i];
                    if(Math.floor(value / 4) == k) {
                        r.push(value);
                        clone.splice(i, 1);
                        i--;
                        if(r.length >= count) break;
                    }
                }
            }
            return r;
        }

        public static searchDuiziBothSideThreeStage(cards1: Array<number>, cards2: Array<number>, cards3: Array<number>, pairInfo: BothSideFindPairInfo, suggest: number = 2) {
            if (pairInfo.count == 0) return [];
            CommonUtil.subArr(cards2, cards1)
            CommonUtil.subArr(cards3, cards1)
            CommonUtil.subArr(cards3, cards2)
            let collectArr = [cards1, cards2, cards3];
            let avalibale = [];
            let reuslt = [];
            let checkCount = 0;
            for (let arr of collectArr) {
                avalibale = avalibale.concat(arr);
                if (avalibale.length < 2) continue;
                if (pairInfo.count == 0) return reuslt;
                let r = [];
                do {
                    let target = pairInfo.genNextFindTarget();
                    if(target == 15) {
                        // 2不能找
                        pairInfo.onFail();
                        pairInfo.fanxiang();
                    } else {
                        r = DDZRule.findDirect2InCards(avalibale, target, suggest);
                        if (r.length > 0) {
                            // 找到了
                            pairInfo.afterFindSuc();
                            CommonUtil.subArr(avalibale, r);
                            reuslt = reuslt.concat(r);
                        } else {
                            pairInfo.onFail();
                        }
                        pairInfo.fanxiang();
                    }
                    if(checkCount++ > 20) {
                        // 防止死循环
                        console.warn("其实逻辑意义上出现了死循环，但是触发保护 让程序继续了");
                        break;
                    }
                } while (pairInfo.count > 0 && !pairInfo.isFail())
            }
            return reuslt;
        }

        public static searchSingleBothSideThreeStage(cards1: Array<number>, cards2: Array<number>, cards3: Array<number>, pairInfo: BothSideFindPairInfo, suggest: number = 2) {
            if (pairInfo.count == 0) return [];
            CommonUtil.subArr(cards2, cards1)
            CommonUtil.subArr(cards3, cards1)
            CommonUtil.subArr(cards3, cards2)
            let collectArr = [cards1, cards2, cards3];
            let avalibale = [];
            let reuslt = [];
            let checkCount = 0;
            for (let arr of collectArr) {
                avalibale = avalibale.concat(arr);
                if(avalibale.length == 0) continue;
                pairInfo.reset();
                if (pairInfo.count == 0) return reuslt;
                do {
                    let target = pairInfo.genNextFindTarget();
                    if(target == 15) {
                        // 2 不能找
                        pairInfo.onFail();
                        pairInfo.fanxiang();
                    } else {
                        let findCard = DDZRule.findSingleInCards(avalibale, target, suggest);
                        if (findCard > 0) {
                            // 找到了
                            pairInfo.afterFindSuc();
                            CommonUtil.subArr(avalibale, [findCard]);
                            reuslt.push(findCard);
                        } else {
                            pairInfo.onFail();
                        }
                        pairInfo.fanxiang();
                    }
                    if(checkCount++ > 20) {
                        // 防止死循环
                        console.warn("其实逻辑意义上出现了死循环，但是触发保护 让程序继续了");
                        break;
                    }
                } while (pairInfo.count > 0 && !pairInfo.isFail())
            }
            return reuslt;
        }
        // suggect 永不可能为4 需要符合用不拆炸弹原则, 查找结果必须从小到大
        public static searchSingleThreeStage(cards1: Array<number>, cards2: Array<number>, cards3: Array<number>, count:number, suggest: number = 2) {
            if (count <= 0) return [];
            CommonUtil.subArr(cards2, cards1)
            CommonUtil.subArr(cards3, cards1)
            CommonUtil.subArr(cards3, cards2)
            let collectArr = [cards1, cards2, cards3];
            let avalibale = [];
            let result = [];
            for (let arr of collectArr) {
                avalibale = avalibale.concat(arr);
                if(avalibale.length == 0) continue;
                let r = DDZRule.findRandomSingleInCards(avalibale, count, suggest);
                if(r.length > 0) {
                    count -= r.length;
                    CommonUtil.subArr(avalibale, r);
                    result = result.concat(r);
                    if(count <= 0) break;
                }
            }
            return result;
        }

        public static searchDuiziThreeStage(cards1: Array<number>, cards2: Array<number>, cards3: Array<number>, count: number) {
            CommonUtil.subArr(cards2, cards1)
            CommonUtil.subArr(cards3, cards1)
            CommonUtil.subArr(cards3, cards2)
            let collectArr = [cards1, cards2, cards3];
            let avalibale = [];
            let result = [];
            for (let arr of collectArr) {
                avalibale = avalibale.concat(arr);
                let pairResult = game.DDZRule.searchDuizi(avalibale, count);
                CommonUtil.subArr(avalibale, pairResult);
                result = result.concat(pairResult);
                if (pairResult.length >= count * 2) {
                    // 已经找全了
                    break;
                }
            }
            return result;
        }

        public static searchDuizi(cards: Array<number>, count: number) {
            let result = [];
            if (cards.length < count * 2) {
                return result;
            }
            function getValueCount(cardValue: number, duiziReuslt: Array<Poker>) {
                let count = 0;
                for (let p of duiziReuslt) {
                    if (p.cardValue == cardValue) count++;
                }
                return count;
            }
            cards.sort((a: number, b: number): number => { return a - b });
            let pokerList: Array<Poker> = [];
            let map: { [index: number]: number; } = {};
            for (let c of cards) {
                let p = new Poker(c);
                pokerList.push(p);
                if (map[p.cardValue]) {
                    map[p.cardValue] = map[p.cardValue] + 1;
                } else {
                    map[p.cardValue] = 1;
                }
            }
            pokerList.sort((a: Poker, b: Poker): number => {
                return a.cardValue - b.cardValue;
            })
            // 优先找对子
            let duiziCards = [];
            for (let k in map) {
                if (map[k] >= 2) {
                    duiziCards.push(Number(k));
                }
            }
            duiziCards.sort((a: number, b: number): number => { return a - b });
            let duiziReuslt: Array<Poker> = [];
            for (let i = 0; i < count; i++) {
                let c = duiziCards[i];
                for (let poker of pokerList) {
                    if (poker.cardValue == c && getValueCount(c, duiziReuslt) < 2) {
                        duiziReuslt.push(poker);
                    }
                }
            }
            for (let r of duiziReuslt) {
                result.push(r.cardNumber);
            }
            return result;
        }

        public static searchPlanePair(cards: Array<number>, count: number) {
            let result = [];
            if (cards.length < count) {
                return result;
            }
            function getValueCount(cardValue: number, duiziReuslt: Array<Poker>) {
                let count = 0;
                for (let p of duiziReuslt) {
                    if (p.cardValue == cardValue) count++;
                }
                return count;
            }
            cards.sort((a: number, b: number): number => { return a - b });
            let pokerList: Array<Poker> = [];
            let map: { [index: number]: number; } = {};
            for (let c of cards) {
                let p = new Poker(c);
                pokerList.push(p);
                if (map[p.cardValue]) {
                    map[p.cardValue] = map[p.cardValue] + 1;
                } else {
                    map[p.cardValue] = 1;
                }
            }
            pokerList.sort((a: Poker, b: Poker): number => {
                return a.cardValue - b.cardValue;
            })
            // 优先找对子
            let duiziCards = [];
            for (let k in map) {
                if (map[k] >= 2) {
                    duiziCards.push(Number(k));
                }
            }
            duiziCards.sort((a: number, b: number): number => { return a - b });
            if (duiziCards.length < count) {
                // 找单张
                for (let i = 0; i < count; i++) {
                    result.push(cards[i]);
                }
            } else {
                let duiziReuslt: Array<Poker> = [];
                for (let i = 0; i < count; i++) {
                    let c = duiziCards[i];
                    for (let poker of pokerList) {
                        if (poker.cardValue == c && getValueCount(c, duiziReuslt) < 2) {
                            duiziReuslt.push(poker);
                        }
                    }
                }
                for (let r of duiziReuslt) {
                    result.push(r.cardNumber);
                }
            }
            return result;
        }

        /// 给出所有可执行的主牌,目前完成找出3张以上的
        public static analysis(cards: Array<number>, allow2liandui: boolean = true, allow4shunzi: boolean = true): Array<DDZExecCards> {
            let result = [];
            let pokerList: Array<Poker> = [];
            let map: { [index: number]: number; } = {};
            let king1: Poker = null;
            let king2: Poker = null;
            for (let c of cards) {
                let p = new Poker(c);
                pokerList.push(p);
                if (map[p.cardValue]) {
                    map[p.cardValue] = map[p.cardValue] + 1;
                } else {
                    map[p.cardValue] = 1;
                }
                if (c == 68) {
                    king1 = p;
                }
                if (c == 64) {
                    king2 = p;
                }
            }
            // 找顺子
            pokerList.sort((a: Poker, b: Poker): number => {
                return a.cardNumber - b.cardNumber;
            })
            DDZRule.DebugLogCards(pokerList);
            let copyList = [];
            for (let c of pokerList) {
                copyList.push(c);
            }
            // 王炸先领出来
            if (king1 && king2) {
                let c: DDZExecCards = new DDZExecCards();
                c.cardRoot = CardRoot.KING_BOOM;
                c.cardList.push(king1);
                c.cardList.push(king2);
                c.logSelf();
                result.push(c)
            }
            let shunziArr = DDZRule.findShunzi(copyList, allow4shunzi);
            for (let shunzi of shunziArr) {
                shunzi.logSelf();
                result.push(shunzi);
            }
            // 找主牌4张
            for (let k in map) {
                if (map[k] == 4) {
                    let c: DDZExecCards = new DDZExecCards();
                    c.cardRoot = CardRoot.FOUR;
                    for (let p of pokerList) {
                        if (p.cardValue == Number(k)) {
                            c.cardList.push(p);
                        }
                    }
                    c.logSelf();
                    result.push(c)
                }
            }

            DDZRule.findRoot3(map, pokerList, result);
            DDZRule.findLiandui(map, pokerList, result, allow2liandui);
            for (let r of result) {
                r.logSelf();
            }
            return result;
        }

        private static findLiandui(map: { [index: number]: number; },
            pokerList: Array<Poker>, result: Array<DDZExecCards>, allow2liandui: boolean = true) {
            let limit = allow2liandui ? 2 : 3;
            // 找主牌连对  应为有自动补牌机制 这里找两队以上即可
            let cards = [];
            for (let k in map) {
                if (map[k] >= 2) {
                    cards.push(Number(k));
                }
            }
            cards.sort((a: number, b: number): number => { return a - b });
            let begin = 0;
            let contiuneCount = 1;
            for (let i = 1; i < cards.length; i++) {
                if (cards[i] == (cards[i - 1] + 1)) {
                    if(cards[i] != 15) contiuneCount++;
                    if (i == (cards.length - 1)) {
                        if (contiuneCount >= limit) {
                            let c: DDZExecCards = new DDZExecCards();
                            c.cardRoot = CardRoot.LIAN_DUI;
                            for (let j = begin; j <= begin + contiuneCount; j++) {
                                for (let p of pokerList) {
                                    if (p.cardValue == cards[j]) {
                                        c.addRoot2Poker(p);
                                    }
                                }
                            }
                            result.push(c);
                        }
                    }
                } else {
                    if (contiuneCount >= limit) {
                        let c: DDZExecCards = new DDZExecCards();
                        c.cardRoot = CardRoot.LIAN_DUI;
                        for (let j = begin; j < i; j++) {
                            for (let p of pokerList) {
                                if (p.cardValue == cards[j]) {
                                    c.addRoot2Poker(p);
                                }
                            }
                        }
                        result.push(c);
                    }
                    begin = i;
                    contiuneCount = 1;
                }
            }
        }

        private static findRoot3(map: { [index: number]: number; }, pokerList: Array<Poker>, result: Array<DDZExecCards>) {
            // 找主牌3张 这里面会有飞机 需要把连续的找出来
            let cards = [];
            for (let k in map) {
                if (map[k] >= 3) {
                    cards.push(Number(k));
                }
            }
            cards.sort((a: number, b: number): number => { return a - b });
            for (let card of cards) {
                let c: DDZExecCards = new DDZExecCards();
                c.cardRoot = CardRoot.THREE;
                for (let p of pokerList) {
                    if (p.cardValue == card) {
                        c.addRoot3Poker(p);
                    }
                }
                result.push(c);
            }
            let begin = 0;
            let contiuneCount = 1;
            for (let i = 1; i < cards.length; i++) {
                if (cards[i] == (cards[i - 1] + 1)) {
                    contiuneCount++;
                    if (i == (cards.length - 1)) {
                        let c: DDZExecCards = new DDZExecCards();
                        c.cardRoot = CardRoot.THREE;
                        for (let j = begin; j <= i; j++) {
                            for (let p of pokerList) {
                                if (p.cardValue == cards[j]) {
                                    c.addRoot3Poker(p);
                                }
                            }
                        }
                        result.push(c);
                    }
                } else {
                    let c: DDZExecCards = new DDZExecCards();
                    c.cardRoot = CardRoot.THREE;
                    for (let j = begin; j < i; j++) {
                        for (let p of pokerList) {
                            if (p.cardValue == cards[j]) {
                                c.addRoot3Poker(p);
                            }
                        }
                    }
                    result.push(c);
                    begin = i;
                    contiuneCount = 1;
                }
            }
        }

        private static findShunzi(pokerList: Array<Poker>, allow4shunzi:boolean = true) {
            // 由于顺子的特殊性，去除cardvalue 相同的牌 去除大小王
            let findCount = allow4shunzi ? 4 : 5;
            let needRemove = [];
            for (let i = 1; i < pokerList.length; i++) {
                if (pokerList[i].cardValue == pokerList[i - 1].cardValue) {
                    needRemove.push(pokerList[i])
                }
                if (pokerList[i].cardNumber == 64 || pokerList[i].cardNumber == 68) {
                    needRemove.push(pokerList[i]);
                }
            }
            for (let p of needRemove) {
                pokerList.splice(pokerList.indexOf(p), 1);
            }
            DDZRule.DebugLogCards(pokerList);
            let arr: Array<DDZExecCards> = [];
            let begin = pokerList[0];
            let beginIndex = 0;
            let continueCount = 1;
            for (let i = 1; i < pokerList.length; i++) {
                // 15表示的意思是2
                if (pokerList[i].cardValue == (pokerList[i - 1].cardValue + 1)) {
                    // 延续
                    if(pokerList[i].cardValue != 15) {
                        continueCount++;
                    }
                    let max = pokerList[i].cardValue == 15 ? i - 1 : i;
                    if (i == (pokerList.length - 1)) {
                        if (continueCount >= findCount) {
                            // 这个顺子返回
                            let c = new DDZExecCards();
                            c.cardRoot = CardRoot.SHUN_ZI;
                            c.cardList = [];
                            for (let j = beginIndex; j <= max; j++) {
                                c.cardList.push(pokerList[j]);
                            }
                            arr.push(c)
                        }
                    }
                } else {
                    if (continueCount >= findCount) {
                        // 这个顺子返回
                        let c = new DDZExecCards();
                        c.cardRoot = CardRoot.SHUN_ZI;
                        c.cardList = [];
                        for (let j = beginIndex; j < i; j++) {
                            c.cardList.push(pokerList[j]);
                        }
                        arr.push(c)
                    }
                    begin = pokerList[i];
                    beginIndex = i;
                    continueCount = 1;
                }
            }
            return arr;
        }

        private static DebugLogCards(pokerList: Array<Poker>) {
            let s = "";
            for (let card of pokerList) {
                s += card.cardNumber + "|" + card.cardValue + ","
            }
            egret.log(s);
        }
    }
}