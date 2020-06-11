module game {

	export enum GameStatus {
		PREPARE = 1, 	//准备
		RUNNING = 2, 	//游戏中
		END_BEGIN = 3,	//开始结算
		ENDED = 4,		//结算
	}

	export class PlayerInfo {
		public headNum: number;//头像编号
		public headFrameNum: number;//头像框编号
		public nickName: string;//昵称
		public vipLevel: number;//vip等级
		public isReady: boolean;//vip等级
		public get money(): number{
			return this._money;	
		}
		public set money(value:number) {
			this._money = value;
		}

		private _money:number;

		public postion: number;//位置
		public playerId: number;//玩家id
		public city: string = "未知";
	}

	export class RoomData {
		public constructor() {
		}

		public gameType: game.ChildGameType;
		public status: GameStatus;
		public gameLevel: number;
		public downTime: number;
		public bottomBet: number;
		public playerInfos: Array<PlayerInfo>;
		public enterMinMoney:number;
		public onlineCount : number;//在线人数

		public getPlayerInfo(playerId: number): PlayerInfo {
			for (let i = 0; i < this.playerInfos.length; i++) {
				if (this.playerInfos[i].playerId == playerId) {
					return this.playerInfos[i];
				}
			}
			return null;
		}

		public getPlayerInfoByPos(position: number): PlayerInfo {
			for (let i = 0; i < this.playerInfos.length; i++) {
				if (this.playerInfos[i].postion == position) {
					return this.playerInfos[i];
				}
			}
			return null;
		}

		public setData(data: any): void {
			this.gameType = data.gameType;
			this.status = data.status;
			this.gameLevel = data.gameLevel;
			this.downTime = data.downTime;
			this.bottomBet = data.bottomBet / 1000;
			this.playerInfos = new Array<PlayerInfo>();
			this.enterMinMoney = data.enterMinMoney / 1000;
			this.onlineCount = data.onlineCount;
			let pArr = data.playerInfo;
			for (let i = 0; i < pArr.length; i++) {
				let pInfo: PlayerInfo = new PlayerInfo();
				pInfo.headNum = pArr[i].headNum;
				pInfo.headFrameNum = pArr[i].headFrameNum;
				pInfo.nickName = pArr[i].nickName;
				pInfo.vipLevel = pArr[i].vipLevel;
				pInfo.money = pArr[i].money / 1000;
				pInfo.postion = pArr[i].postion;
				pInfo.playerId = Number(pArr[i].playerId);
				pInfo.city = pArr[i].city;
				pInfo.isReady = pArr[i].isReady;
				this.playerInfos.push(pInfo);
			}
			this.playerInfos = this.playerInfos.sort((p1: PlayerInfo, p2: PlayerInfo) => {
				return p1.postion - p2.postion;
			});
		}
	}

	export class RoomManager {
		public constructor() {
		}
		private static _instance: RoomManager;
		public static getInstance(): RoomManager {
			if (RoomManager._instance == null) {
				RoomManager._instance = new RoomManager();
			}
			return RoomManager._instance;
		}

		public curRoomData: RoomData;
		public bjlWinFailsData : any = null;

		public setRoomData(roomData: any) {
			this.curRoomData = new RoomData();
			this.curRoomData.setData(roomData);
		}
	}
}
