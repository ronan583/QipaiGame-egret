module game.hhdz {
	export class HhdzBattleMediator extends GameMeditator {

		public static NAME: string = "HhdzBattleMediator";

		public constructor(viewComponent: any = null) {
			super(HhdzBattleMediator.NAME, viewComponent, PanelNotify.OPEN_HHDZ_BATTLE_UI);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_HHDZ_BATTLE_UI,
				PanelNotify.CLOSE_HHDZ_BATTLE_UI,
				PanelNotify.OPEN_HHDZ_HISTORY_UI,
				CommonDataNotify.HHDZ_PUSH_BATTLESTATUS,
				CommonDataNotify.HHDZ_STAKE_RET,
				CommonDataNotify.HHDZ_SHOWCARD,
				CommonDataNotify.HHDZ_PLAYERRANK,
				CommonDataNotify.HHDZ_HISTORY,
				CommonDataNotify.HHDZ_FIRST_ENTERROOM,
				CommonDataNotify.HHDZ_DOWN_BANKER_RET,
				CommonDataNotify.HHDZ_APPLY_BANKER_RET,
				PanelNotify.RESUME_APP,
				PanelNotify.SOCKET_RECONNECT,
				PanelNotify.BACK_HHDZ
			];
		}
		private hhdzBattleScene: HhdzBattleScene = null;
		private hhdzPlayerListPanel: HhdzPlayerListPanel = null;
		private hhdzZSPanel: HhdzHistoryPanel = null;

		public isUIShow(): boolean {
			return this.hhdzBattleScene != null && this.hhdzBattleScene.stage != null;
		}

		public handleNotificationSafe(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			if (notification.getName() != PanelNotify.OPEN_HHDZ_BATTLE_UI && (this.hhdzBattleScene == null || this.hhdzBattleScene.stage == null)) {
				return;
			}
			switch (notification.getName()) {
				case PanelNotify.OPEN_HHDZ_BATTLE_UI: {
					if (this.hhdzBattleScene == null) {
						this.viewComponent = this.hhdzBattleScene = new HhdzBattleScene();
					}
					if (this.hhdzBattleScene.stage == null) {
						PopUpManager.addPopUp(this.hhdzBattleScene, false, 0, 0, 0);
						HhdzSoundPlayer.instance.playBg();
						this.hhdzBattleScene.initScene();
					}
					this.hhdzBattleScene.showHeadInfo();
					HhdzSoundPlayer.instance.playBg();
					break;
				}
				case PanelNotify.CLOSE_HHDZ_BATTLE_UI: {
					this.sendNotification(PanelNotify.OPEN_HHDZ_START_UI);
					PopUpManager.removePopUp(this.hhdzBattleScene);
					SoundMenager.instance.playBg("hallBG_mp3");
					break;
				}
				case CommonDataNotify.HHDZ_PUSH_BATTLESTATUS: {
					this.hhdzBattleScene.updateBattleStatus(data);
					break;
				}
				case CommonDataNotify.HHDZ_STAKE_RET: {
					this.hhdzBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.HHDZ_SHOWCARD: {
					this.hhdzBattleScene.startDealCard(data);
					break;
				}
				case CommonDataNotify.HHDZ_PLAYERRANK: {
					if (this.hhdzPlayerListPanel == null) {
						this.hhdzPlayerListPanel = new HhdzPlayerListPanel();
					}
					if(this.hhdzBattleScene) {
						this.hhdzBattleScene.refreshOnlineCcount(data.rankInfo.length);
					}
					PopUpManager.addPopUp(this.hhdzPlayerListPanel, true, 0, 0, 1);
					this.hhdzPlayerListPanel.initPlayerList(data.rankInfo);
					break;
				}
				case CommonDataNotify.HHDZ_HISTORY: {
					if (this.hhdzZSPanel != null && this.hhdzZSPanel.parent != null) {
						if (this.hhdzZSPanel.visible == false) {
							this.hhdzZSPanel.visible = true;
						}
						this.hhdzZSPanel.showHistory(data);
					}
					break;
				}
				case PanelNotify.OPEN_HHDZ_HISTORY_UI: {
					if (this.hhdzZSPanel == null) {
						this.hhdzZSPanel = new HhdzHistoryPanel();
					}
					PopUpManager.addPopUp(this.hhdzZSPanel, true, 0, 0, 1);
					if (this.hhdzZSPanel.visible) {
						this.hhdzZSPanel.visible = false;
					}
					HhdzRequest.requestOPWinFail(0);
					break;
				}
				case CommonDataNotify.HHDZ_FIRST_ENTERROOM: {
					if (this.hhdzBattleScene) {
						this.hhdzBattleScene.firstEnterRoom(data);
					}
					// AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					break;
				}
				case PanelNotify.RESUME_APP: {
					if (this.hhdzBattleScene.parent != null) {
						this.hhdzBattleScene.ResumScene();
						HhdzRequest.requestFirstEnterRoom(UserService.roomId);
					}
					break;
				}
				case PanelNotify.SOCKET_RECONNECT: {
					if(this.hhdzBattleScene && this.hhdzBattleScene.stage) {
						this.hhdzBattleScene.clearAllTimeOut();
						this.hhdzBattleScene.ResumScene();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.HHDZ, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HHDZ_BATTLE_UI);
						}
					}
					break;
				}
				case CommonDataNotify.HHDZ_APPLY_BANKER_RET:
					this.hhdzBattleScene.onApplyBankerRet(data);
				break;
				case CommonDataNotify.HHDZ_DOWN_BANKER_RET:
					this.hhdzBattleScene.downBankerRet(data);
				break;
				case PanelNotify.BACK_HHDZ:
					if(this.hhdzBattleScene) this.hhdzBattleScene.onBackhall();
				break;
			}
		}
	}
}