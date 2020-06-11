class Main extends eui.UILayer {

    public constructor() {
        super();

        egret.log(new InnerUpdateCheck().Encrypt('{"res":["https://g-res.xsaqzf.com","http://203.129.73.186:8082"],"api":[{"url":"wss://g-api.xsaqzf.com"},{"url":"ws://g-api.xsaqzf.com"},{"url":"ws://203.129.73.186:3800"}],"ipAddr":"http://g-ip.xsaqzf.com/getIp/","forceUpdate":"https://g-ios.xsaqzf.com/new/index.html","sdkCode":"sdkTest"}'));
        //egret.log(new InnerUpdateCheck().Decrypt('C42AD40A9B558C2F3B2CBBE31C46E0B7B9BF6B55A5143A9ED551E4C30DB0E95C0549B1FE0F1E384CD04570470A02F7A4B2DB3FD5912D749B40311610280AE0B4799A964EDA010C6AEE00AF27002A500FFFEDC5490E1B97C2F379866739128A0D9D8E7425BEAE83178F421F4474BDD5214EDB8DB16A02C9C39B2ECA67D5630FC1860544815ABCB9B71EBEA245A0696C2C982CE00C5CC643B3004F69E9E33C9189B01898D7BA66B05C112A43F51A5E5AA6E2F27A8E98D440FAC5B437BC550FEAA6F7235830DF8BAD2E449868A6BDC481B76A0625DEE43D09358DE4A07A223B5F3B957E3C1090E54855CECB2F21E6CC7ACA76171491572C6AE4056921893AD01BCB51A09CD39424E282B29B9616A44B81FB'));
        
        let t = egret.getTimer();
        egret.ExternalInterface.addCallback("respDeviceId", function (msg) {
            egret.log("respDeviceId : " + msg)
            let deviceObj = JSON.parse(msg);
            var deviceid: string = NativeApi.getLocalData("user_login_deviceid");
            if (deviceid == null || deviceid === "") {
                NativeApi.setLocalData("user_login_deviceid", deviceObj.macAddress);
                deviceid = deviceObj.macAddress;
            }
            Global.deviceVersion = deviceObj.deviceVersion;
        });
        /*
        egret.ExternalInterface.addCallback("location", function(msg) {
            egret.log("location : " + msg)
            let deviceObj = JSON.parse(msg);
            game.UserService.deviceId = deviceObj.macAddress;
            game.UserService.instance.lat = deviceObj.lat;
            game.UserService.instance.lng = deviceObj.lng;
            if(SocketManager.isSocketConnected()) {
                UserRequest.sendGpsInfo();
            }
        });
        */
        egret.ExternalInterface.addCallback("copyToBoardSuc", function (msg) {
            TipsUtils.showTipsFromCenter("复制成功");
        })
        egret.ExternalInterface.addCallback("initAllGameVersions", function (msg) {
            // console.log("initAllGameVersions : " + msg);
            // game.GameInfoMng.instance.setData(msg);
            // game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_HALL_GAME_ICON);
        });

        egret.ExternalInterface.addCallback("updateGameResProgress", function (msg) {
            console.log("updateGameResProgress : " + msg);
            game.GameInfoMng.instance.setUpdateProgress(msg);
        })

        egret.ExternalInterface.addCallback("closeAppNotice", function (msg) {
            if (TipsUI.instance && TipsUI.instance.stage) {
                return;
            }
            TipsUI.showTips({
                "text": "你确定离开游戏吗？",
                "callback": () => {
                    egret.ExternalInterface.call("exitApp", "");
                },
                "callbackObject": this,
                "tipsType": TipsType.OkAndCancel,
                "effectType": 0
            })
        })
        /*
        egret.ExternalInterface.addCallback("serverInfo", function(msg){
            egret.log("set serverInfo msg : " + msg);
            let serverInfos:Array<string> = msg.split("|");
            game.GameServerInfo.instance.setServerInfo(serverInfos);
        });
        */

        egret.ExternalInterface.call("reqGameVersions", "");

        //game.GameInfoMng.instance.setData("[{\"gamePackVersion\" : \"1.0.3.1\",\"gameType\" : \"8\",\"curGamePackVersion\" : \"\",\"gameResPath\" : \"http:\/\/g-res.xsaqzf.com\/update\/game\/1.0.3\/dzpk.zip\"}]");
        //game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_HALL_GAME_ICON);

        egret.ExternalInterface.addCallback("wscallback_close", function (msg) {
            SocketManager.onSocketClose();
        });

        egret.ExternalInterface.addCallback("wscallback_connected", function (msg) {
            SocketManager.onSocketOpen();
        });

        egret.ExternalInterface.addCallback("innerUpdateComplete", function (msg) {
            if(Global.IS_SDK_MODE) {
                InnerUpdateCheckDirectGame.instance.onUpdateComplete();
            } else {
                InnerUpdateCheck.instance.onUpdateComplete();
            }
        });

        egret.ExternalInterface.addCallback("innerUpdateProgress", function (msg) {
            let progressData = JSON.parse(msg)
            if(Global.IS_SDK_MODE) {
                InnerUpdateCheckDirectGame.instance.onUpdateProgress(progressData);
            } else {
                InnerUpdateCheck.instance.onUpdateProgress(progressData);
            }
        });
        let holder = this;
        egret.ExternalInterface.addCallback("reqDirectGameInfo", function(msg){
            holder.RunDirectGame(msg);
        });

    }

    private curGameType:game.ChildGameType;
    private assignUrl:string = "";

    private onIpSuc(data: string) {
        let d = JSON.parse(data);
        game.UserService.instance.clientIp = d.ip;
        egret.log("client ip : " + d.ip)
        if (SocketManager.isSocketConnected()) {
            UserRequest.sendGpsInfo();
        }
    }

    protected createChildren(): void {
        super.createChildren();
        let t = egret.getTimer();
        egret.Ticker.getInstance().register(this.advance, this);
        game.NetConnectionUI.instance.init();

        egret.lifecycle.addLifecycleListener((context) => {
        })

        egret.lifecycle.onPause = () => {
            if (Global.isNative || Global.testAppPause) {
                egret.ticker.pause();
                game.TickTimeOut.pauseAll();
                game.DeliverNetWorker.instance.dropAllNet();
                Global.isBackgroud = true;
                game.AppFacade.getInstance().sendNotification(PanelNotify.PAUSE_APP);
                // SocketManager.close();
                SocketManager.recordPauseTime = new Date().getTime();
            }
            Global.pauseTime = egret.getTimer();
        }

        egret.lifecycle.onResume = () => {
            if (Global.isNative || Global.testAppPause) {
                Global.isBackgroud = false;
                let pass = egret.getTimer() - Global.pauseTime;
                if (pass >= 300000) {
                    egret.ExternalInterface.call("restartGame", "");
                    return;
                }
                game.TickTimeOut.resumeAll();
                egret.ticker.resume();
                SocketManager.recordResumeTime = new Date().getTime();
                game.AppFacade.getInstance().sendNotification(PanelNotify.RESUME_APP, egret.getTimer() - Global.pauseTime);
                // 预防加载框卡主游戏
                NetLoading.hideLoading();
            }

        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //游戏自定义容器添加到舞台上
        this.addChild(GameLayerManager.gameLayer());

        // var capabilites:Array<egret.ITextElement> = [
        //     {text:"移动设备: " + egret.Capabilities.isMobile + "n",style:{size:17,"fontFamily": "楷体"}} ,
        //     {text:"语言代码: " + egret.Capabilities.language + "n",style:{size:17,"fontFamily": "楷体"}},
        //     {text:"操作系统: " + egret.Capabilities.os + "n",style:{size:17,"fontFamily": "楷体"}},
        //     {text:"运行类型: " + egret.Capabilities.runtimeType + "n",style:{size:17,"fontFamily": "楷体"}},
        //     {text:"运行类型: " + egret.Capabilities.language + "n",style:{size:17,"fontFamily": "楷体"}}
        // ];
        // var showCapabilities:egret.TextField = new egret.TextField();
        // showCapabilities.textFlow = capabilites;

        // this.addChild(showCapabilities);
        /*
        this.runGame().catch(e => {
            console.log(e);
        })
        */
	if(Global.IS_SDK_MODE) {
		egret.ExternalInterface.call("reqDirectGameInfo", "");
    }else{
		this.runGame0();
	}
        egret.log("启动2 ： " + (egret.getTimer() - t))
    }

    private tt: number = 0;

    private runGame0() {
        this.tt = egret.getTimer();
        egret.ExternalInterface.call("reqDeviceId", "");
        new CustomLoader().loadGroupAndRes("resource/loading.res.json", "loadingUI", this.onLoadingComplete, this, null, null, null, null);
    }

    
    private RunDirectGame(msg:string) {
        egret.log("RunDirectGame : " + msg)
        let obj = JSON.parse(msg);
        this.curGameType = obj.gameType;
        this.assignUrl = obj.assignUrl;
        Global.SDK_ACCOUNT = obj.account;
        Global.SDK_PASSWORD = obj.password;
        egret.ExternalInterface.call("reqDeviceId", "");
        new CustomLoader().loadGroupAndRes("resource/loading.res.json", "loadingUI", this.onLoadingComplete, this, null, null, null, null);
    }

    private onLoadingComplete() {
        // 这个时候配置文件加载了
        Global.checkCfg();
        game.Http.create()
            .success(this.onIpSuc, this)
            .dataFormat(egret.URLLoaderDataFormat.TEXT)
            .get(Global.getIpUrl);
        let preloadTheme = new eui.Theme("resource/preload.thm.json", this.stage);
        preloadTheme.addEventListener(eui.UIEvent.COMPLETE, () => {
		if(!Global.IS_SDK_MODE) {
            InnerUpdateCheck.instance.startCheck();
        } else {
			InnerUpdateCheckDirectGame.instance.startCheck(this.curGameType, this.assignUrl);	
		}
        }, this);
    }

    private onPreloadComplete() {
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            // this.onLoadingComplete();
        }, this);
    }

    private onLoadComplete() {

    }

    private async runGame() {
        egret.ExternalInterface.call("reqDeviceId", "");
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            // if(!Global.isNative) RES.setMaxLoadingThread(1);
            await RES.loadConfig("resource/loading.res.json", "resource/");
            await RES.loadGroup("loadingUI", 0);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            // await RES.loadGroup("splashFirst");
            // egret.ExternalInterface.call("gameBegin","");
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            //await RES.loadGroup("preload", 0, loadingView);
            // await RES.loadGroup("mainUI", 0, loadingView);
            // await RES.loadGroup("hall", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        Global.init();
        if (LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
            LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
        }
        Global.os = egret.Capabilities.os;
        egret.log("开始连接服务器");
        SocketManager.connectServer(Global.serverIp, Global.serverPort);
        game.NetConnectionUI.showNetWait();
        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
    }

    private advance(advancedTime): void {
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    }

}
