module game {

    export class CardSegment {
        public cardValue:number = 0;
        public cardList:Array<number> = [];
        public nextSegment:CardSegment;
        public prevSegment:CardSegment;
    }

    export class CardResultItem {
        public cardList:Array<number>;
        public cardRoot:CardRoot;
        constructor(cardList:Array<number>, cardRoot:CardRoot) {
            this.cardList = cardList;
            this.cardRoot = cardRoot;
        }
    }

    export class CardResultItemUnit {
        public resultItems:Array<CardResultItem> = [];

        public finalCards:Array<number> = [];

        public addCardResultItem(resultItem:CardResultItem) {
            for(let item of this.resultItems) {
                if(item.cardRoot == resultItem.cardRoot) {
                    if(CommonUtil.isAllNumInOtherArr(item.cardList, resultItem.cardList)) {
                        if(resultItem.cardList.length > item.cardList.length) {
                            item.cardList = resultItem.cardList;
                        }
                    } else if(CommonUtil.isAllNumInOtherArr(resultItem.cardList, item.cardList)){
                        return;
                    } else {
                        this.resultItems.push(resultItem)
                    }
                }
            }
        }

        public filter() {
            // 过滤掉重复 显示
            let needRemove = [];
            for(let item of this.resultItems) {
                for(let item1 of this.resultItems) {
                    if(item != item1) {
                         if(CommonUtil.isAllNumInOtherArr(item.cardList, item1.cardList)) {
                            needRemove.push(item);
                         }
                    }
                }
            }
            for(let item of needRemove) {
                let idx = this.resultItems.indexOf(item);
                if(idx >= 0) this.resultItems.splice(idx, 1);
            }
        }

        public getCount() {
            if(this.finalCards.length == 0) {
                for(let item of this.resultItems) {
                    for(let c of item.cardList) {
                        if(this.finalCards.indexOf(c) < 0) {
                            this.finalCards.push(c);
                        }
                    }
                }
            }
            return this.finalCards.length;
        }

        public contains(cardRoot:CardRoot) {
            for(let item of this.resultItems) {
                if(item.cardRoot == cardRoot) {
                    return true;
                }
            }
            return false;
        }

        public toString():string {
            let s = "";
            for(let item of this.resultItems) {
                for(let c of item.cardList) {
                    s += c + ","
                }
                s += "|||"
            }
            return s;
        }

        public toCardValueString():string {
            let s = "";
            for(let item of this.resultItems) {
                for(let c of item.cardList) {
                    s += Math.floor(c / 4) + ","
                }
                s += "|||"
            }
            return s;
        }
    }

    export class CardResultGroup {
        public cardResultItem:CardResultItem;
        private totalCards:Array<number>;
        constructor(cards:Array<number>, cardRoot:CardRoot, totalCards:Array<number>) {
            this.cardResultItem = new CardResultItem(cards, cardRoot);
            this.totalCards = totalCards.concat([]);
            this.totalCards = CommonUtil.subArr(totalCards, cards);
        }   

        public avalialeItems:Array<CardResultItemUnit> = [];

        public getResultCount() {
            return this.avalialeItems.length;
        }

        public findOthers() {
            // 只有3层查找
            this.avalialeItems = this.findLevel2(this.findLevel1());
        }

        public findLevel1() {
            let itemUnit = new CardResultItemUnit();
            itemUnit.resultItems.push(this.cardResultItem);
            let avalialeItems:Array<CardResultItemUnit> = [];
            let cardSegment = DDZIntelligent.genCardSegment(this.totalCards);
            let r = DDZIntelligent.findSingleShunzi(cardSegment, false);
            for(let rr of r) {
                itemUnit.resultItems.push(new CardResultItem(rr, CardRoot.SHUN_ZI))
            }
            r = DDZIntelligent.findSinglePlane(cardSegment, false);
            for(let rr of r) {
                let itemUnit = new CardResultItemUnit();
                itemUnit.resultItems.push(new CardResultItem(rr, CardRoot.PLANE))
            }
            r = DDZIntelligent.findSingleLiandui(cardSegment, false);
            for(let rr of r) {
                let itemUnit = new CardResultItemUnit();
                itemUnit.resultItems.push(new CardResultItem(rr, CardRoot.LIAN_DUI))
            }
            avalialeItems.push(itemUnit);
            return avalialeItems;
        }

