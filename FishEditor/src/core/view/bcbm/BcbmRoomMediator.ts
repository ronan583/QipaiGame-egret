module game.bcbm {
	export class BcbmRoomMediator  extends BaseMediator {

			public static NAME: string = "BcbmRoomMediator";
			
			public constructor(viewComponent: any = null) {
				super(BcbmRoomMediator.NAME, viewComponent);
			}
			
			public listNotificationInterests(): Array<any> {
				return [
					PanelNotify.OPEN_BCBM_ROOM_UI,
					PanelNotify.CLOSE_BCBM_ROOM_UI
				];
			}
			private bcbmRoomUI : BcbmRoomUI;
			public handleNotification(notification: puremvc.INotification): void {
				var data: any = notification.getBody();
				if(notification.getName() != PanelNotify.OPEN_BCBM_ROOM_UI && (this.bcbmRoomUI == null || this.bcbmRoomUI.stage == null))
				{
					return;
				}
				switch (notification.getName()) {
				
					case PanelNotify.OPEN_BCBM_ROOM_UI:{
						if(this.bcbmRoomUI == null)
						{
							this.bcbmRoomUI = new BcbmRoomUI();
						}
						if( this.bcbmRoomUI.stage == null)
						{
							PopUpManager.addPopUp(this.bcbmRoomUI, false, 0, 0, 0);
							/*
							LhdzRequest.requestRoomList(0);
							AppFacade.getInstance().sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
							this.lhdzStartPanel.showUI();
							*/
						}
						break;
				}
				case PanelNotify.CLOSE_BCBM_ROOM_UI:{
					if(this.bcbmRoomUI != null && this.bcbmRoomUI.parent != null){
						PopUpManager.removePopUp(this.bcbmRoomUI, 0);
					}
					break;
				}
			}
		}
	}
}