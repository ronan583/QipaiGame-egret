module game.pdk {
	export enum PDKSoundType {
		LOSE,
		WIN,
		ALERT,
		BG,
		END_BG,
		SPRING,
		BOMB,
		PLANE,
		PLAYCARD,
		ROCKET,
		SELECT_CARD,
		SEND_CARD,
		STRAIGHT,
		DOUBLE_STRAIGHT,
		DOUNT_DOWN,
	}

	export enum PDKVoiceType {
		PLAY_CARD,
		RATE,
		DOUBLE,
		PASS,
		LEFT_CARD
	}

	export class PDKSoundPlayer {
		private static _instance: PDKSoundPlayer;
		public static get instance(): PDKSoundPlayer {
			if (PDKSoundPlayer._instance == null) {
				PDKSoundPlayer._instance = new PDKSoundPlayer();
			}
			return PDKSoundPlayer._instance;
		}

		private soundMap: { [key: number]: string; } = {}

		public constructor() {
			this.soundMap[PDKSoundType.LOSE] = "pdk_lose_mp3";
			this.soundMap[PDKSoundType.WIN] = "pdk_win_mp3";
			this.soundMap[PDKSoundType.ALERT] = "pdk_s_alert_mp3";
			this.soundMap[PDKSoundType.BG] = "pdk_bg_mp3";
			this.soundMap[PDKSoundType.END_BG] = "pdk_s_bg_mp3";
			this.soundMap[PDKSoundType.SPRING] = "pdk_s_spring_mp3";
			this.soundMap[PDKSoundType.BOMB] = "pdk_s_bomb_mp3";
			this.soundMap[PDKSoundType.PLANE] = "pdk_s_plane_mp3";
			this.soundMap[PDKSoundType.PLAYCARD] = "pdk_s_playcard_mp3";
			this.soundMap[PDKSoundType.ROCKET] = "pdk_s_rocket_mp3";
			this.soundMap[PDKSoundType.SELECT_CARD] = "pdk_s_selectcard_mp3";
			this.soundMap[PDKSoundType.SEND_CARD] = "pdk_s_sendcard_mp3";
			this.soundMap[PDKSoundType.STRAIGHT] = "pdk_s_straight_mp3";
			this.soundMap[PDKSoundType.DOUBLE_STRAIGHT] = "pdk_s_doublestraight_mp3";
			this.soundMap[PDKSoundType.DOUNT_DOWN] = "pdk_s_countdown_mp3";
		}

		public playBg(): void {
			SoundMenager.instance.playBg("pdk_bg_mp3");
		}

		public playEndBg(): void {
			SoundMenager.instance.playBg("pdk_s_bg_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playVoice(playerId: number, voiceType: PDKVoiceType, params: any) {
			let ddzMediator: game.ddz.DDZBattleMediator = AppFacade.instance.retrieveMediator(PDKBattleMediator.NAME) as game.ddz.DDZBattleMediator;
			if (ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}

			let player: PlayerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
			if (player == null) return;
			let suffix: string = game.UserService.instance.sex == false ? "pdk_female_" : "pdk_male_";
			let soundStr: string = "";
			if (voiceType == PDKVoiceType.RATE) {
				soundStr = suffix + "rate_" + params + "_mp3";
			} else if (voiceType == PDKVoiceType.DOUBLE) {
				if (params == 2) {
					soundStr = suffix + "double_mp3";
				} else if (params == 1) {
					soundStr = suffix + "no_double_mp3";
				}
			} else if (voiceType == PDKVoiceType.PASS) {
				soundStr = suffix + "pass_" + CommonUtil.RandomRangeInt(0, 2).toFixed(0) + "_mp3";
			} else if (voiceType == PDKVoiceType.PLAY_CARD) {
				if (params[0] == game.pdk.CardType.SINGLE) {
					if (params[1] == 16) {
						soundStr = suffix + "blackjoker_mp3";
					} else if (params[1] == 17) {
						soundStr = suffix + "redjoker_mp3";
					} else {
						soundStr = suffix + "single" + (params[1] - 2) + "_mp3";
					}
				} else if (params[0] == game.pdk.CardType.DUAD) {
					soundStr = suffix + "pair" + (params[1] - 2) + "_mp3";
				} else if (params[0] == game.pdk.CardType.BOMB) {
					soundStr = suffix + "bomb_mp3";
				} else if (params[0] == game.pdk.CardType.MANY_DUAD) {
					soundStr = suffix + "doubelstraight_mp3";
				} else if (params[0] == game.pdk.CardType.PLANE) {
					soundStr = suffix + "plane_mp3";
				} else if (params[0] == game.pdk.CardType.SHUN_ZI) {
					soundStr = suffix + "straight_mp3";
				} else if (params[0] == game.pdk.CardType.THREE) {
					soundStr = suffix + "triple_mp3";
				} else if (params[0] == game.pdk.CardType.THREE_TO_ONE) {
					soundStr = suffix + "3and1_mp3";
				} else if (params[0] == game.pdk.CardType.THREE_TO_TWO) {
					soundStr = suffix + "3and2_mp3";
				} else if (params[0] == game.pdk.CardType.FOUR_TO_ONE) {
					soundStr = suffix + "4and1_mp3";
				} else if (params[0] == game.pdk.CardType.FOUR_TO_TWO) {
					soundStr = suffix + "4and2_mp3";
				} else if (params[0] == game.pdk.CardType.FOUR_TO_THREE) {
					soundStr = suffix + "4and3_mp3";
				}
			} else if (voiceType == PDKVoiceType.LEFT_CARD) {
				if (params == 1) {
					soundStr = suffix + "left1_" + CommonUtil.RandomRangeInt(1, 3).toFixed(0) + "_mp3";
				} else if (params == 2) {
					soundStr = suffix + "left2_" + CommonUtil.RandomRangeInt(1, 3).toFixed(0) + "_mp3";
				}
			}
			if (soundStr != "") {
				SoundMenager.instance.playVoice(soundStr);
			}
		}

		public playSound(soundType: PDKSoundType) {
			let ddzMediator: game.ddz.DDZBattleMediator = AppFacade.instance.retrieveMediator(PDKBattleMediator.NAME) as game.ddz.DDZBattleMediator;
			if (ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}
			let soundStr: string = this.soundMap[soundType];
			if (soundStr != undefined && soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

	}
}