module game.ermj {
	export class ErmjMyCardGroup extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjMyCardGroup.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public holdGroup: eui.Group;
		public drawedCard: ErmjMyCard;
		public holdList: Array<ErmjMyCard>;
		public smallGroupList: Array<ErmjSmallGroup>;

		private isOperation = false;

		private orgX: number;
		private openTingList: Array<ErmjMyCard>;
		private tingDiscards = null;
		private discardIndex: number = 0;
		public newCard: eui.Image;

		public isOpenTing(): boolean {
			if (this.openTingList != null) {
				return true;
			}
			return false;
		}

		public canOperation(playType: number) {
			if ((playType & <number>MJPlayType.Draw) != 0
				|| (playType & <number>MJPlayType.Pong) != 0
				|| (playType & <number>MJPlayType.Chi) != 0
				|| (playType & <number>MJPlayType.DotKong) != 0
				|| (playType & <number>MJPlayType.Kong) != 0
				|| (playType & <number>MJPlayType.CealedKong) != 0) {
				this.isOperation = true;
			} else {
				this.isOperation = false;
			}
		}

		public setOperattion(isOperation: boolean) {
			this.isOperation = isOperation;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.holdList = new Array<ErmjMyCard>();
			this.smallGroupList = new Array<ErmjSmallGroup>();
			this.drawedCard.visible = false;
			this.holdGroup.visible = false;
			this.orgX = this.holdGroup.x;
		}

