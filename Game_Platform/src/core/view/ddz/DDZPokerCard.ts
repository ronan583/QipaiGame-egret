class DDZPokerCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.showCard0();
		this.cardMask.visible = false;
	}

	public cardBg: eui.Image;
	public landlord: eui.Image;
	private cardImg: eui.Image;

	public card: number = 0;
	public kingType: game.ddz.KingType = game.ddz.KingType.NONE;
	public cardIndex: number = 1;

	public cardNumber: number = 0;
	public moveRightCount:number = 0;
	public isSelect: boolean = false;	
	public preSelect:boolean = false;
	private cardMask:eui.Image;

	public toggleSelect(): void {
		this.preSelect = false;
		this.cardMask.visible = false;
		this.isSelect = !this.isSelect;
		if (this.isSelect) {
			this.y -= 40;
		} else {
			this.y += 40;
		}
		game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SELECT_CARD);
	}

	public cancelPreSelect() {
		this.preSelect = false;
		this.cardMask.visible = false;
	}

	public setPreSleect() {
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

	public showCard(cardNum: number): void {
		this.cardNumber = cardNum;
		if (this.stage == null) {
			return;
		} else {
			this.showCard0();
		}
	}

	public showLandlord(): void {
		this.landlord.visible = true;
	}

	private showCard0(): void {
		this.showFrontOrBack(game.CardDirection.FRONT);
		this.landlord.visible = false;
		let cardN = this.card = Math.floor(this.cardNumber / 4);
		if (cardN == 16) {
			// 小王
			this.kingType = game.ddz.KingType.SMALL;
		} else if (cardN == 17) {
			// 大王
			this.kingType = game.ddz.KingType.BIG;
		}
		this.cardImg.source = "oc_" + this.cardNumber;
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
		game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SEND_CARD);
	}

	public showFrontOrBack(cardDir:game.CardDirection) {
		if(cardDir == game.CardDirection.BACK) {
			this.cardBg.visible = true;
			this.cardImg.visible = false;
		} else {
			this.cardBg.visible = false;
			this.cardImg.visible = true;
		}
	}

	public showFlipCard(cardNum:number):void {
		this.showFrontOrBack(game.CardDirection.BACK);
		this.landlord.visible = false;
		this.scaleX = -1;
		var tw:egret.Tween = egret.Tween.get(this);
		var holder = this;
		tw.to({scaleX:0},250).call(()=>{
			tw = egret.Tween.get(this);
			holder.showCard(cardNum);
			tw.to({scaleX:1},250);
		});
	}

}