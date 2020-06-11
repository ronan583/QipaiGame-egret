module game.tb
{
	export class TbBattleMediator extends BaseMediator {

		public static NAME: string = "TbBattleMediator";

        public constructor(viewComponent: any = null) {
            super(TbBattleMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_TB_BATTLE_UI,
                PanelNotify.CLOSE_TB_BATTLE_UI,
                CommonDataNotify.TB_PUSH_BATTLESTATUS,
                CommonDataNotify.TB_TBSTAKE_RET,
                // CommonDataNotify.BRNN_APPLY_BANKER_RET,
                CommonDataNotify.TB_PLAYERRANK,
                CommonDataNotify.TB_STARTGAME,
				CommonDataNotify.TB_HISTORY,
				PanelNotify.RESUME_APP,
				PanelNotify.SOCKET_RECONNECT, 
				CommonDataNotify.TB_FIRST_ENTERROOM,
				CommonDataNotify.TB_UP_BANKER,
				CommonDataNotify.TB_DOWN_BANKER
            ];
        }


		public isUIShow():boolean {
			return this.tbBattleScene != null && this.tbBattleScene.stage != null;
		}

        private tbBattleScene: TbBattleScene = null;
		private tbPlayerListPanel : TbPlayerListPanel = null;
		private tbHistoryPanel : TbHistoryPanel = null;
        // private battleFinish:ZjhFinishUI = null; 
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            if(notification.getName() != PanelNotify.OPEN_TB_BATTLE_UI && (this.tbBattleScene == null || this.tbBattleScene.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
                case PanelNotify.OPEN_TB_BATTLE_UI: {
					if(this.tbBattleScene == null)
					{
						this.viewComponent = this.tbBattleScene = new TbBattleScene();
					}
                    if( this.tbBattleScene.stage == null)
                    {
						this.showUI(this.tbBattleScene, false, 0, 0, 0);
                        this.tbBattleScene.initScene();
                    }else
                    {
                        this.tbBattleScene.updateScene();
                    }
					TbSoundPlayer.instance.playBg();
					break;
				}
				case PanelNotify.CLOSE_TB_BATTLE_UI: {
					this.tbBattleScene.backToMainBg();
					this.tbBattleScene.clearAllTimeOut();
                    this.tbBattleScene.battleStartCountDown.stop();
					this.sendNotification(PanelNotify.OPEN_TB_START_UI);
					PopUpManager.removePopUp(this.tbBattleScene);
					break;
				}
				case CommonDataNotify.TB_PUSH_BATTLESTATUS: {		
					this.tbBattleScene.pushBattleStatus(data);
					break;
				}
				case CommonDataNotify.TB_TBSTAKE_RET: {	
					this.tbBattleScene.onStakeRet(data);
					break;
				}
				// case CommonDataNotify.BRNN_APPLY_BANKER_RET: {
				// 	console.log("BRNN_APPLY_BANKER_RET data: " + data);
                //     TipsUtils.showTipsFromCenter("上庄成功。");
				// 	// this.brnnBattleScene.onUpdateBanker(data);
				// 	break;
				// }
				case CommonDataNotify.TB_PLAYERRANK: {	
					if(this.tbPlayerListPanel == null)
					{
						this.tbPlayerListPanel = new TbPlayerListPanel();
					}
					PopUpManager.addPopUp(this.tbPlayerListPanel , true,0,0,1);
					this.tbPlayerListPanel.init(data);
					this.tbBattleScene.refreshOnlineCount(data.rankInfo.length);
					break;
				}
				case CommonDataNotify.TB_STARTGAME: {
					// console.log("BRNN_STARTGAME : " + data);
					this.tbBattleScene.startDealDiceBao(data);
					break;
				}
				case CommonDataNotify.TB_HISTORY:{
					// if(this.tbHistoryPanel == null)
					// {
					// 	this.tbHistoryPanel = new TbHistoryPanel();
					// }
					// PopUpManager.addPopUp(this.tbHistoryPanel , true,0,0,1);
					// this.tbBattleScene.tbHistoryPanel.initHistoryPanel(data.rounds);
					this.tbBattleScene.trendPanel.UpdatePanel(data);
					break;
				}
				// case CommonDataNotify.TB_DOWN_BANKER:{
				// 	// this.brnnBattleScene.downBankerRet(data);
                //     TipsUtils.showTipsFromCenter("下庄成功。");
				// break;
				// }
				case CommonDataNotify.TB_FIRST_ENTERROOM:{
					AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
					this.tbBattleScene.firstEnterRoom(data);
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.RESUME_APP:{
					if(this.tbBattleScene && this.tbBattleScene.stage) {
						this.tbBattleScene.clearAllTimeOut();
						if(RoomManager.getInstance().curRoomData) {
							RoomRequest.sendEnterRoomInfo(game.ChildGameType.DiceBao, RoomManager.getInstance().curRoomData.gameLevel);
						} else {
							game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TB_BATTLE_UI);
						}
					}
					break;
				}
				case CommonDataNotify.TB_UP_BANKER:{
					this.tbBattleScene.onApplyBankerRet(data);
					break;
				}
				case CommonDataNotify.TB_DOWN_BANKER:{
					this.tbBattleScene.downBankerRet(data);
					break;
				}
			}
		}
	}
}