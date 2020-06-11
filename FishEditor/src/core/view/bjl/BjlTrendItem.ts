module game.bjl 
{
	export class BjlTrendItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public item1:eui.Image;
		public item2:eui.Image;
		public item3:eui.Image;
		

		protected childrenCreated():void
		{
			super.childrenCreated();
		}
		public hideItem()
		{
			this.item1.visible = false;
			this.item2.visible = false;
			this.item3.visible = false;
		}

		public initItem(type)
		{
			if(type == 1)
			{
				this.item1.visible = true;
				this.item2.visible = false;
				this.item3.visible = false;
			}else if(type == 2)
			{
				this.item1.visible = false;
				this.item2.visible = true;
				this.item3.visible = false;
			}else if(type == 3)
			{
				this.item1.visible = false;
				this.item2.visible = false;
				this.item3.visible = true;
			}
		}
	}
}