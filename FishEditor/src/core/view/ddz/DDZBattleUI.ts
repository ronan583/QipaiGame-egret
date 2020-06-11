module game.ddz {
    export class DDZBattleUI extends GameScene {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/ddz/ddzBattleUI.exml";
            this.gameType = ChildGameType.DDZ;
        }

        public playerIcon1: DDZPlayerIcon;
        public playerIcon2: DDZPlayerIcon;
        public playerIcon3: DDZPlayerIcon;

        public cardRecord: CardRecord;

        public tips3: DDZOperTip;
        public tips2: DDZOperTip;
        public tips1: DDZOperTip;

        public playerIcons: Array<DDZPlayerIcon>;
        public cardOperation: PokerCardOperation;
        public tableCard1: DDZTableCards;
        public tableCard2: DDZTableCards;
        public tableCard3: DDZTableCards;
        private ddzGameMulti:DDZGameMulti;
        public cardPlayAnimPos1:eui.Group;
        public cardPlayAnimPos2:eui.Group;
        public cardPlayAnimPos3:eui.Group;
        public cardPlayAnimArr:Array<eui.Group>;
        public contentGroup:eui.Group;
        private fapaiBegin:eui.Image;
        private fapaiHelper:DDZFapaiHelper;

        public tableCards: Array<DDZTableCards>;
        public tipsArr:Array<DDZOperTip>;

        public jiaofen: DDZJiaofen;
        public jiabei: DDZJiabei;
        public playCardBtnGroup: DDZPlayCard;
        public bottomCard: DDZBottomCard;
        public wait: eui.Group;
        public dizhuLabel: eui.Label;

        public clock2: DDZClock;
        public clock3: DDZClock;

        public leftCard3: DDZCardCount;
        public leftCard2: DDZCardCount;

        public trusteeshipCancelBtn: eui.Button;
        public trusteeshipGroup:eui.Group;
        public trusteeshipBtn: eui.Button;

        private ddzBattleResult: DDZBattleResult;
        private waitAnim: DragonAnim;
        private waitNexrRoundAnim: DragonAnim;
        private springAnim: game.CommonDB;
        private gameRoomLabel: eui.BitmapLabel;
        private gameResultFlag: game.CommonDB;
        private lordAnim: DragonAnim;

        public playerGroups: Array<eui.Group>;
        private playerGroup1: eui.Group;
        private playerGroup2: eui.Group;
        private playerGroup3: eui.Group;

        private playerAnim: string;
        private playerAnims: Array<DDZCartoon>;

        private playerName: eui.Label;
        private playerName1: eui.Label;
        private playerName2: eui.Label;
        private playerName3: eui.Label;
        private playerVipLabel1:eui.BitmapLabel;
        private playerVipLabel2:eui.BitmapLabel;
        private playerVipLabel3:eui.BitmapLabel;
        private playerVipLabelArr:Array<eui.BitmapLabel>;

        private gold: eui.BitmapLabel;
        private gold1: eui.BitmapLabel;
        private gold2: eui.BitmapLabel;
        private gold3: eui.BitmapLabel;

        private lordMaozi1: eui.Image;
        private lordMaozi2: eui.Image;
        private lordMaozi3: eui.Image;
        private lordAnimMng: DDZLordAnim;
        private dizhuFlagShow:boolean = false;
        private showMenuBtn: eui.Button;
        private hideMenuBtn: eui.Button;
        private menuGroup: eui.Group;
        private testOperation:PokerCardOperation;
        private backBtn: eui.Button;
        private ruleBtn: eui.Button;
        private setBtn: eui.Button;
        private bankBtn: eui.Button;

        private role1:DDZCartoon;
        private role2:DDZCartoon;
        private role3:DDZCartoon;

        private farmerJiabeiImg:eui.Image;
        private farmerJiabeiGroup:eui.Group;

        public testBtn:eui.Button;
        private noBiggerImg:eui.Image;
        private showResult: boolean = false;

        protected componentInit(): void {
            super.componentInit();
            this.bottomCard.bindBattleUI = this;
            this.playerIcons = [this.playerIcon1, this.playerIcon2, this.playerIcon3];
            this.playerGroups = [this.playerGroup1, this.playerGroup2, this.playerGroup3];
            this.playerVipLabelArr = [this.playerVipLabel1, this.playerVipLabel2, this.playerVipLabel3];
            this.trusteeshipBtn.visible = false;
            this.trusteeshipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrusteeshipClick, this);
            this.trusteeshipCancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrusteeshipCancelClick, this);
            this.showMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenuTrue, this);
            this.hideMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenuFalse, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);
            this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtnClick, this);
            this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnClick, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankBtnClick, this);
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
            this.playerAnims = [this.role1, this.role2, this.role3];
            this.cardPlayAnimArr = [this.cardPlayAnimPos1, this.cardPlayAnimPos2, this.cardPlayAnimPos3];
            this.tipsArr = [this.tips1, this.tips2, this.tips3];
            // 初始化动画
            this.lordAnimMng = new DDZLordAnim(this.lordAnim, this);
            this.fapaiHelper = new DDZFapaiHelper(this.cardOperation, this.contentGroup, this.fapaiBegin, 
                this.leftCard2, this.leftCard3, this);
        }

        protected onOpen() {
            super.onOpen();
            this.init();
            this.lordAnimMng.hide();
            if(game.DDZRule.IsDDZDebug) {
                this.testOperation.visible = true;
                this.testOperation.showMainCards(game.DDZRule.DEBUG_HAND_CARDS, false);
            } else {
                this.testOperation.visible = false;
                // this.testOperation.showMainCards([35,34,33,32,39,38,43,51], false);
            }
            this.farmerJiabeiGroup.visible = false;
            this.ddzGameMulti.showDefault();
            this.ddzGameMulti.visible = false;
            this.noBiggerImg.visible = false;
        }

        private onTest() {
           this.tableCard2.visible = true;
           this.tableCard2.showCards([35,34,33,32,39,38])
        }

        public onCheckFocus(event: egret.TouchEvent) {
            if (event.target != this.showMenuBtn) {
                this.showMenu(false);
            }
        }

        private tableCard: game.ddz.TableCard = new game.ddz.TableCard();
        private showMenuTrue() {
            this.showMenu(true);

            // this.tableCard.cardType = game.ddz.CardType.BOMB;
            // this.tableCard.cards.pop();
            // this.tableCards[1].showPlayCards(this.tableCard);
            // this.tableCards[2].showPlayCards(this.tableCard);
        }

        private showMenuFalse() {
            this.showMenu(false);
        }

        private showMenu(isshow: boolean) {
            this.menuGroup.visible = isshow;
            this.showMenuBtn.visible = !isshow;
            this.hideMenuBtn.visible = isshow;
        }

        private onRuleBtnClick(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DDZ);
        }

        private onTrusteeshipClick(): void {
            RoomRequest.trusteeship(ChildGameType.DDZ, true);
        }

        private onTrusteeshipCancelClick(): void {
            RoomRequest.trusteeship(ChildGameType.DDZ, false);
        }

        private onSettingBtnClick(): void {
            var settingPanel: DDZSetPanel = new DDZSetPanel();
            PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
        }

        private onBankBtnClick(): void {
            if (RoomManager.getInstance().curRoomData.gameLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DDZ);
        }

        private init(): void {
            this.tableCards = [this.tableCard1, this.tableCard2, this.tableCard3];
            this.tableCard1.bindBattleUI = this;
            this.tableCard2.bindBattleUI = this;
            this.tableCard3.bindBattleUI = this;
            this.tableCard1.touchEnabled = this.tableCard1.touchChildren = false;
            this.tableCard2.touchEnabled = this.tableCard2.touchChildren = false;
            this.tableCard3.touchEnabled = this.tableCard3.touchChildren = false;
            this.tableCard2.cardSortDir = CardSort.RIGHT;
            this.tableCard1.cardSortDir = CardSort.CENTER;
            this.cardOperation.cardSortDir = CardSort.CENTER;
            this.tableCard3.cardSortDir = CardSort.LEFT;
            this.tableCard2.init();
            this.tableCard3.init();
            this.jiaofen.visible = false;
            this.jiabei.visible = false;
            this.playCardBtnGroup.visible = false;
            this.cardRecord.visible = false;
            this.wait.visible = false;
            this.bottomCard.visible = false;
            this.dizhuFlagShow = false;
            // this.gameResultFlag.visible = false;
            this.leftCard2.visible = false;
            this.leftCard3.visible = false;
            this.trusteeshipGroup.visible = false;
            this.bottomCard.showBack();
            this.leftCard2.init(game.ddz.CardSort.RIGHT);
            this.leftCard3.init(game.ddz.CardSort.LEFT);
            this.hideAllClock();
            if (RoomManager.getInstance().curRoomData) {
                this.dizhuLabel.text = "底分：" + RoomManager.getInstance().curRoomData.bottomBet.toFixed(2);
            }
            this.gameRoomLabel.text = GameConst.getRoomLabel();

            this.showMenu(false);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public hideAllPlayerIcon(): void {
            for (let i = 0; i < 3; i++) {
                this.playerIcons[i].visible = false;
                this.playerIcons[i].playerInfo = null;
            }
        }

        public getPlayerIcon(pos: number): DDZPlayerIcon {
            return this.playerIcons[pos - 1];
        }

        public getPlayerIconByPlayerId(playerId: number): DDZPlayerIcon {
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
                    this.getPlayerIcon(players[i].postion).showPlayerInfo(players[i], game.ddz.DDZBattleData.getInstance().multi);
                }
            }
            this.refreshPlayerGroup();
        }

        public refreshMoney(): void {
            this.hideAllPlayerIcon();
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                this.getPlayerIcon(players[i].postion).showMoney(players[i]);
            }
            this.refreshGroupMoney();
        }

        public refreshGroupMoney(): void {
            this.hideAllPlayerGroup();
            this.refreshGroupMoney0();
        }

        private refreshGroupMoney0() {
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                this.playerIcons[i].visible = false;
                this.getPlayerGroup(players[i].postion).visible = this.dizhuFlagShow;
                this.getPlayerGroup(players[i].postion).name = players[i].playerId + '';
                if (players[i].postion - 1 == 0) {
                    this.playerName1.text = CommonUtil.limitName(players[i].nickName, 6);
                    if (game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId) != null) {
                        this.gold1.text = CommonUtil.fixMoneyFormat(game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId).money, 2, true);
                    }
                } else if (players[i].postion - 1 == 1) {
                    this.playerName2.text = CommonUtil.limitName(players[i].nickName, 6);
                    if (game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId) != null) {
                        this.gold2.text = CommonUtil.fixMoneyFormat(game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId).money, 2, true);
                    }
                } else if (players[i].postion - 1 == 2) {
                    this.playerName3.text = CommonUtil.limitName(players[i].nickName, 6);
                    if (game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId) != null) {
                        this.gold3.text = CommonUtil.fixMoneyFormat(game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId).money, 2, true);
                    }
                }
                this.playerVipLabelArr[players[i].postion - 1].text = players[i].vipLevel.toFixed(0);
            }
        }

        public hideAllPlayerGroup(): void {
            for (let i = 0; i < 3; i++) {
                this.playerGroups[i].visible = false;
                this.playerGroups[i].name = '';
            }
        }

        public getPlayerGroup(pos: number): eui.Group {
            return this.playerGroups[pos - 1];
        }

        public getPlayerGroupByPlayerId(playerId: number): eui.Group {
            for (let i = 0; i < this.playerGroups.length; i++) {
                if (this.playerGroups[i].name != null && this.playerGroups[i].name == playerId + '') {
                    return this.playerGroups[i];
                }
            }
            return null;
        }

        public refreshPlayerGroup(): void {
            this.hideAllPlayerGroup();
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                if (players[i].postion > 0) {
                    this.getPlayerGroup(players[i].postion).visible = this.dizhuFlagShow;
                    this.getPlayerGroup(players[i].postion).name = players[i].playerId + '';
                    this.hideLandlordHead();
                    let battlePlayer: game.ddz.DDZPlayerInfo = game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId);
                    let money: number = battlePlayer == null || battlePlayer.money == 0 ? players[i].money : battlePlayer.money;
                    if (players[i].postion - 1 == 0) {
                        this.playerName1.text = players[i].nickName;
                        this.gold1.text = CommonUtil.fixMoneyFormat(money, 2, true);
                    } else if (players[i].postion - 1 == 1) {
                        this.playerName2.text = players[i].nickName;
                        this.gold2.text = CommonUtil.fixMoneyFormat(money, 2, true);
                    } else if (players[i].postion - 1 == 2) {
                        this.playerName3.text = players[i].nickName;
                        this.gold3.text = CommonUtil.fixMoneyFormat(money, 2, true);
                    }
                    this.playerVipLabelArr[players[i].postion - 1].text = players[i].vipLevel.toFixed(0);
                }
            }
        }

        public refreshWait(): void {
            if (RoomManager.getInstance().curRoomData && RoomManager.getInstance().curRoomData.status == GameStatus.PREPARE) {
                this.wait.visible = true;
                this.checkWaitOrNextRound();
            } else {
                this.wait.visible = false;
            }
            if (!DDZBattleData.getInstance().hasData()) {
                this.wait.visible = true;
                this.checkWaitOrNextRound();
            }
        }

        private checkWaitOrNextRound() {
            if(RoomManager.getInstance().curRoomData && RoomManager.getInstance().curRoomData.playerInfos.length < 3) {
                this.waitAnim.visible = true;
                this.waitNexrRoundAnim.visible = false;
            } else {
                this.waitAnim.visible = false;
                this.waitNexrRoundAnim.visible = true;
            }
        }

        public refreshBattleInfo(isStart:boolean = false): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.selfHandCards != null && battleData.selfHandCards.length > 0) {
                // 显示自己的牌型
                this.cardOperation.visible = true;
                this.tips1.clear();
                this.cardOperation.showMainCards(battleData.selfHandCards, isStart);
                if(isStart) {
                    // 播放发牌动画
                    this.fapaiHelper.playFapai(battleData.selfHandCards);
                }
            }
            if (battleData.battleStatus != game.ddz.DDZStatus.PREPARE) {
                this.wait.visible = false;
                this.bottomCard.visible = true;
                this.ddzGameMulti.visible = true;
                this.refreshJiaofenStatus();
                this.refreshJiabeiStatus();
                this.refreshFightStatus();
                this.showTableCards();
                this.showTotalMulti();
            } else {
                this.bottomCard.visible = false;
                this.ddzGameMulti.visible = false;

            }
        }

        public forceResetMulti() {
            this.ddzGameMulti.showDefault();
            DDZRequest.reqMultiInfo();
        }

        public hideAllClock(): void {
            this.clock2.visible = false;
            this.clock3.visible = false;
        }

        public getClock(playerId: number): DDZClock {
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId)
            if(!playerInfo) return;
            let pos: number = playerInfo.postion;
            console.log('Clockpos === ', pos);
            if (pos == 2) {
                return this.clock2;
            } else if (pos == 3) {
                return this.clock3;
            }
            return null;
        }

        public refreshJiaofenStatus(): void {
            this.hideAllClock();
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.battleStatus == game.ddz.DDZStatus.JIAOFEN) {
                if (UserService.instance.playerId == battleData.getJiaofenPlayer().playerId) {
                    if(this.fapaiHelper.isRunning) {
                        this.fapaiHelper.addFapaiComplete(()=>{
                            this.jiaofen.show(battleData.curSocre);
                        }, this);
                    } else {
                        this.jiaofen.show(battleData.curSocre);
                    }
                } else {
                    this.jiaofen.hide();
                    let clock: DDZClock = this.getClock(battleData.getJiaofenPlayer().playerId);
                    if (clock != null) {
                        clock.startClock(game.ddz.DDZBattleData.getInstance().clientSimulateDownTime);
                    }
                }
            } else {
                this.jiaofen.hide();
            }
        }

        public refreshJiabeiStatus(): void {
            this.refreshBottomCards();
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.battleStatus == game.ddz.DDZStatus.JIABEI) {
                for (let player of RoomManager.getInstance().curRoomData.playerInfos) {
                    if (battleData.isFarmer(player.playerId) && player.playerId != UserService.instance.playerId) {
                        let clock: DDZClock = this.getClock(player.playerId);
                        if (clock != null) {
                            clock.startClock(game.ddz.DDZBattleData.getInstance().clientSimulateDownTime);
                        }
                    }
                }
                // 判断自己是否是农民
                if (battleData.isFarmer(UserService.instance.playerId)) {
                    if (battleData.getPlayer(UserService.instance.playerId).status == game.ddz.DDZPlayerStatus.JIABEI_COMPLETE) {
                        this.jiabei.visible = false;
                    } else {
                        this.jiabei.show();
                    }
                    this.farmerJiabeiGroup.visible = false;
                } else {
                    this.farmerJiabeiGroup.visible = true;
                }
            } else {
                this.jiabei.visible = false;
            }

            if (battleData.landlordId > 0) {
                if (this.dizhuFlagShow) return;
                this.dizhuFlagShow = true;
                this.clearAllOperTip();
                this.hideAllPlayerIcon();
                this.refreshPlayerGroup();
                let target:egret.DisplayObject;
                if (battleData.landlordId + '' == this.playerGroup1.name) {
                    target = this.lordMaozi1;
                }
                if (battleData.landlordId + '' == this.playerGroup2.name) {
                    target = this.lordMaozi2;
                }
                if (battleData.landlordId + '' == this.playerGroup3.name) {
                    target = this.lordMaozi3;
                }
                this.lordAnimMng.playAnim(target, null, null);
                this.setTimeOut( this.showAnim, 900);
            }
        }

        public showAnim() {
            let battleData = game.ddz.DDZBattleData.getInstance();
            for(let i=1;i<=3;i++) {
                if(this["playerGroup" + i].name == battleData.landlordId.toFixed(0)) {
                    this["role" + i].setRole(DDZPlayerRole.LANDLORD)
                } else {
                    this["role" + i].setRole(DDZPlayerRole.FARMER)
                }
                this["role" + i].visible = true;
            }
        }

        public refreshFightStatus(reason:DDZRefreshReason = DDZRefreshReason.NONE): void {
            this.refreshBottomCards();
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.battleStatus == game.ddz.DDZStatus.FIGHT) {
                // 进入战斗状态 所有的加倍和叫分显示取消
                this.clearJiabeiOrJiaofen();
                if (battleData.getPlayer(UserService.instance.playerId).isTrusteeship) {
                    this.trusteeshipGroup.visible = true;
                    this.trusteeshipBtn.visible = false;
                    this.playCardBtnGroup.visible = false;
                    this.noBiggerImg.visible = false;
                } else {
                    this.trusteeshipGroup.visible = false;
                    this.trusteeshipBtn.visible = true;
                    this.noBiggerImg.visible = false;
                }
                if(reason != DDZRefreshReason.REFRESH_ON_CHANGE_TRUSTEESHIP) {
                    this.hideAllClock();
                }
                if (battleData.curPlayPlayerId == UserService.instance.playerId) {
                    if (!battleData.getPlayer(UserService.instance.playerId).isTrusteeship) {
                        this.playCardBtnGroup.visible = true;
                        this.farmerJiabeiGroup.visible = false;
                        // 轮到自己出手
                        if (battleData.tableCard == null || battleData.tableCard.playerId == 0) {
                            this.playCardBtnGroup.showFirst();
                        } else {
                            let showBigger = this.playCardBtnGroup.showNormal(battleData.tableCard.playerId);
                            if(showBigger) {
                                this.noBiggerImg.visible = true;
                            } else {
                                this.noBiggerImg.visible = false;
                            }
                            let operTip = this.getOperTip(UserService.instance.playerId)
                            if(operTip) operTip.clear();
                        }
                    } else {
                        let operTip = this.getOperTip(UserService.instance.playerId);
                        if(operTip) operTip.clear();
                        this.noBiggerImg.visible = false;
                    }
                } else {
                    if(reason != DDZRefreshReason.REFRESH_ON_CHANGE_TRUSTEESHIP) {
                        let clock: DDZClock = this.getClock(battleData.curPlayPlayerId);
                        if (clock != null) {
                            clock.startClock(battleData.clientSimulateDownTime);
                        }
                    }
                    let operTip = this.getOperTip(battleData.curPlayPlayerId)
                    if(operTip) operTip.clear();
                    this.playCardBtnGroup.visible = false;
                    this.noBiggerImg.visible = false;
                }
                this.cardRecord.visible = true;
                this.cardRecord.refresh(battleData.cardHolder);
            } else {
                this.trusteeshipBtn.visible = false;
                this.noBiggerImg.visible = false;
            }
        }

        private refreshTrusteeshipBtn() {
            let battleData = game.ddz.DDZBattleData.getInstance();
            let player = battleData.getPlayer(UserService.instance.playerId);
            if(player && !player.isTrusteeship) {
                this.trusteeshipBtn.visible = true;
            }
        }

        public playCard(): void {
            let cards: Array<number> = this.cardOperation.getSelectCards();
            if (cards.length == 0) {
                TipsUtils.showTipsFromCenter("请选择要出的牌");
                return;
            }
            DDZRequest.playStep(false, cards);
        }

        public removePlayCards(): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.tableCard != null && battleData.tableCard.playerId == UserService.instance.playerId) {
                this.cardOperation.removeCards(battleData.tableCard.cards);
            }
        }

        public refreshMultiDetail() {
            this.ddzGameMulti.showDetail(DDZBattleData.getInstance().curDetailMulti);
        }

        public othersPlay() {
            let battleData = game.ddz.DDZBattleData.getInstance();
            let delay:number = 0;
            if (battleData.tableCard != null && battleData.tableCard.playerId > 0) {
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(battleData.tableCard.playerId).postion - 1;
                delay = this.tableCards[pos].showPlayCards(battleData.tableCard);
                if (battleData.tableCard.cardType == game.ddz.CardType.MANY_DUAD ||
                    battleData.tableCard.cardType == game.ddz.CardType.BOMB ||
                    battleData.tableCard.cardType == game.ddz.CardType.PLANE ||
                    battleData.tableCard.cardType == game.ddz.CardType.SHUN_ZI ||
                    battleData.tableCard.cardType == game.ddz.CardType.KING_BOMB ||
                    battleData.tableCard.cardType == game.ddz.CardType.BOMB) {
                    if (this.playerAnims && this.playerAnims[pos]) {
                        this.playerAnims[pos].playAction(RoleAction.SKILL)
                    }
                } else {
                    if (this.playerAnims && this.playerAnims[pos]){
                        this.playerAnims[pos].playAction(RoleAction.ATTACK)
                    }
                }

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
                    // DDZBattleData.getInstance().downTime -= delay / 1000;
                    this.setTimeOut(this.refreshFightStatus, delay);
                } else {
                    this.refreshFightStatus();
                }
            }
        }

        public showTableCards(): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.tableCard != null && battleData.tableCard.playerId > 0) {
                let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(battleData.tableCard.playerId).postion - 1;
                this.tableCards[pos].showPlayCards(battleData.tableCard);

                if (battleData.tableCard.cardType == game.ddz.CardType.MANY_DUAD ||
                    battleData.tableCard.cardType == game.ddz.CardType.BOMB ||
                    battleData.tableCard.cardType == game.ddz.CardType.PLANE ||
                    battleData.tableCard.cardType == game.ddz.CardType.SHUN_ZI ||
                    battleData.tableCard.cardType == game.ddz.CardType.KING_BOMB ||
                    battleData.tableCard.cardType == game.ddz.CardType.BOMB) {
                    if (this.playerAnims && this.playerAnims[pos]) {
                        this.playerAnims[pos].playAction(RoleAction.SKILL)
                    }
                } else {
                    if (this.playerAnims && this.playerAnims[pos]){
                        this.playerAnims[pos].playAction(RoleAction.ATTACK)
                    }
                }

                for (let i = 0; i < this.tableCards.length; i++) {
                    if (i != pos) {
                        this.tableCards[i].clearAll();
                    }
                }
            }
        }

        public refreshBottomCards(): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (battleData.battleStatus == game.ddz.DDZStatus.PREPARE || battleData.battleStatus == game.ddz.DDZStatus.JIAOFEN) {
                this.bottomCard.showBack();
                this.bottomCard.visible = false;
                return;
            }
            if (battleData.bottomCards && battleData.bottomCards.length > 0) {
                this.bottomCard.visible = true;
                this.bottomCard.showBottomCard(battleData.bottomCards);
            } else {
                this.bottomCard.visible = false;
            }
        }

        public getOperTip(playerId: number): DDZOperTip {
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
            if(!playerInfo) return;
            let pos: number = playerInfo.postion;
            console.log('Tippos === ', pos);

            if (pos == 1) {
                return this.tips1;
            }
            if (pos == 2) {
                return this.tips2;
            }
            if (pos == 3) {
                return this.tips3;
            }
            return null;
        }

        public clearAllOperTip(): void {
            this.tips2.clear();
            this.tips3.clear();
            this.tips1.clear();
        }

        public showScoreTips(playerId: number, score: number): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            let operTip = this.getOperTip(playerId);
            if(operTip) {
                operTip.showScoreTip(score);
                this.setTimeOut(()=>{
                    operTip.clear();
                },1000);
            }
            
            console.log('showScoreTips === ', score);
        }

        public showMultiTips(playerId: number, multi: number): void {
            let battleData = game.ddz.DDZBattleData.getInstance();
            if (this.showResult || battleData.getPlayer(UserService.instance.playerId).isTrusteeship) return;
            console.log("MultiTip === ", multi);
            let operTip = this.getOperTip(playerId);
            if(operTip) {
                operTip.showMultiTip(multi);
            }
        }

        public showDonotTip(playerId: number): void {
            if (this.showResult) return;
            console.log("DonotTip === ");
            let operTips = this.getOperTip(playerId);
            if(operTips) operTips.showDonot();
        }

        public refrehHandCards(isPushBottm: any): void {
            if (!isPushBottm) {
                this.cardOperation.showCards(game.ddz.DDZBattleData.getInstance().selfHandCards);
            } else {
                this.setTimeOut(()=>{
                    this.cardOperation.showCardsWithAdd(game.ddz.DDZBattleData.getInstance().bottomCards);
                }, 1500);
            }
        }

        public onSendCardError() {
            TipsUtils.showTipsFromCenter("选取牌型不符合规则");
        }

        public selfPlayCards():void {
            // 清除提示的选中牌
            // this.cardOperation.clearAllChoose();
            DDZBattleData.getInstance().clearLastTip();
            let battleData = DDZBattleData.getInstance();
            this.cardOperation.flyCard(this.tableCard1, battleData.tableCard.cards);
            if (battleData.tableCard.cardType == game.ddz.CardType.MANY_DUAD ||
                battleData.tableCard.cardType == game.ddz.CardType.BOMB ||
                battleData.tableCard.cardType == game.ddz.CardType.PLANE ||
                battleData.tableCard.cardType == game.ddz.CardType.SHUN_ZI ||
                battleData.tableCard.cardType == game.ddz.CardType.KING_BOMB ||
                battleData.tableCard.cardType == game.ddz.CardType.BOMB) {
                    this.role1.playAction(RoleAction.SKILL)
                    DDZTableCards.cacheDelay = 2800;
            } else {
                this.role1.playAction(RoleAction.ATTACK)
            }
            // 其他两家 不显示
            this.tableCard2.clearAll();
            this.tableCard3.clearAll();
        }

        public battleEnds() {
            this.playCardBtnGroup.visible = false;
            this.noBiggerImg.visible = false;
            game.ddz.DDZBattleData.getInstance().getPlayer(UserService.instance.playerId).isTrusteeship = false;
            this.trusteeshipGroup.visible = false;
            this.trusteeshipBtn.visible = false;
            this.clearAllOperTip();
            this.setTimeOut(()=>{
                this.hideAllClock();
                this.lordAnimMng.hide();
                this.leftCard2.visible = false
                this.leftCard3.visible = false
                this.trusteeshipGroup.visible = false;
                let battleData: game.ddz.DDZBattleData = game.ddz.DDZBattleData.getInstance();
                battleData.getPlayer(UserService.instance.playerId).isTrusteeship = false;
                this.dizhuFlagShow = false;

                // 显示所有人的手里剩余的牌
                let battleFinishData: game.ddz.BattleFinishInfo = battleData.finishData;
                for (let playerFinishInfo of battleFinishData.playerInfos) {
                    let pfi: game.ddz.BattlePlayerInfo = playerFinishInfo;
                    let pos: number = RoomManager.getInstance().curRoomData.getPlayerInfo(pfi.playerId).postion - 1;
                    this.tableCards[pos].showCardsOnEnd(pfi.handCards);
                }
                // 这个时候自己的牌肯定是要清理掉了
                this.cardOperation.clearAll();
                for(let role of this.playerAnims) {
                    if(role.curRole == game.ddz.DDZPlayerRole.FARMER) {
                        if(battleFinishData.isWin) {
                            // 给我哭
                            role.playAction(game.ddz.RoleAction.LOSE);
                        } else {
                            role.playAction(game.ddz.RoleAction.WIN);
                        }
                    } else {
                        if(battleFinishData.isWin) {
                            role.playAction(game.ddz.RoleAction.WIN);
                        } else {
                            role.playAction(game.ddz.RoleAction.LOSE);
                        }
                    }
                    //5s 之后人物隐藏
                    this.setTimeOut(()=>{
                        role.visible = false;
                        role.stop();
                    }, 5000);
                }
            }, DDZTableCards.cacheDelay + 500);
            egret.log("============================ delay show : " + DDZTableCards.cacheDelay + 500)
            this.setTimeOut(this.battleEnd, DDZTableCards.cacheDelay + 500);
        }

        public battleEnd(): void {
            let battleFinishData: game.ddz.BattleFinishInfo = game.ddz.DDZBattleData.getInstance().finishData;
            this.cardOperation.visible = false;
            this.clearAllOperTip();
            this.hideAllClock();
            this.noBiggerImg.visible = false;
            this.setTimeOut(()=>{
                this.ddzGameMulti.showDefault();
                this.ddzGameMulti.visible = false;
            }, 3500);

            if (battleFinishData.multiInfo.spring > 0) {
                // 显示春天动画
                this.showSpringMc();
                this.setTimeOut(this.showBattleEnd, 3500);
            } else {
                this.setTimeOut(this.showBattleEnd, 500);
            }
        }

        private showBattleEnd(): void {
            let battleData: game.ddz.DDZBattleData = game.ddz.DDZBattleData.getInstance();
            let battleFinishData: game.ddz.BattleFinishInfo = battleData.finishData;
            this.bottomCard.showBack();
            this.bottomCard.visible = false;
            game.ddz.DDZSoundPlayer.instance.playEndBg();
            this.showResult = true;
            this.ddzBattleResult = new DDZBattleResult();
            PopUpManager.addPopUp(this.ddzBattleResult, true);
            this.cardOperation.visible = false;
            this.playCardBtnGroup.visible = false;
            this.noBiggerImg.visible = false;
        }

        public showTipsCard(): void {
            let battleData: game.ddz.DDZBattleData = game.ddz.DDZBattleData.getInstance();
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

        public showTotalMulti(): void {
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                if (players[i].playerId == UserService.instance.playerId) {
                    let playerInfoIcon = this.getPlayerIcon(players[i].postion);
                    if (!playerInfoIcon) {
                        console.log("playerInfoIcon not found : " + players[i].postion);
                    } else {
                        this.getPlayerIcon(players[i].postion).showPlayerInfo(players[i], game.ddz.DDZBattleData.getInstance().multi);
                        this.getPlayerIcon(players[i].postion).visible = !this.dizhuFlagShow;
                    }
                }
            }
        }

        public showLeftCards(playerId: any): void {
            let players: game.ddz.DDZPlayerInfo[] = game.ddz.DDZBattleData.getInstance().ddzPlayerInfos;
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
                this.refreshFightStatus(DDZRefreshReason.REFRESH_ON_CHANGE_TRUSTEESHIP);
            } else {
                //let playerIcon: DDZPlayerIcon = this.getPlayerIconByPlayerId(playerId);
                //if (playerIcon) {
                //    playerIcon.showPlayerInfo(RoomManager.getInstance().curRoomData.getPlayerInfo(playerId), 0);
                //    playerIcon.visible = !this.dizhuFlagShow;
                //}
            }
        }

        private onBackBtnClick(): void {
            if(RoomManager.getInstance().curRoomData.gameLevel == 0) {
                // 体验场
                RoomRequest.leaveRoom(ChildGameType.DDZ);
            } else {
                if(DDZBattleData.getInstance().battleStatus == DDZStatus.PREPARE) {
                    RoomRequest.leaveRoom(ChildGameType.DDZ);
                } else {
                    TipsUtils.showTipsFromCenter("当前游戏阶段无法退出游戏");
                }
            }
        }

        public onJiabeiComplete(): void {
            this.tips2.clear();
            this.tips3.clear();
        }

        public clearBattle(): void {
            this.init();
            this.farmerJiabeiGroup.visible = false;
            this.trusteeshipBtn.visible = false;
            game.ddz.DDZSoundPlayer.instance.playBg()
            CommonUtil.removeTimeout(this);
            game.ddz.DDZBattleData.getInstance().clearData();
            this.cardOperation.clearAll();
            this.playCardBtnGroup.init();
            this.tableCard1.clearAll();
            this.tableCard2.clearAll();
            this.tableCard3.clearAll();
            this.bottomCard.showBack();
            this.leftCard2.clearFlag();
            this.leftCard3.clearFlag();
            for(let playerGroup of this.playerGroups) {
                playerGroup.visible = false;
            }
            this.hideAllPlayerGroup();
            this.cardRecord.visible = false;
            this.clearAllOperTip();

            if (this.ddzBattleResult && this.ddzBattleResult.stage) {
                PopUpManager.removePopUp(this.ddzBattleResult);
            }

            if (RoomManager.getInstance().curRoomData) {
                for (let playerHead of this.playerIcons) {
                    if (playerHead.playerInfo != null && playerHead.playerInfo.playerId > 0) {
                        let p = RoomManager.getInstance().curRoomData.getPlayerInfo(playerHead.playerInfo.playerId);
                        if (p == null) {
                            playerHead.playerInfo = null;
                            playerHead.visible = false;
                        } else {
                            playerHead.showPlayerInfo(p, 0);
                        }
                    }
                }
            }

            this.refreshBattleInfo();
            this.refreshWait();
            this.hideLandlordHead();
            this.lordAnimMng.hide();
        }

        public clearAllChoose(): void {
            this.cardOperation.clearAllChoose();
        }

        public clearJiabeiOrJiaofen() {
            this.tips1.clearMultiOrScore();
            this.tips2.clearMultiOrScore();
            this.tips3.clearMultiOrScore();
        }

        public clearBattleWithoutCards(): void {
            this.init();
            game.ddz.DDZSoundPlayer.instance.playBg()
            CommonUtil.removeTimeout(this);
            game.ddz.DDZBattleData.getInstance().clearData();
            this.cardOperation.clearAll();
            this.playCardBtnGroup.init();
            this.bottomCard.showBack();
            this.leftCard2.clearFlag();
            this.leftCard3.clearFlag();
            this.hideAllPlayerGroup();
            this.cardRecord.visible = false;
            this.dizhuFlagShow = false;
            this.showResult = false;
            this.clearAllOperTip();

            if (this.ddzBattleResult && this.ddzBattleResult.stage) {
                PopUpManager.removePopUp(this.ddzBattleResult);
            }

            for (let playerHead of this.playerIcons) {
                if (playerHead.playerInfo != null && playerHead.playerInfo.playerId > 0) {
                    let p = RoomManager.getInstance().curRoomData.getPlayerInfo(playerHead.playerInfo.playerId);
                    if (p == null) {
                        playerHead.playerInfo = null;
                        playerHead.visible = false;
                    } else {
                        playerHead.showPlayerInfo(p, 0);
                    }
                }
            }
            this.refreshBattleInfo();
            this.refreshWait();
            this.hideLandlordHead();
            // 重置卡通动画
            for(let anim of this.playerAnims) {
                anim.stop();
                anim.visible = false;
            }
        }

        public showSpringMc(): void {
            this.springAnim = new game.CommonDB("ddzchutian_ske_dbbin", "ddzchutian_tex_json", "ddzchutian_tex_png", "animation", 3500);
            this.addChild(this.springAnim);
            this.springAnim.x = this.width / 2;
            this.springAnim.y = this.height / 2;
        }

        public showGameResultFlag(texture = "ddzwin", anim = "dizhu"): void {
            this.gameResultFlag = new game.CommonDB(texture + "_ske_dbbin", texture + "_tex_json", texture + "_tex_png", anim, 2000);
            this.addChild(this.gameResultFlag);
            this.gameResultFlag.x = this.width / 2;
            this.gameResultFlag.y = this.height / 2;
        }

        public hideLandlordHead() {
            this.lordMaozi1.visible = false;
            this.lordMaozi2.visible = false;
            this.lordMaozi3.visible = false;
        }

        public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
            let player = DDZBattleData.getInstance().getPlayer(UserService.instance.playerId);
            if(player) {
                player.money = totalmoney;
            }
            RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId).money = totalmoney;
            let players: Array<PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            for (let i = 0; i < players.length; i++) {
                let icon = this.getPlayerIcon(players[i].postion);
                let v = icon.visible;
                icon.showMoney(players[i]);
                icon.visible = v;
            }
            for (let i = 0; i < players.length; i++) {
                let p = game.ddz.DDZBattleData.getInstance().getPlayer(players[i].playerId);
                if (players[i].postion - 1 == 0) {
                    if (p) {
                        this.gold1.text = CommonUtil.fixMoneyFormat(p.money, 2, true);
                    }
                } else if (players[i].postion - 1 == 1) {
                    if (p) {
                        this.gold2.text = CommonUtil.fixMoneyFormat(p.money, 2, true);
                    }
                } else if (players[i].postion - 1 == 2) {
                    if (p) {
                        this.gold3.text = CommonUtil.fixMoneyFormat(p.money, 2, true);
                    }
                }
            }
		}
    }
}