        public findLevel2(avalialeItems:Array<CardResultItemUnit>) {
            for(let r of avalialeItems) {
                let copy = CommonUtil.copyNumberArray(this.totalCards);
                for(let a of r.resultItems) {
                    CommonUtil.subArr(copy, a.cardList);
                }
                if(copy.length >= 5) {
                    let cardSegment = DDZIntelligent.genCardSegment(copy);
                    let r1 = DDZIntelligent.findSingleShunzi(cardSegment, false);
                    if(r1.length > 0) {
                        r.resultItems.push(new CardResultItem(r1[r1.length - 1], CardRoot.SHUN_ZI));
                        CommonUtil.subArr(copy, r1[r1.length - 1]);
                    }
                    r1 = DDZIntelligent.findSinglePlane(cardSegment, false);
                    if(r1.length > 0) {
                        r.resultItems.push(new CardResultItem(r1[r1.length - 1], CardRoot.PLANE));
                        CommonUtil.subArr(copy, r1[r1.length - 1]);
                    }
                    r1 = DDZIntelligent.findSingleLiandui(cardSegment, false);
                    if(r1.length > 0) {
                        r.resultItems.push(new CardResultItem(r1[r1.length - 1], CardRoot.LIAN_DUI));
                        CommonUtil.subArr(copy, r1[r1.length - 1]);
                    }
                } 
                // 这些都处理完了 找出剩余所有的三同
                if(copy.length > 2) {
                    let cardSegment = DDZIntelligent.genCardSegment(copy);
                    let three = DDZIntelligent.findAllThree(cardSegment);
                    for(let cthree of three) {
                        r.resultItems.push(new CardResultItem(cthree, CardRoot.THREE));
                    }
                } 
                for(r of avalialeItems) {
                    r.filter();
                    egret.log(r.toCardValueString());
                }
            }
            return avalialeItems;
        }

        public printSelfNode() {
            let s = "";
            for(let c of this.cardResultItem.cardList) {
                s += c + "|" + Math.floor(c / 4) + ","
            }
            egret.log(s);
        }

        public printSelf() {
            for(let itemArr of this.avalialeItems) {
                egret.log(itemArr.toString());
            }
        }
    }

    export class DDZIntelligent {
        constructor() {

        }

        public static test() {
            // let debugArr = [15,14,19,18,23,22,27,26,31,30,35,39,43,47,51,55,59];
            // let debugArr = [35,34,39,38,43,42,41,47,46,45,51,50,49,55,54,53,59];
            let debugArr = [63,62,59,55,51,50,47,46,45,43,35,27,23,22,21,19,18,17];
            DDZIntelligent.getMaxCardResult(debugArr);
        }

        public static getMaxCardResult(cards:Array<number>):Array<CardResultItem> {
            let t = egret.getTimer();
            let cardResultGroups = DDZIntelligent.tryToFindAllShunzi(cards)
            for(let c of DDZIntelligent.tryToFindAllPlane(cards)) {
                cardResultGroups.push(c);
            }
            for(let c of DDZIntelligent.tryToFindAllLiandui(cards)) {
                cardResultGroups.push(c);
            }
            let cardSegment = DDZIntelligent.genCardSegment(cards);
            let rr = DDZIntelligent.findAllThree(cardSegment);
            for(let c of rr) {
                cardResultGroups.push(new CardResultGroup(c, CardRoot.THREE, CommonUtil.copyNumberArray(cards)));
            }
            let avalialeItems:Array<CardResultItemUnit> = [];
            for(let cardResult of cardResultGroups) {
                cardResult.findOthers();
                for(let a of cardResult.avalialeItems) {
                    avalialeItems.push(a);
                }
            }
            /*
            if(avalialeItems.length == 0) {
                // 找出所有三同
                let cardSegment = DDZIntelligent.genCardSegment(cards);
                let rr = DDZIntelligent.findAllThree(cardSegment);
                let final = new CardResultItemUnit();
                if(rr.length > 0) {
                    for(let r of rr) {
                        final.resultItems.push(new CardResultItem(r, CardRoot.THREE));
                    }
                }
                avalialeItems.push(final)
            }
            */
            let end = egret.getTimer();
            egret.log("DDZIntelligent find 智能组合消耗时间 : " + (end - t));
            let maxCardResult = avalialeItems[0];
            for(let cardResult of avalialeItems) {
                if(maxCardResult.contains(CardRoot.PLANE)) {
                    if(cardResult.contains(CardRoot.PLANE)) {
                        if(cardResult.getCount() > maxCardResult.getCount()) {
                            maxCardResult = cardResult;
                        }
                    }
                } else {
                      if(cardResult.contains(CardRoot.PLANE)) {
                          maxCardResult = cardResult;
                      } else if(cardResult.getCount() > maxCardResult.getCount()) {
                        maxCardResult = cardResult;
                    }
                }
            }
            if(maxCardResult) {
                egret.log(maxCardResult.toString());
                return maxCardResult.resultItems;
            }
            return [];
        }

