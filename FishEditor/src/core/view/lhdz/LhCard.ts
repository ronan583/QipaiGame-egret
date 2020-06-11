module game.lhdz {
	export class LhCard extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public bg: eui.Image;

		public cardNumber: eui.Image;
		protected _cardNum: number;
		private cuopai: LhdzCuopai;
		public get cardNum() {
			return this._cardNum;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.cuopai.visible = false;
			// 初始化显示背面
			this.showBack();
		}
		/**
		 * 显示牌的正面或者背面
		 */
		public showBack(): void {
			this.bg.source = "lhdz_battle_json.cards_back";
			this.cuopai.visible = false;
			this.bg.rotation = 0;
		}

		public hideCard(): void {
			this.showBack();
			// this.visible = false;
		}

		public showCardNoEffect(cardNum: number): void {
			this.showBack();

			let suit: number = Math.floor(cardNum % 4);
			let cardN: number = Math.floor(cardNum / 4);
			if (cardN == 14) {
				cardN = 1;
			}
			this._cardNum = cardN;

			this.bg.source = "othercards_json.oc_" + cardNum;
		}

		public showCard2(cardNum: number) {
			this.bg.rotation = 0;
			this.bg.source = "lhdz_battle_json.cards_back";
			egret.Tween.get(this.bg).to({ rotation: 90 }, 250).call(() => {
				this.bg.visible = false;
				this.cuopai.visible = true;
				this.cuopai.play(cardNum, () => {
					this.bg.visible = true;
					this.cuopai.visible = false;
					this.bg.rotation = 0;
					let cardN: number = Math.floor(cardNum / 4);
					if (cardN == 14) {
						cardN = 1;
					}
					LhdzSoundPlayer.instance.playCardType(cardN);
					this.bg.source = "othercards_json.oc_" + cardNum;
				}, this);
			}, this);
		}

		/**
		 * 显示扑克牌数字
		 */
		public showCard(cardNum: number): void {
			this.bg.visible = true;
			this.cuopai.visible = false;
			this.bg.rotation = 0;
			let cardN: number = Math.floor(cardNum / 4);
			if (cardN == 14) {
				cardN = 1;
			}
			LhdzSoundPlayer.instance.playCardType(cardN);
			this.bg.source = "othercards_json.oc_" + cardNum;
		}


		private getSuitSource(cardSuit: game.CardSuit, cardNum: number): string {
			switch (cardSuit) {
				case game.CardSuit.CLUB:
					return "lhdzGame_json.card_club" + cardNum;
				case game.CardSuit.DIAMOND:
					return "lhdzGame_json.card_diamond" + cardNum;
				case game.CardSuit.HEART:
					return "lhdzGame_json.card_heart" + cardNum;
				case game.CardSuit.SPADE:
					return "lhdzGame_json.card_spade" + cardNum;
			}
			return "";
		}

		private timeoutIdList: Array<number> = [];

		private registerTimeout(func: Function, time: number): void {
			var holder: any = this;
			var timeOutId: number = egret.setTimeout(function () {
				func.call(holder);
				let index: number = this.timeoutIdList.indexOf(timeOutId);
				if (index >= 0) {
					this.timeoutIdList.splice(index, 1);
				}
			}, this, time);
			this.timeoutIdList.push(timeOutId);
		}

		public clearAllTimeOut(): void {
			if (this.timeoutIdList.length > 0) {
				for (let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}

			egret.Tween.removeTweens(this);
			this.scaleX = this.scaleY = 1;
		}
	}
}