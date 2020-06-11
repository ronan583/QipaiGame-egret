module game.bjl {
	export class BjlPlayerListPanel extends ResizePanel implements eui.UIComponent{
		public constructor() {
			super();
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public playerListGroup : eui.Group;
		public closeBtn : IButton;
		private onlineNum:eui.Label;
		private scrollerList:ScrollerList;
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		}

		public initPlayerList(rankInfos)
		{
			this.onlineNum.text = rankInfos.length+"在线";
			this.scrollerList.initByData(rankInfos, game.ChildGameType.BJL, BjlRankItemNew);
		}

		private closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
		}
	}
}