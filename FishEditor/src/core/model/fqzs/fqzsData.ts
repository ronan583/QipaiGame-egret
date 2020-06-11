
enum FqzsPlayerState {
	ob = 0,
	game
}
class FqzsData extends MultiPlayerGameData {
	private static _instance: FqzsData;
	public static getInstance(): FqzsData {
		if (FqzsData._instance == null) {
			FqzsData._instance = new FqzsData();
		}
		return FqzsData._instance;
	}
	public constructor() {
		super();
	}

	public fqzsPlayers: FqzsPlayer[] = new Array<FqzsPlayer>();
	public bankerId: number = 0;
	public bankerList: Array<TbBankerInfo> = [];
	public static bankerUpMoneyLimit: number = 0;
	public static isSelfStake: Boolean;
	public addPlayer(playerInfo: game.PlayerInfo) {
		let fqzsPlayer = this.getPlayerByPos(playerInfo.postion);
		if (!fqzsPlayer) {
			fqzsPlayer = new FqzsPlayer();
			this.fqzsPlayers.push(fqzsPlayer);
		}
		fqzsPlayer.playerId = Number(playerInfo.playerId);
		fqzsPlayer.position = playerInfo.postion;
		fqzsPlayer.headNum = playerInfo.headNum;
		fqzsPlayer.headFrameNum = playerInfo.headFrameNum;
		fqzsPlayer.playerName = playerInfo.nickName;
		fqzsPlayer.totolMoney = playerInfo.money;
	}


	public static isSelfBanker(): boolean {
		let roomData = game.RoomManager.getInstance().curRoomData;
		return roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId;
	}

	public setBankerData(data: any) {
		this.bankerList = [];
		for (let d of data) {
			let bankerInfo = TbBankerInfo.valueOf(d);
			this.bankerList.push(bankerInfo);
		}
	}

	public addBankerData(data: any) {
		let bankerInfo = TbBankerInfo.valueOf(data);
		this.bankerList.push(bankerInfo);
	}

	public isSelfInBankerUpList() {
		for (let bankerInfo of this.bankerList) {
			if (bankerInfo.playerId == UserService.instance.playerId) {
				return true;
			}
		}
		return false;
	}


	public getPlayerByPos(pos: number): FqzsPlayer {
		for (let player of this.fqzsPlayers) {
			if (player.position == pos) return player;
		}
		return null;
	}

	public getPlayerById(playerId: number) {
		if (this.fqzsPlayers == null || this.fqzsPlayers.length == 0) return null;
		for (let i = 0; i < this.fqzsPlayers.length; i++) {
			if (this.fqzsPlayers[i].playerId == playerId) {
				return this.fqzsPlayers[i];
			}
		}
		return null;
	}
}

class FqzsPlayer {
	public playerId: number;
	public playerName: string;
	// public playerInfo : game.PlayerInfo;
	public isBanker: boolean = false;
	public bankerMultinum: number = 0;
	public betMultiNum: number = 0;
	public isShowCard: boolean = false;
	public isAlway: boolean = false;
	public state: FqzsPlayerState = 1;
	public headNum: number;//头像编号
	public headFrameNum: number;//头像框编号
	public position: number;
	public money: number;
	public totolMoney: number;

	public selfStakeInfos: number[] = [0, 0, 0, 0];

	public addStakeInfo(type: number, value: number) {
		this.selfStakeInfos[type - 1] += value;
		this.totolMoney -= value;
		this.totolMoney = Math.max(0, this.totolMoney);
	}

	public getStakeByType(type): number {
		return this.selfStakeInfos[type - 1];
	}

	public getTotalStake(): number {
		return this.selfStakeInfos[0] + this.selfStakeInfos[1] + this.selfStakeInfos[2] + this.selfStakeInfos[3];
	}
}