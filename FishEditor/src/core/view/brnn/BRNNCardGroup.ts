module game.brnn {
	export class BRNNCardGroup extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public cardGroup : eui.Group;
		public card1:BRCard;
		public card2:BRCard;
		public card3:BRCard;
		public card4:BRCard;
		public card5:BRCard;
		private cardArr:BRCard[];
		public noBetLabel : eui.Image;
		public typeIcon:BrnnResultIcon;
		private originY:number = 0;
		private cuopai:Cuopai;
		private reverseCardArr:Array<number> = [];
		private niuCardArr:Array<number> = [];
		private showCardArr:number[]

		private recordCardPosArr:Array<number>;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.card1.visible = false;
			this.card2.visible = false;
			this.card3.visible = false;
			this.card4.visible = false;
			this.card5.visible = false;
			if(this.typeIcon != null)
			{
				this.typeIcon.visible = false;
			}
			this.originY = this.card1.y;
			this.cuopai.visible = false;
			this.cardArr = [this.card1, this.card2, this.card3, this.card4, this.card5];
			this.recordCardPosArr = [];
			for(let card of this.cardArr) {
				this.recordCardPosArr.push(card.x);
			}
		}

		public ShowCard():void {
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			this.card4.visible = true;
			this.card5.visible = true;
		}

		public stopAnim() {
			for(let card of this.cardArr) {
				egret.Tween.removeTweens(card);
			}
			this.hideCard();
			this.cuopai.stop();
			this.cuopai.visible = false;
		}

		public showCardBack(){
			this.ShowCard();
			this.cuopai.visible = false;
			this.card1.showBack();
			this.card2.showBack();
			this.card3.showBack();
			this.card4.showBack();
			this.card5.showBack();
			for(let i=0;i < this.cardArr.length;i++) {
				egret.Tween.removeTweens(this.cardArr[i]);
				this.cardArr[i].y = this.originY;
				this.cardArr[i].x = this.recordCardPosArr[i];
			}
		}

		public ShowCardContent1(cards1):void {
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			this.card4.visible = true;
			this.card5.visible = true;

			this.card1.showCard(cards1.cards[0]);
			this.card2.showCard(cards1.cards[1]);
			this.card3.showCard(cards1.cards[2]);
			this.card4.showCard(cards1.cards[3]);
			this.card5.showCard(cards1.cards[4]);
		}

		public ShowCardContent(cards1,cards2):void {
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			this.card4.visible = true;
			this.card5.visible = true;

			this.card1.showCard(cards1.cards[0]);
			this.card2.showCard(cards1.cards[1]);
			this.card3.showCard(cards1.cards[2]);
			this.card4.showCard(cards2.cards[0]);
			this.card5.showCard(cards2.cards[1]);
		}

		private recordPosXArr = [0,0,0,0];

		public showCardContent4(groupCards, showCardValues:Array<number>)
		{
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			this.card4.visible = true;
			this.card5.visible = true;
			this.recordPosXArr = [this.card1.x, this.card2.x, this.card3.x, this.card4.x];
			// 先是牌的背面缩回去
			egret.Tween.get(this.card1).to({x:this.card5.x},500);
			egret.Tween.get(this.card2).to({x:this.card5.x},500);
			egret.Tween.get(this.card3).to({x:this.card5.x},500);
			egret.Tween.get(this.card4).to({x:this.card5.x},500).call(()=>{
				this.showCardArr = [];
				let newCardArr = [];
				if(groupCards.length == 1)
				{
					for(let i=0;i<groupCards[0].cards.length;i++) {
						this.showCardArr.push(groupCards[0].cards[i]);
						newCardArr.push(groupCards[0].cards[i]);
					}
					for(let card of this.cardArr) {
						card.y = this.originY;
					}
				}else
				{
					for(let i=0;i<groupCards[0].cards.length;i++) {
						this.showCardArr.push(groupCards[0].cards[i]);
						newCardArr.push(groupCards[0].cards[i]);
					}
					for(let i=0;i<groupCards[1].cards.length;i++) {
						this.showCardArr.push(groupCards[1].cards[i]);
						newCardArr.push(groupCards[1].cards[i]);
					}
					this.niuCardArr[0] = groupCards[1].cards[0]
					this.niuCardArr[1] = groupCards[1].cards[1]
				}
				// newcardarr 乱序
				this.reverseCardArr = [];
				for(let c of showCardValues) {
					this.reverseCardArr.push(c);
				}
				/*
				while(newCardArr.length > 0) {
					let index = CommonUtil.RandomRangeInt(0, newCardArr.length);
					let random = newCardArr[index];
					this.reverseCardArr.push(random);
					newCardArr.splice(index, 1);
				}
				*/
				let showCards:Array<BRCard> = [];
				for(let i=0;i<this.reverseCardArr.length;i++) {
					this.cardArr[i].showCard(this.reverseCardArr[i]);
					if(this.niuCardArr.indexOf(this.reverseCardArr[i]) >= 0) {
						showCards.push(this.cardArr[i]);
					}
				}
				this.card1.x = this.card2.x = this.card3.x = this.card4.x = this.card5.x;
				egret.Tween.get(this.card1).to({x:this.recordPosXArr[0]},500);
				egret.Tween.get(this.card2).to({x:this.recordPosXArr[1]},500);
				egret.Tween.get(this.card3).to({x:this.recordPosXArr[2]},500);
				egret.Tween.get(this.card4).to({x:this.recordPosXArr[3]},500);
				this.card5.showBack();
			}, this);
		}

		public showCardContentDirect(groupCards, showCardValues:Array<number>)
		{
			this.card1.visible = true;
			this.card2.visible = true;
			this.card3.visible = true;
			this.card4.visible = true;
			this.card5.visible = true;

			this.showCardArr = [];
			let newCardArr = [];
			if(groupCards.length == 1)
			{
				for(let i=0;i<groupCards[0].cards.length;i++) {
					this.showCardArr.push(groupCards[0].cards[i]);
					newCardArr.push(groupCards[0].cards[i]);
				}
				for(let card of this.cardArr) {
					card.y = this.originY;
				}
			}else
			{
				for(let i=0;i<groupCards[0].cards.length;i++) {
					this.showCardArr.push(groupCards[0].cards[i]);
					newCardArr.push(groupCards[0].cards[i]);
				}
				for(let i=0;i<groupCards[1].cards.length;i++) {
					this.showCardArr.push(groupCards[1].cards[i]);
					newCardArr.push(groupCards[1].cards[i]);
				}
				this.niuCardArr[0] = groupCards[1].cards[0]
				this.niuCardArr[1] = groupCards[1].cards[1]
			}
			// newcardarr 乱序
			this.reverseCardArr = [];
			for(let c of showCardValues) {
				this.reverseCardArr.push(c);
			}
			
			let showCards:Array<BRCard> = [];
			for(let i=0;i<this.reverseCardArr.length;i++) {
				this.cardArr[i].showCard(this.reverseCardArr[i]);
				if(this.niuCardArr.indexOf(this.reverseCardArr[i]) >= 0) {
					showCards.push(this.cardArr[i]);
				}
			}
			this.card5.showBack();
		}

		public showCardContentLastNoEffect(groupCards , value , isBet)
		{
			let lastCardValue = 0;
			this.card1.visible = this.card2.visible = this.card3.visible = this.card4.visible = this.card5.visible = true
			if(groupCards.length == 1)
			{
				this.card1.showCard(groupCards[0].cards[0]);
				this.card2.showCard(groupCards[0].cards[1]);
				this.card3.showCard(groupCards[0].cards[2]);
				this.card4.showCard(groupCards[0].cards[3]);
				this.card5.showCard(groupCards[0].cards[4]);
				lastCardValue = groupCards[0].cards[4];
				this.card4.y = this.card5.y = this.originY;
			}else
			{

				this.card1.showCard(groupCards[0].cards[0]);
				this.card2.showCard(groupCards[0].cards[1]);
				this.card3.showCard(groupCards[0].cards[2]);
				this.card4.y = this.card5.y = this.originY - 40;
				this.card4.showCard(groupCards[1].cards[0]);
				this.card5.showCard(groupCards[1].cards[1]);
				lastCardValue = groupCards[1].cards[1];
			}
			if(isBet)
			{
				this.noBetLabel.visible = false;
			}else
			{
				this.noBetLabel.visible = false;
			}
			this.showCardType(value);
		}

		public getCuopaiTime() {
			return this.cuopai.getAnimTime();
		}

		public newShowCardContentLast(groupCards , value)
		{
			let lastCardValue = 0;
			let showCards:Array<BRCard> = [];
			for(let i=0;i<this.reverseCardArr.length;i++) {
				this.cardArr[i].showCard(this.reverseCardArr[i]);
				if(this.niuCardArr.indexOf(this.reverseCardArr[i]) >= 0) {
					showCards.push(this.cardArr[i]);
				}
			}
			this.noBetLabel.visible = false;
			this.card5.visible = false;
			// 先播放搓牌动画
			this.cuopai.visible = true;
			this.cuopai.play(this.cardArr[this.cardArr.length - 1].cardNum,()=>{
				this.card5.visible = true;
				this.cuopai.visible = false;
				if(groupCards.length > 1) {	
					let targetY = this.originY - 40;
					// 找出需要展示的卡片
					if(showCards[0]) egret.Tween.get(showCards[0]).to({y:targetY},300)
					if(showCards[1]) {
						egret.Tween.get(showCards[1]).to({y:targetY},300).call(()=>{
							BrnnSoundPlayer.instance.playerCardType(value);
							this.showCardType(value);
						},this);
					}
				} else {
					BrnnSoundPlayer.instance.playerCardType(value);
					this.showCardType(value);
				}
			},this);
		}

		public showCardContentLast(groupCards , value , isBet)
		{
			this.card3.visible = true;
			if(this.card3.parent != null)
			{
				this.cardGroup.removeChild(this.card3);
			}
			this.card3.x = -this.card3.width;
			CommonUtil.registerTimeOut(function(){
				this.card3.showCard(groupCards[0].cards[2]);
				this.cardGroup.addChildAt(this.card3 , 2);
				if(isBet)
				{
					this.noBetLabel.visible = false;
				}else
				{
					this.noBetLabel.visible = true;
				}
			}, this, 500);
			CommonUtil.registerTimeOut(function()
			{
				BrnnSoundPlayer.instance.playerCardType(value);
				this.showCardType(value);
			}, this, 800);
		}

		public hideCard():void {
			CommonUtil.removeTimeout(this);
			this.card1.showBack();
			this.card2.showBack();
			this.card3.showBack();
			this.card4.showBack();
			this.card5.showBack();
			this.card1.visible = false;
			this.card2.visible = false;
			this.card3.visible = false;
			this.card4.visible = false;
			this.card5.visible = false;
			this.cuopai.visible = false;
			for(let card of this.cardArr) {
				card.y = this.originY;
			}
			this.noBetLabel.visible = false;
			if(this.typeIcon != null)
			{
				this.typeIcon.visible = false;
			}
			for(let i=0;i<this.recordCardPosArr.length;i++) {
				this.cardArr[i].x = this.recordCardPosArr[i];
			}
			egret.log("hideCard  ");
		}

		public startFapai(battlUI:BrnnBattleScene, index:number) {
			let isbanker = index == 0;
			// 第一步所有牌放到1号牌位置
			this.card2.x = this.card3.x = this.card4.x = this.card5.x = this.card1.x;
			for(let i=0;i < 5;i++) {
				CommonUtil.registerTimeOut(()=>{
					this.showFapaiTween(i, battlUI, isbanker);
				}, this, i * 50);
			}
		}

		public showDefaultCard() {
			for(let i=0;i<this.cardArr.length;i++) {
				egret.Tween.removeTweens(this.cardArr[i]);
				this.cardArr[i].x = this.recordCardPosArr[i];
				this.cardArr[i].showBack();
			}
		}

		public showFapaiTween(index:number, battlUI:BrnnBattleScene,isbanker : boolean ) : void {
			let bsCard = new BSTweenCard("brnn_self_card_bg");
			battlUI.contentGroup.addChildAt(bsCard, battlUI.contentGroup.numChildren - 2);
			if(isbanker)
			{
				bsCard.scaleX = 0.3;
				bsCard.scaleY = 0.3;
				this.scaleX = this.scaleY = 0.75;
			}else
			{
				bsCard.scaleX = 0.3;
				bsCard.scaleY = 0.3;
			}
			bsCard.x = battlUI.fapaiFlag.x;
			bsCard.y = battlUI.fapaiFlag.y;
			bsCard.rotation = 45;
			let targetPoint = this.localToGlobal(this.cardArr[0].x, this.cardArr[0].y);
			targetPoint = battlUI.contentGroup.globalToLocal(targetPoint.x, targetPoint.y);
			// 都是飞到第一张牌
			if(index == 4) {
				bsCard.startTween(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, 
					this.scaleX, this.scaleY, this.cardArr[index], this.leftToRightCardTween, this);
			} else {
				bsCard.startTween(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, this.scaleX, this.scaleY, this.cardArr[index]);
			}
		}

		private leftToRightCardTween() {
			for(let card of this.cardArr) {
				egret.Tween.removeTweens(card);
			}
			for(let i=1;i < 5;i++) {
				let card = this.cardArr[i];
				card.visible = true;
				egret.Tween.get(card).to({x:this.recordCardPosArr[i]}, 300);
			}
		}
		
		public showCardType(cardType:number):void {
			if(this.typeIcon == null)
			{
				return;
			}
			this.typeIcon.visible = true;
			this.typeIcon.ShowUI(cardType);
		}
	}
}