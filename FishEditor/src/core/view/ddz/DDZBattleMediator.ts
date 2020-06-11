/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.ddz {

    export class DDZBattleMediator extends GameMeditator {
        public static NAME: string = "DDZBattleMediator";

        public constructor(viewComponent: any = null) {
            super(DDZBattleMediator.NAME, viewComponent, PanelNotify.OPEN_DDZ_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            if(game.DDZRule.IsDDZDebug) {
                return [PanelNotify.OPEN_DDZ_BATTLE_UI]
            } else {
                return [
                    PanelNotify.OPEN_DDZ_BATTLE_UI,
                    PanelNotify.DDZ_REFRESH_ON_RECONNECT,
                    PanelNotify.DDZ_REFRESH_ON_START,
                    PanelNotify.DDZ_REFRESH_ON_CALLSCORE,
                    PanelNotify.DDZ_REFRESH_ON_FIGHT,
                    PanelNotify.DDZ_REFRESH_ON_MULTI,
                    PanelNotify.DDZ_PLAY_CARD,
                    PanelNotify.SHOW_TABLE_CARDS,
                    PanelNotify.REMOVE_PLAY_CARDS,
                    PanelNotify.SHOW_TIPS_ON_SCORE,
                    PanelNotify.SHOW_TIPS_ON_MULTI,
                    PanelNotify.REFRESH_HAND_CARDS,
                    PanelNotify.SHOW_TIPS_ON_DONOT,
                    PanelNotify.DDZ_BATTLE_END,
                    PanelNotify.CLOSE_DDZ_BATTLE_UI,
                    PanelNotify.DDZ_PLAY_CARD_TIPS,
                    PanelNotify.DDZ_REFRESH_MULTI,
                    PanelNotify.SHOW_LEFT_CARDS,
                    PanelNotify.CHANGE_TRUSTEESHIP_STATE,
                    PanelNotify.CLEAR_DDZ_BATTLE_UI,
                    PanelNotify.JIABEI_COMPLETE,
                    PanelNotify.DDZ_REFRESH_MONEY,
                    PanelNotify.RESUME_APP,
                    PanelNotify.SOCKET_RECONNECT,
                    PanelNotify.CLEAR_DDZ_BATTLE_UI_WITHOUT_CARDS,
                    PanelNotify.DDZ_PLAY_CLEAR_ALL_CHOOSE,
                    PanelNotify.DDZ_CLEAR_SCORE_OR_MULTI_SHOW,
                    PanelNotify.SELF_PLAY_CARDS,
                    PanelNotify.CARD_SEND_RULE_ERROR,
                    PanelNotify.DDZ_OTHERS_PLAY,
                    PanelNotify.DDZ_REFRESH_MULTI_DETAIL
                ];
            }
            
        }
        private ddzBattleScene: DDZBattleUI = null;

        public isUIShow(): boolean {
            return this.ddzBattleScene != null && this.ddzBattleScene.stage != null;
        }

        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DDZ_BATTLE_UI: {
                    if (this.ddzBattleScene == null || this.ddzBattleScene.stage == null) {
                        this.viewComponent = this.ddzBattleScene = new DDZBattleUI();
                        this.showUI(this.ddzBattleScene, true, 0, 0, 1);
                        game.ddz.DDZSoundPlayer.instance.playBg();
                    } else {
                        if (RoomManager.getInstance().curRoomData.status == GameStatus.PREPARE) {
                            this.ddzBattleScene.clearBattle();
                        }
                    }
                    this.ddzBattleScene.refreshWait();
                    this.ddzBattleScene.refreshPlayer();
                    AppFacade.getInstance().sendNotification(PanelNotify.HIDE_MAINUI_AND_ROOM);
                    break;
                }
                case PanelNotify.CLOSE_DDZ_BATTLE_UI:
                    if (this.ddzBattleScene != null) {
                        this.ddzBattleScene.clearBattle();
                        this.closePanel();
                        DDZSoundPlayer.instance.backToMainBg();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_ON_START:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshBattleInfo(true);
                        this.ddzBattleScene.forceResetMulti();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_ON_RECONNECT:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshBattleInfo();
                        this.ddzBattleScene.forceResetMulti();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_ON_CALLSCORE:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshJiaofenStatus();
                        if (game.ddz.DDZBattleData.getInstance().battleStatus == game.ddz.DDZStatus.JIABEI) {
                            this.ddzBattleScene.refreshJiabeiStatus();
                        }
                        this.ddzBattleScene.refreshBottomCards();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_ON_MULTI:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshJiabeiStatus();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_ON_FIGHT:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshFightStatus();
                    }
                    break;
                case PanelNotify.DDZ_PLAY_CARD:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.playCard();
                    }
                    break;
                case PanelNotify.REMOVE_PLAY_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.removePlayCards();
                    }
                    break;
                case PanelNotify.SHOW_TABLE_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showTableCards();
                    }
                    break;
                case PanelNotify.SHOW_TIPS_ON_SCORE:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showScoreTips(data.playerId, data.score);
                    }
                    break;
                case PanelNotify.SHOW_TIPS_ON_MULTI:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showMultiTips(data.playerId, data.multi);
                    }
                    break;
                case PanelNotify.REFRESH_HAND_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refrehHandCards(data);
                    }
                    break;
                case PanelNotify.SHOW_TIPS_ON_DONOT:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showDonotTip(data);
                    }
                    break;
                case PanelNotify.DDZ_BATTLE_END:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.battleEnds();
                    }
                    break;
                case PanelNotify.DDZ_PLAY_CARD_TIPS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showTipsCard();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_MULTI:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showTotalMulti();
                    }
                    break;
                case PanelNotify.SHOW_LEFT_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.showLeftCards(data);
                    }
                    break;
                case PanelNotify.CHANGE_TRUSTEESHIP_STATE:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.changeTrusteeshipState(data);
                    }
                    break;
                case PanelNotify.CLEAR_DDZ_BATTLE_UI:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.clearBattle();
                    }
                    break;
                case PanelNotify.JIABEI_COMPLETE:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.onJiabeiComplete();
                    }
                    break;
                case PanelNotify.DDZ_REFRESH_MONEY:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshMoney();
                    }
                    break;
                case PanelNotify.RESUME_APP:
                case PanelNotify.SOCKET_RECONNECT:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.clearBattle();
                        console.log('错误退出---');
                        if(RoomManager.getInstance().curRoomData) {
                            RoomRequest.sendEnterRoomInfo(ChildGameType.DDZ, RoomManager.getInstance().curRoomData.gameLevel);
                        } else {
                            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DDZ_BATTLE_UI);
                        }
                    }
                    break;
                case PanelNotify.CLEAR_DDZ_BATTLE_UI_WITHOUT_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.clearBattleWithoutCards();
                    }
                case PanelNotify.DDZ_PLAY_CLEAR_ALL_CHOOSE:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.clearAllChoose();
                    }
                    break;
                case PanelNotify.DDZ_CLEAR_SCORE_OR_MULTI_SHOW:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.clearJiabeiOrJiaofen();
                    }
                break;
                case PanelNotify.SELF_PLAY_CARDS:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.selfPlayCards();
                    }
                break;
                case PanelNotify.CARD_SEND_RULE_ERROR:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.onSendCardError();
                    }
                break;
                case PanelNotify.DDZ_OTHERS_PLAY:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.othersPlay();
                    }
                break;
                case PanelNotify.DDZ_REFRESH_MULTI_DETAIL:
                    if (this.ddzBattleScene && this.ddzBattleScene.stage) {
                        this.ddzBattleScene.refreshMultiDetail();
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