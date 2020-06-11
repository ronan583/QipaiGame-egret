enum BRNNPlayerState
{
	ob = 0,
	game
}

enum BrnnStatus {
	PREPARE = 0,
	START = 1,
	STOP = 2
}


class BrnnBankerInfo {
	public type:number;
	public playerId:number;
	public applyBankerName:string;

	public static valueOf(data):BrnnBankerInfo {
		let bankerInfo = new BrnnBankerInfo();
		let d = data.bankerInfos;
		bankerInfo.type = d.type;
		bankerInfo.playerId = Number(d.playerId);
		bankerInfo.applyBankerName = d.applyBankerName;
		return bankerInfo;
	}
}

class BrnnData extends MultiPlayerGameData {
	public constructor() {
		super();
	}
	public brnnPlayers : BrnnPlayer[] = new Array<BrnnPlayer>();
	public bankerId : number = 0;
	public static bankerUpMoneyLimit:number = 0;
	public bankerList:Array<TbBankerInfo> = [];
	public frozenMoney:number = 0;
	public isSelfBet:boolean = false;
	public addFrozenMoney(v:number) {
		this.frozenMoney += v;
	}
	public setForzenMoney(v:number) {
		this.frozenMoney = v;
	}
	public addPlayer(playerInfo : game.PlayerInfo)
	{
		let brnnPlayer = this.getPlayerByPos(playerInfo.postion);
		if(!brnnPlayer) brnnPlayer = new BrnnPlayer();
		brnnPlayer.playerId = Number(playerInfo.playerId);
		brnnPlayer.position = playerInfo.postion;
		brnnPlayer.headNum = playerInfo.headNum;
		brnnPlayer.headFrameNum = playerInfo.headFrameNum;
		brnnPlayer.playerName = playerInfo.nickName;
		brnnPlayer.totolMoney = playerInfo.money;
		this.brnnPlayers.push(brnnPlayer);
	}
	public setBanker(playerId : number)
	{
		this.bankerId = Number(playerId);
		for(let i=0;i<this.brnnPlayers.length;i++) {
			if(this.brnnPlayers[i].playerId == this.bankerId) {
				this.brnnPlayers[i].isBanker = true;
			}
		}
	}
	public getBankerId()
	{
		return this.bankerId;
	}
	public getPlayerById(playerId : number)
	{
		if(this.brnnPlayers == null || this.brnnPlayers.length == 0) return null;
			for(let i=0;i<this.brnnPlayers.length;i++) {
				if(this.brnnPlayers[i].playerId == playerId) {
					return this.brnnPlayers[i];
				}
			}
			return null;
	}

	public getPlayerByPos(pos:number):BrnnPlayer {
		for(let player of this.brnnPlayers) {
			if(player.position == pos) return player;
		}
		return null;
	}

	public isSelfBanker():boolean {
		let roomData = game.RoomManager.getInstance().curRoomData;
		if(!roomData) return false;
		return roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId;
	}

	public setBankerData(data:any) {
		this.bankerList = [];
		for(let d of data) {
			let bankerInfo = TbBankerInfo.valueOf(d);
			this.bankerList.push(bankerInfo);
		}
	}

	public getBankerPlayer(playerId:number) : TbBankerInfo {
		for(let bankerInfo of this.bankerList) {
			if(bankerInfo.playerId == playerId) return bankerInfo;
		}
		return null;
	}

	public addBankerData(data:any):TbBankerInfo {
		let bankerInfo = TbBankerInfo.valueOf(data);
		if(!this.getBankerPlayer(bankerInfo.playerId)) {
			this.bankerList.push(bankerInfo);
		}
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

	public checkBankerList() {
		let roomData = game.RoomManager.getInstance().curRoomData;
		let firstPlayer = roomData.getPlayerInfoByPos(0);
		if(!firstPlayer) return;
		let bankerid = firstPlayer.playerId;
		let removeId = -1;
		for(let i=0;i<this.bankerList.length;i++) {
			if(this.bankerList[i].playerId == bankerid) {
				removeId = i;
				break;
			}
		}
		if(removeId >= 0) {
			this.bankerList.splice(removeId, 1);
		}
	}

}
class BrnnPlayer
{

