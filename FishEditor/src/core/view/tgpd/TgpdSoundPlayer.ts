class TgpdSoundPlayer {
	public constructor() {
	}
	private static _instance:TgpdSoundPlayer;
	public static get instance():TgpdSoundPlayer {
		if(TgpdSoundPlayer._instance == null) {
			TgpdSoundPlayer._instance = new TgpdSoundPlayer();
		}
		return TgpdSoundPlayer._instance;
	}

	public playBg(layerIndex):void {
		SoundMenager.instance.playBg("tgpd_background" + layerIndex + "_mp3");
	}

	public backToMainBg():void {
		SoundMenager.instance.playBg("hallBG_mp3");
	}

	public playerGameStart()
	{
		SoundMenager.instance.playEffect("tgpd_start_mp3");
	}

	public playerClear()
	{
		SoundMenager.instance.playEffect("tgpd_clear_mp3");
	}

	public playerShowPass()
	{
		SoundMenager.instance.playEffect("tgpd_pass_mp3");
	}

	public playerButton()
	{
		SoundMenager.instance.playEffect("tgpd_button_mp3");

	}

	public playerGameWin()
	{
		SoundMenager.instance.playEffect("qynn_game_win_mp3");
	}

	public playerCardSelected()
	{
		SoundMenager.instance.playEffect("qynn_card_select_mp3");
	}

	public playerChoosing()
	{
		SoundMenager.instance.playEffect("qynn_choosing_mp3");
	}

	public playerFlyGold()
	{
		SoundMenager.instance.playEffect("qynn_fly_gold_mp3");
	}

	public playerSendCard()
	{
		SoundMenager.instance.playEffect("qynn_sendcard_mp3");
	}


}