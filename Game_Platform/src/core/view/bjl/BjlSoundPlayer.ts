module game.bjl {
	export class BjlSoundPlayer {
		public constructor() {
		}
		private static _instance:BjlSoundPlayer;
		public static get instance():BjlSoundPlayer {
			if(BjlSoundPlayer._instance == null) {
				BjlSoundPlayer._instance = new BjlSoundPlayer();
			}
			return BjlSoundPlayer._instance;
		}


		public playBg():void {
			SoundMenager.instance.playBg("bjl_bg_mp3");
		}

		public playAlert()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_alert_mp3");
		}

		public playShow()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_show_mp3");
		}

		public playStartBet()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_start_mp3");
		}


		public playBetAction()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_on_bet_mp3");
		}

		public playBetCoin()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_bet_mp3");
		}

		public playStopBet()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_stop_mp3");
		}

		public playFlipCard()
		{
			let mediator:game.lhdz.LhdzBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.lhdz.LhdzBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_flipcard_mp3");
		}


		public playWinCoin()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_win_bet_mp3");
		}
		
		

		public playPointNum(point)
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("point_" + point + "_mp3");
		}
		public playPoint8(point)
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_player_8_mp3");
		}
		public playPlayer()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_player_mp3");
		}
		public playPlayerWin()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_player_win_mp3");
		}
		public playPlayerAdd()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_player_add_mp3");
		}

		public playBanker()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_banker_mp3");
		}
		
		public playBankerWin()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_banker_win_mp3");
		}

		public playBankerAdd()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_banker_add_mp3");
		}

		public playTie()
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_tie_mp3");
		}

		public playXianPoint(point)
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("xian_point_" + point + "_mp3");
		}

		public playZhuangPoint(point)
		{
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("zhuang_point_" + point + "_mp3");
		}

		public playWin() {
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_end_win_mp3");
		}

		public playFail() {
			let mediator:game.bjl.BjlBattleMediator = AppFacade.instance.retrieveMediator(BjlBattleMediator.NAME) as game.bjl.BjlBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("bjl_end_fail_mp3");
		}
	}
}