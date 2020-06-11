module game {

    export class NHallMediator extends BaseMediator {
        public static NAME: string = "NHallMediator";
        private userInfoPanel: UserInfoPanel;
        private rankUI: RankUI;
        private bankUI: BankUI;
        private depositUI: DepositPanel;
        private withdrawUI: WithdrawPanel;
        private exchangeUI: ExchangesPanel;
        private chargePanel: ChargePanel;
        public constructor(viewComponent: any = null) {
            super(NHallMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [SceneNotify.OPEN_HALL,
            CommonDataNotify.PUSH_BROADCAST,
            PanelNotify.OPEN_USERINFO_PANEL,
            ResponseModify.SUCCESS_CHANGEHEADICON_RESPONSE,
            PanelNotify.OPEN_EXCHANGE_PANEL,
            PanelNotify.OPEN_RANK_PANEL,
            PanelNotify.OPEN_BANK_PANEL,
            PanelNotify.OPEN_BANK_DEPOSIT_PANEL,
            PanelNotify.OPEN_BANK_WITHDRAW_PANEL,
            ResponseModify.REQUEST_RANKING_RESPONSE,
            PanelNotify.OPEN_CHARGE_PANEL,
            PanelNotify.REFRESH_HALL_GAME_ICON,
            PanelNotify.UPDATE_GAME_STATUS,
            PanelNotify.REFRESH_GAME_ICONS,
            PanelNotify.SHOW_WAIT_DOWNLOAD_STATE,
            ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE,
            ResponseModify.SUCCESS_RESETNAME_RESPONSE,
            ResponseModify.SUCCESS_REG_RESPONSE,
            SceneNotify.CLOSE_HALL,
            ResponseModify.SUCCESS_EXCHANGE_RESPONSE,
            ResponseModify.RQEUEST_EXCHANGERECODE_RESPONSE,
            CommonDataNotify.SYNCH_PLAYER_INFO];
        }

        private hallUI: NHallUI = null;

        public isUIShow(): boolean {
            return this.hallUI != null && this.hallUI.stage != null;
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case SceneNotify.OPEN_HALL: {
                    if (!this.hallUI) this.hallUI = new NHallUI();
                    if (!this.hallUI.stage) {
                        GameLayerManager.gameLayer().mainLayer.addChild(this.hallUI);
                    } else {
                        game.NetConnectionUI.hide();
                    }
                    if (GameLayerManager.gameLayer().findGameScenes().length > 0) {
                        game.NetConnectionUI.hide();
                    }
                    SoundMenager.instance.playBg("hallBG_mp3");
                    break;
                }
                case CommonDataNotify.PUSH_BROADCAST: {
                    this.hallUI.noticeScrollText.addNoticeItem(data);
                    break;
                }
                case PanelNotify.OPEN_USERINFO_PANEL: {
                    if (this.userInfoPanel == null) {
                        this.userInfoPanel = new UserInfoPanel();
                    }
                    PopUpManager.addPopUp(this.userInfoPanel, true, 0, 0, 1);
                    break;
                }
                case ResponseModify.SUCCESS_CHANGEHEADICON_RESPONSE: {
                    if (this.userInfoPanel != null) {
                        this.userInfoPanel.updateHeadIcon(data);
                    }
                    this.hallUI.updateHeadIcon(data);
                    break;
                }
                case PanelNotify.OPEN_RANK_PANEL: {
                    if (this.rankUI == null) {
                        this.rankUI = new RankUI();
                    }
                    this.rankUI.reqeustData();
                    PopUpManager.addPopUp(this.rankUI, true, 0, 0, 1);
                    break;
                }
                case ResponseModify.REQUEST_RANKING_RESPONSE: {
                    if (this.rankUI != null) {
                        this.rankUI.updateUI(data);
                    }
                    break;
                }
                case PanelNotify.OPEN_BANK_DEPOSIT_PANEL: {
                    if (this.depositUI == null) {
                        this.depositUI = new DepositPanel(data);
                    }
                    this.depositUI.initUI();
                    PopUpManager.addPopUp(this.depositUI, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.OPEN_BANK_WITHDRAW_PANEL: {
                    if (this.withdrawUI == null) {
                        this.withdrawUI = new WithdrawPanel(data);
                    }
                    this.withdrawUI.initUI();
                    PopUpManager.addPopUp(this.withdrawUI, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.OPEN_BANK_PANEL: {
                    if (this.bankUI == null) {
                        this.bankUI = new BankUI();
                    }
                    PopUpManager.addPopUp(this.bankUI, true, 0, 0, 1);
                    this.bankUI.initUI();
                    break;
                }
                case PanelNotify.OPEN_EXCHANGE_PANEL: {
                    if (this.exchangeUI == null) {
                        this.exchangeUI = new ExchangesPanel();
                    }
                    var type: any = 0;
                    if (data != null && data !== "") {
                        type = data;
                    }
                    this.exchangeUI.initUI(type);
                    PopUpManager.addPopUp(this.exchangeUI, true, 0, 0, 1);
                    break;
                }
                case ResponseModify.SUCCESS_EXCHANGE_RESPONSE: {
                    if (this.exchangeUI != null && this.exchangeUI.exchangeAccount != null) {
                        this.exchangeUI.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
                        this.exchangeUI.exchangeAccount.closeBtnClick();
                    }
                    TipsUtils.showTipsFromCenter("兑换成功");
                    break;
                }
                case ResponseModify.RQEUEST_EXCHANGERECODE_RESPONSE: {
                    this.exchangeUI.UpdateExchangeRecord(data);
                    break;
                }
                case ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE: {
                    if (this.bankUI != null) {
                        this.bankUI.initUI();
                    }
                    if (this.depositUI != null) {
                        this.depositUI.initUI();
                        this.depositUI.closeBtnClick(null);
                    }
                    if (this.withdrawUI != null) {
                        this.withdrawUI.initUI();
                        this.withdrawUI.closeBtnClick(null);
                    }
                    this.hallUI.refreshPlayerInfo();
                    // if (this.exchangeUI != null) {
                    //     this.exchangeUI.initUI();
                    // }
                    // this.hallUI.goldNum.text = Number(UserService.instance.money).toFixed(2);
                    // this.hallUI.bankNum.text = Number(UserService.instance.bankMoney).toFixed(2);
                    break;
                }
                case PanelNotify.OPEN_CHARGE_PANEL: {
                    if (this.chargePanel == null) {
                        this.chargePanel = new ChargePanel();
                    }
                    PopUpManager.addPopUp(this.chargePanel, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.REFRESH_HALL_GAME_ICON:
                    if (this.hallUI && this.hallUI.stage) this.hallUI.refreshGameIcons();
                    break;
                case PanelNotify.UPDATE_GAME_STATUS:
                    if (this.hallUI && this.hallUI.stage) this.hallUI.showUpdateProgress(<DownloadInfo>data);
                    break;
                case PanelNotify.REFRESH_GAME_ICONS:
                    if (this.hallUI && this.hallUI.stage) this.hallUI.refreshGameIcons();
                    break;
                case PanelNotify.SHOW_WAIT_DOWNLOAD_STATE:
                    if (this.hallUI && this.hallUI.stage) this.hallUI.showGameWaitDownload(data);
                    break;
                case ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE:
                    if (this.hallUI && this.hallUI.stage) this.hallUI.refreshPlayerInfo();
                    break;
                case SceneNotify.CLOSE_HALL: {
                    if (this.hallUI != null) {
                        GameLayerManager.gameLayer().mainLayer.removeChild(this.hallUI);
                        this.hallUI = null;
                    }
                    break;
                }
                case ResponseModify.SUCCESS_RESETNAME_RESPONSE: {
                    TipsUtils.showTipsFromCenter("名称修改成功");
                    if (this.userInfoPanel != null) {
                        this.userInfoPanel.updateName();
                    }
                    this.hallUI.updateName();
                    break;
                }
                case ResponseModify.SUCCESS_REG_RESPONSE: {
                    if (UserService.instance.isFormal) {
                        this.hallUI.zhuceGroup.visible = false;
                    }
                    if (this.userInfoPanel != null) {
                        this.userInfoPanel.showInfo();
                    }
                    break;
                }
                case CommonDataNotify.SYNCH_PLAYER_INFO:
                    this.hallUI.refreshPlayerInfo();
                    break;
            }
        }
    }
}