module game.brnn {
	export class BrnnStartPanelMediator extends BaseMediator {

		public static NAME: string = "BrnnStartPanelMediator";
		
        public constructor(viewComponent: any = null) {
            super(BrnnStartPanelMediator.NAME, viewComponent);
        }
		
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BRNN_START_UI,
                PanelNotify.CLOSE_BRNN_START_UI,
				CommonDataNotify.BRNN_LIST_ROOM,
				CommonDataNotify.BRNN_SINGLE_ROOM,
				PanelNotify.UPDATE_BRNN_RADIO_UI,
				CommonDataNotify.SYNCH_PLAYER_INFO,
                PanelNotify.RESUME_APP,
				CommonDataNotify.UPDATE_PLAYER_INFO,
            ];
        }
		private brnnStartPanel : NBrnnStartPanel;
		public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
			if(notification.getName() != PanelNotify.OPEN_BRNN_START_UI && (this.brnnStartPanel == null || this.brnnStartPanel.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
            
				case PanelNotify.OPEN_BRNN_START_UI:
				{
					if(this.brnnStartPanel == null)
					{
						this.brnnStartPanel = new NBrnnStartPanel();
					}
					if( this.brnnStartPanel.stage == null)
                    {
                        PopUpManager.addPopUp(this.brnnStartPanel, false, 0, 0, 0);
						/*
						BrnnRequest.requestRoomList(ChildGameType.BRNN);
						AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");

						// this.brnnStartPanel.showUI();
						*/
					}
					break;
				}
				case PanelNotify.CLOSE_BRNN_START_UI:{
					//this.brnnStartPanel.clearTimeout();
					PopUpManager.removePopUp(this.brnnStartPanel, 0);	

				}
				break;
				case CommonDataNotify.UPDATE_PLAYER_INFO:
					if(this.brnnStartPanel && this.brnnStartPanel.stage) {
						this.brnnStartPanel.refreshInfo();
					}
				break;
				case CommonDataNotify.BRNN_LIST_ROOM:{
					if(this.brnnStartPanel.parent != null)
					{
						this.brnnStartPanel.initUI(data.roomInfos);
						AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					}
					break;
				}
				case CommonDataNotify.BRNN_SINGLE_ROOM:{
					//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
					//this.brnnStartPanel.updateSingleRoom(data);
					break;
				}
				case PanelNotify.RESUME_APP:{
					//console.log("PanelNotify.RESUME_APP....");
					if(this.brnnStartPanel.parent != null)
					{
						BrnnRequest.requestRoomList(ChildGameType.BRNN);
						//this.brnnStartPanel.clearTimeout();
						// this.brnnStartPanel.initUI(data.roomInfos);
					}
					break;
				}
				case CommonDataNotify.SYNCH_PLAYER_INFO:{
					if(this.brnnStartPanel != null && this.brnnStartPanel.parent != null)
					{
						// this.brnnStartPanel.goldNum.text = UserService.instance.money.toFixed(2);
					}
					break;
				}
				case PanelNotify.UPDATE_BRNN_RADIO_UI:{
					//this.brnnStartPanel.updateGameLevel(data);
					break;
				}
			}
		}
	}
}