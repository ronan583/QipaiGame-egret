module game.zjh {

	export enum ZJHPlayerStatus{
		NO_PLAY = 0,
		ANPAI = 1,
		KANPAI = 2,
		QIPAI = 3,
		SHIBAI = 4
	}

	export class ZJHPlayer{
		public playerId:number;
		public status:ZJHPlayerStatus;
		public costMoney:number;
		public isPay:boolean;
		public isBanker:boolean;
		public isAlways:boolean;
		public totalMoney:number;
		public cardType:number;
		public cards:Array<number>;
		public betsRecord:Array<number>;

		public betType: number;

		public isAllin:boolean = false;

		public isLook: boolean = false;
		
		public addCard(card:any) : void {
			this.cards = new Array<number>();
			if(card != null && card.length != undefined && card.length > 0) {
				for(let i = 0; i < card.length;i++) {
					this.cards.push(card[i]);
				}
			}
		}
	}

	export class ZJHBattleFinishPlayer {
		public playerId:number = 0;//
		public money:number = 0;//玩家信息 玩家剩余的钱
		public isTrusteeship:boolean = false;
	}

	export class BrightCardInfo {
		public targetId:number;
		public card:Array<number> = [];
		public cardType:number = 0;

		public constructor(targetId:number, card:Array<number>,cardType:number) {
			this.targetId = targetId;
			this.card = card;
			this.cardType = cardType;
		}
	}

	export class ZJHBattleFinishData {
		public winPlayerId:number = 0;//赢的玩家id
		public winMoney:number = 0;//赢的钱
		public downTime:number = 0;
		public battleFinishPlayers:Array<ZJHBattleFinishPlayer>;
		public brightCardInfos:Array<BrightCardInfo> = [];
		public winCardInfo:BrightCardInfo = null;
		public selfCardInfo:BrightCardInfo = null;

		//本局是否结束的标识符
		public isBattleFinish: boolean = false;

		public getFinishPlayer(playerId:number):game.zjh.ZJHBattleFinishPlayer {
			for(let i=0;i<this.battleFinishPlayers.length;i++) {
				if(this.battleFinishPlayers[i].playerId == playerId) {
					return this.battleFinishPlayers[i];
				}
			}
			return null;
		}

		public setData(data:any):void {
			let zjhData = ZJHData.getInstance();
			this.winPlayerId = Number(data.winPlayerId);
			this.winMoney = data.winMoney / 1000;
			this.downTime = data.downTime;
			this.brightCardInfos = [];
			this.battleFinishPlayers = new Array<ZJHBattleFinishPlayer>();
			for(let i =0;i < data.brightCardInfo.length;i++) {
				let info = data.brightCardInfo[i];
				let cardInfo = new BrightCardInfo(Number(info.targetId), info.card, info.cardType)
				if(i == 0) {
					this.winCardInfo = cardInfo;
					// this.brightCardInfos.push(cardInfo);
				} else if(i == 1) {
					this.selfCardInfo = cardInfo;
				}else{
					this.brightCardInfos.push(cardInfo);
				}
				let player = zjhData.getPlayerById(info.targetId);
				if(player){
					player.addCard(info.card);
					player.cardType = info.cardType;
				}
			}

			for (let i = 0; i < data.finishInfo.length; i++) {
				let finalPlayer: ZJHBattleFinishPlayer = new ZJHBattleFinishPlayer();
				finalPlayer.playerId = Number(data.finishInfo[i].playerId);
				finalPlayer.money = Number(data.finishInfo[i].money / 1000);
				finalPlayer.isTrusteeship = data.finishInfo[i].isTrusteeship;
				// RoomManager.getInstance().curRoomData.getPlayerInfo(p.playerId).money = p.money;

				this.battleFinishPlayers.push(finalPlayer);
			}
		}
	}

	export class ZJHData {
		private static _instance:ZJHData;
		public static getInstance():ZJHData {
			if(ZJHData._instance == null) {
				ZJHData._instance = new ZJHData();
			}
			return ZJHData._instance;
		}

		public constructor() {
		}

		private _battleFinishData:ZJHBattleFinishData;

		public set BattleFinishData(data:ZJHBattleFinishData) {
			this._battleFinishData = data;
		}
		public get BattleFinishData():ZJHBattleFinishData {
			return this._battleFinishData;
		}

		public setBattleFinishData(data:any):void {
			this._battleFinishData = new ZJHBattleFinishData();
			this._battleFinishData.setData(data);
		}

		public gameType:game.ChildGameType;
		public bottomBet:number;
		public singleBet:number;
		// //实际要扣的钱
		// public realCostBet: number;
		public totalBet:number;
		public currentRound:number = 1;
		public totalRound:number = 20;
		public downTime:number;
		public isAllIn:boolean;
		public zjhPlayers:Array<ZJHPlayer>;

		public clearData():void {
			this.bottomBet = RoomManager.getInstance().curRoomData.bottomBet;
			this.singleBet = 0;
			this.totalBet = 0;
			this.currentRound = 0;
			this.totalRound = 0;
			this.downTime = 0;
			this.isAllIn = false;
			this.zjhPlayers = [];
		}

		public clearDataGame(): void{
			this.isAllIn = false;
		}

		public getCurOperationPlayer():ZJHPlayer {
			if(this.zjhPlayers == null || this.zjhPlayers.length == 0) return null;
			for(let i=0;i<this.zjhPlayers.length;i++) {
				if(this.zjhPlayers[i].isPay) {
					return this.zjhPlayers[i];
				}
			}
			return null;
		}

		public getPlayerById(playerId:number):ZJHPlayer {
			if(this.zjhPlayers == null || this.zjhPlayers.length == 0) return null;
			for(let i=0;i<this.zjhPlayers.length;i++) {
				if(this.zjhPlayers[i].playerId == playerId) {
					return this.zjhPlayers[i];
				}
			}
			return null;
		}

		public getSelfZJHPlayer() : ZJHPlayer {
			if(this.zjhPlayers == null || this.zjhPlayers.length == 0) return null;
			for(let i=0;i<this.zjhPlayers.length;i++) {
				if(UserService.instance.playerId == this.zjhPlayers[i].playerId) {
					return this.zjhPlayers[i];
				}
			}
			return null;
		}

		public hasStart():boolean {
			return this.zjhPlayers != undefined && this.zjhPlayers != null && this.zjhPlayers.length > 0;
		}
		
		public getLeftPlayerCount():number {
			let count = 0;
			for(let player of this.zjhPlayers) {
				if(player.status != game.zjh.ZJHPlayerStatus.QIPAI && player.status != game.zjh.ZJHPlayerStatus.SHIBAI) {
					count++;
				}
			}
			return count;
		}

		//进入游戏/startgame时set（70001,70011）
		public setData(data:any):void {
			this.gameType = data.gameType;
			this.bottomBet = data.bottomBet / 1000;
			this.singleBet = data.singleBet / 1000;
			this.totalBet = data.totalBet / 1000;
			// console.warn("======================setdata");
			// if(this.currentRound < data.totalRound){
			// 	this.currentRound = data.currentRound;
			// } 
			this.currentRound = data.currentRound;
			
			this.totalRound = data.totalRound;
			this.downTime = data.downTime;
			let prevPlayers = this.zjhPlayers;
			this.zjhPlayers = new Array<ZJHPlayer>();
			function getPrevPlayerById(pId:number):ZJHPlayer {
				if(prevPlayers == null) return null;
				for(let i=0;i<prevPlayers.length;i++) {
					if(pId == prevPlayers[i].playerId) {
						return prevPlayers[i];
					}
				}
				return null;
			}
			for(let i=0;i<data.playerBattle.length;i++) {
				let player:ZJHPlayer = new ZJHPlayer();
				
				player.playerId = Number(data.playerBattle[i].playerId);
				let prevPlayer:ZJHPlayer = getPrevPlayerById(player.playerId);
				player.status = data.playerBattle[i].status;
				player.costMoney = data.playerBattle[i].costMoney / 1000;
				player.isPay = data.playerBattle[i].isPay;
				player.totalMoney = data.playerBattle[i].totalMoney / 1000;
				player.isBanker = data.playerBattle[i].isBanker;
				player.isAlways = data.playerBattle[i].isAlways;
				player.cardType = data.playerBattle[i].cardType;
				player.betsRecord = [];
				player.isLook = false;
				//自己下注记录 只有重连给数据
				for(let bet of data.playerBattle[i].betsRecord) {
					player.betsRecord.push(bet / 1000);
				}
				
				player.addCard(data.playerBattle[i].cards);
				
				this.zjhPlayers.push(player);

				if(prevPlayer != null && player.status != prevPlayer.status) {
					// 狀態發生變化
					if(player.status == ZJHPlayerStatus.KANPAI) {
						game.zjh.ZJHSoundPlayer.instance.playSound(player.playerId, zjh.ZJHSoundType.SEE);
					} else if(player.status == ZJHPlayerStatus.QIPAI) {
						game.zjh.ZJHSoundPlayer.instance.playSound(player.playerId, zjh.ZJHSoundType.DROP);
					} else if(player.status == ZJHPlayerStatus.SHIBAI) {
						game.zjh.ZJHSoundPlayer.instance.playSound(player.playerId, zjh.ZJHSoundType.FAIL);
					}
				}
			}
		}

	}
}

