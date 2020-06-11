module game.bjl {
	export class BjlCard extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public bg:eui.Image;
		public flower:eui.Image;
		public cardNumber:eui.Image;
		protected _cardNum : number;
		private originScaleX:number;
		private originScaleY:number;
		public get cardNum()
		{
			return this._cardNum;
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			// 初始化显示背面
			this.showBack();
			this.originScaleX = this.scaleX;
			this.originScaleY = this.scaleY;
		}
		/**
		 * 显示牌的正面或者背面
		 */
		public showBack():void{
			this.bg.source = "cardAssets_json.card_back";
		}

		public hideCard() : void
		{
			this.showBack();
			this.visible = false;
		}

		public setVisible(v:boolean) : void {
			this.visible = v;
			egret.log("============== " + v);
		}

		public showCardNoEffect(cardNum:number)
		{
			this.showBack();
			let suit:number = Math.floor(cardNum % 4);
			let cardN:number = Math.floor(cardNum / 4);
			if(cardN == 14) {
				cardN = 1;
			}
			this._cardNum = cardN;
			this.bg.source = this.getSuitSource(suit,cardN);
		}

		public showCardDirect(cardNum:number) {
			this.bg.source = "oc_" + cardNum;
		}

		/**
		 * 显示扑克牌数字
		 */
		public showCard(cardNum:number):void {
			this.bg.source = "cardAssets_json.card_back";
			egret.Tween.get(this).to({scaleX :0.01},150);
			egret.setTimeout(()=>{
				// LhdzSoundPlayer.instance.playFlipCard();
				this.showCardDirect(cardNum);
				egret.Tween.get(this).to({scaleX :this.originScaleX},150).call(()=>{
				},this);
			} ,this,150);
		}

		private getSuitSource(cardSuit:game.CardSuit ,cardNum : number):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "cardAssets_json.card_club" + cardNum;
				case game.CardSuit.DIAMOND:
					return "cardAssets_json.card_diamond" + cardNum;
				case game.CardSuit.HEART:
					return "cardAssets_json.card_heart" + cardNum;
				case game.CardSuit.SPADE:
					return "cardAssets_json.card_spade" + cardNum;
			}
			return "";
		}
	
		private timeoutIdList:Array<number> = [];

		private registerTimeout(func:Function, time:number):void {
			var holder:any = this;
			var timeOutId:number = egret.setTimeout(function(){
				func.call(holder);
				let index:number = this.timeoutIdList.indexOf(timeOutId);
				if(index >= 0) {
					this.timeoutIdList.splice(index, 1);
				}
			} , this , time);
			this.timeoutIdList.push(timeOutId);
		}

		public clearAllTimeOut():void {
			if(this.timeoutIdList.length > 0) {
				for(let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}
	}
}