module game.brnn {
	export class BRCard extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public bg:eui.Image;
		private cardImg:eui.Image;
		public flower:eui.Image;
		public cardNumber:eui.Image;
		protected _cardNum : number;
		public get cardNum()
		{
			return this._cardNum;
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			// 初始化显示背面
			this.showBack();
		}
		/**
		 * 显示牌的正面或者背面
		 */
		public showBack():void{
			this.cardImg.visible = false;
			this.bg.visible = true;
			this.bg.source = "brnn_self_card_bg";
		}

		/**
		 * 显示扑克牌数字
		 */
		public showCard(cardNum:number):void {
			this.cardImg.visible = true;
			this.bg.visible = false;
			let suit:number = Math.floor(cardNum % 4);
			let cardN:number = Math.floor(cardNum / 4);
			if(cardN == 14) {
				cardN = 1;
			}
			this._cardNum = cardNum;
			// if(suit == game.CardSuit.CLUB || suit == game.CardSuit.SPADE) {

			// 	this.cardNumber.source = "b" + cardN;	
			// } else {
			// 	this.cardNumber.source = "r" + cardN;	
			// }
			// console.log("card number : " + cardN);
			// this.bg.source = this.getSuitSource(suit,cardN);
			this.cardImg.source = "oc_" + cardNum;
		}



		private getSuitSource(cardSuit:game.CardSuit ,cardNum : number):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "brnnGame_json.card_club" + cardNum;
				case game.CardSuit.DIAMOND:
					return "brnnGame_json.card_diamond" + cardNum;
				case game.CardSuit.HEART:
					return "brnnGame_json.card_heart" + cardNum;
				case game.CardSuit.SPADE:
					return "brnnGame_json.card_spade" + cardNum;
			}
			return "";
		}
	
	}
}