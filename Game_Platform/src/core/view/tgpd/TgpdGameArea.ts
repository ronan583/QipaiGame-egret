module game.tgpd {
	export class TgpdGameArea extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public currGroup : eui.Group;
		public nextGroup : eui.Group;
		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public initData(data)
		{
			//w : 78
			this.currGroup.removeChildren();
			
		}
	}
}