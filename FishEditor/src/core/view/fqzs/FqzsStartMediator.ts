module game.fqzs {
	export class FqzsStartMediator extends BaseMediator {

		public static NAME: string = "FqzsStartPanelMediator";

		public constructor(viewComponent: any = null) {
			super(FqzsStartMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_FQZS_START_UI,
				PanelNotify.CLOSE_FQZS_START_UI,
				PanelNotify.UPDATE_FQZS_RADIO_UI,
				CommonDataNotify.LHDZ_LIST_ROOM,
				CommonDataNotify.LHDZ_SINGLE_ROOM,
				CommonDataNotify.SYNCH_PLAYER_INFO,
				PanelNotify.RESUME_APP
			];
		}
		private FqzsStartPanel: FqzsStartPanel;
		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			if (notification.getName() != PanelNotify.OPEN_FQZS_START_UI && (this.FqzsStartPanel == null || this.FqzsStartPanel.stage == null)) {
				return;
			}
			switch (notification.getName()) {

				case PanelNotify.OPEN_FQZS_START_UI: {
					if (this.FqzsStartPanel == null) {
						this.FqzsStartPanel = new FqzsStartPanel();
					}
					if (this.FqzsStartPanel.stage == null) {
						PopUpManager.addPopUp(this.FqzsStartPanel, false, 0, 0, 0);
					}
					break;
				}
				case PanelNotify.CLOSE_FQZS_START_UI: {
					if (this.FqzsStartPanel != null && this.FqzsStartPanel.parent != null) {
						PopUpManager.removePopUp(this.FqzsStartPanel, 0);
					}
				}
					break;
				case CommonDataNotify.LHDZ_LIST_ROOM: {
					if (this.FqzsStartPanel.parent != null) {
						this.FqzsStartPanel.initUI(data.roomInfos);
						// AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);

					}
					break;
				}
				case CommonDataNotify.LHDZ_SINGLE_ROOM: {
					//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
					// this.FqzsRequest.updateSingleRoom(data);
					break;
				}
				case PanelNotify.RESUME_APP: {
					if (this.FqzsStartPanel.parent != null) {
						FqzsRequest.requestRoomList(0);
					}
					break;
				}
				case CommonDataNotify.SYNCH_PLAYER_INFO: {
					if (this.FqzsStartPanel != null && this.FqzsStartPanel.parent != null) {
						this.FqzsStartPanel.goldLabel.text = UserService.instance.money.toFixed(2);
					}
					break;
				}
			}
		}
	}

}