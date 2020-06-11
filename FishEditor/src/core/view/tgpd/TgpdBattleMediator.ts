module game.tgpd {
	export class TgpdBattleMediator extends GameMeditator {

		public static NAME: string = "TgpdBattleMediator";

        public constructor(viewComponent: any = null) {
            super(TgpdBattleMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_TGPD_BATTLE_UI,
                PanelNotify.CLOSE_TGPD_BATTLE_UI,
				//PanelNotify.OPEN_HHDZ_HISTORY_UI,
                CommonDataNotify.TGPD_ENTER_GAME,
                CommonDataNotify.TGPD_SET_STAKE,
				CommonDataNotify.TGPD_SET_LINE,
                CommonDataNotify.TGPD_ENTER_GAME,
				CommonDataNotify.TGPD_EXIT_GAME,
				CommonDataNotify.TGPD_START_GAME,
				PanelNotify.TGPD_INCREASE_MONDY,
				PanelNotify.TGPD_GAMEOVER,
				PanelNotify.MOENY_NOT_ENOUGH,
				PanelNotify.RESUME_APP,
				PanelNotify.PAUSE_APP,
				PanelNotify.SOCKET_RECONNECT,
				PanelNotify.OPEN_TGPD_ROOM_UI,
				PanelNotify.REFRESH_CANDY_REWARD_POOL,
				PanelNotify.DESTORY_ONE_BOX
            ];
        }
        private tgpdBattleScene: TgpdBattleScene = null;
		private tgpdRoom: game.tgpd.NTgpdRoomUI = null;
		public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            if(notification.getName() != PanelNotify.OPEN_TGPD_BATTLE_UI && (this.tgpdBattleScene == null || this.tgpdBattleScene.stage == null))
			{
				return;
			}
			switch (notification.getName()) {
                case PanelNotify.OPEN_TGPD_BATTLE_UI: {
					if(this.tgpdBattleScene == null)
					{
						this.viewComponent = this.tgpdBattleScene = new TgpdBattleScene();
					}
                    if( this.tgpdBattleScene.stage == null)
                    {                         
						this.showUI(this.tgpdBattleScene, true, 0, 0, 0);
						this.tgpdBattleScene.playCurtainUpAnim();
                        this.tgpdBattleScene.initScene();
						let layer = CandyData.instance.currentLayer;
                        TgpdSoundPlayer.instance.playBg(layer);
                    } else {
						this.tgpdBattleScene.updateScene();
					}
					
					break;
				}
				case PanelNotify.CLOSE_TGPD_BATTLE_UI: 
				{
					break;
				}
				case PanelNotify.REFRESH_CANDY_REWARD_POOL:
				{
					this.tgpdBattleScene.updatePool();
					break;
				}
				case CommonDataNotify.TGPD_ENTER_GAME:{
					this.tgpdBattleScene.updateScene();
					break;
				}
				case CommonDataNotify.TGPD_SET_STAKE:
				{
					this.tgpdBattleScene.updateStake();
					break;
				}
				case CommonDataNotify.TGPD_SET_LINE:
				{
					this.tgpdBattleScene.updateLine();
					break;
				}
				case CommonDataNotify.TGPD_START_GAME:
				{
					this.tgpdBattleScene.startGameRet(data);
					break;
				}
				case CommonDataNotify.TGPD_EXIT_GAME:
				{
					this.tgpdBattleScene.backToMainBg();
					PopUpManager.removePopUp(this.tgpdBattleScene);
					if(AppFacade.getInstance().retrieveMediator(game.tgpd.TgpdBattleMediator.NAME) == null) {
						AppFacade.getInstance().registerMediator(new game.tgpd.TgpdBattleMediator());
					}
					if(this.tgpdRoom == null)
						this.tgpdRoom = new game.tgpd.NTgpdRoomUI();

					PopUpManager.addPopUp(this.tgpdRoom,false , 0 , 0 ,0);
					break;
				}
				case PanelNotify.TGPD_INCREASE_MONDY:
				{
					// this.tgpdBattleScene.increaseMoney(data);
					this.tgpdBattleScene.showAddMoney(data);
					break;
				}
				case PanelNotify.DESTORY_ONE_BOX:
                    if(this.tgpdBattleScene) {
                        this.tgpdBattleScene.destroyBox();
                    }
                break;
				case PanelNotify.TGPD_GAMEOVER:
				{
					// this.tgpdBattleScene.gameOver();
					break;
				}
				case PanelNotify.MOENY_NOT_ENOUGH:
				{
					if(this.tgpdBattleScene) {
						this.tgpdBattleScene.stopAuto();
					}
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.RESUME_APP:
				{
					this.tgpdBattleScene.onResume();
					break;
				}
				case PanelNotify.SOCKET_RECONNECT:
				case PanelNotify.PAUSE_APP:
					this.tgpdBattleScene.onPause();
				break;
			}
		}
	}
}