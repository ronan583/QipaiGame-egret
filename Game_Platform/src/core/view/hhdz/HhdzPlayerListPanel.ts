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
		private scrollerList:ScrollerList;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		}

		public initPlayerList(rankInfos) {
			this.onlineCountLab.text = rankInfos.length+"人在线"
			this.scrollerList.initByData(rankInfos, game.ChildGameType.HHDZ, HhdzRankItem)
		}

		private closePanel(event: egret.TouchEvent) {
			PopUpManager.removePopUp(this, 1);
		}
	}
}