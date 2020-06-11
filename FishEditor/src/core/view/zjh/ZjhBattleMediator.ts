/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class ZjhBattleMediator extends GameMeditator {
        public static NAME: string = "ZjhBattleMediator";

        public constructor(viewComponent: any = null) {
            super(ZjhBattleMediator.NAME, viewComponent, PanelNotify.OPEN_ZJH_BATTLE_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_ZJH_BATTLE_UI,
                PanelNotify.CLOSE_ZJH_BATTLE_UI,
                CommonDataNotify.UPDATE_ROOM_PLAYER_INFO,
                CommonDataNotify.UPDATE_ZJH_BATTLE_INFO,
                CommonDataNotify.START_ZJH_BATTLE,
                CommonDataNotify.ZJH_LOOK_CARDS,
                PanelNotify.CLOSE_COMPARE,
                PanelNotify.OPEN_COMPARE,
                PanelNotify.BET_ANIM,
                CommonDataNotify.UPDATE_ZJH_BATTLE_INFO_RESTART,
                CommonDataNotify.ZJH_BATTLE_END,
                CommonDataNotify.ZJH_CLEAR_BATTLE,
                PanelNotify.ZJH_CLEAR_BATTLE,
                PanelNotify.RESUME_APP,
                PanelNotify.ZJH_SHOW_TIPS,
                PanelNotify.ZJH_SHOW_CMP_ANIM,
                PanelNotify.CLOSE_COMPARE_CHOOSE,
                CommonDataNotify.ZJH_SHOW_CARDS_ON_END,
                CommonDataNotify.ZJH_SHOW_BRIGHTCARDS,
                CommonDataNotify.ZJH_PUSHREADY,
                PanelNotify.ZJH_HEAD_CLOCK,
                PanelNotify.ZJH_FOLD_CARDS,
                PanelNotify.REFRESH_ZJH_OPERATION
            ];
        }
        private zjhBattleScene: ZjhBattleUI = null;
        private battleFinish:ZjhFinishUI = null;
        protected handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJH_BATTLE_UI: {
                    if(this.zjhBattleScene == null) {
                        this.viewComponent = this.zjhBattleScene = new ZjhBattleUI();
                    }
                    if(!this.zjhBattleScene.stage) {
                        this.showUI(this.zjhBattleScene, true, 0, 0, 1);
                        game.zjh.ZJHSoundPlayer.instance.playZjhBg();
                    } else {
                        // 打扫战场
                        if(game.zjh.ZJHData.getInstance() == null || game.zjh.ZJHData.getInstance().currentRound < 0) {                            
                            this.zjhBattleScene.ClearBattle();
                        }
                        // 游戏已经开始 其他人加入或其他人退出 不需要清理战场

                        console.warn("------player in or out");
                    }
                    this.zjhBattleScene.callAfterUIInit("ShowRoomPlayerInfo");
                    this.viewComponent = this.zjhBattleScene;
                    break;
                }
                case CommonDataNotify.UPDATE_ROOM_PLAYER_INFO: {
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.ShowRoomPlayerInfo();
                    }
                    break;
                }
                case CommonDataNotify.START_ZJH_BATTLE:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.onStartGame();
                    }
                    if(this.battleFinish && this.battleFinish.stage) {
                        this.battleFinish.end();
                        this.battleFinish.parent.removeChild(this.battleFinish);
                    }
                break;
                case CommonDataNotify.UPDATE_ZJH_BATTLE_INFO:
                    if(this.zjhBattleScene != null) {
                        if(this.zjhBattleScene.isPkAniming()) {
                            //为注册的回调方法加上update标记
                            this.zjhBattleScene.registerAfterPK(this.zjhBattleScene.showZJhInfo, this.zjhBattleScene, "update");
                        } else {
                            this.zjhBattleScene.showZJhInfo();
                        }
                    }
                    break;
                case PanelNotify.ZJH_HEAD_CLOCK:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.switchNext(data);
                        // this.zjhBattleScene.showOperationDownTime();
                        // this.zjhBattleScene.showOperation();
                        // this.zjhBattleScene.refreshGameRound();
                    }
                break;
                case PanelNotify.REFRESH_ZJH_OPERATION:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.showOperation();
                    }
                break;
                case PanelNotify.ZJH_FOLD_CARDS:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.foldPlayerCards(data);
                    }
                break;
                case CommonDataNotify.ZJH_LOOK_CARDS:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.showSelfCards();
                    }
                break;
                case CommonDataNotify.ZJH_SHOW_CARDS_ON_END:
                    if(this.zjhBattleScene != null) {
                        //this.zjhBattleScene.showBrightCards();
                    } 
                break;
                case CommonDataNotify.ZJH_SHOW_BRIGHTCARDS:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.showPlayerBrightCard(data);
                    } 
                break;
                case PanelNotify.OPEN_COMPARE:
                    this.zjhBattleScene.openCompare();
                break;
                case PanelNotify.CLOSE_COMPARE:
                    this.zjhBattleScene.closeCompare();
                break;
                case PanelNotify.CLOSE_COMPARE_CHOOSE:
                    this.zjhBattleScene.closeCompareChoose();
                break;
                case PanelNotify.BET_ANIM:
                    this.zjhBattleScene.showCoinAnim(data.playerId, data.singleBet);
                    this.zjhBattleScene.refreshPlayerCostmoney(data.playerId, data.costMoney)
                    this.zjhBattleScene.refreshTotalBet();
                break;
                case CommonDataNotify.UPDATE_ZJH_BATTLE_INFO_RESTART:
                    this.zjhBattleScene.reEnter();
                break;
                case CommonDataNotify.ZJH_BATTLE_END:
                    if(this.zjhBattleScene == null || this.zjhBattleScene.stage == null) {
                        return ;
                    }
                    zjh.ZJHData.getInstance().BattleFinishData.isBattleFinish = true;
                    // 如果是在显示pk动画的话应该要等pk结束
                    if(this.zjhBattleScene.isPkAniming()) {
                        //为注册的回调方法加上end标记
                        this.zjhBattleScene.registerAfterPK(this.handleBattleEnd, this, "end");
                    } else {
                        this.handleBattleEnd();
                    }
                    
                break;
                case PanelNotify.CLOSE_ZJH_BATTLE_UI:
                    if(this.zjhBattleScene != null) {
                        this.closePanel();
                        this.zjhBattleScene.ClearBattle();
                        game.zjh.ZJHData.getInstance().clearData();
                        game.zjh.ZJHSoundPlayer.instance.backToMainBg();
                    }
                    if(this.battleFinish && this.battleFinish.stage) {
                        this.battleFinish.end();
                        this.battleFinish.parent.removeChild(this.battleFinish);
                    }
                break;
                case CommonDataNotify.ZJH_CLEAR_BATTLE:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.ClearBattle();
                    }
                break;
                case PanelNotify.ZJH_CLEAR_BATTLE:
                    if(this.zjhBattleScene != null) {
                        this.zjhBattleScene.ClearBattle();
                    }
                break;
                case PanelNotify.RESUME_APP:
                    console.error("RESUME_APP")
                    if(this.battleFinish && this.battleFinish.stage) {
                            this.battleFinish.end();
                            this.battleFinish.parent.removeChild(this.battleFinish);
                        }
                    if(this.zjhBattleScene && this.zjhBattleScene.stage) {
                        this.zjhBattleScene.ClearBattle();    
                        RoomRequest.sendEnterRoomInfo(ChildGameType.ZJH, RoomManager.getInstance().curRoomData.gameLevel);
                    }
                    break;
                case PanelNotify.ZJH_SHOW_TIPS:
                    if(this.zjhBattleScene && this.zjhBattleScene.stage) {
                        this.zjhBattleScene.showTips(data.playerId, data.status);
                    }
                break;
                case PanelNotify.ZJH_SHOW_CMP_ANIM:
                    if(this.zjhBattleScene && this.zjhBattleScene.stage) {
                        this.zjhBattleScene.showCompareAnim(data);
                        //为比牌单独更新playerCostMoney
                        this.zjhBattleScene.updateCostWhenCompare(data.targetId);
                    }
                break;
                case CommonDataNotify.ZJH_PUSHREADY:
                {
                    console.log("ZJH_PUSHREADY" + data);
                    RoomRequest.sendBeady(true, game.ChildGameType.ZJH);
                    break;
                }
            }
        }

        private handleBattleEnd() {
            // 显示结果
            let finishData:zjh.ZJHBattleFinishData = zjh.ZJHData.getInstance().BattleFinishData;
            if(this.battleFinish == null) {
                // this.battleFinish = new ZjhFinishUI();
            }
            var battleScene: ZjhBattleUI = this.zjhBattleScene;
            CommonUtil.registerTimeOut(() => {
                battleScene.collectCoinToWin(finishData.winPlayerId);
                this.zjhBattleScene.handleOperationOnEnd();
            }, this, 800);
            // CommonUtil.registerTimeOut(() => {
            // }, this, 1500);
            //this.battleFinish.waitTime = finishData.downTime;
            //PopUpManager.addPopUp(this.battleFinish, false, 0, 0, 1);
            //this.battleFinish.showBattleFinishInfo();
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
            CommonUtil.removeTimeout(this);
        }

    }
}