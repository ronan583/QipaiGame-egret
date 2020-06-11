module game.brnn {
	export class BrnnPlayerListPanel extends ResizePanel implements eui.UIComponent{
		public constructor() {
			super();
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public rankGroup : eui.Group;
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
			this.rankGroup.removeChildren();
			this.scrollerList.initByData(rankInfos, game.ChildGameType.BRNN, BrnnRankItemNew);
			this.onlineNum.text = rankInfos.length+"在线";
		}

		private closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
		}
	}
}