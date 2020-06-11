/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
module game.dzpk {

    export class DZPKBattleMediator extends GameMeditator {
        public static NAME: string = "DZPKBattleMediator";

        public constructor(viewComponent: any = null) {
            super(DZPKBattleMediator.NAME, viewComponent, PanelNotify.OPEN_DZPK_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_DZPK_BATTLE_UI,
                PanelNotify.CLOSE_DZPK_BATTLE_UI,
                PanelNotify.DZPK_REFRESH_ON_ENTER,
                PanelNotify.DZPK_REFRESH_ON_START,
                PanelNotify.DZPK_REFRESH_BET_ON_INIT,
                PanelNotify.DZPK_SHOW_SINGLE_BET,
                PanelNotify.DZPK_REFRESH_OPERATION_BAR,
                PanelNotify.DZPK_SHOW_PUBLIC_CARDS,
                PanelNotify.DZPK_BATTLE_END,
                PanelNotify.DZPK_SHOW_CARD_TYPE,
                PanelNotify.DZPK_SHOW_BET,
                PanelNotify.SHOW_CHIP_COLLECT_ANIM,
                PanelNotify.DZPK_REFRESH_PLAYER_MONEY,
                PanelNotify.DZPK_REFRESH_TOTAL_BET,
                PanelNotify.DZPK_CHANGE_CLOCK,
                PanelNotify.DZPK_AUTO_RESET,
                PanelNotify.DZPK_CLEAR_PLAYER_OPER,
                PanelNotify.SOCKET_RECONNECT,
                PanelNotify.REFRESH_CHIPS,
                PanelNotify.RESUME_APP,
                PanelNotify.DZPK_PLAY_PASS_ANIM,
                PanelNotify.DZPK_SELF_CARDS_DROP,
                PanelNotify.DZPK_OTHERS_CARDS_DROP
            ];
        }
        private dzpkBattleUI: DZPKBattleUI = null;

        public isUIShow(): boolean {
            return this.dzpkBattleUI != null && this.dzpkBattleUI.stage != null;
        }

        public handleNotificationSafe(notification: puremvc.INotification): void {
            if (!this.isUIShow() && notification.getName() != PanelNotify.OPEN_DZPK_BATTLE_UI) return;
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DZPK_BATTLE_UI: {
                    if (this.dzpkBattleUI == null) {
                        this.viewComponent = this.dzpkBattleUI = new DZPKBattleUI();
                    }
                    if (!this.dzpkBattleUI.stage) {
                        this.showUI(this.dzpkBattleUI, true, 0, 0, 1);
                    }
                    this.dzpkBattleUI.refreshPlayer();
                    // this.dzpkBattleUI.refreshStatus();
                    this.dzpkBattleUI.refreshWait();
                    game.dzpk.DZPKSoundPlayer.instance.playBg();
                    break;
                }
                case PanelNotify.CLOSE_DZPK_BATTLE_UI:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        // this.dzpkBattleUI.clearBattle();
                        this.closePanel();
                        // DDZSoundPlayer.instance.backToMainBg();
                    }
                    game.dzpk.TexasBattleData.getInstance().clearData();
                    game.dzpk.DZPKSoundPlayer.instance.backToMainBg();
                    break;
                case PanelNotify.DZPK_REFRESH_ON_ENTER:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.refreshPlayer();
                        this.dzpkBattleUI.refreshWait();
                        // this.dzpkBattleUI.startBattle();
                        this.dzpkBattleUI.showInitCard();
                        this.dzpkBattleUI.refreshOperationBar();
                        this.dzpkBattleUI.showTotalBet();
                        this.dzpkBattleUI.showBetOnInit();
                        this.dzpkBattleUI.showPublicCardsOnInit();
                        this.dzpkBattleUI.showChipGroup();
                        this.dzpkBattleUI.showCardType();
                    }
                    break;
                case PanelNotify.DZPK_REFRESH_ON_START:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.refreshPlayer(RefreshReason.ON_START);
                        this.dzpkBattleUI.refreshWait();
                        this.dzpkBattleUI.startBattle();
                        this.dzpkBattleUI.showInitCard(RefreshReason.ON_START);
                        this.dzpkBattleUI.showTotalBet();
                        this.dzpkBattleUI.refreshOperationBar(RefreshReason.ON_START);
                        this.dzpkBattleUI.showChipGroup();
                    }
                    break;
                case PanelNotify.DZPK_REFRESH_BET_ON_INIT:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showBetOnInit();
                    }
                    break;
                case PanelNotify.DZPK_SHOW_SINGLE_BET:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showBetOnSingle(data);
                    }
                    break;
                case PanelNotify.DZPK_REFRESH_OPERATION_BAR:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.refreshOperationBar();
                    }
                    break;
                case PanelNotify.DZPK_SHOW_PUBLIC_CARDS:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showPublicCards(data);
                    }
                    break;
                case PanelNotify.DZPK_BATTLE_END:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showBattleEnd();
                    }
                    break;
                case PanelNotify.DZPK_SHOW_CARD_TYPE:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showCardType();
                    }
                    break;
                case PanelNotify.DZPK_SHOW_BET:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showBet();
                    }
                    break;
                case PanelNotify.SHOW_CHIP_COLLECT_ANIM:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showChipGroup();
                    }
                    break;
                case PanelNotify.REFRESH_CHIPS:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showChipGroup();
                    }
                    break;
                case PanelNotify.DZPK_REFRESH_PLAYER_MONEY:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.refreshPlayerMoney();
                    }
                    break;
                case PanelNotify.DZPK_REFRESH_TOTAL_BET:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showTotalBet();
                    }
                    break;
                case PanelNotify.DZPK_CHANGE_CLOCK:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.showOperationDownTime();
                    }
                    break;
                case PanelNotify.DZPK_AUTO_RESET:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.operationBar.showAutoType(game.dzpk.TexasBattleData.getInstance().autoOperationType);
                    }
                    break;
                case PanelNotify.DZPK_CLEAR_PLAYER_OPER:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.clearPlayerOper();
                    }
                    break;
                case PanelNotify.RESUME_APP:
                case PanelNotify.SOCKET_RECONNECT:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        if (RoomManager.getInstance().curRoomData) {
                            this.dzpkBattleUI.clearBattle();
                            TexasBattleData.getInstance().clearData();
                            RoomRequest.sendEnterRoomInfo(ChildGameType.DZPK, RoomManager.getInstance().curRoomData.gameLevel);
                        } else {
                            this.closePanel();
                        }

                    }
                    break;
                case PanelNotify.DZPK_PLAY_PASS_ANIM:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.playGirlAnim();
                    }
                    break;
                case PanelNotify.DZPK_SELF_CARDS_DROP:
                    if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.selfDropCards();
                    }
                    break;
                case PanelNotify.DZPK_OTHERS_CARDS_DROP:
                     if (this.dzpkBattleUI && this.dzpkBattleUI.stage) {
                        this.dzpkBattleUI.otherDropCards(<number>notification.getBody());
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