module game.hhdz {
	export class HhdzBigRowList extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public stakeType:number;
		public bigRoadItems : HhdzBigRoadItem[];
		public changeColNum = 6;


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.bigRoadItems = [];
		}

		public addItem(type) : boolean
		{
			var item: HhdzBigRoadItem;
			
			item = new HhdzBigRoadItem();
			this.addChild(item);
			this.bigRoadItems.push(item);
			item.updateItem(type);
			item.y = (this.numChildren - 1) * 24;
			if(this.bigRoadItems.length > this.changeColNum)
			{
				item.y = (this.changeColNum - 1) * 24;
				item.x = (this.numChildren - this.changeColNum) * 24;
			}
			return true;
			
		}

		public clear()
		{
			this.bigRoadItems.splice(0,this.bigRoadItems.length);
			this.removeChildren();
		}

	}
}