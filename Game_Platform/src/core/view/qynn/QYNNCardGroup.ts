class QYNNCardGroup extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public card1: game.qynn.QynnCard;
	public card2: game.qynn.QynnCard;
	public card3: game.qynn.QynnCard;
	public card4: game.qynn.QynnCard;
	public card5: game.qynn.QynnCard;
	private cardArr: game.qynn.QynnCard[];
	private recordCardPosArr: Array<number>;

	public typeIcon: QynnResultIcon;
	public okIcon: eui.Image;
	public showContent: boolean;
	public showContent2: boolean;
	public showUpCard: boolean;
	public showCard: boolean;
	private originY: number = 90.5;
	private bsCardArr: Array<BSTweenCard> = [];

	protected childrenCreated(): void {
		super.childrenCreated();
		this.card1.visible = false;
		this.card2.visible = false;
		this.card3.visible = false;
		this.card4.visible = false;
		this.card5.visible = false;
		this.cardArr = [this.card1, this.card2, this.card3, this.card4, this.card5];
		this.okIcon.visible = false;
		this.showContent = false;
		this.showContent2 = false;
		this.showCard = false;
		this.recordCardPosArr = [];
		for (let card of this.cardArr) {
			this.recordCardPosArr.push(card.x);
		}
		if (this.typeIcon != null) {
			this.typeIcon.visible = false;
		}
	}

	public ShowCard(): void {
		this.card1.visible = true;
		this.card2.visible = true;
		this.card3.visible = true;
		this.card4.visible = true;
		this.card5.visible = true;
		this.hideFapaiCard();
	}

	public ShowCardContent(cards1): void {
		this.card1.visible = true;
		this.card2.visible = true;
		this.card3.visible = true;
		this.card4.visible = true;
		this.card5.visible = true;
		this.okIcon.visible = false;

		this.card1.showCard(cards1[0]);
		this.card2.showCard(cards1[1]);
		this.card3.showCard(cards1[2]);
		this.card4.showCard(cards1[3]);
		this.card5.showCard(cards1[4]);
		this.hideFapaiCard();
	}

	public ShowCardContent2(cards1, cards2): void {
		this.card1.visible = true;
		this.card2.visible = true;
		this.card3.visible = true;
		this.card4.visible = true;
		this.card5.visible = true;
		this.okIcon.visible = false;

		if (cards1.length <= 3) {
			var oldCardArr = cards1.concat(cards2);
			// newcardarr 乱序
			this.newCardArr = [];
			for (let c of oldCardArr) {
				this.newCardArr.push(c);
			}
		}

		this.card1.showCard(this.newCardArr[0]);
		this.card2.showCard(this.newCardArr[1]);
		this.card3.showCard(this.newCardArr[2]);
		this.card4.showCard(this.newCardArr[3]);
		this.card5.showCard(this.newCardArr[4]);

		this.hideFapaiCard();
		this.showUpTweenByCard(cards2[0], cards2[1]);
	}

	public hideCard(): void {
		this.card1.showBack();
		this.card2.showBack();
		this.card3.showBack();
		this.card4.showBack();
		this.card5.showBack();
		this.card1.visible = false;
		this.card2.visible = false;
		this.card3.visible = false;
		this.card4.visible = false;
		this.card5.visible = false;
		this.okIcon.visible = false;
		this.showCard = false;
		this.showContent = false;
		this.showContent2 = false;
		this.showUpCard = false;
		if (this.typeIcon != null) {
			this.typeIcon.visible = false;
		}
	}

	public hideFapaiCard() {
		for (let key in this.bsCardArr) {
			this.bsCardArr[key].hideTween();
			this.bsCardArr[key].y = this.originY;
		}
		for (let i = 1; i < this.cardArr.length; i++) {
			let card = this.cardArr[i];
			this.originY = card.y = 90.5;
			card.x = this.recordCardPosArr[i];
			egret.Tween.removeTweens(card);
			// 复原card的scale参数
			card.scaleX = 1;
			card.skewY = 0;
		}
	}

	public showFapaiTween(index: number, battlUI: eui.Component): void {
		this.card2.x = this.card3.x = this.card4.x = this.card5.x = this.card1.x;
		this.card2.y = this.card3.y = this.card4.y = this.card5.y = this.card1.y = this.originY = 90.5;
		let bsCard = new BSTweenCard();
		battlUI.addChild(bsCard);
		bsCard.tweenCard.source = "qznn_battle_json.back_card";
		bsCard.scaleX = 0.3;
		bsCard.scaleY = 0.3;
		bsCard.x = Global.designRect.x / 2;
		bsCard.y = Global.designRect.y / 2;
		let targetPoint = this.localToGlobal(this.card1.x - this.card1.width / 2, this.card1.y - this.card1.height / 2);
		targetPoint = this.parent.globalToLocal(targetPoint.x, targetPoint.y);
		// 都是飞到第一张牌
		if (index == 4) {
			bsCard.startTween(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y,
				this.scaleX, this.scaleY, this.cardArr[index], this.leftToRightCardTween, this);
		} else {
			bsCard.startTween(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, this.scaleX, this.scaleY, this.cardArr[index]);
		}
		this.bsCardArr.push(bsCard);
	}

	private leftToRightCardTween() {
		for (let i = 1; i < this.cardArr.length; i++) {
			let card = this.cardArr[i];

			card.visible = true;
			egret.Tween.get(card).to({ x: this.recordCardPosArr[i] }, 500);
		}
	}

	public showCardType(cardType: number): void {
		if (this.typeIcon == null || this.showCard == true) {
			return;
		}
		this.showCard = true;
		this.okIcon.visible = false;
		this.typeIcon.visible = true;
		this.typeIcon.ShowUI(cardType);
	}

	private newCardArr: Array<number> = [];
	public showContentTween(cards, withAnim:boolean = true) {
		console.log('newCardArr1 ==== ', oldCardArr);
		if (this.showContent == true) {
			return;
		}
		this.showContent = true;
		this.okIcon.visible = false;
		var oldCardArr = cards;
		// newcardarr 乱序
		this.newCardArr = [];
		for (let c of oldCardArr) {
			this.newCardArr.push(c);
		}
		for (var i = 0; i < this.cardArr.length; i++) {
			if(withAnim) {
				this.showContentTweenByCard(this.cardArr[i], this.newCardArr[i]);
			} else {
				this.cardArr[i].showCard(this.newCardArr[i]);
			}
		}
	}

	public showContentTween2(cards1, cards2) {
		console.log('showContentTween2 ==== ', cards1, cards2);
		if (this.showContent2 == true) {
			return;
		}
		this.showContent2 = true;
		this.okIcon.visible = false;
		if (cards1.length <= 3) {
			var oldCardArr = cards1.concat(cards2);
			// newcardarr 乱序
			this.newCardArr = [];
			for (let c of oldCardArr) {
				this.newCardArr.push(c);
			}
		}
		this.okIcon.visible = false;
		if (this.showContent == false) {
			for (var i = 0; i < this.cardArr.length; i++) {
				this.showContentTweenByCard(this.cardArr[i], this.newCardArr[i]);
			}
		}
		CommonUtil.removeTimeout(this);
		CommonUtil.registerTimeOut(function () {
			this.showUpTweenByCard(cards2[0], cards2[1]);
		}, this, 800);
	}

	private showContentTweenByCard(card: game.qynn.QynnCard, cardNumber: number) {
		card.y = this.originY = 90.5;
		card.scaleX = 1;
		egret.Tween.get(card).to({ scaleX: 1, skewY: 20 }, 50).to({ scaleX: 0.6, skewY: 30 }, 50).to({ scaleX: 0, skewY: 90 }, 25).call(() => {
			card.showCard(cardNumber);
			card.visible = true;
			card.skewY = -90;
			egret.Tween.get(card).to({ scaleX: 0.6, skewY: -30 }, 25).to({ scaleX: 1, skewY: -20 }, 50).to({ scaleX: 1, skewY: 0 }, 50);
		}, this);
	}

	public showUpTweenByCard(card1: number, card2: number) {
		if (this.showUpCard == true) {
			return;
		}
		this.showUpCard = true;
		for (var i = 0; i < this.cardArr.length; i++) {
			this.originY = this.cardArr[i].y = 90.5;
			let targetY = this.originY - 40;
			if (this.cardArr[i].cardNum == card1 || this.cardArr[i].cardNum == card2) {
				egret.Tween.get(this.cardArr[i]).wait(800).to({ y: targetY }, 300);
			}
		}
	}

	public showOkIcon(valuer) {
		this.okIcon.visible = valuer;
	}
}