		public dealCard(cards: number[]) {
			if (cards.length > 13) {
				cards.pop();
			}
			var cardImage: ErmjMyCard;
			this.holdGroup.x = this.orgX;
			this.holdGroup.visible = true;
			this.openTingList = null;
			this.holdGroup.removeChildren();
			this.holdList.splice(0, this.holdList.length);

			cards.sort((card1: number, card2: number) => {
				return card1 - card2;
			})
			for (var i = 0; i < cards.length; i++) {
				if (i > 13) {
					break;
				}
				cardImage = new ErmjMyCard();
				this.holdGroup.addChild(cardImage);
				cardImage.cardIndex = cards[i];
				cardImage.image.source = "ermj_battle_json.title" + cards[i];
				this.holdList.push(cardImage);
				cardImage.x = i * 86;
				cardImage.y = 0;
				cardImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelected, this);
			}
			this.updateGroupView();
		}

		public removeChilds() {
			for (var i = 0; i < this.smallGroupList.length; i++) {
				this.removeChild(this.smallGroupList[i]);
			}
			this.smallGroupList = new Array<ErmjSmallGroup>();
		}

		public showFallCards(fallCards) {
			this.removeChilds();
			// console.log('showFallCards ========= ', fallCards);
			for (var i = 0; i < fallCards.length; i++) {
				switch (fallCards[i].type) {
					case <number>MJPlayType.Pong: {
						this.playPeng(fallCards[i].card);
						break;
					}
					case <number>MJPlayType.Chi: {
						this.playChi(fallCards[i].card)
						break;
					}
					case <number>MJPlayType.Kong:
					case <number>MJPlayType.CealedKong:
					case <number>MJPlayType.DotKong: {
						this.playGang(fallCards[i].card, <MJPlayType>fallCards[i].type);
						break;
					}
				}
			}
		}

		public updateHandCards(handCards: number[]) {
			var length = handCards.length > this.holdList.length ? handCards.length : this.holdList.length;
			for (var i = 0; i < length; i++) {
				if (handCards.length <= i) {
					this.holdGroup.removeChild(this.holdList[handCards.length]);
					this.holdList.splice(handCards.length, 1);
					continue;
				}
				if (this.holdList.length > i) {
					this.holdList[i].image.source = "ermj_battle_json.title" + handCards[i];
					this.holdList[i].cardIndex = handCards[i];
				}
			}
			this.sortCards();
			this.updateGroupView();
		}

		public onSelected(event): void {
			var card: ErmjMyCard = <ErmjMyCard>event.currentTarget;
			// 听牌选牌界面
			if (this.openTingList != null) {
				if (this.openTingList.indexOf(card) != -1) {
					if (card.selected) {
						ErmjRequest.SendBattleStep(MJPlayType.Ting, [card.cardIndex]);
						this.showTingDarkCard();
						this.openTingList = null;
					} else {
						//选择牌后，展示所胡的牌
						for (var i = 0; i < this.holdList.length; i++) {
							this.holdList[i].selected = false;
						}
						this.drawedCard.selected = false;
						card.selected = true;
						for (var j = 0; j < this.tingDiscards.length; j++) {
							if (card.cardIndex == this.tingDiscards[j].playCard) {
								AppFacade.instance.sendNotification(ErmjBattleMediator.SHOW_TINGINFO, this.tingDiscards[j].tingHuInfos);
								break;
							}
						}
					}
				}
				return;
			}

			if (card.selected) {
				if (!this.isOperation) {
					card.selected = false;
				} else {
					card.selected = false;
					this.discardIndex = card.cardIndex;
					//出牌
					ErmjRequest.SendBattleStep(MJPlayType.Discard, [card.cardIndex]);
				}
				if (this.drawedCard != card) {
					this.drawedCard.selected = false;
				}
			} else {
				for (var i = 0; i < this.holdList.length; i++) {
					this.holdList[i].selected = false;
				}
				card.selected = true;
				if (this.drawedCard != card) {
					this.drawedCard.selected = false;
				}
			}
		}

		public drawCard(card) {
			this.drawedCard.visible = true;
			this.drawedCard.playDrawCard(card);
			this.drawedCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelected, this);
		}

		public rightShiftCard() {
			var handCard = [];
			for (var i = 0; i < this.holdList.length; i++) {
				handCard.push(this.holdList[i].cardIndex)
			}
			var card = handCard[handCard.length - 1];
			handCard.splice(handCard.length - 1, 1);
			this.updateHandCards(handCard);
			this.drawCard(card);
		}

		public playPeng(card: number[]) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "peng";
			smallGroup.showPeng(card);
			this.smallGroupList.push(smallGroup);
		}

		public playChi(card: number[]) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "chi";
			smallGroup.showChi2(card);
			this.smallGroupList.push(smallGroup);
		}

		public playGang(card: number[], playType) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "gang";
			smallGroup.showGang(card, playType);
			this.smallGroupList.push(smallGroup);
		}

		public sortCards() {
			var tempCard: ErmjMyCard;
			for (var i = 0; i < this.holdList.length; i++) {
				this.holdList[i].x = i * 86;

				if (this.holdList[i].selected) {
					this.holdList[i].selected = false;
					this.holdList[i].playNormaGroup();
				}
				//插牌特效
				if (this.holdList[i].cardIndex == this.drawedCard.cardIndex && this.discardIndex != -1 && this.drawedCard.cardIndex != this.discardIndex) {
					this.discardIndex = -1;
					var oldCard = this.holdList[i];
					oldCard.image.alpha = 0;
					this.newCard = new eui.Image("ermj_battle_json.title" + this.drawedCard.cardIndex);
					this.newCard.anchorOffsetX = this.newCard.width / 2;
					this.newCard.anchorOffsetY = this.newCard.height / 2;
					this.newCard.validateNow();
					this.newCard.validateSize();
					this.parent.addChild(this.newCard);
					this.drawedCard.visible = false;
					var point = this.drawedCard.localToGlobal(0, 0);
					point = this.parent.globalToLocal(point.x, point.y)
					this.newCard.x = point.x + this.newCard.width / 2;
					this.newCard.y = point.y + this.newCard.height / 2;
					var toCard = oldCard.image;
					var point2 = toCard.localToGlobal(0, 0);
					point2 = this.parent.globalToLocal(point2.x, point2.y);
					this.newCard.rotation = 0;
					var self = this;
					egret.Tween.get(this.newCard).to({ x: point.x, y: this.newCard.y - this.newCard.height - this.newCard.height / 2, rotation: 30 }, 50)
						.to({ x: point2.x, y: point2.y - (this.newCard.height / 3) - this.newCard.height / 2 }, 100)
						.to({ x: point2.x, y: point2.y, rotation: 0 }, 50).call(() => {
							if (self.newCard != null && self.newCard.parent != null) {
								self.newCard.parent.removeChild(self.newCard);
							}
							self.newCard == null;
							if (oldCard) oldCard.image.alpha = 1;
						}, this.newCard);
				}
			}
		}

		public updateGroupView() {
			var lastPosition = this.orgX;
			var smallGroup: ErmjSmallGroup;
			for (var i = 0; i < this.smallGroupList.length; i++) {
				smallGroup = this.smallGroupList[i];
				smallGroup.x = lastPosition;
				lastPosition = smallGroup.x + smallGroup.getWidth() + 35;
			}
			this.holdGroup.x = lastPosition;
		}

		public showTingDarkCard() {
			for (var i = 0; i < this.holdList.length; i++) {
				this.holdList[i].showDark();
			}
			if (this.drawedCard != null) {
				this.drawedCard.hideDark();
			}
		}

		public showCanTingCard(tingDiscards) {
			this.tingDiscards = tingDiscards;
			this.openTingList = new Array<ErmjMyCard>();
			var isTingCards;
			for (var i = 0; i < this.holdList.length; i++) {
				isTingCards = false;
				for (var t = 0; t < tingDiscards.length; t++) {
					if (this.holdList[i].cardIndex == tingDiscards[t].playCard) {
						isTingCards = true;
					}
				}
				if (isTingCards) {
					this.openTingList.push(this.holdList[i]);
				} else {
					this.holdList[i].showDark();
				}
			}
			isTingCards = false;
			for (var t = 0; t < tingDiscards.length; t++) {
				if (this.drawedCard.cardIndex == tingDiscards[t].playCard) {
					isTingCards = true;
				}
			}
			if (isTingCards) {
				this.openTingList.push(this.drawedCard);
			} else {
				this.drawedCard.showDark();
			}
		}

		public hideCardDark() {
			this.openTingList = null;

			for (var i = 0; i < this.holdList.length; i++) {
				this.holdList[i].hideDark();
			}
			if (this.drawedCard != null) {
				this.drawedCard.hideDark();
			}
		}

		public canGangList(card: number): Array<number[]> {
			var cardList: Array<number[]> = new Array<number[]>();
			return cardList;
		}

		//能吃的牌组
		public canChiList(card: number): Array<number[]> {
			var cardList: Array<number[]> = new Array<number[]>();
			var left = 11;
			var right = 19;
			var n1: number = 0, n2: number = 0, n3: number = 0, n4: number = 0;
			var chiList: Array<ErmjMyCard> = new Array<ErmjMyCard>();
			for (var i = 0; i < this.holdList.length; i++) {
				if (this.holdList[i].cardIndex >= left && this.holdList[i].cardIndex <= right) {
					if (this.holdList[i].cardIndex == card - 2) {
						n1++;
					}
					if (this.holdList[i].cardIndex == card - 1) {
						n2++;
					}
					if (this.holdList[i].cardIndex == card + 1) {
						n3++;
					}
					if (this.holdList[i].cardIndex == card + 2) {
						n4++;
					}
				}
			}

			//右吃
			if (n1 >= 1 && n2 >= 1) {
				cardList.push([card - 2, card, card - 1]);
			}
			//中吃
			if (n2 >= 1 && n3 >= 1) {
				cardList.push([card - 1, card, card + 1]);
			}
			//左吃
			if (n3 >= 1 && n4 >= 1) {
				cardList.push([card + 1, card, card + 2]);
			}

			return cardList;
		}

		public canSelfGongList(cardIndex): Array<Object[]> {
			var gongObj = null;
			var cardList: Array<Object[]> = new Array<Object[]>();

			//明杠
			for (var i = 0; i < this.smallGroupList.length; i++) {
				//手牌本身可杠
				if (this.smallGroupList[i].playType == MJPlayType.Pong) {
					for (var j = 0; j < this.holdList.length; j++) {
						if (this.smallGroupList[i].cards[0] == this.holdList[j].cardIndex) {
							gongObj = new Object();
							gongObj["card"] = [this.holdList[j].cardIndex];
							gongObj["playType"] = MJPlayType.Kong;
							cardList.push(gongObj);
						}
					}
				}
				//抓到的牌可杠
				if (cardIndex == this.smallGroupList[i].cards[0]) {
					gongObj = new Object();
					gongObj["card"] = [this.drawedCard.cardIndex];
					gongObj["playType"] = MJPlayType.Kong;
					cardList.push(gongObj);
				}
			}

			//暗杠
			for (var i = 0; i < this.holdList.length; i++) {
				var cardNum = 0;
				if (this.isContain(cardList, this.holdList[i].cardIndex)) {
					continue;
				}
				for (var j = 0; j < this.holdList.length; j++) {
					if (i != j && this.holdList[i].cardIndex == this.holdList[j].cardIndex) {
						cardNum++;
					}
				}
				if (this.drawedCard.cardIndex == this.holdList[i].cardIndex) {
					cardNum++;
				}

				if (cardNum >= 3) {
					gongObj = new Object();
					gongObj["card"] = [this.holdList[i].cardIndex];
					gongObj["playType"] = MJPlayType.CealedKong;
					cardList.push(gongObj);
				}
				// if (this.holdList[i].cardIndex == cardIndex) {
				// 	cardNum++;
				// }
			}
			return cardList;
		}

		private isContain(cardList: Array<Object[]>, cardIndex) {
			for (var i = 0; i < cardList.length; i++) {
				if (cardIndex == cardList[i]["card"]) {
					return true;
				}
			}
			return false;
		}

	}
}