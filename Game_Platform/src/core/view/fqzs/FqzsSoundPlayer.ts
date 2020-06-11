module game.fqzs {
	export class FqzsSoundPlayer {
		public constructor() {
		}
		private static _instance: FqzsSoundPlayer;
		public static get instance(): FqzsSoundPlayer {
			if (FqzsSoundPlayer._instance == null) {
				FqzsSoundPlayer._instance = new FqzsSoundPlayer();
			}
			return FqzsSoundPlayer._instance;
		}

		public playBg(): void {
			SoundMenager.instance.stopBg();
			SoundMenager.instance.playBg("fqzs_bg_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playSkip(): void {
			SoundMenager.instance.playEffect("fqzs_skip_mp3");
		}


		private curPlayWinCoinCount = 0;
		public playCoin() {
			if (this.curPlayWinCoinCount > 10) return;
			this.curPlayWinCoinCount++;
			SoundMenager.instance.playEffect("fqzs_coin_mp3");
			// 默认1s后播完
			egret.setTimeout(() => {
				this.curPlayWinCoinCount--;
			}, this, 1000)
		}

		public playCountDown() {
			SoundMenager.instance.playEffect("fqzs_countdown_mp3");
		}

		public playLose() {
			SoundMenager.instance.playEffect("fqzs_my_lose_mp3");
		}

		public playWin() {
			SoundMenager.instance.playEffect("fqzs_my_win_mp3");
		}

		public playResult() {
			SoundMenager.instance.playEffect("fqzs_result_mp3");
		}

		public playStartBet() {
			SoundMenager.instance.playEffect("fqzs_startBet_mp3");
		}

		public playStopBet() {
			SoundMenager.instance.playEffect("fqzs_stopBet_mp3");
		}

		public playBankerChange() {
			SoundMenager.instance.playEffect("fqzs_banker_change_mp3");
		}

		public playTouch() {
			SoundMenager.instance.playEffect("fqzs_touch_mp3");
		}

		public playWinType(type): void {
			let soundStr: string = "fqzs_win_" + type;
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}
	}
}