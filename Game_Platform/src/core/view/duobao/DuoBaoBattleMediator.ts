/**
  * 夺宝meditator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.duobao {

    export class DuoBaoBattleMediator extends GameMeditator {
        public static NAME: string = "DuoBaoBattleMediator";

        public constructor(viewComponent: any = null) {
            super(DuoBaoBattleMediator.NAME, viewComponent, PanelNotify.OPEN_DUOBAO_BATTLE);
        }

        public listNotificationInterests(): Array<any> {
            return [
                    PanelNotify.OPEN_DUOBAO_BATTLE,
                    PanelNotify.CLOSE_DUOBAO_BATTLE,
                    PanelNotify.DUOBAO_RFRESH_STAKE_VALUE,
                    PanelNotify.DUOBAO_RFRESH_LINE_VALUE,
                    PanelNotify.DUOBAO_START,
                    PanelNotify.SHOW_DUOBAO_HELP_UI,
                    PanelNotify.DUOBAO_ADD_MONEY,
                    PanelNotify.REFRESH_DUOBAO_REWARD_POOL,
                    PanelNotify.SHOW_DUOBAO_BALL_COMPLETE,
                    PanelNotify.REFRESH_DUOBAO_TOTAL_MONEY,
                    PanelNotify.DESTORY_ONE_BOX,
                    PanelNotify.MOENY_NOT_ENOUGH,
                    PanelNotify.SHOW_DUOBAO_SETTING,
                    PanelNotify.DUOBAO_SHOW_LEVEL_TIPS,
                    PanelNotify.PAUSE_APP,
                    PanelNotify.SOCKET_RECONNECT,
                    PanelNotify.UPDATE_DUOBAO_BATTLE
            ];
        }
        private duoBaoBattleUI:DuoBaoBattleUI = null;
        private duoBaoHelpUI:DuobaoHelpUI = null;
        private duobaoSettingUI:DuobaoSetting = null;
        public isUIShow():boolean {
            return this.duoBaoBattleUI != null && this.duoBaoBattleUI.stage != null;
        }
        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DUOBAO_BATTLE: {
                    if(this.duoBaoBattleUI == null) {
                        this.viewComponent = this.duoBaoBattleUI = new game.duobao.DuoBaoBattleUI();
                    }
                    if(this.duoBaoBattleUI.stage == null) {
                         this.showUI(this.duoBaoBattleUI, true, 0, 0, 0);
                         this.duoBaoBattleUI.refreshBox();
                         this.duoBaoBattleUI.updateLayerShow();
                         this.duoBaoBattleUI.refreshGameLevel();
                         this.duoBaoBattleUI.updateTotalWinMoney();
                         this.duoBaoBattleUI.recoverLineBet();
                        // this.duoBaoBattleUI.init();
                         DuobaoSoundPlayer.instance.playBg();
                    }
                    break;
                }

                case PanelNotify.UPDATE_DUOBAO_BATTLE:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.updateBattle();
                    }
                    
               break;
                
               case PanelNotify.CLOSE_DUOBAO_BATTLE:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.clear();
                        this.sendNotification(PanelNotify.OPEN_DUOBAO_ROOM_UI, false);
                        this.closePanel();
                        DuobaoSoundPlayer.instance.backToMainBg();
                    }
                    
               break;

               case PanelNotify.DUOBAO_RFRESH_STAKE_VALUE:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.refreshStake();
                    }
               break;

               case PanelNotify.DUOBAO_RFRESH_LINE_VALUE:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.refreshLine();
                    }
               break;

               case PanelNotify.DUOBAO_START:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.startDuobao();
                    }
               break;

               case PanelNotify.DUOBAO_ADD_MONEY:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.showAddMoney(data);
                    }
               break;

               case PanelNotify.REFRESH_DUOBAO_REWARD_POOL:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.refreshRewardPool();
                    }
               break;

               case PanelNotify.SHOW_DUOBAO_BALL_COMPLETE:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.onBallComplete();
                    }
               break;
               case PanelNotify.DESTORY_ONE_BOX:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.destoryBox();
                    }
               break;
               case PanelNotify.MOENY_NOT_ENOUGH:
                    if(this.duoBaoBattleUI) {
                        this.duoBaoBattleUI.stopAuto();
                    }
               break;
                case PanelNotify.SHOW_DUOBAO_SETTING:
                    if(!this.duobaoSettingUI) {
                        this.duobaoSettingUI = new DuobaoSetting();
                    }
                    if(!this.duobaoSettingUI.stage) {
                        PopUpManager.addPopUp(this.duobaoSettingUI, true, 0, 0, 0);
                    }
                    break;
                case PanelNotify.SHOW_DUOBAO_HELP_UI:
                    if(!this.duoBaoHelpUI) {
                        this.duoBaoHelpUI = new DuobaoHelpUI();
                    }
                    if(!this.duoBaoHelpUI.stage) {
                        // PopUpManager.addPopUp(this.duoBaoHelpUI, true, 0, 0, 0);
                    }
                    break;
                case PanelNotify.DUOBAO_SHOW_LEVEL_TIPS:
                    this.duoBaoBattleUI.doorEffect(this.duoBaoBattleUI.showLevelTips, this.duoBaoBattleUI);
                    //this.duoBaoBattleUI.showLevelTips();
                    break;
                case PanelNotify.SOCKET_RECONNECT:
                case PanelNotify.PAUSE_APP:
					this.duoBaoBattleUI.onPause();
				break;
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
}