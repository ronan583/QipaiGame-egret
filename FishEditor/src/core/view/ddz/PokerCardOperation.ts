class PokerCardOperation extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	public cardSortDir: game.ddz.CardSort = game.ddz.CardSort.CENTER;

	public cardTypeAnim: eui.Image;

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

	private startMovePoker:DDZPokerCard = null;

	private onTouchBegin(e: egret.TouchEvent): void {
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.moveDir = 0;
		let p: egret.Point = this.cardGroup.globalToLocal(e.stageX, e.stageY);
		let pokerCard: DDZPokerCard = this.getDDZPokerCard(p.x, p.y);
		if (pokerCard != null) {
			this.togglePreSelect(pokerCard);
			this.startMovePoker = pokerCard;
			this.addTouchBehaviorListener();
			game.ddz.DDZBattleData.getInstance().clearLastTip();
		}
	}

	private moveDir = 0;

	private onTouchMove(e: egret.TouchEvent): void {
		let p: egret.Point = this.cardGroup.globalToLocal(e.stageX, e.stageY);
		let pokerCard: DDZPokerCard = this.getDDZPokerCard(p.x, p.y);
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
			game.ddz.DDZBattleData.getInstance().clearLastTip();
		}
	}

	private isSameIn(arr:Array<DDZPokerCard>, arr1:Array<DDZPokerCard>):boolean{
		let result = true;
		for(let p of arr) {
			if(arr1.indexOf(p) < 0) {
				result = false;
				break;
			}
		}
		return result;
	}

	private isAllDiff(arr:Array<DDZPokerCard>, arr1:Array<DDZPokerCard>):boolean{
		let isalldif = true;
		for(let p of arr) {
			if(arr1.indexOf(p) >= 0) {
				isalldif = false;
				break;
			}
		}
		for(let p of arr1) {
			if(arr.indexOf(p) >= 0) {
				isalldif = false;
				break;
			}
		}
		return isalldif;
	}

	private lastExecCard:game.DDZExecCards;

	private onTouchEnd(e: egret.TouchEvent): void {
		this.lastOperDDZPokerCard = null;
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
		if(game.DDZRule.IsDDZDebug) {
			// this.onTableSelect(preSelectArr, selectArr, game.DDZRule.DEBUG_TABLE_CARDS);
			this.onNoTableSelect(preSelectArr, selectArr);
		} else {
			let tableCard = game.ddz.DDZBattleData.getInstance().tableCard;
			if(tableCard && tableCard.playerId != UserService.instance.playerId) {
				this.onTableSelect(preSelectArr, selectArr, tableCard);
			} else {
				this.onNoTableSelect(preSelectArr, selectArr);
			}
		}
	}

	private genCardArrFromPokerList(arr:Array<DDZPokerCard>):Array<number>{
		let cards:Array<number> = [];
		for(let c of arr) {
			cards.push(c.cardNumber);
		}
		return cards
	}

	private onTableSelect(preSelectArr:Array<DDZPokerCard>, selectArr:Array<DDZPokerCard>, tableCard:game.ddz.TableCard) {
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

	private onNoTableSelect(preSelectArr:Array<DDZPokerCard>, selectArr:Array<DDZPokerCard>) {
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
			let searchCount = Math.floor(selectCardExec.cardList.length / 3);
			for(let c of cards) {
				if(selectCards.indexOf(c) < 0) {
					leftCards.push(c);
				}
			}
			// 在leftcards里面找数量为searchCount的对子 或者 单张 如果都没有 gg
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

	private togglePreSelect(pokerCard: DDZPokerCard) {
		if (pokerCard == this.lastOperDDZPokerCard) {
			return;
		} else {
			this.lastOperDDZPokerCard = pokerCard;
			this.lastOperDDZPokerCard.togglePreSelect();
		}
	}

	private lastOperDDZPokerCard: DDZPokerCard = null;
	private toggleSelect(pokerCard: DDZPokerCard): void {
		if (pokerCard == this.lastOperDDZPokerCard) {
			return;
		} else {
			this.lastOperDDZPokerCard = pokerCard;
			this.lastOperDDZPokerCard.toggleSelect();
		}
	}

	public cardGroup: eui.Group;
	private pokerCards: Array<DDZPokerCard> = new Array<DDZPokerCard>();
	private isMain: boolean = false;
	private curTouchId :number = 0;
	public clearAll(): void {
		this.cardGroup.removeChildren();
		this.pokerCards = new Array<DDZPokerCard>();
	}

	public clearAllChoose(): void {
		for (let poker of this.pokerCards) {
			if (poker.isSelect) poker.toggleSelect();
		}
	}

	public getDDZPokerCard(x: number, y: number): DDZPokerCard {
		for (let i = this.pokerCards.length - 1; i >= 0; i--) {
			if (i == this.pokerCards.length - 1) {
				// 最外面一张牌
				if (x >= this.pokerCards[i].x && x <= this.pokerCards[i].x + this.pokerCards[i].width
					&& y >= this.pokerCards[i].y && y <= this.pokerCards[i].y + this.pokerCards[i].height) {
					return this.pokerCards[i];
				}
			} else {
				if (x >= this.pokerCards[i].x && x <= this.pokerCards[i].x + 90
					&& y >= this.pokerCards[i].y && y <= this.pokerCards[i].y + this.pokerCards[i].height) {
					return this.pokerCards[i];
				}
			}
		}

		return null;
	}
	public getCardByIndex(index:number) {
		return this.pokerCards[index];
	}

	private trueCards:Array<number> ;
	public showMainCards(cards: Array<number>, isStart:boolean = false): void {
		this.isMain = true;
		if(isStart) {
			// 先生成数据牌 默认隐藏
			// 需要先乱序
			this.trueCards = cards;
			let disorderArr = CommonUtil.disorder(cards);
			this.showCards(disorderArr);
			for(let card of this.pokerCards) {
				card.visible = false;
			}
			this.validateNow();
		} else {
			this.showCards(cards);
			if (game.ddz.DDZBattleData.getInstance().landlordId == game.UserService.instance.playerId) {
				this.pokerCards[this.pokerCards.length - 1].showLandlord();
			}
		}
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
		for(let i=0;i<this.pokerCards.length;i++) {
			egret.Tween.removeTweens(this.pokerCards[i])
			egret.Tween.get(this.pokerCards[i]).to({left:this.recordPosArr[i]}, 600, egret.Ease.backOut)
		}
		for(let i=0;i<this.trueCards.length;i++) {
			this.pokerCards[i].showCard(this.trueCards[i]);
		}
	}

	public showCardsWithAdd(cards: Array<number>): void {
		cards = cards.sort((a: number, b: number) => {
			return b - a;
		})
		// 先总体瞬间移到左边3位
		for(let j=0;j<this.pokerCards.length;j++) {
			this.pokerCards[j].left -= 55 * 3 / 2;
		}
		this.validateNow();
		let offset = (this.cardGroup.width - (this.pokerCards.length - 1) * 55 - this.pokerCards[0].width) / 2;
		offset -= 55 * 3 / 2
		// 显示新增卡牌并设置动画
		let cardIndex = cards.length;
		let newCardList: Array<DDZPokerCard> = new Array<DDZPokerCard>();
		for (let i = 0; i < cards.length; i++) {
			let pokerCard: DDZPokerCard = new DDZPokerCard();
			pokerCard.cardIndex = ++cardIndex;
			pokerCard.showCard(cards[i]);
			this.cardGroup.addChild(pokerCard);
			let find = false;
			for(let j=this.pokerCards.length - 1; j >= 0; j--) {
				if(this.pokerCards[j].cardNumber < pokerCard.cardNumber) {
					// 右移
					this.pokerCards[j].moveRightCount++;
				} else {
					pokerCard.left = (j + 1) * 55 + offset
					pokerCard.parent.setChildIndex(pokerCard, j);
					this.pokerCards.splice(j + 1,0,pokerCard);
					find = true;
					break;
				}
			}
			if(!find) {
				// 放到首位
				pokerCard.left = offset
				this.pokerCards.splice(0, 0, pokerCard);
			}
			newCardList.push(pokerCard);
		}
		for(let card of newCardList) {
			card.y = -40;
		}
		for(let j=0;j<this.pokerCards.length;j++) {
			this.cardGroup.setChildIndex(this.pokerCards[j], j);
			let card = this.pokerCards[j];
			let targetLeft = card.left + 55 * card.moveRightCount;
			egret.Tween.get(card).to({left:targetLeft}, 200);
		}
		CommonUtil.registerTimeOut(()=>{
			// 新加的要有动画
			for(let card of newCardList) {
				egret.Tween.get(card).to({y:0}, 500);
			}
		}, this, 200);
		this.pokerCards.sort((a: DDZPokerCard, b: DDZPokerCard) => {
			return b.card - a.card;
		});
		CommonUtil.registerTimeOut(()=>{
			// 显示角标
			this.pokerCards[this.pokerCards.length - 1].showLandlord();
		}, this, 700);
	}

	public showCards(cards: Array<number>): void {
		// 先清除之前的
		this.clearAll();
		console.log('showCards ===================== ', cards);
		let cardIndex = 0;
		for (let i = 0; i < cards.length; i++) {
			let pokerCard: DDZPokerCard = new DDZPokerCard();
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

	public getPreSelectCards():Array<DDZPokerCard> {
		let result:Array<DDZPokerCard> = [];
		for(let card of this.pokerCards) {
			if(card.preSelect) {
				result.push(card);
			}
		}
		return result;
	}

	public getSelectPokerCards(): Array<DDZPokerCard> {
		let cards: Array<DDZPokerCard> = new Array<DDZPokerCard>();
		for (let pokerCard of this.pokerCards) {
			if (pokerCard.isSelect) {
				cards.push(pokerCard);
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
				if (i >= 10) {
					this.pokerCards[i].left = (i - 10) * 55;
					this.pokerCards[i].y = 60;
				} else {
					this.pokerCards[i].left = i * 55;
				}
			}
		} else if (this.cardSortDir == game.ddz.CardSort.RIGHT) {
			let length = this.pokerCards.length > 10 ? 10 : this.pokerCards.length;
			for (let i = (this.pokerCards.length - 1); i >= 0; i--) {
				if (i >= 10) {
					this.pokerCards[i].y = 60;
					this.pokerCards[i].right = (16 - i) * 55 + 165;
				} else {
					this.pokerCards[i].right = (length - i) * 55 - 55;
				}
			}
		} else {
			if (this.isMain) {
				if(this.pokerCards.length > 0) {
					let offset = (this.cardGroup.width - (this.pokerCards.length -1) * 55 - this.pokerCards[0].width) / 2;
					for (let i = 0; i < this.pokerCards.length; i++) {
						this.pokerCards[i].left = i * 55 + offset;
					}
					for(let j=0;j<this.pokerCards.length;j++) {
						this.cardGroup.setChildIndex(this.pokerCards[j], j);
					}
				}
			} else {
				let offset = (this.cardGroup.width - this.pokerCards.length * 55) / 2;
				for (let i = 0; i < this.pokerCards.length; i++) {
					this.pokerCards[i].left = i * 55 + offset;
				}
			}
		}
		if (this.isMain && game.ddz.DDZBattleData.getInstance().landlordId == game.UserService.instance.playerId) {
			if (this.pokerCards.length > 0) this.pokerCards[this.pokerCards.length - 1].showLandlord();
		}
	}

	public autoChoose(cards: number[]): void {
		for (let pk of this.pokerCards) {
			/*
			if (cards.length == 0) break;
			let pokerCard: DDZPokerCard = pk;
			let card: number = pokerCard.card;
			if (cards.indexOf(card) >= 0) {
				pokerCard.toggleSelect();
				cards.splice(cards.indexOf(card), 1);
			}*/
			if (cards.indexOf(pk.cardNumber) >= 0) {
				pk.toggleSelect();
			}
		}
	}

	public getCardByValue(card:number):DDZPokerCard {
		for(let pokerCard of this.pokerCards) {
			if(pokerCard.cardNumber == card) {
				return pokerCard;
			}
		}
	}

	private getDDZBattleUI():game.ddz.DDZBattleUI{
		return <game.ddz.DDZBattleUI>this.parent.parent;
	}

	public flyCard(targetTable:DDZTableCards, cards:Array<number>) {
		let tableCard = game.ddz.DDZBattleData.getInstance().tableCard;
		for(let card of cards) {
			let targetCard = this.getCardByValue(card);
			if(targetCard) {
				egret.Tween.get(targetCard).to({y : -90,alpha:0.6},200).call(()=>{
				}, this)
			}
		}
		this.getDDZBattleUI().setTimeOut(()=>{
			this.removeCards(tableCard.cards);
		}, 200);
		this.getDDZBattleUI().setTimeOut(()=>{
			let tablecard = game.ddz.DDZBattleData.getInstance().tableCard;
			this.removeCards(tablecard.cards);
			targetTable.showPlayCardsWithEffect(tablecard);
		}, 150);
	}

}
