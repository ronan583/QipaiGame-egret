module game {

	export class DownloadInfo {
		public gameType:game.ChildGameType;
		public downloadedSize:number;
		public totalSize:number;
		public complete:boolean;


	}

	export class GameInfoMng {
		private static _instance:GameInfoMng;
		public static get instance():GameInfoMng {
			if(GameInfoMng._instance == null) {
				GameInfoMng._instance = new GameInfoMng();
			}
			return GameInfoMng._instance;
		}

		private gameInfoArr:Array<GameInfo> = [];
		private curupdateGame:game.ChildGameType = game.ChildGameType.NONE;
		private curupdateGameList:Array<game.ChildGameType> = [];
		private localVersionSaveList:Array<any> ;
		public setData(dataStr:string):void {
			let versionSave = NativeApi.getLocalData("gameVersionSave");
			egret.log("versionSave:" + versionSave);
			this.localVersionSaveList = JSON.parse(versionSave);
			var dataArr:Array<any> = JSON.parse(dataStr);
			for(let data of dataArr) {
				var gameInfo:GameInfo = new GameInfo();
				gameInfo.gameType = data.gameType;
				gameInfo.gameResPath = data.gameResPath;
				gameInfo.gamePackVersion = data.gamePackVersion;
				gameInfo.curGamePackVersion = data.curGamePackVersion;
				this.gameInfoArr.push(gameInfo);
			}
			if(this.localVersionSaveList) {
				for(let data of this.localVersionSaveList) {
					let gameInfo:GameInfo = this.getGameInfo(data.gameType);
					if(!gameInfo) {
						gameInfo = new GameInfo();
						gameInfo.gameType = data.gameType;
						gameInfo.gameResPath = data.gameResPath;
						gameInfo.gamePackVersion = data.gamePackVersion;
						gameInfo.curGamePackVersion = data.curGamePackVersion;
						this.gameInfoArr.push(gameInfo);
					}
				}
			}
			
		}

		public setDataByInnerList(gameInfos:Array<GameInfo>) {
			let versionSave = NativeApi.getLocalData("gameVersionSave");
			egret.log("versionSave:" + versionSave);
			this.localVersionSaveList = JSON.parse(versionSave);
			for(let data of gameInfos) {
				this.gameInfoArr.push(data);
			}
			if(this.localVersionSaveList) {
				for(let data of this.localVersionSaveList) {
					let gameInfo:GameInfo = this.getGameInfo(data.gameType);
					if(!gameInfo) {
						gameInfo = new GameInfo();
						gameInfo.gameType = data.gameType;
						gameInfo.gameResPath = data.gameResPath;
						gameInfo.gamePackVersion = data.gamePackVersion;
						gameInfo.curGamePackVersion = data.curGamePackVersion;
						this.gameInfoArr.push(gameInfo);
					} else {
						if(gameInfo.curGamePackVersion != data.curGamePackVersion) {
							gameInfo.complete = false;
						} else {
							gameInfo.complete = data.complete;
						}
						gameInfo.curGamePackVersion = data.curGamePackVersion;
						egret.log("set cur game pack version : " + gameInfo.curGamePackVersion + "   " + gameInfo.complete)
					}
				}
			}
		}

		public setUpdateProgress(data:string):void {
			var downloadInfoData:any = JSON.parse(data);
			var downloadInfo:DownloadInfo = new DownloadInfo();
			downloadInfo.gameType = downloadInfoData.gameType;
			downloadInfo.downloadedSize = downloadInfoData.downloadedSize;
			downloadInfo.totalSize = downloadInfoData.totalSize;
			downloadInfo.complete = downloadInfoData.complete;
			if(downloadInfo.complete) {
				let gameInfo = this.getGameInfo(downloadInfo.gameType);
				gameInfo.complete = true;
				gameInfo.curGamePackVersion = gameInfo.gamePackVersion;
				let savestr = JSON.stringify(this.gameInfoArr);
				NativeApi.setLocalData("gameVersionSave",JSON.stringify(this.gameInfoArr));
				egret.log("gameVersionSave : " + savestr);
				egret.log("game complete : " + downloadInfo.gameType);
				this.startNext();
			}
			game.AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_GAME_STATUS, downloadInfo);
		}

		public isGameNeedUpdate(gameType:game.ChildGameType):boolean {
			var gameInfo:GameInfo = this.getGameInfo(gameType);
			if(!gameInfo) {
				if(this.localVersionSaveList) {
					for(let data of this.localVersionSaveList) {
						if(data.gameType == gameType) {
							gameInfo = new GameInfo();
							gameInfo.gameType = data.gameType;
							gameInfo.gameResPath = data.gameResPath;
							gameInfo.gamePackVersion = data.gamePackVersion;
							gameInfo.curGamePackVersion = data.curGamePackVersion;

							this.gameInfoArr.push(gameInfo);
						}
					}
				}
			}
			if(!gameInfo) {
				egret.log("我没有gameinfo信息")
			} else {
				
			}

			return gameInfo != null && gameInfo.isNeedUpdate();
		}

		public updateGame(gameType:game.ChildGameType):void {
			if(this.curupdateGameList.indexOf(gameType) >= 0 || this.curupdateGame == gameType) {
				CommonUtil.noticeMsg(game.GameConst.getGameName(gameType) + "正在更新");
				return;
			}
			if(this.curupdateGame == ChildGameType.NONE) {
				this.curupdateGame = gameType
				let gameInfo:game.GameInfo = game.GameInfoMng.instance.getGameInfo(gameType);
				// 没有正在下载的就直接下载
				egret.ExternalInterface.call("downloadGamePak",JSON.stringify(gameInfo));	
			} else {
				egret.log("等待下载:" + gameType);
				this.curupdateGameList.push(gameType);		
				game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_WAIT_DOWNLOAD_STATE, gameType);	
			}
		}

		public startNext() {
			if(this.curupdateGameList.length == 0){
				this.curupdateGame = ChildGameType.NONE;
				return;
			} 
			this.curupdateGame = this.curupdateGameList[0];
			this.curupdateGameList.splice(0,1);
			let gameInfo:game.GameInfo = game.GameInfoMng.instance.getGameInfo(this.curupdateGame);
			egret.ExternalInterface.call("downloadGamePak",JSON.stringify(gameInfo));	
		}

		public getGameInfo(gameType:game.ChildGameType):GameInfo {
			for(let gameInfo of this.gameInfoArr) {
				if(gameInfo.gameType == gameType) {
					return gameInfo;
				}
			}
			return null;
		}

	}
	export class GameInfo {
		public constructor() {
		}
		public gameType:ChildGameType;
		public gameResPath:string;
		public gamePackVersion:string;
		public curGamePackVersion:string;
		public complete:boolean = false;

		public isNeedUpdate():boolean {
			egret.log("isNeedUpdate : " + this.curGamePackVersion + "  " + this.complete)
			return this.curGamePackVersion != this.gamePackVersion && !this.complete;
		}
	}
}
