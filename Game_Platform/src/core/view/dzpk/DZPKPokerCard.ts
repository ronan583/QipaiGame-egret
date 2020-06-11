class DZPKPokerCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.huiseMask.mask = this.maskFlag;
	}

	public cardBg: eui.Image;
	public landlord: eui.Image;
	public card: number = 0;
	public cardIndex: number = 1;

	public cardNumber: number = 0;
	public huiseMask: eui.Rect;
	public maskFlag: eui.Image;

	public isSelect: boolean = false;

	public toggleSelect(): void {
		this.isSelect = !this.isSelect;
		if (this.isSelect) {
			this.y -= 40;
			var colorMatrix = [
				0.8, 0.2, 0, 0, 0,
				0.2, 0.8, 0, 0, 0,
				0.2, 0.8, 0, 0, 0,
				0, 0, 0, 1, 0
			];
			var flilter = new egret.ColorMatrixFilter(colorMatrix);
			this.filters = [flilter];
		} else {
			this.y += 40;
			this.filters = [];
		}
		game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.SELECT_CARD);

	}

	public showCard(cardNum: number): void {
		if (this.stage == null) {
			this.cardNumber = cardNum;
			return;
		} else {
			this.cardNumber = cardNum;
			this.showCard0();
		}
	}

	private showCard0(): void {
		if (this.cardNumber == 0) return;
		this.showFrontOrBack(game.CardDirection.FRONT);
		let suit: number = Math.floor(this.cardNumber % 4);
		let cardN = this.card = Math.floor(this.cardNumber / 4);
		if (cardN == 14) {
			cardN = 1;
		}
		this.cardBg.source = "sc_" + this.cardNumber;
	}

	/**
	 * 显示牌的正面或者背面
	 */
	public showFrontOrBack(cardDir: game.CardDirection): void {
		if (cardDir == game.CardDirection.FRONT) {
			this.cardBg.source = "c_12";
		} else {
			this.cardBg.source = "ndzpk_card";
		}
	}

	public showFlipCard(cardNum: number): void {
		this.showFrontOrBack(game.CardDirection.BACK);
		this.scaleX = -1;
		var tw: egret.Tween = egret.Tween.get(this);
		tw.to({ scaleX: 0 }, 250).call(() => {
			tw = egret.Tween.get(this);
			this.showCard(cardNum);
			tw.to({ scaleX: 1 }, 250);
		}, this);
	}

	public showSelected(selected: boolean): void {
		this.huiseMask.visible = !selected;
	}

	public clearSelected(): void {
		this.huiseMask.visible = false;
	}

}