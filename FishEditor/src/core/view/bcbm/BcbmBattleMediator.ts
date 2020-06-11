module game.bcbm {
	export class BcbmBattleMediator extends BaseMediator{
		public static NAME: string = "BcbmBattleMediator";
		public constructor(viewComponent: any = null) {
			super(BcbmBattleMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_BCBM_BATTLE_UI,
				PanelNotify.CLOSE_BCBM_BATTLE_UI,
				PanelNotify.RESUME_APP,
				PanelNotify.SOCKET_RECONNECT,
				PanelNotify.OPEN_BCBM_HISTORY_UI,
				CommonDataNotify.BCBM_PUSH_BATTLESTATUS,
				CommonDataNotify.BCBM_PUSH_BATTLEFINISH,
				CommonDataNotify.BCBM_STAKE_RET,
				CommonDataNotify.BCBM_SHOWCARD,
				CommonDataNotify.BCBM_ONLINEPLAYER,
				CommonDataNotify.BCBM_FIRST_ENTERROOM,
				CommonDataNotify.BCBM_HISTORY,
				CommonDataNotify.BCBM_UPBANKER,
				CommonDataNotify.BCBM_DOWNBANKER
			]
		}

		private bcbmBattleScene: BcbmBattleScene = null;
		private bcbmOnlinePlayerPanel: BcbmOnlinePlayerPanel = null;

		private isPause = false;

		public handleNotification(notification: puremvc.INotification): void{
			var data: any = notification.getBody();
			if(notification.getName() != PanelNotify.OPEN_BCBM_BATTLE_UI && (this.bcbmBattleScene == null || this.bcbmBattleScene.stage == null)){
				return;
			}
			switch(notification.getName()){
				case PanelNotify.OPEN_BCBM_BATTLE_UI: {
					if(this.bcbmBattleScene == null){
						this.bcbmBattleScene = new BcbmBattleScene();
						
					}
					if(this.bcbmBattleScene.stage == null){
						console.log("bcbmBattleScene.stage == null  initScene");
						// egret.setTimeout(()=>{
							PopUpManager.addPopUp(this.bcbmBattleScene, false, 0 ,0, 0);
						// }, this, 150);
						BcbmSoundPlayer.instance.playBg();
						this.bcbmBattleScene.initScene();
					} else {
						console.log("bcbmBattleScene.stage != null  updateScene");
						this.bcbmBattleScene.updateScene();
					}
					BcbmSoundPlayer.instance.playBg();
					break;
				}

				case PanelNotify.CLOSE_BCBM_BATTLE_UI: {
					// this.bcbmBattleScene.ResumeScene();
					SoundMenager.instance.playBg("hallBG_mp3");
					this.bcbmBattleScene.clearAllTimeOut();
					this.bcbmBattleScene.battleStartCountDown.stop();
					this.sendNotification(PanelNotify.OPEN_BCBM_ROOM_UI);
					PopUpManager.removePopUp(this.bcbmBattleScene);
					break;
				}
				case PanelNotify.RESUME_APP: {
					console.error("========= RESUME_APP");
                    if(this.bcbmBattleScene && this.bcbmBattleScene.stage) {
						// this.brnnBattleScene.clearBattle();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BCBM, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BCBM_BATTLE_UI);
						}
					}
					this.isPause = false;
					break;
				}
				case PanelNotify.SOCKET_RECONNECT: {
					if(this.bcbmBattleScene && this.bcbmBattleScene.stage) {
						this.bcbmBattleScene.clearAllTimeOut();
						//this.bcbmBattleScene.ResumScene();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BCBM, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BCBM_BATTLE_UI);
						}
					}
					this.isPause = false;
					break;
				}
				case PanelNotify.PAUSE_APP:
					console.error("========= PAUSE_APP");
					// 游戏到后台之后需要注意，停止一切动画 并且 再这之后接收协议得处理 不得处理，可以选择丢弃，回到前台会重新请求新的数据
					this.isPause = true;
					if(this.bcbmBattleScene) {
						this.bcbmBattleScene.stopCar();
						this.bcbmBattleScene.clearAllTimeOut();
						this.bcbmBattleScene.stopWinAnim();
						this.bcbmBattleScene.removeResult();
						egret.stopTick(this.bcbmBattleScene.updateCar, this);					}
				break;
				case PanelNotify.OPEN_BCBM_HISTORY_UI: {
					this.bcbmBattleScene.updateHistory(data);
					break;
				}
				case CommonDataNotify.BCBM_PUSH_BATTLESTATUS: {
					this.bcbmBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.BCBM_PUSH_BATTLEFINISH: {
					if(!this.isPause){
						this.bcbmBattleScene.onBattleFinish(data);
					}
					break;
				}
				case CommonDataNotify.BCBM_HISTORY: {
					this.bcbmBattleScene.updateHistory(data);
					break;
				}
				case CommonDataNotify.BCBM_ONLINEPLAYER: {
					if(this.bcbmOnlinePlayerPanel == null){
						this.bcbmOnlinePlayerPanel = new BcbmOnlinePlayerPanel();
					}
					PopUpManager.addPopUp(this.bcbmOnlinePlayerPanel, true, 0, 0, 1);
					this.bcbmOnlinePlayerPanel.initPlayerList(data.playerInfo);
					this.bcbmBattleScene.updateOnlineNum(data.playerInfo);
					break;
				}
				case CommonDataNotify.BCBM_SHOWCARD: {
					break;
				}
				case CommonDataNotify.BCBM_STAKE_RET: {
					this.bcbmBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.BCBM_FIRST_ENTERROOM: { 
					if(this.bcbmBattleScene != null && this.bcbmBattleScene.parent != null){
						this.bcbmBattleScene.firstEnterRoom(data);
					}
					break;
				}
				case CommonDataNotify.BCBM_UPBANKER:{
					this.bcbmBattleScene.updateBanker(data);
					break;
				}
				case CommonDataNotify.BCBM_DOWNBANKER:{
					this.bcbmBattleScene.downBankers(data);
					break;
				}
			}
		}
	}
}