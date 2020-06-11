module game {
 
	export class WaitLoadingMediator extends BaseMediator 
	{
		public static NAME: string = "WaitLoadingMediator";

		public constructor(viewComponent: any = null) {
			super(WaitLoadingMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_WAITLOADING_PANEL,
				PanelNotify.CLOSE_WAITLOADING_PANEL
			];
		}
		private panel: WaitLoadingTips = null;
		private data: any;
		public handleNotification(notification: puremvc.INotification): void {
			this.data = notification.getBody();
			switch (notification.getName()) {
				case PanelNotify.OPEN_WAITLOADING_PANEL: {
					//显示面板
					if(this.panel == null) {
						this.panel = new WaitLoadingTips();
					}
					PopUpManager.addPopUp(this.panel , true , 0 , 0 , 1);
					this.panel.showLoading(this.data);
					break;
				}
				case PanelNotify.CLOSE_WAITLOADING_PANEL: {
					if(this.panel != null && this.panel.parent != null)
					{
						PopUpManager.removePopUp(this.panel);
						this.panel.hideLoading();
					}
					break;
				}
			}
		}

	}
}