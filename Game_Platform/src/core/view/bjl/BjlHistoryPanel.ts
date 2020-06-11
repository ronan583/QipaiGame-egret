module game.bjl {
	export class BjlHistoryPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}
		public cornerPanel : BjlCornerPanel;
		public closeBtn : IButton;
		public bgImg : eui.Image;

		public resultRoad : BjlResultRoad;
		public bigRoad : BigRoad;
		public dyzRoad : BjlDyzRoad;
		public smallRoad : BjlSmallRoad;
		public yueyouRoad : BjlYueyouRoad;

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);

			var darkSprite = new egret.Sprite();
	        darkSprite.graphics.clear();
	        darkSprite.graphics.beginFill(0x000000, 1);
	        darkSprite.graphics.drawRect(0, 0, 913, 381);
	        darkSprite.graphics.endFill();
	        darkSprite.width = 913;
	        darkSprite.height = 381;
			darkSprite.x = this.bgImg.x;
			darkSprite.y = this.bgImg.y;
			this.mask = darkSprite;
			this.addChildAt(darkSprite,0);
		}

		public Reset()
		{
			this.resultRoad.clear();
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public udpateHistory(data) : void
		{
			// this.cornerPanel.UpdateCorner(data);
			
			this.Reset();
			this.resultRoad.updateRoad(data);
			var isRoad = false;
			for(var i = 0; i < this.resultRoad.bjlResultItems.length ;i++)
			{
				this.addOtherRoad(i);
			}
		}

		
		public closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
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