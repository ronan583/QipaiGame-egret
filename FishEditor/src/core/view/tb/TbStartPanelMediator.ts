module game.tb {
	export class TbStartPanelMediator extends BaseMediator {

		public static NAME: string = "TbStartPanelMediator";
		
        public constructor(viewComponent: any = null) {
            super(TbStartPanelMediator.NAME, viewComponent);
        }
		
        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_TB_START_UI,
                PanelNotify.CLOSE_TB_START_UI,
				CommonDataNotify.TB_LIST_ROOM,
				CommonDataNotify.TB_SINGLE_ROOM,
				PanelNotify.UPDATE_TB_RADIO_UI,
				CommonDataNotify.SYNCH_PLAYER_INFO,
                PanelNotify.RESUME_APP
            ];
        }
		// private brnnStartPanel : TbStartPanel;
		private tbStartPanel : HlsbStartPanel;
		public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
			if(notification.getName() != PanelNotify.OPEN_TB_START_UI && (this.tbStartPanel == null || this.tbStartPanel.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
            
				case PanelNotify.OPEN_TB_START_UI:
				{
					if(this.tbStartPanel == null)
					{
						this.tbStartPanel = new HlsbStartPanel();
					}

					 if(this.tbStartPanel.stage == null) {
                         this.showUI(this.tbStartPanel, true, 0, 0, 1);
						 /*
						 TbRequest.requestRoomList(game.ChildGameType.DiceBao);
						 AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
						 */
                    }
					break;
				}
				case PanelNotify.CLOSE_TB_START_UI:{
					//this.tbStartPanel.clearTimeout();
					PopUpManager.removePopUp(this.tbStartPanel, 0);	

				}
				break;
				case CommonDataNotify.TB_LIST_ROOM:{
					if(this.tbStartPanel.parent != null)
					{
						this.tbStartPanel.initUI(data.roomInfos);
						AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					}
					break;
				}
				case CommonDataNotify.TB_SINGLE_ROOM:{
					//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
					//this.tbStartPanel.updateSingleRoom(data);
					break;
				}
				case PanelNotify.RESUME_APP:{
					//console.log("PanelNotify.RESUME_APP....");
					if(this.tbStartPanel.parent != null)
					{
						TbRequest.requestRoomList(ChildGameType.DiceBao);
						//this.tbStartPanel.clearTimeout();
						// this.brnnStartPanel.initUI(data.roomInfos);
					}
					break;
				}
				case CommonDataNotify.SYNCH_PLAYER_INFO:{
					if(this.tbStartPanel != null && this.tbStartPanel.parent != null)
					{
						// this.brnnStartPanel.goldNum.text = UserService.instance.money.toFixed(2);
					}
					break;
				}
				case PanelNotify.UPDATE_TB_RADIO_UI:{
					//this.tbStartPanel.updateGameLevel(data);
					break;
				}
			}
		}
	}
}