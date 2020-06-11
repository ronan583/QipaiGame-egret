class QynnBattleMediator extends BaseMediator {

    public static NAME: string = "QynnBattleMediator";

    public constructor(viewComponent: any = null) {
        super(QynnBattleMediator.NAME, viewComponent);
    }

    public listNotificationInterests(): Array<any> {
        return [
            PanelNotify.OPEN_QYNN_BATTLE_UI,
            PanelNotify.CLOSE_QYNN_BATTLE_UI,
            CommonDataNotify.QYNN_START_BATTLE,
            CommonDataNotify.QYNN_ROBBANKER_RET,
            CommonDataNotify.QYNN_PUSHBANKER,
            CommonDataNotify.QYNN_ROBSTAKE_RET,
            CommonDataNotify.QYNN_DEALCARD,
            CommonDataNotify.QYNN_LOOKCARD,
            CommonDataNotify.QYNN_BATTLEFINNISH,
            CommonDataNotify.QYNN_RECONNECT,
            CommonDataNotify.QYNN_PUSHREADY,
            PanelNotify.RESUME_APP

        ];
    }
    private qynnBattleScene: QynnBattleScene = null;
    public handleNotification(notification: puremvc.INotification): void {
        var data: any = notification.getBody();
        if (notification.getName() != PanelNotify.OPEN_QYNN_BATTLE_UI && (this.qynnBattleScene == null || this.qynnBattleScene.stage == null)) {
            return;
        }
        switch (notification.getName()) {
            case PanelNotify.OPEN_QYNN_BATTLE_UI: {
                if (this.qynnBattleScene == null) {
                    this.viewComponent = this.qynnBattleScene = new QynnBattleScene();
                }
                if (this.qynnBattleScene.stage == null) {
                    PopUpManager.addPopUp(this.qynnBattleScene, false, 0, 0, 0);
                    QYNNSoundPlayer.instance.playQYNNBg();
                    this.qynnBattleScene.initScene();
                } else {
                    this.qynnBattleScene.updateScene();
                }
                break;
            }
            case PanelNotify.CLOSE_QYNN_BATTLE_UI: {
                this.qynnBattleScene.battleStartCountDown.stop();
                this.qynnBattleScene.clearAllTimeOut();
                if (this.qynnBattleScene.goldContentLayer.numChildren > 0) {
                    this.qynnBattleScene.goldContentLayer.removeChildren();
                }
                PopUpManager.removePopUp(this.qynnBattleScene);
                QYNNSoundPlayer.instance.backToMainBg();
                BattleLeaveTips.closeTips();
                break;
            }
            case CommonDataNotify.QYNN_START_BATTLE:
                {
                    this.qynnBattleScene.onBatteStart(data);
                    break;
                }
            case CommonDataNotify.QYNN_ROBBANKER_RET:
                {
                    this.qynnBattleScene.onQZRet(data);
                    break;
                }
            case CommonDataNotify.QYNN_PUSHBANKER:
                {
                    this.qynnBattleScene.onPushBanker(data);
                    break;
                }
            case CommonDataNotify.QYNN_ROBSTAKE_RET:
                {
                    this.qynnBattleScene.onXZRet(data);
                    break;
                }
            case CommonDataNotify.QYNN_DEALCARD:
                {
                    this.qynnBattleScene.onDealCard(data);
                    break;
                }
            case CommonDataNotify.QYNN_LOOKCARD:
                {
                    this.qynnBattleScene.onLookCardRet(data);
                    break;
                }
            case CommonDataNotify.QYNN_BATTLEFINNISH:
                {
                    if (this.qynnBattleScene == null || this.qynnBattleScene.stage == null) {
                        return;
                    }
                    this.qynnBattleScene.onBatteFinish(data);
                    break;
                }
            case CommonDataNotify.QYNN_RECONNECT:
                {
                    console.log("QYNN_RECONNECT");
                    this.qynnBattleScene.qynnReconnect(data);
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);

                    break;
                }
            case CommonDataNotify.QYNN_PUSHREADY:
                {
                    console.log("QYNN_PUSHREADY");
                    RoomRequest.sendBeady(true, game.ChildGameType.QYNN);
                    break;
                }
            case PanelNotify.RESUME_APP:
                {
                    if (game.RoomManager.getInstance().curRoomData == null) {
                        return;
                    }
                    console.log('RESUME_APP!!!!!!');
                    this.qynnBattleScene.ResumScene();
                    QynnRequest.requestFirstEnterRoom(game.RoomManager.getInstance().curRoomData.gameLevel);
                    break;
                }
        }
    }
}