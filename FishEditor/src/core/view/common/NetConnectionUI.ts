module game {
    export class NetConnectionUI extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.skinName = "resource/eui_skins/common/NetConnection.exml";
        }

        private static _instance:NetConnectionUI;
        public static get instance():NetConnectionUI {
            if(NetConnectionUI._instance == null) {
                NetConnectionUI._instance = new NetConnectionUI();
            }
            return NetConnectionUI._instance;
        }
        public flowerImg:eui.Image = null;
        public bgImg:eui.Image = null;
        public reConnectBtn:eui.Group;
        private angle:number = 0;
        private shotflowerGroup:eui.Group;
        private progressbar:eui.Image;
        private progressbg:eui.Image;
        private maskRect:eui.Rect;
        private bgimg:eui.Image;
        private loadingAnim:DragonAnim;
        private progressLabel:eui.Label;

        public connectGroup:eui.Group;
        public reConnectGroup:eui.Group;
        private loadingMc:egret.MovieClip;

        private tipsLabel:eui.Label;
        private tipsLabel2:eui.Label;

        private waitType = 0;

        public init():void {

        }
        private onAddToStage():void {
            if(this.reConnectGroup) {
                this.initOnUiComplete();
            }
        }
        private endTime:number = 0;
        private simulateProgress() {
            this.endTime = egret.getTimer() + 8000;
            egret.startTick(this.onSimulateProgress, this);
        }

        private initOnUiComplete() {
            egret.startTick(this.flowerRotate, this);
            this.tipsLabel.text = game.GameConst.getTipsLabel();
            this.tipsLabel2.text = game.GameConst.getTipsLabel2();
            this.reConnectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReConnect, this);
            if(this.waitType == 1) {
                NetConnectionUI.instance.reConnectGroup.visible = false;
                NetConnectionUI.instance.connectGroup.visible = true;
                NetConnectionUI.instance.shotflowerGroup.visible = false;
                NetConnectionUI.instance.simulateProgress();

                this.waitType = 0;
            } else if(this.waitType == 2) {
                NetConnectionUI.instance.reConnectGroup.visible = true;
                NetConnectionUI.instance.connectGroup.visible = false;
                NetConnectionUI.instance.shotflowerGroup.visible = false;

                this.waitType = 0;
            }else if(this.waitType == 3) {
                NetConnectionUI.instance.reConnectGroup.visible = false;
                NetConnectionUI.instance.connectGroup.visible = false;
                NetConnectionUI.instance.shotflowerGroup.visible = true;

                this.waitType = 0;
            }

            if(!this.loadingMc) {
                var data = RES.getRes("loding_mc_json");
                var txtr = RES.getRes("loding_tex_png");
                var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
                this.loadingMc = new egret.MovieClip(mcFactory.generateMovieClipData("loding"));
                NetConnectionUI.instance.shotflowerGroup.addChild(this.loadingMc);
                this.loadingMc.x = NetConnectionUI.instance.shotflowerGroup.width / 2;
                this.loadingMc.y = NetConnectionUI.instance.shotflowerGroup.height / 2;
            }
            this.loadingMc.play(-1);
        }

        private onReConnect():void {
            SocketManager.connectServer(Global.serverIp, Global.serverPort);
            game.NetConnectionUI.showNetWait();
        }

        private onRemoveFromStage():void {
            egret.stopTick(this.flowerRotate, this);
            egret.stopTick(this.onSimulateProgress, this);
            this.reConnectBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReConnect, this);
            if(this.loadingMc) {
                this.loadingMc.stop();
            }
        }

        protected childrenCreated():void {
            super.childrenCreated();
            
            this.initOnUiComplete();
            this.progressbar.mask = this.maskRect;
            let max = Math.min(this.bgimg.width, this.width);
        }

        private flowerRotate(timestamp:number):boolean {
            this.angle = (this.angle+2) % 360;
            this.flowerImg.rotation = this.angle;
            return true;
        }

        public static showNetWait():void {
            if(NetConnectionUI.instance.stage == null) {
                 NetConnectionUI.instance.waitType = 1;
            } else {
                 NetConnectionUI.instance.reConnectGroup.visible = false;
                NetConnectionUI.instance.connectGroup.visible = true;
                NetConnectionUI.instance.shotflowerGroup.visible = false;
                NetConnectionUI.instance.simulateProgress();
            }
           
            PopUpManager.addPopUp(NetConnectionUI.instance, true, 0, 0, 0);
        }

        public static showFlower():void {
            if(NetConnectionUI.instance.stage == null) {
                NetConnectionUI.instance.waitType = 3;
                PopUpManager.addPopUp(NetConnectionUI.instance, true, 0, 0, 0);
            }else {
                NetConnectionUI.instance.reConnectGroup.visible = false;
                NetConnectionUI.instance.connectGroup.visible = false;
                NetConnectionUI.instance.shotflowerGroup.visible = true;
            }
        }

        public static showNetDisconnect():void {
             if(NetConnectionUI.instance.stage == null) {
                NetConnectionUI.instance.waitType = 2;
             } else {
                 NetConnectionUI.instance.reConnectGroup.visible = true;
                NetConnectionUI.instance.connectGroup.visible = false;
                NetConnectionUI.instance.shotflowerGroup.visible = false;
             }
            PopUpManager.addPopUp(NetConnectionUI.instance, true, 0, 0, 0);
        }

        public static hide():void {
            PopUpManager.removePopUp(NetConnectionUI.instance, 0);
        }

        private onSimulateProgress(time:number):boolean {
            if(time > this.endTime) {
                egret.stopTick(this.onSimulateProgress, this);
                this.onProgress(1000, 1000);
            } else {
                let lefttime = this.endTime - time;
                if(lefttime < 0) lefttime = 0;
                this.onProgress((8000 - lefttime), 8000);
            }
            return false;
        }

        public onProgress(current: number, total: number): void {
            if(this.progressbar){
                let width =  (current / total) * this.progressbar.width;
                this.maskRect.width = width;
            }
            let percent = (current / total) * 100;
            // this.textField.text = `Loading...` + percent.toFixed(0) + "%";
            this.progressLabel.text = percent.toFixed(0) + "%";
        }
    }
}