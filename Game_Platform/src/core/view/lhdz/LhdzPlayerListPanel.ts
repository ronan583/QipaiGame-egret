module game.lhdz {
	export class LhdzPlayerListPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public playerListGroup: eui.Group;
		public closeBtn: IButton;
		public onlineNum: eui.Label;
		public scrollerList: ScrollerList;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
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
			this.scrollerList.initByData(rankInfos, game.ChildGameType.LHDZ, LhdzRankItem)
			this.onlineNum.text = rankInfos.length + '在线';
		}

		private closePanel(event: egret.TouchEvent) {
			PopUpManager.removePopUp(this, 1);
		}
	}
}