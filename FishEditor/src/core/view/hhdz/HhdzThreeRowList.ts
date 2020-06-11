module game.hhdz {
	export class HhdzThreeRowList extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public stakeType:number;
		public roadItems : eui.Image[];
		public changeColNum = 4;
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.roadItems = [];
		}
		public addItem(type : number,sourcePath : string):boolean
		{
			var item: eui.Image = new eui.Image();
			this.addChild(item);
			this.roadItems.push(item);
			item.source = sourcePath;
			item.y = (this.numChildren - 1) * 18;
			if(this.roadItems.length > this.changeColNum)
			{
				item.y = (this.changeColNum - 1) * 18;
				item.x = (this.numChildren - this.changeColNum) * 18;
			}
			return true;
		}
		public clear()
		{
			this.roadItems.splice(0,this.roadItems.length);
			this.removeChildren();
		}
	}
}