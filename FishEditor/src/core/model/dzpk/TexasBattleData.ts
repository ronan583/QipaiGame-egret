module game.dzpk {
	export enum PlayType {
		WATCH = 0,// 观澜模式
		PLAYING = 1,// 游戏中
	}

	export enum RefreshReason {
		ON_START,
		ON_STEP
	}

	export class StakeType {
		public static NONE: number = 0x00000000;
		public static DISCARD: number = 1 << 1;
		public static PASS = 1 << 2;
		public static FOLLOW = 1 << 3;
		public static ADD = 1 << 4;
		public static ALL_IN = 1 << 5;
		public static DAMANG_THREE = 1 << 6;
		public static DAMANG_FOUR = 1 << 7;
		public static BET_BOTTOM = 1 << 8;
		public static BET_BOTTOM1 = 1 << 9;
		public static BET_BOTTOM2 = 1 << 10;
	}

	export enum TexasCardType {
		NONE = -1,
		GAO_PAI = 0, // 高牌
		DUI = 1, // 对
		SHUANG_DUI = 2, // 双对
		SAN = 3, // 三张
		SHUN = 4, // 顺
		TONG_HUA = 5, // 同花
		HULU = 6, // 葫芦
		JIN_GANG = 7, // 4张
		TONG_HUA_SHUN = 8, // 同花顺
		MAX_TONG_HUA_SHUN = 9,// 皇家同花顺
	}

	export class TexasPlayer {
		public playerId: number;//玩家id
		public cards: Array<number>;//玩家牌
		public bet: number;//下注值 只有大盲 小盲者有值 其他为0
		public playType: PlayType = PlayType.PLAYING;
		public money: number;
		public position;
	}

	export class TexasFinishPlayer {
		public playerId: number;
		public costMoney: number;
		public totalMoney: number;
		public cards: Array<number>;
		public handCards: Array<number>;
	}

	export class TexasWinPlayer {
		public winPlayerId: number;
		public winType: TexasCardType;
	}

	export class TexasBattleFinishData {
		public winPlayerInfos: Array<TexasWinPlayer>;
		public playerInfos: Array<TexasFinishPlayer>;
		public leftTime: number;
		public leftEndTime: number;

		public isWin(playerId:number):boolean {
			for(let winplayer of this.winPlayerInfos){
				if(winplayer.winPlayerId == playerId) {
					return true;
				}
			}
			return false;
		}

		public getPlayer(playerId: number): TexasFinishPlayer {
			for (let finishPlayer of this.playerInfos) {
				if (finishPlayer.playerId == playerId) {
					return finishPlayer;
				}
			}
			return null;
		}
	}

	export class TexasBattleData {
		private static _instance: TexasBattleData;
		public static getInstance(): TexasBattleData {
			if (TexasBattleData._instance == null) {
				TexasBattleData._instance = new TexasBattleData();
			}
			return TexasBattleData._instance;
		}

		public constructor() {
		}

		public texasFinishData: TexasBattleFinishData;

		public players: Array<TexasPlayer> = [];
		// 庄家Id
		public bankerPlayerId: number = 0;
		// 公共牌数组
		public publicCards: Array<number> = [];
		// 当前操作玩家
		public currentOperatorId: number = 0;
		// 倒计时
		public set downTime(v: number) {
			this._downTime = v;
			this._setdowntime = new Date().getTime();
		}
		public get clientDownTime() { 
			egret.log("原始的倒计时： " + this._downTime + "   客户端走过的时间:" + (new Date().getTime() - this._setdowntime))
			return this._downTime - (new Date().getTime() - this._setdowntime) / 1000;
		}
		private _downTime:number;
		private _setdowntime:number;
		// 排池里面的钱
		public cardPoolMoney: Array<number>;

		public totalPoolMoney: number;
		// 当前回合（圈）
		public round: number;
		// 当前可以操作的类型
		public currentOperatorType: number;

		public followValue: number;

		public selfCardType: TexasCardType = TexasCardType.NONE;

		public curStakeId: number = 0;
		public curStakeMoney: number = 0;

		public autoOperationType: number = 0;

		public isSelfDrop: boolean;

		public dropCompleteTime:number = 0;

		private _isSelfAllin: boolean;

		public isStart: boolean = false;

		public clearData(): void {
			this.players = [];
			this.bankerPlayerId = 0;
			this.publicCards = [];
			this.currentOperatorId = 0;
			this.downTime = 0;
			this.cardPoolMoney = [];
			this.totalPoolMoney = 0;
			this.round = 0;
			this.currentOperatorType = 0;
			this.followValue = 0;
			this.selfCardType = TexasCardType.NONE;
			this.curStakeId = 0;
			this.curStakeMoney = 0;
			this.autoOperationType = 0;
			this.isSelfDrop = false;
			this._isSelfAllin = false;
			this.isStart = false;
			this.dropCompleteTime = 0;
		}

		public setData(data: any): void {

		}

		/**
		 * 设置开始游戏的数据
		 */
		public setBattleStart(data: any): void {
			this.players = [];
			this.isStart = true;
			for (let i = 0; i < data.playerInfo.length; i++) {
				let playerInfo: TexasPlayer = new TexasPlayer();
				playerInfo.playerId = Number(data.playerInfo[i].playerId);
				playerInfo.playType = data.playerInfo[i].type;
				playerInfo.bet = data.playerInfo[i].bet / 1000;
				playerInfo.money = data.playerInfo[i].money / 1000;
				playerInfo.position = game.RoomManager.getInstance().curRoomData.getPlayerInfo(playerInfo.playerId).postion;
				if (playerInfo.playerId == game.UserService.instance.playerId) {
					playerInfo.cards = data.myCards;
					this.selfCardType = data.playerInfo[i].cardType;
				}
				this.players.push(playerInfo);
			}
			this.players.sort((p1:TexasPlayer, p2:TexasPlayer):number=>{
				return p1.position - p2.position;
			});
			this.bankerPlayerId = Number(data.bankerPlayerId);
			this.currentOperatorId = Number(data.currentOperatorId);
			this.currentOperatorType = Number(data.currentOperatorType);
			this.downTime = data.downTime;

			this.cardPoolMoney = [];
			for (let money of data.cardPoolMoney) {
				this.cardPoolMoney.push(money / 1000);
			}
			this.totalPoolMoney = data.totalPoolMoney / 1000;
			this.round = data.round;
			this.autoOperationType = 0;
			this.curStakeMoney = data.stakeMoney / 1000;
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_BET_ON_INIT);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_PLAYER_MONEY);
		}

		public getDamangPlayer(): TexasPlayer {
			if (this.bankerPlayerId == 0) return null;
			var activePlayers: Array<TexasPlayer> = [];
			for (let player of this.players) {
				if (player.playType == PlayType.PLAYING) {
					activePlayers.push(player);
					player.position = game.RoomManager.getInstance().curRoomData.getPlayerInfo(player.playerId).postion;
				}
			}
			activePlayers.sort((a: TexasPlayer, b: TexasPlayer) => { return b.position - a.position; });
			var bankerIndex: number = 0;
			for (var i = 0; i < activePlayers.length; i++) {
				if (activePlayers[i].playerId == this.bankerPlayerId) {
					bankerIndex = i;
					break;
				}
			}
			if (activePlayers.length == 2) {
				// 只有两个人的情况下
				for (let player of activePlayers) {
					if (player.playerId != this.bankerPlayerId) {
						return player;
					}
				}
			} else {
				if (bankerIndex >= 2) {
					return activePlayers[bankerIndex - 2];
				} else {
					return activePlayers[activePlayers.length - 2 + bankerIndex];
				}
			}
		}

		public getLastPlayer(): TexasPlayer {
			var activePlayers: Array<TexasPlayer> = [];
			for (let player of this.players) {
				if (player.playType == PlayType.PLAYING) {
					activePlayers.push(player);
					player.position = game.RoomManager.getInstance().curRoomData.getPlayerInfo(player.playerId).postion;
				}
			}
			activePlayers.sort((a: TexasPlayer, b: TexasPlayer) => { return b.position - a.position; });
			for (var i = 0; i < activePlayers.length; i++) {
				if (activePlayers[i].playerId == game.UserService.instance.playerId) {
					if (i == (activePlayers.length - 1)) {
						return activePlayers[0];
					} else {
						return activePlayers[i + 1];
					}
				}
			}
			return null;
		}

		public getSelfFollowBet(): number {
			/*
			let lastPlayerId:number = this.getLastPlayer().playerId;
			let player:TexasPlayer = this.getPlayer(lastPlayerId);
			if(player != null) {
				let followBet:number = player.bet - this.getPlayer(UserService.instance.playerId).bet;
				return followBet == 0 ? game.RoomManager.getInstance().curRoomData.bottomBet : followBet;
			}
			*/
			return this.curStakeMoney;
		}

		public getSelfFollowBetWithClient(): number {
			if (this.getLastPlayer()) {
				let lastPlayerId: number = this.getLastPlayer().playerId;
				let player: TexasPlayer = this.getPlayer(lastPlayerId);
				if (player != null) {
					let followBet: number = Math.abs(player.bet - this.getPlayer(UserService.instance.playerId).bet);
					return followBet == 0 ? game.RoomManager.getInstance().curRoomData.bottomBet : followBet;
				}
			}
			return 0;
		}

		public setEnterData(data: any): void {
			this.players = [];
			this.isStart = true;
			for (let i = 0; i < data.playerInfo.length; i++) {
				let playerInfo: TexasPlayer = new TexasPlayer();
				playerInfo.playerId = Number(data.playerInfo[i].playerId);
				playerInfo.playType = data.playerInfo[i].type;
				playerInfo.bet = data.playerInfo[i].bet / 1000;
				playerInfo.cards = data.playerInfo[i].cards;
				playerInfo.money = data.playerInfo[i].money / 1000;

				playerInfo.position = game.RoomManager.getInstance().curRoomData.getPlayerInfo(playerInfo.playerId).postion;

				if (playerInfo.playerId == game.UserService.instance.playerId) {
					playerInfo.cards = data.handCards;
					this.isSelfDrop = data.playerInfo[i].type == 2;
					this._isSelfAllin = data.playerInfo[i].type == 3;
				}
				this.players.push(playerInfo);
			}

			this.bankerPlayerId = Number(data.bankerPlayerId);
			this.publicCards = data.publicCards;
			this.currentOperatorId = Number(data.currentOperatorId);
			this.currentOperatorType = data.currentOperatorType;
			this.downTime = data.downTime;

			this.cardPoolMoney = [];
			for (let money of data.cardPoolMoney) {
				this.cardPoolMoney.push(money / 1000);
			}
			this.totalPoolMoney = data.totalPoolMoney / 1000;
			this.round = data.round;
			this.curStakeMoney = data.stakeMoney / 1000;

			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_CHANGE_CLOCK);
		}

		public setDealCards(data: any): void {
			var addList: Array<number> = [];
			for (let card of data.cards) {
				if (this.publicCards.indexOf(card) < 0) {
					addList.push(card);
				}
			}
			this.selfCardType = data.cardType;
			console.log('setDealCards === ', data.cardType);
			this.publicCards = data.cards;
			this.autoOperationType = 0;// 重置自动选择的选项
			this.currentOperatorId = data.currentOperatorId;
			this.currentOperatorType = data.currentOperatorType;
			this.downTime = data.downTime;

			var originCardPoolMoney: Array<number> = this.cardPoolMoney;
			this.cardPoolMoney = [];
			for (let money of data.cardPoolMoney) {
				this.cardPoolMoney.push(money / 1000);
			}
			this.totalPoolMoney = data.totalPoolMoney / 1000;

			game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_CHIPS);

			this.round = data.round;
			// 发牌的时候清除已有投注额
			for (let player of this.players) {
				player.bet = 0;
			}

			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_SHOW_PUBLIC_CARDS, addList);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_OPERATION_BAR);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_SHOW_CARD_TYPE);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_SHOW_BET);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_CHANGE_CLOCK);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_AUTO_RESET);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_CLEAR_PLAYER_OPER);
		}

		public setPlayStepData(data: any): void {
			this.curStakeId = data.stakePlayerId;
			this.curStakeMoney = data.stakeMoney / 1000;
			this.currentOperatorId = data.currentOperatorId;
			this.currentOperatorType = data.currentOperatorType;
			this.downTime = data.downTime;

			this.totalPoolMoney = data.totalPoolMoney / 1000;

			for (let betData of data.currentMoneys) {
				let playerId: number = Number(betData.playerId);
				let bet: number = betData.currentBets;
				var player: TexasPlayer = this.getPlayer(playerId);
				if (!player) continue;
				player.bet = bet / 1000;
				player.money = betData.money / 1000;
			}

			if (data.stakeType == StakeType.DISCARD) {
				if (data.stakePlayerId == game.UserService.instance.playerId) {
					this.isSelfDrop = true;
					AppFacade.getInstance().sendNotification(PanelNotify.DZPK_SELF_CARDS_DROP);
				} else {
					AppFacade.getInstance().sendNotification(PanelNotify.DZPK_OTHERS_CARDS_DROP, data.stakePlayerId);
				}
				this.dropCompleteTime = egret.getTimer() + 700;
			}
			if (data.stakeType == StakeType.ALL_IN) {
				if (data.stakePlayerId == game.UserService.instance.playerId) {
					this._isSelfAllin = true;
				}
			}

			if (data.stakeType == StakeType.PASS) {
				AppFacade.getInstance().sendNotification(PanelNotify.DZPK_PLAY_PASS_ANIM, data);
			}

			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_SHOW_SINGLE_BET, data);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_OPERATION_BAR, data);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_TOTAL_BET);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_REFRESH_PLAYER_MONEY);
			AppFacade.getInstance().sendNotification(PanelNotify.DZPK_CHANGE_CLOCK);
			if (data.stakeType == StakeType.ADD || data.stakeType == StakeType.BET_BOTTOM
				|| data.stakeType == StakeType.BET_BOTTOM2 || data.stakeType == StakeType.BET_BOTTOM1
				|| data.stakeType == StakeType.DAMANG_FOUR || data.stakeType == StakeType.DAMANG_THREE) {
				game.dzpk.DZPKSoundPlayer.instance.playVoice(data.stakePlayerId, game.dzpk.DZPKVoiceType.RAISE);
			} else if (data.stakeType == StakeType.FOLLOW) {
				game.dzpk.DZPKSoundPlayer.instance.playVoice(data.stakePlayerId, game.dzpk.DZPKVoiceType.FOLLOW);
			} else if (data.stakeType == StakeType.PASS) {
				game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.PASS_NEXT);
			} else if (data.stakeType == StakeType.DISCARD) {
				game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.DROP_CARD);
				game.dzpk.DZPKSoundPlayer.instance.playVoice(data.stakePlayerId, game.dzpk.DZPKVoiceType.DROP_CARD);
			} else if (data.stakeType == StakeType.ALL_IN) {
				game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.ALL_IN);
				game.dzpk.DZPKSoundPlayer.instance.playVoice(data.stakePlayerId, game.dzpk.DZPKVoiceType.ALL_IN);
			}
		}

		public getPlayer(playerId: number): TexasPlayer {
			for (let player of this.players) {
				if (player.playerId == playerId) {
					return player;
				}
			}
			return null;
		}

		public setFinishData(data: any): void {
			this.isStart = false;
			this.texasFinishData = new TexasBattleFinishData();
			this.texasFinishData.playerInfos = [];
			this.texasFinishData.winPlayerInfos = [];
			this.texasFinishData.leftTime = data.downTime;
			let curTime = egret.getTimer();
			this.texasFinishData.leftEndTime = data.downTime * 1000 + curTime;
			for (let playerInfo of data.playerInfos) {
				let finishPlayer: TexasFinishPlayer = new TexasFinishPlayer();
				finishPlayer.playerId = Number(playerInfo.playerId);
				finishPlayer.costMoney = playerInfo.costMoney / 1000;
				egret.log("server push finish : " + playerInfo.playerId + "   " + playerInfo.costMoney);
				finishPlayer.totalMoney = playerInfo.totalMoney / 1000;
				finishPlayer.cards = playerInfo.cards;
				finishPlayer.handCards = playerInfo.handCards;
				this.texasFinishData.playerInfos.push(finishPlayer);
			}
			for (let winPlayerData of data.winPlayerInfos) {
				let winPlayer: TexasWinPlayer = new TexasWinPlayer();
				winPlayer.winPlayerId = Number(winPlayerData.winPlayerId);
				winPlayer.winType = winPlayerData.winType;
				this.texasFinishData.winPlayerInfos.push(winPlayer);
			}
			if(curTime < this.dropCompleteTime) {
				CommonUtil.registerTimeOut(()=>{
					AppFacade.getInstance().sendNotification(PanelNotify.DZPK_BATTLE_END);
				}, this, this.dropCompleteTime - curTime);
			} else {
				AppFacade.getInstance().sendNotification(PanelNotify.DZPK_BATTLE_END);
			}
		}

		public isSelfAllin(): boolean {
			let player: TexasPlayer = this.getPlayer(game.UserService.instance.playerId);
			if (player == null) return this._isSelfAllin;
			return this._isSelfAllin || (this.currentOperatorType == 0 && player.money == 0);
		}

	}
}

