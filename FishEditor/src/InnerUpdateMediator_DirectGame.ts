module game {

    export class InnerUpdateMediator_DirectGame extends BaseMediator {
        public static NAME: string = "InnerUpdateMediator_DirectGame";
		private innerUpdatePanel:InnerUpdateInfo = null;
        public constructor(viewComponent: InnerUpdateInfo = null) {
            super(InnerUpdateMediator.NAME, viewComponent);
			this.innerUpdatePanel = viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            return [
                SceneNotify.INNER_UPDATE_COMPLETE,
                SceneNotify.INNER_UPDATE_PROGRESS,
                PanelNotify.UPDATE_GAME_STATUS];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case SceneNotify.INNER_UPDATE_COMPLETE: {
                   this.startGame();
                    break;
                }
                case SceneNotify.INNER_UPDATE_PROGRESS:
                    if(this.innerUpdatePanel && this.innerUpdatePanel.stage) {
                        this.innerUpdatePanel.updateProgress(data);
                    }
                break;
                //在作为SDK嵌入的过程中，这个游戏资源包的下载显示也在这里处理
                case PanelNotify.UPDATE_GAME_STATUS:
                    let downloadInfo = <DownloadInfo>notification.getBody();
                    if(this.innerUpdatePanel && this.innerUpdatePanel.stage) {
                        this.innerUpdatePanel.updateProgressInDownloadInfo(downloadInfo);
                    }
                    if(downloadInfo.complete) {
                        if(InnerUpdateCheckDirectGame.instance.hasRunnedInnerUpdate) {
                            // 需要重启引擎
                            InnerUpdateCheckDirectGame.instance.restartGameEngine();
                        } else {
                            // 不需要重启 直接进入直接打开游戏的逻辑
                            this.startGame();
                        }
                    }
                break;
			}
		}

        private startGame() {
            const loadingView = new LoadingUI();       
            egret.lifecycle.stage.addChild(loadingView);
            if(this.innerUpdatePanel && this.innerUpdatePanel.stage) {
                this.innerUpdatePanel.parent.removeChild(this.innerUpdatePanel);
            }
            new CustomLoader().loadGroupAndRes("resource/sdk_basic.res.json", "preload", this.onPreloadComplete, this, null, LoadingUI.loadingUIInstance, null ,null);
        }


        private onPreloadComplete() {
            let theme = new eui.Theme("resource/default.thm.json", egret.lifecycle.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                this.createGameScene();
                // this.createTestPage();
            }, this);
        }

            /**
         * 创建场景界面
         * Create scene interface
         */
        protected createGameScene(): void {
            Global.init();
            
            egret.log("开始连接服务器");
            SocketManager.connectServer(Global.serverIp, Global.serverPort);
            if(!Global.IS_SDK_MODE) {
                if(LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
                    LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
                }
                game.NetConnectionUI.showNetWait();
            }
            
            game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
            if(Global.isNative) {

            } else {
                game.AppFacade.getInstance().sendNotification(SceneNotify.TEMP_OPEN_LOGIN);
            }
        }

        private createTestPage() {
             Global.init();
            if(LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
                LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
            }
            GameLayerManager.gameLayer().addChild(new TestPage());
        }
	}
}