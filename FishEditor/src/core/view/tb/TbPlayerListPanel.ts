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
		public rankGroup : eui.Group;
		private scroller:eui.Scroller;
		private scrollerGroup:eui.Group;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose , this);
			if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
		}

		private lastItem:TbRankItem;

		public onClose(event)
		{
			PopUpManager.removePopUp(this);
		}

		public init(data)
		{
			this.rankGroup.removeChildren();
			this.onlineNum.text = data.rankInfo.length + "在线";
			let rankItem : TbRankItem;
			for(let i = 0 ; i < data.rankInfo.length ;i++)
			{
				rankItem = new TbRankItem();
				this.rankGroup.addChild(rankItem);
				rankItem.init(data.rankInfo[i]);
			}
			this.lastItem = <TbRankItem>this.rankGroup.getChildAt(this.rankGroup.numChildren - 1);
			CommonUtil.setNextFrameCall(this.onCallLater, this);
		}

		private onCallLater() {
			if(this.lastItem) {
				this.rankGroup.height = this.scrollerGroup.height = this.lastItem.y + this.lastItem.height;
			}
		}
	}
}