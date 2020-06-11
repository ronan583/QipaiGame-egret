module game.sgj {
	export enum FruitSoundType {
		FRUIT_BACKGROUND,
		BG_FREE,
		BIG_WIN,
		SMALL_BOOM,
		SMALL_FRUIT,
		START,
		WIN_BIG,
		WIN_LITTLE,
	}

	export class FruitSoundPlayer {
		private static _instance:FruitSoundPlayer;
		public static get instance():FruitSoundPlayer {
			if(FruitSoundPlayer._instance == null) {
				FruitSoundPlayer._instance = new FruitSoundPlayer();
			}
			return FruitSoundPlayer._instance;
		}

		private soundMap:{[key:number]: string;} = {}

		public constructor() {
			this.soundMap[FruitSoundType.FRUIT_BACKGROUND] = "fruit_background_mp3";
			this.soundMap[FruitSoundType.BG_FREE] = "fruit_bgFree_mp3";
			this.soundMap[FruitSoundType.BIG_WIN] = "fruit_bigWin_mp3";
			this.soundMap[FruitSoundType.SMALL_BOOM] = "fruit_smallBoom_mp3";
			this.soundMap[FruitSoundType.SMALL_FRUIT] = "fruit_smallFruit_mp3";
			this.soundMap[FruitSoundType.START] = "fruit_start_mp3";
			this.soundMap[FruitSoundType.WIN_BIG] = "fruit_winBig_mp3";
			this.soundMap[FruitSoundType.WIN_LITTLE] = "fruit_winLittle_mp3";
		}

		public playBg():void {
			SoundMenager.instance.playBg("fruit_background_mp3");
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playRollSound() {
			SoundMenager.instance.playEffect("fruit_roll_mp3");
		}

		public playSound(soundType:FruitSoundType) {
			let ddzMediator:game.sgj.FruitBattleMediator = AppFacade.instance.retrieveMediator(FruitBattleMediator.NAME) as game.sgj.FruitBattleMediator;
			if(ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}
			let soundStr:string = this.soundMap[soundType];
			if(soundStr != undefined && soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

	}
}
