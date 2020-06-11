module game.hhdz {
	export class HhdzBigRoadItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public itemIcon : eui.Image;
		// public heNumIcon : eui.Image;
		private heNum = 0;
		private isInit = false;
		private winType = -1;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.isInit = true;
			if(this.winType != -1)
			{
				this.showIcon();
			}
		}

		public updateItem(winType : number)
		{
			// this.heNumIcon.visible = false;
			this.winType = winType;
			if(this.isInit)
			{
				this.showIcon();
			}
		}
		public showIcon()
		{
			if(this.winType == 2)//红
			{
				this.itemIcon.source = "hhdz_history_json.hhdz_history_red_dian_3";
			}else if(this.winType == 1)//黑
			{
				this.itemIcon.source = "hhdz_history_json.hhdz_history_black_dian_3";
			}
		}

	}
}