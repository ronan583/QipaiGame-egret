module game.ermj {
	export class HitCardGroup extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/HitCardGroup.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public hitGroup: eui.Group;
		public cardInfo: HashMap;
		public playedArrow: eui.Group;
		public newCard: eui.Image = new eui.Image();
		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public initGroup() {
			this.hitGroup.removeChildren();
			this.cardInfo = new HashMap();
			this.playedArrow.visible = false;
			if (this.newCard != null && this.newCard.parent != null) {
				this.newCard.parent.removeChild(this.newCard);
			}
		}

		public addCard(cardIndex): eui.Image {
			var card = new eui.Image("ermj_battle_json.playedTiles" + cardIndex);
			this.hitGroup.addChild(card);
			this.cardInfo.put(this.hitGroup.numChildren - 1, cardIndex);
			return card;
		}

		public addCard2(cardIndex): eui.Image {
			var card = new eui.Image("ermj_battle_json.otherTiles" + cardIndex);
			this.hitGroup.addChildAt(card, 0);
			card.x = 539 - ((this.hitGroup.numChildren - 1) % 12) * 49;
			card.y = -Math.floor((this.hitGroup.numChildren - 1) / 12) * 61 + 61;
			this.cardInfo.put(this.hitGroup.numChildren - 1, cardIndex);
			return card;
		}

		public updateHitCard(cards: number[]) {
			this.hitGroup.removeChildren();
			this.cardInfo = new HashMap();
			this.playedArrow.visible = false;
			if (cards.length <= 0) {
				return;
			}
			var card: eui.Image;
			for (var i = 0; i < cards.length; i++) {
				if (this.currentState == "other") {
					card = this.addCard2(cards[i]);
				} else {
					card = this.addCard(cards[i]);
				}
				if (i == cards.length - 1) {
					if (this.currentState == "other") {
						this.playedArrow.x = this.hitGroup.width - (i % 12) * (card.width - 2) - card.width / 2;
						this.playedArrow.y = -Math.floor(i / 12) * 48 + 30;
					} else {
						this.playedArrow.x = this.hitGroup.x + (i % 12) * (card.width - 2) + card.width / 2;
						this.playedArrow.y = Math.floor(i / 12) * 65 - 20;
					}
				}
			}
		}

		//出牌特效
		public tweenUpdateHitCard(cards: number[], drawedCard: ErmjMyCard = null) {
			if (drawedCard != null) {
				if (this.currentState == "other") {
					this.newCard.source = "ermj_battle_json.otherTiles" + cards[cards.length - 1];
					this.newCard.width = 40;
					this.newCard.height = 59;
				} else {
					this.newCard.source = "ermj_battle_json.playedTiles" + cards[cards.length - 1];
				}
				this.parent.addChild(this.newCard);
				var point = drawedCard.localToGlobal(0, 0);
				point = this.parent.globalToLocal(point.x, point.y)
				var toCard
				if (this.hitGroup.numChildren > 0) {
					if (this.currentState == "other") {
						toCard = this.hitGroup.getChildAt(0);
					} else {
						toCard = this.hitGroup.getChildAt(this.hitGroup.numChildren - 1);
					}
				} else {
					toCard = this.hitGroup;
				}
				var point2 = toCard.localToGlobal(0, 0);
				point2 = this.parent.globalToLocal(point2.x, point2.y)
				if (this.currentState == "other") {
					if (this.hitGroup.numChildren <= 0) {
						point2.x += 460;
						point2.y += 52;
					}
				} else {
					point2.x += 51;
				}
				this.newCard.x = point.x;
				this.newCard.y = point.y;
				this.playedArrow.visible = false;
				egret.Tween.get(this.newCard).to({ x: point.x, y: point2.y }, 50).to({ x: point2.x, y: point2.y }, 100).call(() => {
					if (this.newCard != null && this.newCard.parent != null) {
						this.newCard.parent.removeChild(this.newCard);
					}
					this.hitGroup.removeChildren();
					this.cardInfo = new HashMap();
					if (cards.length <= 0) {
						this.playedArrow.visible = false;
						return;
					}
					var card: eui.Image;
					for (var i = 0; i < cards.length; i++) {
						if (this.currentState == "other") {
							card = this.addCard2(cards[i]);
						} else {
							card = this.addCard(cards[i]);
						}
						if (i == cards.length - 1) {
							if (this.currentState == "other") {
								this.playedArrow.x = this.hitGroup.width - (i % 12) * (card.width - 2) - card.width / 2;
								this.playedArrow.y = -Math.floor(i / 12) * 48 + 30;
							} else {
								this.playedArrow.x = this.hitGroup.x + (i % 12) * (card.width - 2) + card.width / 2;
								this.playedArrow.y = Math.floor(i / 12) * 65 - 20;
							}
							this.playedArrow.visible = true;
						}
					}
				}, this);
			}
		}

		public showArrow() {
			this.playedArrow.visible = true;
		}

		public hideArrow() {
			this.playedArrow.visible = false;
		}

		public cardHighLight(cardIndex) {
			var childIndex = 0;
			for (var i = 0; i < this.cardInfo.keys.length; i++) {
				childIndex = this.cardInfo.get(this.cardInfo.keys[i]);
				if (childIndex == cardIndex) {
					var colorMatrix = [
						1, 0, 0, 0, 50,
						0, 1, 0, 0, 50,
						0, 0, 1, 0, 50,
						0, 0, 0, 1, 0
					];
					var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
					this.hitGroup.getChildAt(childIndex).filters = [colorFlilter];
				}
			}
		}

		public closeHighLight() {
			for (var i = 0; i < this.hitGroup.numChildren; i++) {
				if (this.hitGroup.getChildAt(i).filters != null) {
					this.hitGroup.getChildAt(i).filters = null;
				}
			}
		}
	}
}