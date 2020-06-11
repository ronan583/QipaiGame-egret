module game.bjl {
	export class BjlChangeRoomPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public item0 : StartCornerItem;
		public item1 : StartCornerItem;
		public item2 : StartCornerItem;
		public item3 : StartCornerItem;
		public item4 : StartCornerItem;
		public item5 : StartCornerItem;
		public item6 : StartCornerItem;
		public items : StartCornerItem[];
		public closeBtn : IButton;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.items = [this.item0,this.item1 , this.item2 , this.item3 , this.item4 , this.item5, this.item6];
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose , this);
		}
		
		public clearTimeout()
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				this.items[i].clearAllTimeOut();
			}
		}
		private onClose()
		{
			//PopUpManager.removePopUp(this , 1);
			AppFacade.instance.sendNotification(PanelNotify.CLOSE_BJL_CHANGE_UI);
		}
		public initUI(data)
		{
			this.clearTimeout();
			for(var i = 0 ; i < data.length ; i++)
			{
				this.items[data[i].gameLevel].initData(data[i],PanelNotify.CLOSE_BJL_CHANGE_UI);
			}
		}
		public updateSingleRoom(data)
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				if(i == data.gameLevel - 1)
				{
					this.items[data.gameLevel].countDown.stop();
					this.items[data.gameLevel].clearAllTimeOut();
					
					this.items[data.gameLevel].initData(data.roomInfos,PanelNotify.CLOSE_BJL_CHANGE_UI);
				}
			}
		}
	}
}