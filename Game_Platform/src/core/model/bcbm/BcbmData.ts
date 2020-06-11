enum BcbmPlayerState{
	ob = 0,
	game = 1
}

class BcbmData extends MultiPlayerGameData{
	private static _instance:BcbmData;
	public static getInstance():BcbmData {
		if(BcbmData._instance == null) {
			BcbmData._instance = new BcbmData();
		}
		return BcbmData._instance;
	}
	public constructor() {
		super();
	}

	public bcbmPlayers: BcbmPlayer[] = new Array<BcbmPlayer>();
	public bankerId: number = 0;
	//public bankerList: Array<BcbmPlayer>
	public static bankerUpMoneyLimit: number = 0;
	public addPlayer(playerInfo: game.PlayerInfo){
		let bcbmPlayer = this.getPlayerByPos(playerInfo.postion);
		if(!bcbmPlayer){
			bcbmPlayer = new BcbmPlayer();
			this.bcbmPlayers.push(bcbmPlayer);
		}
		bcbmPlayer.playerId = Number(playerInfo.playerId);
		bcbmPlayer.position = playerInfo.postion;
		bcbmPlayer.headNum = playerInfo.headNum;
		bcbmPlayer.headFrameNum = playerInfo.headFrameNum;
		bcbmPlayer.playerName = playerInfo.nickName;
		bcbmPlayer.totalMoney = playerInfo.money;
		//need push?
	}

	

	public isSelfBanker():boolean{
		let roomData = game.RoomManager.getInstance().curRoomData;
		return roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId;
	}

	public setBankerData(data: any){
		// this.bankerList = [];
		for(let d of data){
			// let bankerInfo = TbBankerInfo.valueOf(d);
			// this.bankerList.push(bankerInfo);
		}
	}

	public addBankerData(data: any){
		// let bankerInfo = TbBankerInfo.valueOf(data);
		// this.bankerList.push(bankerInfo);
	}

	public isSelfInBankerUpList(){
		
	}

	public getPlayerByPos(pos: number): BcbmPlayer{
		for(let player of this.bcbmPlayers){
			if(player.position == pos) return player;
		}
		//console.warn("can't get player by position");
		return null;
	}

	public getPlayerById(playerId: number) {
		if (this.bcbmPlayers == null || this.bcbmPlayers.length == 0) return null;
		for (let i = 0; i < this.bcbmPlayers.length; i++) {
			if (this.bcbmPlayers[i].playerId == playerId) {
				return this.bcbmPlayers[i];
			}
		}
		return null;
	}
}

class BcbmPlayer{
	public playerId: number;
	public playerName: string;
	public isBanker: boolean;
	public bankerMultiNum: number;
	public betMutiNum: number;
	public isAlways: boolean;
	public state: BcbmPlayerState = 1;
	public headNum:  number;
	public headFrameNum: number;
	public position: number;
	public money: number;
	public totalMoney: number;

	public selfStakeInfos: number[];//?

	public addStakeInfo(){

	}

	public getStakeByType(){

	}

	public getTotalStake(){

	}
}