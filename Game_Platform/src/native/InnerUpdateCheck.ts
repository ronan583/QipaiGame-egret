

class InnerUpdateCheck {

	private static _instance:InnerUpdateCheck;
	public static get instance() :InnerUpdateCheck {
		if(!InnerUpdateCheck._instance) {
			InnerUpdateCheck._instance = new InnerUpdateCheck();
		}
		return InnerUpdateCheck._instance;
	}

	public constructor() {
	}

	private key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    private iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    public Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
    //加密方法
    public Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }

	private resList:Array<string> = [];
	private resCursor:number = 0;
	private needUpdate:Array<game.UpdateInfo> = [];
	private downloadCursor:number = 0;
	public startCheck() {
		const innerUpdateInfo = new InnerUpdateInfo();
        egret.lifecycle.stage.addChild(innerUpdateInfo);
		game.AppFacade.getInstance().registerMediator(new game.InnerUpdateMediator(innerUpdateInfo))
		if(!Global.isNative) {
			game.AppFacade.instance.sendNotification(SceneNotify.INNER_UPDATE_COMPLETE);
		} else {
			this.requestRootServerUrl();
		}
		egret.setTimeout(()=>{
			egret.ExternalInterface.call("gameBegin","");
		}, this, 300);
		
	}

	private requestRootServerUrl() {
		game.Http.create()
			.success(this.onRootServerComplete, this)
			.error(this.onRootServerIOError, this)
			.dataFormat(egret.URLLoaderDataFormat.TEXT)
			.get(Global.getBasicData + "?v=" + Math.random());
	}

	private onRootServerComplete(data:string) {
    	console.log("get data : ",data);
		let content = this.Decrypt(data.trim());
		console.log("get content : ", content);
		let updateInfo = JSON.parse(content);
		// 在这里添加ip 的获取 和 forceUpdate的获取
		Global.getIpUrl = updateInfo.ipAddr;
		Global.forceNativeUpdateUrl = updateInfo.forceUpdate;
		// 设置api 循环地址
		game.GameServerInfo.instance.setServerInfoInner(updateInfo.api);
		for(let s of updateInfo.res) {
			this.resList.push(s);
		}
		this.tryGetResUpdateInfo();
	}

	private onRootServerIOError() {
		// 根服务器都连不上直接跳过内更新
		game.AppFacade.instance.sendNotification(SceneNotify.INNER_UPDATE_COMPLETE);
	}

	private tryGetResUpdateInfo() {
		game.Http.create()
			.success(this.onResComplete, this)
			.error(this.onResError, this)
			.dataFormat(egret.URLLoaderDataFormat.TEXT)
			.get(this.resList[this.resCursor].trim() + "/update/game/" + Global.versionRoot + "/versions.json?t=" + Math.random() );
	}

	private onResError() {
		egret.log("requesrt error may be timeout");
		this.resCursor++;
		egret.log("requesrt move next");
		if(this.resCursor >= this.resList.length) {
			// 全部重试完没有一个可以连接的，直接跳过内更新
			return;
		}

		this.tryGetResUpdateInfo();
	}
	
	private onResComplete(data:string) {
		egret.log(data);
		let versionUpdateInfo = JSON.parse(data);
		egret.log("onResComplete " + versionUpdateInfo.gamesVersion[1]) 
		if(Global.deviceVersion) {
			egret.log("=============" + versionUpdateInfo.curVersion + "............." + Global.deviceVersion)
			if(versionUpdateInfo.curVersion != Global.deviceVersion) {
				if(versionUpdateInfo.isForceUpdate  && versionUpdateInfo.isForceUpdate != "false") {
					TipsUI.showTips({
						"text": "发现新版本，是否立即更新",
						"callback": (data: any) => {
							NativeApi.openUrl(Global.forceNativeUpdateUrl);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OnlyOk
					});
				} else {
					TipsUI.showTips({
						"text": "发现新版本，是否立即更新",
						"callback": (data: any) => {
							NativeApi.openUrl(Global.forceNativeUpdateUrl);
						},
						"cancelCallback":(data: any) => {
							this.continueInnerUpdateCheck(versionUpdateInfo);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
				}
				return;
			}
		}
		this.continueInnerUpdateCheck(versionUpdateInfo);
	}

	private continueInnerUpdateCheck(versionUpdateInfo:any) {
		let updateTotalInfo:game.UpdateTotalInfo = game.UpdateTotalInfo.getUpdateTotalInfo();
		for (let key in versionUpdateInfo.updateFiles){
			egret.log(key + "...." + versionUpdateInfo.updateFiles[key])
			if(!updateTotalInfo.hasUpdated(key)) {
				let info = new game.UpdateInfo();
				info.updateVersion = key;
				info.updateUrl = versionUpdateInfo.updateFiles[key];
				this.needUpdate.push(info);
			}
		}
		let arr:Array<game.GameInfo> = [];
		for(let key in versionUpdateInfo.gamesVersion) {
			let obj = versionUpdateInfo.gamesVersion[key];
			let gameInfo:game.GameInfo = new game.GameInfo();
			gameInfo.gameType = obj.gameType;
			gameInfo.gameResPath = obj.gameResPath;
			gameInfo.gamePackVersion = obj.gamePackVersion;
			gameInfo.curGamePackVersion = "";
			egret.log("game info : " + gameInfo.gameType + "  " + gameInfo.gamePackVersion)
			arr.push(gameInfo);
		}
		game.GameInfoMng.instance.setDataByInnerList(arr);
		game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_HALL_GAME_ICON);
		if(this.needUpdate.length == 0 || !Global.isInnerUpdate) {
			let msg = "无需内更新";
			game.AppFacade.instance.sendNotification(SceneNotify.INNER_UPDATE_COMPLETE);
		} else {
			this.startInnerUpdateDownload();
		}
	}

	private startInnerUpdateDownload() {
		this.downloadCursor = 0;
		this.innerUpdateDownload();
	}

	private innerUpdateDownload() {
		let innerUpdateUrl:string = this.needUpdate[this.downloadCursor].updateUrl;
		let dins = this.needUpdate[this.downloadCursor].updateVersion + "|" + innerUpdateUrl;
		egret.ExternalInterface.call("downloadInner", dins);
		egret.log("调用native下载:" + dins);
	}

	public onUpdateProgress(progress:any) {
		game.AppFacade.getInstance().sendNotification(SceneNotify.INNER_UPDATE_PROGRESS,{total:this.needUpdate.length,current:this.downloadCursor, progress:progress});
	}

	public onUpdateComplete() {
		game.UpdateTotalInfo.getUpdateTotalInfo().saveUpdated(this.needUpdate[this.downloadCursor].updateVersion);
		this.downloadCursor++;
		if(this.downloadCursor >= this.needUpdate.length) {
			// 全部下载解压完成。重启egret引擎
			egret.ExternalInterface.call("restartegret","");
		} else {
			this.innerUpdateDownload();
		}
	}

}