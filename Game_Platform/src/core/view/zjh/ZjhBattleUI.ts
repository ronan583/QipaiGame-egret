module game {
    export class ZjhBattleUI extends GameScene {

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/zjhRoom/ZjhBattle.exml";
            this.gameType = ChildGameType.ZJH;
        }

        public ladyAnim: DragonAnim;
        public dealPos: egret.DisplayObject;
        public foldFlyPos: egret.DisplayObject;
        public goldArea: eui.Group;
        private zjhbipai: ZJHBipai;
        public contentGroup: eui.Group;


        public player1: HeadIcon;
        public player2: HeadIcon;
        public player3: HeadIcon;
        public player4: HeadIcon;
        public player5: HeadIcon;
        public playerHeadArr: HeadIcon[];

        private bankerImg0: eui.Image;
        private bankerImg1: eui.Image;
        private bankerImg2: eui.Image;
        private bankerImg3: eui.Image;
        private bankerImg4: eui.Image;
        private bankerImgArr: eui.Image[];

        private playerWinPoint0: eui.Image;
        private playerWinPoint1: eui.Image;
        private playerWinPoint2: eui.Image;
        private playerWinPoint3: eui.Image;
        private playerWinPoint4: eui.Image;
        private playerWinPointArr: eui.Image[];

        public cardLayer: eui.Group;
        public playerCard2: ZJHCardGroup;
        public playerCard3: ZJHCardGroup;
        public playerCard4: ZJHCardGroup;
        public playerCard5: ZJHCardGroup;
        public playerCardArr: ZJHCardGroup[];


        public gameStartCountDown: eui.Group;
        private waitAnim: DragonAnim;
        public gameCountDown: eui.BitmapLabel;


        public gameStartWait: eui.Group;
        public waitForOtherPlayer: eui.Image;
        public waitNextStart: eui.Image;


        public gameRunning: eui.Group;
        public playerCost1: PlayerGoldShow;
        public playerCost2: PlayerGoldShow;
        public playerCost3: PlayerGoldShow;
        public playerCost4: PlayerGoldShow;
        public playerCost5: PlayerGoldShow;
        public playerCostArr: PlayerGoldShow[];
        private pkSelectImg: eui.Image;
        private pkSelectImgbg: eui.Image;
        public playerCard1: ZJHCardGroup;

        private brightCardBtn: IButton;

        public totalBetLabel: eui.Label;


        public operationBtnGroup: ZJHOperatioBtnGroup;

        private allinBoundsAnim: DragonAnim;

        public settingBtn: eui.Button;
        private helpBtn: eui.Button;


        // private waitAnim:CommonDBLoop2;
        private menuContent: eui.Group;
        public backBtn: eui.Button;
        private bankBtn: eui.Button;
        private zjBtn: eui.Button;
        private menuArrowImg: eui.Image;
        private menuGroup: MenuGroup;
        private roomLevelLabel: eui.BitmapLabel;
        private gameRoundLabel: eui.BitmapLabel;

        private youwinAnim: DragonAnim;
        private baoziAnim: DragonAnim;
        private playerWinAnim: DragonAnim;


        private startWait: game.zjh.ZjhStartWait;
        private prevHeadIcon: HeadIcon;

        public coinsArr: Array<Coin> = new Array<Coin>();
        private battleStartCountDown: zjh.ZJHBattleStartCountDown;
        public waitDot1: eui.Image;
        public waitDot2: eui.Image;
        public waitDot3: eui.Image;

        private headGroup: eui.Group;
        private bipaiGroup: eui.Group;

        private isPk: boolean = false;
        private pkCompleteFuncArr: Array<any> = [];


        public testBtn: eui.Button;
        private onTestBtnClick(e: egret.TouchEvent): void {
            //this.showCardTween();
            // this.playerHeads[0].showClock(100);
            // this.showOperationDownTime();
            // this.playerHeads[0].showWin(10);
            // this.playerHeadArr[0].showCards([21, 21, 21], 2);

            for (let head of this.playerHeadArr) {
                    head.showCompare(true);
                }
                this.showPkSelect();
        }

        private refreshRoomLevel() {
            let roomData: RoomData = RoomManager.getInstance().curRoomData;
            let text = "";
            if (roomData.gameLevel == 0) {
                text += "体验场 底注:" + (roomData.bottomBet).toFixed(0);
            } else if (roomData.gameLevel == 1) {
                text += "初级场 底注:" + (roomData.bottomBet).toFixed(0);
            } else if (roomData.gameLevel == 2) {
                text += "中级场 底注:" + (roomData.bottomBet).toFixed(0);
            } else if (roomData.gameLevel == 3) {
                text += "高级场 底注:" + (roomData.bottomBet).toFixed(0);
            }
            this.roomLevelLabel.text = text;
        }

        public refreshTotalBet() {
            this.totalBetLabel.text = ZJHData.getInstance().totalBet.toFixed(0);
        }

        public refreshGameRound() {
            let text = "";
            if (ZJHData.getInstance()) {
                let round = ZJHData.getInstance().currentRound;
                if (round < 1) {
                    round = 0;
                }
                text = " 第" + round + "/" + ZJHData.getInstance().totalRound + "轮";
            }
            this.gameRoundLabel.text = text;
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }
        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if (partName == "testBtn") {
                instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtnClick, this);
            }
        }

        protected componentInit(): void {
            this.playerCardArr = [this.playerCard1, this.playerCard2, this.playerCard3, this.playerCard4, this.playerCard5];
            this.playerHeadArr = [this.player1, this.player2, this.player3, this.player4, this.player5];
            this.playerCostArr = [this.playerCost1, this.playerCost2, this.playerCost3, this.playerCost4, this.playerCost5];
            this.bankerImgArr = [this.bankerImg0, this.bankerImg1, this.bankerImg2, this.bankerImg3, this.bankerImg4];
            this.playerWinPointArr = [this.playerWinPoint0, this.playerWinPoint1, this.playerWinPoint2, this.playerWinPoint3, this.playerWinPoint4];
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtnClick, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankClick, this);
            this.brightCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBrightCard, this);
            // this.zjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjClick, this);
            this.battleStartCountDown = new zjh.ZJHBattleStartCountDown();
            this.battleStartCountDown.countDownLabel = this.gameCountDown;
            this.battleStartCountDown.waitAnim = this.waitAnim;
            this.startWait = new game.zjh.ZjhStartWait(
                this.waitForOtherPlayer,
                this.waitNextStart,
                this.waitDot1,
                this.waitDot2,
                this.waitDot3
            );
            this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "zjh_btn_down", "zjh_btn_up");
            this.zjhbipai.addCompleteCall(this.pkanimComplete, this);
            this.callAfterUIInit("ShowRoomPlayerInfo");
        }

        protected onOpen() {
            this.menuGroup.showDefault();
            this.init();
            this.updateScene();
            this.refreshRoomStatus();
            this.isPk = false;
            this.hidePkSelect();
        }

        public init(): void {
            for (let i = 0; i < this.playerHeadArr.length; i++) {
                this.playerHeadArr[i].visible = false;
                this.playerCardArr[i].visible = false;
            }
            // todo close each playerhead's pk ui
            this.closeCompareChoose();
            this.hidePkSelect();
            this.zjhbipai.visible = false;
            this.showBrightBtn(false);
            this.gameStartCountDown.visible = false;
            this.startWait.hideAll();
            // this.totalBetLabel.text = RoomManager.getInstance().curRoomData.bottomBet.toFixed(0);
        }

        public updateScene() {
            this.refreshRoomLevel();
            this.refreshGameRound();

            this.totalBetLabel.text = "0";
            let roomData = RoomManager.getInstance().curRoomData;
            if (roomData == null) {
                return;
            }
            if (game.zjh.ZJHData.getInstance().totalBet) {
                this.totalBetLabel.text = CommonUtil.fixMoneyFormat(game.zjh.ZJHData.getInstance().totalBet);
            }
            console.log("---------UPDATESCENE room status ", roomData.status);
            if (roomData.status != GameStatus.RUNNING) {
                if (roomData.downTime > 0) {
                    // 正在倒计时进入游戏
                    this.battleStartCountDown.startCountDown(roomData.downTime);
                    this.startWait.hideAll();
                    this.gameStartCountDown.visible = true;
                    this.gameStartCountDown.x = 417;
                    this.ii++;
                } else {
                    // 人数还没有到达最低人数 无法开始游戏
                    this.gameStartWait.visible = true;
                    this.startWait.showWaitOtherPlayer();
                    this.gameStartCountDown.visible = false;

                    this.battleStartCountDown.stop();
                }

            }
        }
        /**
         * message OPEnterRoomRet{
            required int32 gameType = 1;//游戏类型
            required int32 gameLevel = 2;//房间等级 初 中 高  
            required int32 status = 3;//房间状态
            repeated OPPlayerInfo playerInfo = 4;//玩家信息
            required int32 downTime = 5;//开始游戏倒计时 -1 未达到标准
            optional int64 bottomBet = 6;//底注
            optional int64 enterMinMoney = 7;//进入房间最低金额限制
            optional int32 onlineCount = 8;//在线人数
            optional int32 roomId = 9;//房间id
        }
         */
        private ii = 0;
        public ShowRoomPlayerInfo(): void {
            let roomData = RoomManager.getInstance().curRoomData;
            if (roomData == null) {
                return;
            }
            this.refreshGameRound();
            console.log("---------UPDATESCENE room status ", roomData.status);
            if (roomData.status == GameStatus.PREPARE) {
                this.clearBattle();
                if (roomData.downTime > 0) {
                    // 正在倒计时进入游戏
                    this.battleStartCountDown.startCountDown(roomData.downTime);
                    // this.startWait.hideAll();
                    this.startWait.hideAll();
                    this.gameStartCountDown.visible = true;
                    this.gameStartCountDown.x = 417;

                    this.ii++;
                } else {
                    // 人数还没有到达最低人数 无法开始游戏
                    this.gameStartWait.visible = true;
                    this.startWait.showWaitOtherPlayer();
                    this.gameStartCountDown.visible = false;

                    this.battleStartCountDown.stop();
                }

                this.operationBtnGroup.visible = false;
                this.gameRunning.visible = false;

                this.totalBetLabel.text = "0";
            } else {
                for (let goldShow of this.playerCostArr) {
                    goldShow.visible = false;
                }
                this.startWait.showWaitNextStart();
            }
            for (let i = 0; i < 5; i++) {
                this.playerHeadArr[i].visible = false;
            }
            for (let i = 0; i < roomData.playerInfos.length; i++) {
                let playerInfo: PlayerInfo = roomData.playerInfos[i];
                let pos = playerInfo.postion;
                let headIcon = this.getHeadIconByPos(pos);
                headIcon.visible = true;
                headIcon.ShowPlayerHead(playerInfo);
                headIcon.showGrey(true);
                let zjhplayer = game.zjh.ZJHData.getInstance().getPlayerById(playerInfo.playerId);
                if (zjhplayer == null) {
                    // 这个人刚进来
                    console.error("----------just in");
                    headIcon.ShowWait(true);
                    headIcon.hideTips();
                    headIcon.showGrey(true);
                } else {
                    console.error("----------already in", zjhplayer);
                    if (zjhplayer.isBanker) {
                        // this.showBanker(pos);
                    }
                    headIcon.showGrey(false);
                }
            }

            this.showBrightBtn(false);
        }
        /**
         *  message OPThreeBattle {
                required int64 playerId = 1;//玩家id
                required int32 status = 2;//玩家状态 1.暗牌 2.看牌 3.弃牌 4.失败
                required int64 costMoney = 3;//已消耗钱
                required int64 totalMoney = 4;//总金额
                required bool isPay = 5;//是否能出牌
                required bool isBanker = 6;//是否是庄家
                required bool isAlways = 7;//跟到底
                repeated int32 cards =8;//自己的牌 如果看牌了才有值
                required int32 cardType = 9;//类型0.散牌 1.对子 2.顺子 3.同花 4.同花顺 5.豹子 -1没看牌
                repeated int64 betsRecord =10;//自己下注记录 只有重连给数据
           }
         * 
         */
        public onStartGame(): void {
            RoomManager.getInstance().curRoomData.status = game.GameStatus.RUNNING;
            console.log("zjh battle start");
            //this.ClearBattle();
            // this.showZJhInfo(true);
            this.showDefaultCoin();
            // this.gameStartCountDown.visible = false;
            this.refreshRoomStatus();
            this.onBattleStart();
            let selfPlayer = ZJHData.getInstance().getPlayerById(UserService.instance.playerId);
            // CommonUtil.registerTimeOut(()=>{

            // }, this, 1000);
        }

        public onBattleStart(): void {
            let zjhData: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            if (!game.zjh.ZJHData.getInstance().zjhPlayers || game.zjh.ZJHData.getInstance().zjhPlayers.length == 0) {
                return;
            }
            this.gameStartCountDown.visible = false;
            this.startWait.hideAll();
            console.log("onBattleStart");
            this.totalBetLabel.text = zjhData.totalBet.toString();
            this.refreshRoomLevel();
            this.refreshGameRound();
            for (let i = 0; i < zjhData.zjhPlayers.length; i++) {
                let zjhPlayer = zjhData.zjhPlayers[i];
                this.onStartPlayer(zjhPlayer);
            }
        }

        private onStartPlayer(zjhPlayer: zjh.ZJHPlayer): void {
            let pos = 0;
            let roomData = game.RoomManager.getInstance().curRoomData;
            let roomPlayer = roomData.getPlayerInfo(zjhPlayer.playerId);
            if (roomPlayer) {
                pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(zjhPlayer.playerId).postion;
            } else {
                console.error("！！！获取房间玩家失败", game.RoomManager.getInstance().curRoomData);
            }
            let headIcon: HeadIcon = this.getHeadIconByPlayerId(zjhPlayer.playerId);
            if (headIcon == null) {
                return;
            }
            if(zjhPlayer.isBanker){
                this.showBanker(pos);
            }

            headIcon.ShowWait(false);
            headIcon.clearAllin();
            headIcon.showGrey(false);
            this.playerCostArr[pos - 1].visible = true;
            //this.playerCardArr[pos - 1].visible = true;

            headIcon.showImmGold(zjhPlayer.totalMoney + zjhPlayer.costMoney);
            this.playerCostArr[pos - 1].showGold(Math.abs(zjhPlayer.costMoney));
            //this.playerCardArr[pos - 1].visible = true;      
        }

        public refreshRoomStatus(): void {
            let roomData = RoomManager.getInstance().curRoomData;
            if (roomData.status == game.GameStatus.PREPARE) {
                this.operationBtnGroup.visible = false;
                this.gameRunning.visible = false;

                //把玩家头像信息移到showplayerinfo()中
                for (let i = 0; i < this.playerHeadArr.length; i++) {
                    this.playerHeadArr[i].ShowWait(true);

                }
            } else {
                for (let i = 0; i < this.playerHeadArr.length; i++) {
                    this.playerHeadArr[i].ShowWait(false);
                }

                this.gameRunning.visible = true;
            }
        }
        public showZJhInfo(isInit: boolean = false): void {
            let zjhData: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            if (!game.zjh.ZJHData.getInstance().zjhPlayers || game.zjh.ZJHData.getInstance().zjhPlayers.length == 0) {
                return;
            }

            if (game.zjh.ZJHData.getInstance().getPlayerById(UserService.instance.playerId).status != zjh.ZJHPlayerStatus.NO_PLAY) {
                this.operationBtnGroup.visible = true;
            }

            // let startId: number = zjhData.getCurOperationPlayer().playerId;
            // let downtime: number = zjhData.downTime;
            this.showOperationDownTime();
            for (let i = 0; i < zjhData.zjhPlayers.length; i++) {
                let zjhPlayer = zjhData.zjhPlayers[i];
                this.updateZjhInfoPlayer(zjhPlayer);
            }
            if (!isInit) {
                for (let i = 0; i < this.playerCardArr.length; i++) {
                    this.playerCardArr[i].ShowCard();
                }
            }
        }

        //更新下注金额和牌型
        public refreshPlayerCostmoney(playerId: number, money: number): void {
            let pos = 0;
            let roomData = game.RoomManager.getInstance().curRoomData;
            let roomPlayer = roomData.getPlayerInfo(playerId);
            let zjhPlayer = ZJHData.getInstance().getPlayerById(playerId);
            if (roomPlayer) {
                pos = roomPlayer.postion;
                this.playerCostArr[pos - 1].goldLabel.text = Math.abs(money).toFixed(0);
                this.playerHeadArr[pos - 1].showImmGold(zjhPlayer.totalMoney + zjhPlayer.costMoney);
            } else {
                console.error("！！！获取房间玩家失败", game.RoomManager.getInstance().curRoomData);
            }
        }

        public showTips(playerId: number, status: number) {
            let icon = this.getHeadIconByPlayerId(playerId);
            if (icon) {
                icon.showTips(status);
            }
        }

        private updateZjhInfoPlayer(zjhPlayer: zjh.ZJHPlayer): void {
            let pos = 0;
            let roomData = game.RoomManager.getInstance().curRoomData;
            let roomPlayer = roomData.getPlayerInfo(zjhPlayer.playerId);
            if (roomPlayer) {
                pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(zjhPlayer.playerId).postion;
            } else {
                console.error("！！！获取房间玩家失败", game.RoomManager.getInstance().curRoomData);
            }
            let headIcon: HeadIcon = this.getHeadIconByPlayerId(zjhPlayer.playerId);
            if (headIcon == null) {
                return;
            }

            headIcon.ShowWait(false);
            headIcon.clearAllin();
            headIcon.showGrey(false);
            headIcon.showImmGold(zjhPlayer.totalMoney + zjhPlayer.costMoney);

            let isPrepare = (roomData.status == game.GameStatus.PREPARE);
            if (isPrepare) {
                this.playerCostArr[pos - 1].visible = false;
                this.playerCardArr[pos - 1].visible = false;
                headIcon.ShowWait(true);
                return;
            }

            if (zjhPlayer.status == game.zjh.ZJHPlayerStatus.NO_PLAY) {
                this.playerCostArr[pos - 1].visible = false;
                this.playerCardArr[pos - 1].visible = false;
                headIcon.ShowWait(true);
                headIcon.showGrey(true);
                //return;
            }

            else if (zjhPlayer.status == game.zjh.ZJHPlayerStatus.QIPAI || zjhPlayer.status == game.zjh.ZJHPlayerStatus.SHIBAI) {
                headIcon.ShowWait(false);
                //headIcon.ShowBanker(zjhPlayer.isBanker);
                headIcon.showGrey(true);
                this.playerCostArr[pos - 1].visible = false;
                this.playerCardArr[pos - 1].visible = false;
            } else {
                this.playerCostArr[pos - 1].visible = true;
                this.playerCardArr[pos - 1].visible = true;
                this.playerCostArr[pos - 1].showGold(Math.abs(zjhPlayer.costMoney));
                if (zjhPlayer.isAllin) {
                    headIcon.showAllin();
                }
            }
            if (!isPrepare) {
                headIcon.showTips(zjhPlayer.status);
            } else {
                headIcon.hideTips();
            }
            if (UserService.instance.playerId == zjhPlayer.playerId) {
                this.closeCompareChoose();
                if (isPrepare) {
                    return;
                }
                if (zjhPlayer.status == game.zjh.ZJHPlayerStatus.NO_PLAY) {
                    this.operationBtnGroup.visible = false;
                } else if (zjhPlayer.status == game.zjh.ZJHPlayerStatus.QIPAI) {
                    //如果自己弃牌
                    this.gameStartWait.visible = true;
                    this.startWait.showWaitNextStart();
                    this.operationBtnGroup.visible = false;
                } else {
                    // 正在操作
                    this.showOperation();
                    if (zjhPlayer.cards != null && zjhPlayer.cards.length > 0) {
                        this.showCards(zjhPlayer);
                        if (zjhPlayer.status == zjh.ZJHPlayerStatus.KANPAI) {
                            //如状态是已看牌，显示所有牌
                            this.playerCard1.card1.showCard(zjhPlayer.cards[0]);
                            this.playerCard1.card2.showCard(zjhPlayer.cards[1]);
                            this.playerCard1.card3.showCard(zjhPlayer.cards[2]);
                        }
                    }
                }
            }
        }

        public switchNext(delay: number):void{
            if(delay == 0){
                this.showOperation();
                this.showOperationDownTime();
                this.refreshGameRound();
            } else{
                CommonUtil.registerTimeOut(()=>{
                    this.showOperation();
                    this.showOperationDownTime();
                    this.refreshGameRound();
                }, this, delay);
            }
        }

        public showOperation(): void {
            let roomData = game.RoomManager.getInstance().curRoomData;
            let zjhData = ZJHData.getInstance();
            let selfId = UserService.instance.playerId;
            let zjhPlayer = zjhData.getPlayerById(selfId);

            let status = zjhPlayer.status;
            let isAlways = zjhPlayer.isAlways;
            let curRound = ZJHData.getInstance().currentRound;

            if (roomData.status == game.GameStatus.PREPARE) {
                this.operationBtnGroup.visible = false;
            } else {
                this.operationBtnGroup.visible = true;
            }

            if (zjhPlayer.isPay) {
                // 显示轮到自己的时候的操作栏
                this.operationBtnGroup.showButtonStateInTurn(curRound, status, isAlways);
            } else {
                this.operationBtnGroup.showUnTurnState(curRound, status, isAlways);
            }
        }

        public hideAllCards() {
            for (let i = 0; i < this.playerCardArr.length; i++) {
                this.playerCardArr[i].hideCard();
            }
        }

        private cacheCoinArr: Array<Coin> = new Array<Coin>();
        public clearBattle(): void {
            console.error("**********ClearBattle***********");
            if (this.playerCardArr) {
                this.hideAllCards();
            }
            if (this.playerCardArr) {
                for (let i = 0; i < this.playerCostArr.length; i++) {
                    this.playerCostArr[i].showGold(0);
                    this.playerCostArr[i].hideType();
                    this.playerCostArr[i].visible = false;
                }
            }
            //清掉比牌的UI
            this.closeCompare();
            this.closeCompareChoose();
            this.hideAllHead();
            this.hideBankerIcons();
            this.startWait.hideAll();
            this.gameStartCountDown.visible = false;

            let zjhData: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            if (zjhData.zjhPlayers) {
                for (let i = 0; i <= zjhData.zjhPlayers.length; i++) {
                    if (zjhData.zjhPlayers[i]) {
                        let headIcon: HeadIcon = this.getHeadIconByPlayerId(zjhData.zjhPlayers[i].playerId);
                        if (headIcon) {
                            headIcon.clearAllin();
                            headIcon.hideTips();
                        }
                    }
                }
            }
            if(this.coinsArr.length > 0){
                this.cacheCoinArr = this.coinsArr;
            }
            if (this.coinsArr) {
                if (this.coinsArr.length > 0) {
                    for (let i = 0; i < this.coinsArr.length; i++) {
                        this.coinsArr[i].parent.removeChild(this.coinsArr[i]);
                    }
                }
            }
            this.coinsArr = new Array<Coin>();
            this.operationBtnGroup.visible = false;
            this.clearAllTimeOut();
            this.showBrightBtn(false);
            //this.ShowRoomPlayerInfo();

            this.zjhbipai.visible = false;
            this.bipaiGroup.visible = false;
            this.isPk = false;
            this.hidePkSelect();

            zjh.ZJHData.getInstance().clearDataGame();
            this.showAllinBoundsAnim(false);
            //每回合都将pk动画完成的回调队列清空
            this.pkCompleteFuncArr = [];
            CommonUtil.removeTimeout(this);
        }
        
        public hideOnEnd(): void{
            for (let i = 0; i < this.playerHeadArr.length; i++) {
                this.playerHeadArr[i].clearClock();
                // this.playerHeadArr[i].hideTips();
                this.playerHeadArr[i].clearAllin();
            }
            this.closeCompare();
            this.closeCompareChoose();
            this.showAllinBoundsAnim(false);
            this.prevHeadIcon = null;
            this.operationBtnGroup.visible = false;
        }

        public handleOperationOnEnd(): void {
            console.error("------------------handleOperationOnEnd");
            // 所有人清除clock  比起那个prevHead置空
            //stop all headicon mask
            let finishData: game.zjh.ZJHBattleFinishData = game.zjh.ZJHData.getInstance().BattleFinishData;
            let winId = finishData.winPlayerId;
            let winRoomPlayer = RoomManager.getInstance().curRoomData.getPlayerInfo(winId);

            let brightId: Array<number> = new Array<number>();
            CommonUtil.registerTimeOut(()=>{
                for (let brightCardInfo of finishData.brightCardInfos) {
                    if(brightId.indexOf(brightCardInfo.targetId) < 0){
                        brightId.push(brightCardInfo.targetId);
                        let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(brightCardInfo.targetId).postion;
                        let cardGroup: ZJHCardGroup = this.playerCardArr[pos - 1];
                        console.log("---------------------")
                        console.log("show brightCards on end ", pos, brightCardInfo.targetId, UserService.instance.playerId);
                        console.log("---------------------")
                        cardGroup.ShowCardContent(brightCardInfo.card);
                    }
                }
            }, this, 1000);

            CommonUtil.registerTimeOut(()=>{
                let zjhData = ZJHData.getInstance();
                let selfPlayer = zjhData.getPlayerById(UserService.instance.playerId);
                let finishPlayers = zjhData.BattleFinishData.battleFinishPlayers;
          
                this.showBrightBtn(false);

                if(!selfPlayer.isLook && zjhData.BattleFinishData.needBrightBtn){  //没看过牌，且，
                    this.showBrightBtn(true);
                }
                if (winRoomPlayer) {
                    let pos = winRoomPlayer.postion;
                    this.showPlayerWinEffect(pos);
                }
                if (finishData.winPlayerId == UserService.instance.playerId) {
                    this.youwinAnim.visible = true;
                    this.youwinAnim.playerOnce(() => {
                        this.youwinAnim.visible = false;
                    }, this);
                }
                if (finishData.battleFinishPlayers) {
                    for (let i = 0; i < finishData.battleFinishPlayers.length; i++) {
                        let finishPlayer: game.zjh.ZJHBattleFinishPlayer = finishData.battleFinishPlayers[i];
                        let headIcon = this.getHeadIconByPlayerId(finishPlayer.playerId);
                        if (headIcon) {
                            if (finishData.winPlayerId == finishPlayer.playerId) {
                                this.getHeadIconByPlayerId(finishPlayer.playerId).showWin(finishData.winMoney);
                            } else {
                                let player: zjh.ZJHPlayer = game.zjh.ZJHData.getInstance().getPlayerById(finishPlayer.playerId);
                                if (player != null) {
                                    // 为空的原因是新加入的人导致的
                                    let loseMoney: number = player.costMoney;
                                    this.getHeadIconByPlayerId(finishPlayer.playerId).showLose(loseMoney);
                                }
                            }
                        }
                    }
                }

            }, this, 1500);
        }

        private showPlayerWinEffect(pos: number) {
            //let pos = 2
            let anim = this.playerWinAnim;
            anim.visible = true;
            let point = this.playerWinPointArr[pos - 1];
            anim.x = point.x;
            anim.y = point.y;
            anim.playerOnce(() => {
                anim.visible = false;
                anim.stop();
            });
        }

        public onDestroy(): void {
            this.operationBtnGroup.onDestory();
        }

        private onZjClick() {
            RoomRequest.reqZJCXInfo(ChildGameType.ZJH);
        }

        private onSettingBtnClick(): void {
            var settingPanel: ZjhSetting = new ZjhSetting();

            PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
        }

        private onHelpClick(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.ZJH);
        }

        private onBankClick() {
            if (RoomManager.getInstance().curRoomData.gameLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.ZJH);
        }

        private onBackBtnClick(): void {
            console.error("-----------onBackBtnClick");
            let isTiyan: boolean = RoomManager.getInstance().curRoomData.gameLevel == 0;
            let isRunning: boolean = RoomManager.getInstance().curRoomData.status == GameStatus.RUNNING;
            let isOut: boolean;
            if (!isTiyan && isRunning) {
                let player = ZJHData.getInstance().getPlayerById(UserService.instance.playerId);
                if (player) {
                    let status = player.status;
                    isOut = (status == game.zjh.ZJHPlayerStatus.NO_PLAY || status == game.zjh.ZJHPlayerStatus.SHIBAI || status == game.zjh.ZJHPlayerStatus.QIPAI);
                    console.log("isTiyan isRunning isOut", isTiyan, isRunning, isOut);
                    if (!isOut) {
                        BattleLeaveTips.showTips({
                            "text": "您正在游戏中，退出房间后不会再跟注",
                            "callback": (data: any) => {
                                RoomRequest.leaveRoom(ChildGameType.ZJH);
                            },
                            "callbackObject": this,
                            "effectType": 0,
                            "tipsType": TipsType.OkAndCancel
                        });
                    }
                    else {
                        console.log("-----------leave ZJHRequest");
                        RoomRequest.leaveRoom(ChildGameType.ZJH);
                    }
                }
                else{
                    console.error("---------找不到玩家");
                }
            } else {
                console.log("-----------leave ZJHRequest");
                RoomRequest.leaveRoom(ChildGameType.ZJH);
            }

        }

        public getPlayerCost(playerId: number): PlayerGoldShow {
            for (let i = 0; i < this.playerCostArr.length; i++) {
                if (this.playerCostArr[i].playerId = playerId) {
                    return this.playerCostArr[i];
                }
            }
            return null;
        }


        public showCardTween(): void {
            let index = 0;
            var battleUI: ZjhBattleUI = this;
            for (let j = 0; j < 3; j++) {
                let players = game.zjh.ZJHData.getInstance().zjhPlayers;
                for (let i = 0; i < players.length; i++) {
                    let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(players[i].playerId).postion;
                    CommonUtil.registerTimeOut(function () {
                        this.playerCardArr[pos - 1].visible = true;
                        this.playerCardArr[pos - 1].showFapaiTween(j, battleUI);
                    }, this, (index++) * 100);
                }
            }
        }

        public dealCardTween(): void {
            let index = 0;
            let delay = 0;
            // this.dealPos.visible = true;
            // let selfPlayer = ZJHData.getInstance().getSelfZJHPlayer();
            for (let j = 0; j < 3; j++) {
                let players = game.zjh.ZJHData.getInstance().zjhPlayers;
                for (let i = 0; i < players.length; i++) {
                    let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(players[i].playerId).postion;
                    let cardGroup: ZJHCardGroup = this.playerCardArr[pos - 1];
                    let card: ZJHCard = cardGroup.cardArr[j];
                    let position = new egret.Point(card.x, card.y);

                    let p = this.contentGroup.localToGlobal(this.dealPos.x, this.dealPos.y);
                    p = cardGroup.globalToLocal(p.x, p.y);
                    card.x = p.x;
                    card.y = p.y;
                    cardGroup.visible = true;
                    card.visible = true;
                    if(pos == 1){
                        card.alpha = 0;
                    } else{
                        card.alpha = 1;
                    }
                    CommonUtil.registerTimeOut(() => {
                        card.alpha = 0;
                        egret.Tween.get(card).to({ alpha: 1, rotation: 360, x: position.x, y: position.y }, 300).call(() => {
                            if (j == 2 && i == players.length - 1) {
                                // this.dealPos.visible = false;
                                this.showOperation();
                                this.showOperationDownTime();
                            }
                        })
                    }, this, delay);
                    delay += 200;
                }
            }
        }

        public foldPlayerCards(playerId: number): void {
            let roomData = RoomManager.getInstance().curRoomData;
            if (roomData.getPlayerInfo(playerId) == null) {
                return;
            }
            let pos = roomData.getPlayerInfo(playerId).postion;
            if (pos == 1) {
                //todo 自己弃牌————“等待其他玩家”亮起
                let isLook = ZJHData.getInstance().getPlayerById(UserService.instance.playerId).isLook;
                this.playerCardArr[pos - 1].foldCards(true, this.foldFlyPos, isLook);
                this.operationBtnGroup.visible = false;
                this.closeCompareChoose();
            } else {
                this.playerCardArr[pos - 1].foldCards(false, this.foldFlyPos);
            }
            // 变灰
            this.playerHeadArr[pos - 1].showGrey(true);
        }


        public getHeadIconByPlayerId(playerId: number): HeadIcon {
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
            if (playerInfo) {
                return this.playerHeadArr[playerInfo.postion - 1];
            }
            return null;
        }



        public showOperationDownTime(): void {
            let player: game.zjh.ZJHPlayer = game.zjh.ZJHData.getInstance().getCurOperationPlayer();
            if (player == null) return;
            let headIcon: HeadIcon = this.getHeadIconByPlayerId(player.playerId);
            if (headIcon != null) {
                if (this.prevHeadIcon != null) {
                    if (this.prevHeadIcon == headIcon) {
                        return;
                    }
                    this.prevHeadIcon.clearClock();
                }
                headIcon.showClock(game.zjh.ZJHData.getInstance().downTime);
                this.prevHeadIcon = headIcon;
            }
        }

        public reEnter(): void {
            this.clearBattle();
            this.ShowRoomPlayerInfo();
            this.showZJhInfo();
            this.showInitCoinAnim();
        }

        private showBanker(pos: number):void {
            //pos  == 0全部隐藏
            for (let i = 0; i < 5; i++) {
                if (i == (pos - 1)) {
                    this.bankerImgArr[i].visible = true;
                } else {
                    this.bankerImgArr[i].visible = false;
                }
            }
        }

        public showInitCoinAnim(): void {
            if(this.cacheCoinArr.length <= 0){
                return;
            }
            for(let i = 0; i < this.cacheCoinArr.length; i++){
                let newCoin = this.cacheCoinArr[i];
                this.goldArea.addChild(newCoin);
                newCoin.x = CommonUtil.RandomRange(0, this.goldArea.width);
                newCoin.y = CommonUtil.RandomRange(0, this.goldArea.height);
                this.coinsArr.push(newCoin);
            }
            
            // let zjhData: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            // let maxBet: number = game.zjh.ZJHData.getInstance().singleBet;
            // for (let i = 0; i < zjhData.zjhPlayers.length; i++) {
            //     let zjhplayer = zjhData.zjhPlayers[i];
            //     if (zjhplayer.status == game.zjh.ZJHPlayerStatus.NO_PLAY) {
            //         continue;
            //     }

            //     if (zjhplayer.betsRecord && zjhplayer.betsRecord.length > 0) {
            //         for (let betnum of zjhplayer.betsRecord) {
            //             let headIcon = this.getHeadIconByPlayerId(zjhplayer.playerId);
            //             this.showCoin(headIcon.center, betnum);
            //         }
            //     }
            // }
            
        }


        public showSelfCards(): void {
            console.log("----------------------show self card")
            let cardGroupSelf: ZJHCardGroup = this.playerCard1;
            let zjhPlayer: game.zjh.ZJHPlayer = game.zjh.ZJHData.getInstance().getPlayerById(UserService.instance.playerId);
            this.showCards(zjhPlayer);
            // 播放牌型动画
            let cardType = zjhPlayer.cardType;
            let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(zjhPlayer.playerId).postion;
            if (cardType >= 0) {
                console.log("----------------------show card cardtype ", cardType);
                cardGroupSelf.showCardType(cardType);
            } else {
                cardGroupSelf.hideCardType();
            }
        }

        public showBrightCards(): void {
            let ifBaozi = false;
            let finishData = game.zjh.ZJHData.getInstance().BattleFinishData;
            for (let i = 0; i < finishData.battleFinishPlayers.length; i++) {
                console.warn("================finishData ", finishData);
                let player = game.zjh.ZJHData.getInstance().getPlayerById(finishData.battleFinishPlayers[i].playerId);
                if (player && player.cards.length > 0 && player.playerId != UserService.instance.playerId) {
                    this.showCards(player);
                    if (player.cardType == 5) {
                        ifBaozi = true;
                    }
                }
            }
            if (ifBaozi) {
                this.showBaoziAnim();
            }
        }

        public showPlayerBrightCard(playerId: number) {
            let player = game.zjh.ZJHData.getInstance().getPlayerById(playerId);
            if(player && !player.isLook){
                this.showCards(player);
                if (player.cardType == 5) {
                    this.showBaoziAnim();
                }
            }
        }

        public showCards(zjhPlayer: game.zjh.ZJHPlayer): void {
            if (zjhPlayer.cards == null || zjhPlayer.cards.length == 0) return;
            let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(zjhPlayer.playerId).postion;
            let cardGroup: ZJHCardGroup = this.playerCardArr[pos - 1];
            cardGroup.ShowCardContent(zjhPlayer.cards);
        }

        //test---------------------------------------------
        public showCardsTest(): void {
            //if (zjhPlayer.cards == null || zjhPlayer.cards.length == 0) return;
            // let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(zjhPlayer.playerId).postion;
            let pos = 2;
            let id = RoomManager.getInstance().curRoomData.getPlayerInfoByPos(pos).playerId;
            let zjhPlayer = ZJHData.getInstance().getPlayerById(id);
            let cardGroup: ZJHCardGroup = this.playerCardArr[pos - 1];
            zjhPlayer.cards = [42, 11, 9];
            cardGroup.ShowCardContent(zjhPlayer.cards);
        }

        public openCompare(): void {
            let players: Array<game.zjh.ZJHPlayer> = game.zjh.ZJHData.getInstance().zjhPlayers;
            let headArr: Array<HeadIcon> = [];
            //获取除了自己 弃牌 失败的玩家头像，推入队列
            for (let i = 0; i < players.length; i++) {
                let head: HeadIcon = this.getHeadIconByPlayerId(players[i].playerId);
                if (head.playerInfo.playerId != UserService.instance.playerId
                    && players[i].status != game.zjh.ZJHPlayerStatus.QIPAI
                    && players[i].status != game.zjh.ZJHPlayerStatus.SHIBAI) {
                    headArr.push(head);
                }
            }
            if (headArr.length == 1) {
                // 只有一个人直接比牌
                //console.warn("========= target id is " + headArr[0].playerInfo.playerId);
                ZJHRequest.comparisonCard(headArr[0].playerInfo.playerId);
            } else {
                for (let head of headArr) {
                    head.showCompare(true);
                }
                this.showPkSelect();
            }
        }

        public closeCompare(): void {
            for (let i = 0; i < this.playerHeadArr.length; i++) {
                if (this.playerHeadArr[i]) {
                    this.playerHeadArr[i].showCompare(false);
                }
            }
            this.operationBtnGroup.endCompareState();
        }

        public cancelCompare(){
            this.hidePkSelect();
            this.closeCompare();
            this.operationBtnGroup.cancelCompare();
        }

        public closeCompareChoose(): void {
            for (let i = 0; i < this.playerHeadArr.length; i++) {
                if (this.playerHeadArr[i]) {
                    this.playerHeadArr[i].showCompare(false);
                }
            }
            this.hidePkSelect();
        }

        private hidePkSelect(){
            this.pkSelectImg.visible = false;
            this.pkSelectImgbg.visible = false;
            if(this.pkSelectImgbg.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                this.pkSelectImgbg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPkBg, this);
            }
        }

        private showPkSelect(){
            this.pkSelectImg.visible = true;
            this.pkSelectImgbg.visible = true;    
            if(!this.pkSelectImgbg.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                this.pkSelectImgbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPkBg, this);
            }
        }

        private onPkBg(){
            this.cancelCompare();
        }

        public showCoinAnim(playerId: number, bet: number, isInit: boolean = false): void {
            let headIcon = this.getHeadIconByPlayerId(playerId);
            let curMaxBet = game.GameConst.getCurMaxBet();
            let bottomBet = game.RoomManager.getInstance().curRoomData.bottomBet;
            let count = 1;
            let remain = 0;
            let baseBet = bet;
            if (isInit) {
                if (bet > bottomBet) {
                    bet = bet - bottomBet;
                    this.showCoin(headIcon.center, bottomBet);
                }
            }
            if (bet > curMaxBet) {
                count = Math.floor(bet / curMaxBet);
                remain = bet % curMaxBet;
                baseBet = curMaxBet;
                if (count > 10) {
                    count = 10;
                }
            }

            for (let i = 0; i < count; i++) {
                this.showCoin(headIcon.center, baseBet);
            }
            if (remain != 0) {
                this.showCoin(headIcon.center, remain);
            }
        }

        private showCoin(headCenter: egret.DisplayObject, bet: number, func: Function = null, funcObj: any = this): void {
            let coin: Coin = new Coin();
            coin.showCoin(bet);
            coin.rotation = Math.random() * 360 - 180;
            this.goldArea.addChild(coin);
            let p: egret.Point;
            if (headCenter.parent) {
                p = headCenter.parent.localToGlobal(headCenter.x, headCenter.y);
                p = this.goldArea.globalToLocal(p.x, p.y);
            }
            coin.x = p.x;
            coin.y = p.y;
            var tw: egret.Tween = egret.Tween.get(coin);
            tw.to({
                x: CommonUtil.RandomRange(0, this.goldArea.width),
                y: CommonUtil.RandomRange(0, this.goldArea.height),
            }, 400, egret.Ease.quartOut).call(() => {
                if (func) {
                    func.call(funcObj);
                }
            });
            this.coinsArr.push(coin);
        }

        public showDefaultCoin(): void {
            let level = game.RoomManager.getInstance().curRoomData.gameLevel;
            if (level == 0) level = 2;
            let baseBet = game.GameConst.betConfig[level * 100];
            let arr: Array<game.zjh.ZJHPlayer> = game.zjh.ZJHData.getInstance().zjhPlayers;
            for (let i = 0; i < arr.length; i++) {
                let headIcon = this.getHeadIconByPlayerId(arr[i].playerId);
                if (i == arr.length - 1) {
                    this.showCoin(headIcon.center, baseBet, this.dealCardTween);
                } else {
                    this.showCoin(headIcon.center, baseBet);
                }
            }
        }

        public collectCoinToWin(playerId: number): void {
            if (this.coinsArr.length <= 0) return;
            let headIcon: HeadIcon = this.getHeadIconByPlayerId(playerId);
            if (headIcon) {
                let ph: egret.Point = headIcon.center.localToGlobal(0, 0);
                let delay = 0;
                for (let i = 0; i < this.coinsArr.length; i++) {
                    let p: egret.Point = this.coinsArr[i].parent.globalToLocal(ph.x, ph.y);
                    var tw: egret.Tween = egret.Tween.get(this.coinsArr[i]);
                    // CommonUtil.registerTimeOut(()=>{
                    tw.to({ x: p.x, y: p.y }, 500).call(() => {
                        this.coinsEnd();
                        //this.handleOperationOnEnd();
                    }, this);
                    // }, this, delay);
                    delay += 80;
                }
                CommonUtil.registerTimeOut(this.refreshAllPlayerCoins, this, 1300);
            }
        }

        public refreshAllPlayerCoins(): void {
            console.log("---------------------------------------")
            console.log("refreshAllPlayerCoins")
            console.log("---------------------------------------")
            let finishData = ZJHData.getInstance().BattleFinishData;
            let roomData = RoomManager.getInstance().curRoomData;
            let zjhData = game.zjh.ZJHData.getInstance();
            if(zjhData && finishData && finishData.battleFinishPlayers){
                for (let i = 0; i < finishData.battleFinishPlayers.length; i++) {
                    let finishPlayer: game.zjh.ZJHBattleFinishPlayer = finishData.battleFinishPlayers[i];
                    let headIcon = this.getHeadIconByPlayerId(finishPlayer.playerId)
                    if (headIcon) {
                        headIcon.showImmGold(finishPlayer.money);
                        if (roomData.getPlayerInfo(finishPlayer.playerId)) {
                            let pos = roomData.getPlayerInfo(finishPlayer.playerId).postion;
                            let zjhPlayer = zjhData.getPlayerById(finishPlayer.playerId);
                            if (zjhPlayer) {
                                this.playerCostArr[pos - 1].showGold(Math.abs(zjhPlayer.costMoney));
                            }
                        }
                    }
                }
            }
        }

        public updateCostWhenCompare(playerId: number): void {
            let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(playerId).postion;
            this.playerCostArr[pos - 1].showGold(Math.abs(game.zjh.ZJHData.getInstance().getPlayerById(playerId).costMoney));
        }

        private coinsEnd(): void {
            for (let i = 0; i < this.coinsArr.length; i++) {
                this.coinsArr[i].parent.removeChild(this.coinsArr[i]);
            }
            this.coinsArr = new Array<Coin>();
        }


        private hideAllHead(): void {
            for (let i = 0; i < this.playerHeadArr.length; i++) {
                let headIcon = this.playerHeadArr[i];
                headIcon.clearClock();
                headIcon.hideTips();
                headIcon.hideCardsShow();
                this.recoverHeadParent(headIcon)
                headIcon.visible = false;
            }
        }

        private hideBankerIcons(): void{
            for(let i = 0; i < this.bankerImgArr.length; i++){
                this.bankerImgArr[i].visible = false;
            }
        }

        private recoverHeadParent(headIcon: HeadIcon) {
            if (headIcon.parent != this.headGroup) {
                if (headIcon.parent) {
                    headIcon.parent.removeChild(headIcon);
                }
                this.headGroup.addChild(headIcon);
            }
        }

        private onBrightCard() {
            ZJHRequest.brightCards();
            this.brightCardBtn.enabled = false;
        }

        public showBrightBtn(bool: boolean) {
            this.brightCardBtn.visible = bool;
            this.brightCardBtn.enabled = bool;
        }

        public showAllinBoundsAnim(b: boolean) {
            this.allinBoundsAnim.visible = b;
            if (b) {
                let w = egret.lifecycle.stage.stageWidth;
                let h = egret.lifecycle.stage.stageHeight;
                if (w / h >= 1334 / 750) {
                    this.allinBoundsAnim.scaleX = egret.lifecycle.stage.stageWidth / 1334;
                }
                this.allinBoundsAnim.playerTimes(() => { }, this, 0, null);
            } else {
                this.allinBoundsAnim.stop();
            }
        }

        public showBaoziAnim(): void {
            // this.baoziAnim.visible = true;
            // this.baoziAnim.playerOnce(() => {
            //     this.baoziAnim.visible = false;
            //     //console.warn("=============play " + this.baoziAnim.defaultPlayAnim);
            // }, this);
        }

        public showCompareAnim(bipaiData: any) {

            this.isPk = true;
            console.log("showCompareAnim   " + bipaiData.targetId + "  ,  " + bipaiData.otherPlayerId)
            // 先放大头像
            let targetHead = this.getHeadIconByPlayerId(bipaiData.targetId);
            let otherHead = this.getHeadIconByPlayerId(bipaiData.otherPlayerId);
            let data = bipaiData;
            targetHead.startPk();
            otherHead.startPk();
            egret.Tween.get(targetHead).to({ scaleX: 1.2, scaleY: 1.2 }, 500);
            egret.Tween.get(otherHead).to({ scaleX: 1.2, scaleY: 1.2 }, 500).call((bipaiData: any) => {
                this.zjhbipai.visible = true;
                this.bipaiGroup.visible = true;
                if (targetHead.parent == this.headGroup && otherHead.parent == this.headGroup) {
                    this.headGroup.removeChild(targetHead);
                    this.headGroup.removeChild(otherHead);
                    this.bipaiGroup.addChild(targetHead);
                    this.bipaiGroup.addChild(otherHead);
                }
                this.zjhbipai.showAnim(data, targetHead, otherHead);
            }, this);
        }

        public isPkAniming() {
            return this.isPk;
        }

        public getHeadIconByPos(pos: number): HeadIcon {
            return this.playerHeadArr[pos - 1];
        }

        //增加参数，为pk动画的回调添加标记。目的是区分每回合更新info和每局结束的不同回调函数
        public registerAfterPK(func: Function, funcObj: any, name: string) {

            this.pkCompleteFuncArr.push({ func: func, funcObj: funcObj, funcname: name });
        }

        private pkanimComplete(): void {
            this.isPk = false;

            if (this.pkCompleteFuncArr.length > 0) {
                for (let i = 0; i < this.pkCompleteFuncArr.length; i++) {
                    //当前局已经结束的情况下，标记为update的回调方法不执行
                    if (ZJHData.getInstance().BattleFinishData && ZJHData.getInstance().BattleFinishData.isBattleFinish && this.pkCompleteFuncArr[i].funcname == "update") {
                        continue;
                    }
                    this.pkCompleteFuncArr[i].func.call(this.pkCompleteFuncArr[i].funcObj);
                }
            }
        }

        protected onLeave() {
            CommonUtil.removeTimeout(this);
            egret.Tween.removeAllTweens();
        }
    }
}