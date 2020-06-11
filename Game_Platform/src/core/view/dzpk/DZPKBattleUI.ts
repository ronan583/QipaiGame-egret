module game.dzpk {
    export class DZPKBattleUI extends GameScene {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/dzpk/dzpkBattleUI.exml";
            this.gameType = ChildGameType.DZPK;
        }

        public settingBtn: eui.Button;
        public helpBtn: eui.Button;

        public player1: DZPKHeadIcon;
        public player2: DZPKHeadIcon;
        public player3: DZPKHeadIcon;
        public player4: DZPKHeadIcon;
        public player5: DZPKHeadIcon;
        public player6: DZPKHeadIcon;

        public chip1: DZPKChip;
        public chip2: DZPKChip;
        public chip3: DZPKChip;
        public chip4: DZPKChip;
        public chip5: DZPKChip;
        public chip6: DZPKChip;

        public playerCard1: DZPKCards;
        public playerCard2: DZPKCards;
        public playerCard3: DZPKCards;
        public playerCard4: DZPKCards;
        public playerCard5: DZPKCards;
        public playerCard6: DZPKCards;

        public playerHeads: Array<DZPKHeadIcon>;
        public playerChips: Array<DZPKChip>;
        public playerCards: Array<DZPKCards>;

        public cardTypeImgBg: eui.Image;

        public bg: eui.Image;
        public startCountDownImg: eui.Image;
        public startCountDownLabel: eui.Label;
        public nextGameWait: eui.Image;
        public othersWait: eui.Image;

        public operationBar: DZPKOperationBar;
        public publicCards: DZPKPublicCards;

        private endStartTimeEnd: number = 0;
        public backBtn: eui.Button;
        private bankBtn: eui.Button;
        public cardTypeGroup: eui.Group;
        public cardTypeImg: eui.Image;
        public totalBet: eui.Label;
        public gameDes: eui.Label;
        public chipGroup: eui.Group;
        public chipGroupArr: Array<DzpkChipGroup>;

        public cardResultGroup: eui.Group;
        private huluAnim: DragonAnim;
        private jinggangAnim: DragonAnim;
        private thsAnim: DragonAnim;
        private hjthsAnim: DragonAnim;

        private prevHeadIcon: DZPKHeadIcon;
        public winGroup: eui.Group;
        private winAnim: DragonAnim;
        private girlAnim: DragonAnim;
        private showEndCoinTimeout: number;

        private menuGroup: MenuGroup;
        private menuArrowImg: eui.Image;
        private menuContent: eui.Group;
        private contentGroup:eui.Group;

        public initFapaiGroup:eui.Group;
        private testBtn:eui.Button;

        private allInScreenAnim:DragonAnim;
        private allInScreenGroup:eui.Group;

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected componentInit(): void {
            this.playerHeads = [];
            this.playerHeads.push(this.player1, this.player2, this.player3, this.player4, this.player5, this.player6);
            this.playerChips = [];
            this.playerChips.push(this.chip1, this.chip2, this.chip3, this.chip4, this.chip5, this.chip6);
            for(let i=0;i<this.playerChips.length;i++) {
                this.playerChips[i].bindPlayer = this.playerHeads[i];
            }
            this.playerCards = [];
            this.playerCards.push(this.playerCard1, this.playerCard2, this.playerCard3, this.playerCard4, this.playerCard5, this.playerCard6);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.chipGroupArr = [];
            this.init();
            this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtnClick, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnClick, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankBtnClick, this);
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
            this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "ndzpk_btn_down", "ndzpk_btn_up");
            this.allInScreenAnim.stop();
            this.allInScreenGroup.visible = false;
            let w = Math.min(egret.lifecycle.stage.stageWidth, 1624)
            this.allInScreenGroup.scaleY = (w) / 1334;
        }

        protected onOpen() {
            this.menuGroup.showDefault();
            let gameLevel: number = RoomManager.getInstance().curRoomData.gameLevel;
            let bet: number = RoomManager.getInstance().curRoomData.bottomBet;
            let gameDesStr: string = "体验场";
            if (gameLevel == 0) {
                gameDesStr = "体验场";
            } else if (gameLevel == 1) {
                gameDesStr = "初级场";
            } else if (gameLevel == 2) {
                gameDesStr = "中级场";
            } else if (gameLevel == 3) {
                gameDesStr = "高级场";
            } else if (gameLevel == 4) {
                gameDesStr = "富豪场";
            }
            gameDesStr += " 小/大盲注" + (bet / 2).toFixed(0) + "/" + bet.toFixed(0);
            gameDesStr += " 不限注";
            this.gameDes.text = gameDesStr;
            this.totalBet.text = "总注：0";

            this.cardTypeGroup.visible = false;
            this.huluAnim.visible = false;
            this.jinggangAnim.visible = false;
            this.thsAnim.visible = false;
            this.hjthsAnim.visible = false;
            this.clearBattle();
        }

        private onTest() {
            /*
            this.player1.showCard([55,54],[true,false],true);
            this.player1.showFinishCardType(game.dzpk.TexasCardType.DUI);
            this.player1.showWin(100);
            */
            this.publicCards.visible = true;
            this.publicCards.showPublicCards([54,53,52,51,50]);
        }

        private onBackBtnClick(): void {
            let curRoomData = RoomManager.getInstance().curRoomData;
            if(!curRoomData || curRoomData.gameLevel == 0) {
                RoomRequest.leaveRoom(ChildGameType.DZPK);
                return;
            }
            let needNotice = false;
            if(TexasBattleData.getInstance().isStart) {
                let player = TexasBattleData.getInstance().getPlayer(UserService.instance.playerId);
                if(player && player.playType == PlayType.PLAYING && !TexasBattleData.getInstance().isSelfDrop) {
                    needNotice = true;   
                }
            }
            if(needNotice) {
                BattleLeaveTips.showTips({
                    "text": "您正在游戏中，退出房间后自动让牌或弃牌",
                    "callback": (data: any) => {
                        RoomRequest.leaveRoom(ChildGameType.DZPK);
                    },
                    "callbackObject": this,
                    "effectType": 0,
                    "tipsType": TipsType.OkAndCancel
                });
            } else {
                RoomRequest.leaveRoom(ChildGameType.DZPK);
            }
        }

        private onSettingBtnClick(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.DZPK);
        }

        private onHelpBtnClick(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DZPK);
        }

        private onBankBtnClick() {
            if (RoomManager.getInstance().curRoomData.gameLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return;
            }
            
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DZPK);
        }

        private init(): void {
            this.hideAllPlayerIcon();
            for (let playerChip of this.playerChips) {
                playerChip.visible = false;
            }
            for (let playerCard of this.playerCards) {
                playerCard.visible = false;
            }
            this.publicCards.visible = false;
            this.operationBar.visible = false;
            this.startCountDownLabel.text = "";
            this.cardTypeGroup.visible = false;

            this.chipGroupArr = [];
            this.chipGroup.removeChildren();

            let playerHead: DZPKHeadIcon = this.getPlayerIconByPos(0);
            playerHead.showStakeState(0);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public hideAllPlayerIcon(): void {
            for (let playerIcon of this.playerHeads) {
                playerIcon.visible = false;
            }
        }

        private getPlayerIcon(playerId: number): DZPKHeadIcon {
            let texasPlayer: TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(playerId);
            if (texasPlayer != null) {
                return this.playerHeads[texasPlayer.position - 1];
            }
            let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId).postion - 1;
            return this.playerHeads[pos];
        }
        private getPlayerChip(playerId: number): DZPKChip {
            let texasPlayer: TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(playerId);
            if (texasPlayer != null) {
                return this.playerChips[texasPlayer.position - 1];
            }
            let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId).postion - 1;
            return this.playerChips[pos];
        }

        private getPlayerIconByPos(pos: number): DZPKHeadIcon {
            return this.playerHeads[pos];
        }

        public refreshPlayer(refreshReason:RefreshReason = RefreshReason.ON_STEP): void {
            this.hideAllPlayerIcon();
            let roomData = RoomManager.getInstance().curRoomData;
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            var battleData: game.dzpk.TexasBattleData = game.dzpk.TexasBattleData.getInstance();
            if (!battleData.isStart) {
                for (let player of battleData.players) {
                    if (roomData.getPlayerInfo(player.playerId) == null) {
                        // 这个人已经走了

                    }
                }
            }
            for (let i = 0; i < players.length; i++) {
                let playerIcon: DZPKHeadIcon = this.getPlayerIcon(players[i].playerId);
                if (playerIcon != null) {
                    let texasPlayer: game.dzpk.TexasPlayer = battleData.getPlayer(players[i].playerId);
                    playerIcon.ShowPlayerHead(players[i]);
                    playerIcon.ShowWait(texasPlayer == null || texasPlayer.playType == game.dzpk.PlayType.WATCH);
                    playerIcon.ShowBanker(texasPlayer != null && texasPlayer.playerId == battleData.bankerPlayerId, refreshReason == RefreshReason.ON_START);
                    if (texasPlayer == null || texasPlayer.playType == game.dzpk.PlayType.WATCH) {
                        this.playerCards[players[i].postion - 1].visible = false;
                    }
                }
            }
            this.refreshPlayerMoney();
        }

        private updateStartTime(timestamp: number): boolean {
            let leftTime: number = this.endStartTimeEnd - timestamp;
            if (leftTime < 1000) {
                egret.stopTick(this.updateStartTime, this);
                this.bg.visible = false;
                this.startCountDownImg.visible = false;
                this.startCountDownLabel.text = "";
            } else {
                this.startCountDownLabel.text = Math.floor(leftTime / 1000).toFixed(0);
                this.startCountDownLabel.visible = true;
            }
            return true;
        }

        public refreshWait(): void {
            this.bg.visible = false;
            this.startCountDownImg.visible = false;
            this.nextGameWait.visible = false;
            this.othersWait.visible = false;
            let roomData = game.RoomManager.getInstance().curRoomData;
            if (roomData.status == GameStatus.PREPARE && !TexasBattleData.getInstance().isStart) {
                this.clearBattle();
                if (game.RoomManager.getInstance().curRoomData.downTime > 0) {
                    this.nextGameWait.visible = false;
                    this.refreshWait0(game.RoomManager.getInstance().curRoomData.downTime);
                } else {
                    this.nextGameWait.visible = true;
                }
            } else {
                let player = TexasBattleData.getInstance().getPlayer(UserService.instance.playerId);
                if (player == null || player.playType == PlayType.WATCH) {
                    this.nextGameWait.visible = true;
                    this.startCountDownLabel.text = "";
                    this.startCountDownLabel.visible = false;
                    egret.stopTick(this.updateStartTime, this);
                }
            }
            // this.testshow();
        }

        private refreshWait0(time: number): void {
            this.bg.visible = false;
            this.startCountDownImg.visible = false;
            this.nextGameWait.visible = false;
            this.othersWait.visible = false;
            if (time > 0) {
                //显示开始倒计时
                this.bg.visible = true;
                this.startCountDownImg.visible = true;
                this.endStartTimeEnd = egret.getTimer() + time * 1000;
                egret.startTick(this.updateStartTime, this);
            }
        }

        private refreshWait1(time: number): void {
            this.bg.visible = false;
            this.startCountDownImg.visible = false;
            this.nextGameWait.visible = false;
            this.othersWait.visible = false;
            if (time > 0) {
                //显示开始倒计时
                this.bg.visible = true;
                this.startCountDownImg.visible = true;
                this.startCountDownLabel.visible = true;
                this.endStartTimeEnd = time;
                egret.startTick(this.updateStartTime, this);
            }
        }

        public refreshStatus(): void {
            this.bg.visible = false;
            this.startCountDownImg.visible = false;
            this.nextGameWait.visible = false;
            this.othersWait.visible = false;
            var battleData: game.dzpk.TexasBattleData = game.dzpk.TexasBattleData.getInstance();
            let texasPlayer: game.dzpk.TexasPlayer = battleData.getPlayer(game.UserService.instance.playerId);
            let playerCountInRoom: number = RoomManager.getInstance().curRoomData.playerInfos.length;

            if (texasPlayer == null) {
                // 玩家不存在说明是等待状态
                if (playerCountInRoom < 2) {
                    // 显示等待其他玩家
                    this.othersWait.visible = true;
                } else {
                    // 等待开始
                    this.nextGameWait.visible = true;
                    this.startCountDownLabel.visible = false;
                }
            } else if (texasPlayer.playType == PlayType.WATCH) {
                this.nextGameWait.visible = true;
                this.startCountDownLabel.visible = false;
            } else {
                this.startCountDownLabel.text = "";
                egret.stopTick(this.updateStartTime, this);
            }
        }

        public startBattle(): void {
            for (let playerHead of this.playerHeads) {
                playerHead.clearState();
                playerHead.clearCard();
            }
            this.operationBar.visible = true;
            this.publicCards.visible = false;
            this.publicCards.clearAll();
            game.dzpk.TexasBattleData.getInstance().publicCards = [];
            //  所有的人的牌隐藏
            for (let playerCard of this.playerCards) {
                playerCard.visible = false;
            }
            this.cardTypeGroup.visible = false;
            for (let chipGroup of this.chipGroupArr) {
                chipGroup.visible = false;
            }
            
            // this.showOperationDownTime(); start battle 就不开始倒计时 ，等发牌结束 开始
            // this.startCountDownLabel.visible = false;
            // this.startCountDownImg.visible = false;
            this.winGroup.visible = false;
        }

        public showInitCard(reason:RefreshReason = RefreshReason.ON_STEP): void {
            let index = 0;
            var battleUI: DZPKBattleUI = this;
            for (let j = 0; j < 2; j++) {
                let players = game.dzpk.TexasBattleData.getInstance().players;
                for (let player of players) {
                    if (player.playType == PlayType.WATCH) continue;
                    let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(player.playerId).postion;
                    this.playerCards[pos - 1].playerId = player.playerId;
                    this.playerCards[pos - 1].visible = true;
                    this.playerCards[pos - 1].init();
                    if(reason == RefreshReason.ON_START) {
                        this.setTimeOut(()=>{
                            this.playerCards[pos - 1].showFapaiTween(j, battleUI);
                        }, (index++) * 100 + 500);// 500 是留着给庄家标记动画的时间
                    } else {
                        this.playerCards[pos - 1].showCardsDirect();
                    }
                }
            }
            if(reason == RefreshReason.ON_START) {
                this.setTimeOut(()=>{
                    this.showCardType();
                    this.operationBar.visible = true;
                }, index * 100 + 1500);
                let delayClock = index * 100 + 350;
                this.setTimeOut(()=>{
                    this.showOperationDownTime();
                }, delayClock)
            } else {
                this.showCardType();
            }
        }

        public showTotalBet(): void {
            this.totalBet.text = "总注：" + game.dzpk.TexasBattleData.getInstance().totalPoolMoney.toFixed(0);
        }

        private clearAllBetShow(): void {
            for (let chip of this.playerChips) {
                chip.visible = false;
            }
        }

        public showBetOnInit(): void {
            this.clearAllBetShow();
            for (let player of game.dzpk.TexasBattleData.getInstance().players) {
                let playerChip: DZPKChip = this.getPlayerChip(player.playerId);
                if (playerChip != null && player.bet > 0) {
                    playerChip.visible = true;
                    playerChip.showChip(player.bet);
                }
            }
        }

        public showBetOnSingle(data: any): void {
            let playerChip: DZPKChip = this.getPlayerChip(data.stakePlayerId);
            let player: TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(data.stakePlayerId);
            if (playerChip != null && player != null) {
                let bet: number = game.dzpk.TexasBattleData.getInstance().getPlayer(data.stakePlayerId).bet;
                if (bet > 0) {
                    playerChip.showChip(bet);
                }
            }
            let playerHead: DZPKHeadIcon = this.getPlayerIcon(data.stakePlayerId);
            playerHead.showStakeStateNormal(data.stakeType);
            if(data.stakePlayerId == UserService.instance.playerId && data.stakeType == game.dzpk.StakeType.ALL_IN) {
                this.allInScreenGroup.visible = true;
                this.allInScreenAnim.setLoop(true);
                this.allInScreenAnim.playerTimes(null,null,0);
                this.setTimeOut(()=>{
                    this.allInScreenGroup.visible = false;
                    this.allInScreenAnim.stop();
                }, 1500);
            }
        }

        public refreshOperationBar(reason:RefreshReason = RefreshReason.ON_STEP): void {
            if(reason == RefreshReason.ON_START) {
                // 需要等发牌结束
                this.operationBar.visible = false;
            } else {
                this.operationBar.visible = true;
            }
            var battleData: game.dzpk.TexasBattleData = game.dzpk.TexasBattleData.getInstance();
            if (battleData.currentOperatorId == game.UserService.instance.playerId) {
                // 是自己操作
                this.operationBar.showSelf();
                this.operationBar.refreshBtnState();
            } else {
                this.operationBar.showOthers();
            }
            egret.log("battleData.currentOperatorType   " + battleData.currentOperatorType);
            if (battleData.currentOperatorType == -1) {
                this.operationBar.visible = false;
            }
            let selfPlayer: TexasPlayer = battleData.getPlayer(game.UserService.instance.playerId);
            if (selfPlayer != null && selfPlayer.playType == PlayType.WATCH) {
                this.operationBar.visible = false;
            }
        }

        public showPublicCards(list: Array<number>): void {
            if (list.length > 0) {
                this.publicCards.visible = true;
                this.publicCards.showPublicCards(list);
            }
        }

        public showPublicCardsOnInit(): void {
            this.publicCards.clearAll();
            var list: Array<number> = game.dzpk.TexasBattleData.getInstance().publicCards;
            if (list.length > 0) {
                this.publicCards.visible = true;
                this.publicCards.showPublicCards(list);
            }
        }

        public showBattleEnd(): void {
            let battleFinishData: game.dzpk.TexasBattleFinishData = game.dzpk.TexasBattleData.getInstance().texasFinishData;
            this.operationBar.visible = false;
            for (let playerHead of this.playerHeads) {
                playerHead.clearState();
                playerHead.clearClock();
            }
            for(let playerCard of this.playerCards) {
                playerCard.visible = false;
            }
            // 循环展示赢钱的人
            let maxWinType = 0;
            let needPlayWinAnim = false;
            egret.log("battleFinishData.winPlayerInfos.length ： " + battleFinishData.winPlayerInfos.length)
            for(let i=0;i<battleFinishData.winPlayerInfos.length;i++) {
                let winPlayer = battleFinishData.winPlayerInfos[i];
                if(winPlayer.winType > maxWinType) {
                    maxWinType = winPlayer.winType;
                }
                if(winPlayer.winPlayerId == UserService.instance.playerId) {
                    // 播放你赢了动画
                    needPlayWinAnim = true;
                }
                let needFlyChip = this.chipGroupArr[i];
                this.setTimeOut(()=>{
                    let playerIcon: DZPKHeadIcon = this.getPlayerIcon(winPlayer.winPlayerId);
                    let playerInfo = battleFinishData.getPlayer(winPlayer.winPlayerId);
                    if(needFlyChip) {
                        needFlyChip.visible = false;
                        let img = new eui.Image("ndzpk_chip_gold")
                        img.anchorOffsetX = 15;
                        img.anchorOffsetY = 15;
                        let fromPos = needFlyChip.localToGlobal(needFlyChip.width/2,needFlyChip.height/2);
                        fromPos = this.contentGroup.globalToLocal(fromPos.x, fromPos.y);
                        this.contentGroup.addChild(img);
                        img.x = fromPos.x;
                        img.y = fromPos.y;
                        let targetPoint = playerIcon.getHeadPos();
                        targetPoint = this.contentGroup.globalToLocal(targetPoint.x, targetPoint.y);
                        egret.Tween.get(img).to({x:targetPoint.x, y:targetPoint.y}, 300).call(()=>{
                            if(img.parent) img.parent.removeChild(img);
                            playerIcon.showFinishCardType(winPlayer.winType);
                            this.publicCards.showCardResult(playerInfo.cards);
                            let flags: Array<boolean> = [
                                playerInfo.cards.indexOf(playerInfo.handCards[0]) >= 0,
                                playerInfo.cards.indexOf(playerInfo.handCards[1]) >= 0
                            ];
                            playerIcon.showCard(playerInfo.handCards, flags, true);
                            if (playerInfo.costMoney > 0) {
                                playerIcon.showWin(playerInfo.costMoney);
                            } else {
                                playerIcon.showLose(playerInfo.costMoney);
                            }
                            playerIcon.showImmGold(playerInfo.totalMoney);
                            playerIcon.clearEffect();
                        }, this);
                    } else {
                        playerIcon.showFinishCardType(winPlayer.winType);
                        this.publicCards.showCardResult(playerInfo.cards);
                        let flags: Array<boolean> = [
                            playerInfo.cards.indexOf(playerInfo.handCards[0]) >= 0,
                            playerInfo.cards.indexOf(playerInfo.handCards[1]) >= 0
                        ];
                        playerIcon.showCard(playerInfo.handCards, flags, true);
                        if (playerInfo.costMoney > 0) {
                            playerIcon.showWin(playerInfo.costMoney);
                        } else {
                            playerIcon.showLose(playerInfo.costMoney);
                        }
                        playerIcon.showImmGold(playerInfo.totalMoney);
                        playerIcon.clearEffect();
                    }
                }, 1500 * i);
            }

            this.setTimeOut(()=>{
                this.setTimeOut(()=>{
                    if(maxWinType > 0) {
                        if (maxWinType == game.dzpk.TexasCardType.TONG_HUA) {
                            // 同花不显示
                        }
                        if (maxWinType == game.dzpk.TexasCardType.HULU) {
                            this.huluAnim.visible = true;
                            this.huluAnim.playerOnce();
                        }
                        if (maxWinType == game.dzpk.TexasCardType.JIN_GANG) {
                            this.jinggangAnim.visible = true;
                            this.jinggangAnim.playerOnce();
                        }
                        if (maxWinType == game.dzpk.TexasCardType.TONG_HUA_SHUN) {
                            this.thsAnim.visible = true;
                            this.thsAnim.playerOnce();
                        }
                        if (maxWinType == game.dzpk.TexasCardType.MAX_TONG_HUA_SHUN) {
                            this.hjthsAnim.visible = true;
                            this.hjthsAnim.playerOnce();
                        }
                    } 
                    if(needPlayWinAnim) {
                        if (maxWinType == game.dzpk.TexasCardType.HULU ||
                            maxWinType == game.dzpk.TexasCardType.JIN_GANG ||
                            maxWinType == game.dzpk.TexasCardType.TONG_HUA_SHUN ||
                            maxWinType == game.dzpk.TexasCardType.MAX_TONG_HUA_SHUN) {
                                this.setTimeOut(()=>{
                                    this.winGroup.visible = true;
                                    this.winAnim.playerOnce();
                                }, 2000);
                        } else {
                            this.winGroup.visible = true;
                            this.winAnim.playerOnce();
                        }
                    }
                    this.showFinishPlayerHead();
                    game.dzpk.TexasBattleData.getInstance().clearData();
                    this.refreshWait1(game.dzpk.TexasBattleData.getInstance().texasFinishData.leftEndTime);
                }, 1000);
            }, 1500 * battleFinishData.winPlayerInfos.length + 500)
            
            this.setTimeOut(()=>{
                // 自动发送准备状态
                RoomRequest.sendBeady(true, game.ChildGameType.DZPK);
            }, 8000);
        }

        private hideWinGroup(): void {
            this.winGroup.visible = false;
            this.winAnim.stop();
        }

        private showEndCoinAnim(winPlayerId: number): void {
            this.showEndCoinTimeout = 0;
            let winPlayerHead: DZPKHeadIcon = this.getPlayerIcon(winPlayerId);
            var pos: egret.Point = winPlayerHead.parent.localToGlobal(winPlayerHead.x, winPlayerHead.y);
            pos.x += 80;
            pos.y += 80;
            // 先飞金币
            for (let chipGroup of this.chipGroupArr) {
                if (chipGroup.visible) {
                    chipGroup.flyToWin(pos);
                }
            }
            game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.CHIP_COLLECT);
            if (winPlayerId == game.UserService.instance.playerId) {
                game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.WIN);
            }
        }

        private showFinishPlayerHead(): void {
            let texasFinishData = game.dzpk.TexasBattleData.getInstance().texasFinishData;
            for (let playerHead of this.playerHeads) {
                if (playerHead.playerInfo != null) {
                    let texasPlayer: game.dzpk.TexasFinishPlayer = texasFinishData.getPlayer(playerHead.playerInfo.playerId);
                    // 赢家之前已经展示过了 不需要再次处理了
                    if(!texasFinishData.isWin(texasPlayer.playerId)) {
                        if (texasPlayer != null) {
                            if (texasPlayer.costMoney > 0) {
                                playerHead.showWin(texasPlayer.costMoney);
                            } else {
                                playerHead.showLose(texasPlayer.costMoney);
                            }
                            playerHead.showImmGold(texasPlayer.totalMoney);
                            playerHead.clearEffect();
                        }
                    }
                }
            }
            
        }

        public showBet(): void {

        }

        private testshow() {
            this.cardTypeGroup.visible = true;
            this.cardTypeImg.source = "ndzpk_royal_flush";
            this.cardTypeGroup.width = this.cardTypeImg.width + 50;
        }

        public showCardType(): void {
            this.cardTypeGroup.visible = true;
            let cardType: TexasCardType = game.dzpk.TexasBattleData.getInstance().selfCardType;
            if (cardType == TexasCardType.NONE) this.cardTypeGroup.visible = false;
            let headIcon: DZPKHeadIcon = this.getPlayerIcon(game.UserService.instance.playerId);
            if (headIcon != null && headIcon.waitImg.visible) this.cardTypeGroup.visible = false;
            switch (cardType) {
                case TexasCardType.DUI:
                    this.cardTypeImg.source = "ndzpk_one_pair";
                    break;
                case TexasCardType.SHUANG_DUI:
                    this.cardTypeImg.source = "ndzpk_two_pairs";
                    break;
                case TexasCardType.GAO_PAI:
                    this.cardTypeImg.source = "ndzpk_high_card";
                    break;
                case TexasCardType.HULU:
                    this.cardTypeImg.source = "ndzpk_full_house";
                    break;
                case TexasCardType.JIN_GANG:
                    this.cardTypeImg.source = "ndzpk_four";
                    break;
                case TexasCardType.MAX_TONG_HUA_SHUN:
                    this.cardTypeImg.source = "ndzpk_royal_flush";
                    break;
                case TexasCardType.SAN:
                    this.cardTypeImg.source = "ndzpk_three";
                    break;
                case TexasCardType.SHUN:
                    this.cardTypeImg.source = "ndzpk_straight";
                    break;
                case TexasCardType.TONG_HUA:
                    this.cardTypeImg.source = "ndzpk_flush";
                    break;
                case TexasCardType.TONG_HUA_SHUN:
                    this.cardTypeImg.source = "ndzpk_straight_flush";
                    break;
            }
            this.cardTypeImgBg.width = this.cardTypeImg.width + 50;
        }

        public showChipGroup(): void {
            this.showTotalBet();
            // 先飞金币
            for(let chip of this.playerChips) {
                if(chip.visible && chip.lastValue > 0) {
                    let img = new eui.Image("ndzpk_chip_gold")
                    img.anchorOffsetX = 15;
                    img.anchorOffsetY = 15;
                    let fromPos = chip.goldImg.localToGlobal(0,0);
                    fromPos = this.contentGroup.globalToLocal(fromPos.x, fromPos.y);
                    this.contentGroup.addChild(img);
                    img.x = fromPos.x;
                    img.y = fromPos.y;
                    egret.Tween.get(img).to({
                        x:this.chipGroup.x + this.chipGroup.width / 2, 
                        y:this.chipGroup.y + this.chipGroup.height / 2}, 
                    300).call(()=>{
                        if(img.parent) img.parent.removeChild(img);
                    }, this);
                }
            }
            this.setTimeOut(()=>{
                this.chipGroupArr = [];
                this.chipGroup.removeChildren();
                for (let m of game.dzpk.TexasBattleData.getInstance().cardPoolMoney) {
                    let chip: DzpkChipGroup = new DzpkChipGroup();
                    chip.width = 125;
                    this.chipGroup.addChild(chip);
                    this.chipGroupArr.push(chip);
                    chip.showGold(m, RoomManager.getInstance().curRoomData.bottomBet);
                }
                this.chipGroup.width = 125 * game.dzpk.TexasBattleData.getInstance().cardPoolMoney.length;
            }, 300)
        }

        public showChipGroupOnInit(): void {
            this.chipGroupArr = [];
            this.chipGroup.removeChildren();
            for (var i = 0; i < game.dzpk.TexasBattleData.getInstance().cardPoolMoney.length; i++) {
                let chip: DzpkChipGroup = new DzpkChipGroup();
                chip.width = 125;
                this.chipGroup.addChild(chip);
                this.chipGroupArr[i].showGold(game.dzpk.TexasBattleData.getInstance().cardPoolMoney[i],  RoomManager.getInstance().curRoomData.bottomBet);
            }
            this.chipGroup.width = 125 * game.dzpk.TexasBattleData.getInstance().cardPoolMoney.length;
        }

        public clearBattle(): void {
            if (this.showEndCoinTimeout > 0) {
                egret.clearTimeout(this.showEndCoinTimeout);
            }
            CommonUtil.removeTimeout(this);
            this.clearAllTimeOut();
            for (let playerHead of this.playerHeads) {
                playerHead.clearState();
            }
            egret.stopTick(this.updateStartTime, this);
            this.startCountDownLabel.visible = false;
            this.operationBar.visible = false;
            this.publicCards.visible = false;
            this.publicCards.clearAll();
            this.winGroup.visible = false;
            game.dzpk.TexasBattleData.getInstance().publicCards = [];
            //  所有的人的牌隐藏
            for (let playerCard of this.playerCards) {
                playerCard.visible = false;
            }
            for (let chip of this.playerChips) {
                chip.visible = false;
            }
            this.cardTypeGroup.visible = false;
            for (let chipGroup of this.chipGroupArr) {
                chipGroup.visible = false;
            }
            this.chipGroup.removeChildren();
            CommonUtil.removeTimeout(this);
        }

        public refreshPlayerMoney(): void {
            for (let headIcon of this.playerHeads) {
                if (headIcon.playerInfo == null) continue;
                var texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(headIcon.playerInfo.playerId);
                if (texasPlayer == null) continue;
                headIcon.showImmGold(texasPlayer.money);
            }
        }

        public showOperationDownTime(): void {
            let playerId: number = game.dzpk.TexasBattleData.getInstance().currentOperatorId;
            if (playerId == 0) return;
            let headIcon: DZPKHeadIcon = this.getPlayerIcon(playerId);
            if (headIcon != null) {
                if (this.prevHeadIcon != null) {
                    this.prevHeadIcon.clearClock();
                }
                headIcon.showClock(game.dzpk.TexasBattleData.getInstance().clientDownTime);
                this.prevHeadIcon = headIcon;
            }
        }

        public clearPlayerOper(): void {
            for (let head of this.playerHeads) {
                if (head.curStakeType != StakeType.DISCARD) {
                    head.showStakeState(StakeType.NONE);
                }
            }
        }

        public playGirlAnim() {
            this.girlAnim.playerOnce();
        }

        public selfDropCards() {
            this.playerCard1.dropFlay(this, false, ()=>{
                this.player1.showGrayState();
                this.playerCard1.showGrayState();
            }, this);
        }

        public otherDropCards(playerId:number) {
            let player = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
            if(player && this.playerCards[player.postion]) {
                this.playerCards[player.postion].dropFlay(this, true, ()=>{
                    this.playerHeads[player.postion].showGrayState();
                }, this)
            }
        }
    }

}