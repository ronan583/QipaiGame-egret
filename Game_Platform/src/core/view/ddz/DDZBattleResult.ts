module game.ddz {
    export class DDZBattleResult extends ResizePanel {
        public constructor() {
            super();

            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.skinName = "resource/eui_skins/ddz/ddzBattleResultUI.exml";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.items = [this.item1, this.item2, this.item3];
            this.onAddToStage();
            this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueBtn, this);
            this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveBtn, this);
        }


        public item1: DDZResultItem;
        public item2: DDZResultItem;
        public item3: DDZResultItem;

        public items: Array<DDZResultItem>;

        public leaveBtn: eui.Button;
        public continueBtn: eui.Group;

        private endTime: number;

        private winAnim:DragonAnim;
        private failAnim:DragonAnim;
        private resultGroup:eui.Group;
        private bgWinAnim:DragonAnim;
        private bgFailAnim:DragonAnim;
        private lordAnim:DragonAnim;
        private farmerAnim:DragonAnim;

        private onAddToStage(): void {
            this.winAnim.visible = false;
            this.failAnim.visible = false;
            this.bgWinAnim.visible = false;
            this.bgFailAnim.visible = false;
            this.lordAnim.visible = false;
            this.farmerAnim.visible = false;
            let battleData: game.ddz.DDZBattleData = game.ddz.DDZBattleData.getInstance();
            let battleFinishData: game.ddz.BattleFinishInfo = battleData.finishData;
            this.resultGroup.visible = false;
            let isWin = false;
            let islord = false;
            if (battleData.landlordId == UserService.instance.playerId) {
                isWin = battleFinishData.isWin;
                islord = true;
            } else {
                isWin = !battleFinishData.isWin;
                islord = false;
            }

            if (isWin) {
                game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.WIN);
                this.winAnim.visible = true;
                this.winAnim.playerOnce(()=>{   
                    this.winAnim.visible = false;
                    this.resultGroup.visible = true;
                    this.bgWinAnim.visible = true;
                    this.bgWinAnim.setLoop(false);
                    this.bgWinAnim.playerOnce(()=>{
                        this.bgWinAnim.setLoop(true);
                        this.bgWinAnim.playerAnimOnce("idle", 0);
                    }, this, "start");
                    if(islord) {
                        this.lordAnim.visible = true;
                        this.lordAnim.setLoop(true);
                        this.lordAnim.playerAnimOnce("win", 0);
                    } else {
                        this.farmerAnim.visible = true;
                        this.farmerAnim.setLoop(true);
                        this.farmerAnim.playerAnimOnce("win", 0);
                    }
                }, this, islord ? "dizhu" : "nongming")
            } else {
                game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.LOSE);
                this.failAnim.visible = true;
                this.failAnim.playerOnce(()=>{   
                    this.failAnim.visible = false;
                    this.resultGroup.visible = true;
                    this.bgFailAnim.visible = true;
                    this.bgFailAnim.setLoop(false);
                    this.bgFailAnim.playerOnce(()=>{
                        this.bgFailAnim.setLoop(true);
                        this.bgFailAnim.playerAnimOnce("idle", 0);
                    }, this, "start");
                    if(islord) {
                        this.lordAnim.visible = true;
                        this.lordAnim.setLoop(true);
                        this.lordAnim.playerAnimOnce("lose", 0);
                    } else {
                        this.farmerAnim.visible = true;
                        this.farmerAnim.setLoop(true);
                        this.farmerAnim.playerAnimOnce("lose", 0);
                    }
                }, this, islord ? "dizhu" : "nongming")
            }

            for (let i = 0; i < battleFinishData.playerInfos.length; i++) {
                this.items[i].showFinishPlayer(battleFinishData.playerInfos[i]);
            }

            this.endTime = battleData.finishData.countdownEndTime;
            egret.startTick(this.onTick, this);
        }

        private onTick(timestamp: number): boolean {
            if (timestamp < this.endTime) {
                this.continueBtn['leftTime'].text = '(' + Math.floor((this.endTime - timestamp) / 1000).toFixed(0) + ')';
            } else {
                egret.stopTick(this.onTick, this);
                PopUpManager.removePopUp(this);
            }
            return true;
        }

        private onLeaveBtn(): void {
            PopUpManager.removePopUp(this);
            RoomRequest.leaveRoom(ChildGameType.DDZ);
        }

        private onRemove() {
            egret.stopTick(this.onTick, this);
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
            game.ddz.DDZSoundPlayer.instance.playBg();
            game.ddz.DDZBattleData.getInstance().clearData();
            // RoomRequest.trusteeship(ChildGameType.DDZ, false);
            RoomRequest.sendBeady(true, game.ChildGameType.DDZ);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLEAR_DDZ_BATTLE_UI_WITHOUT_CARDS);
        }
    }
}