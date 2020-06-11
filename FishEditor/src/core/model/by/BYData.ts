module game.by {
	export class BYOperType {
		public static NORMAL:number = 0x0;
		public static AUTO_SHOOT:number = 0x1 << 1;
		public static AUTO_LOCK:number = 0x1 << 2;
	}

	export class FishDeadInfo {
		public fishId:string;
		public killerId:number;
		public addMoney:number;
	}

	export enum FishType {
		NONE,
		SMALL,
		MIDDLE,
		BIG,
		BOSS,
		RING
	}

	export class FishInfo {
		public id:string = "";//鱼唯一id
		public fishesId:number;//鱼id`
		public fishesPath:number;//路径编码
		public offsetX:number;//偏移量
		public offsetY:number;//偏移量
		public createTime:number;//创建时间`
		public type:FishType;
	}

	export class BYPlayerInfo{
		public playerId:number = 0;
		public curBulletMoney:number = 0;
		public curCannonId:number = 0;
		public money:number = 0;
		public shootInfo:ShootInfo;
		public position:number = 0;

		public checkFlag:number = 0;

		public recordTargetX:number = 0;
		public recordTargetY:number = 0;
		public recordTargetFishId:string = "";
		public canonIndex:number = 0;
	}

	export class ShootInfo {
		public shootType:number = BYOperType.NORMAL;
		public lockTargetFishId:string = "";
		public autoShootTargetX:number = 0;
		public autoShootTargetY:number = 0;

		public isAuto():boolean {
			return (this.shootType & BYOperType.AUTO_SHOOT) > 0;
		}

		public isLock():boolean {
			return (this.shootType & BYOperType.AUTO_LOCK) > 0;
		}

		public setAuto(auto:boolean):void {
			if(auto) {
				this.shootType = this.shootType | BYOperType.AUTO_SHOOT;
			} else {
				this.shootType = this.shootType & (~BYOperType.AUTO_SHOOT);
			}
		}

		public setLock(lock:boolean):void {
			if(lock) {
				this.shootType = this.shootType | BYOperType.AUTO_LOCK;
			} else {
				this.shootType = this.shootType & (~BYOperType.AUTO_LOCK);
			}
		}

	}

	export class FishGroupInfo {
		public groupCreateTime:number;
		public hasCreate:boolean;

	}

	export class BYData {
		private static _instance:BYData;
		public static get instance():BYData {
			if(BYData._instance == null) {
				BYData._instance = new BYData();
			}
			return BYData._instance;
		}
		public constructor() {
		}

		public curOperType:number = BYOperType.NORMAL;

		public players:Array<BYPlayerInfo>;
		private diffTimestamp:number = 0;
		public deadFishs:Array<string> = [];
		public fishInfos:Array<FishInfo> = [];
		public fishGroupTime:number = 0;

		public fishGroupInfoList:Array<FishGroupInfo> = [];

		public getFirstPlayer():number {
			var minIndex:number = 0;
			var minValue:number = 10;
			for(let i=0;i<this.players.length;i++) {
				if(this.players[i].position < minValue) {
					minValue = this.players[i].position;
					minIndex = i;
				}
			}
			return this.players[minIndex].playerId;
		}

		public getServerTimestamp():Date {
			var time:number = new Date().getTime() - this.diffTimestamp;
			return new Date(time);
		}

		public getPlayerInfoByPos(pos:number):BYPlayerInfo {
			for(let playerInfo of this.players) {
				if(playerInfo.position == pos) {
					return playerInfo;
				}
			}
			return null;
		}

		public get servetTime():number {
			return new Date().getTime() - this.diffTimestamp;
		}

		public setData(data:any):void {
			this.diffTimestamp = new Date().getTime() - data.serverTimestamp;
			if(!this.players) this.players = [];
			for(let player of data.playerInfos) {
				var playerInfo:BYPlayerInfo = this.getPlayerInfo(Number(data.playerId));
				if(!playerInfo) {
					playerInfo = new BYPlayerInfo();
					this.players.push(playerInfo);
				}
				playerInfo.checkFlag = 1;
				
				playerInfo.playerId = Number(player.playerId);
				playerInfo.curBulletMoney = Number(player.curBulletMoney);
				playerInfo.curCannonId = player.curCannonId;
				playerInfo.money = player.money / 1000;
				playerInfo.shootInfo = new ShootInfo();
				playerInfo.shootInfo.shootType = player.shootIno.curShootType;
				playerInfo.shootInfo.lockTargetFishId = player.shootIno.curLockTargetFishId;
				playerInfo.shootInfo.autoShootTargetX = player.shootIno.curShootTargetX;
				playerInfo.shootInfo.autoShootTargetY = player.shootIno.curShootTargetY;
				playerInfo.position = RoomManager.getInstance().curRoomData.getPlayerInfo(playerInfo.playerId).postion;

			}
			this.fishInfos = [];
			for(let fish of data.fishesInfos) {
				var fishInfo:FishInfo = new FishInfo();
				fishInfo.id = fish.id;
				fishInfo.fishesId = Number(fish.fishesId);
				fishInfo.fishesPath = Number(fish.fishesPath);
				fishInfo.offsetX = fish.deviation;
				fishInfo.offsetY = fish.deviation1;
				fishInfo.createTime = fish.createTime;
				fishInfo.type = fish.type;

				this.fishInfos.push(fishInfo);
			}
			
			var needRemove:Array<BYPlayerInfo> = [];
			for(let p of this.players) {
				if(p.checkFlag == 0) {
					needRemove.push(p);
				}
				p.checkFlag = 0;
			}

			for(let p of needRemove) {
				var index:number = this.players.indexOf(p);
				if(index >= 0) {
					this.players.splice(index, 1);
				}
			}
			console.log(data.startTime + "||||||||||||" + new Date().getTime())
			if(data.startTime) {
				var fishGroupInfo:FishGroupInfo = this.getFishGroupInfo(Number(data.startTime));
				if(!fishGroupInfo) {
					var fishGroupInfo:FishGroupInfo = new FishGroupInfo();
					fishGroupInfo.groupCreateTime = Number(data.startTime);
					this.fishGroupInfoList.push(fishGroupInfo);
				}
			}
		}
		
		public addFishInfo(fish:any):FishInfo {
			var fishInfo:FishInfo = new FishInfo();
			fishInfo.id = fish.id;
			fishInfo.fishesId = Number(fish.fishesId);
			fishInfo.fishesPath = Number(fish.fishesPath);
			fishInfo.offsetX = fish.deviation;
			fishInfo.offsetY = fish.deviation1;
			fishInfo.createTime = fish.createTime;
			fishInfo.type = fish.type;

			// this.fishInfos.push(fishInfo);

			return fishInfo;
		}

		public removeFish(fishId:string):void {
			for(let i=0;i<this.fishInfos.length;i++) {
				if(this.fishInfos[i].id == fishId) {
					this.fishInfos.splice(i,1);
					break;
				}
			}
		}

		public getPlayerInfo(playerId:number):BYPlayerInfo {
			for(let playerInfo of this.players) {
				if(playerInfo.playerId == playerId) {
					return playerInfo;
				}
			}
			return null;
		}

		public setShootData(data:any):void {
			this.getPlayerInfo(data.playerId).money = data.money / 1000;
		}

		public addKillMoney(playerId:number, addMoney:number):void {
			var playerInfo:BYPlayerInfo = this.getPlayerInfo(playerId);
			if(playerInfo) {
				playerInfo.money+=addMoney;
			}
		}

		public setBulletMoney(playerId:number, money:number):void {
			var playerInfo:BYPlayerInfo = this.getPlayerInfo(playerId);
			if(playerInfo) {
				playerInfo.curBulletMoney = Number(money);
			}
		}

		public refreshPlayers():void {
			var needRemove:Array<BYPlayerInfo> = [];
			for(let p of this.players) {
				if(!RoomManager.getInstance().curRoomData.getPlayerInfo(p.playerId)) {
					needRemove.push(p);
				}
			}

			for(let p of needRemove) {
				var index:number = this.players.indexOf(p);
				if(index >= 0) {
					this.players.splice(index, 1);
				}
			}
			game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_BY_PLAYERS);
		}

		public getFishGroupInfo(time:number):FishGroupInfo {
			for(let fishGroupInfo of this.fishGroupInfoList) {
				if(fishGroupInfo.groupCreateTime == time) {
					return fishGroupInfo;
				}
			}
			return null;
		}

		public getLastFishGroupInfo():FishGroupInfo {
			if(this.fishGroupInfoList.length > 0) {
				return this.fishGroupInfoList[this.fishGroupInfoList.length - 1];
			}
			return null;
		}

		public addFishGruopInfo(data:any):void {
			if(data.status == 2) {
				var fishGroupInfo:FishGroupInfo = this.getFishGroupInfo(data.startTime);
				if(!fishGroupInfo) {
					var fishGroupInfo:FishGroupInfo = new FishGroupInfo();
					fishGroupInfo.groupCreateTime = data.startTime;
					this.fishGroupInfoList.push(fishGroupInfo);
				}
			}
		}
	}
}