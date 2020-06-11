module game.by {
	export enum BYSoundType {
		CLICK,
		SHOOT,
		WARNING,
		SINGLE_COIN,
		BOOM
	}

	export class BYSoundPlayer {
		private static _instance:BYSoundPlayer;
		public static get instance():BYSoundPlayer {
			if(BYSoundPlayer._instance == null) {
				BYSoundPlayer._instance = new BYSoundPlayer();
			}
			return BYSoundPlayer._instance;
		}

		private soundMap:{[key:number]: string;} = {}

		public constructor() {
			this.soundMap[BYSoundType.CLICK] = "click_mp3";
			this.soundMap[BYSoundType.SHOOT] = "shoot_mp3";
			this.soundMap[BYSoundType.WARNING] = "warning_mp3";
			this.soundMap[BYSoundType.SINGLE_COIN] = "singleCoin_mp3";
			this.soundMap[BYSoundType.BOOM] = "boom_mp3";
		}

		public playBg():void {
			SoundMenager.instance.playBg("bybg1_mp3");
		}

		public playEndBg():void {
			SoundMenager.instance.playBg("ddz_s_bg_mp3");
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playSound(soundType:BYSoundType) {
			let byBattleMediator:game.BYBattleMediator = AppFacade.instance.retrieveMediator(BYBattleMediator.NAME) as game.BYBattleMediator;
			if(byBattleMediator == null || !byBattleMediator.isUIShow()) {
				return;
			}
			let soundStr:string = this.soundMap[soundType];
			if(soundStr != undefined && soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

		public playDeadVoice():void {
			if(CommonUtil.RandomRange(0,1) < 0.5) {
				SoundMenager.instance.playVoice("byvoice_" + CommonUtil.RandomRangeInt(1,15) + "_mp3");
			}
		}

	}
}