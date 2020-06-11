class PokerCard extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.showCard0();
	}
	
	public cardBg:eui.Image;
	public cardNum:eui.Image;
	public flower:eui.Image;
	public flower1:eui.Image;
	public flowerSmall:eui.Image;
	public landlord:eui.Image;
	public king:eui.Image;
	
	public card:number = 0;
	public kingType:game.ddz.KingType = game.ddz.KingType.NONE;
	public cardIndex:number = 1;

	public cardNumber:number = 0;

	public isSelect:boolean = false;

	public toggleSelect():void {	
		this.isSelect = !this.isSelect;
		if(this.isSelect) {
			this.y -=40;
			var colorMatrix = [
				0.8,0.2,0,0,0,
				0.2,0.8,0,0,0,
				0.2,0.8,0,0,0,
				0,0,0,1,0
			];
			var flilter = new egret.ColorMatrixFilter(colorMatrix);
			this.filters = [flilter];
		} else {
			this.y +=40;
			this.filters = [];
		}
		game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SELECT_CARD);
		
	}

	public showCard(cardNum:number):void {
		if(this.stage == null) {
			this.cardNumber = cardNum;
			return ;
		} else {
			this.showCard0();
		}
	}

	public showLandlord():void {
		this.landlord.visible = true;
	}

	private showCard0():void {
		this.landlord.visible = false;
		let suit:number = Math.floor(this.cardNumber % 4);
		let cardN = this.card = Math.floor(this.cardNumber / 4);
		if(cardN == 14) {
			cardN = 1;
		} else if(cardN == 15) {
			 cardN = 2;
		} else if(cardN == 16) {
			 // 小王
			this.kingType = game.ddz.KingType.SMALL;
		} else if(cardN == 17) {
			 // 大王
			 this.kingType = game.ddz.KingType.BIG;
		}
		if(this.kingType != game.ddz.KingType.NONE) {
			this.king.source = 
				this.kingType == game.ddz.KingType.SMALL 
					? "ddz_black_joker" : "ddz_red_joker";
			this.cardNum.visible = this.flower.visible = this.flowerSmall.visible = this.flower1.visible = false;
		} else {
			this.king.visible = false;
			if(suit == game.CardSuit.CLUB || suit == game.CardSuit.SPADE) {
				this.cardNum.source = "ddz_b" + cardN;	
			} else {
				this.cardNum.source = "ddz_r" + cardN;	
			}
			
			this.flower.source = game.GameConst.getDDZSuitSource(suit);
			this.flowerSmall.source = this.flower.source + "_s";
			if(cardN == 11) {
				this.flower1.source = this.flower.source + "11";
				this.flower1.visible = true;
				this.flower.visible = false;
			} else if(cardN == 12) {
				this.flower1.source = this.flower.source + "12";
				this.flower1.visible = true;
				this.flower.visible = false;
			} else if(cardN == 13) {
				this.flower1.source = this.flower.source + "13";
				this.flower1.visible = true;
				this.flower.visible = false;
			} else {
				this.flower1.visible = false;
				this.flower.visible = true;
			}
		}
	}

	private originX:number = 0;
	private originY:number = 0;
	
	public showAnim():void {
		this.originX = this.x;
		this.originY = this.y;
		this.x = this.x + 400;
		this.y = this.y - 150;
		this.alpha = 0;
		var tween:egret.Tween = egret.Tween.get(this);
		tween.to({alpha:1, x:this.originX, y:this.originY}, 100);
		game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.SEND_CARD);
	}
	
}