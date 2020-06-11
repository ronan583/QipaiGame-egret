class DZPKPublicCards extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.cards = [this.card1, this.card2, this.card3, this.card4, this.card5];
		for (let card of this.cards) {
			card.visible = false;
		}
		this.origin1 = new egret.Point(this.card1.x, this.card1.y);
		this.origin2 = this.card2.x;
		this.origin3 = this.card3.x;
		this.origin4 = new egret.Point(this.card4.x, this.card4.y);
		this.origin5 = new egret.Point(this.card5.x, this.card5.y);
	}

	public card1: DZPKPokerCard;
	public card2: DZPKPokerCard;
	public card3: DZPKPokerCard;
	public card4: DZPKPokerCard;
	public card5: DZPKPokerCard;

	public cards: Array<DZPKPokerCard>;
	private cardValues: Array<number>;
	private lastShowIndex = 0;
	private cardBegin: eui.Group;

	private origin1: egret.Point;
	private origin2: number;
	private origin3: number;
	private origin4: egret.Point;
	private origin5: egret.Point;

	public showPublicCards(cardValues: Array<number>): void {
		if (!this.cards) return;
		if (cardValues.length <= 0) return;
		for (let c of cardValues) {
			if(this.cardValues.indexOf(c) < 0) {
				this.cardValues.push(c);
			}
		}
		egret.Tween.removeTweens(this.card1);
		egret.Tween.removeTweens(this.card2);
		egret.Tween.removeTweens(this.card3);
		if (this.lastShowIndex == 0) {
			// 第一次显示三张
			for(let i=0;i<3;i++) {
				this.cards[i].x = this.cardBegin.x;
				this.cards[i].y = this.cardBegin.y;
				this.cards[i].visible = true;
				this.cards[i].scaleX = this.cards[i].scaleY = 0.1;
				this.cards[i].showFrontOrBack(game.CardDirection.BACK)
				if(i == 2) {
					egret.Tween.get(this.cards[i]).to({ x: this.origin1.x, y: this.origin1.y, scaleX: 1, scaleY: 1 }, 300 +i * 100).call(()=>{
						this.card1.showCard(this.cardValues[0]);
						this.card2.showCard(this.cardValues[1]);
						this.card3.showCard(this.cardValues[2]);
						this.card2.x = this.card1.x;
						this.card3.x = this.card1.x;
						this.lastShowIndex = 2;
						egret.Tween.get(this.card2).to({ x: this.origin2 }, 250)
						egret.Tween.get(this.card3).to({ x: this.origin3 }, 250).call(()=>{
							this.flySecond();
						}, this)
					}, this)
				} else {
					egret.Tween.get(this.cards[i]).to({ x: this.origin1.x, y: this.origin1.y, scaleX: 1, scaleY: 1 }, 300 +i * 100);
				}
			}
		} else {
			this.flySecond();
		}
		/*
		for(let i=0;i<cardValues.length;i++) {
			this.cards[this.lastShowIndex + i].visible = true;
			egret.setTimeout((c:DZPKCard)=>{
				c.showFlipCard(cardValues[i]);
			},this,1000 * i, this.cards[this.lastShowIndex + i]);
		}
		this.lastShowIndex += cardValues.length;
		 */
	}

	private flySecond() {
		for (let i = this.lastShowIndex + 1; i < this.cardValues.length; i++) {
			let obj = this.cards[i];
			obj.visible = true;
			let origin: egret.Point = new egret.Point(obj.x, obj.y);
			obj.x = this.cardBegin.x;
			obj.y = this.cardBegin.y;
			obj.scaleX = obj.scaleY = 0.1;
			obj.showFrontOrBack(game.CardDirection.BACK);
			egret.Tween.get(obj).to({ x: origin.x, y: origin.y, scaleX: 1, scaleY: 1 }, 300).call(()=>{
				obj.showFlipCard(this.cardValues[i]);
			}, this)
		}
		this.lastShowIndex = this.cardValues.length - 1;
	}

	public clearAll(): void {
		for (let card of this.cards) {
			card.visible = false;
			card.clearSelected();
			card.showFrontOrBack(game.CardDirection.BACK);
			card.cardNumber = 0;
			egret.Tween.removeTweens(card);
		}
		this.card1.x = this.origin1.x;
		this.card1.y = this.origin1.y;
		this.card2.x = this.origin2;
		this.card3.x = this.origin3;
		this.card4.x = this.origin4.x;
		this.card4.y = this.origin4.y;
		this.card5.x = this.origin5.x;
		this.card5.y = this.origin5.y;
		this.cardValues = [];
		this.lastShowIndex = 0;
	}

	public showCardResult(winCards: Array<number>): void {
		egret.log("公共的牌 : " + winCards.join(","))
		for (let c of winCards) {
			console.log("22222  " + c);
		}

		for (let c of this.cards) {
			console.log("33333  " + c.cardNumber);
		}

		for (let card of this.cards) {
			if (card.visible) {
				if (winCards.indexOf(card.cardNumber) >= 0) {
					card.showSelected(true);
					console.log("44444  " + card.cardNumber + " show");
				} else {
					card.showSelected(false);
					console.log("44444  " + card.cardNumber + " hide");
				}
			}
		}
	}

}