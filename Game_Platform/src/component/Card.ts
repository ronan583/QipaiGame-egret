	class Card extends eui.Component implements  eui.UIComponent {

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
		private _cardNum : number;
		public huiseMask:eui.Rect;
		public maskFlag:eui.Image;
		private cardDir: game.CardDirection = game.CardDirection.BACK;

		public setCardNum(num:number) {
			this._cardNum = num;
		}
		public get cardNum()
		{
			return this._cardNum;
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			// 初始化显示背面
			this.showFrontOrBack(game.CardDirection.BACK);
			this.huiseMask.mask = this.maskFlag;
		}
		/**
		 * 显示牌的正面或者背面
		 */
		public showFrontOrBack(cardDir:game.CardDirection):void{
			this.cardDir = cardDir;
			if(cardDir == game.CardDirection.FRONT) {
				this.bg.source = "sc_12";
			} else {
				this.bg.source = "ndzpk_card";
			}
		}

		/**
		 * 显示扑克牌数字
		 */
		public showCard(cardNum:number):void {
			this.showFrontOrBack(game.CardDirection.FRONT);
			let suit:number = Math.floor(cardNum % 4);
			let cardN:number = Math.floor(cardNum / 4);
			if(cardN == 14) {
				cardN = 1;
			}
			this._cardNum = cardN;
			
			this.bg.source = "sc_" + cardNum;
		}

		public showFlipCard(cardNum:number):void {
			this.showFrontOrBack(game.CardDirection.BACK);
			this.scaleX = -1;
			var tw:egret.Tween = egret.Tween.get(this);
			var holder = this;
			tw.to({scaleX:0},500).call(()=>{
				tw = egret.Tween.get(this);
				holder.showCard(cardNum);
				tw.to({scaleX:1},500);
			});
		}

		public showSelected(selected:boolean):void {
			/*
			if(selected) {
				this.filters = [];
			} else {
				var colorMatrix = [
					0.3086, 0.6094, 0.0820, 0, 0,  
	                    0.3086, 0.6094, 0.0820, 0, 0,  
	                    0.3086, 0.6094, 0.0820, 0, 0,  
	                    0,      0,      0,      1, 0
				];
				var flilter = new egret.如果主牌是飞机那么从选中区域优先选择单牌或者对子，(colorMatrix);
				this.filters = [flilter];
			}
			*/
			this.huiseMask.visible = !selected;
		}

		public clearSelected():void {
			this.huiseMask.visible = false;
		}

		public showGrayState() {
			this.huiseMask.visible = true;
		}

        public isFront() {
            return this.cardDir == game.CardDirection.FRONT;
        }
    }