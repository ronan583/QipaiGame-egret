/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class BYBattleMediator extends GameMeditator {
        public static NAME: string = "BYBattleMediator";

        public constructor(viewComponent: any = null) {
            super(BYBattleMediator.NAME, viewComponent, PanelNotify.OPEN_BY_BATTLE);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BY_BATTLE,
                PanelNotify.REFRESH_BY_PLAYERS,
                PanelNotify.BY_SHOOT,
                PanelNotify.BY_FISH_DEAD,
                PanelNotify.SHOW_BULLET_MONEY,
                PanelNotify.REFRESH_SHOOT_TYPE,
                PanelNotify.CLOSE_BY_BATTLE_UI,
                PanelNotify.CREATE_FISHS,
                PanelNotify.CREATE_SINGLE_FISH,
                PanelNotify.SWITCH_CANON,
                PanelNotify.SHOW_BY_ADD_MONEY,
                PanelNotify.RESUME_APP,
                PanelNotify.SHOW_BOSS_NOTICE,
                PanelNotify.MOENY_NOT_ENOUGH
            ];
        }
        private byBattleScene: game.by.BYBattleUI = null;

        public isUIShow():boolean {
            return this.byBattleScene != null && this.byBattleScene.stage != null;
        }

        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_BY_BATTLE: {
                    if(this.byBattleScene == null) {
                        this.viewComponent = this.byBattleScene = new game.by.BYBattleUI();
                    }
                    if(this.byBattleScene.stage == null) {
                         this.showUI(this.byBattleScene, true, 0, 0, 1);
                         game.by.BYSoundPlayer.instance.playBg();
                    }
                    AppFacade.getInstance().sendNotification(PanelNotify.HIDE_MAINUI_AND_ROOM);
                    break;
                }
                case PanelNotify.REFRESH_BY_PLAYERS:
                    if(this.byBattleScene) {
                        this.byBattleScene.refreshPlayers();
                    }
                break;
                case PanelNotify.BY_SHOOT:
                    if(this.byBattleScene) {
                        this.byBattleScene.playShoot(data);
                    }
                break;
                case PanelNotify.BY_FISH_DEAD:
                    if(this.byBattleScene) {
                        this.byBattleScene.fishDead(<game.by.FishDeadInfo>data);
                    }
                break;
                case PanelNotify.SHOW_BULLET_MONEY:
                    if(this.byBattleScene) {
                        this.byBattleScene.setBulletMoney(data.playerId, data.bulletMoney);
                    }
                break;
               case PanelNotify.REFRESH_SHOOT_TYPE:
                    if(this.byBattleScene) {
                        this.byBattleScene.refreshOper();
                    }
               break;
               case PanelNotify.CLOSE_BY_BATTLE_UI:
                    if(this.byBattleScene) {
                        this.byBattleScene.stopAndClear();
                        this.closePanel();

                        game.by.BYSoundPlayer.instance.backToMainBg();
                    }
               break;
               case PanelNotify.CREATE_FISHS:
                    if(this.byBattleScene) {
                        this.byBattleScene.createFishs();
                    }
               break;
               case PanelNotify.CREATE_SINGLE_FISH:
                    if(this.byBattleScene) {
                        this.byBattleScene.createFish(<game.by.FishInfo>data);
                    }
               break;
               case PanelNotify.SWITCH_CANON:
                    if(this.byBattleScene) {
                        this.byBattleScene.switchCanon(data.playerId, data.cannonId);
                    }
               break;
               case PanelNotify.SHOW_BY_ADD_MONEY:
                    if(this.byBattleScene) {
                        this.byBattleScene.showAddMoney(<game.by.FishDeadInfo>data);
                    }
               break;
               case PanelNotify.RESUME_APP:
                    if(this.byBattleScene) {
                        this.byBattleScene.resumeApp(<number>data);
                    }
               break;
               case PanelNotify.SHOW_BOSS_NOTICE:
                    if(this.byBattleScene) {
                        this.byBattleScene.showBossNotice();
                    }
               break;
               case PanelNotify.MOENY_NOT_ENOUGH:
                    if(this.byBattleScene) {
                        this.byBattleScene.stopAuto();
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