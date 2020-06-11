module game.qynn {
	export class QynnCard extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public bg: eui.Image;
		private _cardNum: number;
		public huiseMask: eui.Rect;
		public get cardNum() {
			return this._cardNum;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			// 初始化显示背面
			this.showBack();
		}
		/**
		 * 显示牌的背面
		 */
		public showBack(): void {
			this._cardNum = null;
			this.bg.source = "qznn_battle_json.back_card";
		}

		/**
		 * 显示扑克牌数字
		 */
		public showCard(cardNum: number): void {
			this._cardNum = cardNum;
			let suit: number = Math.floor(cardNum % 4);
			let cardN: number = Math.floor(cardNum / 4);
			if (cardN == 14) {
				cardN = 1;
			}
			this.bg.source = "othercards_json.oc_" + cardNum;
		}

		private getSuitSource(cardSuit: game.CardSuit, cardNum: number): string {
			switch (cardSuit) {
				case game.CardSuit.CLUB:
					return "qznnGame_json.card_club" + cardNum;
				case game.CardSuit.DIAMOND:
					return "qznnGame_json.card_diamond" + cardNum;
				case game.CardSuit.HEART:
					return "qznnGame_json.card_heart" + cardNum;
				case game.CardSuit.SPADE:
					return "qznnGame_json.card_spade" + cardNum;
			}
			return "";
		}

		public showFlipCard(cardNum: number): void {
			this.scaleX = -1;
			var tw: egret.Tween = egret.Tween.get(this);
			var holder = this;
			tw.to({ scaleX: 0 }, 500).call(() => {
				tw = egret.Tween.get(this);
				holder.showCard(cardNum);
				tw.to({ scaleX: 1 }, 500);
			});
		}
	}
}