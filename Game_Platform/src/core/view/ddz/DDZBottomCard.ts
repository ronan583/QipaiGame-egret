class DDZBottomCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cards = [this.card1, this.card2, this.card3]
		this.oriCards = [this.oriCard1, this.oriCard2, this.oriCard3]
		this.cardPosArr = [];
		for(let card of this.cards) {
			card.visible = false;
		}
		for(let card of this.oriCards) {
			card.visible = false;
			this.cardPosArr.push(egret.Point.create(card.x, card.y));
		}
	}
	public bindBattleUI:game.ddz.DDZBattleUI;
	public card1: DDZSmallPoker;
	public card2: DDZSmallPoker;
	public card3: DDZSmallPoker;

	private oriCard1: DDZPokerCard;
	private oriCard2: DDZPokerCard;
	private oriCard3: DDZPokerCard;

	private cards:Array<DDZSmallPoker>;
	private oriCards:Array<DDZPokerCard>;
	private cardPosArr:Array<egret.Point>;

	public showBack(): void {
		this.card1.showFrontOrBack(game.CardDirection.BACK);
		this.card2.showFrontOrBack(game.CardDirection.BACK);
		this.card3.showFrontOrBack(game.CardDirection.BACK);
		CommonUtil.removeTimeout(this);
		this.isPlayingBottomAnim = false;
	}

	public showBottomCard(cards: Array<number>): void {
		egret.log("show bottom card : " + cards.join(","));
		if(this.card1.isBackShow()) {
			this.showBottomCardInAnim(cards);
			egret.log("showBottomCardInAnim : " + cards.join(","));
		} else {
			this.showBottomCardDirect(cards);
		}
	}

	public showBottomCardDirect(cards: Array<number>): void {
		if (cards.length < 3) return;
		for(let i=0;i<cards.length;i++) {
			this.cards[i].showCard(cards[i]);
		}
		for(let card of this.oriCards) {
			card.visible = false;
		}
	}

	private isPlayingBottomAnim = false;
	public showBottomCardInAnim(cards: Array<number>): void {
		if(this.isPlayingBottomAnim) return;
		this.isPlayingBottomAnim = true;
		for(let i=0;i<this.oriCards.length;i++) {
			this.oriCards[i].visible = true;
			this.oriCards[i].x = this.cardPosArr[i].x;
			this.oriCards[i].y = this.cardPosArr[i].y;
			this.oriCards[i].showFlipCard(cards[i]);
			this.oriCards[i].scaleX = this.oriCards[i].scaleY = 1;
			this.oriCards[i].alpha = 1;
			this.cards[i].visible = false;
		}
		let holder = this;
		CommonUtil.registerTimeOut(()=>{
			for(let i=0;i<cards.length;i++) {
				if(!holder.oriCards) return;
				let fromCard = holder.oriCards[i];
				let toCard = holder.cards[i];
				let cardValue = cards[i];
				egret.Tween.get(fromCard).to({x:toCard.x, y:toCard.y, scaleX:0.2, scaleY:0.2, alpha:0}, 300).call(
					()=>{
						toCard.visible = true;
						toCard.showCard(cardValue);
						holder.isPlayingBottomAnim = false;
					}, holder
				)
			}
		}, this, 500);
	}

}