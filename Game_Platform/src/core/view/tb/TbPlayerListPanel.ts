module game.tb {
	export class TbPlayerListPanel extends ResizePanel implements eui.UIComponent{
		public constructor() {
			super();
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public closeBtn : IButton;
		public onlineNum : eui.Label;
		private scrollerList: ScrollerList;
		private scrollerGroup:eui.Group;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose , this);
		}

		private lastItem:TbRankItem;

		public onClose(event)
		{
			PopUpManager.removePopUp(this);
		}

		public init(data)
		{
			this.onlineNum.text = data.rankInfo.length + "在线";
			this.scrollerList.initByData(data.rankInfo, game.ChildGameType.DiceBao, TbRankItem)
		}

	}
}