module game.brnn
{
	export class BrnnBattleMediator extends GameMeditator {

		public static NAME: string = "BrnnBattleMediator";

        public constructor(viewComponent: any = null) {
            super(BrnnBattleMediator.NAME, viewComponent, PanelNotify.OPEN_BRNN_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BRNN_BATTLE_UI,
                PanelNotify.CLOSE_BRNN_BATTLE_UI,
                CommonDataNotify.BRNN_PUSH_BATTLESTATUS,
                CommonDataNotify.BRNN_BRENSTAKE_RET,
                CommonDataNotify.BRNN_APPLY_BANKER_RET,
                CommonDataNotify.BRNN_PLAYERRANK,
                CommonDataNotify.BRNN_STARTGAME,
				CommonDataNotify.BRNN_HISTORY,
				CommonDataNotify.BRNN_DOWN_BANKER,
				PanelNotify.RESUME_APP,
				CommonDataNotify.BRNN_FIRST_ENTERROOM,
				CommonDataNotify.BRNN_ROUND_RESULT,
				PanelNotify.SOCKET_RECONNECT,
				PanelNotify.PAUSE_APP
            ];
        }
        private brnnBattleScene: BrnnBattleScene = null;
		private brnnPlayerListPanel : BrnnPlayerListPanel = null;
		private brnnHistoryPanel : BrnnHistoryPanel = null;
		private isPause = false;
        // private battleFinish:ZjhFinishUI = null; 
        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            if(notification.getName() != PanelNotify.OPEN_BRNN_BATTLE_UI && (this.brnnBattleScene == null || this.brnnBattleScene.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
                case PanelNotify.OPEN_BRNN_BATTLE_UI: {
					let isFirst = false;
					if(this.brnnBattleScene == null)
					{
						this.viewComponent = this.brnnBattleScene = new BrnnBattleScene();
						isFirst = true;
					}
                    if( this.brnnBattleScene.stage == null)
                    {
						PopUpManager.addPopUp(this.brnnBattleScene, false, 0, 0, 0);
						BrnnSoundPlayer.instance.playBg();	
						this.brnnBattleScene.initScene();
						
                    }else
                    {
                        this.brnnBattleScene.updateScene();
                    }
					BrnnSoundPlayer.instance.playBg();
					break;
				}
				case PanelNotify.CLOSE_BRNN_BATTLE_UI: {
					this.brnnBattleScene.backToMainBg();
					this.brnnBattleScene.clearAllTimeOut();
                    this.brnnBattleScene.battleStartCountDown.stop();
					this.sendNotification(PanelNotify.OPEN_BRNN_START_UI);
					PopUpManager.removePopUp(this.brnnBattleScene);
                    // BrnnSoundPlayer.instance.backToMainBg();			
					// egret.clearTimeout();
					break;
				}
				case CommonDataNotify.BRNN_PUSH_BATTLESTATUS: {		
					// console.log("BRNN_PUSH_BATTLESTATUS data: " + data);
					if(!this.isPause) this.brnnBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.BRNN_BRENSTAKE_RET: {	
					// console.log("BRNN_BRENSTAKE_RET data: " + data);
					if(!this.isPause) this.brnnBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.BRNN_APPLY_BANKER_RET: {
					console.log("BRNN_APPLY_BANKER_RET data: " + data);
					this.brnnBattleScene.onApplyBankerRet(data);
					break;
				}
				case CommonDataNotify.BRNN_PLAYERRANK: {	
					// console.log("BRNN_PLAYERRANK data: " + data);
					if(this.brnnPlayerListPanel == null)
					{
						this.brnnPlayerListPanel = new BrnnPlayerListPanel();
					}
					PopUpManager.addPopUp(this.brnnPlayerListPanel , true,0,0,1);
					this.brnnPlayerListPanel.initPlayerList(data.rankInfo);
					this.brnnBattleScene.showOnlineCount(data.rankInfo.length)
					break;
				}
				case CommonDataNotify.BRNN_STARTGAME: {
					if(!this.isPause) {
						this.brnnBattleScene.startDealCard(data);
					} else {
						egret.log("后台阶段不处理")
					}
					break;
				}
				case CommonDataNotify.BRNN_HISTORY:{
					// if(this.brnnHistoryPanel == null)
					// {
					// 	this.brnnHistoryPanel = new BrnnHistoryPanel();
					// }
					// PopUpManager.addPopUp(this.brnnHistoryPanel , true,0,0,1);
					this.brnnBattleScene.brnnHistoryPanel.initHistoryPanel(data.rounds);
					
					break;
				}
				case CommonDataNotify.BRNN_DOWN_BANKER:{
					// this.brnnBattleScene.downBankerRet(data);
					this.brnnBattleScene.downBankerRet(data);
				break;
				}
				case CommonDataNotify.BRNN_FIRST_ENTERROOM:{
					AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					this.brnnBattleScene.firstEnterRoom(data);
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
					if(this.brnnBattleScene && this.brnnBattleScene.stage) {
						this.brnnBattleScene.clearCardRelative();
						this.brnnBattleScene.clearAllTimeOut();
						this.brnnBattleScene.checkTask();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BRNN, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BRNN_BATTLE_UI);
						}
					}
					this.isPause = false;
					break;
				case PanelNotify.RESUME_APP:{
					if(this.brnnBattleScene && this.brnnBattleScene.stage) {
						// this.brnnBattleScene.clearBattle();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BRNN, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BRNN_BATTLE_UI);
						}
					}
					this.isPause = false;
					break;
				}
				case PanelNotify.PAUSE_APP:
					// 游戏到后台之后需要注意，停止一切动画 并且 再这之后接收协议得处理 不得处理，可以选择丢弃，回到前台会重新请求新的数据
					this.isPause = true;
					if(this.brnnBattleScene) {
						this.brnnBattleScene.clearCardRelative();
						this.brnnBattleScene.clearAllTimeOut();
						this.brnnBattleScene.checkTask();
					}
				break;
				case CommonDataNotify.BRNN_ROUND_RESULT:
					this.brnnBattleScene.showRoundResult(<BrnnRoundResultData>data);
				break;
			}
		}
	}
}