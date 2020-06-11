module game.lhdz {
	export class LhdzBattleMediator extends GameMeditator {

		public static NAME: string = "LhdzBattleMediator";

		public constructor(viewComponent: any = null) {
			super(LhdzBattleMediator.NAME, viewComponent, PanelNotify.OPEN_LHDZ_BATTLE_UI);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_LHDZ_BATTLE_UI,
				PanelNotify.CLOSE_LHDZ_BATTLE_UI,
				PanelNotify.OPEN_LHDZ_HISTORY_UI,
				CommonDataNotify.LHDZ_PUSH_BATTLESTATUS,
				CommonDataNotify.LHDZ_STAKE_RET,
				CommonDataNotify.LHDZ_SHOWCARD,
				CommonDataNotify.LHDZ_PLAYERRANK,
				CommonDataNotify.LHDZ_HISTORY,
				CommonDataNotify.LHDZ_FIRST_ENTERROOM,
				CommonDataNotify.LHDZ_UP_BANKER,
				CommonDataNotify.LHDZ_DOWN_BANKER,
				PanelNotify.RESUME_APP,
				PanelNotify.SOCKET_RECONNECT
			];
		}
		private lhdzBattleScene: LhdzBattleScene = null;
		private lhdzPlayerListPanel: LhdzPlayerListPanel = null;
		private lhdzZSPanel: LhdzHistoryPanel = null;

		public isUIShow(): boolean {
			return this.lhdzBattleScene != null && this.lhdzBattleScene.stage != null;
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			if (notification.getName() != PanelNotify.OPEN_LHDZ_BATTLE_UI && (this.lhdzBattleScene == null || this.lhdzBattleScene.stage == null)) {
				return;
			}
			switch (notification.getName()) {
				case PanelNotify.OPEN_LHDZ_BATTLE_UI: {
					if (this.lhdzBattleScene == null) {
						this.viewComponent = this.lhdzBattleScene = new LhdzBattleScene();
					}
					if (this.lhdzBattleScene.stage == null) {
						PopUpManager.addPopUp(this.lhdzBattleScene, false, 0, 0, 0);
						LhdzSoundPlayer.instance.playBg();
						this.lhdzBattleScene.initScene();
					} else {
						this.lhdzBattleScene.updatePlayerInfo();
					}
					LhdzSoundPlayer.instance.playBg();
					break;
				}
				case PanelNotify.CLOSE_LHDZ_BATTLE_UI: {
					this.lhdzBattleScene.backToMainBg();
					this.lhdzBattleScene.battleStartCountDown.stop();
					this.lhdzBattleScene.clearAllTimeOut();
					this.sendNotification(PanelNotify.OPEN_LHDZ_START_UI);
					PopUpManager.removePopUp(this.lhdzBattleScene);
					break;
				}
				case CommonDataNotify.LHDZ_PUSH_BATTLESTATUS: {
					this.lhdzBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.LHDZ_STAKE_RET: {
					this.lhdzBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.LHDZ_SHOWCARD: {
					this.lhdzBattleScene.startDealCard(data);
					break;
				}
				case CommonDataNotify.LHDZ_PLAYERRANK: {
					if (this.lhdzPlayerListPanel == null) {
						this.lhdzPlayerListPanel = new LhdzPlayerListPanel();
					}
					PopUpManager.addPopUp(this.lhdzPlayerListPanel, true, 0, 0, 1);
					this.lhdzPlayerListPanel.initPlayerList(data.rankInfo);
					this.lhdzBattleScene.updateOnlineNum(data.rankInfo);
					break;
				}
				case CommonDataNotify.LHDZ_HISTORY: {
					this.lhdzBattleScene.UpdateHistory(data);
					if (this.lhdzZSPanel != null && this.lhdzZSPanel.parent != null) {
						if (this.lhdzZSPanel.visible == false) {
							this.lhdzZSPanel.visible = true;
						}
						this.lhdzZSPanel.showHistory(data);
					}
					break;
				}
				case PanelNotify.OPEN_LHDZ_HISTORY_UI: {
					if (this.lhdzZSPanel == null) {
						this.lhdzZSPanel = new LhdzHistoryPanel();
					}
					PopUpManager.addPopUp(this.lhdzZSPanel, true, 0, 0, 1);
					if (this.lhdzZSPanel.visible) {
						this.lhdzZSPanel.visible = false;
					}
					LhdzRequest.requestOPWinFail(0);
					break;
				}
				case CommonDataNotify.LHDZ_FIRST_ENTERROOM: {
					AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					if (this.lhdzBattleScene != null && this.lhdzBattleScene.parent != null) {
						this.lhdzBattleScene.firstEnterRoom(data);
					}
					break;
				}
				case CommonDataNotify.LHDZ_UP_BANKER: {
					this.lhdzBattleScene.upBanker(data);
					break;
				}
				case CommonDataNotify.LHDZ_DOWN_BANKER: {
					this.lhdzBattleScene.downBanker(data);
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.RESUME_APP: {
					if (this.lhdzBattleScene && this.lhdzBattleScene.stage) {
						// this.lhdzBattleScene.clearAllTimeOut();
						// this.lhdzBattleScene.ResumScene();
						if (RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.LHDZ, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_LHDZ_BATTLE_UI);
						}
					}
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.PAUSE_APP: {
					if (this.lhdzBattleScene) {
						this.lhdzBattleScene.clearAllTimeOut();
					}
					break;
				}
			}
		}
	}
}