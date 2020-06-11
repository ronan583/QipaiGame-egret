class Main extends eui.UILayer {

    public constructor() {
        super();
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
        egret.ExternalInterface.addCallback("copyToBoardSuc", function (msg) {
            TipsUtils.showTipsFromCenter("复制成功");
        })
        egret.ExternalInterface.addCallback("initAllGameVersions", function (msg) {
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
        egret.ExternalInterface.call("reqGameVersions", "");
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
        }

        egret.lifecycle.onResume = () => {
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //游戏自定义容器添加到舞台上
        this.addChild(GameLayerManager.gameLayer());
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
        egret.ExternalInterface.call("reqDeviceId", "");
        new CustomLoader().loadGroupAndRes("resource/loading.res.json", "loadingUI", this.onLoadingComplete, this, null, null, null, null);
    }

    private onLoadingComplete() {
        let preloadTheme = new eui.Theme("resource/preload.thm.json", this.stage);
        preloadTheme.addEventListener(eui.UIEvent.COMPLETE, () => {
            const loadingView = new LoadingUI();
            egret.lifecycle.stage.addChild(loadingView);
            new CustomLoader().loadGroupAndRes("resource/default.res.json", "preload", this.onPreloadComplete, this, null, LoadingUI.loadingUIInstance, null ,null);
        }, this);
    }

    private onPreloadComplete() {
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            this.createGameScene();
        }, this);
    }

    createGameScene(): void {
        Global.init();
        if(LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
            LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
        }
        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
        game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BY_TRACK_UI);
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

    private advance(advancedTime): void {
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    }

}
