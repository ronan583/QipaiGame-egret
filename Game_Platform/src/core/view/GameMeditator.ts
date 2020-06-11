class GameMeditator extends BaseMediator {

	private openNotify:string = "";

	public constructor(mediatorName: string = "", viewComponent: Object = null, openNotify:string = "") {
		super(mediatorName, viewComponent);
		this.openNotify = openNotify;
	}

	private cacheNotifications:Array<puremvc.INotification> = [];

	public handleNotification(notification: puremvc.INotification): void {
		if(this.openNotify == notification.getName()) {
			this.handleNotificationSafe(notification);
			return;
		}

		if(this.viewComponent && this.viewComponent instanceof game.GameScene) {
			let gameScene:game.GameScene = <game.GameScene> this.viewComponent;
			if(gameScene.Inited) {
				this.handleNotificationSafe(notification);
			} else {
				this.cacheNotifications.push(notification);
				gameScene.notifyObj = this;
				gameScene.notifyFunc = this.handleCache;
			}
		}
		// else {
		//		this.handleNotificationSafe(notification);
		//}
	}

	private handleCache() {
		for(let notification of this.cacheNotifications) {
			this.handleNotificationSafe(notification);
		}
		this.cacheNotifications = [];
	}

	protected handleNotificationSafe(notification: puremvc.INotification) {

	}


}