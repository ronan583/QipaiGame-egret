/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.sgj {

    export class FruitBattleMediator extends GameMeditator {
        public static NAME: string = "FruitBattleMediator";

        public constructor(viewComponent: any = null) {
            super(FruitBattleMediator.NAME, viewComponent, PanelNotify.OPEN_FRUIT_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_FRUIT_BATTLE_UI,
                PanelNotify.CLOSE_FRUIT_BATTLE_UI,
                PanelNotify.FRUIT_REFRESH_BET_MONEY,
                PanelNotify.FRUIT_GAME_RESULT,
                PanelNotify.UPDATE_ROLL_END,
                PanelNotify.SHOW_FRUIT_HELP_UI,
                PanelNotify.CLOSE_FRUIT_HELP_UI,
                PanelNotify.REFRESH_FRUIT_POOL_IN_ROOM,
                PanelNotify.SHOW_FRUIT_CRAZY_UI,
                PanelNotify.CLOSE_FRUIT_CRAZY_UI,
                PanelNotify.UPDATE_FRUIT_CRAZY_REWARD,
                PanelNotify.UPDATE_FRUIT_CRAZY_BOOM,
                PanelNotify.REFRESH_FRUIT_LINE,
                PanelNotify.REFRESH_FRUIT_ROOM_INFO,
                PanelNotify.MOENY_NOT_ENOUGH,
                PanelNotify.SOCKET_RECONNECT,
                PanelNotify.PAUSE_APP,
                PanelNotify.REFRESH_FRUIT_POOL,
            ];
        }
        private fruitBattleUI: game.sgj.FruitBattleUI = null;
        private fruitCrazyUI:FruitCrazyUI = null;
        public isUIShow():boolean {
            return this.fruitBattleUI != null && this.fruitBattleUI.stage != null;
        }
        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_FRUIT_BATTLE_UI: {
                    if(this.fruitBattleUI == null) {
                        this.fruitBattleUI = new game.sgj.FruitBattleUI();
                        this.viewComponent = this.fruitBattleUI;
                    }
                    if(this.fruitBattleUI.stage == null) {
                         this.showUI(this.fruitBattleUI, true, 0, 0, 1);
                         FruitSoundPlayer.instance.playBg();
                    }
                    this.fruitBattleUI.refreshPlayer();
                    break;
                }
                
               case PanelNotify.CLOSE_FRUIT_BATTLE_UI:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.clear();
                        this.closePanel();
                    }
                    FruitSoundPlayer.instance.backToMainBg();
               break;
               case PanelNotify.FRUIT_REFRESH_BET_MONEY:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.refreshBetMoney();
                    }
               break;
               case PanelNotify.FRUIT_GAME_RESULT:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.showGameResult(<game.sgj.FruitGameResult>notification.getBody());
                    }
               break;
               case PanelNotify.UPDATE_ROLL_END:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.updateRollEnd(notification.getBody());
                    }
               break;
               case PanelNotify.REFRESH_FRUIT_POOL_IN_ROOM:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.refreshMoneyByPush(notification.getBody());
                    }
               break;
               case PanelNotify.SHOW_FRUIT_CRAZY_UI:
                    if(this.fruitCrazyUI == null) {
                        this.fruitCrazyUI = new game.sgj.FruitCrazyUI();
                    }
                    if(this.fruitCrazyUI.stage == null) {
                         PopUpManager.addPopUp(this.fruitCrazyUI, false, 0, 0, 1);
                    }
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.stopAuto();
                    }
               break;
                case PanelNotify.CLOSE_FRUIT_CRAZY_UI:
                    if(this.fruitCrazyUI && this.fruitCrazyUI.stage) {
                         PopUpManager.removePopUp(this.fruitCrazyUI, 0);
                    }
               break;
               case PanelNotify.UPDATE_FRUIT_CRAZY_REWARD:
                    if(this.fruitCrazyUI && this.fruitCrazyUI.stage) {
                         this.fruitCrazyUI.updateReward(notification.getBody());
                    }
               break;
               case PanelNotify.UPDATE_FRUIT_CRAZY_BOOM:
                    if(this.fruitCrazyUI && this.fruitCrazyUI.stage) {
                         this.fruitCrazyUI.updateBoom(notification.getBody());
                    }
               break;
                case PanelNotify.REFRESH_FRUIT_LINE:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.setLine();
                    }
                    break;
                case PanelNotify.REFRESH_FRUIT_ROOM_INFO:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.refreshRoomInfo();
                    }
                    break;
                case PanelNotify.MOENY_NOT_ENOUGH:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.clearAutoAndBackStart();
                    }
                break;
                case PanelNotify.PAUSE_APP:
                    if(this.fruitBattleUI) {
                        this.fruitBattleUI.forceStopCheckStart();
                    }
                break;
                case PanelNotify.SOCKET_RECONNECT:
                    if(this.fruitBattleUI) {
                        // this.fruitBattleUI.clearAutoAndBackStart();
                    }
                break;
                case PanelNotify.REFRESH_FRUIT_POOL:
                    if(this.fruitBattleUI) {
                        let arr = <Array<number>>notification.getBody();
                        this.fruitBattleUI.refreshPool(arr[RoomManager.getInstance().curRoomData.gameLevel]);
                    }
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