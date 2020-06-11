class ZJHCard extends Card implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public cardMask: eui.Image;

	/**
	 * 显示牌的正面或者背面
	 */
	public showFrontOrBack(cardDir:game.CardDirection):void{
		if(cardDir == game.CardDirection.FRONT) {
			this.bg.source = "sc_12";
		} else {
			this.bg.source = "zjh_self_card_bg";
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
		this.setCardNum(cardN);
		
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

	public showGray(isGray: boolean){
		if(this.cardMask){
			this.cardMask.visible = isGray;
		}
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
			var flilter = new egret.ColorMatrixFilter(colorMatrix);
			this.filters = [flilter];
		}
		*/
		this.huiseMask.visible = !selected;
	}

	public clearSelected():void {
		this.huiseMask.visible = false;
	}
}