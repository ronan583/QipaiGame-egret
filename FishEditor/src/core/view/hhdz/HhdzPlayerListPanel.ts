module game.hhdz {
	export class HhdzPlayerListPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public scrollerGroup: eui.Group;
		public closeBtn: IButton;
		public onlineCountLab: eui.Label;
		private scroller:eui.Scroller;
		private rankGroup:eui.Group;
		private lastItem:HhdzRankItem;	
		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
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

		public initPlayerList(rankInfos) {
			this.rankGroup.removeChildren();
			var rankItem: HhdzRankItem;
			for (var i = 0; i < rankInfos.length; i++) {
				rankItem = new HhdzRankItem();
				this.rankGroup.addChild(rankItem);
				rankItem.initData(rankInfos[i], i);
			}
			this.onlineCountLab.text = rankInfos.length+"人在线"
			this.lastItem = <HhdzRankItem>this.rankGroup.getChildAt(this.rankGroup.numChildren - 1);
			CommonUtil.setNextFrameCall(this.onCallLater, this);
		}

		private onCallLater() {
			if(this.lastItem) {
				this.rankGroup.height = this.scrollerGroup.height = this.lastItem.y + this.lastItem.height;
			}
		}
		private closePanel(event: egret.TouchEvent) {
			PopUpManager.removePopUp(this, 1);
		}
	}
}