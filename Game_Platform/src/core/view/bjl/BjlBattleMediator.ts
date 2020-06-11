module game.bjl
{
	export class BjlBattleMediator extends GameMeditator {

		public static NAME: string = "BjlBattleMediator";

        public constructor(viewComponent: any = null) {
            super(BjlBattleMediator.NAME, viewComponent,PanelNotify.OPEN_BJL_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BJL_BATTLE_UI,
                PanelNotify.CLOSE_BJL_BATTLE_UI,
				//PanelNotify.OPEN_HHDZ_HISTORY_UI,
                CommonDataNotify.BJL_ROOMLIST_RET,
                CommonDataNotify.BJL_STARTGAME,
				CommonDataNotify.BJL_STAKE_RET,
                CommonDataNotify.BJL_BATTLE_STATUS,
				CommonDataNotify.BJL_PLAYERRANK,
				CommonDataNotify.BJL_FIRST_ROOM_PUSH,
				CommonDataNotify.BJL_SINGLE_ROOM_PUSH,
				PanelNotify.CLOSE_BJL_CHANGE_UI,
				PanelNotify.OPEN_BJL_CHANGE_UI,
				PanelNotify.OPEN_BJL_HISTORY_UI,
				PanelNotify.RESUME_APP,
				CommonDataNotify.BJL_History,
				PanelNotify.OPEN_BJL_FINISH_UI,
				PanelNotify.OPEN_BJL_APPLY_BANKER,
				PanelNotify.OPEN_BJL_DOWN_BANKER,
				PanelNotify.SOCKET_RECONNECT
            ];
        }
        private bjlBattleScene: BjlBattleScene = null;
		private bjlPlayerListPanel : BjlPlayerListPanel = null;
		private bjlChangeRoomPanel : BjlChangeRoomPanel = null;
		private bjlHistoryPanel : BjlHistoryPanel = null;

		private isPause:boolean = false;

		public isUIShow():boolean {
			return this.bjlBattleScene != null && this.bjlBattleScene.stage != null;
		}

        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            if(notification.getName() != PanelNotify.OPEN_BJL_BATTLE_UI && (this.bjlBattleScene == null || this.bjlBattleScene.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
                case PanelNotify.OPEN_BJL_BATTLE_UI: {
					AppFacade.instance.sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					if(this.bjlBattleScene == null)
					{
						this.viewComponent = this.bjlBattleScene = new BjlBattleScene();
					}
                    if( this.bjlBattleScene.stage == null)
                    {
                        PopUpManager.addPopUp(this.bjlBattleScene, false, 0, 0, 0);		
                        // QYNNSoundPlayer.instance.playQYNNBg();	
						// BjlSoundPlayer.instance.playBg();		
                        this.bjlBattleScene.initScene();
                    }else
                    {
						//换房间
						if(this.bjlBattleScene.currRoomId != -1 && this.bjlBattleScene.currRoomId != UserService.roomId)
						{
							this.bjlBattleScene.battleStartCountDown.stop();
							this.bjlBattleScene.clearAllTimeOut();
							this.bjlBattleScene.initScene();
						}else
						{
	                        this.bjlBattleScene.updateScene();
						}
                    }
					BjlSoundPlayer.instance.playBg();
					break;
				}
				case PanelNotify.CLOSE_BJL_BATTLE_UI: {
					this.bjlBattleScene.backToMainBg();
                    this.bjlBattleScene.battleStartCountDown.stop();
					this.bjlBattleScene.clearAllTimeOut();
					this.sendNotification(PanelNotify.OPEN_BJL_START_UI);
					PopUpManager.removePopUp(this.bjlBattleScene);
					this.sendNotification(PanelNotify.CLOSE_ZJCX_UI);
					break;
				}
				case CommonDataNotify.BJL_BATTLE_STATUS: {		
					if(!this.isPause) this.bjlBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.BJL_STAKE_RET: {	
					if(!this.isPause) this.bjlBattleScene.onStakeRet(data);
					break;
				}
				case CommonDataNotify.BJL_STARTGAME: {
					if(!this.isPause) this.bjlBattleScene.startDealCard(data);
					break;
				}
				case CommonDataNotify.BJL_PLAYERRANK: {	
					if(this.bjlPlayerListPanel == null)
					{
						this.bjlPlayerListPanel = new BjlPlayerListPanel();
					}
					PopUpManager.addPopUp(this.bjlPlayerListPanel , true,0,0,1);
					this.bjlPlayerListPanel.initPlayerList(data.rankInfo);
					this.bjlBattleScene.refreshOnlineCount(data.rankInfo.length);
					break;
				}
				
				case CommonDataNotify.BJL_FIRST_ROOM_PUSH:{
					if(this.bjlBattleScene != null && this.bjlBattleScene.parent != null)
					{
						this.bjlBattleScene.firstEnterRoom(data);
						AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					}
					break;
				}
				case CommonDataNotify.BJL_ROOMLIST_RET:{
					if(this.bjlChangeRoomPanel != null &&this.bjlChangeRoomPanel.parent != null)
					{
						this.bjlChangeRoomPanel.initUI(data.roomInfos);
					}
					break;
				}
				case CommonDataNotify.BJL_SINGLE_ROOM_PUSH:{
					if(this.bjlChangeRoomPanel != null &&this.bjlChangeRoomPanel.parent != null)
					{
						this.bjlChangeRoomPanel.updateSingleRoom(data);
					}
					break;
				}
				case PanelNotify.OPEN_BJL_CHANGE_UI:{
					if(this.bjlChangeRoomPanel == null)
					{
						this.bjlChangeRoomPanel = new BjlChangeRoomPanel();
					}
					PopUpManager.addPopUp(this.bjlChangeRoomPanel , true,0,0,1);
					
					break;
				}
				case PanelNotify.CLOSE_BJL_CHANGE_UI:{
					if(this.bjlChangeRoomPanel != null &&this.bjlChangeRoomPanel.parent != null)
					{
						PopUpManager.removePopUp(this.bjlChangeRoomPanel,0);
					}
					break;
				}
				case PanelNotify.OPEN_BJL_HISTORY_UI:{

					if(this.bjlHistoryPanel == null)
					{
						this.bjlHistoryPanel = new BjlHistoryPanel();
					}
					if(this.bjlHistoryPanel.parent == null)
					{
						PopUpManager.addPopUp(this.bjlHistoryPanel , true,0,0,1);
					}
					this.bjlHistoryPanel.visible = false;
					BjlRequest.requestOPWinFail(0);
					break;
				}
				case CommonDataNotify.BJL_History:{
					if(this.bjlHistoryPanel != null)
					{
						if(this.bjlHistoryPanel.visible == false)
						{
							this.bjlHistoryPanel.visible = true;
						}
						this.bjlHistoryPanel.udpateHistory(data.winFails);	
					}
					this.bjlBattleScene.trendPanel.updateTrendPanel(data);				
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
					if(this.bjlBattleScene && this.bjlBattleScene.stage) {
						this.bjlBattleScene.clearAllTimeOut();
						this.bjlBattleScene.ResumScene();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BJL, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BJL_BATTLE_UI);
						}
					}
					this.isPause = false;
					break;
				case PanelNotify.RESUME_APP:{
					if(this.bjlBattleScene && this.bjlBattleScene.stage) {
						// this.brnnBattleScene.clearBattle();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.BJL, RoomManager.getInstance().curRoomData.gameLevel);
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
					if(this.bjlBattleScene) {
						this.bjlBattleScene.clearCardRelative();
						this.bjlBattleScene.clearAllTimeOut();
						this.bjlBattleScene.checkTask();
					}
				break;
				case PanelNotify.OPEN_BJL_FINISH_UI:
					this.bjlBattleScene.showFinishUI(<game.bjl.BjlRoundResultData>data);
				break;
				case PanelNotify.OPEN_BJL_APPLY_BANKER:
					this.bjlBattleScene.onApplyBankerRet(data);
				break;
				case PanelNotify.OPEN_BJL_DOWN_BANKER:
					this.bjlBattleScene.downBankerRet(data);
				break;
			}
		}
	}
}