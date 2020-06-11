module game.ddz {
	export enum DDZPlayerRole {
		LANDLORD,
		FARMER
	}

	export enum RoleAction {
		ATTACK,
		IDLE,
		LOSE,
		SKILL,
		WIN
	}

	export enum DDZStatus {
		PREPARE,
		JIAOFEN,
		JIABEI,
		FIGHT
	}

	export enum DDZPlayerStatus {
		PREPARE = 0,
		JIAOFEN = 1,
		JIAOFEN_COMPLETE = 2,
		JIABEI = 3,
		JIABEI_COMPLETE = 4,
		FIGHT = 5,
		FIGHT_COMPLETE = 6
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
		ERROR,			// 错误
		SINGLE,			// 单个
		DUAD,			// 一对
		MANY_DUAD,		// 连对
		THREE,			// 3个
		THREE_TO_ONE,	// 3带1
		THREE_TO_TWO,	// 3带2(对)
		SHUN_ZI,		// 顺子
		PLANE,			// 飞机
		FOUR_TO_TWO,	// 四带2
		BOMB,			// 炸弹
		KING_BOMB,		// 王弹
		FOUR_TO_FOUR,	// 四带2对
		DONT			// 不要
	}

	export enum DDZRefreshReason {
		NONE,
		REFRESH_ON_CHANGE_TRUSTEESHIP
	}

	export class BattlePlayerInfo {
		public playerId: number = 0; //玩家id
		public money: number = 0; //当局金币情况
		public totalMulti: number = 0; //玩家总倍数
		public totalMoney: number = 0; //最终的总金币
		public isTrusteeship: boolean = false;//是否托管
		public handCards: Array<number>;//手牌
		public nickName: string = "";

		public setData(data: any): void {
			this.playerId = Number(data.playerId);
			this.money = data.money / 1000;
			this.totalMoney = data.totalMoney / 1000;
			this.totalMulti = data.total;
			this.isTrusteeship = data.isTrusteeship;
			this.handCards = data.handCards;
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
		public multiInfo: DdzMultipleDetail;

		public setData(data: any): void {
			this.coutdownTime = data.downTime;
			this.countdownEndTime = this.coutdownTime * 1000 + egret.getTimer();
			this.isWin = data.isWin;
			this.playerInfos = new Array<BattlePlayerInfo>();
			for (let playerData of data.finishInfo) {
				let battlePlayerInfo: BattlePlayerInfo = new BattlePlayerInfo();
				battlePlayerInfo.setData(playerData);
				this.playerInfos.push(battlePlayerInfo);
				let playerInfo: DDZPlayerInfo = DDZBattleData.getInstance().getPlayer(battlePlayerInfo.playerId);
				playerInfo.money = battlePlayerInfo.totalMoney;
				if (game.RoomManager.getInstance().curRoomData) {
					let roomPlayerInfo = game.RoomManager.getInstance().curRoomData.getPlayerInfo(battlePlayerInfo.playerId);
					if (roomPlayerInfo) {
						battlePlayerInfo.nickName = roomPlayerInfo.nickName;
					}
				}

			}
			this.multiInfo = new DdzMultipleDetail();
			this.multiInfo.isLandlord = data.detail.isLandlord;
			this.multiInfo.rob = data.detail.rob;
			this.multiInfo.bomb = data.detail.bomb;
			this.multiInfo.spring = data.detail.spring;
			this.multiInfo.total = data.detail.total;
			this.multiInfo.common = data.detail.common;
			this.multiInfo.jiabei = data.detail.jiabei != null ? data.detail.jiabei : 0;

			game.AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_MONEY);
		}
	}

	export class DDZPlayerInfo {
		public playerId: number;
		public cardCount: number;
		public status: DDZPlayerStatus;
		public countdownTime: number;
		public isTrusteeship: boolean;
		public money: number = 0;
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

		public contains(card) : boolean {
			for(let c of this.cards) {
				if(Math.floor(c / 4) == card) {
					return true;
				}
			}
			return false;
		}

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
	}

	export class DDZBattleData {
		private static _instance: DDZBattleData;
		public static getInstance(): DDZBattleData {
			if (DDZBattleData._instance == null) {
				DDZBattleData._instance = new DDZBattleData();
			}
			return DDZBattleData._instance;
		}
		public constructor() {
		}
		public battleStatus: DDZStatus = DDZStatus.PREPARE;
		public ddzPlayerInfos: Array<DDZPlayerInfo>;
		public selfHandCards: Array<number>;
		public bottomCards: Array<number>;
		public curJiaofenId: number;
		public tableCard: TableCard;
		public curOperPlayerId: number;
		public cardHolder: CardHolder;
		public landlordId: number;
		public curSocre: number;
		public curPlayPlayerId: number;
		public multi: number = 0;
		public isInbattle:boolean = false;

		public finishData: BattleFinishInfo;

		public handCardMap: HashMap;

		public curDetailMulti:DdzMultipleDetail;

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

		public hasData(): boolean {
			return this.ddzPlayerInfos != undefined && this.ddzPlayerInfos != null && this.ddzPlayerInfos.length > 0;
		}

		public clearData(): void {
			this.handCardMap = new HashMap();
			this.landlordId = 0;
			this.cardHolder = new CardHolder();
			this.curSocre = 0;
			this.bottomCards = new Array<number>();
			this.selfHandCards = new Array<number>();
			this.curOperPlayerId = 0;
			this.multi = 0;
			this.curPlayPlayerId = 0;
			this.battleStatus = DDZStatus.PREPARE;
			this.isInbattle = false;
			this.tableCard = new TableCard();
			if (this.ddzPlayerInfos != null) {
				for (let playerInfo of this.ddzPlayerInfos) {
					playerInfo.status = DDZPlayerStatus.PREPARE;
				}
			}
			this.ddzPlayerInfos = [];
			this.clearLastTip();
		}

		public setData(data: any): void {

		}

		public init(): void {
			this.ddzPlayerInfos = new Array<DDZPlayerInfo>();
		}

		public setMultiData(data:any) {
			this.curDetailMulti = new DdzMultipleDetail();
			this.curDetailMulti.isLandlord = data.isLandlord;
			this.curDetailMulti.rob = data.rob;
			this.curDetailMulti.bomb = data.bomb;
			this.curDetailMulti.spring = data.spring;
			this.curDetailMulti.total = data.total;
			this.curDetailMulti.common = data.common;
			this.curDetailMulti.jiabei = data.jiabei != null ? data.jiabei : 0;
		}

		/**
		 * 设置开始游戏的数据
		 */
		public setBattleStart(data: any): void {
			console.log('60001.data ====== ', data);
			this.battleStatus = DDZStatus.JIAOFEN;
			this.curSocre = 0;
			this.landlordId = 0;
			this.selfHandCards = new Array<number>();
			var originPlayerInfos = this.ddzPlayerInfos;
			this.ddzPlayerInfos = new Array<DDZPlayerInfo>();
			this.multi = 0;
			this.tableCard = new TableCard();
			console.log('60001.handCards ====== ', data.handCards);
			for (let i = 0; i < data.handCards.length; i++) {
				this.selfHandCards.push(data.handCards[i]);
			}
			this.downTime = data.downTime;
			this.curJiaofenId = data.callScoreId;
			this.isInbattle = true;

			function getFromOrigin(playerId: number): DDZPlayerInfo {
				if (!originPlayerInfos) return;
				for (let pi of originPlayerInfos) {
					if (pi.playerId == playerId) return pi;
				}
			}

			for (let i = 0; i < data.battleInfo.length; i++) {
				let ddzPlayer: DDZPlayerInfo = new DDZPlayerInfo();
				ddzPlayer.playerId = Number(data.battleInfo[i].playerId);
				ddzPlayer.cardCount = data.battleInfo[i].cardCount;
				ddzPlayer.status = data.battleInfo[i].status;
				let pi: DDZPlayerInfo = getFromOrigin(ddzPlayer.playerId);
				if (pi != null) {
					ddzPlayer.money = pi.money;
				}
				this.ddzPlayerInfos.push(ddzPlayer);
				console.log('60001.playerId ====== ', Number(data.battleInfo[i].playerId));
			}
		}

		public setReconnectData(data: any): void {
			this.selfHandCards = new Array<number>();
			// console.log('60007.handCards ====== ', data.handCards);
			for (let i = 0; i < data.handCards.length; i++) {
				this.selfHandCards.push(data.handCards[i]);
			}
			this.tableCard = new TableCard();
			this.tableCard.playerId = Number(data.currentPlayerId);
			this.tableCard.setCards(data.currentCards);
			this.tableCard.cardType = data.cardType;
			this.curOperPlayerId = Number(data.nextPlayerId);
			this.curSocre = data.score;
			this.bottomCards = new Array<number>();
			this.landlordId = Number(data.landlordId);
			this.multi = data.multiple;
			this.downTime = data.downTime;
			this.isInbattle = true;
			for (let i = 0; i < data.bottomCard.length; i++) {
				this.bottomCards.push(data.bottomCard[i]);
			}
			this.ddzPlayerInfos = new Array<DDZPlayerInfo>();
			for (let i = 0; i < data.battleInfo.length; i++) {
				let ddzPlayer: DDZPlayerInfo = new DDZPlayerInfo();
				ddzPlayer.playerId = Number(data.battleInfo[i].playerId);
				ddzPlayer.cardCount = data.battleInfo[i].cardCount;
				ddzPlayer.status = data.battleInfo[i].status;
				if (ddzPlayer.playerId == UserService.instance.playerId) {
					ddzPlayer.isTrusteeship = data.isTrusteeship;
				}
				this.ddzPlayerInfos.push(ddzPlayer);
				if (ddzPlayer.status == DDZPlayerStatus.JIAOFEN) {
					this.battleStatus = DDZStatus.JIAOFEN;
				}

				if (ddzPlayer.status == DDZPlayerStatus.JIABEI) {
					this.battleStatus = DDZStatus.JIABEI;
				}

				if (ddzPlayer.status == DDZPlayerStatus.FIGHT && ddzPlayer.playerId != this.landlordId) {
					this.battleStatus = DDZStatus.FIGHT;
				}
			}

			if (this.battleStatus == DDZStatus.FIGHT) {
				this.curPlayPlayerId = Number(data.nextPlayerId);
			}

			this.cardHolder = new CardHolder();
			this.cardHolder.setData(data.cardHolder);
		}

		public getJiaofenPlayer(): DDZPlayerInfo {
			for (let i = 0; i < this.ddzPlayerInfos.length; i++) {
				if (this.ddzPlayerInfos[i].status == DDZPlayerStatus.JIAOFEN) {
					return this.ddzPlayerInfos[i];
				}
			}
			return null;
		}

		public getPlayer(playerId: number): DDZPlayerInfo {
			if (this.ddzPlayerInfos == null) return null;
			for (let i = 0; i < this.ddzPlayerInfos.length; i++) {
				if (this.ddzPlayerInfos[i].playerId == playerId) {
					return this.ddzPlayerInfos[i];
				}
			}
			return null;
		}

		public setCallScore(data: any): void {
			if (!this.ddzPlayerInfos) return;
			console.log('60002.data ==== ', data);
			let playerData = this.getPlayer(data.currentPlayerId);
			if (playerData) playerData.status = DDZPlayerStatus.JIAOFEN_COMPLETE;
			this.curSocre = data.score;
			this.multi = data.score;
			console.log('60002.handCards ====== ', data.bottomCard);
			this.bottomCards = [];
			for (let i = 0; i < data.bottomCard.length; i++) {
				this.bottomCards.push(data.bottomCard[i]);
			}
			this.downTime = data.downTime;
			if (data.landlordId > 0) {
				// 已经有地主了
				this.landlordId = Number(data.landlordId);
				this.battleStatus = DDZStatus.JIABEI;
				for (let i = 0; i < this.ddzPlayerInfos.length; i++) {
					if (this.ddzPlayerInfos[i].playerId != this.landlordId) {
						// 是农民
						this.ddzPlayerInfos[i].status == DDZPlayerStatus.JIABEI;
					}
				}
				if (data.landlordId == UserService.instance.playerId) {
					for (let card of this.bottomCards) {
						this.selfHandCards.push(card);
					}
					this.selfHandCards.sort((card1: number, card2: number) => {
						return Math.floor(card2 / 4) - Math.floor(card1 / 4);
					});
				} else {
					this.getPlayer(data.landlordId).cardCount += this.bottomCards.length;
					console.log('60002.cardCount ====== ', data.landlordId, this.getPlayer(data.landlordId).cardCount);
					AppFacade.getInstance().sendNotification(PanelNotify.SHOW_LEFT_CARDS, data.landlordId);
				}
			} else {
				this.getPlayer(data.nextPlayerId).status = DDZPlayerStatus.JIAOFEN;
				this.battleStatus = DDZStatus.JIAOFEN;
			}
		}

		public setJiabei(data: any): void {
			this.getPlayer(Number(data.currentPlayerId)).status = DDZPlayerStatus.JIABEI_COMPLETE;
			// 单独发个协议显示玩家是否加倍
			if (Number(data.currentPlayerId) == UserService.instance.playerId) {
				this.multi *= data.multiple == 2 ? 2 : 1;
			}

			this.downTime = data.downTime;
			if (data.playPlayerId > 0) {
				// 所有人都是战斗状态
				this.battleStatus = DDZStatus.FIGHT;
				for (let i = 0; i < this.ddzPlayerInfos.length; i++) {
					this.ddzPlayerInfos[i].status == DDZPlayerStatus.FIGHT;
				}
				this.curPlayPlayerId = Number(data.playPlayerId);
				this.cardHolder = new CardHolder();
				this.cardHolder.setData(data.cardHolder);
				this.getPlayer(this.curPlayPlayerId).countdownTime = data.downTime;

				AppFacade.getInstance().sendNotification(PanelNotify.JIABEI_COMPLETE);
			}

			DDZRequest.reqMultiInfo();
		}

		public setPlayStepData(data: any): void {
			if (data.cards.length == 0) {
				// 这个人不要
				AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TIPS_ON_DONOT, data.currentPlayerId);
				game.ddz.DDZSoundPlayer.instance.playVoice(data.currentPlayerId, game.ddz.DDZVoiceType.PASS, 0);
			} else {
				this.tableCard = new TableCard();
				this.tableCard.setCards(data.cards);
				this.tableCard.cardType = data.cardType;
				this.tableCard.playerId = Number(data.currentPlayerId);
				if(this.tableCard.cardType == CardType.BOMB ||this.tableCard.cardType == CardType.KING_BOMB) {
					DDZRequest.reqMultiInfo();
				}
				game.ddz.DDZSoundPlayer.instance.playVoice(data.currentPlayerId, game.ddz.DDZVoiceType.PLAY_CARD, [data.cardType, Math.floor(data.cards[0] / 4)]);
			}
			this.curPlayPlayerId = Number(data.nextPlayerId);
			
			let playerInfo: DDZPlayerInfo = this.getPlayer(Number(data.currentPlayerId));
			if (playerInfo) playerInfo.cardCount -= data.cards.length;
			if (data.currentPlayerId == UserService.instance.playerId) {
				for (let i = 0; i < data.cards.length; i++) {
					let index = this.selfHandCards.indexOf(data.cards[i]);
					if (index >= 0) {
						this.selfHandCards.splice(index, 1);
					}
				}
				if(this.selfHandCards.length == 0) {
					this.curPlayPlayerId = 0;
				}
			}
			// 做一次修整 如果剩余牌数为0 说明已经出完牌了  不需要别人再出牌了
			if(playerInfo && playerInfo.cardCount <= 0 && playerInfo.playerId != UserService.instance.playerId) {
				this.curPlayPlayerId = 0;
			}
			playerInfo.countdownTime = data.downTime;
			this.downTime = data.downTime;
			if (data.isTrusteeship != playerInfo.isTrusteeship) {
				playerInfo.isTrusteeship = data.isTrusteeship;
				console.log("托管状态变化 ： " + playerInfo.playerId + "  " + playerInfo.isTrusteeship);
				// 托管状态发生改变
				AppFacade.getInstance().sendNotification(PanelNotify.CHANGE_TRUSTEESHIP_STATE, playerInfo.playerId);
			}

			this.cardHolder = new CardHolder();
			this.cardHolder.setData(data.cardHolder);
			this.multi = data.multiple;
			this.lastTipCards = null;
		}

		public isFarmer(playerId: number): boolean {
			return playerId != this.landlordId;
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
					if(this.defaultSelectArr[0].cardRoot == CardRoot.THREE || this.defaultSelectArr[0].cardRoot == CardRoot.PLANE) {
						// 补副牌
						let count = Math.floor(this.defaultSelectArr[0].cardList.length / 3);
						// 在leftcards里面找数量为searchCount的对子 或者 单张 如果都没有 gg
						let map = game.PokerCardMap.convertFromCards(this.leftCards);
						if(map.getCountBySize(2) >= count) {
							let r = map.getCardsBySize(2, count);
							selectCards = selectCards.concat(r);
						} else {
							// 找对子是不够的 找单张
							if(map.getCountBySize(1) >= count) {
								let r = map.getCardsBySize(1, count);
								selectCards = selectCards.concat(r);
							} else {
								// 单张也不够 我就不找了
							}
						}
					}
					chooseCards = selectCards;
					this.defaultSelectArr.splice(0,1);
					return chooseCards;
				} else {
					chooseCards = this.defaultSegment.cardList;
					if(this.defaultSegment.nextSegment) {
						this.defaultSegment = this.defaultSegment.nextSegment;
					}  else {
						this.defaultSegment = DDZIntelligent.getSegmentBegin(this.defaultSegment);
					}
				}
			} else {
				let cloneHandCards = CommonUtil.copyNumberArray(this.selfHandCards);
				let avaliableCards = DDZRule.excludeBoomCards(cloneHandCards);
				this.defaultSelectArr = game.DDZIntelligent.getMaxCardResult(avaliableCards);
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
				this.defaultSegment = DDZIntelligent.genCardSegment2(cloneHandCards);
				if(this.defaultSelectArr.length > 0) {
					let selectCards:Array<number> = [];
					for(let c of this.defaultSelectArr[0].cardList) {
						selectCards.push(c);
					}
					if(this.defaultSelectArr[0].cardRoot == CardRoot.THREE || this.defaultSelectArr[0].cardRoot == CardRoot.PLANE) {
						// 补副牌
						let count = Math.floor(this.defaultSelectArr[0].cardList.length / 3);
						// 在leftcards里面找数量为searchCount的对子 或者 单张 如果都没有 gg
						let map = game.PokerCardMap.convertFromCards(this.leftCards);
						if(map.getCountBySize(2) >= count) {
							let r = map.getCardsBySize(2, count);
							selectCards = selectCards.concat(r);
						} else {
							// 找对子是不够的 找单张
							if(map.getCountBySize(1) >= count) {
								let r = map.getCardsBySize(1, count);
								selectCards = selectCards.concat(r);
							} else {
								// 单张也不够 我就不找了
							}
						}
					}
					chooseCards = selectCards;
					this.defaultSelectArr.splice(0,1);
					return chooseCards;
				} else {
					chooseCards = this.defaultSegment.cardList;
					if(this.defaultSegment.nextSegment) {
						this.defaultSegment = this.defaultSegment.nextSegment;
					}  else {
						this.defaultSegment = DDZIntelligent.getSegmentBegin(this.defaultSegment);
					}
				}
			}

			return chooseCards;
		}

		private getMinValueCard(avaliableCards:Array<number>):number {
			let min = avaliableCards[0];
			for(let i=1;i<avaliableCards.length;i++) {
				if(avaliableCards[i] < min) {
					min = avaliableCards[i];
				}
			}
			return min;
		}

		// 尽量自动找。找不到不是问题，所以不能破特殊牌型
		private autoAddWithCard(cardList:Array<number>, avaliableCards:Array<number>, selectCards:Array<number>) {
			//需要排除能构建特殊牌型的牌
			let checkCards = CommonUtil.copyNumberArray(avaliableCards);
			let items = DDZIntelligent.getMaxCardResult(checkCards);
			let leftCards = [];
			let searchCount = Math.floor(cardList.length / 3);
			for(let c of avaliableCards) {
				if(selectCards.indexOf(c) < 0) {
					let isExistInSpecial = false;
					for(let item of items) {
						if(item.cardList.indexOf(c) >= 0) {
							isExistInSpecial = true;
							break;
						}
					}
					if(!isExistInSpecial) leftCards.push(c);
				}
			}
			// 在leftcards里面找数量为searchCount的对子 或者 单张 如果都没有 gg
			let map = game.PokerCardMap.convertFromCards(leftCards);
			if(map.getCountBySize(2) >= searchCount) {
				let r = map.getCardsBySize(2, searchCount);
				for(let c of r) {
					selectCards.push(c);
				}
			} else {
				// 找对子是不够的 找单张
				if(map.getCountBySize(1) >= searchCount) {
					let r = map.getCardsBySize(1, searchCount);
					for(let c of r) {
						selectCards.push(c);
					}
				} else {
					// 单张也不够 我就不找了
				}
			}
		}

		private getFromHandCards(excludeCards: Array<number>, needCount: number): Array<number> {
			let cardRes: Array<number> = [];
			for (let card of this.selfHandCards) {
				let cardNum: number = Math.floor(card / 4);
				if (excludeCards.indexOf(cardNum) < 0) {
					cardRes.push(cardNum);
					if (cardRes.length >= needCount) break;
				}
			}
			return cardRes;
		}

		private hasTryToFind:boolean = false;

		public checkCard2(isRecord:boolean = true): number[] {
			let cloneHandCards = this.selfHandCards.concat([]);
			let tableCard:game.ddz.TableCard = this.tableCard;
			let cardResult: CardCheckResult = PokerUtil.checkType(this.tableCard.cards);
			let cardLength = this.tableCard.cards.length;
			if (this.lastTipCards != null && this.lastTipCards.length > 0) {
				cardResult = PokerUtil.checkType(this.lastTipCards);
				cardLength = this.lastTipCards.length;
				tableCard = new game.ddz.TableCard();
				tableCard.cardType = cardResult.cardType;
				for(let c of this.lastTipCards) {
					tableCard.cards.push(c);
				}
			}

			let chooseCards: number[] = new Array<number>();
			if(cardResult.cardType == 0) {
				return this.checkDefaultCard2();
			}
			if(cardResult.cardType == CardType.KING_BOMB) {
				// 没有判断必要了
			}else if (cardResult.cardType != CardType.SINGLE && cardResult.cardType != CardType.DUAD) {
				if(cardResult.cardType == CardType.BOMB) {
					// 炸弹需要特殊处理
					let r = DDZRule.selectBoomBiggerThan(cloneHandCards, cardResult.card);
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
					let selectCardExec = game.DDZRule.selectOnTableNoBoom(cloneHandCards, tableCard, cloneHandCards);
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
						selectCardExec = game.DDZRule.selectBoom(cloneHandCards);
					}
					if(selectCardExec) {
						let r = this.handSepcialCards(selectCardExec, cloneHandCards);
						chooseCards = r;
					}
				}
			} else if (cardResult.cardType == CardType.SINGLE) {
				// 数组里面取出炸弹
				let avaliableCards = DDZRule.excludeBoomCards(cloneHandCards);
				let r = 0;
				if(this.hasTryToFind) {
					// 老子已经给他找出可以的了 你他妈还要试 那我他妈就不给你判断了 操
					r = this.findAvaliableSingle(avaliableCards, cardResult.card, false);
				} else {
					// 先去除所有特殊牌型 看剩余的牌是否可以满足
					let specialArr:Array<game.CardResultItem> = game.DDZIntelligent.getMaxCardResult(avaliableCards); //DDZRule.analysis(avaliableCards, false, false);
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
					let boomCards = game.DDZRule.selectBoomCardNums(cloneHandCards);
					if(!boomCards) {
						chooseCards = game.DDZRule.selectKingBoomCardNums(cloneHandCards);
					} else {
						chooseCards = boomCards;
					}
				} else {
					chooseCards = [r];
				}
			} else if (cardResult.cardType == CardType.DUAD) {
				// 数组里面取出炸弹
				let avaliableCards = DDZRule.excludeBoomCards(cloneHandCards);
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
								for(let c of special.cardList) {
									if(handCards.indexOf(c) < 0) {
										handCards.push(c);
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
					let boomCards = game.DDZRule.selectBoomCardNums(cloneHandCards);
					if(!boomCards) {
						chooseCards = game.DDZRule.selectKingBoomCardNums(cloneHandCards);
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
			let map = DDZRule.convertToMap(handCards);
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
				let map = DDZRule.convertToMap(handCards);
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
								let r = game.DDZRule.searchDuiziBothSideThreeStage(
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
								let r = game.DDZRule.searchSingleBothSideThreeStage(
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
								let r = game.DDZRule.searchSingleThreeStage(
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

		public checkCard(isRecord: boolean = true): number[] {
			var chooseCards: number[] = new Array<number>();
			var cloneHandCards: number[] = new Array<number>();
			for (let i of this.selfHandCards) {
				cloneHandCards.push(i);
			}
			var cardResult: CardCheckResult = PokerUtil.checkType(this.tableCard.cards);
			let cardLength = this.tableCard.cards.length;
			if (this.lastTipCards != null && this.lastTipCards.length > 0) {
				cardResult = PokerUtil.checkType(this.lastTipCards);
				cardLength = this.lastTipCards.length;
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
				let targetCount = cardResult.count / 2;
				for (let i = 0; i < cards.length; i++) {
					if (cards[i] <= cardResult.card) continue;
					if (last == 0) {
						last = cards[i];
					} else {
						if (cards[i] == (last + 1)) {
							continueIndex++;
							if (continueIndex == (targetCount - 1) && cards[i] != 15) {
								selectCard = cards[i - (targetCount - 1) ];
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
				let targetCount = Math.floor(cardLength / 3);

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
					let excludeArr: Array<number> = [];

					for (let i = 0; i < targetCount; i++) {
						excludeArr.push(selectCard + i);
						chooseCards.push(selectCard + i, selectCard + i, selectCard + i);
					}

					if (cardLength == 8) {
						// 带两张
						let cc: Array<number> = this.getFromHandCards(excludeArr, 2);
						if (cc.length < 2) {
							chooseCards = [];
						} else {
							for (let c of cc) {
								chooseCards.push(c);
							}
						}
					} else if (cardLength == 10) {
						// 带两对
						let cc: Array<number> = this.getAvaliableCards(0, [2, 3, 4], excludeArr);
						if (cc.length < 2) {
							chooseCards = [];
						} else {
							for (let c of cc) {
								chooseCards.push(c, c);
							}
						}
					}
				}

			}

			if (cardResult.cardType == CardType.SHUN_ZI) {
				let cards: number[] = this.getAvaliableCards(cardResult.card, [1, 2, 3, 4], [16, 17]);
				let continueIndex = 0;
				let last = 0;
				let selectCard = 0;
				let targetCount = cardLength;
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
					let singleCard: number = this.getAvaliableCard(0, [2, 3, 4], [selectCard]);
					if (singleCard > 0) {
						chooseCards.push(selectCard, selectCard, selectCard, singleCard, singleCard);
					}
				}
			}

			if (cardResult.cardType == CardType.FOUR_TO_TWO) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [4], [0]);
				let isCardTypeValid: boolean = false;
				if (selectCard > 0) {
					let singleCard: number = this.getAvaliableCard(0, [2, 3, 4], [selectCard]);
					if (singleCard > 0) {
						chooseCards.push(selectCard, selectCard, selectCard, selectCard, singleCard, singleCard);
					}
				}
			}

			if (cardResult.cardType == CardType.FOUR_TO_TWO) {
				let selectCard: number = this.getAvaliableCard(cardResult.card, [4], [0]);
				let isCardTypeValid: boolean = false;
				let c1, c2 = 0;
				if (selectCard > 0) {
					c1 = this.getAvaliableCard(0, [2, 3, 4], [selectCard]);
					c2 = this.getAvaliableCard(0, [2, 3, 4], [selectCard, c1]);
				}
				if (c1 > 0 && c2 > 0) {
					chooseCards.push(selectCard, selectCard, selectCard, selectCard, c1, c1, c2, c2);
				}
			}

			if (cardResult.cardType == CardType.BOMB) {
				let cards: number[] = this.handCardMap.get(cardLength);
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
			} else if (cardResult.cardType == CardType.KING_BOMB) {
				// 没有比王炸更大的牌了
			} else {
				if (chooseCards.length == 0) {
					// 选炸
					let cards: number[] = this.handCardMap.get(4);
					if (cards != undefined && cards != null && cards.length > 0) {
						chooseCards.push(cards[0], cards[0], cards[0], cards[0]);
					} else {
						// 有没有王炸
						if (this.handCardsContainsCard(16) && this.handCardsContainsCard(17)) {
							chooseCards.push(16, 17);
						}
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
	}
}

