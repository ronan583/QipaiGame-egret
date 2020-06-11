module game.ermj {
	export class ErmjOtherCardGroup extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjOtherCardGroup.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public holdGroup: eui.Group;
		public drawedCard: ErmjMyCard;
		public holdList: Array<ErmjMyCard>;
		public smallGroupList: Array<ErmjSmallGroup>;
		private orgX: number;
		public isDeal: boolean = false;

		protected childrenCreated(): void {
			super.childrenCreated();

			this.holdList = new Array<ErmjMyCard>();
			this.smallGroupList = new Array<ErmjSmallGroup>();
			this.drawedCard.visible = false;
			this.holdGroup.visible = false;
			this.orgX = this.holdGroup.x;
		}

		public dealCard() {
			this.isDeal = true;
			var cardImage: ErmjMyCard;
			this.holdGroup.x = this.orgX;
			this.holdGroup.visible = true;
			this.holdGroup.removeChildren();
			this.holdList.splice(0, this.holdList.length);

			for (var i = 0; i < 13; i++) {
				cardImage = new ErmjMyCard();
				this.holdGroup.addChild(cardImage);
				cardImage.image.source = "ermj_battle_json.title0";
				cardImage.image.width = 40;
				cardImage.image.height = 59;

				this.holdList.push(cardImage);

				cardImage.x = i * 36;
				cardImage.y = 0;
			}
			this.updateGroupView();
		}

		public updateGroupView() {
			var lastPosition = this.holdGroup.width + this.holdGroup.x;
			var smallGroup: ErmjSmallGroup;
			for (var i = 0; i < this.smallGroupList.length; i++) {
				smallGroup = this.smallGroupList[i];
				smallGroup.x = lastPosition;
				lastPosition = smallGroup.x + smallGroup.getWidth() * 0.65 + 45;
			}
		}

		public drawCard(card) {
			this.drawedCard.visible = true;
			this.drawedCard.playDrawCard2(card);
			this.drawedCard.image.width = 40;
			this.drawedCard.image.height = 59;
		}

		public showHuCard(card) {
			this.drawedCard.visible = true;
			this.drawedCard.playHuCard(card);
			this.drawedCard.image.width = 40;
			this.drawedCard.image.height = 59;
		}

		public updateHandCards(handCards: number[]) {
			this.drawedCard.visible = false;
			var cardImage: ErmjMyCard;
			var cardIndex = 0;
			var length = handCards.length > this.holdList.length ? handCards.length : this.holdList.length;
			for (var i = 0; i < length; i++) {
				if (handCards.length <= i) {
					this.holdGroup.removeChild(this.holdList.pop());
					continue;
				}
				if (this.holdList.length <= i) {
					cardImage = new ErmjMyCard();
					this.holdGroup.addChild(cardImage);
					cardImage.image.width = 40;
					cardImage.image.height = 59;
					this.holdList.push(cardImage);
					cardImage.x = i * 36;
					cardImage.y = 0;
				}
				cardIndex = handCards[i];
				if (cardIndex == 0) {
					this.holdList[i].image.source = "ermj_battle_json.title0";
				} else {
					this.holdList[i].image.source = "ermj_battle_json.otherTiles" + cardIndex;
				}
				this.holdList[i].cardIndex = handCards[i];
			}
			this.sortCards();
			this.updateGroupView();
		}

		public huCardsTween(handCards: number[]) {
			this.drawedCard.visible = false;
			var cardImage: ErmjMyCard;
			var cardIndex = 0;
			var length = handCards.length > this.holdList.length ? handCards.length : this.holdList.length;
			for (var i = 0; i < this.holdList.length; i++) {
				egret.Tween.get(this.holdList[i]).to({ y: this.holdList[i].y - 10 }, 50);
			}
			CommonUtil.removeTimeout(this);
			CommonUtil.registerTimeOut(function () {
				for (var i = 0; i < length; i++) {
					if (handCards.length <= i) {
						this.holdGroup.removeChild(this.holdList.pop());
						continue;
					}
					if (this.holdList.length <= i) {
						cardImage = new ErmjMyCard();
						this.holdGroup.addChild(cardImage);
						cardImage.image.width = 40;
						cardImage.image.height = 59;
						this.holdList.push(cardImage);
						cardImage.x = i * 36;
						cardImage.y = 0;
					}
					cardIndex = handCards[i];
					this.holdList[i].image.source = "ermj_battle_json.otherTiles" + cardIndex;
					this.holdList[i].cardIndex = handCards[i];
				}
				for (var i = 0; i < this.holdList.length; i++) {
					egret.Tween.get(this.holdList[i]).to({ y: this.holdList[i].y + 10 }, 50);
				}
			}, this, 100);
			this.sortCards();
			this.updateGroupView();
		}

		public sortCards() {
			var tempCard: ErmjMyCard;

			for (var i = 0; i < this.holdList.length; i++) {
				this.holdList[i].x = i * 36;
			}
		}

		public removeChilds() {
			while (this.smallGroupList.length) {
				this.removeChild(this.smallGroupList.pop());
			}
		}

		public showFallCards(fallCards) {
			this.removeChilds();
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

		public hideCardDark() {
			for (var i = 0; i < this.holdList.length; i++) {
				this.holdList[i].hideDark();
			}
			if (this.drawedCard != null) {
				this.drawedCard.hideDark();
			}
		}

		public playPeng(card: number[]) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "peng";
			smallGroup.sourcePath = "ermj_battle_json.otherTiles";
			smallGroup.showPeng(card);
			smallGroup.scaleX = smallGroup.scaleY = 0.65;
			this.smallGroupList.push(smallGroup);
		}

		public playChi(card: number[]) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "chi";
			smallGroup.sourcePath = "ermj_battle_json.otherTiles";
			smallGroup.showChi2(card);
			smallGroup.scaleX = smallGroup.scaleY = 0.65;
			this.smallGroupList.push(smallGroup);
		}

		public playGang(card: number[], playType) {
			var smallGroup = new ErmjSmallGroup();
			this.addChild(smallGroup);
			smallGroup.currentState = "gang";
			smallGroup.sourcePath = "ermj_battle_json.otherTiles";
			smallGroup.showGang(card, playType);
			smallGroup.scaleX = smallGroup.scaleY = 0.65;
			this.smallGroupList.push(smallGroup);
		}

	}
}