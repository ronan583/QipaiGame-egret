module game.pdk {
    export class PDKBattleResult extends ResizePanel {
        public constructor() {
            super();

            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/pdk/pdkBattleResultUI.exml";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.items = [this.item1, this.item2, this.item3];
            // this.resultMc = new game.ddz.DDZResultMc();
            // this.win.addChild(this.resultMc);
            // this.resultMc.x = this.win.width / 2;
            // this.resultMc.y = this.win.height / 2;
            this.onAddToStage();

            this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueBtn, this);
            this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveBtn, this);
        }

        public winOrLoseFlag: eui.Image;
        public win: eui.Group;
        public lose: eui.Group;
        public item1: PDKResultItem;
        public item2: PDKResultItem;
        public item3: PDKResultItem;
        // private resultMc: game.ddz.DDZResultMc;

        public items: Array<PDKResultItem>;

        public leaveBtn: eui.Button;
        public continueBtn: eui.Group;
        public leftTime: eui.BitmapLabel;
        private bgImg: eui.Image;
        private endTime: number;

        private onAddToStage(): void {
            let battleData: game.pdk.PDKBattleData = game.pdk.PDKBattleData.getInstance();
            let battleFinishData: game.pdk.BattleFinishInfo = battleData.finishData;
            let selfWin: boolean = battleFinishData.isWin;
            // this.resultMc.showMc(selfWin);
            if (selfWin) {
                this.bgImg.source = "pdk_battle_json.pdk_result_win";
            } else {
                this.bgImg.source = "pdk_battle_json.pdk_result_lose";
            }
            for (let i = 0; i < battleFinishData.playerInfos.length; i++) {
                this.items[i].showFinishPlayer(battleFinishData.playerInfos[i]);
            }

            this.endTime = battleData.finishData.countdownEndTime;
            egret.startTick(this.onTick, this);
        }

        private onTick(timestamp: number): boolean {
            if (timestamp < this.endTime) {
                this.leftTime.text = Math.floor((this.endTime - timestamp) / 1000).toFixed(0);
            } else {
                egret.stopTick(this.onTick, this);
                PopUpManager.removePopUp(this);
            }
            return true;
        }

        private onLeaveBtn(): void {
            PopUpManager.removePopUp(this);
            RoomRequest.leaveRoom(ChildGameType.PDK);
            // game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DDZ_BATTLE_UI);
        }

        private onContinueBtn(): void {
            //  先判断钱后不够 不够的化打开充值面板
            let money = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId).money;
            if (money < RoomManager.getInstance().curRoomData.enterMinMoney) {
                // 不够的化打开充值面板
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
                return;
            }
            PopUpManager.removePopUp(this);
            egret.stopTick(this.onTick, this);
            game.pdk.PDKSoundPlayer.instance.playBg();
            game.pdk.PDKBattleData.getInstance().clearData();
            RoomRequest.sendBeady(true, ChildGameType.PDK);
            RoomManager.getInstance().curRoomData.status = GameStatus.PREPARE;
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLEAR_PDK_BATTLE_UI);
            // RoomRequest.sendEnterRoomInfo(ChildGameType.DDZ, RoomManager.getInstance().curRoomData.gameLevel);
        }
    }
}