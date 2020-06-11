module game.bjl {
	export class BjlStartPanelMediator extends BaseMediator {

		public static NAME: string = "BjlStartPanelMediator";
		
        public constructor(viewComponent: any = null) {
            super(BjlStartPanelMediator.NAME, viewComponent);
        }
		
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BJL_START_UI,
                PanelNotify.CLOSE_BJL_START_UI,
				CommonDataNotify.BJL_ROOMLIST_RET,
				CommonDataNotify.BJL_SINGLE_ROOM_PUSH,
				PanelNotify.UPDATE_BJL_RADIOCHANGE_UI,
				CommonDataNotify.SYNCH_PLAYER_INFO,
                PanelNotify.RESUME_APP
            ];
        }
		private bjlStartPanel : NBjlStartPanel;
		public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
			if(notification.getName() != PanelNotify.OPEN_BJL_START_UI && (this.bjlStartPanel == null || this.bjlStartPanel.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
            
				case PanelNotify.OPEN_BJL_START_UI:{
					if(this.bjlStartPanel == null)
					{
						this.bjlStartPanel = new NBjlStartPanel();
					}
					if( this.bjlStartPanel.stage == null)
                    {
                        PopUpManager.addPopUp(this.bjlStartPanel, false, 0, 0, 0);
						/*
						AppFacade.getInstance().sendNotification(PanelNotify.HIDE_MAINUI_AND_ROOM);
						BjlRequest.requestRoomList(0);
						AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
						*/
						this.bjlStartPanel.showUI();
					}
					break;
				}
				case PanelNotify.CLOSE_BJL_START_UI:{
					// this.bjlStartPanel.clearTimeout();
					AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
					PopUpManager.removePopUp(this.bjlStartPanel, 0);	

				}
				break;
				case CommonDataNotify.BJL_ROOMLIST_RET:{
					if(this.bjlStartPanel.parent != null)
					{
						this.bjlStartPanel.initUI(data.roomInfos);
						AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					}
					break;
				}
				case CommonDataNotify.BJL_SINGLE_ROOM_PUSH:{
					//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
					//this.bjlStartPanel.updateSingleRoom(data);
					break;
				}
				case PanelNotify.RESUME_APP:{
					//console.log("PanelNotify.RESUME_APP....");
					if(this.bjlStartPanel.parent != null)
					{
						BjlRequest.requestRoomList(0);
						//this.bjlStartPanel.clearTimeout();
						// this.bjlStartPanel.initUI(data.roomInfos);
					}
					break;
				}
				case CommonDataNotify.SYNCH_PLAYER_INFO:{
					if(this.bjlStartPanel != null && this.bjlStartPanel.parent != null)
					{
						//this.bjlStartPanel.goldNum.text = UserService.instance.money.toFixed(2);
					}
					break;
				}
				case PanelNotify.UPDATE_BJL_RADIOCHANGE_UI:{
					//this.bjlStartPanel.updateGameLevel(data);
					break;
				}
			}
		}
	}
}