class PDKPokerCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.showCard0();
	}

	public cardBg: eui.Image;
	public landlord: eui.Image;
	private cardImg: eui.Image;
	private firstFlagImg: eui.Image;
	public card: number = 0;
	public kingType: game.ddz.KingType = game.ddz.KingType.NONE;
	public cardIndex: number = 1;

	public cardNumber: number = 0;

	public isSelect: boolean = false;
	public preSelect:boolean = false;
	private cardMask:eui.Image;
	private forbiddenMask:eui.Image;
	private _isForbbiden:boolean = false;

	public toggleSelect(): void {
		this.isSelect = !this.isSelect;
		if (this.isSelect) {
			this.y -= 40;
		} else {
			this.y += 40;
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

	public  get forbidden():boolean{
		return this._isForbbiden;
	}

	public set forbidden(v:boolean) {
		this._isForbbiden = v;
		this.forbiddenMask.visible = this._isForbbiden;
		if(this._isForbbiden) {
			this.cancelPreSelect();
			this.cancelSelect();
		}
	}

	public cancelPreSelect() {
		this.preSelect = false;
		this.cardMask.visible = false;
	}

	public setPreSleect() {
		if(this.forbidden) return;
		this.preSelect = true;
		this.cardMask.visible = true;
	}

	public cancelSelect() {
		this.preSelect = false;
		this.cardMask.visible = false;
		if(this.isSelect) {
			this.isSelect = false;
			this.y += 40;
			game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SELECT_CARD);
		}
	}

	public select() {
		this.preSelect = false;
		this.cardMask.visible = false;
		if(!this.isSelect) {
			this.isSelect = true;
			this.y -= 40;
			game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SELECT_CARD);
		}
	}

	public togglePreSelect() {
		this.preSelect = !this.preSelect;
		this.cardMask.visible = this.preSelect;
	}

	private showCard0(): void {
		if (this.cardNumber == 0) return;
		let cardN = this.card = Math.floor(this.cardNumber / 4);
		if (cardN == 14) {
			cardN = 1;
		} else if (cardN == 15) {
			cardN = 2;
		} else if (cardN == 16) {
			// 小王
			this.kingType = game.ddz.KingType.SMALL;
		} else if (cardN == 17) {
			// 大王
			this.kingType = game.ddz.KingType.BIG;
		}
		this.cardImg.source = "oc_" + this.cardNumber;

		if(this.cardNumber == 14) {
			this.firstFlagImg.visible = true;
		} else {
			this.firstFlagImg.visible = false;
		}
	}

	private originX: number = 0;
	private originY: number = 0;

	public showAnim(): void {
		this.originX = this.x;
		this.originY = this.y;
		this.x = this.x + 400;
		this.y = this.y - 150;
		this.alpha = 0;
		var tween: egret.Tween = egret.Tween.get(this);
		tween.to({ alpha: 1, x: this.originX, y: this.originY }, 100);
		game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.SEND_CARD);
	}
}