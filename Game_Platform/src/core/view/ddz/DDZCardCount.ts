class DDZCardCount extends eui.Component implements eui.UIComponent {


	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public leftCountLabel: eui.BitmapLabel;
	private alertMc: game.Alert;
	private hasVoiced2: boolean = false;
	private hasVoiced1: boolean = false;
	private waitShowPlayerId: number;
	private waitShowCount: number;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.initAlert();
		if (this.waitShowCount > 0) {
			this.showCount(this.waitShowCount, this.waitShowPlayerId);
		}
	}

	private initAlert(): void {
		if (!this.alertMc) {
			this.alertMc = new game.Alert();
			this.addChild(this.alertMc);
		}
	}

	public init(sort: game.ddz.CardSort): void {
		this.initAlert();
		if (sort == game.ddz.CardSort.LEFT) {
			this.alertMc.left = 75;
		} else {
			this.alertMc.left = -75;
		}
		this.alertMc.top = 25;
		this.alertMc.visible = false;
	}

	public showAlert(): void {
		this.alertMc.visible = true;
		this.alertMc.play();
		game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.ALERT);
	}

	public showCount(count: number, playerId: number): void {
		this.waitShowCount = count;
		this.waitShowPlayerId = playerId;
		if (!this.leftCountLabel) return;
		this.leftCountLabel.text = count.toFixed(0);
		if (count == 2) {
			if (!this.hasVoiced2) {
				game.ddz.DDZSoundPlayer.instance.playVoice(playerId, game.ddz.DDZVoiceType.LEFT_CARD, 2);
				this.showAlert();
			}
			this.hasVoiced2 = true;
		} else if (count == 1) {
			if (!this.hasVoiced1) {
				game.ddz.DDZSoundPlayer.instance.playVoice(playerId, game.ddz.DDZVoiceType.LEFT_CARD, 1);
				this.showAlert();
			}
			this.hasVoiced1 = true;
		}
	}

	public clearFlag(): void {
		this.initAlert();
		this.hasVoiced1 = false;
		this.hasVoiced2 = false;
		this.alertMc.visible = false;
	}

}