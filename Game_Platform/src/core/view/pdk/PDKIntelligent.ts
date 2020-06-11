module game {

    export class PDKIntelligent {
        constructor() {

        }

        public static test() {
            // let debugArr = [15,14,19,18,23,22,27,26,31,30,35,39,43,47,51,55,59];
            // let debugArr = [35,34,39,38,43,42,41,47,46,45,51,50,49,55,54,53,59];
            let debugArr = [63,62,59,55,51,50,47,46,45,43,35,27,23,22,21,19,18,17];
            PDKIntelligent.getMaxCardResult(debugArr);
        }

        public static getAllResult(cards:Array<number>):Array<CardResultItemUnit> {
            let cardResultGroups = PDKIntelligent.tryToFindAllShunzi(cards)
            for(let c of PDKIntelligent.tryToFindAllPlane(cards)) {
                cardResultGroups.push(c);
            }
            for(let c of PDKIntelligent.tryToFindAllLiandui(cards)) {
                cardResultGroups.push(c);
            }
            let avalialeItems:Array<CardResultItemUnit> = [];
            for(let cardResult of cardResultGroups) {
                cardResult.findOthers();
                for(let a of cardResult.avalialeItems) {
                    avalialeItems.push(a);
                }
            }
            if(avalialeItems.length == 0) {
                // 找出所有三同
                let cardSegment = PDKIntelligent.genCardSegment(cards);
                let rr = PDKIntelligent.findAllThree(cardSegment);
                let final = new CardResultItemUnit();
                if(rr.length > 0) {
                    for(let r of rr) {
                        final.resultItems.push(new CardResultItem(r, CardRoot.THREE));
                    }
                }
                avalialeItems.push(final)
            }
            return avalialeItems;
        }

        public static getMaxCardResult(cards:Array<number>):Array<CardResultItem> {
            let t = egret.getTimer();
            
            let end = egret.getTimer();
            let avalialeItems:Array<CardResultItemUnit> = PDKIntelligent.getAllResult(cards);
            egret.log("PDKIntelligent find 智能组合消耗时间 : " + (end - t));
            let maxCardResult = avalialeItems[0];
            for(let cardResult of avalialeItems) {
                if(cardResult.getCount() > maxCardResult.getCount()) {
                    maxCardResult = cardResult;
                } else if(cardResult.getCount() == maxCardResult.getCount()){
                    if(cardResult.contains(CardRoot.PLANE) && !maxCardResult.contains(CardRoot.PLANE)) {
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

        public static getPureLiandui(limitCard:number, cards:Array<number>, needCount:number):Array<number>{
            let r = [];
            let cardSegment = PDKIntelligent.genCardSegment(cards);
            let begin = cardSegment;
            let cur = begin;
            let count = 0;
            do{
                if(!(cur.cardList.length == 2 && cur.cardValue > limitCard)) {
                    begin = null
                    count = 0;
                    continue;
                } else {
                    if((cur == begin) || !cur.prevSegment || (cur.prevSegment.cardList.length == 2 && cur.cardValue == (cur.prevSegment.cardValue + 1))){
                        count++;
                        if(!begin) begin = cur;
                        if(count >= needCount) {
                            r = r.concat(PDKIntelligent.helpSegmentToCards(begin, count, 2));
                            break;
                        }
                    } else {
                        count = 1;
                        begin = cur;
                        continue;
                    }
                }
            }while((cur = cur.nextSegment) && cur.cardValue != 15)
            return r;
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
            let cardSegment = PDKIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of PDKIntelligent.findSingleShunzi(begin)) {
                    result.push(new CardResultGroup(r, CardRoot.SHUN_ZI, CommonUtil.copyNumberArray(cards)));
                }
            }while(begin = begin.nextSegment);
            return result;
        }

        public static tryToFindAllPlane(cards:Array<number>):Array<CardResultGroup>{
            let cardSegment = PDKIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of PDKIntelligent.findSinglePlane(begin)) {
                    result.push(new CardResultGroup(r, CardRoot.PLANE, CommonUtil.copyNumberArray(cards)));
                }
            }while(begin = begin.nextSegment);
            return result;
        }

        public static tryToFindAllLiandui(cards:Array<number>):Array<CardResultGroup>{
            let cardSegment = PDKIntelligent.genCardSegment(cards);
            let result:Array<CardResultGroup> = [];
            let begin = cardSegment;
            do{
                for(let r of PDKIntelligent.findSingleLiandui(begin)) {
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
                        if(count >= 2) {
                            result.push(PDKIntelligent.helpSegmentToCards(begin, count, 2));
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

        public static findSingleLianduiSegments(cardSegment:CardSegment):CardSegment[] {
            let count = 0;
            let begin = cardSegment;
            let cur = begin;
            let segments = [];
            do{
                if(cur.cardList.length < 2) {
                    count = 0;
                    break;
                } else {
                    if((cur == begin) || !cur.prevSegment || (cur.prevSegment.cardList.length >= 2 && cur.cardValue == (cur.prevSegment.cardValue + 1))){
                        count++;
                        if(count >= 2) {
                            segments = segments.concat(PDKIntelligent.helpSegmentToSegments(begin, count));
                        }
                    } else {
                        break;
                    }
                }
            }while((cur = cur.nextSegment) && cur.cardValue != 15)
            return segments;
        }

        public static findSingleShunziSegments(cardSegment:CardSegment):CardSegment[] {
            let result = [];
            let count = 1;
            let begin = cardSegment;
            let cur = begin;
            while(cur.nextSegment && cur.nextSegment.cardValue != 15) {
                if(cur.nextSegment.cardValue == (cur.cardValue + 1)) {
                    count++;
                    if(count >= 5) {
                        // 可以组成顺子
                        result = result.concat(PDKIntelligent.helpSegmentToSegments(begin, count));
                    }
                } else {
                    break;
                    begin = cur.nextSegment;
                    count = 1;
                }
                cur = cur.nextSegment;
            }
            return result;
        }

        public static findSinglePlaneSegments(cardSegment:CardSegment):CardSegment[] {
             let count = 0;
            let begin = cardSegment;
            let cur = begin;
            let segments = [];
            do{
                if(cur.cardList.length < 3) {
                    count = 0;
                    break;
                } else {
                    if((cur == begin) || !cur.prevSegment || (cur.prevSegment.cardList.length >= 3 && cur.cardValue == (cur.prevSegment.cardValue + 1))){
                        count++;
                        if(count >= 2) {
                            segments = segments.concat(PDKIntelligent.helpSegmentToSegments(begin, count));
                        }
                    } else {
                        break;
                    }
                }
            }while((cur = cur.nextSegment) && cur.cardValue != 15)
            return segments;
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
                            result.push(PDKIntelligent.helpSegmentToCards(begin, count, 3));
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
                        result.push(PDKIntelligent.helpSegmentToCards(begin, count));
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

        private static helpSegmentToSegments(cardSegment:CardSegment, count:number):CardSegment[] {
            let result = [];
            do{
                result.push(cardSegment);
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