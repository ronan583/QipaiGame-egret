module game.ddz{



    /// 副牌选择器
    export class WithCardSelector {
        constructor(){
        }

        private withCards:Array<number> = [];

        public addWith(ddzExecCard:DDZExecCards, cards:Array<number>) {
            for(let c of cards) {
                let exist = false;
                for(let poker of ddzExecCard.cardList) {
                    if(poker.cardNumber == c) {
                        exist = true;
                        break;
                    }
                }
                if(!exist) {
                    this.withCards.push(c);
                }
            }
            // 整理出来的withCards就是选中区域多出来的牌，需要实行的政策是多退少补
            // 因为最终选择出来的是展示牌所以 多退的意思  其实就是不选择
            
        }

    }
}