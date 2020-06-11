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
		private scroller:eui.Scroller;
		private lastItem:BjlRankItemNew;
		private scrollerGroup:eui.Group;
		private rankGroup:eui.Group;
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
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

		public initPlayerList(rankInfos)
		{
			this.rankGroup.removeChildren();
			var rankItem : BjlRankItemNew;
			for(var i = 0; i < rankInfos.length; i++)
			{
				rankItem = new BjlRankItemNew();
				this.rankGroup.addChild(rankItem);
				rankItem.init(rankInfos[i], i);
			}
			this.onlineNum.text = rankInfos.length+"在线";
			this.lastItem = <BjlRankItemNew>this.rankGroup.getChildAt(this.rankGroup.numChildren - 1);
			CommonUtil.setNextFrameCall(this.onCallLater, this);
		}

		private onCallLater() {
			if(this.lastItem) {
				this.rankGroup.height = this.scrollerGroup.height = this.lastItem.y + this.lastItem.height;
			}
		}

		private closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
		}
	}
}