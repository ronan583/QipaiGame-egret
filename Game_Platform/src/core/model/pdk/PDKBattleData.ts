module game.pdk {
	export enum PDKStatus {
		PREPARE,
		FIGHT
	}

	export enum PDKPlayerStatus {
		PREPARE = 0,
		JIAOFEN = 1,
		JIAOFEN_COMPLETE = 2,
		JIABEI = 3,
		JIABEI_COMPLETE = 4,
		FIGHT = 5,
		FIGHT_COMPLETE = 6
	}

	export enum PDKRefreshFightReason {
		NONE,
		CHANGE_TRUSTEESHIP_STATE
	}

	export enum KingType {
		NONE,
		SMALL,
		BIG
	}

	export enum CardSort {
		CENTER,
		LEFT,
		RIGHT
	}

	export enum CardType {
		ERROR, // 错误
		SINGLE, // 单个
		DUAD, // 一对
		MANY_DUAD, // 连对
		THREE, // 3个
		THREE_TO_ONE, // 3带1
		THREE_TO_TWO, // 3带2(对)
		SHUN_ZI, // 顺子
		PLANE, // 飞机
		FOUR_TO_ONE, // 四带3
		FOUR_TO_TWO, // 四带3
		FOUR_TO_THREE, // 四带3
		BOMB, // 炸弹
	}

	export class BattlePlayerInfo {
		public playerId: number = 0; //玩家id
		public money: number = 0; //当局金币情况
		public totalMoney: number = 0; //最终的总金币
		public isTrusteeship: boolean = false;//是否托管
		public handCards: Array<number>;//手牌
		public isSpring: boolean = false;
		public isBaoPei: boolean = false;

		public setData(data: any): void {
			this.playerId = Number(data.playerId);
			this.money = data.money / 1000;
			this.totalMoney = data.totalMoney / 1000;
			this.isTrusteeship = data.isTrusteeship;
			this.handCards = data.handCard;
			this.isSpring = data.isSpring;
			this.isBaoPei = data.isBaoPei;
		}
	}

	export class DdzMultipleDetail {
		public isLandlord: boolean = false;//是否为地主
		public rob: number = 0;//抢地主倍数
		public bomb: number = 0;//炸弹倍数
		public spring: number = 0;//春天倍数
		public total: number = 0;//总倍倍数
		public common: number = 0;//共用倍数
		public jiabei: number = 0;//加倍倍数
	}

	export class BattleFinishInfo {
		public playerInfos: Array<BattlePlayerInfo>;
		public coutdownTime: number;
		public countdownEndTime: number;
		public isWin: boolean;//地主赢 true  false农民赢
		public isSpring: boolean;

		public setData(data: any): void {
			this.coutdownTime = data.downTime;
			this.countdownEndTime = this.coutdownTime * 1000 + egret.getTimer();
			this.isWin = data.isWin;

			this.playerInfos = new Array<BattlePlayerInfo>();
			for (let playerData of data.battleFinish) {
				let battlePlayerInfo: BattlePlayerInfo = new BattlePlayerInfo();
				battlePlayerInfo.setData(playerData);
				this.playerInfos.push(battlePlayerInfo);
				if (battlePlayerInfo.isSpring) {
					this.isSpring = true;
				}
				let playerBattleData: PDKPlayerInfo = PDKBattleData.getInstance().getPlayer(battlePlayerInfo.playerId);
				if (playerBattleData) playerBattleData.money = battlePlayerInfo.totalMoney;
			}
			game.AppFacade.getInstance().sendNotification(PanelNotify.PDK_REFRESH_MONEY);
		}
	}

	export class PDKPlayerInfo {
		public playerId: number;
		public cardCount: number;
		public status: PDKPlayerStatus;
		public countdownTime: number;
		public isTrusteeship: boolean;
		private _money: number;
		public get money(): number {
			return this._money;
		}
		public set money(value: number) {
			this._money = value;
		}
	}

	export class CardHolder {
		public cardCountList: Array<any>;
		public setData(holderData: any): void {
			this.cardCountList = new Array<any>();
			for (let i = 0; i < holderData.length; i++) {
				this.cardCountList.push({ card: holderData[i].card, count: holderData[i].count });
			}
			this.cardCountList.sort((c1: any, c2: any) => {
				return c2.card - c1.card;
			});
		}
	}

	export class TableCard {
		public cards: Array<number> = new Array<number>();
		public cardType: number = 0;
		public playerId: number = 0;
		public cardValues: Array<number> = new Array<number>();
		public getFirstCard(): number {
			let map: { [keyof: number]: number; } = {};
			for (let cardValue of this.cardValues) {
				if (map[cardValue]) {
					map[cardValue] = map[cardValue] + 1;
				} else {
					map[cardValue] = 1;
				}
			}
			var card: any;
			var selectCard: any;
			var max: number = 0;
			var allEquals = true;
			for (card in map) {
				if (map[card] > max) {
					if (max != 0) allEquals = false;
					max = map[card];
					selectCard = card;

				} else if (map[card] == max) {
					if (card < selectCard) {
						selectCard = card;
					}
				} else {
					allEquals = false;
				}
			}
			if (allEquals) {
				this.cardValues.sort((a: number, b: number) => {
					return a - b;
				});
				selectCard = this.cardValues[0];
			}
			return selectCard;
		}
		public setCards(cards: any) {
			this.cards = new Array<number>();
			this.cardValues = new Array<number>();
			for (let i = 0; i < cards.length; i++) {
				this.cards.push(cards[i]);
				this.cardValues.push(Math.floor(this.cards[i] / 4));
			}
		}

		public contains(card) : boolean {
			for(let c of this.cards) {
				if(Math.floor(c / 4) == card) {
					return true;
				}
			}
			return false;
		}
	}

	export class PDKBattleData {
		private static _instance: PDKBattleData;
		public static getInstance(): PDKBattleData {
			if (PDKBattleData._instance == null) {
				PDKBattleData._instance = new PDKBattleData();
			}
			return PDKBattleData._instance;
		}
		public constructor() {
		}
		public battleStatus: PDKStatus = PDKStatus.PREPARE;
		public PDKPlayerInfos: Array<PDKPlayerInfo>;
		public selfHandCards: Array<number>;
		public bottomCards: Array<number>;
		
		public tableCard: TableCard;
		public cardHolder: CardHolder;
		public curSocre: number;
		public curPlayPlayerId: number;
		public minCard: number;
		public isSelfPlay: boolean;
		public finishData: BattleFinishInfo;
		public isInbattle:boolean = false;
		public handCardMap: HashMap;

		private _downtime:number = 0;
		private _setdowntime:number = 0;

		public get downTime(): number{
			return this._downtime;
		}

		public set downTime(time:number) {
			this._downtime = time;
			this._setdowntime = new Date().getTime();
		}

		public get clientSimulateDownTime() {
			egret.log("pass time : " + (new Date().getTime() - this._setdowntime) + "  " + this._downtime);
			return this._downtime - (new Date().getTime() - this._setdowntime) / 1000;
		}

		private hasTryToFind:boolean = false;

		public hasBattleStart(): boolean {
			return this.selfHandCards != undefined && this.selfHandCards != null;
		}

		public clearData(): void {
			this.handCardMap = new HashMap();
			this.cardHolder = new CardHolder();
			this.curSocre = 0;
			this.bottomCards = new Array<number>();
			this.selfHandCards = new Array<number>();
			this.curPlayPlayerId = 0;
			this.battleStatus = PDKStatus.PREPARE;
			this.isInbattle = false;
			this.tableCard = new TableCard();
			if (this.PDKPlayerInfos != null) {
				this.PDKPlayerInfos = [];
				/*
				for(let playerInfo of this.PDKPlayerInfos) {
					playerInfo.status = PDKPlayerStatus.PREPARE;
				}
				*/
			}
			this.clearLastTip();
		}

		public setData(data: any): void {

		}

		public init(): void {
			this.PDKPlayerInfos = new Array<PDKPlayerInfo>();
		}

		/**
		 * 设置开始游戏的数据,为了预防手牌出现莫名其妙的变化，判断之前的手牌与新的是否一致 一致的化就不做重新发牌处理
		 */
		public setBattleStart(data: any): boolean {
			let oriHandCards = this.selfHandCards;
			this.battleStatus = PDKStatus.FIGHT;
			this.selfHandCards = new Array<number>();
			this.curPlayPlayerId = Number(data.currentPlayerId);
			var originPlayerInfos = this.PDKPlayerInfos;
			this.PDKPlayerInfos = new Array<PDKPlayerInfo>();
			this.tableCard = new TableCard();
			this.minCard = data.minCard;
			this.isSelfPlay = data.isMyPlay;
			this.isInbattle = true;
			this.cardHolder = new CardHolder();
			this.cardHolder.setData(data.cardHolder);
			for (let i = 0; i < data.handCards.length; i++) {
				this.selfHandCards.push(data.handCards[i]);
			}
			let isDiff = true;
			if(oriHandCards && CommonUtil.isNumberArrayEquals(oriHandCards, this.selfHandCards)) {
				isDiff = false;
			}
			this.downTime = data.downTime;

			function getFromOrigin(playerId: number): PDKPlayerInfo {
				if (!originPlayerInfos) return;
				for (let pi of originPlayerInfos) {
					if (pi.playerId == playerId) return pi;
				}
			}

			for (let i = 0; i < data.battleInfo.length; i++) {
				let player: PDKPlayerInfo = new PDKPlayerInfo();
				player.playerId = Number(data.battleInfo[i].playerId);
				player.cardCount = data.battleInfo[i].cardCount;
				player.status = PDKPlayerStatus.FIGHT;
				let pi: PDKPlayerInfo = getFromOrigin(player.playerId);
				if (pi != null) {
					player.money = pi.money;
				}
				this.PDKPlayerInfos.push(player);
			}
			return isDiff;
		}

		public setBombScore(data: any): void {
			for (let scoreData of data.playerBomb) {
				let playerId: number = scoreData.playerId;
				if (this.getPlayer(playerId)) this.getPlayer(playerId).money = scoreData.totalMoney / 1000;
			}
		}

		public setReconnectData(data: any): void {
			this.selfHandCards = new Array<number>();
			for (let i = 0; i < data.handCards.length; i++) {
				this.selfHandCards.push(data.handCards[i]);
			}
			this.tableCard = new TableCard();
			this.tableCard.playerId = Number(data.currentPlayerId);
			this.tableCard.setCards(data.currentCards);
			this.tableCard.cardType = data.cardType;
			this.bottomCards = new Array<number>();
			this.downTime = data.downTime;
			this.curPlayPlayerId = Number(data.nextPlayerId);
			this.isSelfPlay = data.isMyPlay || Number(data.nextPlayerId) == game.UserService.instance.playerId;
			this.PDKPlayerInfos = new Array<PDKPlayerInfo>();
			this.battleStatus = PDKStatus.FIGHT;
			this.isInbattle = true;
			for (let i = 0; i < data.battleInfo.length; i++) {
				let ddzPlayer: PDKPlayerInfo = new PDKPlayerInfo();
				ddzPlayer.playerId = Number(data.battleInfo[i].playerId);
				ddzPlayer.cardCount = data.battleInfo[i].cardCount;
				ddzPlayer.status = PDKPlayerStatus.FIGHT;
				if (ddzPlayer.playerId == UserService.instance.playerId) {
					ddzPlayer.isTrusteeship = data.isTrusteeship;
				}
				ddzPlayer.isTrusteeship = false;
				this.PDKPlayerInfos.push(ddzPlayer);
			}

			this.cardHolder = new CardHolder();
			this.cardHolder.setData(data.cardHolder);
		}

		public getJiaofenPlayer(): PDKPlayerInfo {
			for (let i = 0; i < this.PDKPlayerInfos.length; i++) {
				if (this.PDKPlayerInfos[i].status == PDKPlayerStatus.JIAOFEN) {
					return this.PDKPlayerInfos[i];
				}
			}
			return null;
		}

		public getPlayer(playerId: number): PDKPlayerInfo {
			if (this.PDKPlayerInfos == null) return null;
			for (let i = 0; i < this.PDKPlayerInfos.length; i++) {
				if (this.PDKPlayerInfos[i].playerId == playerId) {
					return this.PDKPlayerInfos[i];
				}
			}
			return null;
		}

		public setPlayStepData(data: any): void {
			if (data.cards.length == 0) {
				// 这个人不要
				AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TIPS_ON_DONOT, data.currentPlayerId);
				game.pdk.PDKSoundPlayer.instance.playVoice(data.currentPlayerId, game.pdk.PDKVoiceType.PASS, 0);
			} else {
				this.tableCard = new TableCard();
				this.tableCard.setCards(data.cards);
				this.tableCard.cardType = data.cardType;
				this.tableCard.playerId = Number(data.currentPlayerId);
				game.pdk.PDKSoundPlayer.instance.playVoice(data.currentPlayerId, game.pdk.PDKVoiceType.PLAY_CARD, [data.cardType, Math.floor(data.cards[0] / 4)]);
			}
			let playerInfo: PDKPlayerInfo = this.getPlayer(Number(data.currentPlayerId));
			if (playerInfo) {
				playerInfo.cardCount -= data.cards.length;
				playerInfo.countdownTime = data.downTime;
			}
			this.downTime = data.downTime;
			if (data.currentPlayerId == UserService.instance.playerId) {
				for (let i = 0; i < data.cards.length; i++) {
					let index = this.selfHandCards.indexOf(data.cards[i]);
					if (index >= 0) {
						this.selfHandCards.splice(index, 1);
					}
				}
			}

			this.curPlayPlayerId = Number(data.nextPlayerId);
			// 做一次修整 如果剩余牌数为0 说明已经出完牌了  不需要别人再出牌了
			if(playerInfo && playerInfo.cardCount <= 0) {
				this.curPlayPlayerId = 0;
			}

			if (playerInfo && data.isTrusteeship != playerInfo.isTrusteeship) {
				playerInfo.isTrusteeship = data.isTrusteeship;
				console.log("托管状态变化 ： " + playerInfo.playerId + "  " + playerInfo.isTrusteeship);
				// 托管状态发生改变
				AppFacade.getInstance().sendNotification(PanelNotify.CHANGE_TRUSTEESHIP_STATE, playerInfo.playerId);
			}

			this.cardHolder = new CardHolder();
			this.cardHolder.setData(data.cardHolder);
			this.lastTipCards = [];
			this.isSelfPlay = data.isMyPlay;
		}

		public setFinishData(data: any): void {
			this.finishData = new BattleFinishInfo();
			this.finishData.setData(data);
			this.isInbattle = false;
		}

		public group(): void {
			if (this.selfHandCards.length == 0) return;
			this.handCardMap = new HashMap();
			var cardMap = new HashMap();
			for (let i = 0; i < this.selfHandCards.length; i++) {
				var card: number = Math.floor(this.selfHandCards[i] / 4);
				if (cardMap.contains(card)) {
					cardMap.put(card, cardMap.get(card) + 1);
				} else {
					cardMap.put(card, 1);
				}
			}
			for (let key of cardMap.sortIntKeys()) {
				let value: number = cardMap.get(key);
				let cards: number[] = [];
				if (this.handCardMap.contains(value)) {
					cards = this.handCardMap.get(value);
				} else {
					this.handCardMap.put(value, cards);
				}
				cards.push(key);
			}
		}

		private getAvaliableCard(limitCard: number, findGroup: number[], exceptCard: number[]): number {
			let selectCard: number = 0;
			for (let k of findGroup) {
				let cards: number[] = this.handCardMap.get(k);
				if (cards == undefined || cards == null || cards.length == 0) continue;
				for (let c of cards) {
					if (c > limitCard && exceptCard.indexOf(c) < 0) {
						selectCard = c;
						break;
					}
				}
				if (selectCard > 0) break;
			}

			return selectCard;
		}

		private getFromHandCards(excludeCards: Array<number>, needCount: number): Array<number> {
			let cardRes: Array<number> = [];
			for (let i = this.selfHandCards.length - 1; i >= 0; i--) {
				let card = this.selfHandCards[i];
				let cardNum: number = Math.floor(card / 4);
				if (excludeCards.indexOf(cardNum) < 0) {
					cardRes.push(cardNum);
					if (cardRes.length >= needCount) break;
				}
			}
			cardRes.sort((a: number, b: number) => { return a - b; });
			return cardRes;
		}

		private getAvaliableCards(limitCard: number, findGroup: number[], exceptCards: number[]): number[] {
			let selectCards: number[] = [];
			for (let k of findGroup) {
				let cards: number[] = this.handCardMap.get(k);
				if (cards == undefined || cards == null || cards.length == 0) continue;
				for (let c of cards) {
					if (c > limitCard && exceptCards.indexOf(c) < 0) {
						selectCards.push(c);
					}
				}
			}
			selectCards.sort((a: number, b: number) => { return a - b; });
			return selectCards;
		}

		private _lastTipCards: number[];
		public get lastTipCards(): number[] {
			return this._lastTipCards;
		}

		public set lastTipCards(value: number[]) {
			this._lastTipCards = value;
			console.log("lastTipCards set : " + (value == null ? "null" : value.length))
		}


		public checkDefaultCard() {
			var chooseCards: number[] = new Array<number>();
			let cards: number[] = this.getAvaliableCards(0, [1], []);
			cards.sort((a: number, b: number) => { return a - b; });
			if (cards.length > 0) chooseCards.push(cards[0]);
			if (cards.length == 0) {
				let cards: number[] = this.getAvaliableCards(0, [2], []);
				cards.sort((a: number, b: number) => { return a - b; });
				if (cards.length > 0) chooseCards.push(cards[0], cards[0]);
			}
			this.lastTipCards = [];
			for (let card of chooseCards) {
				this.lastTipCards.push(card);
			}
			console.log("checkDefaultCard set : " + this.lastTipCards[0])
			return chooseCards;
		}

		private defaultSelectArr:Array<CardResultItem>;
		private defaultSegment:CardSegment;
		private leftCards:Array<number>;

		public checkDefaultCard2() {
			let chooseCards:Array<number> = [];
			if(this.defaultSelectArr) {
				if(this.defaultSelectArr.length > 0) {
					// 之前查找出来的结果
					let selectCards:Array<number> = [];
					for(let c of this.defaultSelectArr[0].cardList) {
						selectCards.push(c);
					}
					if(this.defaultSelectArr[0].cardRoot == CardRoot.THREE){
						selectCards = selectCards.concat(this.autoAddWithCards(2));
					}else if(this.defaultSelectArr[0].cardRoot == CardRoot.PLANE) {
						let count = 2 * Math.floor(this.defaultSelectArr[0].cardList.length / 3);
						selectCards = selectCards.concat(this.autoAddWithCards(count));
					}
					chooseCards = selectCards;
					this.defaultSelectArr.splice(0,1);
					return chooseCards;
				} else {
					chooseCards = this.defaultSegment.cardList;
					if(this.defaultSegment.nextSegment) {
						this.defaultSegment = this.defaultSegment.nextSegment;
					}  else {
						this.defaultSegment = PDKIntelligent.getSegmentBegin(this.defaultSegment);
					}
				}
			} else {
				let cloneHandCards = CommonUtil.copyNumberArray(this.selfHandCards);
				let avaliableCards = PDKRule.excludeBoomCards(cloneHandCards);
				this.defaultSelectArr = PDKIntelligent.getMaxCardResult(avaliableCards);
				this.defaultSelectArr.sort((a:CardResultItem, b:CardResultItem):number=>{
					return b.cardList.length - a.cardList.length;
				})
				let preselectcards = [];
				this.leftCards = [];
				for(let item of this.defaultSelectArr) {
					for(let c of item.cardList) {
						preselectcards.push(c);
					}
				}
				this.leftCards = CommonUtil.subArr(avaliableCards, preselectcards);
				this.defaultSegment = PDKIntelligent.genCardSegment2(cloneHandCards);
				if(this.defaultSelectArr.length > 0) {
					let selectCards:Array<number> = [];
					for(let c of this.defaultSelectArr[0].cardList) {
						selectCards.push(c);
					}
					if(this.defaultSelectArr[0].cardRoot == CardRoot.THREE){
						selectCards = selectCards.concat(this.autoAddWithCards(2));
					}else if(this.defaultSelectArr[0].cardRoot == CardRoot.PLANE) {
						let count = 2 * Math.floor(this.defaultSelectArr[0].cardList.length / 3);
						selectCards = selectCards.concat(this.autoAddWithCards(count));
					}
					chooseCards = selectCards;
					this.defaultSelectArr.splice(0,1);
					return chooseCards;
				} else {
					chooseCards = this.defaultSegment.cardList;
					if(this.defaultSegment.nextSegment) {
						this.defaultSegment = this.defaultSegment.nextSegment;
					}  else {
						this.defaultSegment = PDKIntelligent.getSegmentBegin(this.defaultSegment);
					}
				}
			}

			return chooseCards;
		}

		private autoAddWithCards(count:number):Array<number>{
			let map = game.PokerCardMap.convertFromCards(this.leftCards);
			let r = map.getCardsBySize(1, count);
			if(r.length < 2) {
				// 纯单张不够放开找
				let nextFindCards = CommonUtil.copyNumberArray(this.leftCards);
				map = game.PokerCardMap.convertFromCards(CommonUtil.subArr(nextFindCards, r));
				r.concat(map.getSingle(count - r.length));
			}
			return r;
		}

		public checkCard(isRecord: boolean = true): number[] {
			var chooseCards: number[] = new Array<number>();
			var cloneHandCards: number[] = new Array<number>();
			for (let i of this.selfHandCards) {
				cloneHandCards.push(i);
			}
			var cardResult: CardCheckResult = PDKPokerUtil.checkType(this.tableCard.cards);
			if (this.lastTipCards != null && this.lastTipCards.length > 0) {
				cardResult = PDKPokerUtil.checkTruelyType(this.lastTipCards);
			}

			if (cardResult.cardType == CardType.SINGLE) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [1, 2, 3, 4], []);
				cards.sort((a: number, b: number) => { return a - b; });
				if (cards.length > 0) chooseCards.push(cards[0]);
			}
			if (cardResult.cardType == CardType.DUAD) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [2, 3, 4], [0]);
				cards.sort((a: number, b: number) => { return a - b; });
				if (cards.length > 0) chooseCards.push(cards[0], cards[0]);
			}
			if (cardResult.cardType == CardType.MANY_DUAD) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [2, 3, 4], []);
				let continueIndex = 0;
				let last = 0;
				let selectCard = 0;
				let targetCount = Math.floor(this.tableCard.cards.length / 2);
				for (let i = 0; i < cards.length; i++) {
					if (cards[i] <= cardResult.card) continue;
					if (last == 0) {
						last = cards[i];
					} else {
						if (cards[i] == (last + 1)) {
							continueIndex++;
							if (continueIndex == (targetCount - 1)) {
								selectCard = cards[i - (targetCount - 1)];
								break;
							}
							last = cards[i];
						} else {
							last = cards[i];
							continueIndex = 0;
						}
					}
				}
				if (selectCard > 0) {
					for (let i = 0; i < targetCount; i++) {
						chooseCards.push(selectCard + i, selectCard + i);
					}
				}
			}

			if (cardResult.cardType == CardType.PLANE) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [3, 4], []);
				let continueIndex = 0;
				let last = 0;
				let selectCard = 0;
				let targetCount = Math.floor(this.tableCard.cards.length / 3);
				let wingsCount: number = 0;
				if (this.tableCard.cards.length == 10) {
					// 是飞机带翅膀
					targetCount = 2;
					wingsCount = this.tableCard.cards.length - targetCount * 3;
				}

				if (this.tableCard.cards.length == 15) {
					targetCount = 3;
					wingsCount = this.tableCard.cards.length - targetCount * 3;
				}

				for (let i = 0; i < cards.length; i++) {
					if (cards[i] <= cardResult.card) continue;
					if (last == 0) {
						last = cards[i];
					} else {
						if (cards[i] == (last + 1)) {
							continueIndex++;
							last++;
							if (continueIndex == (targetCount - 1)) {
								selectCard = cards[i - (targetCount - 1)];
								break;
							}
							last = cards[i];
						} else {
							last = cards[i];
							continueIndex = 0;
						}
					}
				}
				if (selectCard > 0) {
					let excludeCards: Array<number> = [];
					for (let i = 0; i < targetCount; i++) {
						excludeCards.push(selectCard + i);
						chooseCards.push(selectCard + i, selectCard + i, selectCard + i);
					}
					if (wingsCount > 0) {
						let cc: Array<number> = this.getFromHandCards(excludeCards, wingsCount);
						for (let c of cc) {
							chooseCards.push(c);
						}
					}
				}
			}

			if (cardResult.cardType == CardType.SHUN_ZI) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [1, 2, 3, 4], [16, 17]);
				let continueIndex = 0;
				let last = 0;
				let selectCard = 0;
				let targetCount = this.tableCard.cards.length;
				for (let i = 0; i < cards.length; i++) {
					if (cards[i] <= cardResult.card) continue;
					if (last == 0) {
						last = cards[i];
					} else {
						if (cards[i] == (last + 1)) {
							continueIndex++;
							if (continueIndex == (targetCount - 1)) {
								selectCard = cards[i - (targetCount - 1)];
								break;
							}
							last = cards[i];
						} else {
							last = cards[i];
							continueIndex = 0;
						}
					}
				}
				if (selectCard > 0) {
					for (let i = 0; i < targetCount; i++) {
						chooseCards.push(selectCard + i);
					}
				}

				if (chooseCards.length > 0 && chooseCards[chooseCards.length - 1] == 15) {
					chooseCards = [];
				}
			}

			if (cardResult.cardType == CardType.THREE) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [3, 4], []);
				cards.sort((a: number, b: number) => { return a - b; });
				if (cards.length > 0) chooseCards.push(cards[0], cards[0], cards[0]);
			}

			if (cardResult.cardType == CardType.THREE_TO_ONE) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [3, 4], []);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let singleCard: number = this.getAvaliableCard(0, [1, 2, 3, 4], [selectCard]);
					if (singleCard > 0) {
						chooseCards.push(selectCard, selectCard, selectCard, singleCard);
					}
				}
			}

			if (cardResult.cardType == CardType.THREE_TO_TWO) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [3, 4], []);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let cc: Array<number> = this.getFromHandCards([selectCard], 2);
					if (cc.length == 2) {
						chooseCards.push(selectCard, selectCard, selectCard);
						for (let c of cc) {
							chooseCards.push(c);
						}
					} else {
						chooseCards = [];
					}
				}
			}

			if (cardResult.cardType == CardType.FOUR_TO_ONE) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [4], [0]);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let singleCard: number = this.getAvaliableCard(0, [1, 2, 3, 4], [selectCard]);
					if (singleCard > 0) {
						chooseCards.push(selectCard, selectCard, selectCard, selectCard, singleCard);
					}
				}
			}

			if (cardResult.cardType == CardType.FOUR_TO_TWO) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [4], [0]);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let cc: Array<number> = this.getFromHandCards([selectCard], 2);
					if (cc.length == 2) {
						chooseCards.push(selectCard, selectCard, selectCard, selectCard);
						for (let c of cc) {
							chooseCards.push(c);
						}
					} else {
						chooseCards = [];
					}
				}
			}

			if (cardResult.cardType == CardType.FOUR_TO_THREE) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [4], [0]);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let cc: Array<number> = this.getFromHandCards([selectCard], 3);
					if (cc.length == 3) {
						chooseCards.push(selectCard, selectCard, selectCard, selectCard);
						for (let c of cc) {
							chooseCards.push(c);
						}
					} else {
						chooseCards = [];
					}
				}
			}

			if (cardResult.cardType == CardType.BOMB) {
				let cards: number[] = this.handCardMap.get(this.tableCard.cards.length);
				if (cards != undefined && cards != null && cards.length > 0) {
					for (let i = 0; i < cards.length; i++) {
						let c = Math.floor(cards[i] / 4);
						if (cards[i] > cardResult.card) {
							chooseCards.push(cards[0], cards[0], cards[0], cards[0]);
							break;
						}
					}
				}
				if (chooseCards.length == 0) {
					if (this.handCardsContainsCard(16) && this.handCardsContainsCard(17)) {
						chooseCards.push(16, 17);
					}
				}
			} else {
				if (chooseCards.length == 0) {
					// 选炸
					let cards: number[] = this.handCardMap.get(4);
					if (cards != undefined && cards != null && cards.length > 0) {
						chooseCards.push(cards[0], cards[0], cards[0], cards[0]);
					}
				}
			}
			if (this.lastTipCards != null && this.lastTipCards.length > 0 && chooseCards.length == 0) {
				// 之前有 但是现在找不到大的牌了
				this.lastTipCards = null;
				return this.checkCard();
			}
			if (isRecord) {
				this.lastTipCards = new Array<number>();
				for (let card of chooseCards) {
					this.lastTipCards.push(card);
				}
			}
			return chooseCards;
		}

		public clearLastTip(): void {
			this.lastTipCards = new Array<number>();
			this.hasTryToFind = false;
			this.defaultSelectArr = null;
		}

		private handCardsContainsCard(card: number): boolean {
			for (let c of this.selfHandCards) {
				if (Math.floor(c / 4) == card) return true;
			}
			return false;
		}

		public checkCard2(isRecord:boolean = true): number[] {
			let cloneHandCards = CommonUtil.copyNumberArray(this.selfHandCards);
			// 去除forbidden的牌
			let mediator:PDKBattleMediator = <PDKBattleMediator>AppFacade.getInstance().retrieveMediator(PDKBattleMediator.NAME);
			if(mediator) {
				let battleUI = mediator.pdkBattleScene;
				if(battleUI) {
					cloneHandCards = CommonUtil.subArr(cloneHandCards, battleUI.cardOperation.getForbbidenCards());
				}
			}
			
			let tableCard:game.ddz.TableCard = this.tableCard;
			let cardResult: CardCheckResult = PDKPokerUtil.checkType(this.tableCard.cards);
			let cardLength = this.tableCard.cards.length;
			if (this.lastTipCards != null && this.lastTipCards.length > 0) {
				cardResult = PDKPokerUtil.checkType(this.lastTipCards);
				cardLength = this.lastTipCards.length;
				tableCard = new game.pdk.TableCard();
				tableCard.cardType = cardResult.cardType;
				for(let c of this.lastTipCards) {
					tableCard.cards.push(c);
				}
			}

			let chooseCards: number[] = new Array<number>();
			if(cardResult.cardType == 0) {
				return this.checkDefaultCard2();
			}
			if (cardResult.cardType != CardType.SINGLE && cardResult.cardType != CardType.DUAD) {
				if(cardResult.cardType == CardType.BOMB) {
					// 炸弹需要特殊处理
					let r = PDKRule.selectBoomBiggerThan(cloneHandCards, cardResult.card);
					if(!r) {
						// 看是否有王炸
						r = [];
						for(let c of cloneHandCards) {
							if(c == 68 || c == 64) {
								r.push(c);
							}
						}
						if(r.length == 2) {
							chooseCards = r;
						}
					} else {
						chooseCards = r;
					}
				} else {
					// 连对先特殊处理
					if(tableCard.cardType == game.pdk.CardType.MANY_DUAD) {
						let r = game.PDKIntelligent.getPureLiandui(Math.floor(tableCard.cards[0] / 4), cloneHandCards, tableCard.cards.length / 2);
						if(r.length > 0) {
							chooseCards = r;
						}
					}
					if(chooseCards.length == 0) {
						let selectCardExec = game.PDKRule.selectOnTableNoBoom(cloneHandCards, tableCard, cloneHandCards);
						if(selectCardExec) {
							if(selectCardExec.cardRoot == CardRoot.SHUN_ZI && selectCardExec.cardList.length != tableCard.cards.length) {
								// 其实是不对的。。。具体原因就是 选牌的智能 不要求强匹配
								selectCardExec = null;
							}
							if(selectCardExec.cardList[0].cardValue <= Math.floor(tableCard.cards[0] / 4)) {
								selectCardExec = null;
							}
						}
						if(!selectCardExec) {
							selectCardExec = game.PDKRule.selectBoom(cloneHandCards);
						}
						if(selectCardExec) {
							let r = this.handSepcialCards(selectCardExec, cloneHandCards);
							chooseCards = r;
						}
					}
				}
			} else if (cardResult.cardType == CardType.SINGLE) {
				// 数组里面取出炸弹
				let avaliableCards = PDKRule.excludeBoomCards(cloneHandCards);
				let r = 0;
				if(this.hasTryToFind) {
					// 老子已经给他找出可以的了 你他妈还要试 那我他妈就不给你判断了 操
					r = this.findAvaliableSingle(avaliableCards, cardResult.card, false);
				} else {
					// 先去除所有特殊牌型 看剩余的牌是否可以满足
					let specialArr:Array<game.CardResultItem> = game.DDZIntelligent.getMaxCardResult(avaliableCards); //PDKRule.analysis(avaliableCards, false, false);
					let findExcludeArr:Array<CardRoot> = [CardRoot.SHUN_ZI, CardRoot.LIAN_DUI, CardRoot.THREE, CardRoot.PLANE];
					let handCards = CommonUtil.copyNumberArray(avaliableCards);
					for(let special of specialArr) {
						CommonUtil.subArr(handCards, special.cardList);
					}
					r = this.findAvaliableSingle(handCards, cardResult.card);
					if(r == 0) {
						if(this.lastTipCards && this.lastTipCards.length > 0) {
							// 其实我是在跟自己提示的牌进行比较
							this.hasTryToFind = true;
							this.lastTipCards = [];
							return this.checkCard2();
						}
						// 没有找到
						for(let cardRoot of findExcludeArr) {
							for(let special of specialArr) {
								if(special.cardRoot == cardRoot) {
									for(let c of special.cardList) {
										if(handCards.indexOf(c) < 0) {
											handCards.push(c);
										}
									}
								}
							}
							r = this.findAvaliableSingle(handCards, cardResult.card);
							if(r > 0) break;
						}	
					} else {
						chooseCards = [r];
					}
				}
				if(r == 0) {
					// 直接出炸弹
					let boomCards = game.PDKRule.selectBoomCardNums(cloneHandCards);
					if(!boomCards) {
						chooseCards = game.PDKRule.selectKingBoomCardNums(cloneHandCards);
					} else {
						chooseCards = boomCards;
					}
				} else {
					chooseCards = [r];
				}
			} else if (cardResult.cardType == CardType.DUAD) {
				// 数组里面取出炸弹
				let avaliableCards = PDKRule.excludeBoomCards(cloneHandCards);
				let r = [];
				if(this.hasTryToFind) {
					r = this.findAvaliableDuizi(avaliableCards, cardResult.card);
				} else {
					// 先去除所有特殊牌型 看剩余的牌是否可以满足
					let specialArr:Array<game.CardResultItem> = game.DDZIntelligent.getMaxCardResult(avaliableCards);
					let findExcludeArr:Array<CardRoot> = [CardRoot.SHUN_ZI, CardRoot.LIAN_DUI, CardRoot.THREE, CardRoot.PLANE];
					let handCards = CommonUtil.copyNumberArray(avaliableCards);
					for(let special of specialArr) {
						CommonUtil.subArr(handCards, special.cardList);
					}
					r = this.findAvaliableDuizi(handCards, cardResult.card);
					if(r.length == 0) {
						if(this.lastTipCards && this.lastTipCards.length > 0) {
							// 其实我是在跟自己提示的牌进行比较
							this.hasTryToFind = true;
							this.lastTipCards = [];
							return this.checkCard2();
						}
						// 没有找到
						for(let cardRoot of findExcludeArr) {
							for(let special of specialArr) {
								if(special.cardRoot == cardRoot) {
									for(let c of special.cardList) {
										if(handCards.indexOf(c) < 0) {
											handCards.push(c);
										}
									}
								}
							}
							r = this.findAvaliableDuizi(handCards, cardResult.card);
							if(r.length > 0) break;
						}	
					} else {
						chooseCards = r;
					}
				}
				if(r.length == 0) {
					// 直接出炸弹
					let boomCards = game.PDKRule.selectBoomCardNums(cloneHandCards);
					if(!boomCards) {
						chooseCards = game.PDKRule.selectKingBoomCardNums(cloneHandCards);
					} else {
						chooseCards = boomCards;
					}
				} else {
					chooseCards = r;
				}
			}
			if (this.lastTipCards != null && this.lastTipCards.length > 0 && chooseCards.length == 0) {
				// 之前有 但是现在找不到大的牌了
				this.lastTipCards = null;
				return this.checkCard2();
			}
			if (isRecord) {
				this.lastTipCards = new Array<number>();
				for (let card of chooseCards) {
					this.lastTipCards.push(card);
				}
 			}
			return chooseCards;
		}

		private findAvaliableDuizi(handCards:Array<number>, limitCard:number):number[] {
			CommonUtil.sortNumberArray(handCards);
			let map = PDKRule.convertToMap(handCards);
			for(let k in map) {
				let kk = Number(k);
				if(map[k] >= 2 && kk > limitCard) {
					let r = [];
					for(let c of handCards) {
						if(Math.floor(c / 4) == kk) {
							r.push(c);
							if(r.length >= 2) {
								return r;
							}
						}
					}
				}
			}
			return [];
		}

		private findAvaliableSingle(handCards:Array<number>, limitCard:number, isIntel:boolean = true):number {
			if(handCards.length >= 1) {
				// 虽然文档没说 是不是要优先选非对子，是在找不到 再破对子
				CommonUtil.sortNumberArray(handCards);
				let map = PDKRule.convertToMap(handCards);
				if(isIntel) {
					for(let c of handCards) {
						if(map[Math.floor(c / 4)] == 1) {
							if(Math.floor(c / 4) > limitCard) {
								// 找到了
								return c;
							}
						}
					}
				}
				for(let c of handCards) {
					if(Math.floor(c / 4) > limitCard) {
						// 找到了
						return c;
					}
				}
			}
			return 0;
		}

		private handSepcialCards(selectCardExec:DDZExecCards, avaliableCards:Array<number>):Array<number>{
			// 找到主牌了 看副牌 最重要的一点 哪怕我找不到我也不能拆炸弹
			let selectCards:Array<number> = [];
			for(let c of selectCardExec.cardList) {
				selectCards.push(c.cardNumber);
			}
			if(selectCardExec.checkPairInfoList.length > 0) {
				for(let pairInfo of selectCardExec.checkPairInfoList) {
					if(pairInfo instanceof game.BothSideFindPairInfo) {
						// 找指定
						if(pairInfo.isDuizi) {
							for(let i=2;i<=3;i++) {
								let r = game.PDKRule.searchDuiziBothSideThreeStage(
									CommonUtil.subArr(avaliableCards, selectCards),
									CommonUtil.subArr(avaliableCards, selectCards),
									CommonUtil.subArr(avaliableCards, selectCards),
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
								let r = game.PDKRule.searchSingleBothSideThreeStage(
									CommonUtil.subArr(avaliableCards, selectCards),
									CommonUtil.subArr(avaliableCards, selectCards),
									CommonUtil.subArr(avaliableCards, selectCards),
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
							let result = game.DDZIntelligent.findDuiziNoBoom(CommonUtil.subArr(avaliableCards, selectCards),pairInfo.count)
							if(result.length > 0) {
								for(let c of result) {
									selectCards.push(c)
								}
							}
						} else {
							// 找数量为n的单张
							let needCount = selectCardExec.checkPaireInfo.count;
							for(let i=1;i<=3;i++) {
								let r = game.PDKRule.searchSingleThreeStage(
									CommonUtil.subArr(avaliableCards, selectCards),[],[],
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
			return selectCards;
		}

		public checkForbiddenCards() : Array<number> {
			let avaliableCards = [];
			let handCards = CommonUtil.copyNumberArray(this.selfHandCards);
			if(this.tableCard.cards.length == 0) return [];
			let cardResult = PDKPokerUtil.checkType(this.tableCard.cards);
			let segment = PDKIntelligent.genCardSegment(handCards);
			let avaliableSegments:Array<CardSegment> = [];
			if(this.tableCard.cardType == CardType.SINGLE) {
				// 能够干掉单张的 只有大于单张 和 炸弹
				do{
					if(segment.cardValue > cardResult.card || segment.cardList.length == 4) {
						avaliableSegments.push(segment)
					}
				}while(segment = segment.nextSegment)
			}

			if(this.tableCard.cardType == CardType.DUAD) {
				do{
					if((segment.cardList.length >= 2 && segment.cardValue > cardResult.card) || segment.cardList.length == 4) {
						avaliableSegments.push(segment)
					}
				}while(segment = segment.nextSegment)
			}

			if(this.tableCard.cardType == CardType.MANY_DUAD) {
				let begin = segment;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardList.length >= 2 && begin.cardValue > cardResult.card) {
						for(let r of PDKIntelligent.findSingleLianduiSegments(begin)) {
							avaliableSegments.push(r);
						}
					}
				}while(begin = begin.nextSegment);
			}

			if(this.tableCard.cardType == CardType.THREE) {
				let begin = segment;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardList.length >= 3 && begin.cardValue > cardResult.card) {
						avaliableSegments.push(begin);
					}
				}while(begin = begin.nextSegment);
			}

			if(this.tableCard.cardType == CardType.THREE_TO_ONE) {
				let begin = segment;
				let find3 = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardList.length >= 3 && begin.cardValue > cardResult.card) {
						avaliableSegments.push(begin);
						find3 = true;
					}
				}while(begin = begin.nextSegment);
				if(find3) {
					// 找到3同  那么带单个副牌 所以。。。所有牌都可以带
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			if(this.tableCard.cardType == CardType.THREE_TO_TWO) {
				let begin = segment;
				let find3 = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardList.length >= 3 && begin.cardValue > cardResult.card) {
						avaliableSegments.push(begin);
						find3 = true;
					}
				}while(begin = begin.nextSegment);
				if(find3) {
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			if(this.tableCard.cardType == CardType.SHUN_ZI) {
				let begin = segment;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardValue > cardResult.card) {
						let list = PDKIntelligent.findSingleShunziSegments(begin);
						if(list.length >= this.tableCard.cards.length) {
							for(let r of PDKIntelligent.findSingleShunziSegments(begin)) {
								avaliableSegments.push(r);
							}
						}
					}
				}while(begin = begin.nextSegment);
			}

			if(this.tableCard.cardType == CardType.FOUR_TO_ONE) {
				let begin = segment;
				let find4 = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						if(begin.cardValue > cardResult.card) {
							find4 = true
						}
						continue;
					}
				}while(begin = begin.nextSegment);
				if(find4) {
					// 找到大于的4  那么带单个副牌 所以。。。所有牌都可以带
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			if(this.tableCard.cardType == CardType.FOUR_TO_TWO) {
				let begin = segment;
				let find4 = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						if(begin.cardValue > cardResult.card) {
							find4 = true
						}
						continue;
					}
				}while(begin = begin.nextSegment);
				if(find4) {
					// 找到大于的4  那么带单个副牌 所以。。。所有对子牌都可以带
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			if(this.tableCard.cardType == CardType.FOUR_TO_THREE) {
				let begin = segment;
				let find4 = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						if(begin.cardValue > cardResult.card) {
							find4 = true
						}
						continue;
					}
				}while(begin = begin.nextSegment);
				if(find4) {
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			if(this.tableCard.cardType == CardType.BOMB) {
				let begin = segment;
				let find4 = false;
				do{
					if(begin.cardList.length == 4 && begin.cardValue > cardResult.card) {
						avaliableSegments.push(begin);
						continue;
					}
				}while(begin = begin.nextSegment);
			}

			if(this.tableCard.cardType == CardType.PLANE) {
				let isduiziwith = false;
				if(this.tableCard.cards.length == 8 || this.tableCard.cards.length == 12 || this.tableCard.cards.length == 16) {
					isduiziwith = true
				} else {
					isduiziwith = false
				}
				let begin = segment;
				let findplane = false;
				do{
					if(begin.cardList.length == 4) {
						avaliableSegments.push(begin);
						continue;
					}
					if(begin.cardList.length >= 3 && begin.cardValue > cardResult.card) {
						for(let r of PDKIntelligent.findSinglePlaneSegments(begin)) {
							avaliableSegments.push(r);
							findplane = true;
						}
					}
				}while(begin = begin.nextSegment);
				if(findplane) {
					do{
						avaliableSegments.push(segment);
					}while(segment = segment.nextSegment);
				}
			}

			for(let seg of avaliableSegments) {
				for(let c of seg.cardList) {
					if(avaliableCards.indexOf(c) < 0) {
						avaliableCards.push(c);
					}
				}
			}

			return CommonUtil.subArr(handCards, avaliableCards);
		}

	}
}