        public static genCardSegment(cards:Array<number>):CardSegment {
            CommonUtil.sortNumberArray(cards);
            let curSegment = new CardSegment();
            let begin = curSegment;
            curSegment.cardValue = Math.floor(cards[0] / 4);
            curSegment.cardList.push(cards[0]);
            for(let i=1;i<cards.length;i++) {
                let c = cards[i];
                let cc = Math.floor(c / 4);
                if(cc == curSegment.cardValue) {
                    curSegment.cardList.push(c);
                } else {
                    let ori = curSegment;
                    curSegment = new CardSegment();
                    ori.nextSegment = curSegment;
                    curSegment.prevSegment = ori;
                    curSegment.cardValue = cc;
                    curSegment.cardList.push(c);
                }
            }
            return begin;
        }
        // 一个特殊的分法 4 王炸 剩余
        public static genCardSegment2(cards:Array<number>):CardSegment {
            CommonUtil.sortNumberArray(cards);
            let kingSegment = null;
            if(cards.indexOf(68) >= 0 && cards.indexOf(64) >= 0) {
                kingSegment = new CardSegment();
                kingSegment.cardList.push(68,64);
            }
            let list = [];
            let curSegment = new CardSegment();
            let begin = curSegment;
            curSegment.cardValue = Math.floor(cards[0] / 4);
            curSegment.cardList.push(cards[0]);
            list.push(curSegment);
            for(let i=1;i<cards.length;i++) {
                let c = cards[i];
                let cc = Math.floor(c / 4);
                if(cc == curSegment.cardValue) {
                    curSegment.cardList.push(c);
                } else {
                    curSegment = new CardSegment();
                    curSegment.cardValue = cc;
                    curSegment.cardList.push(c);
                    list.push(curSegment);
                }
            }
            let boomList = [];
            for(let c of list) {
                if(c.cardList.length == 4) {
                    boomList.push(c);
                }
            }
            let newList = [];
            for(let b of boomList) {
                newList.push(b);
            }
            if(kingSegment) {
                newList.push(kingSegment);
            }

            for(let c of list) {
                if(newList.indexOf(c) < 0) {
                    newList.push(c);
                }
            }

            for(let i=0;i<newList.length;i++) {
                if(newList[i + 1]) {
                    newList[i].nextSegment = newList[i + 1];
                }
                if(i >= 1) {
                    newList[i].prevSegment = newList[i - 1];
                }
            }
            return newList[0];
        }


        private static getAllSingleCards(cards:Array<number>):Array<number> {
            let result = [];
            let map = DDZRule.convertToMap(cards);
            for(let k in map) {
                if(map[k] == 1) {
                    let kk = Number(k);
                    result.push(kk);
                }
            }
            return result;
        }

