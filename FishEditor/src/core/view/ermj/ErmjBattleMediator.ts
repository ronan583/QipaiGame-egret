module game.ermj {
	export class ErmjBattleMediator extends BaseMediator {

		public static NAME: string = "ErmjBattleMediator";

		public static SHOW_TINGINFO: string = "ErmjBattleMediator.SHOW_TINGINFO";
		public static START_GAME: string = "ErmjBattleMediator.START_GAME";

		public constructor(viewComponent: any = null) {
			super(ErmjBattleMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_ERMJ_BATTLE_UI,
				PanelNotify.CLOSE_ERMJ_BATTLE_UI,
				CommonDataNotify.ERMJ_START_BATTLE,
				CommonDataNotify.ERMJ_ENTER_ROOM,
				CommonDataNotify.ERMJ_PLAY_BATTLE,
				CommonDataNotify.ERMJ_FINISH_BATTLE,
				ErmjBattleMediator.SHOW_TINGINFO,
				ErmjBattleMediator.START_GAME,
				CommonDataNotify.ERMJ_PUSH_BATTLESTEP,
				CommonDataNotify.ERMJ_CHECK_ROOM,
				PanelNotify.CHANGE_TRUSTEESHIP_STATE,
				PanelNotify.RESUME_APP,
				PanelNotify.SOCKET_RECONNECT
			];
		}
		private ermjBattleScene: ErmjBattleScene = null;

		public isUIShow(): boolean {
			return this.ermjBattleScene != null && this.ermjBattleScene.stage != null;
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case CommonDataNotify.ERMJ_ENTER_ROOM: {
					if (this.ermjBattleScene == null) {
						this.viewComponent = this.ermjBattleScene = new ErmjBattleScene();
					}
					if (this.ermjBattleScene.stage == null) {
						PopUpManager.addPopUp(this.ermjBattleScene, false, 0, 0, 0);
						this.ermjBattleScene.initScene();
						this.ermjBattleScene.enterRoomRet();
					} else {
						this.ermjBattleScene.enterRoomRet();
					}
					break;
				}
				case PanelNotify.CLOSE_ERMJ_BATTLE_UI: {
					this.ermjBattleScene.backToMainBg();
					this.ermjBattleScene.battleStartCountDown.stop();
					this.ermjBattleScene.clearAllTimeOut();
					PopUpManager.removePopUp(this.ermjBattleScene);
					ErmjSoundPlayer.instance.backToMainBg();
					if (this.ermjBattleScene.battleFinish != null && this.ermjBattleScene.battleFinish.parent != null) {
						PopUpManager.removePopUp(this.ermjBattleScene.battleFinish);
					}
					break;
				}
				case CommonDataNotify.ERMJ_START_BATTLE: {
					this.ermjBattleScene.startGameRet(data);
					break;
				}
				case CommonDataNotify.ERMJ_PLAY_BATTLE: {
					// this.ermjBattleScene.playBattleStep(data);
					break;
				}
				case CommonDataNotify.ERMJ_FINISH_BATTLE: {
					this.ermjBattleScene.onBattleFinish(data);
					break;
				}
				case ErmjBattleMediator.SHOW_TINGINFO: {
					this.ermjBattleScene.showSelfTingInfo(data);
					break;
				}
				case ErmjBattleMediator.START_GAME: {
					this.ermjBattleScene.startGame();
					break;
				}
				case CommonDataNotify.ERMJ_PUSH_BATTLESTEP: {
					this.ermjBattleScene.onPushBattleStep(data);
					break;
				}
				case CommonDataNotify.ERMJ_CHECK_ROOM: {
					console.log("40005 ==== ", data);
					if (!data.inRoom) {
						RoomRequest.sendEnterRoomInfo(game.ChildGameType.ERMJ, this.ermjBattleScene.roomIndex);
					} else {
						this.ermjBattleScene.startGame();
					}
					break;
				}
				case PanelNotify.CHANGE_TRUSTEESHIP_STATE: {
					this.ermjBattleScene.trusteeship();
					break;
				}
				case PanelNotify.RESUME_APP: {
					if (this.ermjBattleScene.parent != null) {
						this.ermjBattleScene.clearAllTimeOut();
						this.ermjBattleScene.ResumScene();
						let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
						if (roomData != null && roomData.gameType == ChildGameType.ERMJ) {
							RoomRequest.sendEnterRoomInfo(roomData.gameType, roomData.gameLevel);
						}
					}
					break;
				}
				case PanelNotify.SOCKET_RECONNECT: {
					if (this.ermjBattleScene != null) {
						this.ermjBattleScene.clearAllTimeOut();
						this.ermjBattleScene.ResumScene();
						let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
						if (roomData != null && roomData.gameType == ChildGameType.ERMJ) {
							RoomRequest.sendEnterRoomInfo(roomData.gameType, roomData.gameLevel);
						}
					}
					break;
				}
			}
		}
	}
}