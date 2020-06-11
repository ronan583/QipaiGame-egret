module game.hhdz {
	export class HhdzSoundPlayer {
		public constructor() {
		}
		private static _instance: HhdzSoundPlayer;
		public static get instance(): HhdzSoundPlayer {
			if (HhdzSoundPlayer._instance == null) {
				HhdzSoundPlayer._instance = new HhdzSoundPlayer();
			}
			return HhdzSoundPlayer._instance;
		}


		public playBg(): void {
			SoundMenager.instance.playBg("hhdz-bg_mp3");
		}

		public playAlert() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_alert_mp3");
		}
		public playBattle() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz-battle_mp3");
		}

		public playShow() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_show_mp3");
		}

		public playStartBet() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz-start_mp3");
		}

		private curPlayWinCoinCount = 0;
		public playBetAction() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			if(this.curPlayWinCoinCount > 10) return;
			this.curPlayWinCoinCount++;
			SoundMenager.instance.playEffect("hhdz-bet_mp3");
			egret.setTimeout(()=>{
				this.curPlayWinCoinCount--;
			}, this, 1000)
		}

		public playBetCoin() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_bet_mp3");
		}

		public playStopBet() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz-stop_mp3");
		}
		public playDownTime() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz-down-time_mp3");
		}

		public playFlipCard() {
			let mediator: game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_flipcard_mp3");
		}

		public playCardType(value: number): void {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz-cardtype-" + value + "_mp3");
		}


		public playWinCoin() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_win_bet_mp3");
		}


		public playSelfWin() {
			let mediator: game.hhdz.HhdzBattleMediator = AppFacade.instance.retrieveMediator(HhdzBattleMediator.NAME) as game.hhdz.HhdzBattleMediator;
			if (mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("hhdz_win_game_mp3");
		}
	}
}