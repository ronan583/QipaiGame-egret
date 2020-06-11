module game.lhdz {
	export class LhdzSoundPlayer {
		public constructor() {
		}
		private static _instance: LhdzSoundPlayer;
		public static get instance(): LhdzSoundPlayer {
			if (LhdzSoundPlayer._instance == null) {
				LhdzSoundPlayer._instance = new LhdzSoundPlayer();
			}
			return LhdzSoundPlayer._instance;
		}


		public playBg(): void {
			SoundMenager.instance.playBg("lhdz_bg_mp3");
		}

		public playCountDownSound() {
			SoundMenager.instance.playEffect("lhdz_countdown_mp3");
		}

		public playTouch() {
			SoundMenager.instance.playEffect("fqzs_touch_mp3");
		}

		public playAlert() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_alert_mp3");
		}

		public playShow() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_show_mp3");
		}

		public playStartBet() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_start_mp3");
		}

		public playVs() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_vs_mp3");
		}


		public playBetAction() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_on_bet_mp3");
		}

		public playBetCoin() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_bet_mp3");
		}

		public playStopBet() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_stop_mp3");
		}

		public playFlipCard() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_flipcard_mp3");
		}

		public playCardType(value: number): void {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			let soundStr: string = "lhb_p_" + value;
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}

		public playHe() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_he_mp3");
		}

		public playLongWin() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_long_win_mp3");
		}

		public playHuWin() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_hu_win_mp3");
		}

		private curPlayWinCoinCount = 0;
		public playWinCoin() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			if (this.curPlayWinCoinCount > 10) return;
			this.curPlayWinCoinCount++;
			SoundMenager.instance.playEffect("lhdz_win_bet_mp3");
			// 默认1s后播完
			egret.setTimeout(() => {
				this.curPlayWinCoinCount--;
			}, this, 1000)
		}

		public playSelfWin() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(LhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("lhdz_win_game_mp3");
		}
	}
}