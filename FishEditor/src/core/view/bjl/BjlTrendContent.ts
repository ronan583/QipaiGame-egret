module game.bjl {
	export class BjlTrendContent extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public itemScroll : eui.Scroller;
		public itemGroup : eui.Group;
		private trendItems : BjlTrendItem[];
		private itemTypes : number[][];
		

		protected childrenCreated():void
		{
			super.childrenCreated();
			if(this.itemScroll.horizontalScrollBar != null)
            {
                this.itemScroll.horizontalScrollBar.autoVisibility = false;
                this.itemScroll.horizontalScrollBar.visible = false;
            }
            if(this.itemScroll.verticalScrollBar != null)
            {
                this.itemScroll.verticalScrollBar.autoVisibility = false;
                this.itemScroll.verticalScrollBar.visible = false;
                this.itemScroll.scrollPolicyV = eui.ScrollPolicy.OFF;
                // console.log(this._scroller.scrollPolicyV);
            }
			this.trendItems = [];
			let tempItem : BjlTrendItem;
			for(let i = 0; i < 15; i++)
			{
				tempItem = this["item" + (i + 1)];
				this.trendItems.push(tempItem);
				tempItem.hideItem();// = false;
			}
			this.itemTypes = [];
		}
		
		public UpdateContent(data)
		{
			this.itemTypes = [];
			var bjlResultItem : BjlTrendItem;
			var filterNum = 0;
			if(data.length > this.trendItems.length)
			{
				filterNum = data.length - this.trendItems.length;
			}
			
			for(var i = 0 ; i < data.length ; i++)
			{
				if(i < filterNum)
				{
					continue;
				}
				this.itemTypes.push(data[i].winType);
				this.addItem(data[i].winType);
			}
			if(data.length < this.trendItems.length)
			{
				for(let i = this.trendItems.length ; i > data.length ; i--)
				{
					if(this.trendItems[i - 1])
						this.trendItems[i - 1].hideItem();
				}
			}else
			{
				this.itemScroll.viewport.scrollH = this.itemScroll.viewport.measuredWidth - this.itemScroll.viewport.width;
			}
		}

		public addItemAndValue(winType)
		{
			if(this.itemTypes.length >= this.trendItems.length)
			{
				this.itemTypes.splice(0,1);
			}
			this.itemTypes.push(winType);
			this.addItem(winType);
		}

		public addItem(winType)
		{
			var tempItem : BjlTrendItem;
			if(this.itemTypes.length <= this.trendItems.length)
			{
				tempItem = this.trendItems[this.itemTypes.length - 1];
			}else
			{
				tempItem = this.trendItems[0];
				this.itemGroup.setChildIndex(tempItem,this.itemGroup.numChildren - 1);
			}
			// tempItem.hideItem();
			for(let i = 0 ; i < winType.length ; i++)
			{
				tempItem.initItem(winType[i]);
			}
		}

	}
}