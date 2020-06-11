module game.hhdz {
	export class HhdzStartMediator extends BaseMediator {

		public static NAME: string = "HhdzStartMediator";

		public constructor(viewComponent: any = null) {
			super(HhdzStartMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_HHDZ_START_UI,
				PanelNotify.CLOSE_HHDZ_START_UI,
				CommonDataNotify.HHDZ_LIST_ROOM,
				CommonDataNotify.HHDZ_SINGLE_ROOM,
				PanelNotify.UPDATE_HHDZ_RADIO_UI,
				CommonDataNotify.SYNCH_PLAYER_INFO,
				PanelNotify.RESUME_APP
			];
		}
		private hhdzStartPanel: NHhdzStartPanel;
		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			if (notification.getName() != PanelNotify.OPEN_HHDZ_START_UI && (this.hhdzStartPanel == null || this.hhdzStartPanel.stage == null)) {
				return;
			}
			switch (notification.getName()) {

				case PanelNotify.OPEN_HHDZ_START_UI: {
					if (this.hhdzStartPanel == null) {
						this.hhdzStartPanel = new NHhdzStartPanel();
					}
					if (this.hhdzStartPanel.stage == null) {
						PopUpManager.addPopUp(this.hhdzStartPanel, false, 0, 0, 0);
						/*
						HhdzRequest.requestRoomList(0);
						AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
						this.hhdzStartPanel.showUI();
						*/
					}
					break;
				}
				case PanelNotify.CLOSE_HHDZ_START_UI: {
					//this.hhdzStartPanel.clearTimeout();
					PopUpManager.removePopUp(this.hhdzStartPanel, 0);

				}
					break;
				case CommonDataNotify.HHDZ_LIST_ROOM: {
					if (this.hhdzStartPanel != null && this.hhdzStartPanel.parent != null) {
						this.hhdzStartPanel.initUI(data.roomInfos);
						AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					}
					break;
				}
				case CommonDataNotify.HHDZ_SINGLE_ROOM: {
					//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
					//this.hhdzStartPanel.updateSingleRoom(data);
					break;
				}
				case PanelNotify.RESUME_APP: {
					//console.log("PanelNotify.RESUME_APP....");
					if (this.hhdzStartPanel.parent != null) {
						//this.hhdzStartPanel.clearTimeout();
						HhdzRequest.requestRoomList(0);
						// this.lhdzStartPanel.initUI(data.roomInfos);
					}
					break;
				}
				case PanelNotify.UPDATE_HHDZ_RADIO_UI: {
					//this.hhdzStartPanel.updateGameLevel(data);
					break;
				}
				case CommonDataNotify.SYNCH_PLAYER_INFO: {
					if (this.hhdzStartPanel != null && this.hhdzStartPanel.parent != null) {
						//this.hhdzStartPanel.goldNum.text = UserService.instance.money.toFixed(2);
					}
					break;
				}
			}
		}
	}
}