        public static tryToFindAllShunzi(cards:Array<number>):Array<CardResultGroup>{
            let cardSegment = DDZIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of DDZIntelligent.findSingleShunzi(begin)) {
                    result.push(new CardResultGroup(r, CardRoot.SHUN_ZI, CommonUtil.copyNumberArray(cards)));
                }
            }while(begin = begin.nextSegment);
            return result;
        }

        public static tryToFindAllPlane(cards:Array<number>):Array<CardResultGroup>{
            let cardSegment = DDZIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of DDZIntelligent.findSinglePlane(begin)) {
                    result.push(new CardResultGroup(r, CardRoot.PLANE, CommonUtil.copyNumberArray(cards)));
                }
            }while(begin = begin.nextSegment);
            return result;
        }

        public static tryToFindAllLiandui(cards:Array<number>):Array<CardResultGroup>{
            let cardSegment = DDZIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of DDZIntelligent.findSingleLiandui(begin)) {
                    result.push(new CardResultGroup(r, CardRoot.LIAN_DUI, CommonUtil.copyNumberArray(cards)));
                }
            }while(begin = begin.nextSegment);
            return result;
        }

        public static findSingleLiandui(cardSegment:CardSegment, firstStage:boolean = true):number[][] {
            let result = [];
            let count = 0;
            let begin = cardSegment;
            let cur = begin;
            do{
                if(cur.cardList.length < 2) {
                    count = 0;
                    if(firstStage) {
                        break;
                    }
                    continue;
                } else {
                    if((cur == begin) || !cur.prevSegment || (cur.prevSegment.cardList.length >= 2 && cur.cardValue == (cur.prevSegment.cardValue + 1))){
                        count++;
                        if(count >= 3) {
                            result.push(DDZIntelligent.helpSegmentToCards(begin, count, 2));
                        }
                    } else {
                        count = 1;
                        begin = cur;
                        if(firstStage) {
                            break;
                        }
                    }
                }
            }while((cur = cur.nextSegment) && cur.cardValue != 15)
            return result;
        }

        public static findAllThree(cardSegment:CardSegment):number[][] {
            let result = [];
            let begin = cardSegment;
            let cur = begin;
            do{
                if(cur.cardList.length == 3) {
                    result.push(cur.cardList);
                }
            }while(cur = cur.nextSegment)
            return result;
        }

        public static findSinglePlane(cardSegment:CardSegment, firstStage:boolean = true):number[][] {
            let result = [];
            let count = 0;
            let begin = cardSegment;
            let cur = begin;
            do{
                if(cur.cardList.length < 3) {
                    count = 0;
                    if(firstStage) {
                        break;
                    }
                    continue;
                } else {
                    if((cur == begin) || !cur.prevSegment || (cur.prevSegment.cardList.length >= 3 && cur.cardValue == (cur.prevSegment.cardValue + 1))){
                        count++;
                        if(count >= 2) {
                            result.push(DDZIntelligent.helpSegmentToCards(begin, count, 3));
                        }
                    } else {
                        count = 1;
                        begin = cur;
                        if(firstStage) {
                            break;
                        }
                    }
                }
            }while((cur = cur.nextSegment) && cur.cardValue != 15)
            return result;
        }

        public static findSingleShunzi(cardSegment:CardSegment, firstStage:boolean = true):number[][] {
            let result = [];
            let count = 1;
            let begin = cardSegment;
            let cur = begin;
            while(cur.nextSegment && cur.nextSegment.cardValue != 15) {
                if(cur.nextSegment.cardValue == (cur.cardValue + 1)) {
                    count++;
                    if(count >= 5) {
                        // 可以组成顺子
                        result.push(DDZIntelligent.helpSegmentToCards(begin, count));
                    }
                } else {
                    if(firstStage) {
                        break;
                    }
                    begin = cur.nextSegment;
                    count = 1;
                }
                cur = cur.nextSegment;
            }
            return result;
        }

        // 只取头部
        private static helpSegmentToCards(cardSegment:CardSegment, count:number, limit:number = 1):number[] {
            let result = [];
            do{
                for(let j=0;j<limit;j++) {
                    result.push(cardSegment.cardList[j]);
                }
                count-=1;
                if(count <= 0) {
                    break;
                }
            }while(cardSegment = cardSegment.nextSegment);
            return result
        }

        public static findDuiziNoBoom(cards:Array<number>, count:number):number[]{
            let r = [];
            let begin:CardSegment = DDZIntelligent.genCardSegment(cards);
            let cardSegment = begin;
            do{
                if(cardSegment.cardList.length == 2) {
                    let addC = 0;
                    for(let c of cardSegment.cardList) {
                        r.push(c);
                        addC++;
                        if(addC >= 2) {
                            break;
                        }
                    }
                    count--;
                    if(count <= 0) {
                        break;
                    }
                }
            }while(cardSegment = cardSegment.nextSegment)
            if(count > 0) {
                let cardSegment = begin;
                do{
                    if(cardSegment.cardList.length == 3) {
                        let addC = 0;
                        for(let c of cardSegment.cardList) {
                            r.push(c);
                            addC++;
                            if(addC >= 2) {
                                break;
                            }
                        }
                        count--;
                        if(count <= 0) {
                            break;
                        }
                    }
                }while(cardSegment = cardSegment.nextSegment)
            }
            return r;   
        }

        public static getSegmentBegin(cardSegment:CardSegment) {
            let begin = cardSegment;
            while(begin.prevSegment) {
                begin = begin.prevSegment;
            }
            return begin;
        }
    }
}