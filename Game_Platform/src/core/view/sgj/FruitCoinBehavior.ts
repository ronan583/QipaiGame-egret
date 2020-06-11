module game.sgj{
    export class FruitCoinBehavior {
        private icon:eui.Image;
        private startY:number;
        private topY:number;
        private subTopY:number;
        private container:eui.Group;
        constructor(icon:eui.Image, container:eui.Group) {
            this.container = container;
            this.icon = icon;
            this.startY = container.height;// CommonUtil.RandomRangeInt(container.height - 50,container.height);
            this.topY = CommonUtil.RandomRangeInt(0,50);
            this.icon.y = this.startY;
            // this.icon.x = CommonUtil.RandomRangeInt(container.width / 2 - 50 , container.width / 2 + 50 );
            this.icon.rotation = CommonUtil.RandomRangeInt(0,359);
            this.subTopY = this.startY + (this.topY - this.startY) * 2 / 3;
            icon.alpha = 0;
        }

        public start(func:Function, caller:any, index:number) {
            egret.Tween.get(this.icon).to({x:this.icon.x + CommonUtil.RandomRangeInt(-this.container.width / 2,this.container.width / 2),y:this.topY, 
                rotation:this.icon.rotation + CommonUtil.RandomRangeInt(0, 30), alpha:1}, 300, egret.Ease.quadOut).call(()=>{
                egret.Tween.get(this.icon).to({y:this.startY, rotation:this.icon.rotation + CommonUtil.RandomRangeInt(0, 30)}, 300, egret.Ease.quadIn).call(()=>{
                    egret.Tween.get(this.icon).to({y:this.subTopY, rotation:this.icon.rotation + CommonUtil.RandomRangeInt(0, 30)}, 200, egret.Ease.quadOut).call(()=>{
                        egret.Tween.get(this.icon).to({y:this.startY, rotation:this.icon.rotation + CommonUtil.RandomRangeInt(0, 30)}, 200, egret.Ease.quadIn).call(()=>{
                            if(func) {
                                func.call(caller, index);
                            }
                        }, this);
                    }, this);
                }, this);
            }, this);
        }

    }
}