module game.tb {
	export class TBBattleStartCountDown {
		public constructor() {
		}

		public countDownLabel: eui.BitmapLabel | eui.Label;
		public countdownDragonAnim: DragonAnim;
		private endTime: number;
		public isPlaySound = false;
		private soundPath = "";
		private hasAnimStart = false;
		public startCountDown(time: number): void {
			if (this.endTime > 0) {
				this.stop();
			}
			this.endTime = Math.floor(egret.getTimer() / 1000) + time;
			this.hasAnimStart = false;
			egret.startTick(this.showTime, this);
		}

		public setSound(soundPath) {
			this.isPlaySound = true;
			this.soundPath = soundPath;
		}


		public stop(): void {
			this.endTime = 0;
			this.countdownDragonAnim.stop();
			egret.stopTick(this.showTime, this);
			this.countdownDragonAnim.visible = false;
		}
		private lastTime = -1;
		private showTime(timestamp: number): boolean {
			let time = this.endTime - Math.floor(timestamp / 1000);
			if (time < 0) {
				this.stop();
			} else {
				if (this.lastTime != -1 && this.lastTime > time && time <= 3 && this.isPlaySound) {
					//播放倒计时音效
					SoundMenager.instance.playEffect(this.soundPath);
					if(!this.hasAnimStart) {
						if(time > 2) {
							this.countdownDragonAnim.visible = true;
							let begin = Math.floor((1 - time / 3) * 180)
							// this.countdownDragonAnim.playFromFrame(begin);
							this.countdownDragonAnim.playerOnce();
							this.hasAnimStart = true;
						}	
					}
				}
				this.lastTime = time;
				this.countDownLabel.text = time.toString();
			}
			return true;
		}
	}
}