module game.hhdz{
    export class HhdzBetInfoGroup{
        private redTotal:eui.BitmapLabel;
        private redSelf:eui.BitmapLabel;
        private blackTotal:eui.BitmapLabel;
        private blackSelf:eui.BitmapLabel;
        private luckyTotal:eui.BitmapLabel;
        private luckySelf:eui.BitmapLabel;

        private totalLabelArr:Array<eui.BitmapLabel>;
        private selfLabelArr:Array<eui.BitmapLabel>;

        private selfValueArr:Array<number> = [0,0,0];

        constructor(redTotal:eui.BitmapLabel,redSelf:eui.BitmapLabel,
                blackTotal:eui.BitmapLabel,blackSelf:eui.BitmapLabel,
                luckyTotal:eui.BitmapLabel,luckySelf:eui.BitmapLabel) {
            this.redTotal = redTotal;
            this.redSelf = redSelf;
            this.blackTotal = blackTotal;
            this.blackSelf = blackSelf;
            this.luckyTotal = luckyTotal;
            this.luckySelf = luckySelf;
            this.totalLabelArr = [this.redTotal, this.blackTotal, this.luckyTotal];
            this.selfLabelArr = [this.redSelf, this.blackSelf, this.luckySelf];
        }

        public reset() {
            this.selfValueArr = [0,0,0];
            this.redSelf.visible = this.redTotal.visible = this.blackSelf.visible 
            = this.blackTotal.visible = this.luckySelf.visible = this.luckyTotal.visible = false;
        }

        public updateTotalTypeBet(type:number, value:number) {
            if(value <= 0) {
                this.totalLabelArr[type - 1].visible = false;
            } else {
                this.totalLabelArr[type - 1].visible = true;
                this.totalLabelArr[type - 1].text = value.toFixed(0);
            }
        }

        public updateAddSelfTypeBet(type:number, value:number) {
            this.selfValueArr[type-1] = this.selfValueArr[type-1] + value;
            egret.log("更新我自己的下注值" + value + "  " + this.selfValueArr[type-1]);
            this.updateSelfTypeBet(type, this.selfValueArr[type-1]);
        }

        public updateSelfTypeBet(type:number, value:number) {
            this.selfValueArr[type - 1] = value;
            if(value <= 0) {
                this.selfLabelArr[type - 1].visible = false;
            } else {
                this.selfLabelArr[type - 1].visible = true;
                this.selfLabelArr[type - 1].text = this.selfValueArr[type - 1].toFixed(0);
            }
        }
    }
}