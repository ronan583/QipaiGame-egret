/**
 * 扎金花三张牌组
 */
class ZJHCardGroup extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	public card1:ZJHCard;
	public card2:ZJHCard;
	public card3:ZJHCard;
	public cardArr: ZJHCard[];

	public cardTypeImg:eui.Image;

	private recordCardArrX:Array<number> = [];
	private recordCardArrY:Array<number> = [];

	private prevShowCards:Array<number> = [];

	private POS_LADY: number[] = [665, 180];
	private posDefault: egret.Point;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.card1.visible = false;
		this.card2.visible = false;
		this.card3.visible = false;

		this.cardTypeImg.visible = false;
		this.recordCardArrX = [this.card1.x, this.card2.x, this.card3.x];
		this.recordCardArrY = [this.card1.y, this.card2.y, this.card3.y];
		this.cardArr = [this.card1, this.card2, this.card3];
		this.posDefault = new egret.Point(this.x, this.y);
	}

	public hideCard():void {
		this.card1.showFrontOrBack(game.CardDirection.BACK);
		this.card2.showFrontOrBack(game.CardDirection.BACK);
		this.card3.showFrontOrBack(game.CardDirection.BACK);
		egret.Tween.removeTweens(this.card1);
		egret.Tween.removeTweens(this.card2);
		egret.Tween.removeTweens(this.card3);
		egret.Tween.removeTweens(this);
		this.recoverThis();
		this.recoverCards();
		this.hideCardType();
		this.visible = false;
	}

	public ShowCard():void {
		this.alpha = 1;
		this.card1.visible = true;
		this.card2.visible = true;
		this.card3.visible = true;
	}

	public showCardGroupGray(isGray: boolean){
		this.card1.showGray(isGray);
		this.card2.showGray(isGray);
		this.card3.showGray(isGray);
	}

	public foldCards(isSelf: boolean, flyPos: egret.DisplayObject, isLook: boolean = false): void{
		let delay = 0;
		let p : egret.Point = flyPos.parent.localToGlobal(flyPos.x, flyPos.y);
		let p1: egret.Point = this.globalToLocal(p.x, p.y);
		let p2: egret.Point = this.parent.globalToLocal(p.x, p.y);
		if(isSelf){
			for(let i = 0; i < 3; i++){
				let card = this.cardArr[i];
				if(isLook){
					this.card1.showFrontOrBack(game.CardDirection.BACK);
					this.card2.showFrontOrBack(game.CardDirection.BACK);
					this.card3.showFrontOrBack(game.CardDirection.BACK);
				}
				CommonUtil.registerTimeOut(() => {
					egret.Tween.get(card).to({ alpha: 0, rotation: 360, x: p1.x, y: p1.y, scaleX: 0.3, scaleY: 0.3 }, 400).call(() => {
						if (i == 2) {
							this.recoverCards();
							this.showCardGroupGray(true);
							if(isLook){
								this.card1.showCard(this.prevShowCards[0]);
								this.card2.showCard(this.prevShowCards[1]);
								this.card3.showCard(this.prevShowCards[2]);
							}
							this.y += 500;
							egret.Tween.get(this).to({ y: this.posDefault.y }, 500);
						}
					});
				}, this, delay);
				delay += 100;
			}
		} else{
			let tw = egret.Tween.get(this);
			tw.to({alpha: 0, scaleX: 0.3, scaleY: 0.3, x: p2.x, y: p2.y}, 600).call(()=>{
				this.recoverThis();
				this.visible = false;
			});
		}
	}

	public ShowCardContent(cards:Array<number>):void {
		this.visible = true;
		let isNeedRefresh:boolean = false;
		if(this.prevShowCards.length > 0) {
			for(let card of cards) {
				if(this.prevShowCards.indexOf(card) < 0) {
					isNeedRefresh = true;
				}
			}
		} else {
			isNeedRefresh = true;
		}
		if(isNeedRefresh) {
			this.prevShowCards = cards;
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			let upHeight = this.card1.height / 2;
			egret.Tween.get(this.card1).to({ y: this.recordCardArrY[0] - upHeight }, 200);
			egret.Tween.get(this.card2).to({ x: this.recordCardArrX[0], y: this.recordCardArrY[1] - upHeight }, 200);
			egret.Tween.get(this.card3).to({ x: this.recordCardArrX[0], y: this.recordCardArrY[2] - upHeight }, 200).call(() => {
				this.card1.showCard(cards[0]);
				this.card2.showCard(cards[1]);
				this.card3.showCard(cards[2]);
			}, this).wait(100).call(() => {
				egret.Tween.get(this.card1).to({ y: this.recordCardArrY[0] }, 400, egret.Ease.backIn);
				egret.Tween.get(this.card2).to({ y: this.recordCardArrY[1] }, 400, egret.Ease.backIn);
				egret.Tween.get(this.card3).to({ y: this.recordCardArrY[2] }, 400, egret.Ease.backIn).call(() => {
					egret.Tween.get(this.card2).to({ x: this.recordCardArrX[1] }, 500, egret.Ease.backOut);
					egret.Tween.get(this.card3).to({ x: this.recordCardArrX[2] }, 500, egret.Ease.backOut);
				})
			}, this);
		}
	}

	public showFapaiTween(index:number, battlUI:game.ZjhBattleUI) : void {
		let arr:ZJHCard[] = [this.card1,this.card2,this.card3];
		let bsCard = new BSTweenCard("zjh_self_card_bg");
		battlUI.addChild(bsCard);
		bsCard.scaleX = 0.3;
		bsCard.scaleY = 0.3;
		bsCard.x = Global.designRect.x / 2;
		bsCard.y = Global.designRect.y / 2;
		let targetPoint = this.localToGlobal(arr[index].x, arr[index].y);
		bsCard.startTween(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, this.scaleX, this.scaleY, arr[index]);
	}

	private setCardTypeImg(cardType:number):void {
		// 1.对子 2.顺子 3.同花 4.同花顺 5.豹子 -1没看牌
		if(cardType == 1) {
			this.cardTypeImg.source = "pairs";
		} else if(cardType == 2) {
			this.cardTypeImg.source = "straight";
		} else if(cardType == 3) {
			this.cardTypeImg.source = "gold_flower";
		} else if(cardType == 4) {
			this.cardTypeImg.source = "straight_gold";
		} else if(cardType == 5) {
			this.cardTypeImg.source = "panther";
		} else if(cardType == 0) {
			this.cardTypeImg.source = "zjh_single_card";
		}
		this.cardTypeImg.visible = true;
	}

	public showCardType(cardType:number):void {
		if(cardType <= 0) return;
		this.cardTypeImg.alpha = 1;
		this.setCardTypeImg(cardType);
		this.cardTypeImg.visible = true;
	}

	public recoverThis(){
		egret.Tween.removeTweens(this);
		this.x = this.posDefault.x;
		this.y = this.posDefault.y;
		this.scaleX = this.scaleY = 1;
		this.alpha = 1;		
	}

	public recoverCards() {
		egret.Tween.removeTweens(this);
		this.showCardGroupGray(false);
		for (let i = 0; i < 3; i++) {
			let card = this.cardArr[i];
			card.alpha = 1;
			card.scaleX = card.scaleY = 1;
			card.x = this.recordCardArrX[i];
			card.y = this.recordCardArrY[i];
			card.rotation = 0;
			egret.Tween.removeTweens(card);
		}
	}

	public hideCardType() {
		this.cardTypeImg.visible = false;
	}

	protected onLeave(){
		this.recoverCards();
	}
}
