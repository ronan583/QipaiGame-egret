module game.ermj {
	export class ErmjHuOrDoublePanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjHuOrDoublePanel.exml";
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		public fanNum: eui.BitmapLabel;
		public huBtn: IButton;
		public doubleBtn: IButton;
		public cards: number[];
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.huBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHu, this);
			this.doubleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDouble, this);
		}

		public init(cards, fanNum) {
			this.cards = cards;
			this.fanNum.text = fanNum;
		}

		public onHu(event: egret.TouchEvent) {
			ErmjRequest.SendBattleStep(MJPlayType.Hu, this.cards);
			PopUpManager.removePopUp(this);
		}
		public onDouble(event: egret.TouchEvent) {
			ErmjRequest.SendBattleStep(MJPlayType.Jiabei, [0]);
			PopUpManager.removePopUp(this);
		}
	}
}