module game.lhdz {
	export class LhdzStartRadioGroup extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public radioBtnAll : IButton;
		public radioBtn0 : IButton;
		public radioBtn1 : IButton;
		public radioBtn2 : IButton;
		public radioBtn3 : IButton;

		public imgLevelAll : eui.Image;
		public imgLevel0 : eui.Image;
		public imgLevel1 : eui.Image;
		public imgLevel2 : eui.Image;
		public imgLevel3 : eui.Image;
		
		public imgArr : eui.Image[];
		public radioArr : IButton[];
		public currIndex : number = 0;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.imgArr = [this.imgLevelAll, this.imgLevel0, this.imgLevel1, this.imgLevel2, this.imgLevel3];
			this.radioArr = [this.radioBtnAll, this.radioBtn0, this.radioBtn1, this.radioBtn2, this.radioBtn3];
			var ibutton : IButton;
			for(var i = 0 ; i < this.radioArr.length ; i++)
			{
				ibutton = this.radioArr[i];
				ibutton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelected, this);
			}
			this.updateStateByIndex(0);
		}
		
		private onSelected(event : egret.TouchEvent)
		{
			var tempIndex : number = this.radioArr.indexOf(event.currentTarget);
			if(tempIndex != -1 && tempIndex != this.currIndex)
			{
				this.updateStateByIndex(tempIndex);
				AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_LHDZ_RADIO_UI,this.getType(tempIndex));

			}
			
		}

		public updateStateByIndex(index : number)
		{
			var ibutton : IButton;
			var tempImage : eui.Image;
			var nameStr = "";
			for(var i = 0 ; i < this.radioArr.length ; i++)
			{
				ibutton = this.radioArr[i];
				tempImage = this.imgArr[i];
				nameStr = this.getType(i);
				// if(nameStr != "all")
				// {
				// 	nameStr = "level"+nameStr;
				// }
				if(index == i)
				{
					this.currIndex = i;
					ibutton.alpha = 1;
					tempImage.visible = true;
					// tempImage.source = "roomRes_json." + nameStr + "_over";
				}else
				{
					ibutton.alpha = 0;
					tempImage.visible = false;
					// tempImage.source = "roomRes_json." + nameStr + "_out";
				}
			}
		}

		public getType(i) : string
		{
			if(i == 0)
			{
				return "all";
			}else
			{
				return  (i-1).toString();
			}
		}
	}
}