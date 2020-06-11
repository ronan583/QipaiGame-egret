module game.brnn {
	export class BrnnSoundPlayer {
		public constructor() {
		}
		private static _instance:BrnnSoundPlayer;
		public static get instance():BrnnSoundPlayer {
			if(BrnnSoundPlayer._instance == null) {
				BrnnSoundPlayer._instance = new BrnnSoundPlayer();
			}
			return BrnnSoundPlayer._instance;
		}

		public playBg():void {
			SoundMenager.instance.playBg("brnn_bg_mp3");
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playStartBet()
		{
			SoundMenager.instance.playEffect("brnn_start_mp3");
		}

		public playStopBet()
		{
			SoundMenager.instance.playEffect("brnn_stop_mp3");
		}

		public playShow()
		{
			
			SoundMenager.instance.playEffect("brnn_show_mp3");
		}

		public playBetAction()
		{
			SoundMenager.instance.playEffect("brnn_stop_mp3");
		}

		public playBetCoin()
		{
			SoundMenager.instance.playEffect("brnn_betcoin_mp3");
		}

		public playBetOn() {
			SoundMenager.instance.playEffect("brnn_on_bet_mp3");
		}
		
		public playCountDown()
		{
			SoundMenager.instance.playEffect("brnn_countdown_mp3");
		}

		public playFail()
		{
			SoundMenager.instance.playEffect("brnn_fail_mp3");
		}
		
		public playValid()
		{
			SoundMenager.instance.playEffect("brnn_valid_mp3");
		}
		
		public playWin()
		{
			SoundMenager.instance.playEffect("brnn_win_mp3");
		}

		public playWin1()
		{
			SoundMenager.instance.playEffect("brnn_win1_mp3");
		}

		public playLose()
		{		
			SoundMenager.instance.playEffect("brnn_lose_mp3");
		}

		private curPlayWinCoinCount = 0;
		public playWinCoin()
		{
			if(this.curPlayWinCoinCount > 10) return;
			this.curPlayWinCoinCount++;
			SoundMenager.instance.playEffect("brnn_wincoin_mp3");
			// 默认1s后播完
			egret.setTimeout(()=>{
				this.curPlayWinCoinCount--;
			}, this, 1000)
		}
		

		public playerCardType(value : number) : void 
		{
			let soundStr:string = "cow";
			switch(value)
			{
				case 0:{
					soundStr += 0;
					break;
				}
				case 1:{
					soundStr += 1;
					break;
				}
				case 2:{
					soundStr += 2;
					break;
				}
				case 3:{
					soundStr += 3;
					break;
				}
				case 4:{
					soundStr += 4;
					break;
				}
				case 5:{
					soundStr += 5;
					break;
				}
				case 6:{
					soundStr += 6;
					break;
				}
				case 7:{
					soundStr += 7;
					break;
				}
				case 8:{
					soundStr += 8;
					break;
				}
				case 9:{
					soundStr += 9;
					break;
				}
				case 10:
				{
					soundStr += 10;
					break;
				}
				case 11:
				{
					soundStr += 11;
					break;
				}
				case 12:
				{
					soundStr += 12;
					break;
				}
			}
			if(soundStr != "") {
				SoundMenager.instance.playEffect(soundStr+"_mp3");
			}
		}

	}
}