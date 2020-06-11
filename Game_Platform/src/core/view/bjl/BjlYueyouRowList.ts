module game.bjl {
	export class BjlYueyouRowList extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public stakeType:BjlStakeTpye;
		public roadItems : eui.Image[];
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.roadItems = [];
		}
		public addItem(type : BjlStakeTpye):boolean
		{
			var item: eui.Image = new eui.Image();
			this.addChild(item);
			this.roadItems.push(item);
			if(type == BjlStakeTpye.yaxian)
			{
				item.source = "hlssm_luzi_item_4_2";
			}else if(type == BjlStakeTpye.yazhuang)
			{
				item.source = "hlssm_luzi_item_4_1";
			}
			item.y = (this.numChildren - 1) * 21;
			if(this.roadItems.length > 6)
			{
				item.y = 5 * 21;
				item.x = (this.numChildren - 6) * 20;
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