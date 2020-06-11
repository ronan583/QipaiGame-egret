class CommonCardSoundPlayer {
	public constructor() {
	}
	private static _instance:CommonCardSoundPlayer;

	public static get instance():CommonCardSoundPlayer {
		if(CommonCardSoundPlayer._instance == null) {
			CommonCardSoundPlayer._instance = new CommonCardSoundPlayer();
		}
		return CommonCardSoundPlayer._instance;
	}

	public playerCardSelected()
	{
		SoundMenager.instance.playEffect("qynn_card_select_mp3");
	}

	public playerSendCard()
	{
		SoundMenager.instance.playEffect("qynn_sendcard_mp3");
	}

}