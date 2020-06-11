module game.lhdz {
	export class LhdzStartMediator  extends BaseMediator {

			public static NAME: string = "LhdzStartPanelMediator";
			
			public constructor(viewComponent: any = null) {
				super(LhdzStartMediator.NAME, viewComponent);
			}
			
			public listNotificationInterests(): Array<any> {
				return [
					PanelNotify.OPEN_LHDZ_START_UI,
					PanelNotify.CLOSE_LHDZ_START_UI,
					CommonDataNotify.LHDZ_LIST_ROOM,
					CommonDataNotify.LHDZ_SINGLE_ROOM,
					PanelNotify.UPDATE_LHDZ_RADIO_UI,
					CommonDataNotify.SYNCH_PLAYER_INFO,
					PanelNotify.RESUME_APP
				];
			}
			private lhdzStartPanel : NLhdzStartPanel;
			public handleNotification(notification: puremvc.INotification): void {
				var data: any = notification.getBody();
				if(notification.getName() != PanelNotify.OPEN_LHDZ_START_UI && (this.lhdzStartPanel == null || this.lhdzStartPanel.stage == null))
				{
					return;
				}
				switch (notification.getName()) {
				
					case PanelNotify.OPEN_LHDZ_START_UI:{
						if(this.lhdzStartPanel == null)
						{
							this.lhdzStartPanel = new NLhdzStartPanel();
						}
						if( this.lhdzStartPanel.stage == null)
						{
							PopUpManager.addPopUp(this.lhdzStartPanel, false, 0, 0, 0);
							/*
							LhdzRequest.requestRoomList(0);
							AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
							this.lhdzStartPanel.showUI();
							*/
						}
						break;
					}
					case PanelNotify.CLOSE_LHDZ_START_UI:{
						if(this.lhdzStartPanel != null && this.lhdzStartPanel.parent != null)
						{
							//this.lhdzStartPanel.clearTimeout();
							PopUpManager.removePopUp(this.lhdzStartPanel, 0);	
						}

					}
					break;
					case CommonDataNotify.LHDZ_LIST_ROOM:{
						if(this.lhdzStartPanel.parent != null)
						{
							this.lhdzStartPanel.initUI(data.roomInfos);
							AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);

						}
						break;
					}
					case CommonDataNotify.LHDZ_SINGLE_ROOM:{
						//console.log("gameLevel" + data.roomInfos.gameLevel + " , downTime:" + data.roomInfos.downTime)
						//this.lhdzStartPanel.updateSingleRoom(data);
						break;
					}
					case PanelNotify.RESUME_APP:{
						//console.log("PanelNotify.RESUME_APP....");
						if(this.lhdzStartPanel.parent != null)
						{
							LhdzRequest.requestRoomList(0);
							//this.lhdzStartPanel.clearTimeout();
							// this.lhdzStartPanel.initUI(data.roomInfos);
						}
						break;
					}
					case PanelNotify.UPDATE_LHDZ_RADIO_UI:{
						//this.lhdzStartPanel.updateGameLevel(data);
						break;
					}
					case CommonDataNotify.SYNCH_PLAYER_INFO:{
						if(this.lhdzStartPanel != null && this.lhdzStartPanel.parent != null)
						{
							//this.lhdzStartPanel.goldNum.text = UserService.instance.money.toFixed(2);
						}
						break;
					}
				}
			}
		}
	
}