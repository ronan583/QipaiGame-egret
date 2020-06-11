module game.lhdz {
	export class LhdzTips extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = "resource/eui_skins/lhdz/LhdzTips.exml";
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public tipLabel: eui.Image;
		public countLabel: eui.BitmapLabel;
		public tipImage: eui.Image;
		public clockAnim: game.CommonDB;
		private countAnim:DragonAnim;

		private beginTimes:number = 0;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.countAnim.visible = false;
		}

		public initUI(countNum) {
			this.countLabel.text = countNum;
		}

		public setImage(source) {
			this.tipImage.source = source;
		}

		public showCount() {
			this.countLabel.visible = true;
			if (this.countAnim) this.countAnim.visible = false;
		}

		public showClockMc(leftTime:number): void {
			this.countLabel.visible = false;
			this.countAnim.visible = true;
			this.countAnim.playFromProgress((5 -leftTime) / 5);
			LhdzSoundPlayer.instance.playCountDownSound();
			this.beginTimes = 4;
			egret.setTimeout(this.onSoundPlay, this, 1000);
		}

		private onSoundPlay() {
			LhdzSoundPlayer.instance.playCountDownSound();
			this.beginTimes--;
			if(this.beginTimes > 0) {
				if(this.stage) {
					egret.setTimeout(this.onSoundPlay, this, 1000);
				}
			}
		}


	}
}