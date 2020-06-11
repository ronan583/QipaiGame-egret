class DDZTableCards extends eui.Component implements eui.UIComponent {
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

	public bindBattleUI:game.ddz.DDZBattleUI;

	public cardSortDir: game.ddz.CardSort = game.ddz.CardSort.CENTER;
	public cardTypeAnim: eui.Image;
	public cardGroup: eui.Group;
	private pokerCards: Array<DDZTableCard> = new Array<DDZTableCard>();
	private space:number = 36;

	public init(): void {
		if (this.cardSortDir == game.ddz.CardSort.LEFT) {
			this.cardTypeAnim.left = 0;
		} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
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

	public showPlayCardsWithEffect(tableCard: game.ddz.TableCard) {
		this.showCards(tableCard.cards);
		this.sortPos();
		if (game.ddz.DDZBattleData.getInstance().landlordId == tableCard.playerId) {
			this.pokerCards[this.pokerCards.length - 1].showLandlord();
		}

		this.alpha = 0.5;
		this.scaleX = 1.4;
		this.scaleY = 1.4;
		egret.Tween.get(this).to({alpha:1,scaleX:1,scaleY:1}, 200).call(()=>{
			this.playCardTypeAnim(tableCard)
		}, this);
	}

	public showPlayCards(tableCard: game.ddz.TableCard): number {
		this.showCards(tableCard.cards);
		this.sortPos();
		if (game.ddz.DDZBattleData.getInstance().landlordId == tableCard.playerId) {
			if(this.cardSortDir == game.ddz.CardSort.CENTER || this.cardSortDir == game.ddz.CardSort.LEFT) {
				this.pokerCards[this.pokerCards.length - 1].showLandlord();
			} else {
				this.pokerCards[this.pokerCards.length - 1].showLandlord();
			}
		}
		DDZTableCards.cacheDelay = this.playCardTypeAnim(tableCard);
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

	private playCardTypeAnim(tableCard: game.ddz.TableCard):number{
		let delay = 0;
		if (tableCard.cardType == game.ddz.CardType.MANY_DUAD) {
			this.playNormalAnim("ddzliandui");
			game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.DOUBLE_STRAIGHT);
			delay = 1200; 
		} else if (tableCard.cardType == game.ddz.CardType.BOMB) {
			// 炸弹是全局特效
			// mc = game.ddz.DDZAnimHelper.getAnim("ddzzhadan");
			// game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.BOMB);
			// 显示在全局
			this.playBoom();
			delay = 2500; 
			return delay;
		} else if (tableCard.cardType == game.ddz.CardType.PLANE) {
			this.playNormalAnim("ddzplane");
			game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.PLANE);
			delay = 1000; 
		} else if (tableCard.cardType == game.ddz.CardType.SHUN_ZI) {
			if(tableCard.contains(14)) {
				// 是否包含A
				this.playNormalAnim("ddz_tongts");
				game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.STRAIGHT);
			} else {
				this.playNormalAnim("ddzshunzi");
				game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.STRAIGHT);
			}
			delay = 1200; 
		} else if (tableCard.cardType == game.ddz.CardType.KING_BOMB) {
			this.playNormalAnim("ddzwangzha");
			game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.ROCKET);
			delay = 3000; 
		}
		/*
		if (mc != null) {
			if (this.cardSortDir == game.ddz.CardSort.LEFT) {
				if(game.ddz.CardType.PLANE == tableCard.cardType) {
					mc.left = this.pokerCards[this.pokerCards.length - 1].left + this.pokerCards[0].width + mc.width;
				} else {
					let m = this.pokerCards[0].left + ((this.pokerCards.length - 1) * this.space + this.pokerCards[0].width) / 2;
					mc.left = m - this.pokerCards[0].width / 2;
				}
			} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
				if(game.ddz.CardType.PLANE == tableCard.cardType) {
					mc.right = this.pokerCards[0].right + mc.width;
				} else {
					let m = this.pokerCards[this.pokerCards.length - 1].right + ((this.pokerCards.length - 1) * this.space + this.pokerCards[0].width) / 2;
					mc.right = m - this.pokerCards[0].width / 2;
				}
				mc.left = undefined;
			} else {
				let m = this.pokerCards[0].left + ((this.pokerCards.length - 1) * this.space + this.pokerCards[0].width) / 2;
				mc.left = m - this.pokerCards[0].width / 2;
				if(game.ddz.CardType.PLANE == tableCard.cardType) {
					mc.y = -100;
				}
			}
			this.cardGroup.addChild(mc);
			mc.playerOnce();
			delay = 1000; 
		}
		*/

		let commonCardTypeAnim: string = "";
		if (tableCard.cardType == game.ddz.CardType.FOUR_TO_FOUR) {
			commonCardTypeAnim = "ddz_battle_json.4band2";
		} else if (tableCard.cardType == game.ddz.CardType.FOUR_TO_TWO) {
			commonCardTypeAnim = "ddz_battle_json.4band1";
		} else if (tableCard.cardType == game.ddz.CardType.THREE_TO_ONE) {
			commonCardTypeAnim = "ddz_battle_json.3band1";
		} else if (tableCard.cardType == game.ddz.CardType.THREE_TO_TWO) {
			commonCardTypeAnim = "ddz_battle_json.3band2";
		}
		if (commonCardTypeAnim != "") {
			this.cardTypeAnim.source = commonCardTypeAnim;
			this.cardTypeAnim.alpha = 1;
			this.cardTypeAnim.visible = true;
			if (this.cardSortDir == game.ddz.CardSort.LEFT) {
				let len = this.pokerCards.length > 10 ? 10 : this.pokerCards.length;
				this.cardTypeAnim.left = 0;
				egret.Tween.get(this.cardTypeAnim)
					.to({ left: this.pokerCards[Math.floor(len / 2) + 1].left - this.cardTypeAnim.width / 2 }, 500, egret.Ease.sineIn)
					.wait(1000)
					.to({ left: this.cardGroup.width, alpha: 0 }, 500);
			} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
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

		// this.pokerCards[this.pokerCards.length - 1].showLandlord();
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
		if (this.cardSortDir == game.ddz.CardSort.LEFT) {
			for (let i = 0; i < this.pokerCards.length; i++) {
				if (i >= 10) {
					this.pokerCards[i].left = (i - 10) * this.space;
					this.pokerCards[i].y = 50;
				} else {
					this.pokerCards[i].left = i * this.space;
				}
			}
		} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
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