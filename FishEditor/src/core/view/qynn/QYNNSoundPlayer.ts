class QYNNSoundPlayer {
	public constructor() {
	}
	private static _instance: QYNNSoundPlayer;
	public static get instance(): QYNNSoundPlayer {
		if (QYNNSoundPlayer._instance == null) {
			QYNNSoundPlayer._instance = new QYNNSoundPlayer();
		}
		return QYNNSoundPlayer._instance;
	}

	public playQYNNBg(): void {
		SoundMenager.instance.playBg("qynn_bg_mp3");
	}

	public backToMainBg(): void {
		SoundMenager.instance.playBg("hallBG_mp3");
	}

	public playerGameStart() {
		SoundMenager.instance.playEffect("qynn_game_start_mp3");
	}

	public playerGameOver() {
		SoundMenager.instance.playEffect("qynn_game_over_mp3");
	}

	public playerShowCard() {
		SoundMenager.instance.playEffect("qynn_show_mp3");
	}

	public playerBanker() {
		SoundMenager.instance.playEffect("qynn_banker_mp3");

	}

	public playerGameWin() {
		SoundMenager.instance.playEffect("qynn_game_win_mp3");
	}

	public playerCardSelected() {
		SoundMenager.instance.playEffect("qynn_card_select_mp3");
	}

	public playerChoosing() {
		SoundMenager.instance.playEffect("qynn_choosing_mp3");
	}

	private curPlayWinCoinCount = 0;
	public playerFlyGold() {
		if (this.curPlayWinCoinCount > 10) return;
		this.curPlayWinCoinCount++;
		SoundMenager.instance.playEffect("qynn_fly_gold_mp3");
		// 默认1s后播完
		egret.setTimeout(() => {
			this.curPlayWinCoinCount--;
		}, this, 1000)
	}

	public playerSendCard() {
		SoundMenager.instance.playEffect("qynn_sendcard_mp3");
	}

	public playerCardType(value: number): void {
		let soundStr: string = "qynn_niu_";
		switch (value) {
			case 0: {
				soundStr += 0;
				break;
			}
			case 1: {
				soundStr += 1;
				break;
			}
			case 2: {
				soundStr += 2;
				break;
			}
			case 3: {
				soundStr += 3;
				break;
			}
			case 4: {
				soundStr += 4;
				break;
			}
			case 5: {
				soundStr += 5;
				break;
			}
			case 6: {
				soundStr += 6;
				break;
			}
			case 7: {
				soundStr += 7;
				break;
			}
			case 8: {
				soundStr += 8;
				break;
			}
			case 9: {
				soundStr += 9;
				break;
			}
			case 10: {
				soundStr += 10;
				break;
			}
			case 11: {
				soundStr += 11;
				break;
			}
			case 12: {
				soundStr += 12;
				break;
			}
		}
		if (soundStr != "") {
			SoundMenager.instance.playEffect(soundStr + "_mp3");
		}
	}

}