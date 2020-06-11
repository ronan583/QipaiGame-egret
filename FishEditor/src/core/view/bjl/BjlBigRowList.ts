module game.bjl {
	export class BjlBigRowList extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public stakeType:BjlStakeTpye;
		public bigRoadItems : BjlBigRoadItem[] = [];
		public changeColNum = 6;

		public get rowLen()
		{
			if(this.bigRoadItems.length > this.changeColNum)
			{
				return this.bigRoadItems.length - this.changeColNum + 1;
			}else
			{
				return 1;
			}
		}

		protected childrenCreated():void
		{
			super.childrenCreated();
			//this.bigRoadItems = [];
		}

		public addItem(type) : boolean
		{
			var item: BjlBigRoadItem;
			if(type == BjlStakeTpye.he)
			{
				item = this.bigRoadItems[this.bigRoadItems.length-1];
				item.addHeNum();
				return false;
			}else
			{
				// item = new BjlBigRoadItem();
				item = BjlItemCache.instance.createBigRoadNode();
				this.addChild(item);
				this.bigRoadItems.push(item);
				item.updateItem(type);
				item.y = (this.numChildren - 1) * 20;
				if(this.bigRoadItems.length > this.changeColNum)
				{
					item.y = (this.changeColNum-1) * 20;
					item.x = (this.numChildren - this.changeColNum) * 17.9;
				}
				return true;
			}
		}

		public clear()
		{
			for(let i=0;i < this.numChildren; i++) {
				BjlItemCache.instance.pushBigRoadNode(this.getChildAt(i));
			}
			this.removeChildren();
			this.bigRoadItems = [];
		}

	}
}