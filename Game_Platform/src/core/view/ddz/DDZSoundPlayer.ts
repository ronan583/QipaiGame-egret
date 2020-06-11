module game.ddz {
	export enum DDZSoundType {
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
	}

	export enum DDZVoiceType {
		PLAY_CARD,
		RATE,
		DOUBLE,
		PASS,
		LEFT_CARD
	}

	export class DDZSoundPlayer {
		private static _instance: DDZSoundPlayer;
		public static get instance(): DDZSoundPlayer {
			if (DDZSoundPlayer._instance == null) {
				DDZSoundPlayer._instance = new DDZSoundPlayer();
			}
			return DDZSoundPlayer._instance;
		}

		private soundMap: { [key: number]: string; } = {}

		public constructor() {
			this.soundMap[DDZSoundType.LOSE] = "ddz_lose_mp3";
			this.soundMap[DDZSoundType.WIN] = "ddz_win_mp3";
			this.soundMap[DDZSoundType.ALERT] = "ddz_s_alert_mp3";
			this.soundMap[DDZSoundType.BG] = "ddz_bg_mp3";
			this.soundMap[DDZSoundType.END_BG] = "ddz_s_bg_mp3";
			this.soundMap[DDZSoundType.SPRING] = "ddz_s_spring_mp3";
			this.soundMap[DDZSoundType.BOMB] = "ddz_s_bomb_mp3";
			this.soundMap[DDZSoundType.PLANE] = "ddz_s_plane_mp3";
			this.soundMap[DDZSoundType.PLAYCARD] = "ddz_s_playcard_mp3";
			this.soundMap[DDZSoundType.ROCKET] = "ddz_s_rocket_mp3";
			this.soundMap[DDZSoundType.SELECT_CARD] = "ddz_s_selectcard_mp3";
			this.soundMap[DDZSoundType.SEND_CARD] = "ddz_s_sendcard_mp3";
			this.soundMap[DDZSoundType.STRAIGHT] = "ddz_s_straight_mp3";
			this.soundMap[DDZSoundType.DOUBLE_STRAIGHT] = "ddz_s_doublestraight_mp3";
		}

		public playBg(): void {
			SoundMenager.instance.playBg("ddz_bg_mp3");
		}

		public playEndBg(): void {
			SoundMenager.instance.playBg("ddz_s_bg_mp3");
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playVoice(playerId: number, voiceType: DDZVoiceType, params: any) {
			let ddzMediator: game.ddz.DDZBattleMediator = AppFacade.instance.retrieveMediator(DDZBattleMediator.NAME) as game.ddz.DDZBattleMediator;
			if (ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}

			let player: PlayerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
			if (player == null) return;
			let suffix: string = game.UserService.instance.sex == false ? "ddz_female_" : "ddz_male_";
			let soundStr: string = "";
			if (voiceType == DDZVoiceType.RATE) {
				soundStr = suffix + "rate_" + params + "_mp3";
			} else if (voiceType == DDZVoiceType.DOUBLE) {
				if (params == 2) {
					soundStr = suffix + "double_mp3";
				} else if (params == 1) {
					soundStr = suffix + "no_double_mp3";
				}
			} else if (voiceType == DDZVoiceType.PASS) {
				soundStr = suffix + "pass_" + CommonUtil.RandomRangeInt(0, 2).toFixed(0) + "_mp3";
			} else if (voiceType == DDZVoiceType.PLAY_CARD) {
				if (params[0] == game.ddz.CardType.SINGLE) {
					if (params[1] == 16) {
						soundStr = suffix + "blackjoker_mp3";
					} else if (params[1] == 17) {
						soundStr = suffix + "redjoker_mp3";
					} else {
						soundStr = suffix + "single" + (params[1] - 2) + "_mp3";
					}
				} else if (params[0] == game.ddz.CardType.DUAD) {
					soundStr = suffix + "pair" + (params[1] - 2) + "_mp3";
				} else if (params[0] == game.ddz.CardType.BOMB) {
					soundStr = suffix + "bomb_mp3";
				} else if (params[0] == game.ddz.CardType.MANY_DUAD) {
					soundStr = suffix + "doubelstraight_mp3";
				} else if (params[0] == game.ddz.CardType.PLANE) {
					soundStr = suffix + "plane_mp3";
				} else if (params[0] == game.ddz.CardType.SHUN_ZI) {
					soundStr = suffix + "straight_mp3";
				} else if (params[0] == game.ddz.CardType.THREE) {
					soundStr = suffix + "triple_mp3";
				} else if (params[0] == game.ddz.CardType.KING_BOMB) {
					soundStr = suffix + "rocket_mp3";
				} else if (params[0] == game.ddz.CardType.THREE_TO_ONE) {
					soundStr = suffix + "3and1_mp3";
				} else if (params[0] == game.ddz.CardType.THREE_TO_TWO) {
					soundStr = suffix + "3and2_mp3";
				} else if (params[0] == game.ddz.CardType.FOUR_TO_TWO) {
					soundStr = suffix + "4and2_mp3";
				} else if (params[0] == game.ddz.CardType.FOUR_TO_FOUR) {
					soundStr = suffix + "4and1_mp3";
				}
			} else if (voiceType == DDZVoiceType.LEFT_CARD) {
				let select = game.UserService.instance.sex ? 1 : CommonUtil.RandomRangeInt(1, 3)
				if (params == 1) {
					soundStr = suffix + "left1_" + select.toFixed(0) + "_mp3";
				} else if (params == 2) {
					soundStr = suffix + "left2_" + select.toFixed(0) + "_mp3";
				}
			}
			if (soundStr != "") {
				SoundMenager.instance.playVoice(soundStr);
			}
		}

		public playSound(soundType: DDZSoundType) {
			let ddzMediator: game.ddz.DDZBattleMediator = AppFacade.instance.retrieveMediator(DDZBattleMediator.NAME) as game.ddz.DDZBattleMediator;
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