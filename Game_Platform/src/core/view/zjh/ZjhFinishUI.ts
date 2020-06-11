module game {
    export class ZjhFinishUI extends eui.Component {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/zjhRoom/ZjhBattleFinish.exml";
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public countdownLabel:eui.Label = null;
        public winTitle:eui.Group;
        public loseTitle:eui.Group;
        public timeWait:eui.Group;
        public continueBtn:eui.Group;
        public leaveBtn:eui.Button;

        private startTime:number=0;
        private waitAnim:CommonDBLoop2;

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public waitTime:number = 0;

        private waitForClose:boolean = false;

        public end():void {
            egret.stopTick(this.tick, this);
        }

        public hideAll():void {
            this.winTitle.visible = false;
            this.loseTitle.visible = false;
            // this.timeWait.visible = false;
            this.continueBtn.visible = false;
            this.leaveBtn.visible = false;
        }

        protected childrenCreated():void {
            if(this.waitTime > 0) {
                this.showBattleFinishInfo();
            }
            this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueBtnClick, this)
            this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveBtnClick, this)
            this.waitAnim = new CommonDBLoop2("kaishiyouxi_ske_dbbin", "kaishiyouxi_tex_json", "kaishiyouxi_tex_png", "animation");
            this.waitAnim.touchEnabled = false;
            this.waitAnim.touchChildren = false;
            this.timeWait.addChild(this.waitAnim);
            this.waitAnim.x = 0;
            this.waitAnim.y = 25;
        }

        private onContinueBtnClick(e:egret.TouchEvent):void {
            egret.stopTick(this.tick, this);
            PopUpManager.removePopUp(this, 1);
            RoomManager.getInstance().curRoomData.status = GameStatus.PREPARE;
            AppFacade.getInstance().sendNotification(PanelNotify.ZJH_CLEAR_BATTLE);
            RoomRequest.sendEnterRoomInfo(ChildGameType.ZJH, RoomManager.getInstance().curRoomData.gameLevel);
        }

        private onLeaveBtnClick(e:egret.TouchEvent):void {
            egret.stopTick(this.tick, this);
            PopUpManager.removePopUp(this, 1);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ZJH_BATTLE_UI);
            // GameLayerManager.gameLayer().panelLayer.removeChildren();
        }

        public showBattleFinishInfo():void {
            if(this.stage == null) return;
            
            this.hideAll();
            let finishData:zjh.ZJHBattleFinishData = zjh.ZJHData.getInstance().BattleFinishData;
            if(finishData.winPlayerId == UserService.instance.playerId) {
                //this.winTitle.visible = true;
            } else {
                //this.loseTitle.visible = true;
            }
            let self:game.zjh.ZJHBattleFinishPlayer = finishData.getFinishPlayer(UserService.instance.playerId);
            if(self != null && self.isTrusteeship) {
                // 托管状态
                this.continueBtn.visible = true;
                this.leaveBtn.visible = true;
                this.waitForClose = true;
                // this.timeWait.visible = false;
            } else {
                this.waitForClose = false;
                this.timeWait.visible = true;
                this.continueBtn.visible = false;
                // this.leaveBtn.visible = false;
            }
            this.showCountDown();
        }

        public showCountDown() : void {
            egret.startTick(this.tick, this);
            this.startTime = egret.getTimer();
        }

        public tick(timeStamp: number):boolean {
            let leftTime = Math.floor(((this.startTime + this.waitTime * 1000) - timeStamp) / 1000);
            if(leftTime <= 0) {
                egret.stopTick(this.tick, this);
                PopUpManager.removePopUp(this, 1);
                if(this.waitForClose) {
                    // GameLayerManager.gameLayer().panelLayer.removeChildren();
                }
                AppFacade.getInstance().sendNotification(CommonDataNotify.ZJH_CLEAR_BATTLE);
            } else {
                this.countdownLabel.text = leftTime.toString();
            }
            return true;
        }


    }
}