		public playerId:number;
		public playerName : string;
		// public playerInfo : game.PlayerInfo;
		public isBanker : boolean = false;
		public bankerMultinum : number = 0; 
		public betMultiNum : number = 0;
		public isShowCard : boolean = false;
		public isAlway : boolean = false;
		public state : BRNNPlayerState = 1;
		public headNum:number;//头像编号
		public headFrameNum :number;//头像框编号
		public position : number;
		public money : number;
		public totolMoney : number;
		
		public selfStakeInfos : number[] = [0,0,0,0];

		public addStakeInfo(type : number , value : number)
		{
			this.selfStakeInfos[type-1] += value;
			this.totolMoney -= value;
			this.totolMoney = Math.max(0 , this.totolMoney);
		}

		public getStakeByType(type) : number
		{
			return this.selfStakeInfos[type-1];
		}

		public getTotalStake() : number
		{
			return this.selfStakeInfos[0] + this.selfStakeInfos[1] + this.selfStakeInfos[2] +this.selfStakeInfos[3];
		}
}

class BrnnRoundResultItem {
	public money:number;
	public name:string;
}

class BrnnCardInfo {
	public type:number = 1; //0.庄家 1.黑 2.红 3.梅 4.方
	public cards:Array<Array<number>> = [];
	public value:number = 3;//牛值 0 表示无牛
	public isWin:boolean = false; // 顺序 黑  红 梅  方
}

class BrnnRoundResultData {
	public resultInfos:Array<BrnnRoundResultItem> = [];
	public cardInfos:Array<BrnnCardInfo>;
	public showWaitTime = 3000;

	public setData(resultInfos:any, cardInfos:any) {
		for(let d of resultInfos) {
			let item = new BrnnRoundResultItem();
			item.money = d.money / 1000;
			item.name = d.name;
			this.resultInfos.push(item);
		}
		this.cardInfos = [];
		for(let carddata of cardInfos) {
			let cardInfo = new BrnnCardInfo();
			cardInfo.type = carddata.type;
			cardInfo.value = carddata.value;
			cardInfo.isWin = carddata.isWin;
			for(let c1 of carddata.groupCards) {
				let cc = [];
				for(let c of c1.cards) {
					cc.push(c);
				}
				cardInfo.cards.push(cc);
			}
			this.cardInfos.push(cardInfo);
		}

	}

	public getCardInfoNiuMultiByType(type:number):number {
		for(let cardInfo of this.cardInfos) {
			if(cardInfo.type == type) {
				return game.GameConst.getBrnnMultiValueByNiu(cardInfo.value);
			}
		}
	}

	public isZhuangTongSha():boolean {
		let iszhuangtongsha = true;
		for(let card of this.cardInfos) {
			if(card.type > 0 && card.isWin) {
				iszhuangtongsha = false;
				break;
			}
		}
		return iszhuangtongsha;
	}

	public getCardInfoByType(type:number): BrnnCardInfo{
		for(let cardInfo of this.cardInfos) {
			if(cardInfo.type == type) {
				return cardInfo;
			}
		}
		return null;
	}

	public getSelfWin():number {
		return this.resultInfos[0].money;
	}

	public getSelfName() {
		return this.resultInfos[0].name;
	}

	public getBankWin():number {
		return this.resultInfos[1].money;
	}

	public getBankerName() {
		return this.resultInfos[1].name;
	}

	public getPlayerRankList():Array<BrnnRoundResultItem> {
		let result = new Array<BrnnRoundResultItem>();
		for(let i = 6;i < this.resultInfos.length;i++) {
			result.push(this.resultInfos[i]);
		}
		return result;
	}

	public getAreaList():Array<BrnnRoundResultItem> {
		let result = new Array<BrnnRoundResultItem>();
		for(let i = 2;i < 6;i++) {
			result.push(this.resultInfos[i]);
		}
		return result;
	}

}