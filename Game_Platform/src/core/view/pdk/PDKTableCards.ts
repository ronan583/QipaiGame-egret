class PDKTableCards extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	public static cacheDelay:number = 0;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.clearAll();
	}

	public bindBattleUI:game.pdk.PDKBattleUI;

	public cardSortDir: game.pdk.CardSort = game.pdk.CardSort.CENTER;
	public cardTypeAnim: eui.Image;
	public cardGroup: eui.Group;
	private pokerCards: Array<DDZTableCard> = new Array<DDZTableCard>();
	private space:number = 36;

	public init(): void {
		if (this.cardSortDir == game.pdk.CardSort.LEFT) {
			this.cardTypeAnim.left = 0;
		} else if (this.cardSortDir == game.pdk.CardSort.RIGHT) {
			this.cardTypeAnim.left = undefined;
			this.cardTypeAnim.right = 0;
		}
	}

	public clearAll(): void {
		this.cardGroup.removeChildren();
		this.pokerCards = new Array<DDZTableCard>();
		this.cardTypeAnim.source = "";
	}

	public getGlobalCardPos(card:number):egret.Point{
		for(let c of this.pokerCards) {
			if(c.cardNumber == card) {
				return c.localToGlobal(0, 0);
			}
		}
	}

	public showPlayCardsWithEffect(tableCard: game.pdk.TableCard) {
		this.showCards(tableCard.cards);
		this.sortPos();
		this.alpha = 0.5;
		this.scaleX = 1.4;
		this.scaleY = 1.4;
		egret.Tween.get(this).to({alpha:1,scaleX:1,scaleY:1}, 400).call(()=>{
			this.playCardTypeAnim(tableCard)
		}, this);
	}

	public showPlayCards(tableCard: game.pdk.TableCard): number {
		this.showCards(tableCard.cards);
		this.sortPos();
		PDKTableCards.cacheDelay = this.playCardTypeAnim(tableCard);
		return  DDZTableCards.cacheDelay;
	}

	public playBoom() {
		let mc: DragonAnim = game.ddz.DDZAnimHelper.getAnim("ddzzhadan");
		this.bindBattleUI.addChild(mc);
		mc.x = this.bindBattleUI.width / 2
		mc.y = this.bindBattleUI.height / 2
		if(this == this.bindBattleUI.tableCard1) {
			mc.playerOnce(()=>{
				if(mc.parent) mc.parent.removeChild(mc);
			}, this, "ddz_zhu");
		} else if(this == this.bindBattleUI.tableCard2) {
			mc.playerOnce(()=>{
				if(mc.parent) mc.parent.removeChild(mc);
			}, this, "ddz_you");
		} else if(this == this.bindBattleUI.tableCard3) {
			mc.playerOnce(()=>{
				if(mc.parent) mc.parent.removeChild(mc);
			}, this, "ddz_zuo");
		}
	}

	public playNormalAnim(anim:string) {
		let mc: DragonAnim = game.ddz.DDZAnimHelper.getAnim(anim);
		this.bindBattleUI.contentGroup.addChild(mc);
		let target:egret.DisplayObject;
		if(this == this.bindBattleUI.tableCard1) {
			target = this.bindBattleUI.cardPlayAnimPos1;
		} else if(this == this.bindBattleUI.tableCard2) {
			target = this.bindBattleUI.cardPlayAnimPos2;
		} else if(this == this.bindBattleUI.tableCard3) {
			target = this.bindBattleUI.cardPlayAnimPos3;
		}
		if(target) {
			mc.x = target.x - mc.width / 2;
			mc.y = target.y - mc.height / 2;
		}
		mc.playerOnce(()=>{
			if(mc.parent) mc.parent.removeChild(mc);
		}, this, "animation");
	}

	private playCardTypeAnim(tableCard: game.pdk.TableCard):number{
		let delay = 0;
		if (tableCard.cardType == game.pdk.CardType.MANY_DUAD) {
			this.playNormalAnim("ddzliandui");
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.DOUBLE_STRAIGHT);
			delay = 1200; 
		} else if (tableCard.cardType == game.pdk.CardType.BOMB) {
			this.playBoom();
			delay = 2500; 
			return delay;
		} else if (tableCard.cardType == game.pdk.CardType.PLANE) {
			this.playNormalAnim("ddzplane");
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.PLANE);
			delay = 1000; 
		} else if (tableCard.cardType == game.pdk.CardType.SHUN_ZI) {
			if(tableCard.contains(14)) {
				// 是否包含A
				this.playNormalAnim("ddz_tongts");
				game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.STRAIGHT);
			} else {
				this.playNormalAnim("ddzshunzi");
				game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.STRAIGHT);
			}
			delay = 1200; 
		} 

		let commonCardTypeAnim: string = "";
		if (tableCard.cardType == game.pdk.CardType.FOUR_TO_THREE) {
			commonCardTypeAnim = "pdk_4band3";
		} else if (tableCard.cardType == game.pdk.CardType.FOUR_TO_ONE) {
			commonCardTypeAnim = "pdk_4band1";
		} else if (tableCard.cardType == game.pdk.CardType.FOUR_TO_TWO) {
			commonCardTypeAnim = "pdk_4band2";
		} else if (tableCard.cardType == game.pdk.CardType.THREE_TO_ONE) {
			commonCardTypeAnim = "pdk_3band1";
		} else if (tableCard.cardType == game.pdk.CardType.THREE_TO_TWO) {
			commonCardTypeAnim = "pdk_3band2";
		}
		if (commonCardTypeAnim != "") {
			this.cardTypeAnim.source = commonCardTypeAnim;
			this.cardTypeAnim.alpha = 1;
			this.cardTypeAnim.visible = true;
			if (this.cardSortDir == game.pdk.CardSort.LEFT) {
				let len = this.pokerCards.length > 10 ? 10 : this.pokerCards.length;
				this.cardTypeAnim.left = 0;
				egret.Tween.get(this.cardTypeAnim)
					.to({ left: this.pokerCards[Math.floor(len / 2) + 1].left - this.cardTypeAnim.width / 2 }, 500, egret.Ease.sineIn)
					.wait(1000)
					.to({ left: this.cardGroup.width, alpha: 0 }, 500);
			} else if (this.cardSortDir == game.pdk.CardSort.RIGHT) {
				let len = this.pokerCards.length > 10 ? 10 : this.pokerCards.length;
				this.cardTypeAnim.left = undefined;
				this.cardTypeAnim.right = - this.cardTypeAnim.width / 2;
				let total = (len - 1) * this.space + this.pokerCards[0].width;
				egret.Tween.get(this.cardTypeAnim)
					.to({ right: (total - this.cardTypeAnim.width) / 2}, 500, egret.Ease.sineIn)
					.wait(1000)
					.to({ right: this.cardGroup.width, alpha: 0 }, 500);
			} else {
				this.cardTypeAnim.left = 0;
				egret.Tween.get(this.cardTypeAnim)
					.to({ left: this.pokerCards[Math.floor(this.pokerCards.length / 2) + 1].left - this.cardTypeAnim.width / 2 }, 500, egret.Ease.sineIn)
					.wait(1000)
					.to({ left: this.cardGroup.width, alpha: 0 }, 500);
			}
			delay = 500;
		} else {
			this.cardTypeAnim.source = "";
		}
		return delay;
	}

	public getCardByIndex(index:number) {
		return this.pokerCards[index];
	}

	public showCards(cards: Array<number>): void {
		this.clearAll();
		for (let i = 0; i < cards.length; i++) {
			let pokerCard: DDZTableCard = new DDZTableCard();
			this.cardGroup.addChild(pokerCard);
			pokerCard.showCard(cards[i]);
			this.pokerCards.push(pokerCard)
		}
		this.sortPos();
	}

	public showCardsOnEnd(cards: Array<number>) {
		if(cards.length == 0){
			CommonUtil.registerTimeOut(()=>{
				this.clearAll();
			}, this, 50 * this.pokerCards.length + 3000);
			return;
		} 
		this.showCards(cards);
		for(let card of this.pokerCards) {
			card.visible = false;
		}

		for(let i=0;i<this.pokerCards.length;i++) {
			let poker = this.pokerCards[i];
			CommonUtil.registerTimeOut(()=>{
				poker.visible = true;
			}, this, i * 50);
		}
		CommonUtil.registerTimeOut(()=>{
			this.clearAll();
		}, this, 50 * this.pokerCards.length + 3000);
	}

	public sortPos(): void {
		if (this.cardSortDir == game.pdk.CardSort.LEFT) {
			for (let i = 0; i < this.pokerCards.length; i++) {
				if (i >= 10) {
					this.pokerCards[i].left = (i - 10) * this.space;
					this.pokerCards[i].y = 50;
				} else {
					this.pokerCards[i].left = i * this.space;
				}
			}
		} else if (this.cardSortDir == game.pdk.CardSort.RIGHT) {
			this.cardGroup.removeChildren();
			let more = this.pokerCards.length - 10;
			let max = Math.min(9, this.pokerCards.length);
			for(let i=0;i<this.pokerCards.length;i++) {
				this.pokerCards[i].left = undefined;
				if (i >= 10) {
					this.pokerCards[i].right = (more - (i - 9) - 1) * this.space ;
					this.pokerCards[i].y = 50;
					this.cardGroup.addChild(this.pokerCards[i])
				} else {
					this.pokerCards[i].right = (max - i - 1) * this.space;
					this.cardGroup.addChild(this.pokerCards[i])
				}
			}
		} else {
			let offset = (this.cardGroup.width - this.pokerCards.length * this.space) / 2;
			for (let i = 0; i < this.pokerCards.length; i++) {
				this.pokerCards[i].left = i * this.space + offset;
			}
		}
	}

}