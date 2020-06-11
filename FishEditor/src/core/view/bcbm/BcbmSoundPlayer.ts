module game.bcbm {
	export class BcbmSoundPlayer {
		public constructor() {
		}
		private static _instance: BcbmSoundPlayer;
		public static get instance(): BcbmSoundPlayer {
			if (BcbmSoundPlayer._instance == null) {
				BcbmSoundPlayer._instance = new BcbmSoundPlayer();
			}
			return BcbmSoundPlayer._instance;
		}

		public playBg(): void {
			//SoundMenager.instance.stopBg();
			SoundMenager.instance.playBg("bcbm_bg_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playSkip(): void {
			SoundMenager.instance.playEffect("bcbm_lotteryBg_mp3");
		}

		public playChip() {
			SoundMenager.instance.playEffect("bcbm_coin_mp3");
		}

		public playCountDown() {
			SoundMenager.instance.playEffect("fqzs_countdown_mp3");
		}

		public playLose() {
			SoundMenager.instance.playEffect("bcbm_result_lose_mp3");
		}

		public playWin() {
			SoundMenager.instance.playEffect("bcbm_result_win_mp3");
		}

		public playResult() {
			SoundMenager.instance.playEffect("fqzs_result_mp3");
		}

		public playStartBet() {
			SoundMenager.instance.playEffect("bcbm_startBet_mp3");
		}

		public playStopBet() {
			SoundMenager.instance.playEffect("bcbm_stopBet_mp3");
		}

		public playTouch() {
			SoundMenager.instance.playEffect("bcbm_touch_mp3");
		}

		public playWinType(type): void {
			let soundStr: string = "fqzs_win_" + type;
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}
	}
}