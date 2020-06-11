module game.fqzs {
	export class FqzsPlayerListPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/fqzs/FqzsPlayerListPanel.exml";
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public playerListGroup: eui.Group;
		public closeBtn: IButton;
		public onlineNum: eui.Label;
		public scroller: eui.Scroller;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.scroller.verticalScrollBar.autoVisibility = false;
			this.scroller.verticalScrollBar.visible = false;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
		}

		protected addToStage() {
			super.addToStage();
			egret.setTimeout(() => {
				if (this.stage) this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
			}, this, 100);
		}

		private removeFromStage() {
			if (this.stage) this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
		}

		private stageClick(e: egret.TouchEvent) {
			if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
				this.closePanel(null);
			}
		}

		public initPlayerList(rankInfos) {
			while (this.playerListGroup.numChildren > 0) {
				this.playerListGroup.removeChildAt(0);
			}
			var rankItem: FqzsRankItem;
			for (var i = 0; i < rankInfos.length; i++) {
				rankItem = new FqzsRankItem();
				this.playerListGroup.addChild(rankItem);
				rankItem.initData(i, rankInfos[i]);
			}
			this.onlineNum.text = rankInfos.length + '在线';
		}

		private closePanel(event: egret.TouchEvent) {
			PopUpManager.removePopUp(this, 1);
		}
	}
}