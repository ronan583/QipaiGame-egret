/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.pdk {

    export class PDKBattleMediator extends BaseMediator {
        public static NAME: string = "PDKBattleMediator";

        public constructor(viewComponent: any = null) {
            super(PDKBattleMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_PDK_BATTLE_UI,
                PanelNotify.PDK_REFRESH_ON_RECONNECT,
                PanelNotify.PDK_REFRESH_ON_START,
                PanelNotify.PDK_REFRESH_ON_FIGHT,
                PanelNotify.PDK_PLAY_CARD,
                PanelNotify.SHOW_TABLE_CARDS,
                PanelNotify.REMOVE_PLAY_CARDS,
                PanelNotify.SHOW_TIPS_ON_SCORE,
                PanelNotify.SHOW_TIPS_ON_MULTI,
                PanelNotify.REFRESH_HAND_CARDS,
                PanelNotify.SHOW_TIPS_ON_DONOT,
                PanelNotify.PDK_BATTLE_END,
                PanelNotify.CLOSE_PDK_BATTLE_UI,
                PanelNotify.PDK_PLAY_CARD_TIPS,
                PanelNotify.DDZ_REFRESH_MULTI,
                PanelNotify.SHOW_LEFT_CARDS,
                PanelNotify.CHANGE_TRUSTEESHIP_STATE,
                PanelNotify.CLEAR_PDK_BATTLE_UI,
                PanelNotify.PDK_REFRESH_MONEY,
                PanelNotify.PDK_BOMB_SCORE,
                PanelNotify.PDK_CLEAR_LAST_TIP,
                PanelNotify.RESUME_APP,
                PanelNotify.SOCKET_RECONNECT,
                PanelNotify.PDK_SELF_PLAY_CARDS,
                PanelNotify.PDK_OTHERS_PLAY,
                PanelNotify.CARD_SEND_RULE_ERROR
            ];
        }
        public pdkBattleScene: game.pdk.PDKBattleUI = null;

        public isUIShow(): boolean {
            return this.pdkBattleScene != null && this.pdkBattleScene.stage != null;
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_PDK_BATTLE_UI: {
                    if (this.pdkBattleScene == null || this.pdkBattleScene.stage == null) {
                        this.viewComponent = this.pdkBattleScene = new game.pdk.PDKBattleUI();
                        this.showUI(this.pdkBattleScene, true, 0, 0, 1);
                        game.pdk.PDKSoundPlayer.instance.playBg();

                    } else {
                        // this.pdkBattleScene.clearBattle();
                        if (RoomManager.getInstance().curRoomData.status == GameStatus.PREPARE) {
                            this.pdkBattleScene.clearBattle();
                        }
                    }
                    this.pdkBattleScene.refreshWait();
                    this.pdkBattleScene.refreshPlayer();
                    break;
                }
                case PanelNotify.CLOSE_PDK_BATTLE_UI:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.clearBattle();
                        this.closePanel();
                        PDKSoundPlayer.instance.backToMainBg();
                        this.pdkBattleScene.closeResult();
                        TipsUI.removeTips(TipsUI.instance);
                        PDKBattleData.getInstance().clearData();
                    }
                    break;
                case PanelNotify.PDK_REFRESH_ON_START:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.refreshBattleInfo(notification.getBody());
                    }
                    break;
                case PanelNotify.PDK_REFRESH_ON_RECONNECT:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.refreshBattleInfo();
                    }
                    break;
                case PanelNotify.PDK_REFRESH_ON_FIGHT:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.refreshFightStatus();
                    }
                    break;
                case PanelNotify.PDK_PLAY_CARD:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.playCard();
                    }
                    break;
                case PanelNotify.REMOVE_PLAY_CARDS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.removePlayCards();
                    }
                    break;
                case PanelNotify.SHOW_TABLE_CARDS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.showTableCards();
                    }
                    break;
                case PanelNotify.REFRESH_HAND_CARDS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.refrehHandCards(data);
                    }
                    break;
                case PanelNotify.SHOW_TIPS_ON_DONOT:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.showDonotTip(data);
                    }
                    break;
                case PanelNotify.PDK_BATTLE_END:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.battleEnds();
                    }
                    break;
                case PanelNotify.PDK_PLAY_CARD_TIPS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.showTipsCard();
                    }
                    break;
                case PanelNotify.SHOW_LEFT_CARDS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.showLeftCards(data);
                    }
                    break;
                case PanelNotify.CHANGE_TRUSTEESHIP_STATE:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.changeTrusteeshipState(data);
                    }
                    break;
                case PanelNotify.CLEAR_PDK_BATTLE_UI:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.clearBattle();
                    }
                    break;
                case PanelNotify.JIABEI_COMPLETE:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.onJiabeiComplete();
                    }
                    break;
                case PanelNotify.PDK_REFRESH_MONEY:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.refreshMoney();
                    }
                    break;
                case PanelNotify.PDK_BOMB_SCORE:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.showScore(data);
                    }
                    break;
                case PanelNotify.PDK_CLEAR_LAST_TIP:
                    game.pdk.PDKBattleData.getInstance().clearLastTip();
                    break;
                case PanelNotify.RESUME_APP:
                case PanelNotify.SOCKET_RECONNECT:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.clearBattle();
                        RoomRequest.sendEnterRoomInfo(ChildGameType.PDK, RoomManager.getInstance().curRoomData.gameLevel);
                    }
                    break;

                case PanelNotify.PDK_SELF_PLAY_CARDS:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.selfPlayCards();
                    }
                break;
                case PanelNotify.PDK_OTHERS_PLAY:
                        if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                            this.pdkBattleScene.othersPlay();
                        }
                break;
                case PanelNotify.CARD_SEND_RULE_ERROR:
                    if (this.pdkBattleScene && this.pdkBattleScene.stage) {
                        this.pdkBattleScene.onSendCardError();
                    }
                break;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {

        }


        /**
         * 初始化面板数据
         */
        public initData(): void {
        }

        public destroy(): void {

        }

    }
}