module game.ermj {
	export class ErmjSmallGroup extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjSmallGroup.exml";
		}
		public card1: eui.Image;
		public card2: eui.Image;
		public card3: eui.Image;
		public card4: eui.Image;
		public bg: eui.Image;
		public pointer: eui.Image;
		public darkSprite: egret.Sprite;

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public cardGroup: eui.Group;
		public playType: MJPlayType;
		public cards: number[];
		public sourcePath = "ermj_battle_json.playedTiles";
		public getWidth() {
			return 174 * this.scaleX;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.pointer.visible = false;
			if (this.darkSprite && this.darkSprite.parent) {
				this.darkSprite.parent.removeChild(this.darkSprite);
				this.darkSprite = null;
			}
		}

		public showChi(cards: number[]) {
			this.cards = cards;
			this.currentState = "chi";
			this.playType = MJPlayType.Chi;
			this.showCard(cards);
		}

		public showChi2(cards: number[]) {
			this.cards = cards;
			this.currentState = "chi";
			this.playType = MJPlayType.Chi;
			this.showCard2(cards);
		}

		public showChi3(cards: number[]) {
			this.cards = cards;
			this.currentState = "chi";
			this.playType = MJPlayType.Chi;
			if (this.darkSprite && this.darkSprite.parent) {
				this.darkSprite.parent.removeChild(this.darkSprite);
				this.darkSprite = null;
			}
			this.showCard3(cards);
		}

		public showPeng(cards: number[]) {
			this.cards = cards;
			this.playType = MJPlayType.Pong;
			this.showCard(cards);
		}

		public showDui(cards: number[]) {
			this.cards = cards;
			this.playType = MJPlayType.Jiang;
			this.showCard(cards);
		}

		public showGang(cards: number[], playType: MJPlayType) {
			this.cards = cards;
			this.playType = playType;
			if (playType == MJPlayType.CealedKong) {
				this.card1.source = this.card2.source = this.card3.source = "ermj_battle_json.playedTiles0";
				this.card4.source = this.sourcePath + cards[0];
			} else {
				this.showCard(cards);
			}
		}

		private showCard(cards: number[]) {
			this.cards = cards;
			//排序
			cards.sort((index1, index2) => {
				return index1 - index2;
			});
			for (var i = 0; i < cards.length; i++) {
				this["card" + (i + 1)].source = this.sourcePath + cards[i];
			}
		}

		private showCard2(cards: number[]) {
			var arr = [-13, 49, 105]
			var otherCard = cards[1];
			this.cards = cards;
			var newCard = cards;
			//排序
			newCard.sort((index1, index2) => {
				return index1 - index2;
			});
			for (var i = 0; i < newCard.length; i++) {
				if (otherCard == newCard[i]) {
					this.pointer.x = arr[i];
					this.pointer.visible = true;
				}
				this["card" + (i + 1)].source = this.sourcePath + newCard[i];
			}
		}

		private showCard3(cards: number[]) {
			console.log('playChi3 ======= ', cards, cards[1]);
			var otherCard = cards[1];
			this.cards = cards;
			var newCard = cards;
			//排序
			newCard.sort((index1, index2) => {
				return index1 - index2;
			});
			for (var i = 0; i < newCard.length; i++) {
				this["card" + (i + 1)].source = this.sourcePath + newCard[i];
				if (newCard[i] == otherCard) {
					if (this.darkSprite == null) {
						this.darkSprite = new egret.Sprite();
						this.darkSprite.graphics.clear();
						this.darkSprite.graphics.beginFill(0x000000, 0.5);
						this.darkSprite.graphics.drawRect(0, 15, this["card" + (i + 1)].width, this["card" + (i + 1)].height);
						this.darkSprite.graphics.endFill();
						this.darkSprite.width = this.width;
						this.darkSprite.height = this.height;
						this.darkSprite.x = i * this["card" + (i + 1)].width;
						this.addChild(this.darkSprite);
					}
				}
			}
		}
	}
}