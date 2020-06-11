module game.sgj {
	export class FruitFlyCoin extends egret.DisplayObjectContainer {
		private coin:eui.Image;
		public constructor() {
			super();
			this.coin = new eui.Image();
			this.addChild(this.coin);
			this.coin.source = "fruit_fly_coin_ns_png"
			this.coin.rotation = CommonUtil.RandomRangeInt(0,360);
		}
		private p0x:number;
		private p0y:number;
		private p1x:number;
		private p1y:number;
		private p2x:number;
		private p2y:number;
		private dir:number;

		private top1:number;
		private init1:number;
		private top2:number;

		private completeFunc:Function;
		private completeCaller:any;
		public startFly(p0x:number,p0y:number,
			p1x:number,p1y:number,
			p2x:number,p2y:number,
			completFunc:Function, completeCaller:any, 
			dir:number = 1):void {
			this.p0x = p0x;
			this.p0y = p0y;
			this.p1x = p1x;
			this.p1y = p1y;
			this.p2x = p2x;
			this.p2y = p2y;
			this.top1 = p2y - CommonUtil.RandomRangeInt(70,100);
			this.top2 = p2y - CommonUtil.RandomRangeInt(40,70);
			this.init1 = p2y;
			this.dir = dir;
			this.completeFunc = completFunc;
			this.completeCaller = completeCaller;
			egret.Tween.get(this).to({factor:1},800).call(this.nextMove, this)
		}

		private nextMove() {
			egret.Tween.removeTweens(this);
			let jumpX = CommonUtil.RandomRangeInt(0,80);
			let t1 = jumpX * this.dir;
			let t2 = jumpX * this.dir * 2 / 3;
			egret.Tween.get(this).to({x:t1 + this.x,y:this.top1, rotation:this.rotation + CommonUtil.RandomRangeInt(0, 30)}, 300, egret.Ease.quadOut).call(()=>{
				/*
				egret.Tween.get(this).to({x:t1 + this.x ,y:this.init1, rotation:this.rotation + CommonUtil.RandomRangeInt(0, 30)}, 300, egret.Ease.quadIn).call(()=>{
                    egret.Tween.get(this).to({x:this.x + t2, y:this.top2, rotation:this.rotation + CommonUtil.RandomRangeInt(0, 30)}, 200, egret.Ease.quadOut).call(()=>{
                        egret.Tween.get(this).to({x:this.x + t2, y:this.init1, rotation:this.rotation + CommonUtil.RandomRangeInt(0, 30), aplha:0}, 200, egret.Ease.quadIn).call(()=>{
							if(this.parent) {
								this.parent.removeChild(this);
							}
						}, this);
                    }, this);
				}, this);
				*/
				egret.Tween.get(this).to({x : this.x + CommonUtil.RandomRangeInt(0, 200) * this.dir}, 700)
				egret.Tween.get(this).to({y : this.p2y}, 700, egret.Ease.bounceOut).call(()=>{
					if(this.parent) {
						this.parent.removeChild(this);
					}
					FruitData.instance.isRollingReward = false;
					if(this.completeFunc) {
						this.completeFunc.call(this.completeCaller);
					}
				}, this);
				egret.setTimeout(()=>{
					egret.Tween.get(this).to({alpha : 0}, 200);
				}, this, 500);
			}, this);
			
		}

		private destory():void {
			if(this.parent) {
				this.parent.removeChild(this);
			}
		}

		public get factor():number {
	        return 0;
	    }
	 
	    public set factor(value:number) {
	        this.x = (1 - value) * (1 - value) * this.p0x + 2 * value * (1 - value) * this.p1x + value * value * this.p2x;
	        this.y = (1 - value) * (1 - value) * this.p0y + 2 * value * (1 - value) * this.p1y + value * value * this.p2y;
	    }

	}
}