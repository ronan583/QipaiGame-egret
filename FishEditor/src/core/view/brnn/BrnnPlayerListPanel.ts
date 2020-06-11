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
		private scroller:eui.Scroller;
		private lastItem:BrnnRankItemNew;
		private scrollerGroup:eui.Group;

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
			var rankItem : BrnnRankItemNew;
			for(var i = 0; i < rankInfos.length; i++)
			{
				rankItem = new BrnnRankItemNew();
				this.rankGroup.addChild(rankItem);
				rankItem.init(rankInfos[i], i);
			}
			this.onlineNum.text = rankInfos.length+"在线";
			this.lastItem = <BrnnRankItemNew>this.rankGroup.getChildAt(this.rankGroup.numChildren - 1);
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