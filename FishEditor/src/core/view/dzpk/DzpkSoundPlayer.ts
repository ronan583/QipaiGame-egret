module game.dzpk {
	export enum DZPKSoundType {
		WIN,
		PASS_NEXT,
		CHIP,
		CHIP_COLLECT,
		CARD_TRYPE_1,
		CARD_TRYPE_2,
		CARD_TRYPE_3,
		CARD_TRYPE_4,
		CARD_TRYPE_5,
		DROP_CARD,
		ALL_IN,
		HALF_TIME,
		MY_TURN,
	}

	export enum DZPKVoiceType {
		DROP_CARD,
		ALL_IN,
		FOLLOW,
		RAISE
	}

	export class DZPKSoundPlayer {
		private static _instance: DZPKSoundPlayer;
		public static get instance(): DZPKSoundPlayer {
			if (DZPKSoundPlayer._instance == null) {
				DZPKSoundPlayer._instance = new DZPKSoundPlayer();
			}
			return DZPKSoundPlayer._instance;
		}

		private soundMap: { [key: number]: string; } = {}

		public constructor() {
			this.soundMap[DZPKSoundType.WIN] = "dzpk_win_mp3";
			this.soundMap[DZPKSoundType.PASS_NEXT] = "dzpk_next_mp3";
			this.soundMap[DZPKSoundType.CHIP] = "dzpk_chipfly_mp3";
			this.soundMap[DZPKSoundType.CHIP_COLLECT] = "dzpk_collect_chip_mp3";
			this.soundMap[DZPKSoundType.CARD_TRYPE_1] = "dzpk_cardtype_1_mp3";
			this.soundMap[DZPKSoundType.CARD_TRYPE_2] = "dzpk_cardtype_2_mp3";
			this.soundMap[DZPKSoundType.CARD_TRYPE_3] = "dzpk_cardtype_3_mp3";
			this.soundMap[DZPKSoundType.CARD_TRYPE_4] = "dzpk_cardtype_4_mp3";
			this.soundMap[DZPKSoundType.CARD_TRYPE_5] = "dzpk_cardtype_5_mp3";
			this.soundMap[DZPKSoundType.DROP_CARD] = "dzpk_dropcard_mp3";
			this.soundMap[DZPKSoundType.ALL_IN] = "dzpk_allin_mp3";
			this.soundMap[DZPKSoundType.HALF_TIME] = "dzpk_half_time_mp3";
			this.soundMap[DZPKSoundType.MY_TURN] = "dzpk_my_turn_mp3";
		}

		public playBg(): void {
			SoundMenager.instance.playBg("dzpk_bgm_mp3");
		}

		public playEndWin(): void {
			SoundMenager.instance.playBg("dzpk_win_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playVoice(playerId: number, voiceType: DZPKVoiceType) {
			let ddzMediator: game.dzpk.DZPKBattleMediator = AppFacade.instance.retrieveMediator(DZPKBattleMediator.NAME) as game.dzpk.DZPKBattleMediator;
			if (ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}

			let player: PlayerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
			if (player == null) return;
			let suffix: string = player.headNum > 7 ? "_girl_mp3" : "_boy_mp3";
			let soundStr: string = "";
			if (voiceType == DZPKVoiceType.ALL_IN) {
				soundStr = "dzpk_allin" + suffix;
			} else if (voiceType == DZPKVoiceType.DROP_CARD) {
				soundStr = "dzpk_fold" + suffix;
			} else if (voiceType == DZPKVoiceType.FOLLOW) {
				soundStr = "dzpk_call" + suffix;
			} else if (voiceType == DZPKVoiceType.RAISE) {
				soundStr = "dzpk_raise" + suffix;
			}
			if (soundStr != "") {
				SoundMenager.instance.playVoice(soundStr);
			}
		}

		public playSound(soundType: DZPKSoundType) {
			let dzpkMediator: game.dzpk.DZPKBattleMediator = AppFacade.instance.retrieveMediator(DZPKBattleMediator.NAME) as game.dzpk.DZPKBattleMediator;
			if (dzpkMediator == null || !dzpkMediator.isUIShow()) {
				return;
			}
			let soundStr: string = this.soundMap[soundType];
			if (soundStr != undefined && soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

	}
}