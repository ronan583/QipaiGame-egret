module game {
	export class BrnnBattleStartCountDown {
		public constructor() {
		}

		public countDownLabel: eui.BitmapLabel | eui.Label;
		public tipsPanel:egret.DisplayObject;
		public waitAnim: DragonAnim;
		private endTime: number;
		private isPlaySound = false;
		private soundPath = "";
		public startCountDown(time: number): void {
			if (this.endTime > 0) {
				this.stop();
			}
			this.tipsPanel.visible = true;
			this.endTime = Math.floor(egret.getTimer() / 1000) + time;
			egret.startTick(this.showTime, this);
		}

		public setSound(soundPath) {
			this.isPlaySound = true;
			this.soundPath = soundPath;
		}


		public stop(): void {
			this.endTime = 0;
			egret.stopTick(this.showTime, this);
			this.tipsPanel.visible = false;
		}
		private lastTime = -1;
		private showTime(timestamp: number): boolean {
			let time = this.endTime - Math.floor(timestamp / 1000);
			if (time < 0) {
				this.stop();
			} else {
				if (this.lastTime != -1 && this.lastTime > time && time <= 5 && this.isPlaySound) {
					//播放倒计时音效
					SoundMenager.instance.playEffect(this.soundPath);
				}
				this.lastTime = time;
				this.countDownLabel.text = time.toString();
			}
			return true;
		}
	}
}