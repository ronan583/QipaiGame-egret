module game.pdk {
    export class PDKBattleUI extends GameScene {
        public constructor() {
            super();

            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/pdk/pdkBattleUI.exml";
            this.gameType = ChildGameType.PDK;
        }

        public playerIcon1: PDKPlayerIcon;
        public playerIcon2: PDKPlayerIcon;
        public playerIcon3: PDKPlayerIcon;

        public cardRecord: PDKCardRecord;

        public tips3: PDKOperTip;
        public tips2: PDKOperTip;
        public tips1: PDKOperTip;

        private tipsArr:Array<PDKOperTip>;

        public playerIcons: Array<PDKPlayerIcon>;
        public cardOperation: PDKPokerCardOperation;
        public tableCard1: PDKTableCards;
        public tableCard2: PDKTableCards;
        public tableCard3: PDKTableCards;

        public cardPlayAnimPos1:eui.Group;
        public cardPlayAnimPos2:eui.Group;
        public cardPlayAnimPos3:eui.Group;

        private fapaiHelper:PDKFapaiHelper;

        public tableCards: Array<PDKTableCards>;
        public cardAnim: PDKFirstCardAnim;
        public playCardBtnGroup: PDKPlayCard;
        public wait: eui.Group;
        public dizhuLabel: eui.Label;
        public gameResultFlag: eui.Image;

        public clock2: PDKClock;
        public clock3: PDKClock;

        public leftCard3: PDKCardCount;
        public leftCard2: PDKCardCount;

        public trusteeshipCancelBtn: eui.Button;
        public trusteeshipBtn: eui.Button;
        public trusteeshipGroup:eui.Group;

        private battleResult: PDKBattleResult;
        private waitAnim: CommonDBLoop2;
        private springAnim: game.CommonDB;

        private showMenuBtn: IButton;
        private hideMenuBtn: IButton;
        private menuGroup: eui.Group;
        public backBtn: IButton;
        public settingBtn: IButton;
        private wanfaBtn: IButton;
        private bankBtn: IButton;
        public contentGroup:eui.Group;
        private fapaiBegin:eui.Image;
        private firstTipsCard3:eui.Group;
        private firstTipsCard2:eui.Group;
        private firstTipsCard3Pos:egret.Point;
        private firstTipsCard2Pos:egret.Point;

        private oriTableCardYArr:Array<number>;

        private testBtn:eui.Button;

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.playerIcons = [this.playerIcon1, this.playerIcon2, this.playerIcon3];
        }

        protected componentInit(): void {
            super.componentInit();
            this.init();
            this.trusteeshipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrusteeshipClick, this);
            this.trusteeshipCancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrusteeshipCancelClick, this);
            this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtnClick, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.wanfaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnClick, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankBtnClick, this);

            this.showMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenuTrue, this);
            this.hideMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenuFalse, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);
            // 初始化动画
            this.waitAnim = new CommonDBLoop2("dengdaiwanj_ske_dbbin", "dengdaiwanj_tex_json", "dengdaiwanj_tex_png", "animation");
            this.waitAnim.touchEnabled = false;
            this.waitAnim.touchChildren = false;
            this.wait.addChild(this.waitAnim);
            this.waitAnim.x = 300;
            this.waitAnim.y = 14;
            this.tipsArr = [this.tips1, this.tips2, this.tips3];
            this.fapaiHelper = new PDKFapaiHelper(this.cardOperation, this.contentGroup, this.fapaiBegin, 
                this.leftCard2, this.leftCard3, this);
            this.firstTipsCard2Pos = new egret.Point(this.firstTipsCard2.x, this.firstTipsCard2.y);
            this.firstTipsCard3Pos = new egret.Point(this.firstTipsCard3.x, this.firstTipsCard3.y);
            this.tableCard1.bindBattleUI = this;
            this.tableCard2.bindBattleUI = this;
            this.tableCard3.bindBattleUI = this;
            this.oriTableCardYArr = [
                this.tableCard1.y, this.tableCard2.y, this.tableCard3.y
            ]
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
        }

        private onTest() {
            this.playerIcon1.showWinAnim();
            // this.fapaiHelper.playFapai([12,13,14,15,16,17,18,19,20,21,22,23,24]);
            //this.tableCard2.visible = true;
            //this.tableCard2.showCardsOnEnd([12,13,14,15,16,17,18,19,20,21,22]);
        }

        protected onOpen() {
            super.onOpen();
            this.init();
            this.fapaiBegin.visible = false;
            this.trusteeshipBtn.visible = false;
            this.firstTipsCard2.visible = false;
            this.firstTipsCard3.visible = false;
            this.trusteeshipGroup.visible = false;
        }

        private showMenuTrue() {
            this.showMenu(true);
        }

        private showMenuFalse() {
            this.showMenu(false);
        }

        public onCheckFocus(event: egret.TouchEvent) {
            if (event.target != this.showMenuBtn) {
                this.showMenu(false);
            }
        }


        private showMenu(isshow: boolean) {
            this.menuGroup.visible = isshow;
            this.showMenuBtn.visible = !isshow;
            this.hideMenuBtn.visible = isshow;
        }

        private onHelpBtnClick(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.PDK);
        }

        private onTrusteeshipClick(): void {
            RoomRequest.trusteeship(ChildGameType.PDK, true);
        }

        private onTrusteeshipCancelClick(): void {
            RoomRequest.trusteeship(ChildGameType.PDK, false);
        }

        private onSettingBtnClick(): void {
            var settingPanel: PdkSetPanel = new PdkSetPanel();
            PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
        }

        private onBankBtnClick(): void {
            if (RoomManager.getInstance().curRoomData.gameLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.PDK);
        }

        private init(): void {
            this.tableCards = [this.tableCard1, this.tableCard2, this.tableCard3];
            this.tableCard1.touchEnabled = this.tableCard1.touchChildren = false;
            this.tableCard2.touchEnabled = this.tableCard2.touchChildren = false;
            this.tableCard3.touchEnabled = this.tableCard3.touchChildren = false;
            this.tableCard2.cardSortDir = game.ddz.CardSort.RIGHT;
            this.tableCard3.cardSortDir = game.ddz.CardSort.LEFT;
            this.tableCard2.init();
            this.tableCard3.init();
            this.playCardBtnGroup.visible = false;
            this.cardRecord.visible = false;
            this.wait.visible = false;
            // this.gameResultFlag.visible = false;
            this.leftCard2.visible = false;
            this.leftCard3.visible = false;
            this.leftCard2.init(game.ddz.CardSort.RIGHT);
            this.leftCard3.init(game.ddz.CardSort.LEFT);
            this.cardAnim.visible = false;
            this.hideAllClock();
            this.clearAllOperTip();
            if (RoomManager.getInstance().curRoomData) {
                this.dizhuLabel.text = 'd' + RoomManager.getInstance().curRoomData.bottomBet.toFixed(2);
            }

            this.showMenu(false);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public hideAllPlayerIcon(): void {
            for (let i = 0; i < 3; i++) {
                this.playerIcons[i].visible = false;
            }
        }

        public getPlayerIcon(pos: number): PDKPlayerIcon {
            return this.playerIcons[pos - 1];
        }

        public getPlayerIconByPlayerId(playerId: number): PDKPlayerIcon {
            for (let i = 0; i < this.playerIcons.length; i++) {
                if (this.playerIcons[i].playerInfo != null && this.playerIcons[i].playerInfo.playerId == playerId) {
                    return this.playerIcons[i];
                }
            }
            return null;
        }

        public refreshPlayer(): void {
            this.hideAllPlayerIcon();
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                if (players[i].postion > 0) {
                    this.getPlayerIcon(players[i].postion).showPlayerInfo(players[i]);
                }
            }
        }

        public refreshMoney(): void {
            this.hideAllPlayerIcon();
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                this.getPlayerIcon(players[i].postion).showMoney(players[i]);
            }
        }

        public showScore(data: any): void {
            for (let scoreData of data.playerBomb) {
                let playerId: number = scoreData.playerId;
                let playerIcon: PDKPlayerIcon = this.getPlayerIconByPlayerId(playerId);
                playerIcon.showMoneyAnim(scoreData.money, scoreData.totalMoney);
            }
        }

        public refreshWait(): void {
            // if (RoomManager.getInstance().curRoomData.status == GameStatus.PREPARE) {
            this.wait.visible = true;
            // } else {
            //     this.wait.visible = false;
            // }
        }

        public playStartCardAnim(): void {
            let playerId: number = game.pdk.PDKBattleData.getInstance().curPlayPlayerId;
            let pos = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId).postion;
            let targetPoint:egret.Point = null;
            let targetFlag:eui.Group = null;
            let targetInitPos:egret.Point = null;
            if (pos == 2) {
                targetPoint = this.leftCard2.localToGlobal(this.leftCard2.width / 2, this.leftCard2.height / 2);
                targetPoint = this.contentGroup.globalToLocal(targetPoint.x, targetPoint.y);
                targetFlag = this.firstTipsCard2;
                targetInitPos = this.firstTipsCard2Pos;
            } else if (pos == 3) {
                targetPoint = this.leftCard3.localToGlobal(this.leftCard3.width / 2, this.leftCard3.height / 2);
                targetPoint = this.contentGroup.globalToLocal(targetPoint.x, targetPoint.y);
                targetFlag = this.firstTipsCard3;
                targetInitPos = this.firstTipsCard3Pos;
            }
            if(targetFlag && targetPoint) {
                targetFlag.visible = true;
                targetFlag.scaleX = targetFlag.scaleY = 0.6;
                targetFlag.x = targetInitPos.x;
                targetFlag.y = targetInitPos.y;
                targetFlag.alpha = 1;
                this.setTimeOut(()=>{
                    egret.Tween.get(targetFlag).to({x:targetPoint.x,y:targetPoint.y, scaleX:0.1, scaleY:0.1, alpha:0.1}, 700).call(
                        ()=>{
                            targetFlag.visible = false;
                        }, this
                    )
                }, 500);
            }
        }

        public refreshBattleInfo(isStart:boolean = false): void {
            let battleData = game.pdk.PDKBattleData.getInstance();
            this.resetTableCards();
            if (battleData.selfHandCards != null && battleData.selfHandCards.length > 0) {
                // 显示自己的牌型
                this.cardOperation.visible = true;
                this.cardOperation.showMainCards(battleData.selfHandCards, isStart);
                this.trusteeshipBtn.visible = true;
                if(isStart) {
                    this.fapaiHelper.playFapai(battleData.selfHandCards);
                    this.setTimeOut(this.playStartCardAnim, 500);
                }
            }
            if (battleData.battleStatus != game.pdk.PDKStatus.PREPARE) {
                this.wait.visible = false;
                this.refreshFightStatus();
                this.showTableCards();
            } else {
            }
        }

        public resetTableCards() {
            for(let i=0;i<3;i++) {
                this.tableCards[0].y = this.oriTableCardYArr[0];
            }
        }

        public selfPlayCards():void {
            // 清除提示的选中牌
            // this.cardOperation.clearAllChoose();
            PDKBattleData.getInstance().clearLastTip();
            let battleData = PDKBattleData.getInstance();
            this.cardOperation.flyCard(this.tableCard1, battleData.tableCard.cards);
            // 其他两家 不显示
            this.tableCard2.clearAll();
            this.tableCard3.clearAll();
        }

        public onSendCardError() {
            TipsUtils.showTipsFromCenter("选取牌型不符合规则");
        }

        public othersPlay() {
            let battleData = game.pdk.PDKBattleData.getInstance();
            let delay:number = 0;
            if (battleData.tableCard != null && battleData.tableCard.playerId > 0) {
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(battleData.tableCard.playerId).postion - 1;
                delay = this.tableCards[pos].showPlayCards(battleData.tableCard);

                for (let i = 0; i < this.tableCards.length; i++) {
                    if (i != pos) {
                        this.tableCards[i].clearAll();
                    }
                }
                for (let i = 0; i < this.tipsArr.length; i++) {
                    if (i != pos) {
                        this.tipsArr[i].clear();
                    }
                }
                
                if(delay > 0) {
                    // PDKBattleData.getInstance().downTime -= delay / 1000;
                    this.setTimeOut(this.refreshFightStatus, delay);
                } else {
                    this.refreshFightStatus();
                }
            }
        }


        public hideAllClock(): void {
            this.clock2.visible = false;
            this.clock3.visible = false;
        }

        public getClock(playerId: number): PDKClock {
            let player = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
            if(player) {
                let pos: number = player.postion;
                if (pos == 2) {
                    return this.clock2;
                } else if (pos == 3) {
                    return this.clock3;
                }
            }
            return null;
        }

        public refreshFightStatus(): void {
            this.hideAllClock();
            let battleData = game.pdk.PDKBattleData.getInstance();
            if (battleData.battleStatus == game.pdk.PDKStatus.FIGHT) {
                if (battleData.getPlayer(UserService.instance.playerId).isTrusteeship) {
                    this.trusteeshipGroup.visible = true;
                    this.playCardBtnGroup.visible = false;
                    this.trusteeshipBtn.visible = false;
                } else {
                    this.trusteeshipGroup.visible = false;
                    this.trusteeshipBtn.visible = true;
                }
                if (battleData.isSelfPlay) {
                    if (!battleData.getPlayer(UserService.instance.playerId).isTrusteeship) {
                        if(!this.fapaiHelper.isRunning) {
                            this.playCardBtnGroup.visible = true;
                        } else {
                            this.fapaiHelper.addFapaiComplete(()=>{
                                this.playCardBtnGroup.visible = true;
                            }, this);
                        }

                        // 轮到自己出手
                        if (battleData.tableCard == null || battleData.tableCard.playerId == 0) {
                            this.playCardBtnGroup.showFirst();
                        } else {
                            this.playCardBtnGroup.showNormal(battleData.tableCard.playerId);
                            if(battleData.tableCard.playerId != UserService.instance.playerId) {
                                let forbidden = game.pdk.PDKBattleData.getInstance().checkForbiddenCards();
                                this.cardOperation.setForbbiden(forbidden);
                            }else{
                                this.cardOperation.cancelAllForbidden();
                            }
                        }
                    }
                } else {
                    let clock: PDKClock = this.getClock(battleData.curPlayPlayerId);
                    if (clock != null) {
                        clock.startClock(battleData.clientSimulateDownTime);
                    }
                    this.playCardBtnGroup.visible = false;
                    this.cardOperation.cancelAllForbidden();
                }
                this.cardRecord.visible = true;
                this.cardRecord.refresh(battleData.cardHolder);
                this.showLeftCards(null);
            } else {
                this.trusteeshipBtn.visible = false;
            }
        }

        public playCard(): void {
            let cards: Array<number> = this.cardOperation.getSelectCards();
            if (cards.length == 0) {
                TipsUtils.showTipsFromCenter("请选择要出的牌");
                return;
            }
            PDKRequest.playStep(false, cards);
        }

        public removePlayCards(): void {
            let battleData = game.pdk.PDKBattleData.getInstance();
            if (battleData.tableCard != null && battleData.tableCard.playerId == UserService.instance.playerId) {
                this.cardOperation.removeCards(battleData.tableCard.cards);
            }
        }
        
        public showTableCards(): void {
            let battleData = game.pdk.PDKBattleData.getInstance();
            if (battleData.tableCard != null && battleData.tableCard.playerId > 0) {
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(battleData.tableCard.playerId).postion - 1;
                this.tableCards[pos].showPlayCards(battleData.tableCard);
                for (let i = 0; i < this.tableCards.length; i++) {
                    if (i != pos) {
                        this.tableCards[i].clearAll();
                    }
                }
                this.clearAllOperTip();
                this.cardAnim.visible = false;
            }
        }

        public getOperTip(playerId: number): PDKOperTip {
            let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId).postion;
            if (pos == 1) {
                return this.tips1;
            } else if (pos == 2) {
                return this.tips2;
            } else if (pos == 3) {
                return this.tips3;
            }
            return null;
        }

        public clearAllOperTip(): void {
            this.tips1.clear();
            this.tips2.clear();
            this.tips3.clear();
        }

        public showDonotTip(playerId: number): void {
            this.clearAllOperTip();
            let operTip = this.getOperTip(playerId);
            if(operTip) operTip.showDonot();
        }

        public refrehHandCards(isPushBottm: any): void {
            if (!isPushBottm) {
                this.cardOperation.showCardsWithFlag(game.pdk.PDKBattleData.getInstance().selfHandCards);
            } else {
                this.cardOperation.showCardsWithAdd(game.pdk.PDKBattleData.getInstance().bottomCards);
            }
        }

        public battleEnds() {
            game.pdk.PDKBattleData.getInstance().getPlayer(UserService.instance.playerId).isTrusteeship = false;
            this.trusteeshipBtn.visible = false;
            this.trusteeshipGroup.visible = false;
            this.playCardBtnGroup.visible = false;
            this.leftCard2.clearFlag();
            this.leftCard3.clearFlag();
            this.setTimeOut(() => {
                this.battleEnd();
            }, PDKTableCards.cacheDelay + 500);
        }

        public battleEnd(): void {
            // 显示所有人的手里剩余的牌
            game.pdk.PDKSoundPlayer.instance.playEndBg();
            let battleData: game.pdk.PDKBattleData = game.pdk.PDKBattleData.getInstance();
            let battleFinishData: game.pdk.BattleFinishInfo = battleData.finishData;
            for (let playerFinishInfo of battleFinishData.playerInfos) {
                let pfi: game.pdk.BattlePlayerInfo = playerFinishInfo;
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(pfi.playerId).postion - 1;
                this.tableCards[pos].showCardsOnEnd(pfi.handCards);
                // 重新定义位置
                if(pos == 0) {
                    this.tableCards[0].y = this.oriTableCardYArr[0] + 100;
                } else {
                    if(pfi.handCards.length > 10) {
                        this.tableCards[pos].y = this.oriTableCardYArr[pos] - 60;
                    }
                }
                this.playerIcons[pos].showMoneyAnim(playerFinishInfo.money, playerFinishInfo.totalMoney)
                if(playerFinishInfo.money > 0) {
                    this.playerIcons[pos].showWinAnim()
                }
            }
            this.cardOperation.visible = false;
            battleData.getPlayer(UserService.instance.playerId).isTrusteeship = false;
            this.clearAllOperTip();
            this.hideAllClock();
            this.setTimeOut(()=>{
                if (battleFinishData.isSpring && battleFinishData.isWin) {
                    // 显示春天动画
                    this.showSpringMc();
                    this.setTimeOut(this.showBattleEnd, 3500);
                } else {
                    this.setTimeOut(this.showBattleEnd, 1500);
                }
            }, 2000)
        }

        private showBattleEnd(): void {
            this.battleResult = new PDKBattleResult();
            PopUpManager.addPopUp(this.battleResult, true);
            this.cardOperation.visible = false;
            this.playCardBtnGroup.visible = false;
        }

        public showSpringMc(): void {
            this.springAnim = new game.CommonDB("ddzchutian_ske_dbbin", "ddzchutian_tex_json", "ddzchutian_tex_png", "animation", 3500);
            this.addChild(this.springAnim);
            this.springAnim.x = this.width / 2;
            this.springAnim.y = this.height / 2;
        }

        public showTipsCard(): void {
            let battleData: game.pdk.PDKBattleData = game.pdk.PDKBattleData.getInstance();
            this.cardOperation.clearAllChoose();
            let cards: number[] = [];
            battleData.group();
            console.log("battle data last tips : " + (battleData.lastTipCards != null ? battleData.lastTipCards.length : 0))
            if (battleData != null && (battleData.tableCard == null ||
                battleData.tableCard.playerId == 0 || battleData.tableCard.playerId == UserService.instance.playerId)) {
                cards = battleData.checkDefaultCard2();
            } else {
                cards = battleData.checkCard2();
            }
            if (cards.length > 0) {
                this.cardOperation.autoChoose(cards);
            }
        }

        public showLeftCards(playerId: any): void {
            let players: game.pdk.PDKPlayerInfo[] = game.pdk.PDKBattleData.getInstance().PDKPlayerInfos;
            for (let i = 0; i < players.length; i++) {
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(players[i].playerId).postion;
                if (pos == 2 && (!playerId || playerId == players[i].playerId)) {
                    this.leftCard2.showCount(players[i].cardCount, players[i].playerId);
                    this.leftCard2.visible = true;
                } else if (pos == 3 && (!playerId || playerId == players[i].playerId)) {
                    this.leftCard3.showCount(players[i].cardCount, players[i].playerId);
                    this.leftCard3.visible = true;
                }
            }
        }

        public changeTrusteeshipState(playerId: number): void {
            if (playerId == UserService.instance.playerId) {
                // 如果是自己
                this.refreshFightStatus();
            } else {
                let playerIcon: PDKPlayerIcon = this.getPlayerIconByPlayerId(playerId);
                if (playerIcon) {
                    playerIcon.showPlayerInfo(RoomManager.getInstance().curRoomData.getPlayerInfo(playerId));
                }
            }
        }

        private onBackBtnClick(): void {
            if(RoomManager.getInstance().curRoomData.gameLevel == 0) {
                // 体验场
                RoomRequest.leaveRoom(ChildGameType.PDK);
            } else {
                if(PDKBattleData.getInstance().battleStatus == PDKStatus.PREPARE) {
                    RoomRequest.leaveRoom(ChildGameType.PDK);
                } else {
                    TipsUtils.showTipsFromCenter("当前游戏阶段无法退出游戏");
                }
            }
        }

        public onJiabeiComplete(): void {
            this.tips2.clear();
            this.tips3.clear();
        }

        public closeResult(): void {
            if (this.battleResult && this.battleResult.stage) {
                PopUpManager.removePopUp(this.battleResult);
                this.battleResult = null;
            }
        }

        public clearBattle(): void {
            this.clearAllTimeOut();
            this.init();
            this.fapaiHelper.clear();
            game.pdk.PDKBattleData.getInstance().clearData();
            this.cardOperation.clearAll();
            this.playCardBtnGroup.init();
            this.tableCard1.clearAll();
            this.tableCard2.clearAll();
            this.tableCard3.clearAll();
            this.leftCard2.clearFlag();
            this.leftCard3.clearFlag();
            this.cardRecord.visible = false;
            this.trusteeshipBtn.visible = false;
            this.trusteeshipGroup.visible = false;
            this.playCardBtnGroup.visible = false;
            for (let playerHead of this.playerIcons) {
                if (playerHead.playerInfo != null && playerHead.playerInfo.playerId > 0) {
                    let p = null;
                    if (RoomManager.getInstance().curRoomData) {
                        p = RoomManager.getInstance().curRoomData.getPlayerInfo(playerHead.playerInfo.playerId);
                    }
                    if (p) {

                    } else {
                        playerHead.playerInfo = null;
                        playerHead.visible = false;
                    }

                }
            }
            this.refreshBattleInfo();
            this.refreshWait();
        }

        public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
            if(playerInfo) {
                playerInfo.money = totalmoney;
            }
			this.playerIcon1.showMoneyImm(totalmoney);
		}
    }

}