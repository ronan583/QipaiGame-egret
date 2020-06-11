class PDKPokerCardOperation extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.cardGroup.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public cardSortDir: game.ddz.CardSort = game.ddz.CardSort.CENTER;
	public cardTypeAnim: eui.Image;
	public cardGroup: eui.Group;
	private pokerCards: Array<PDKPokerCard> = new Array<PDKPokerCard>();
	private isMain: boolean = false;
	private trueCards:Array<number> ;
	private moveDir:number = 0;

	public init(): void {
		if (this.cardSortDir == game.ddz.CardSort.LEFT) {
			this.cardTypeAnim.left = 0;
		} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
			this.cardTypeAnim.left = undefined;
			this.cardTypeAnim.right = 0;
		}
	}

	
	private addTouchBehaviorListener() {
		if(!this.cardGroup.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
			this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		}
		if(!this.cardGroup.hasEventListener(egret.TouchEvent.TOUCH_END)) {
			this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}
		if(!this.cardGroup.hasEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)) {
			this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}
	}

	private startMovePoker:PDKPokerCard;
	private lastOperPDKPokerCard:PDKPokerCard;
	private onTouchBegin(e: egret.TouchEvent): void {
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.moveDir = 0;
		let p: egret.Point = this.cardGroup.globalToLocal(e.stageX, e.stageY);
		let pokerCard: PDKPokerCard = this.getPokerCard(p.x, p.y);
		if (pokerCard != null) {
			this.togglePreSelect(pokerCard);
			this.startMovePoker = pokerCard;
			this.addTouchBehaviorListener();
			game.pdk.PDKBattleData.getInstance().clearLastTip();
		}
	}

	private togglePreSelect(pokerCard: PDKPokerCard) {
		if (pokerCard == this.lastOperPDKPokerCard) {
			return;
		} else {
			this.lastOperPDKPokerCard = pokerCard;
			this.lastOperPDKPokerCard.togglePreSelect();
		}
	}


	private onTouchMove(e: egret.TouchEvent): void {
		let p: egret.Point = this.cardGroup.globalToLocal(e.stageX, e.stageY);
		let pokerCard: PDKPokerCard = this.getPokerCard(p.x, p.y);
		if (pokerCard != null) {
			if(this.startMovePoker != null) {
				let startIndex = this.pokerCards.indexOf(this.startMovePoker);
				let curIndex = this.pokerCards.indexOf(pokerCard);
				let min = Math.min(startIndex, curIndex);
				let max = Math.max(startIndex, curIndex);
				for(let i=0;i<this.pokerCards.length;i++) {
					if(i >= min && i <= max) {
						this.pokerCards[i].setPreSleect();
					} else {
						this.pokerCards[i].cancelPreSelect();
					}
				}
			} else {
				this.startMovePoker = pokerCard;
			}
			game.pdk.PDKBattleData.getInstance().clearLastTip();
		}
	}

	public getPreSelectCards():Array<PDKPokerCard> {
		let result:Array<PDKPokerCard> = [];
		for(let card of this.pokerCards) {
			if(card.preSelect && !card.forbidden) {
				result.push(card);
			}
		}
		return result;
	}

	public getSelectPokerCards(): Array<PDKPokerCard> {
		let cards: Array<PDKPokerCard> = new Array<PDKPokerCard>();
		for (let pokerCard of this.pokerCards) {
			if (pokerCard.isSelect) {
				cards.push(pokerCard);
			}
		}
		return cards;
	}

	private lastExecCard:game.DDZExecCards;

	private onTouchEnd(e: egret.TouchEvent): void {
		this.lastOperPDKPokerCard = null;
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		let preSelectArr = this.getPreSelectCards();
		let selectArr = this.getSelectPokerCards();
		/*
		// 我认为 preselectarr 与 selectarr 如果完全没有交集的化 应该是preselectarr 直接选中突出
		if(selectArr.length > 0 && this.isAllDiff(preSelectArr, selectArr)) {
			for(let card of preSelectArr) {
				card.select();
			}
			return;
		}
		*/

		if(CommonUtil.isNumberArrayEquals(this.genCardArrFromPokerList(preSelectArr), this.genCardArrFromPokerList(selectArr))) {
			for(let card of preSelectArr) {
				card.cancelSelect();
			}
			this.lastExecCard = null;
			return;
		}
		if(preSelectArr.length < 3) {
			// 直接执行操作 之前选中的就取消 
			for(let card of preSelectArr) {
				if(selectArr.indexOf(card) >= 0) {
					card.cancelSelect();
				} else {
					card.select();
				}
			}
			return;
		}
		if(game.PDKRule.IsDDZDebug) {
			// this.onTableSelect(preSelectArr, selectArr, game.DDZRule.DEBUG_TABLE_CARDS);
			this.onNoTableSelect(preSelectArr, selectArr);
		} else {
			let tableCard = game.pdk.PDKBattleData.getInstance().tableCard;
			if(tableCard && tableCard.playerId != UserService.instance.playerId) {
				this.onTableSelect(preSelectArr, selectArr, tableCard);
			} else {
				this.onNoTableSelect(preSelectArr, selectArr);
			}
		}
	}

	private genCardArrFromPokerList(arr:Array<PDKPokerCard>):Array<number>{
		let cards:Array<number> = [];
		for(let c of arr) {
			cards.push(c.cardNumber);
		}
		return cards
	}

	private onTableSelect(preSelectArr:Array<PDKPokerCard>, selectArr:Array<PDKPokerCard>, tableCard:game.pdk.TableCard) {
		// 智能出牌
		let cards = [];
		for(let card of preSelectArr) {
			if(cards.indexOf(card.cardNumber) >= 0) continue;
			cards.push(card.cardNumber);
		}
		// 第一步是否能找到主牌
		let findRoot = false;
		let selectCardExec:game.DDZExecCards = null;
		let firstStageCards=[];
		// let withCardSelector = new game.ddz.WithCardSelector();
		selectCardExec = game.DDZRule.selectOnTableNoBoom(cards, tableCard, cards);
		if(selectCardExec) {
			findRoot = true;
		}
		for(let card of preSelectArr) {
			if(firstStageCards.indexOf(card.cardNumber) >= 0) continue;
			firstStageCards.push(card.cardNumber);
		}
		if(!findRoot) {
			for(let card of selectArr) {
				if(cards.indexOf(card.cardNumber) >= 0) continue;
				cards.push(card.cardNumber);
			}
			selectCardExec = game.DDZRule.selectOnTableNoBoom(cards, tableCard, cards);
			if(!selectCardExec) {
				selectCardExec = game.DDZRule.selectBoom(cards);
			}
		}
		if(!selectCardExec) {
			// 始终没有找到主牌，说明玩家在瞎几把选，那就让他选吧
			this.onNoTableSelect(preSelectArr, selectArr);
		} else {
			if(this.lastExecCard && this.lastExecCard.equals(selectCardExec)) {
				for(let card of preSelectArr) {
					if(selectArr.indexOf(card) >= 0) {
						card.cancelSelect();
					} else {
						card.select();
					}
				}
				this.lastExecCard = null;
				return;
			}
			// 找到主牌了 看副牌
			let selectCards:Array<number> = [];
			for(let c of selectCardExec.cardList) {
				selectCards.push(c.cardNumber);
			}
			let leftCards = [];
			for(let c of firstStageCards) {
				if(selectCards.indexOf(c) < 0 && leftCards.indexOf(c) < 0) {
					leftCards.push(c);
				}
			}
			if(selectCardExec.checkPairInfoList.length > 0) {
				for(let pairInfo of selectCardExec.checkPairInfoList) {
					if(pairInfo instanceof game.BothSideFindPairInfo) {
						// 找指定
						if(pairInfo.isDuizi) {
							for(let i=2;i<=3;i++) {
								let r = game.DDZRule.searchDuiziBothSideThreeStage(
									CommonUtil.subArr(this.genCardArrFromPokerList(preSelectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(selectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(this.pokerCards), selectCards),
									pairInfo, i);
								if(r.length > 0) {
									for(let c of r) {
										selectCards.push(c)
									}
								}
								if(pairInfo.count == 0) break;
							}
						} else {
							for(let i=1;i<=3;i++) {
								let r = game.DDZRule.searchSingleBothSideThreeStage(
									CommonUtil.subArr(this.genCardArrFromPokerList(preSelectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(selectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(this.pokerCards), selectCards),
									pairInfo, i);
								if(r.length > 0) {
									for(let c of r) {
										selectCards.push(c)
									}
								}
								if(pairInfo.count == 0) break;
							}
						}
					} else {
						if(pairInfo.isDuizi) {
							let result = game.DDZRule.searchDuiziThreeStage(
								CommonUtil.subArr(this.genCardArrFromPokerList(preSelectArr), selectCards),
								CommonUtil.subArr(this.genCardArrFromPokerList(selectArr), selectCards),
								CommonUtil.subArr(this.genCardArrFromPokerList(this.pokerCards), selectCards),
								pairInfo.count
							)
							if(result.length > 0) {
								for(let c of result) {
									selectCards.push(c)
								}
							}
						} else {
							// 找数量为n的单张
							let needCount = selectCardExec.checkPaireInfo.count;
							for(let i=1;i<=3;i++) {
								let r = game.DDZRule.searchSingleThreeStage(
									CommonUtil.subArr(this.genCardArrFromPokerList(preSelectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(selectArr), selectCards),
									CommonUtil.subArr(this.genCardArrFromPokerList(this.pokerCards), selectCards),
									needCount, i);
								if(r.length > 0) {
									for(let c of r) {
										selectCards.push(c)
									}
									needCount -= r.length;
								}
								if(needCount <= 0) break;
							}
						}
					}
				}
			}
			if(CommonUtil.isNumberArrayEquals(selectCards, this.genCardArrFromPokerList(selectArr))) {
				for(let card of selectArr) {
					card.cancelSelect()
				}
				this.lastExecCard = null;
			} else {
				for(let pokerCard of this.pokerCards) {
					if(selectCards.indexOf(pokerCard.cardNumber) >= 0) {
						pokerCard.select();
					} else {
						pokerCard.cancelSelect();
					}
				}
			}
		}
		this.lastExecCard = selectCardExec;
	}

	private autoAddWithCards(count:number, cards:Array<number>):Array<number>{
		let map = game.PokerCardMap.convertFromCards(cards);
		let r = map.getCardsBySize(1, count);
		if(r.length < 2) {
			// 纯单张不够放开找
			let nextFindCards = CommonUtil.copyNumberArray(cards);
			map = game.PokerCardMap.convertFromCards(CommonUtil.subArr(nextFindCards, r));
			r.concat(map.getSingle(count - r.length));
		}
		return r;
	}

	private onNoTableSelect(preSelectArr:Array<PDKPokerCard>, selectArr:Array<PDKPokerCard>) {
		// 智能出牌
		let cards = [];
		for(let card of preSelectArr) {
			if(cards.indexOf(card.cardNumber) >= 0) continue;
			cards.push(card.cardNumber);
		}
		for(let card of selectArr) {
			if(cards.indexOf(card.cardNumber) >= 0) continue;
			cards.push(card.cardNumber);
		}
		let selectCardExec = game.DDZRule.selectOnConditionNoBoom(cards);
		if(!selectCardExec) {
			selectCardExec = game.DDZRule.selectBoom(cards);
		}
		
		if(/*(this.lastExecCard && this.lastExecCard.equals(selectCardExec)) || */!selectCardExec) {
			for(let card of preSelectArr) {
				if(selectArr.indexOf(card) >= 0) {
					card.cancelSelect();
				} else {
					card.select();
				}
			}
			this.lastExecCard = null;
			return;
		}
		
		let selectCards:Array<number> = [];
		for(let c of selectCardExec.cardList) {
			selectCards.push(c.cardNumber);
		}
		if(selectCardExec.cardRoot == game.CardRoot.THREE) {
			let leftCards = [];
			let searchCount = 2 * Math.floor(selectCardExec.cardList.length / 3);
			for(let c of cards) {
				if(selectCards.indexOf(c) < 0) {
					leftCards.push(c);
				}
			}
			let map = game.PokerCardMap.convertFromCards(leftCards);
			if(map.getCountBySize(2) >= searchCount) {
				let r = map.getCardsBySize(2, searchCount);
				selectCards = selectCards.concat(r);
			} else {
				// 找对子是不够的 找单张
				let r = map.getSingle(searchCount);
				if(r.length > 0) {
					selectCards = selectCards.concat(r);
				}
			}
		}
		if(CommonUtil.isNumberArrayEquals(selectCards, this.genCardArrFromPokerList(selectArr))) {
			for(let card of selectArr) {
				card.cancelSelect()
			}
			for(let card of preSelectArr) {
				card.cancelPreSelect();
			}
			this.lastExecCard = null;
			return;
		} else {
			for(let pokerCard of this.pokerCards) {
				if(selectCards.indexOf(pokerCard.cardNumber) >= 0) {
					pokerCard.select();
				} else {
					pokerCard.cancelSelect();
				}
			}
		}
	
		this.lastExecCard = selectCardExec;
	}

	private lastOperPokerCard: PDKPokerCard = null;
	private toggleSelect(pokerCard: PDKPokerCard): void {
		if (pokerCard == this.lastOperPokerCard) {
			return;
		} else {
			this.lastOperPokerCard = pokerCard;
			this.lastOperPokerCard.toggleSelect();
			game.AppFacade.getInstance().sendNotification(PanelNotify.PDK_CLEAR_LAST_TIP);
		}
	}

	public clearAll(): void {
		this.cardGroup.removeChildren();
		this.pokerCards = new Array<PDKPokerCard>();
	}

	public clearAllChoose(): void {
		for (let poker of this.pokerCards) {
			if (poker.isSelect) poker.toggleSelect();
		}
	}

	public getPokerCard(x: number, y: number): PDKPokerCard {
		for (let i = this.pokerCards.length - 1; i >= 0; i--) {
			if (i == this.pokerCards.length - 1) {
				// 最外面一张牌
				if (x >= this.pokerCards[i].x && x <= this.pokerCards[i].x + this.pokerCards[i].width
					&& y >= this.pokerCards[i].y && y <= this.pokerCards[i].y + this.pokerCards[i].height) {
						if(!this.pokerCards[i].forbidden) return this.pokerCards[i];
				}
			} else {
				if (x >= this.pokerCards[i].x && x <= this.pokerCards[i].x + 90
					&& y >= this.pokerCards[i].y && y <= this.pokerCards[i].y + this.pokerCards[i].height) {
					if(!this.pokerCards[i].forbidden) return this.pokerCards[i];
				}
			}
		}

		return null;
	}

	private onAddToStage(): void {
		this.cardGroup.left = (this.stage.stageWidth - this.pokerCards.length * 50) / 2;
	}

	public showPlayCards(tableCard: game.pdk.TableCard): void {
		// tableCard.cardType = game.pdk.CardType.FOUR_TO_THREE;
		// tableCard.cards = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68];

		this.showCards(tableCard.cards);
		var mc: eui.UILayer = null;

		if (tableCard.cardType == game.pdk.CardType.MANY_DUAD) {
			mc = new game.CommonDB("ddzliandui_ske_dbbin", "ddzliandui_tex_json", "ddzliandui_tex_png", "armature", 1000);
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.DOUBLE_STRAIGHT);
		} else if (tableCard.cardType == game.pdk.CardType.BOMB) {
			mc = new game.CommonDB("ddzzhadan_ske_dbbin", "ddzzhadan_tex_json", "ddzzhadan_tex_png", "armature", 2000);
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.BOMB);
		} else if (tableCard.cardType == game.pdk.CardType.PLANE) {
			mc = new game.CommonDB("ddzfeiji_ske_dbbin", "ddzfeiji_tex_json", "ddzfeiji_tex_png", "armature", 4000);
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.PLANE);
		} else if (tableCard.cardType == game.pdk.CardType.SHUN_ZI) {
			mc = new game.CommonDB("ddzshunzi_ske_dbbin", "ddzshunzi_tex_json", "ddzshunzi_tex_png", "armature", 800);
			game.pdk.PDKSoundPlayer.instance.playSound(game.pdk.PDKSoundType.STRAIGHT);
		}
		if (mc != null) {
			mc.width = 150;
			mc.height = 120;
			if (this.cardSortDir == game.ddz.CardSort.LEFT) {
				mc.left = Math.floor(this.pokerCards.length / 2) * 55 + mc.width / 2;
			} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
				let offset = (this.pokerCards.length * 55) / 2;
				mc.left = Math.floor((15 - this.pokerCards.length) / 2) * 55 + mc.width / 2 + offset;
				mc.right = undefined;
			} else {
				let offset = (this.cardGroup.width - this.pokerCards.length * 55) / 2;
				mc.left = Math.floor(this.pokerCards.length / 2) * 55 + offset + mc.width / 2;
			}
			mc.touchChildren = false;
			mc.touchEnabled = false;
			this.cardGroup.addChild(mc);
		}

		var commonCardTypeAnim: string = "";
		if (tableCard.cardType == game.pdk.CardType.FOUR_TO_ONE) {
			commonCardTypeAnim = "pdk_4band1";
		} else if (tableCard.cardType == game.pdk.CardType.FOUR_TO_TWO) {
			commonCardTypeAnim = "pdk_4band2";
		} else if (tableCard.cardType == game.pdk.CardType.FOUR_TO_THREE) {
			commonCardTypeAnim = "pdk_4band3";
		} else if (tableCard.cardType == game.pdk.CardType.THREE_TO_ONE) {
			commonCardTypeAnim = "pdk_3band1";
		} else if (tableCard.cardType == game.pdk.CardType.THREE_TO_TWO) {
			commonCardTypeAnim = "pdk_3band2";
		}
		if (commonCardTypeAnim != "") {
			this.cardTypeAnim.source = commonCardTypeAnim;
			this.cardTypeAnim.alpha = 1;
			this.cardTypeAnim.visible = true;
			if (this.cardSortDir == game.ddz.CardSort.LEFT) {
				this.cardTypeAnim.left = 0;
				egret.Tween.get(this.cardTypeAnim).to({ left: Math.floor(this.pokerCards.length / 2) * 55 - this.cardTypeAnim.width / 2 }, 500, egret.Ease.sineIn).wait(1000).to({ left: 600, alpha: 0 }, 500);
			} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
				let offset = (this.pokerCards.length * 55) / 2;
				this.cardTypeAnim.left = undefined;
				this.cardTypeAnim.right = -offset;
				egret.Tween.get(this.cardTypeAnim).to({ right: (Math.floor(this.pokerCards.length / 2) * 55 + this.cardTypeAnim.width / 2) - offset }, 500, egret.Ease.sineIn).wait(1000).to({ right: 600 - offset, alpha: 0 }, 500);
			} else {
				this.cardTypeAnim.left = 0;
				let offset = (this.cardGroup.width - this.pokerCards.length * 55) / 2;
				egret.Tween.get(this.cardTypeAnim).to({ left: Math.floor(this.pokerCards.length / 2) * 55 + offset - this.cardTypeAnim.width / 2 }, 500, egret.Ease.sineIn).wait(1000).to({ left: 600, alpha: 0 }, 500);
			}
		} else {
			this.cardTypeAnim.source = "";
		}

		this.sortPos();
	}

	public showMainCards(cards: Array<number>, isStart:boolean = false): void {
		this.isMain = true;
		if(isStart) {
			// 先生成数据牌 默认隐藏
			// 需要先乱序
			this.trueCards = this.rebuildCards(cards);
			let disorderArr = CommonUtil.disorder(cards);
			this.showCards(disorderArr);
			for(let card of this.pokerCards) {
				card.visible = false;
			}
			this.validateNow();
		} else {
			this.showCards(cards);
		}
	}

	public showCardsWithFlag(cards:Array<number>) {
		this.trueCards = this.rebuildCards(cards);
		this.showCards(this.trueCards);
	}

	public rebuildCards(cards:Array<number>):Array<number>{
		let specialIndex = cards.indexOf(14);
		if(specialIndex >= 0) {
			cards.splice(specialIndex, 1);
			cards.push(14);
		}
		return cards;
	}

	public showCardsWithAdd(cards: Array<number>): void {
		// 显示新增卡牌并设置动画
		let cardIndex = cards.length;
		let newCardList: Array<PDKPokerCard> = new Array<PDKPokerCard>();
		for (let i = 0; i < cards.length; i++) {
			let pokerCard: PDKPokerCard = new PDKPokerCard();
			pokerCard.cardIndex = ++cardIndex;
			pokerCard.showCard(cards[i]);

			this.cardGroup.addChild(pokerCard);
			newCardList.push(pokerCard);
			this.pokerCards.push(pokerCard);
		}
		this.pokerCards.sort((a: PDKPokerCard, b: PDKPokerCard) => {
			return b.card - a.card;
		});
		let index = 0;
		for (let pokerCard of this.pokerCards) {
			index++;
			pokerCard.parent.setChildIndex(pokerCard, index);
		}
		this.sortPos();
		let animIndex: number = 0;
		for (let pokerCard of newCardList) {
			animIndex++;
			pokerCard.alpha = 0;
			CommonUtil.registerTimeOut(pokerCard.showAnim, this, 100 * animIndex);
		}
	}

	public showLeftCards(cards: Array<number>): void {
		this.showCards(cards);
	}

	public showCards(cards: Array<number>): void {
		// 先清除之前的
		this.clearAll();
		let cardIndex = 0;
		for (let i = 0; i < cards.length; i++) {
			let pokerCard: PDKPokerCard = new PDKPokerCard();
			pokerCard.cardIndex = ++cardIndex;
			pokerCard.showCard(cards[i]);

			this.cardGroup.addChild(pokerCard);
			this.pokerCards.push(pokerCard)
		}

		this.sortPos();
	}

	public getSelectCards(): Array<number> {
		let cards: Array<number> = new Array<number>();
		for (let i = 0; i < this.pokerCards.length; i++) {
			if (this.pokerCards[i].isSelect) {
				cards.push(this.pokerCards[i].cardNumber);
			}
		}
		return cards;
	}

	public removeCards(cards: Array<number>) {
		function contains(card: number): boolean {
			for (let i = 0; i < cards.length; i++) {
				if (cards[i] == card) {
					return true;
				}
			}
			return false;
		}
		for (let i = 0; i < this.pokerCards.length; i++) {
			if (contains(this.pokerCards[i].cardNumber)) {
				if (this.pokerCards[i].parent != null) this.pokerCards[i].parent.removeChild(this.pokerCards[i]);
				this.pokerCards.splice(i, 1);
				i--;
			}
		}
		this.sortPos();

		return cards;
	}

	public sortPos(): void {
		this.cardGroup.x = 0;
		this.cardGroup.width = this.width;
		if (this.cardSortDir == game.ddz.CardSort.LEFT) {
			for (let i = 0; i < this.pokerCards.length; i++) {
				this.pokerCards[i].left = i * 55;
			}
		} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
			let offset = this.pokerCards.length * 55 / 2;
			for (let i = (this.pokerCards.length - 1); i >= 0; i--) {
				this.pokerCards[i].right = ((this.pokerCards.length - i) * 55) - offset;
			}
		} else {
			let offset = (this.cardGroup.width - this.pokerCards.length * 55) / 2;
			if (this.isMain) {
				for (let i = 0; i < this.pokerCards.length; i++) {
					this.pokerCards[i].left = i * 55 + offset;
				}
			} else {
				for (let i = 0; i < this.pokerCards.length; i++) {
					if (i >= 13) {
						this.pokerCards[i].left = (i - 13) * 55 + offset;
						this.pokerCards[i].y = 60;
					} else {
						this.pokerCards[i].left = i * 55 + offset;
					}
				}
			}
		}
	}


	public autoChoose(cards: number[]): void {
		for (let pk of this.pokerCards) {
			/*
			if (cards.length == 0) break;
			let pokerCard: PDKPokerCard = pk;
			let card: number = pokerCard.card;
			if (cards.indexOf(card) >= 0) {
				pokerCard.toggleSelect();
				cards.splice(cards.indexOf(card), 1);
			}*/
			egret.log(cards.join(",") + "   " + pk.cardNumber)
			if (cards.indexOf(pk.cardNumber) >= 0) {
				pk.select();
			} else {
				pk.cancelSelect();
			}
		}
	}
	public getCardByIndex(index:number) {
		return this.pokerCards[index];
	}

	private recordPosArr:Array<number> ;
	public explodeAgain() {
		this.recordPosArr = [];
		let centeIndex = Math.floor((this.pokerCards.length - 1) / 2);
		let centerCard = this.pokerCards[centeIndex];
		for(let i=0;i<this.pokerCards.length;i++) {
			let card = this.pokerCards[i];
			this.recordPosArr[i] = card.left;
			if(i != centeIndex) {
				if(i == this.pokerCards.length - 1) {
					egret.Tween.get(card).to({left:centerCard.left}, 300).call(()=>{
						this.explode();
					}, this);
				} else {
					egret.Tween.get(card).to({left:centerCard.left}, 300);
				}
			}
		}
	}

	private explode() {
		try {
			for(let i=0;i<this.pokerCards.length;i++) {
				egret.Tween.removeTweens(this.pokerCards[i])
				egret.Tween.get(this.pokerCards[i]).to({left:this.recordPosArr[i]}, 600, egret.Ease.backOut)
			}
			for(let i=0;i<this.trueCards.length;i++) {
				this.pokerCards[i].showCard(this.trueCards[i]);
			}
		}catch(e) {

		}
	}

	
	public getCardByValue(card:number):PDKPokerCard {
		for(let pokerCard of this.pokerCards) {
			if(pokerCard.cardNumber == card) {
				return pokerCard;
			}
		}
	}

	private getPDKBattleUI():game.pdk.PDKBattleUI{
		return <game.pdk.PDKBattleUI>this.parent.parent;
	}

	public flyCard(targetTable:PDKTableCards, cards:Array<number>) {
		let recordCards = cards;
		let tablecard = game.pdk.PDKBattleData.getInstance().tableCard;
		for(let card of cards) {
			let targetCard = this.getCardByValue(card);
			if(targetCard) {
				egret.Tween.get(targetCard).to({y : -90,alpha:0.6},400).call(()=>{
				}, this)
			}
		}
		this.getPDKBattleUI().setTimeOut(()=>{
			this.removeCards(tablecard.cards);
			targetTable.showPlayCardsWithEffect(tablecard);
		}, 200);
		this.getPDKBattleUI().setTimeOut(()=>{
			this.removeCards(recordCards);
		}, 400);
	}

	public cancelAllForbidden() {
		for(let pokerCard of this.pokerCards) {
			pokerCard.forbidden = false;
		}
	}

	public setForbbiden(forbiddenList:Array<number>) {
		for(let pokerCard of this.pokerCards) {
			pokerCard.forbidden = forbiddenList.indexOf(pokerCard.cardNumber) >= 0;
		}
	}

	public getForbbidenCards():Array<number>{
		let r = [];
		for(let pokerCard of this.pokerCards) {
			if(pokerCard.forbidden) {
				r.push(pokerCard.cardNumber);
			}
		}
		return r;
	}
}