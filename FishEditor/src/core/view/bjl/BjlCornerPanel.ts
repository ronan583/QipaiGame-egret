module game.bjl {
	export class BjlCornerPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public resultRoad : BjlResultRoad;
		public bigRoad : BigRoad;
		public dyzRoad : BjlDyzRoad;
		public smallRoad : BjlSmallRoad;
		public yueyouRoad : BjlYueyouRoad;

		private zhuangLabel:eui.BitmapLabel;
		private xianLabel:eui.BitmapLabel;
		private heLabel:eui.BitmapLabel;
		private zhuangduiLabel:eui.BitmapLabel;
		private xianduiLabel:eui.BitmapLabel;
		private totalRoundLabel:eui.BitmapLabel;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.touchEnabled = false;
			// this.touchChildren = false;
			/*
			var darkSprite = new egret.Sprite();
	        darkSprite.graphics.clear();
	        darkSprite.graphics.beginFill(0x000000, 1);
	        darkSprite.graphics.drawRect(0, 0, 673, 207);
	        darkSprite.graphics.endFill();
	        darkSprite.width = 673;
	        darkSprite.height = 207;
			this.mask = darkSprite;
			this.addChildAt(darkSprite,0);
			this.cacheAsBitmap = true;
			*/
		}

		public Reset()
		{
			this.resultRoad.clear();
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public UpdateCorner(data)
		{
			this.Reset();
			this.resultRoad.updateRoad(data);
			var isRoad = false;
			let t = egret.getTimer();
			for(var i = 0; i < this.resultRoad.bjlResultItems.length ;i++)
			{
				this.addOtherRoad(i);
			}
			egret.log("update corner : " + (egret.getTimer() - t));
			let zhuang = 0;
			let xian = 0;
			let he = 0;
			let zhuangdui = 0;
			let xiandui = 0;
			let totalRound = 0;
			for(let i=0;i<data.length;i++) {
				for(let winType of data[i].winType) {
					if(winType == 1) {
						xian++;
					} else if(winType == 2) {
						zhuang++;
					} else if(winType == 3) {
						he++;
					} else if(winType == 4) {
						xiandui++;
					} else if(winType == 5) {
						zhuangdui++;
					}
				}
				if(i == data.length -1) {
					totalRound = data[i].round
				}
			}

			this.zhuangLabel.text = zhuang.toFixed(0)
			this.xianLabel.text = xian.toFixed(0)
			this.heLabel.text = he.toFixed(0)
			this.zhuangduiLabel.text = zhuangdui.toFixed(0)
			this.xianduiLabel.text = xiandui.toFixed(0)
			this.totalRoundLabel.text = totalRound.toFixed(0);
		}

		public blueOrRed(interval : number) : boolean
		{
			var currCow = this.bigRoad.bigRoadRowLists.length;
			var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;
			
				//齐脚
			if(currCol == 1)
			{
					if(this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length ==  this.bigRoad.bigRoadRowLists[currCow - interval - 2].bigRoadItems.length)
					{
						return true;
					}else
					{
						return false;
					}
			//成对
			}else if(this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length >= currCol)
			{
				return true;
			}else{
				//与上一口相同
				if(currCol - this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length == 1)
				{
					return false;
				}else
				{
					return true;
				}
			}
		}

		public addCorner(data)
		{
			this.resultRoad.addItem(data);
			//this.bigRoad.addItem(this.resultRoad.bjlResultItems[this.resultRoad.bjlResultItems.length - 1].stakeType);
			this.addOtherRoad(this.resultRoad.bjlResultItems.length - 1)
		}

		private addOtherRoad(index)
		{
				if(this.bigRoad.addItem(this.resultRoad.bjlResultItems[index].stakeType))
				{
					var currCow = this.bigRoad.bigRoadRowLists.length;
					var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;
			
					//大眼仔
					if((currCow == 2 && currCol > 1) || currCow  > 2)
					{
						if(this.blueOrRed(1))
						{
							this.dyzRoad.addItem(BjlStakeTpye.yazhuang);
						}else
						{
							this.dyzRoad.addItem(BjlStakeTpye.yaxian);
						}
					}
					//小路
					if((currCow == 3 && currCol > 1) || currCow  > 3)
					{
						if(this.blueOrRed(2))
						{
							this.smallRoad.addItem(BjlStakeTpye.yazhuang);
						}else
						{
							this.smallRoad.addItem(BjlStakeTpye.yaxian);
						}
					}
					//曱甴路
					if((currCow == 4 && currCol > 1) || currCow  > 4)
					{
						if(this.blueOrRed(3))
						{
							this.yueyouRoad.addItem(BjlStakeTpye.yazhuang);
						}else
						{
							this.yueyouRoad.addItem(BjlStakeTpye.yaxian);
						}
					}
				}
		}
	}
}