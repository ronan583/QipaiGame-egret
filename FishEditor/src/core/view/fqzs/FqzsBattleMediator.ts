module game.fqzs {
	export class FqzsBattleMediator extends BaseMediator {

		public static NAME: string = "FqzsBattleMediator";

		public constructor(viewComponent: any = null) {
			super(FqzsBattleMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_FQZS_BATTLE_UI,
				PanelNotify.CLOSE_FQZS_BATTLE_UI,
				CommonDataNotify.FQZS_FIRST_ENTERROOM,
				CommonDataNotify.FQZS_PUSH_BATTLESTATUS,
				CommonDataNotify.FQZS_STAKE_RET,
				CommonDataNotify.FQZS_PLAYERRANK,
				CommonDataNotify.FQZS_HISTORY,
				CommonDataNotify.FQZS_BATTLEFINSH,
				CommonDataNotify.FQZS_UPBANKER,
				CommonDataNotify.FQZS_DOWNBANKER,
				PanelNotify.RESUME_APP,
				PanelNotify.PAUSE_APP,
				PanelNotify.SOCKET_RECONNECT
			];
		}

		private fqzsBattleScene: FqzsBattleScene = null;
		private fqzsPlayerListPanel: FqzsPlayerListPanel = null;

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			if (notification.getName() != PanelNotify.OPEN_FQZS_BATTLE_UI && (this.fqzsBattleScene == null || this.fqzsBattleScene.stage == null)) {
				return;
			}
			switch (notification.getName()) {
				case PanelNotify.OPEN_FQZS_BATTLE_UI: {
					if (this.fqzsBattleScene == null) {
						this.fqzsBattleScene = new FqzsBattleScene();
					}
					if (this.fqzsBattleScene.stage == null) {
						PopUpManager.addPopUp(this.fqzsBattleScene, false, 0, 0, 0);
						FqzsSoundPlayer.instance.playBg();
						this.fqzsBattleScene.initScene();
					} else {
						this.fqzsBattleScene.updatePlayerInfo();
					}
					break;
				}
				case PanelNotify.CLOSE_FQZS_BATTLE_UI: {
					this.fqzsBattleScene.ResumScene();
					SoundMenager.instance.playBg("hallBG_mp3");
					this.sendNotification(PanelNotify.OPEN_FQZS_START_UI);
					PopUpManager.removePopUp(this.fqzsBattleScene);
					break;
				}
				case CommonDataNotify.FQZS_FIRST_ENTERROOM: {
					AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					if (this.fqzsBattleScene != null && this.fqzsBattleScene.parent != null) {
						this.fqzsBattleScene.firstEnterRoom(data);
					}
					break;
				}
				case CommonDataNotify.FQZS_PUSH_BATTLESTATUS: {
					this.fqzsBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.FQZS_UPBANKER: {
					this.fqzsBattleScene.updateBanker(data);
					break;
				}
				case CommonDataNotify.FQZS_DOWNBANKER: {
					this.fqzsBattleScene.downBankers(data);
					break;
				}
				case CommonDataNotify.FQZS_STAKE_RET: {
					this.fqzsBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.FQZS_PLAYERRANK: {
					if (this.fqzsPlayerListPanel == null) {
						this.fqzsPlayerListPanel = new FqzsPlayerListPanel();
					}
					PopUpManager.addPopUp(this.fqzsPlayerListPanel, true, 0, 0, 1);
					this.fqzsPlayerListPanel.initPlayerList(data.playerInfo);
					this.fqzsBattleScene.playerLabel.text = data.playerInfo.length + '';
					break;
				}
				case CommonDataNotify.FQZS_HISTORY: {
					this.fqzsBattleScene.UpdateHistory(data);
					break;
				}
				case CommonDataNotify.FQZS_BATTLEFINSH: {
					this.fqzsBattleScene.onBattleFinish(data);
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.RESUME_APP: {
					if (this.fqzsBattleScene && this.fqzsBattleScene.stage) {
						if (RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.FQZS, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_QYNN_BATTLE_UI);
						}
					}
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.PAUSE_APP: {
					if (this.fqzsBattleScene) {
						this.fqzsBattleScene.clearAllTimeOut();
					}
					break;
				}
			}
		}
	}
}