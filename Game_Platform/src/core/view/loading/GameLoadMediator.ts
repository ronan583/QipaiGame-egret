/**
 * gameload
* by dily
* (c) copyright 2014 - 2035
* All Rights Reserved. 
*/
class GameLoadMediator extends BaseMediator {
	public static NAME: string = "GameLoadMediator";

	public constructor(viewComponent: any = null) {
		super(GameLoadMediator.NAME, viewComponent);
	}

	public listNotificationInterests(): Array<any> {
		return [
			PanelNotify.OPEN_GAME_LOAD,
			PanelNotify.CLOSE_GAME_LOAD,
			PanelNotify.OPEN_GAME_ON_RES_COMPLETE
		];
	}
	private gameloadScene: GameLoadScene = null;
	private map:HashMap = new HashMap();

	public curActiveLoadScene:GameLoadScene = null;

	public handleNotification(notification: puremvc.INotification): void {
		var data: any = notification.getBody();
		switch (notification.getName()) {
			case PanelNotify.OPEN_GAME_LOAD:
				let gameType = <game.ChildGameType>data;
				this.gameloadScene = this.generateGameLoadScene(gameType);
				GameLayerManager.gameLayer().loadLayer.addChild(this.gameloadScene);
				this.curActiveLoadScene = this.gameloadScene;
				if(LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
                    LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
                }
				if(this.curActiveLoadScene instanceof BYLoadScene) {
					(<BYLoadScene>this.curActiveLoadScene).simulateAnim();
				}
			break;
			case PanelNotify.CLOSE_GAME_LOAD:
				if(this.gameloadScene && this.gameloadScene.stage) {
					this.gameloadScene.leave();
				}
			break
			case PanelNotify.OPEN_GAME_ON_RES_COMPLETE:
				gameType = <game.ChildGameType>data;
				this.gameloadScene = this.generateGameLoadScene(gameType);
				GameLayerManager.gameLayer().loadLayer.addChild(this.gameloadScene);
				if(LoadingUI.loadingUIInstance && LoadingUI.loadingUIInstance.stage) {
                    LoadingUI.loadingUIInstance.parent.removeChild(LoadingUI.loadingUIInstance);
                }
				this.gameloadScene.allowExit = true;
				this.curActiveLoadScene = this.gameloadScene;
				if(this.curActiveLoadScene instanceof BYLoadScene) {
					(<BYLoadScene>this.curActiveLoadScene).leaveFlag = true;
					(<BYLoadScene>this.curActiveLoadScene).simulateAnim();
				}
			break;
		}
	}

	private generateGameLoadScene(gameType:game.ChildGameType) {
		if(this.map.contains("gameLoad_" + gameType)) {
			return this.map.get("gameLoad_" + gameType)
		} else {
			let loadScene = null;
			if(gameType == game.ChildGameType.BY){
				loadScene = new BYLoadScene(gameType);
			} else {
				loadScene = new GameLoadScene(gameType);
			}
			this.map.put("gameLoad_" + gameType, loadScene);
			return loadScene;
		}
	}

	/**
	 * 初始化面板ui
	 */
	public initUI(): void {
		
	}


	/**
	 * 初始化面板数据
	 */
	public initData(): void {
	}

	public destroy(): void {
		
	}

}
