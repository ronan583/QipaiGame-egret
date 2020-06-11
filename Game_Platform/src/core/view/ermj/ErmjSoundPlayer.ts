module game.ermj {
	export class ErmjSoundPlayer {
		public constructor() {
		}
		private static _instance: ErmjSoundPlayer;
		public static get instance(): ErmjSoundPlayer {
			if (ErmjSoundPlayer._instance == null) {
				ErmjSoundPlayer._instance = new ErmjSoundPlayer();
			}
			return ErmjSoundPlayer._instance;
		}

		public playBg(): void {
			SoundMenager.instance.stopBg();
			SoundMenager.instance.playBg("ermj_bg_mp3");
		}
		public playTingBg(): void {
			SoundMenager.instance.playBg("ermj_ting_bg_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playZimo() {
			SoundMenager.instance.playEffect("ermj_zimo_mp3");
		}

		public playFangqiang() {
			SoundMenager.instance.playEffect("ermj_fangqiang_mp3");
		}

		public playDraw() {
			SoundMenager.instance.playEffect("ermj_draw_mp3");
		}

		public playSendCard() {
			SoundMenager.instance.playEffect("ermj_sendcard_mp3");
		}

		public playDouble() {
			SoundMenager.instance.playEffect("ermj_double_mp3");
		}

		public playCountDown() {
			SoundMenager.instance.playEffect("ermj_countdown_mp3");
		}

		public playLose() {
			SoundMenager.instance.playEffect("ermj_lose_mp3");
		}

		public playHu() {
			SoundMenager.instance.playEffect("ermj_hu_mp3");
		}

		public playWin() {
			SoundMenager.instance.playEffect("ermj_win_mp3");
		}

		public playCardType(type): void {
			let soundStr: string = "ermj_" + type;
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}
		public playMeCardType(type): void {
			let soundStr: string = "ermj_me_" + type;
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}

	}
}