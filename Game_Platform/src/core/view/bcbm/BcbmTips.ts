module game.bcbm {
	export class BcbmTip extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = "resource/eui_skins/bcbm/BcbmTip.exml";
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public countdownLabel: eui.BitmapLabel;
		public tipImage: eui.Image;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public initUI(countNum) {
			this.countdownLabel.text = countNum;
		}

		public setImage(source) {
			this.tipImage.source = source;
		}

		public showCount() {
			this.countdownLabel.visible = true;
			//if (this.clockAnim) this.clockAnim.visible = false;
		}

		public showClockMc(): void {
			this.countdownLabel.visible = false;
			// this.clockAnim = new game.CommonDB("lhdz_number_ske_dbbin", "lhdz_number_tex_json", "lhdz_number_tex_png", "animation", 6400, true);
			// this.addChild(this.clockAnim);
			// this.clockAnim.x = this.width / 2;
			// this.clockAnim.y = (this.height / 2) - 18;
		}
	}
}