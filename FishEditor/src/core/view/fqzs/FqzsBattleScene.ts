module game.fqzs {
    enum FQStatus {
        prepared = 0,//空闲
        startBet = 1,//开始下注
        stopBet = 2, //停止下注(开奖)	
    }
    export class FqzsBattleScene extends GameScene implements eui.UIComponent {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/fqzs/FqzsBattleScene.exml";
            this.gameType = ChildGameType.FQZS;
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
        //---------UI
        public bankerGroup: eui.Group;
        public bankerheadImg: eui.Image;
        public bankernameLabel: eui.Label;
        public bankergoldLabel: eui.Label;

        public select2: eui.Image;
        public select3: eui.Image;
        public select4: eui.Image;
        public select5: eui.Image;
        public select6: eui.Image;
        public select7: eui.Image;
        public select8: eui.Image;
        public select9: eui.Image;
        public select10: eui.Image;
        public select11: eui.Image;
        public select12: eui.Image;

        public headImg: eui.Image;
        public nameLabel: eui.Label;
        public goldLabel: eui.BitmapLabel;
        public goldAddBtn: eui.Button;

        public resultScroller: eui.Scroller;
        public resultGroup: eui.Group;
        public fqzs: eui.Group;

        public playerListBtn: IButton;
        public playerLabel: eui.Label;
        public upBankerNum: eui.Label;
        public gameLevelLabel: eui.Label;

        public stakerGroup: eui.Group;
        public stake2: eui.BitmapLabel;
        public stake3: eui.BitmapLabel;
        public stake4: eui.BitmapLabel;
        public stake5: eui.BitmapLabel;
        public stake6: eui.BitmapLabel;
        public stake7: eui.BitmapLabel;
        public stake8: eui.BitmapLabel;
        public stake9: eui.BitmapLabel;
        public stake10: eui.BitmapLabel;
        public stake11: eui.BitmapLabel;
        public stake12: eui.BitmapLabel;
        public myStake2: eui.BitmapLabel;
        public myStake3: eui.BitmapLabel;
        public myStake4: eui.BitmapLabel;
        public myStake5: eui.BitmapLabel;
        public myStake6: eui.BitmapLabel;
        public myStake7: eui.BitmapLabel;
        public myStake8: eui.BitmapLabel;
        public myStake9: eui.BitmapLabel;
        public myStake10: eui.BitmapLabel;
        public myStake11: eui.BitmapLabel;
        public myStake12: eui.BitmapLabel;
        public totalStake: eui.BitmapLabel;

        //结算fnt
        public myResult: eui.BitmapLabel;
        public playerResult: eui.BitmapLabel;
        public bankResult: eui.BitmapLabel;

        public tipImage: eui.Image;
        public statusTips: eui.Image;

        private timeAmin: game.CommonDBLoop2;

        public betButton1: FqzsBetButton;
        public betButton10: FqzsBetButton;
        public betButton50: FqzsBetButton;
        public betButton100: FqzsBetButton;
        public betButton500: FqzsBetButton;
        public betButton1000: FqzsBetButton;

        public continueBtn: IButton;

        public betContainer: egret.DisplayObjectContainer;

        public frame1: eui.Image;
        public frame2: eui.Image;
        public frame3: eui.Image;
        public frame4: eui.Image;
        public frame5: eui.Image;
        public frame6: eui.Image;
        public frame7: eui.Image;
        public frame8: eui.Image;
        public frame9: eui.Image;
        public frame10: eui.Image;
        public frame11: eui.Image;
        public frame12: eui.Image;
        public frame13: eui.Image;
        public frame14: eui.Image;
        public frame15: eui.Image;
        public frame16: eui.Image;
        public frame17: eui.Image;
        public frame18: eui.Image;
        public frame19: eui.Image;
        public frame20: eui.Image;
        public frame21: eui.Image;
        public frame22: eui.Image;
        public frame23: eui.Image;
        public frame24: eui.Image;
        public frame25: eui.Image;
        public frame26: eui.Image;
        public frame27: eui.Image;
        public frame28: eui.Image;

        public resultBox: eui.Image;

        public robBanker: eui.Button;
        public upBanker: eui.Button;
        public downBanker: eui.Button;

        private winAmin: game.CommonDB;

        private waitAmin: game.CommonDBLoop;

        //----------数据与结构;
        private fqzsData: FqzsData;
        //是否庄家
        private isSelfBanker: boolean;

        private tempTotalStake: number = 0;

        private tempBetGold: number = 0;
        /** 保存筹码的数组 */
        private betHash: FqzsBetButton[][];
        private stakeArr: eui.BitmapLabel[] = null;
        private myStakeArr: eui.BitmapLabel[] = null;
        private betTouch: eui.Image[] = null;
        private frameArr: eui.Image[] = null;
        private isStart: boolean = false;
        private isInit = false;
        private currBetButton: FqzsBetButton;

        public betBtnArr: FqzsBetButton[] = null;
        private level0BetNums: number[] = [1, 5, 10, 50, 100, 200];
        private level1BetNums: number[] = [10, 50, 100, 200, 500, 1000];
        private level2BetNums: number[] = [50, 100, 200, 500, 1000, 2000];
        private customBetNums: number[];
        //续押数组
        private prevCache: Array<any> = [];
        private cacheBet: Array<any> = [];

        private isSwitchBanker: boolean = false;

        //上一局的中奖
        private lastWinType: number = 0;

        private currStatus: FQStatus = FQStatus.prepared;

        public battleFinish: FqzsResultPanel = null;

        private curGameRound: number = 0;

        public count = 0;
        private menus: FqzsMenu;
        private lastChooseBet: number = -1;
        private lastOpenLevel: number = -1;

        protected componentInit(): void {
            super.componentInit();
            this.statusTips.alpha = 1;
            this.statusTips.source = "";
            this.continueBtn.enabled = false;
            this.upBanker.visible = true;
            this.downBanker.visible = !this.upBanker.visible;
            this.stakeArr = [this.totalStake, this.stake2, this.stake3, this.stake4, this.stake5, this.stake6, this.stake7, this.stake8, this.stake9, this.stake10, this.stake11, this.stake12];
            this.myStakeArr = [null, this.myStake2, this.myStake3, this.myStake4, this.myStake5, this.myStake6, this.myStake7, this.myStake8, this.myStake9, this.myStake10, this.myStake11, this.myStake12];
            this.betTouch = [null, this.select2, this.select3, this.select4, this.select5, this.select6, this.select7, this.select8, this.select9, this.select10, this.select11, this.select12];
            this.betBtnArr = [this.betButton1, this.betButton10, this.betButton50, this.betButton100, this.betButton500, this.betButton1000];
            this.frameArr = [this.frame1, this.frame2, this.frame3, this.frame4, this.frame5, this.frame6, this.frame7, this.frame8, this.frame9, this.frame10, this.frame11, this.frame12, this.frame13, this.frame14,
            this.frame15, this.frame16, this.frame17, this.frame18, this.frame19, this.frame20, this.frame21, this.frame22, this.frame23, this.frame24, this.frame25, this.frame26, this.frame27, this.frame28]
            for (var i = 0; i < 12; i++) {
                if (this.stakeArr[i]) {
                    this.stakeArr[i].text = '0';
                    this.stakeArr[i].visible = false;
                }
                if (this.myStakeArr[i]) {
                    this.myStakeArr[i].text = '0';
                    this.myStakeArr[i].visible = false;
                }
            }

            for (var i = 0; i < this.frameArr.length; i++) {
                this.frameArr[i].alpha = 0;
            }
            this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueButton, this);
            this.playerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerList, this);
            for (var i = 0; i < this.betBtnArr.length; i++) {
                this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectedBetButton, this);
                this.betBtnArr[i].canChoose = false;
            }
            for (var i = 1; i < this.betTouch.length; i++) {
                this.betTouch[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.startStakeTap, this);
                this.betTouch[i].alpha = 0;
            }

            this.robBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRobBanker, this);
            this.upBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBanker, this);
            this.downBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBanker, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.bankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBanker, this);
            this.myResult.visible = false;
            this.playerResult.visible = false;
            this.bankResult.visible = false;

            this.betContainer = new egret.DisplayObjectContainer();
            this.addChild(this.betContainer);
            this.addChild(this.stakerGroup);
            this.addChild(this.statusTips);
            this.addChild(this.menus);

            this.lastWinType = 0;
            this.betHashInit();
            this.fqzsData = new FqzsData;

            this.isInit = true;
            if (this.isStart) {
                this.initScene();
            }
        }

        protected onOpen() {
            super.onOpen();
            let level = RoomManager.getInstance().curRoomData.gameLevel;
            if (level != this.lastOpenLevel) {
                this.lastChooseBet = 0;
                //换房间清理
                if (this.fqzsData) this.fqzsData.clearRecortTypeBet();
                this.betContainer.removeChildren();
                this.selectedBetButtonByIndex(0);
            }
            this.lastOpenLevel = level;
        }

        private betHashInit() {
            //1.金鲨  2.银鲨 3.兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14包赔 (3 - 6是走兽，7 - 10是飞禽)
            this.betHash = new Array();
            this.betHash.push(new Array<FqzsBetButton>());//1.金鲨
            this.betHash.push(new Array<FqzsBetButton>());//2.银鲨
            this.betHash.push(new Array<FqzsBetButton>());//3.兔子
            this.betHash.push(new Array<FqzsBetButton>());//4.猴子
            this.betHash.push(new Array<FqzsBetButton>());//5.狮子
            this.betHash.push(new Array<FqzsBetButton>());//6.熊猫
            this.betHash.push(new Array<FqzsBetButton>());//7.鸽子
            this.betHash.push(new Array<FqzsBetButton>());//8.燕子
            this.betHash.push(new Array<FqzsBetButton>());//9.孔雀
            this.betHash.push(new Array<FqzsBetButton>());//10.老鹰
            this.betHash.push(new Array<FqzsBetButton>());//11.走兽
            this.betHash.push(new Array<FqzsBetButton>());//12.飞禽
        }

        public onRobBanker() {
            FqzsSoundPlayer.instance.playTouch();
            if (this.tempBetGold < FqzsData.bankerUpMoneyLimit * 2) {
                TipsUI.showTips({
                    "text": "您的余额不足,无法抢庄,抢庄条件:" + FqzsData.bankerUpMoneyLimit * 2 + "元",
                    "callback": () => {
                        game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
                    },
                    "callbackObject": this,
                    "okBitmapLabelPath": "bt_charge_now_png",
                    "tipsType": TipsType.OnlyOk,
                    "effectType": 0
                })
                return;
            }
            if (this.isSelfBanker) {
                CommonUtil.noticeMsg("已是庄家，不能抢庄！");
                return;
            }
            FqzsRequest.requestUpBanker(2);
        }

        public onUpBanker() {
            FqzsSoundPlayer.instance.playTouch();
            if (this.tempBetGold < FqzsData.bankerUpMoneyLimit) {
                TipsUI.showTips({
                    "text": "您的余额不足,无法上庄,上庄条件:" + FqzsData.bankerUpMoneyLimit + "元",
                    "callback": () => {
                        game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
                    },
                    "callbackObject": this,
                    "okBitmapLabelPath": "bt_charge_now_png",
                    "tipsType": TipsType.OnlyOk,
                    "effectType": 0
                })
                return;
            }
            if (this.isSelfBanker) {
                CommonUtil.noticeMsg("已是庄家，不能上庄！");
                return;
            }
            FqzsRequest.requestUpBanker(1);
        }

        public onDownBanker() {
            FqzsSoundPlayer.instance.playTouch();
            if (this.isSelfBanker) {
            } else {
                TipsUtils.showTipsFromCenter("下庄成功");
            }
            FqzsRequest.requestDownBanker();
        }

        public onPlayerList() {
            FqzsSoundPlayer.instance.playTouch();
            FqzsRequest.requestPlayerBank(0);
        }

        public onGoldAdd() {
            FqzsSoundPlayer.instance.playTouch();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.FQZS);
        }

        public initScene() {
            this.isStart = true;
            if (this.isInit) {
                this.init();
            }
        }

        public init() {
            this.chooseChip();
            this.updatePlayerInfo();
            FqzsRequest.requestRoundInfo(0);
        }

        public chooseChip() {
            var gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
            switch (gameLevel) {
                case 1:
                    this.customBetNums = this.level0BetNums;
                    this.gameLevelLabel.text = '普通场';
                    break;
                case 2:
                    this.customBetNums = this.level1BetNums;
                    this.gameLevelLabel.text = '高级场';
                    break;
                case 3:
                    this.customBetNums = this.level2BetNums;
                    this.gameLevelLabel.text = '富豪场';
                    break;
            }
            for (var i = 0; i < this.betBtnArr.length; i++) {
                var level = gameLevel;
                var betSource = "fqzs_battle_json.level" + level + "_chip_" + (i + 1);

                this.betBtnArr[i].showButton(betSource);
                this.betBtnArr[i].canChoose = false;
            }
            this.prevCache = [];
            this.cacheBet = [];
        }

        public showTimeMc(num = '20'): void {
            if (this.timeAmin == null) {
                // console.log('new showTimeMc 333333333333 ', num);
                this.timeAmin = new game.CommonDBLoop2("fqzs_number_ske_dbbin", "fqzs_number_tex_json", "fqzs_number_tex_png", "armature" + num, true);
                this.addChild(this.timeAmin);
                this.timeAmin.x = (this.width / 2) + 2;
                this.timeAmin.y = 28;
                this.timeAmin.touchEnabled = false;
                this.timeAmin.touchChildren = false;
                this.timeAmin.playAnim("armature" + num);
            } else {
                // console.log('new showTimeMc 44444444444 ', num);
                this.timeAmin.playAnim("armature" + num);
                this.ceTiem = egret.getTimer();
            }
            this.timeAmin.visible = true;
        }

        private endTime: number;
        private lastTime = -1;
        private ceTiem = -1;
        public startCountDown(time: number): void {
            if (this.endTime > -1) {
                this.stop();
            }
            // console.log('startCountDown 22222222222222 ', time, Math.floor((egret.getTimer() - this.ceTiem) / 1000));
            this.endTime = Math.floor(egret.getTimer() / 1000) + time;
            if (this.timeAmin) this.timeAmin.visible = false;

            this.showTimeMc(time.toString());
            egret.startTick(this.showTime, this);
        }

        public stop(): void {
            this.endTime = 0;
            this.showTimeMc("0");
            egret.stopTick(this.showTime, this);
        }

        private showTime(timestamp: number): boolean {
            let time = this.endTime - Math.floor(timestamp / 1000);
            if (time <= -1) {
                this.stop();
            } else {
                if (this.lastTime != -1 && this.lastTime > time) {
                    //播放倒计时音效
                    if (time <= 5 && this.currStatus == FQStatus.startBet) FqzsSoundPlayer.instance.playCountDown();
                    if (this.timeAmin) this.timeAmin.visible = false;
                    this.showTimeMc(time.toString());
                }
                this.lastTime = time;
            }
            return true;
        }

        private selectedBetButton(event: egret.TouchEvent) {
            FqzsSoundPlayer.instance.playTouch();
            var index = this.betBtnArr.indexOf(event.currentTarget);
            if (index > -1) {
                this.selectedBetButtonByIndex(index);
            }
        }

        private selectedBetButtonByIndex(index: number) {
            for (var i = 0; i < this.betBtnArr.length; i++) {
                if (i == index) {
                    this.betBtnArr[i].openLight(i);
                    this.currBetButton = this.betBtnArr[i];
                } else {
                    this.betBtnArr[i].closeLight();
                }
            }
        }

        public updatePlayerInfo() {
            let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
            if (roomData == null) {
                return;
            }
            //初始化头像
            for (let i = 0; i < roomData.playerInfos.length; i++) {
                let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
                this.fqzsData.addPlayer(playerInfo);
                if (playerInfo.postion == 0) {
                    this.bankerheadImg.source = "gp_head_" + (playerInfo.headNum + 1);
                    this.bankergoldLabel.text = CommonUtil.fixMoneyFormat(Number(playerInfo.money));
                    // if (playerInfo.nickName.length > 4) {
                    //     this.bankernameLabel.text = playerInfo.nickName.substring(0, 3) + "...";
                    // } else {
                    this.bankernameLabel.text = playerInfo.nickName;
                    // }

                    //更新庄家状态
                    if (playerInfo.playerId == UserService.instance.playerId) {
                        this.upBanker.visible = this.robBanker.visible = false;
                        this.downBanker.visible = !this.upBanker.visible;
                        this.isSelfBanker = true;
                    } else {
                        this.upBanker.visible = this.robBanker.visible = true;
                        this.downBanker.visible = !this.upBanker.visible;
                        this.isSelfBanker = false;
                    }
                } else if (playerInfo.playerId == UserService.instance.playerId) {
                    this.headImg.source = "gp_head_" + (playerInfo.headNum + 1);
                    this.goldLabel.text = CommonUtil.fixMoneyFormat(playerInfo.money);
                    // if (playerInfo.nickName.length > 4) {
                    //     this.bankernameLabel.text = playerInfo.nickName.substring(0, 3) + "...";
                    // } else {
                    this.nameLabel.text = playerInfo.nickName;
                    // }

                    this.tempBetGold = playerInfo.money;
                }
            }
            this.playerLabel.text = roomData.onlineCount + '';
            this.refreshBtnState();

            if (this.timeAmin == null) {
                this.timeAmin = new game.CommonDBLoop2("fqzs_number_ske_dbbin", "fqzs_number_tex_json", "fqzs_number_tex_png", "armature20", false);
                this.addChild(this.timeAmin);
                this.timeAmin.x = (this.width / 2) + 2;
                this.timeAmin.y = 28;
                this.timeAmin.touchEnabled = false;
                this.timeAmin.touchChildren = false;
                this.timeAmin.visible = false;
            }

            //换房间清理
            this.ResumScene();
        }

        private getBetButtonValue(betButton): number {
            switch (betButton) {
                case this.betButton1: {
                    return this.customBetNums[0];
                }
                case this.betButton10: {
                    return this.customBetNums[1];
                }
                case this.betButton50: {
                    return this.customBetNums[2];
                }
                case this.betButton100: {
                    return this.customBetNums[3];
                }
                case this.betButton500: {
                    return this.customBetNums[4];
                }
                case this.betButton1000: {
                    return this.customBetNums[5];
                }
            }
            return 0;
        }

        private startStakeTap(event: egret.TouchEvent) {
            FqzsSoundPlayer.instance.playTouch();
            var buttonValue = this.getBetButtonValue(this.currBetButton);

            if (this.currStatus != FQStatus.startBet) {
                TipsUtils.showTipsFromCenter("请稍等，还没到下注时间！");
                return
            }

            //没选择筹码和自己是庄家 返回
            if (this.currBetButton == null || this.isSelfBanker == true) {
                return;
            }

            var typeBetInfo: eui.Image;
            for (var i = 0; i < this.betTouch.length; i++) {
                typeBetInfo = this.betTouch[i];
                if (event.currentTarget == typeBetInfo) {
                    this.flashImage(typeBetInfo);
                    this.refreshBtnState();
                    if (this.tempBetGold < buttonValue) {
                        TipsUtils.showTipsFromCenter("当前金币不足！");
                        return
                    }
                    //直接飞筹码
                    var buttonType = i + 1;
                    this.tempBetGold -= buttonValue;
                    this.tempBetGold = Math.max(0, this.tempBetGold);
                    this.fqzsData.getPlayerById(UserService.instance.playerId).money = this.tempBetGold;
                    this.goldLabel.text = CommonUtil.fixMoneyFormat(this.tempBetGold);
                    this.stakeEffect(UserService.instance.playerId, buttonType, buttonValue);
                    FqzsRequest.SendBets(buttonType, buttonValue);
                    this.cacheBet.push({ buttonType, buttonValue });
                    this.refreshBtnState();
                    break;
                }
            }

        }

        private flashImage(img: eui.Image, loop: boolean = false) {
            if (!img || img == null) {
                return;
            }
            img.alpha = 1;
            egret.Tween.removeTweens(img);
            egret.Tween.get(img).to({ alpha: 0 }, 500).call(() => {
                img.alpha = 0;
                if (loop == true) {
                    this.flashImage(img, loop);
                }
            }, this);
        }

        /** 更新按钮状态 */
        public updateBanker(data) {
            console.log('updateBanker === ', data);
            if (data.bankerPlayerid == UserService.instance.playerId) {
                this.upBanker.visible = this.robBanker.visible = false;
                this.downBanker.visible = !this.upBanker.visible;
                TipsUtils.showTipsFromCenter("申请成功！");
                this.refreshBtnState();
            }
            this.upBankerNum.text = '申请人数：' + data.bankerInfos.length;
        }

        /** 更新下庄 */
        public downBankers(data) {
            console.log('downBankers === ', UserService.instance.playerId, data);
            if (data.bankerPlayerid == UserService.instance.playerId) {
                if (this.isSelfBanker) {
                    if (this.isSwitchBanker != true) TipsUtils.showTipsFromCenter("申请成功,下局下庄");
                } else {
                    TipsUtils.showTipsFromCenter("下庄成功");
                    this.upBanker.visible = this.robBanker.visible = true;
                    this.downBanker.visible = !this.upBanker.visible;
                }
            } else {
                if (data.bankerInfos.length > 0) {
                    this.upBanker.visible = this.robBanker.visible = true;
                    this.downBanker.visible = !this.upBanker.visible;
                    for (var i = 0; i < data.bankerInfos.length; i++) {
                        if (data.bankerInfos[i].playerId == UserService.instance.playerId) {
                            this.upBanker.visible = this.robBanker.visible = false;
                            this.downBanker.visible = !this.upBanker.visible;
                        }
                    }
                }
            }

            this.upBankerNum.text = '申请人数：' + data.bankerInfos.length;
        }

        /** 更新状态 */
        public pushBattleStatus(data, first = false) {
            // console.log("CurrStatus === " + this.currStatus, data.downTime);
            this.currStatus = <FQStatus>data.status;
            this.statusTips.alpha = 1;
            this.continueBtn.enabled = false;

            for (var i = 1; i < this.betTouch.length; i++) {
                egret.Tween.removeTweens(this.betTouch[i]);
                this.betTouch[i].alpha = 0;
            }
            switch (this.currStatus) {
                case FQStatus.prepared:
                    this.tipImage.source = "fqzs_battle_json.fqzs_recount_tips_1";
                    this.statusTips.source = "";
                    this.startCountDown(data.downTime);
                    if (this.battleFinish != null && this.battleFinish.parent != null) PopUpManager.removePopUp(this.battleFinish);
                    if (this.waitAmin != null && this.waitAmin.parent != null) this.waitAmin.parent.removeChild(this.waitAmin);
                    this.ResumScene();
                    egret.Tween.removeAllTweens();
                    this.betContainer.removeChildren();
                    this.betHashInit();
                    //空闲清空下注状态
                    FqzsData.isSelfStake = false;
                    //空闲房间清理
                    if (this.fqzsData) this.fqzsData.clearRecortTypeBet();
                    break;
                case FQStatus.startBet:
                    this.tipImage.source = "fqzs_battle_json.fqzs_recount_tips_2";
                    if (!first) {
                        this.statusTips.source = "fqzs_battle_json.startBet";
                        FqzsSoundPlayer.instance.playStartBet();
                    }
                    this.startCountDown(data.downTime);
                    if (this.currBetButton == null && this.validateBetButton(this.betBtnArr[0])) {
                        this.selectedBetButtonByIndex(0);
                    }
                    if (this.currBetButton != null && this.validateBetButton(this.currBetButton)) {
                        var index = this.betBtnArr.indexOf(this.currBetButton);
                        this.currBetButton.openLight(index);
                    } else {
                        if (this.currBetButton) this.currBetButton.closeLight();
                    }

                    let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
                    roomData.status = game.GameStatus.RUNNING;

                    if (this.cacheBet.length > 0) this.prevCache = this.cacheBet;
                    let tempGold = 0
                    for (let data of this.prevCache) {
                        tempGold += data.buttonValue;
                    }
                    if (this.prevCache.length > 0 && this.isSelfBanker == false && this.tempBetGold >= tempGold) this.continueBtn.enabled = true;
                    this.cacheBet = [];
                    break;
                case FQStatus.stopBet:
                    this.tipImage.source = "fqzs_battle_json.fqzs_recount_tips_3";
                    if (!first) {
                        this.statusTips.source = "fqzs_battle_json.stopBet";
                        FqzsSoundPlayer.instance.playStopBet();
                    }
                    this.startCountDown(data.downTime);
                    break;
            }
            this.refreshBtnState();
            if (data.isSwitchBanker == true) {
                FqzsSoundPlayer.instance.playBankerChange();
                this.statusTips.source = "fqzs_battle_json.switchBanker";
            }
            this.isSwitchBanker = data.isSwitchBanker;
            egret.Tween.get(this.statusTips).wait(2000).to({ alpha: 0 }, 500).call(() => {
                this.isSwitchBanker = false;
                this.statusTips.source = "";
            }, this);
        }

        public ResumScene() {
            this.clearAllTimeOut();

            this.flashImage(this.resultBox, false);
            this.selectedBetButtonByIndex(0);
            if (this.battleFinish != null && this.battleFinish.parent != null) PopUpManager.removePopUp(this.battleFinish);
            for (var i = 1; i < this.betTouch.length; i++) {
                this.betTouch[i].alpha = 0;
            }
            for (var i = 0; i < 12; i++) {
                if (this.stakeArr[i]) {
                    this.stakeArr[i].text = '0';
                    this.stakeArr[i].visible = false;
                }
                if (this.myStakeArr[i]) {
                    this.myStakeArr[i].text = '0';
                    this.myStakeArr[i].visible = false;
                }
            }

            for (var i = 0; i < this.frameArr.length; i++) {
                this.frameArr[i].alpha = 0;
            }

            this.myResult.visible = false;
            this.myResult.y = 630;
            this.playerResult.visible = false;
            this.playerResult.y = 550;
            this.bankResult.visible = false;
            this.bankResult.y = 12;

            this.tempTotalStake = 0;

            this.count = 0;
        }

        /** 首次进入房间 */
        public firstEnterRoom(data) {
            CommonUtil.setNextFrameCall(() => {
                if (this.betTouch[1].width > 100) {
                    this.nextTickExec(data);
                } else {
                    this.firstEnterRoom(data);
                }
            }, this);
        }

        private nextTickExec(data: any) {
            console.log("firstEnterRoom === ", data);
            this.pushBattleStatus(data, true);
            let roomStakeInfo = data.roomStakeInfo;
            let myStakeInfo = data.myStakeInfo;
            // console.log('serialNumber ============== ', data.serialNumber, this.curGameRound);
            //每个下注值
            if (data.serialNumber == this.curGameRound && this.fqzsData) {
                // 补充不足的金币
                this.handleDeltaBet(roomStakeInfo, 0)
                this.handleDeltaBet(myStakeInfo, UserService.instance.playerId)
            } else {
                this.betContainer.removeChildren();
                this.showInitBetByNewRound(roomStakeInfo, 0);
                this.showInitBetByNewRound(myStakeInfo, UserService.instance.playerId);
            }
            this.curGameRound = data.serialNumber;

            FqzsData.isSelfStake = false;
            for (var i = 0; i < 12; i++) {
                if (this.stakeArr[i] && i != 0 && roomStakeInfo.length > 0 && roomStakeInfo[i].value != null) {
                    this.stakeArr[i].text = roomStakeInfo[i].value + '';
                    this.stakeArr[i].visible = true;
                }
                if (this.myStakeArr[i] && i != 0 && myStakeInfo.length > 0 && myStakeInfo[i].value != null) {
                    this.myStakeArr[i].text = myStakeInfo[i].value + '';
                    if (myStakeInfo[i].value > 0) {
                        this.myStakeArr[i].visible = true;
                        FqzsData.isSelfStake = true;
                    }
                }
            }

            if (this.currStatus == FQStatus.stopBet) {
                this.onfastBattleFinish(data.BattleFinsh);
            }
            this.upBankerNum.text = '申请人数：' + data.upBankerNum;
            FqzsData.bankerUpMoneyLimit = data.upBankerMinMoney;
            this.tempTotalStake = data.totalStake;
            this.totalStake.text = data.totalStake + '';
            this.totalStake.visible = true;
            //我为庄家 切换上庄按钮状态
            if (data.isBanker) {
                this.upBanker.visible = this.robBanker.visible = false;
                this.downBanker.visible = !this.upBanker.visible;
                this.isSelfBanker = true;
                this.refreshBtnState();
            }
        }

        /** 再次进入房间的筹码 */
        public handleDeltaBet(data: any, playerId) {
            var value;
            var type;
            for (let stake of data) {
                if (stake.value == 0) {
                    continue;
                }
                type = stake.type;
                value = stake.value - this.fqzsData.getRecordTypeBet(type);

                // console.log('handleDeltaBet == ', value, stake.value, this.fqzsData.getRecordTypeBet(type));
                this.fqzsData.recordTypeBetInfo(type, value);
                var betInfo = this.betTouch[type - 1];
                this.firstEnterRoomBet(value, type, betInfo, playerId);
            }
        }

        /** 首次进入房间的筹码 */
        private showInitBetByNewRound(data, playerId) {
            var stake;
            var value;
            var type;
            for (let i = 0; i < data.length; i++) {
                stake = data[i];
                if (stake.value == 0) {
                    continue;
                }
                value = stake.value;
                type = stake.type;
                var betInfo = this.betTouch[type - 1];
                this.fqzsData.recordTypeBetInfo(type, value);

                this.firstEnterRoomBet(value, type, betInfo, playerId);
            }
        }

        private firstEnterRoomBet(value, type, to, playerId) {
            var betBtn;
            var betMulArr = this.customBetNums;
            for (var i = betMulArr.length - 1; i >= 0; i--) {
                var betNum = Math.floor(value / betMulArr[i]);
                if (betNum > 0) {
                    for (var k = 0; k < betNum; k++) {
                        betBtn = this.betButtonFactory(playerId, type, betMulArr[i]);
                        this.betContainer.addChild(betBtn);
                        betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, (this.customBetNums.indexOf(betMulArr[i]) + 1));
                        betBtn.x = to.localToGlobal().x + (betBtn.width / 2) + Math.random() * (to.width - betBtn.width);
                        betBtn.y = to.localToGlobal().y + (betBtn.height / 2) + betBtn.height + Math.random() * (to.height - betBtn.height * 2);
                        if (type == 11) {
                            betBtn.x = to.localToGlobal().x + (betBtn.width / 2) + Math.random() * (to.width - betBtn.width - 80);
                            betBtn.y = to.localToGlobal().y + (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
                        }
                        if (type == 12) {
                            betBtn.x = to.localToGlobal().x + 100 + Math.random() * (to.width - betBtn.width - 100);
                            betBtn.y = to.localToGlobal().y + (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
                        }
                        this.betHash[(type - 1)].push(betBtn);
                    }
                }
                value -= betMulArr[i] * betNum;
            }
        }

        //1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.格子 8.燕子 9.孔雀  10.老鹰 11 走兽 12.飞禽 13.通吃 14包赔
        public UpdateHistory(data) {
            var group: eui.Group;
            var img: eui.Image;
            while (this.resultGroup.numChildren > 0) {
                this.resultGroup.removeChildAt(0);
            }
            this.resultScroller.verticalScrollBar.thumb.visible = false;
            for (var i = 0; i < data.type.length; i++) {
                img = new eui.Image;
                img.source = "fqzs_battle_json.animal_" + data.type[i];
                img.x = 2;
                if (i != data.type.length - 1) {
                    this.resultGroup.addChild(img);
                } else {
                    group = new eui.Group;
                    group.width = group.height = 52;
                    this.resultGroup.addChild(group);
                    this.resultBox = new eui.Image;
                    this.resultBox.y = -8;
                    this.resultBox.source = "fqzs_battle_json.resultBox";
                    group.addChild(this.resultBox)
                    this.flashImage(this.resultBox, true);
                    group.addChild(img);
                }
            }
            this.resultGroup.validateNow();
            this.resultGroup.validateSize();
            // console.log("scrollV == ", this.resultGroup.contentHeight, this.resultScroller.viewport.height, this.resultScroller.viewport.height);
            this.resultScroller.viewport.scrollV = this.resultGroup.contentHeight - this.resultScroller.viewport.height;
        }

        public onStakeRet(data) {
            if (this.fqzsData) {
                this.fqzsData.recordTypeBetInfo(data.type, data.value)
            }

            if (data.value == 0) {
                this.myStakeArr[i].text = data.myStakeInfo[i].value;
                return;
            }

            for (var i = 0; i < 12; i++) {
                if (this.stakeArr[i] && i != 0 && i == data.type - 1) {
                    this.stakeArr[i].text = data.totalValue + '';
                    this.stakeArr[i].visible = true;
                }
                if (data.playerId == UserService.instance.playerId) {
                    if (this.myStakeArr[i] && i != 0 && i == data.type - 1) {
                        let mytempNum = Number(this.myStakeArr[i].text) + data.value;
                        this.myStakeArr[i].text = mytempNum + '';
                        this.myStakeArr[i].visible = true;
                        FqzsData.isSelfStake = true;
                    }
                }
            }
            if (data.playerId != UserService.instance.playerId) {
                let betBtn = this.stakeEffect(data.playerId, data.type, data.value);
            }
            this.tempTotalStake += data.value;
            this.totalStake.text = this.tempTotalStake + '';
            this.totalStake.visible = true;
        }

        private stakeEffect(playerId, type, betNum) {
            if (type == 0 || type == null) {
                console.log("type =================== null");
                return;
            }

            var count = 0;
            let from: egret.DisplayObject = this.playerListBtn;
            let fromPos: egret.Point = from.localToGlobal(0, 0);
            if (playerId == UserService.instance.playerId) {
                from = this.betBtnArr[this.betBtnArr.indexOf(this.currBetButton)];
                fromPos = from.localToGlobal(from.width / 2, from.height / 2);
                count = 0;
            } else {
                from = this.playerListBtn;
                fromPos = from.localToGlobal(from.width / 2, from.height / 2);
                this.count++;
                count = this.count;
            }
            var to = this.betTouch[type - 1];
            var betBtn = this.betButtonFactory(playerId, type, betNum);
            this.betContainer.addChild(betBtn);
            betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, (this.customBetNums.indexOf(betNum) + 1));
            let offsetX = Math.random() * (to.width - betBtn.width) + (betBtn.width / 2);
            let offsetY = Math.random() * (to.height - betBtn.height * 2) + (betBtn.height / 2) + betBtn.height;
            if (type == 11) {
                offsetX = (betBtn.width / 2) + Math.random() * (to.width - betBtn.width - 80);
                offsetY = (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
            }
            if (type == 12) {
                offsetX = 100 + Math.random() * (to.width - betBtn.width - 100);
                offsetY = (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
            }

            fromPos = betBtn.parent.globalToLocal(fromPos.x, fromPos.y);
            betBtn.x = fromPos.x;
            betBtn.y = fromPos.y;

            this.flyBetBtn(betBtn, offsetX, offsetY, from, to);

            return betBtn;
        }

        private flyBetBtn(betBtn, offsetX, offsetY, from, to, remove = false, save = true) {
            betBtn.randomRotation();
            let point = to.localToGlobal(offsetX, offsetY);
            egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, 1000, egret.Ease.quartOut).call(() => {
                if (betBtn.stage) FqzsSoundPlayer.instance.playCoin();
                if (remove && betBtn.parent != null) {
                    betBtn.parent.removeChild(betBtn);
                }
                if (save) this.betHash[(betBtn.type - 1)].push(betBtn);
            }, this);
        }

        private flyBetBtnByPlayerFocus(betBtn, offsetX, offsetY, from, to, addTime: number, isSound: boolean = true, remove = true) {
            if (!to) return;
            let point = to.localToGlobal(to.width / 2, to.height / 2);
            if (betBtn.parent) {
                point = betBtn.parent.globalToLocal(point.x, point.y);
                egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, addTime, egret.Ease.backIn).call(() => {
                    if (betBtn.stage && isSound) {
                        console.log('flyBetBtnByPlayerFocus ===============');
                        FqzsSoundPlayer.instance.playCoin();
                    }
                    if (remove && betBtn.parent != null) {
                        betBtn.parent.removeChild(betBtn);
                    }
                }, this);
            }
        }

        private flyBetBtntoPlayer(betBtn, offsetX, offsetY, from, to, addTime: number, isSound: boolean = true, save = true) {
            betBtn.randomRotation();
            let point = to.localToGlobal(offsetX, offsetY);
            egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, addTime, egret.Ease.quartOut).call(() => {
                if (betBtn.stage && isSound) {
                    console.log('flyBetBtnByPlayerFocus ===============');
                    FqzsSoundPlayer.instance.playCoin();
                }
                if (save) this.betHash[(betBtn.type - 1)].push(betBtn);
            }, this);
        }

        //1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14包赔 (3-6是走兽，7-10是飞禽)
        public showWinMc(num = '0'): void {
            FqzsRequest.requestRoundInfo(0);
            FqzsSoundPlayer.instance.playWinType(num);
            var winName = 'fqzs_win_' + num
            this.winAmin = new game.CommonDB(winName + "_ske_dbbin", winName + "_tex_json", winName + "_tex_png", "start", 1600);
            this.addChild(this.winAmin);
            this.winAmin.x = this.width / 2;
            this.winAmin.y = this.height / 2;
            this.winAmin.touchChildren = false;
            this.winAmin.touchEnabled = false;
        }

        public showWaitMc(): void {
            if (this.waitAmin == null) {
                this.waitAmin = new game.CommonDBLoop("fqzs_wait_ske_dbbin", "fqzs_wait_tex_json", "fqzs_wait_tex_png", "waitAnim");
                this.addChild(this.waitAmin);
                this.waitAmin.x = this.width / 2;
                this.waitAmin.y = this.height / 2;
                this.waitAmin.touchChildren = false;
                this.waitAmin.touchEnabled = false;
            } else {
                this.addChild(this.waitAmin);
            }
        }

        private onfastBattleFinish(data) {
            if (FqzsData.isSelfStake == true) {
                this.resultTips(data);
                if (this.battleFinish == null) {
                    this.battleFinish = new FqzsResultPanel;
                }
                PopUpManager.addPopUp(this.battleFinish, true);
                this.battleFinish.showResult(data, this.nameLabel.text);
            } else {
                this.showWaitMc();

                for (var i = 0; i < this.frameArr.length; i++) {
                    this.frameArr[i].alpha = 0;
                }
                let win = this.getPosByWinType(data.winType, data.random);
                this.frameArr[win].alpha = 1;

                var edgeWin: number = 0;
                // 1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14包赔 (3-6是走兽，7-10是飞禽) 11走兽 12飞禽
                if (data.winType == 3 || data.winType == 4 || data.winType == 5 || data.winType == 6) {
                    edgeWin = 11;// 11走兽
                }
                if (data.winType == 7 || data.winType == 8 || data.winType == 9 || data.winType == 10) {
                    edgeWin = 12;// 12飞禽
                }
                this.flashImage(this.betTouch[data.winType - 1], true);
                this.flashImage(this.betTouch[edgeWin - 1], true);
            }
        }

        /** 游戏结果 */
        public onBattleFinish(data) {
            console.log("onBattleFinish === " + data.winType);
            //上一局的中奖 为0随机
            if (this.lastWinType == 0) {
                this.lastWinType = CommonUtil.RandomRangeInt(0, this.frameArr.length);
            }
            let lap = CommonUtil.RandomRangeInt(1, 2)
            let newWinType = this.frameArr.length * lap + this.getPosByWinType(data.winType, data.random) - this.lastWinType + 1;
            if (newWinType - this.lastWinType < this.frameArr.length) {
                newWinType = this.frameArr.length * (lap + 1) + this.getPosByWinType(data.winType, data.random) - this.lastWinType + 1;
            }
            let self = this;
            let pointer = 0;
            let acc = 0;
            let acc2 = 0;
            let stime = 200;
            let maxStime = 100;
            let max = false
            for (var i = 0; i < newWinType; i++) {
                if (max) {
                    if (i >= newWinType - 8) {
                        acc2 += 0.5
                        acc += acc2;
                        stime += acc;
                    }
                } else {
                    acc++;
                    stime -= acc;
                    if (stime <= maxStime) {
                        max = true;
                        acc = 0;
                    }
                }
                this.registerTimeout(function () {
                    let win = pointer + self.lastWinType;
                    win = win % self.frameArr.length;
                    self.flashImage(self.frameArr[win]);
                    if (self.frameArr[win].stage) FqzsSoundPlayer.instance.playSkip();
                    pointer++;
                    if (pointer == newWinType) {
                        egret.Tween.removeTweens(self.frameArr[win]);
                        self.frameArr[win].alpha = 1;
                        self.lastWinType = win;
                        self.showWinMc(data.winType);
                        self.registerTimeout(function () {
                            self.flyLoseBet(data);
                        }, 1600);
                    }
                }, i * stime);
            }

        }

        //飞输的筹码
        private flyLoseBet(data) {
            var from: egret.DisplayObject;
            var to: egret.DisplayObject;
            var betBtn: FqzsBetButton;
            var edgeWin: number = 0;
            // 1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14包赔 (3-6是走兽，7-10是飞禽) 11走兽 12飞禽
            if (data.winType == 3 || data.winType == 4 || data.winType == 5 || data.winType == 6) {
                edgeWin = 11;// 11走兽
            }
            if (data.winType == 7 || data.winType == 8 || data.winType == 9 || data.winType == 10) {
                edgeWin = 12;// 12飞禽
            }

            this.flashImage(this.betTouch[data.winType - 1], true);
            this.flashImage(this.betTouch[edgeWin - 1], true);

            for (var i = 0; i < this.betHash.length; i++) {
                if (this.betHash[i] && this.betHash[i].length > 0) {
                    let space = this.betHash[i].length > 30 ? 5 : 10;
                    for (let j = 0; j < this.betHash[i].length; j++) {
                        betBtn = this.betHash[i][j];
                        if (betBtn.type == data.winType || betBtn.type == edgeWin || data.winType == 14) {
                        } else {
                            to = this.bankerheadImg;
                            from = this.betTouch[i];

                            this.flyBetBtnByPlayerFocus(betBtn, 0, 0, from, to, 400 + i * 50 + space * j);
                        }
                    }
                }
                if (i == (this.betHash.length - 1)) {
                    // console.log('flyLoseBet === ', i, this.betHash.length - 1);
                    this.registerTimeout(function () {
                        this.flyWinBet(data);
                    }, 1500);
                }
            }
        }

        //飞赢的筹码
        private flyWinBet(data) {
            var from: egret.DisplayObject;
            var to: egret.DisplayObject;
            var betBtn: FqzsBetButton;
            var edgeWin: number = 0;
            // 1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14通赔 (3-6是走兽，7-10是飞禽) 11走兽 12飞禽
            if (data.winType == 3 || data.winType == 4 || data.winType == 5 || data.winType == 6) {
                edgeWin = 11;// 11走兽
            }
            if (data.winType == 7 || data.winType == 8 || data.winType == 9 || data.winType == 10) {
                edgeWin = 12;// 12飞禽
            }

            let count = 0;
            let maxCount = 40;
            for (var i = 0; i < this.betHash.length; i++) {
                if (this.betHash[i] && this.betHash[i].length > 0) {
                    //14通赔 每个下注值发最多10个筹码
                    if (data.winType == 14) {
                        count = 0;
                        maxCount = 10;
                    }
                    let space = this.betHash[i].length > 30 ? 5 : 10;
                    for (let j = 0; j < this.betHash[i].length; j++) {
                        betBtn = this.betHash[i][j];
                        if (betBtn.type == data.winType || betBtn.type == edgeWin || data.winType == 14) {//14通赔
                            count++;
                            if (count > maxCount) break;
                            var newBetBtn = this.betButtonFactory(betBtn.playerId, betBtn.type, betBtn.betNum);
                            this.betContainer.addChild(newBetBtn);
                            from = this.bankerheadImg;
                            var fromPos: egret.Point = from.localToGlobal(0, 0);
                            to = this.betTouch[i];

                            newBetBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, (this.customBetNums.indexOf(betBtn.betNum) + 1));
                            newBetBtn.x = from.localToGlobal().x;
                            newBetBtn.y = from.localToGlobal().y;
                            let offsetX = Math.random() * (to.width - betBtn.width) + (betBtn.width / 2);
                            let offsetY = Math.random() * (to.height - betBtn.height * 2) + (betBtn.height / 2) + betBtn.height;
                            if (i == 10) {
                                offsetX = (betBtn.width / 2) + Math.random() * (to.width - betBtn.width - 80);
                                offsetY = (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
                            }
                            if (i == 11) {
                                offsetX = 100 + Math.random() * (to.width - betBtn.width - 100);
                                offsetY = (betBtn.height / 2) + Math.random() * (to.height - betBtn.height - 10);
                            }

                            this.flyBetBtntoPlayer(newBetBtn, offsetX, offsetY, from, to, 550 + space * i);
                        }
                    }
                }
                if (i == this.betHash.length - 1) {
                    // console.log('flyWinFinish === ', i, this.betHash.length - 1);
                    this.registerTimeout(function () {
                        this.flyPosBet(data);
                        this.flashImage(this.betTouch[data.winType - 1]);
                        this.flashImage(this.betTouch[edgeWin - 1]);
                    }, 1500);
                }
            }
        }

        //飞对应位置筹码(自己或者玩家)
        private flyPosBet(data) {
            var from: egret.DisplayObject;
            var to: egret.DisplayObject;
            var betBtn: FqzsBetButton;

            for (var i = 0; i < this.betHash.length; i++) {
                if (this.betHash[i] && this.betHash[i].length > 0) {
                    let space = this.betHash[i].length > 30 ? 5 : 10;
                    for (let j = 0; j < this.betHash[i].length; j++) {
                        betBtn = this.betHash[i][j];
                        if (betBtn.playerId == UserService.instance.playerId) {
                            to = this.headImg;
                        } else {
                            to = this.playerListBtn;
                        }
                        from = this.betTouch[i];
                        this.flyBetBtnByPlayerFocus(betBtn, 0, 0, from, to, 550 + space * i);
                    }
                }
                if (i == (this.betHash.length - 1)) {
                    // console.log('flyPosBet === ', i, this.betHash.length - 1);
                    this.registerTimeout(function () {
                        for (var i = 0; i < this.frameArr.length; i++) {
                            this.frameArr[i].alpha = 0; 1
                        }
                        this.resultTips(data);
                        if (this.battleFinish == null) {
                            this.battleFinish = new FqzsResultPanel;
                        }
                        PopUpManager.addPopUp(this.battleFinish, true);
                        this.battleFinish.showResult(data, this.nameLabel.text);
                    }, 1000);
                }
            }
        }

        private resultTips(data) {
            this.myResult.visible = false;
            this.playerResult.visible = false;
            this.bankResult.visible = false;
            if (data.otherCosMoney != null && data.otherCosMoney != 0) {
                this.playerResult.visible = true;
                this.playerResult.font = RES.getRes(data.otherCosMoney > 0 ? "fqzs_win_fnt" : "fqzs_lose_fnt");
                this.playerResult.text = (Number(data.otherCosMoney) > 0 ? "+" : "") + Number(data.otherCosMoney).toFixed(2);
                egret.Tween.get(this.playerResult).to({ y: this.playerResult.y - 30 }, 2500).wait(2000).call(() => {
                    this.playerResult.y += 30;
                    this.playerResult.visible = false;
                }, this);
            }
            if (data.battleInfo != null) {
                for (var i = 0; i < data.battleInfo.length; i++) {
                    if (data.battleInfo[i].playerId == UserService.instance.playerId) {
                        let totalMoney = Math.max(data.battleInfo[i].totalMoney, this.fqzsData.getPlayerById(UserService.instance.playerId).money);
                        this.goldLabel.text = CommonUtil.fixMoneyFormat(totalMoney);
                        this.tempBetGold = data.battleInfo[i].totalMoney;
                        if (data.battleInfo[i].money != null && data.battleInfo[i].money != 0) {
                            this.myResult.visible = true;
                            this.myResult.font = RES.getRes(data.battleInfo[i].money < 0 ? "fqzs_lose_fnt" : "fqzs_win_fnt");
                            this.myResult.text = (Number(data.battleInfo[i].money) > 0 ? "+" : "") + Number(data.battleInfo[i].money).toFixed(2);
                            egret.Tween.get(this.myResult).to({ y: this.myResult.y - 30 }, 2500).wait(2000).call(() => {
                                this.myResult.y += 30;
                                this.myResult.visible = false;
                            }, this);
                        }
                    }
                    this.bankergoldLabel.text = CommonUtil.fixMoneyFormat(Number(data.battleInfo[0].totalMoney));
                    if (data.battleInfo[0].money != null && data.battleInfo[0].money != 0) {
                        this.bankResult.visible = true;
                        this.bankResult.font = RES.getRes(data.battleInfo[0].money < 0 ? "fqzs_lose_fnt" : "fqzs_win_fnt");
                        this.bankResult.text = (Number(data.battleInfo[0].money) > 0 ? "+" : "") + Number(data.battleInfo[0].money).toFixed(2);
                        egret.Tween.get(this.bankResult).to({ y: this.bankResult.y - 30 }, 2500).wait(2000).call(() => {
                            this.bankResult.y += 30;
                            this.bankResult.visible = false;
                        }, this);
                    }

                }
            }
        }

        //1.金鲨  2.银鲨 3. 兔子 4.猴子 5.狮子 6.熊猫 7.鸽子 8.燕子 9.孔雀  10.老鹰  13.通吃 14包赔 (3-6是走兽，7-10是飞禽)
        public getPosByWinType(winType: number, random: number): number {
            let imgId: number = 0;
            let tempArr = [];
            switch (winType) {
                case 1:
                    break;
                case 2:
                    imgId = 19;
                    break;
                case 3:
                    tempArr = [6, 7, 8];
                    imgId = tempArr[random - 1];
                    break;
                case 4:
                    tempArr = [9, 10, 11];
                    imgId = tempArr[random - 1];
                    break;
                case 5:
                    tempArr = [16, 17, 18];
                    imgId = tempArr[random - 1];
                    break;
                case 6:
                    tempArr = [13, 14, 15];
                    imgId = tempArr[random - 1];
                    break;
                case 7:
                    tempArr = [1, 28, 27];
                    imgId = tempArr[random - 1];
                    break;
                case 8:
                    tempArr = [2, 3, 4];
                    imgId = tempArr[random - 1];
                    break;
                case 9:
                    tempArr = [23, 24, 25];
                    imgId = tempArr[random - 1];
                    break;
                case 10:
                    tempArr = [20, 21, 22];
                    imgId = tempArr[random - 1];
                    break;
                case 13:
                    imgId = 12;
                    break;
                case 14:
                    imgId = 26;
                    break;
            }
            // console.log('imgId === ' + imgId);

            if (imgId != 0) {
                return imgId - 1;
            } else {
                return null;
            }
        }

        public betButtonFactory(playerId, type, betNum): FqzsBetButton {
            var betBtn = new FqzsBetButton();
            betBtn.enabled = false;
            betBtn.touchEnabled = false;
            betBtn.touchChildren = false;
            betBtn.anchorOffsetX = betBtn.width / 2;
            betBtn.anchorOffsetY = betBtn.height / 2;
            betBtn.betNum = betNum;
            betBtn.type = type;
            betBtn.playerId = playerId;
            return betBtn;
        }

        public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
            this.tempBetGold += drawmoney;
            if (this.currStatus == FQStatus.stopBet) {
                this.fqzsData.getPlayerById(UserService.instance.playerId).money = totalmoney;
            }
            this.goldLabel.text = CommonUtil.fixMoneyFormat(totalmoney);
            this.refreshBtnState();
        }

        private refreshBtnState() {
            let avaliableArr = [];
            if (this.currStatus == FQStatus.startBet && this.isSelfBanker == false) {
                for (let btn of this.betBtnArr) {
                    let v = this.getBetButtonValue(btn);
                    if (this.tempBetGold < v) {
                        btn.canChoose = false;
                    } else if (this.tempBetGold >= v) {
                        btn.canChoose = true;
                        avaliableArr.push(btn);
                    }
                }
                if (this.betBtnArr.indexOf(this.currBetButton) > (avaliableArr.length - 1)) {
                    if (avaliableArr.length > 0) {
                        this.selectedBetButtonByIndex(avaliableArr.length - 1);
                    }
                } else {
                    this.selectedBetButtonByIndex(this.betBtnArr.indexOf(this.currBetButton));
                }
                let xuyaNeedValue = 0;
                for (let p of this.prevCache) {
                    xuyaNeedValue += p.buttonValue;
                }
                if (this.tempBetGold < xuyaNeedValue) {
                    this.continueBtn.enabled = false;
                } else {
                    if (this.continueBtn.enabled == false && this.cacheBet.length == 0 && this.prevCache.length > 0) {
                        this.continueBtn.enabled = true;
                    }
                }
            } else {
                for (let btn of this.betBtnArr) {
                    btn.canChoose = false;
                }
                this.continueBtn.enabled = false;
            }

        }

        //续押
        private onContinueButton(event: egret.TouchEvent) {
            FqzsSoundPlayer.instance.playTouch();
            for (let data of this.prevCache) {
                this.tempBetGold -= data.buttonValue;
                this.tempBetGold = Math.max(0, this.tempBetGold);
                this.fqzsData.getPlayerById(UserService.instance.playerId).money = this.tempBetGold;
                this.goldLabel.text = CommonUtil.fixMoneyFormat(this.tempBetGold);
                this.refreshBtnState();
                this.stakeEffect(UserService.instance.playerId, data.buttonType, data.buttonValue);
                FqzsRequest.SendBets(data.buttonType, data.buttonValue);
                let buttonType = data.buttonType;
                let buttonValue = data.buttonValue;
                this.cacheBet.push({ buttonType, buttonValue });
            }
            this.continueBtn.enabled = false;
        }

        private timeoutIdList: Array<number> = [];
        /** 寄存器 */
        private registerTimeout(func: Function, time: number): void {
            var holder: any = this;
            var timeOutId: number = egret.setTimeout(function () {
                func.call(holder);
                let index: number = this.timeoutIdList.indexOf(timeOutId);
                if (index >= 0) {
                    this.timeoutIdList.splice(index, 1);
                }
            }, this, time);
            this.timeoutIdList.push(timeOutId);
        }

        public clearAllTimeOut(): void {
            if (this.timeoutIdList.length > 0) {
                for (let timeOutId of this.timeoutIdList) {
                    egret.clearTimeout(timeOutId);
                }
                this.timeoutIdList = [];
            }
        }

        private validateBetButton(betButton): boolean {
            let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
            if (roomData.gameLevel > 0) {
                if (this.tempBetGold >= this.getBetButtonValue(betButton)) {
                    return true;
                }
            } else {
                if (this.fqzsData != null && this.fqzsData.getPlayerById(UserService.instance.playerId) != null && this.fqzsData.getPlayerById(UserService.instance.playerId).money >= this.getBetButtonValue(betButton)) {
                    return true;
                }
            }
            return false;
        }

        public onBanker() {
            let p = this.bankerheadImg.localToGlobal(
                this.bankerheadImg.width,
                this.bankerheadImg.height);
            let roomData = RoomManager.getInstance().curRoomData;
            game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, { pos: p, gameType: roomData.gameType });
        }
    }
}