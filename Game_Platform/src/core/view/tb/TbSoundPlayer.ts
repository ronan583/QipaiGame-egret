module game.tb {
	export class TbSoundPlayer {
		public constructor() {
		}
		private static _instance:TbSoundPlayer;
		public static get instance():TbSoundPlayer {
			if(TbSoundPlayer._instance == null) {
				TbSoundPlayer._instance = new TbSoundPlayer();
			}
			return TbSoundPlayer._instance;
		}


		public playBg():void {
			SoundMenager.instance.playBg("dice_sound-dice-bg_mp3");
		}

		public playAlert()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-countdown_mp3");
		}


		public playStartBet()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-start-wager_mp3");
		}


		public playBetCoin()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-bethigh_mp3");
		}


		public playGetCoin()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-get-gold_mp3");
		}

		public playStopBet()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-end-wager_mp3");
		}

		public playTotalPoint(value : number) : void 
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_total-" + value + "_mp3");
			
		}

		public playSinglePoint(value : number) : void
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_" + value + "_mp3");
		}

		private curPlayWinCoinCount = 0;
		public playWinCoin()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			if(this.curPlayWinCoinCount > 10) return;
			this.curPlayWinCoinCount++;
			SoundMenager.instance.playEffect("dice_sound-gold_wav");
			egret.setTimeout(()=>{
				this.curPlayWinCoinCount--;
			}, this, 1000)
		}
		
		public playLoseCoin()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-lose_mp3");
		}
		
		public playShake()
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			SoundMenager.instance.playEffect("dice_sound-dice-shake_mp3");
		}
		

		public playResult(resultType)
		{
			let mediator:TbBattleMediator = AppFacade.instance.retrieveMediator(TbBattleMediator.NAME) as TbBattleMediator;
			if(mediator == null || !mediator.isUIShow()) {
				return;
			}
			if(resultType == 1)
			{
				SoundMenager.instance.playEffect("dice_big_mp3");
			}else if(resultType == 2)
			{
				SoundMenager.instance.playEffect("dice_small_mp3");
			}else if(resultType == 3)
			{
				SoundMenager.instance.playEffect("dice_tongchi_mp3");
			}
		}

		public changeZhuang()
		{
			SoundMenager.instance.playEffect("dice_zhuang-change_mp3");
		}
	}
}