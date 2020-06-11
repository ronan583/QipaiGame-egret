
enum LhdzPlayerState {
	ob = 0,
	game
}
class LhdzData extends MultiPlayerGameData {
	private static _instance: LhdzData;
	public static getInstance(): LhdzData {
		if (LhdzData._instance == null) {
			LhdzData._instance = new LhdzData();
		}
		return LhdzData._instance;
	}
	public constructor() {
		super();
	}

	public lhdzPlayers: LhdzPlayer[] = new Array<LhdzPlayer>();
	public bankerId: number = 0;
	public bankerList: Array<TbBankerInfo> = [];
	public static bankerUpMoneyLimit: number = 0;
	public static selfTotolMoney: number = 0;
	public static isSelfStake: Boolean;
	public static resultPlayEnd:boolean = false;
	public addPlayer(playerInfo: game.PlayerInfo) {
		let lhdzPlayer = this.getPlayerByPos(playerInfo.postion);
		if (!lhdzPlayer) {
			lhdzPlayer = new LhdzPlayer();
			this.lhdzPlayers.push(lhdzPlayer);
		}
		lhdzPlayer.playerId = Number(playerInfo.playerId);
		lhdzPlayer.position = playerInfo.postion;
		lhdzPlayer.headNum = playerInfo.headNum;
		lhdzPlayer.headFrameNum = playerInfo.headFrameNum;
		lhdzPlayer.playerName = playerInfo.nickName;
		lhdzPlayer.totolMoney = playerInfo.money;
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
			if (Number(bankerInfo.playerId) == UserService.instance.playerId) {
				return true;
			}
		}
		return false;
	}


	public getPlayerByPos(pos: number): LhdzPlayer {
		for (let player of this.lhdzPlayers) {
			if (player.position == pos) return player;
		}
		return null;
	}

	public getPlayerById(playerId: number) {
		if (this.lhdzPlayers == null || this.lhdzPlayers.length == 0) return null;
		for (let i = 0; i < this.lhdzPlayers.length; i++) {
			if (this.lhdzPlayers[i].playerId == playerId) {
				return this.lhdzPlayers[i];
			}
		}
		return null;
	}
}

class LhdzPlayer {
	public playerId: number;
	public playerName: string;
	// public playerInfo : game.PlayerInfo;
	public isBanker: boolean = false;
	public bankerMultinum: number = 0;
	public betMultiNum: number = 0;
	public isShowCard: boolean = false;
	public isAlway: boolean = false;
	public state: LhdzPlayerState = 1;
	public headNum: number;//头像编号
	public headFrameNum: number;//头像框编号
	public position: number;
	public money: number;
	public totolMoney: number;

	public selfStakeInfos: number[] = [0, 0, 0];

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