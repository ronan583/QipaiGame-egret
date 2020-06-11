module game.tb {
	export class TbTrendPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public type1TotalNum : eui.BitmapLabel;
		public type2TotalNum : eui.BitmapLabel;
		public type3TotalNum : eui.BitmapLabel;
		private itemList : TbTrendItem[];
		private baoNum = 0;
		private bigNum = 0;
		private littleNum = 0;
		private itemGroup:eui.Group;
		private scroller:eui.Scroller;
		protected childrenCreated():void
		{
			super.childrenCreated();
			if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
			this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.logScroller, this);
		}

		private logScroller(e:eui.UIEvent) {
			egret.log("logScroller>>>>>>>>>>>>>>>>>" + this.scroller.viewport.scrollH)
		}

		public UpdatePanel(data)
		{
			let type;
			this.baoNum = 0;
			this.bigNum = 0;
			this.littleNum = 0;
			let roundData;
			var startIndex = 0;
			var endIndex = data.rounds.length;
			this.itemGroup.removeChildren();
			for(let i = 0 ; i < data.rounds.length; i++)
			{
				roundData = data.rounds[i];
				type = this.GetType(roundData.diceNumbers);
				if(i > (data.rounds.length - 15)) {
					let item = new TbTrendItem();
					item.showItem(type, roundData.diceNumbers, i == data.rounds.length - 1);
					this.itemGroup.addChild(item);
				}
			}
			if(this.itemGroup.numChildren > 0) {
				this.scroller.viewport.width = this.itemGroup.width = (this.itemGroup.getChildAt(0).width + 6) * this.itemGroup.numChildren;
				// this.itemGroup.x = 340 - this.itemGroup.width;
				
				this.scroller.validateNow();
				egret.log("this.itemgroup : " + this.scroller.viewport.contentWidth + "   " + this.scroller.viewport.width)
				this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - this.scroller.viewport.width;
			}
			
			this.type1TotalNum.text = this.bigNum.toString();
			this.type2TotalNum.text = this.littleNum.toString();
			this.type3TotalNum.text = this.baoNum.toString();
		}
		private GetType(diceNums : number[])
		{
			if(diceNums)
			if(diceNums[0] == diceNums[1] && diceNums[1] == diceNums[2])
			{
				this.baoNum++;
				return 3;
			}else
			{
				let pointSum = diceNums[0] + diceNums[1] + diceNums[2];
				if(pointSum <= 10)
				{
					this.littleNum++;
					return 2;
				}else
				{
					this.bigNum++;
					return 1;
				}
			}
		}
	}
}