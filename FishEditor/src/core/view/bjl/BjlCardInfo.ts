module game.bjl {
	export class BjlCardInfo extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public zCardPoint : eui.Image;
		public xCardPoint : eui.Image;
		// public bankerNumLabel : eui.BitmapLabel;
		// public playerNumLabel : eui.BitmapLabel;
		public zCard1 : BjlCard;
		public zCard2 : BjlCard;
		public zCard3 : BjlCard;
		public xCard1 : BjlCard;
		public xCard2 : BjlCard;
		public xCard3 : BjlCard;
		public cards1 : BjlCard[];
		public cards2 : BjlCard[];
		private cuopai1:Cuopai;
		private cuopai2:Cuopai;
		private cuopai3:Cuopai;
		private cuopai4:Cuopai;
		private cuopaiArr:Array<Cuopai>;
		// public bankerScoreGroup : eui.Group;
		// public playerScoreGroup : eui.Group;
		private xianWin:MCAnim;
		private zhuangWin:MCAnim;

		public getCardByIndex(index:number):BjlCard {
			if(index > 2) {
				return this.cards2[index - 3];
			} else {
				return this.cards1[index];
			}
		}

		public getCuopaiByIndex(index:number):Cuopai {
			return this.cuopaiArr[index];
		}

		public init() {
			// 初始化的时候 所有牌都隐藏
			for(let card of this.cards1) {
				card.visible = false;
			}
			for(let card of this.cards2) {
				card.visible = false;
			}
			for(let cuopai of this.cuopaiArr) {
				cuopai.visible = false;
			}
		}

		private timeoutIdList:Array<number> = [];
		private xianDot : number = 0;
		private zhuangDot : number = 0;
		private card1PosArr:Array<egret.Point>;
		private card2PosArr:Array<egret.Point>;
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.cuopaiArr = [this.cuopai1, this.cuopai2, this.cuopai3, this.cuopai4];
			this.cards1 = [this.xCard1 , this.xCard2 ,this.xCard3]
			this.cards2 = [this.zCard3 , this.zCard2 ,this.zCard1]
			this.card1PosArr = [];
			this.card2PosArr = [];
			for(let card of this.cards1) {
				this.card1PosArr.push(new egret.Point(card.x, card.y));
			}
			for(let card of this.cards2) {
				this.card2PosArr.push(new egret.Point(card.x, card.y));
			}
			this.reset();
		}

		public fixTargetCard(card:BjlCard) {
			let i = this.cards1.indexOf(card);
			if(i >= 0) {
				this.cards1[i].x = this.card1PosArr[i].x;
				this.cards1[i].y = this.card1PosArr[i].y;
			}
			i = this.cards2.indexOf(card);
			if(i >= 0) {
				this.cards2[i].x = this.card2PosArr[i].x;
				this.cards2[i].y = this.card2PosArr[i].y;
			}
		}

		public reset()
		{
			for(let card of this.cards1) {
				egret.Tween.removeTweens(card);
			}
			for(let card of this.cards2) {
				egret.Tween.removeTweens(card);
			}
			this.zCardPoint.visible = this.xCardPoint.visible = false;
			this.xianWin.visible = this.zhuangWin.visible = false;
			for(var i = 0; i < 3 ; i++)
			{
				this.cards1[i].showBack();
				this.cards2[i].showBack();
				this.cards1[i].setVisible(false);
				this.cards2[i].setVisible(false);
				this.cards1[i].x = this.card1PosArr[i].x;
				this.cards1[i].y = this.card1PosArr[i].y;
				this.cards2[i].x = this.card2PosArr[i].x;
				this.cards2[i].y = this.card2PosArr[i].y;
			}
			for(let cuopai of this.cuopaiArr) {
				cuopai.visible = false;
				cuopai.stop();
			}
		}

		public showResultNoEffect2(resultData:game.bjl.BjlRoundResultData) {
			let list = resultData.cardInfo.getXianList();
			let xcount = 0, zcount = 0;
			for(let i=0; i<list.length; i++) {
				if(list[i] > 0) {
					this.cards1[i].showCardDirect(list[i])
					this.cards1[i].setVisible(true);
					xcount++;
				}
			}
			list = resultData.cardInfo.getZhuangList();
			for(let i=0; i<list.length; i++) {
				if(list[i] > 0) {
					this.cards2[i].showCardDirect(list[i])
					this.cards2[i].setVisible(true);
					zcount++;
				}
			}

			this.showXDian(resultData.cardInfo.getXianDian(), xcount - 1);
			this.showZDian(resultData.cardInfo.getZhuangDian(), zcount - 1);
		}

		public showXDian(dian:number, xcardNum:number) {
			this.xCardPoint.visible = true;
			this.xCardPoint.source = "bjlGame_json.cardPoint" + dian;
			let width = this.cards1[xcardNum].x - this.cards1[0].x;
			egret.log("===========xcardnum : " + xcardNum);
			egret.log("===========width : " + width);
			this.xCardPoint.x = this.cards1[0].x + width / 2;
			egret.log("===========xCardPoint.x : " + this.xCardPoint.x);
		}

		public showZDian(dian:number, zcardNum:number) {
			this.zCardPoint.visible = true;
			this.zCardPoint.source = "bjlGame_json.cardPoint" + dian;
			let width = this.cards2[zcardNum].x - this.cards2[0].x;
			this.zCardPoint.x = this.cards2[0].x + width / 2;
		}

		public showXianWin() {
			this.xianWin.visible = true;
			this.xianWin.playerOnce();
		}

		public showZhuangWin() {
			this.zhuangWin.visible = true;
			this.zhuangWin.playerOnce();
		}
	}
}