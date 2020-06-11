module game.hhdz {
	export class HhdzData extends MultiPlayerGameData{
		public constructor() {
			super();
		}

		public static bankerUpMoneyLimit:number = 0;
		public bankerList:Array<TbBankerInfo> = [];
		public isSelfBet:boolean = false;
		
		public isSelfBanker():boolean {
			let roomData = RoomManager.getInstance().curRoomData;
			return roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId;
		}

		public setBankerData(data:any) {
			this.bankerList = [];
			for(let d of data) {
				let bankerInfo = TbBankerInfo.valueOf(d);
				this.bankerList.push(bankerInfo);
			}
		}

		public addBankerData(data:any):TbBankerInfo {
			let bankerInfo = TbBankerInfo.valueOf(data);
			this.bankerList.push(bankerInfo);
			return bankerInfo;
		}

		public isSelfInBankerUpList() {
			for(let bankerInfo of this.bankerList) {
				if(bankerInfo.playerId == UserService.instance.playerId) {
					return true;
				}
			}
			return false;
		}

	}
}