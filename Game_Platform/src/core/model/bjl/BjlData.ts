enum BjlPlayerState
{
	ob = 0,
	game
}

module game.bjl {

	export class BjlBankerInfo {
		public type:number;
		public playerId:number;
		public applyBankerName:string;
	
		public static valueOf(data):BjlBankerInfo {
			let bankerInfo = new BjlBankerInfo();
			let d = data.bankerInfos;
			bankerInfo.type = d.type;
			bankerInfo.playerId = Number(d.playerId);
			bankerInfo.applyBankerName = d.applyBankerName;
			return bankerInfo;
		}
	}

	export class BjlData extends MultiPlayerGameData {
		public constructor() {
			super();
		}
		public bjlPlayers : BjlPlayer[] = new Array<BjlPlayer>();
		public bankerId : number = 0;
		public isSelfBet : boolean = false;
		public bankerList:Array<TbBankerInfo> = [];
		public static bankerUpMoneyLimit:number = 0;
		public addPlayer(playerInfo : game.PlayerInfo)
		{
			var bjlPlayer = new BjlPlayer();
			bjlPlayer.playerId = Number(playerInfo.playerId);
			bjlPlayer.position = playerInfo.postion;
			bjlPlayer.headNum = playerInfo.headNum;
			bjlPlayer.headFrameNum = playerInfo.headFrameNum;
			bjlPlayer.playerName = playerInfo.nickName;
			bjlPlayer.totolMoney = playerInfo.money;
			bjlPlayer.city = playerInfo.city;
			this.bjlPlayers.push(bjlPlayer);
		}

		public getPlayerById(playerId : number)
		{
			if(this.bjlPlayers == null || this.bjlPlayers.length == 0) return null;
			for(let i=0;i<this.bjlPlayers.length;i++) {
				if(this.bjlPlayers[i].playerId == playerId) {
					return this.bjlPlayers[i];
				}
			}
			return null;
		}

		public getPlayerByPos(pos:number):BjlPlayer {
			for(let player of this.bjlPlayers) {
				if(player.position == pos) return player;
			}
			return null;
		}

		public isSelfBanker():boolean {
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfoByPos(0);
			return playerInfo.playerId == UserService.instance.playerId;
		}
	
		public setBankerData(data:any) {
			this.bankerList = [];
			for(let d of data) {
				let bankerInfo = TbBankerInfo.valueOf(d);
				if(!this.getBankerPlayer(bankerInfo.playerId)) {
					this.bankerList.push(bankerInfo);
				}
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
	}
	export class BjlPlayer
	{

		public playerId:number;
		public playerName : string;
		public city:string;
		// public playerInfo : game.PlayerInfo;
		public isBanker : boolean = false;
		public bankerMultinum : number = 0; 
		public betMultiNum : number = 0;
		public isShowCard : boolean = false;
		public isAlway : boolean = false;
		public state : BjlPlayerState = 1;
		public headNum:number;//头像编号
		public headFrameNum :number;//头像框编号
		public position : number;
		public money : number;
		public totolMoney : number;
		
		public selfStakeInfos : number[] = [0,0,0,0,0];

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

	export class BjlResultCardItem {
		public xianCard:number = -1;
		public xianDian:number = -1;
		public zhuangCard:number = -1;
		public zhuangDian:number = -1;
		constructor(xc:number,xd:number, zc:number, zd:number) {
			this.xianCard = xc;
			this.xianDian = xd;
			this.zhuangCard = zc;
			this.zhuangDian = zd;
		}
	}

	export class BjlResultCardInfo {
		public resultCardItems:Array<BjlResultCardItem>;
		public setData(data:any) {
			this.resultCardItems = [];
			for(let d of data) {
				let item = new BjlResultCardItem(d.xianCard, d.xianDian, d.zhuangCard, d.zhuangDian);
				this.resultCardItems.push(item);
			}
		}

		public getXianList() :Array<number>{
			if(this.resultCardItems[2] && this.resultCardItems[2].xianCard > 0) {
				return [this.resultCardItems[0].xianCard,this.resultCardItems[1].xianCard,this.resultCardItems[2].xianCard]
			} else {
				return [this.resultCardItems[0].xianCard,this.resultCardItems[1].xianCard, -1]
			}
		}

		public getXianDian() : number {
			if(this.resultCardItems[2] && this.resultCardItems[2].xianCard > 0) {
				return this.resultCardItems[2].xianDian;
			} else {
				return this.resultCardItems[1].xianDian;
			}
		}

		public getZhuangList() :Array<number>{
			if(this.resultCardItems[2] && this.resultCardItems[2].zhuangCard > 0) {
				return [this.resultCardItems[0].zhuangCard,this.resultCardItems[1].zhuangCard,this.resultCardItems[2].zhuangCard]
			} else {
				return [this.resultCardItems[0].zhuangCard,this.resultCardItems[1].zhuangCard, -1]
			}
		}

		public getZhuangDian() : number {
			if(this.resultCardItems[2] && this.resultCardItems[2].zhuangCard > 0) {
				return this.resultCardItems[2].zhuangDian;
			} else {
				return this.resultCardItems[1].zhuangDian;
			}
		}

	}

	export class BjlRoundResultItem {
		public money:number;
		public name:string;
	}
	
	export class BjlRoundResultData {
		public resultInfos:Array<BjlRoundResultItem> = [];
		public cardInfo:BjlResultCardInfo;
		public winTypes:Array<number>;
		public showWaitTime:number = 3000;
		public isZhuangFail() {
			for(let win of this.winTypes) {
                if(win == 1) {
                    return true;
                } 
			}
			return false;
		}

		public isXianFail() {
			for(let win of this.winTypes) {
                if(win == 2) {
                    return true;
                } 
			}
			return false;
		}
	
		public setData(resultInfos:any, cardInfos:any, winType:any) {
			for(let d of resultInfos) {
				let item = new BjlRoundResultItem();
				item.money = d.money / 1000;
				item.name = d.name;
				this.resultInfos.push(item);
			}
			this.cardInfo = new BjlResultCardInfo();
			this.cardInfo.setData(cardInfos);
			this.winTypes = winType;
		}

		public containsXianOrZhuang():boolean {
			for(let winType of this.winTypes) {
				if(winType == 1 || winType == 2) {
					return true;
				}
			}
			return false;
		}

		public containsWinType(winType:number):boolean {
			for(let w of this.winTypes) {
				if(w == winType) {
					return true;
				}
			}
			return false;
		}

		public containsHe():boolean {
			for(let winType of this.winTypes) {
				if(winType == 3) {
					return true;
				}
			}
			return false;
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
	
		public getPlayerRankList():Array<BjlRoundResultItem> {
			let result = new Array<BjlRoundResultItem>();
			for(let i = 2;i < this.resultInfos.length;i++) {
				result.push(this.resultInfos[i]);
			}
			return result;
		}
	
		public getAreaList():Array<BjlRoundResultItem> {
			let result = new Array<BjlRoundResultItem>();
			for(let i = 2;i <= 6;i++) {
				if(this.resultInfos[i]) {
					result.push(this.resultInfos[i]);
				}
			}
			return result;
		}
	}
}
