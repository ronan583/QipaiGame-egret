
enum TBPlayerState {
	ob = 0,
	game
}

class TbBankerInfo {
	public type: number;
	public playerId: number;
	public applyBankerName: string;

	public static valueOf(data): TbBankerInfo {
		let bankerInfo = new TbBankerInfo();
		let d = data;
		if (data.bankerInfos) {
			d = data.bankerInfos
		}
		bankerInfo.type = d.type;
		bankerInfo.playerId = Number(d.playerId);
		bankerInfo.applyBankerName = d.applyBankerName;
		return bankerInfo;
	}
}

class TbData extends MultiPlayerGameData {
	public constructor() {
		super();
	}

	public tbPlayers: TbPlayer[] = new Array<TbPlayer>();
	public bankerId: number = 0;
	private betCacheMap: HashMap = new HashMap();
	private selfBetCacheMap: HashMap = new HashMap();
	public bankerList: Array<TbBankerInfo> = [];
	public static bankerUpMoneyLimit: number = 0;
	public isSelfBet: boolean = false;
	// 这个里面只会存在庄家和自己，所以add的时候注意已有的数据庄家是否已经有了 要替换信息
	public addPlayer(playerInfo: game.PlayerInfo) {
		let tbPlayer = this.getPlayerByPos(playerInfo.postion);
		if (!tbPlayer) {
			tbPlayer = new TbPlayer();
			this.tbPlayers.push(tbPlayer);
		}
		tbPlayer.playerId = Number(playerInfo.playerId);
		tbPlayer.position = playerInfo.postion;
		tbPlayer.headNum = playerInfo.headNum;
		tbPlayer.headFrameNum = playerInfo.headFrameNum;
		tbPlayer.playerName = playerInfo.nickName;
		tbPlayer.totolMoney = playerInfo.money;
	}

	public isSelfBanker(): boolean {
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
		return bankerInfo;
	}

	public isSelfInBankerUpList() {
		for (let bankerInfo of this.bankerList) {
			if (bankerInfo.playerId == UserService.instance.playerId) {
				return true;
			}
		}
		return false;
	}

	public initFromRoomData() {
		let roomData = game.RoomManager.getInstance().curRoomData;
		for (let playerInfo of roomData.playerInfos) {
			if (playerInfo == null) {
				continue;
			}
			this.addPlayer(playerInfo);
			this.getPlayerById(playerInfo.playerId).state = TBPlayerState.game;
		}
	}

	public getPlayerByPos(pos: number): TbPlayer {
		for (let player of this.tbPlayers) {
			if (player.position == pos) return player;
		}
		return null;
	}

	public getPlayerById(playerId: number) {
		if (this.tbPlayers == null || this.tbPlayers.length == 0) return null;
		for (let i = 0; i < this.tbPlayers.length; i++) {
			if (this.tbPlayers[i].playerId == playerId) {
				return this.tbPlayers[i];
			}
		}
		return null;
	}

	public addBetValue(betType: number, betValue: number) {
		let k = "bet" + betType
		if (this.betCacheMap.contains(k)) {
			let v = this.betCacheMap.get(k);
			this.betCacheMap.put(k, v + betValue);
		} else {
			this.betCacheMap.put(k, betValue);
		}
	}

	public addSelfBetValue(betType: number, betValue: number) {
		let k = "bet" + betType
		if (this.selfBetCacheMap.contains(k)) {
			let v = this.selfBetCacheMap.get(k);
			this.selfBetCacheMap.put(k, v + betValue);
		} else {
			this.selfBetCacheMap.put(k, betValue);
		}
	}

	public getTotalBetValue(betType: number): number {
		let k = "bet" + betType
		if (this.betCacheMap.contains(k)) {
			return this.betCacheMap.get(k);
		}
		return 0;
	}

	public getSelfBetValue(betType: number): number {
		let k = "bet" + betType
		if (this.selfBetCacheMap.contains(k)) {
			return this.selfBetCacheMap.get(k);
		}
		return 0;
	}

	public checkBankerList() {
		let roomData = game.RoomManager.getInstance().curRoomData;
		let firstPlayer = roomData.getPlayerInfoByPos(0);
		if (!firstPlayer) return;
		let bankerid = firstPlayer.playerId;
		let removeId = -1;
		for (let i = 0; i < this.bankerList.length; i++) {
			if (this.bankerList[i].playerId == bankerid) {
				removeId = i;
				break;
			}
		}
		if (removeId >= 0) {
			this.bankerList.splice(removeId, 1);
		}
	}
}
class TbPlayer {

	public playerId: number;
	public playerName: string;
	// public playerInfo : game.PlayerInfo;
	public isBanker: boolean = false;
	public bankerMultinum: number = 0;
	public betMultiNum: number = 0;
	public isShowCard: boolean = false;
	public isAlway: boolean = false;
	public state: TBPlayerState = 1;
	public headNum: number;//头像编号
	public headFrameNum: number;//头像框编号
	public position: number;
	public money: number;
	public totolMoney: number;

	public selfStakeInfos: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	public addStakeInfo(type: number, value: number) {
		this.selfStakeInfos[type - 1] += value;
		this.totolMoney -= value;
		this.totolMoney = Math.max(0, this.totolMoney);
	}

	public getStakeByType(type): number {
		return this.selfStakeInfos[type - 1];
	}

	public getTotalStake(): number {
		return this.selfStakeInfos[0] + this.selfStakeInfos[1] + this.selfStakeInfos[2] + this.selfStakeInfos[3] +
			this.selfStakeInfos[4] + this.selfStakeInfos[5] + this.selfStakeInfos[6] + this.selfStakeInfos[7] +
			this.selfStakeInfos[8] + this.selfStakeInfos[9] + this.selfStakeInfos[10] + this.selfStakeInfos[11] +
			this.selfStakeInfos[12] + this.selfStakeInfos[13] + this.selfStakeInfos[14] + this.selfStakeInfos[15] + this.selfStakeInfos[16];
	}
}