module game {
	export class BrnnCountDown {
		
		public constructor() {
		}

		public countDownLabel: eui.BitmapLabel | eui.Label;
		public noticeAnim: DragonAnim;
		private endTime: number;
		private isPlaySound = false;
		private soundPath = "";
		private noticeRecord = 0;
		public tipsPanel:egret.DisplayObject;
		needSound: boolean;
		public startCountDown(time: number, needSound:boolean = false): void {
			this.noticeRecord = 0;
			if (this.endTime > 0) {
				this.stop();
			}
			this.tipsPanel.visible = true;
			this.endTime = Math.floor(egret.getTimer() / 1000) + time;
			egret.startTick(this.showTime, this);
			this.needSound = needSound;
		}

		public setSound(soundPath) {
			this.isPlaySound = true;
			this.soundPath = soundPath;
		}

		public stop(): void {
			this.endTime = 0;
			egret.stopTick(this.showTime, this);
			// this.tipsPanel.visible = false;
		}
		private lastTime = -1;
		private showTime(timestamp: number): boolean {
			let time = this.endTime - Math.floor(timestamp / 1000);
			if (time < 0) {
				this.stop();
			} else {
				if (this.needSound && this.lastTime != -1 && this.lastTime > time && time <= 5 && this.isPlaySound) {
					//播放倒计时音效
					SoundMenager.instance.playEffect(this.soundPath);
				}
				this.lastTime = time;
				this.countDownLabel.text = time.toString();
				if(this.needSound && time <= 3) {
					if(time != this.noticeRecord) {
						this.noticeRecord = time;
						this.noticeAnim.playerOnce();
						// game.bjl.BjlSoundPlayer.instance.playAlert();
					}
				}
			}
			return true;
		}
	}
}