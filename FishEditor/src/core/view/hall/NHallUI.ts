module game {
    export class NHallUI extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/Hall/HallUI.exml";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        }
        private chargeGroup: eui.Group;
        private chargeParticle: particle.GravityParticleSystem;
        public noticeScrollText: NoticeScrollText;
        //个人信息
        private moneyLabel: eui.Label;
        private safeLabel: eui.Label;
        private headImg :eui.Image;
        // 右上功能按钮区
        private qiandaoGroup: eui.Group;
        public zhuceGroup: eui.Group;
        // 主图标区域
        private rightGroup: eui.Group;
        private topRightGroup: eui.Group;
        private gameGroup: eui.Group;
        private headGroup: eui.Group;

        private duorenAnim: DragonAnim;
        private duorenMaskRect: eui.Rect;
        private qipaiAnim: DragonAnim;
        private qipaiMaskRect: eui.Rect;

        private gamePokerGroup: eui.Group;
        private gameDuorenGroup: eui.Group;
        private gameByGroup: eui.Group;
        private gameJiejiGroup: eui.Group;
        private gameGroupArr: Array<eui.Group>;

        //游戏图标区域
        public gameIconsScroller: eui.Scroller;
        private qipaiGameGroup: eui.Group;
        private jiejiGameGroup: eui.Group;
        private multiPlayerGameGroup: eui.Group;
        private byGameGroup: eui.Group;
        private multiInnerGroup:eui.Group;
        private qipaiBtnArr: Array<GameIcon> = [];
        private jiejiBtnArr: Array<GameIcon> = [];
        private duorenBtnArr: Array<GameIcon> = [];
        private byArr: Array<GameIcon> = [];
        public qznn: GameIcon;
        public ddz: GameIcon;
        public zjh: GameIcon;
        public lhdz: GameIcon;
        public pdk: GameIcon;
        public hhdz: GameIcon;
        public ermj: GameIcon;
        public bjl: GameIcon;
        public dzpk: GameIcon;
        public brnn: GameIcon;
        public fruit: GameIcon;
        public tgpd: GameIcon;
        public duobao: GameIcon;
        public hlsb: GameIcon;
        public by: GameIcon;
        public bcbm: GameIcon;
        public fqzs: GameIcon;
        public allGameIcons: Array<GameIcon>;
        private backToMainBtn: IButton;
        // 右侧功能按钮
        private kefuBtn: IButton;
        private rankBtn: IButton;
        private rankClick: eui.Group;
        private bankBtn: IButton;
        private exchangeBtn: IButton;
        private noticeBtn: IButton;
        private rightFuncArr: Array<IButton>;
        private rightBtnGroup: eui.Group;
        // gamecorner
        private gameCornerGroup: eui.Group;
        private gameCornerImg: eui.Image;


        private goldenImg: eui.Image;
        private bankerImg: eui.Image;

        private quickStartGroup: eui.Group;

        private paopaoLizi: particle.GravityParticleSystem;
        private guangdian: particle.GravityParticleSystem;
        private particleGroup: eui.Group;

        private nameLabel: eui.Label;

        private addMoneyBtn: IButton;
        private recordArr:Array<egret.Point> = [];


        private addStage() {
            game.NetConnectionUI.hide();
            this.refreshGameIcons();
            this.checkGameAreaScroller();
            this.recordArr = [
                new egret.Point(this.gamePokerGroup.x, this.gamePokerGroup.y),
                new egret.Point(this.gameByGroup.x, this.gameByGroup.y),
                new egret.Point(this.gameDuorenGroup.x, this.gameDuorenGroup.y),
                new egret.Point(this.gameJiejiGroup.x, this.gameJiejiGroup.y),
                new egret.Point(this.rightGroup.x, this.rightGroup.y),
            ]
        }

        private checkGameAreaScroller() {
            let w = Math.max(Global.designRect.x, this.stage.stageWidth);
            w = Math.min(1624, w);
            this.gameIconsScroller.width = w;
            this.qipaiGameGroup.width = this.jiejiGameGroup.width = this.byGameGroup.width = w;
            if(egret.lifecycle.stage.stageWidth <= Global.designRect.x) {
                this.multiPlayerGameGroup.horizontalCenter = undefined;
                this.multiInnerGroup.horizontalCenter = undefined;
            } else {
                this.multiPlayerGameGroup.horizontalCenter = 0;
                this.multiInnerGroup.horizontalCenter = 0;
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.chargeParticle = new particle.GravityParticleSystem(RES.getRes("charge_p_png"), RES.getRes("charge_p_json"));
            this.chargeParticle.start();
            this.chargeGroup.addChild(this.chargeParticle);
            this.chargeParticle.x = this.chargeGroup.width / 2;
            this.chargeParticle.y = this.chargeGroup.height;
            // 游戏图标区域
            if (this.gameIconsScroller.horizontalScrollBar != null) {
                this.gameIconsScroller.horizontalScrollBar.autoVisibility = false;
                this.gameIconsScroller.horizontalScrollBar.visible = false;
            }
            if (this.gameIconsScroller.verticalScrollBar != null) {
                this.gameIconsScroller.verticalScrollBar.autoVisibility = false;
                this.gameIconsScroller.verticalScrollBar.visible = false;
                this.gameIconsScroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            }

            this.qipaiBtnArr = [this.ddz, this.pdk, this.qznn, this.dzpk, this.ermj, this.zjh];
            this.jiejiBtnArr = [this.fruit, this.tgpd, this.duobao];
            this.duorenBtnArr = [this.brnn, this.hlsb, this.bjl, this.hhdz, this.lhdz, this.bcbm, this.fqzs];
            this.byArr = [this.by];
            this.allGameIcons = [this.qznn, this.ddz, this.zjh, this.lhdz, this.pdk, this.hhdz, this.ermj, 
                this.bjl, this.dzpk, this.brnn, this.fruit, this.tgpd, 
                this.duobao, this.hlsb, this.by, this.bcbm, this.fqzs];
            for (let gameIcon of this.allGameIcons) {
                gameIcon.refresh();
            }
            for (var i = 0; i < this.qipaiBtnArr.length; i++) {
                if (i == this.qipaiBtnArr.length - 1) {
                    this.qipaiBtnArr[i].setNextLineNode(this.qipaiBtnArr[0]);
                }
                else {
                    this.qipaiBtnArr[i].setNextLineNode(this.qipaiBtnArr[i + 1]);
                }
            }
            for (var i = 0; i < this.jiejiBtnArr.length; i++) {
                if (i == this.jiejiBtnArr.length - 1) {
                    this.jiejiBtnArr[i].setNextLineNode(this.jiejiBtnArr[0]);
                }
                else {
                    this.jiejiBtnArr[i].setNextLineNode(this.jiejiBtnArr[i + 1]);
                }
            }
            for (var i = 0; i < this.duorenBtnArr.length; i++) {
                if (i == this.duorenBtnArr.length - 1) {
                    this.duorenBtnArr[i].setNextLineNode(this.duorenBtnArr[0]);
                }
                else {
                    this.duorenBtnArr[i].setNextLineNode(this.duorenBtnArr[i + 1]);
                }
            }
            this.addMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBankPanel, this);
            this.goldenImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBankPanel, this);
            this.bankerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBankPanel, this);
            this.gameDuorenGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMultiGames, this);
            this.gamePokerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenQipaiGames, this);
            this.gameJiejiGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenJiejiGames, this);
            this.backToMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackToMainTap, this);
            this.zhuceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZhuceGroupTap, this);
            this.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenChargePanel, this);
            this.kefuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tempOpenDiceBao, this);
            this.rankClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenRankUI, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBankPanel, this);
            this.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchangePanel, this);
            this.noticeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenNoticePanel, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuick, this);
            this.headGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenUserInfo, this);
            this.qiandaoGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQiandaoGroup, this);
            this.gameByGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenByGames, this);
            this.rightFuncArr = [this.kefuBtn, this.rankBtn, this.bankBtn, this.exchangeBtn, this.noticeBtn];
            this.gameGroupArr = [this.gameDuorenGroup, this.gamePokerGroup, this.gameByGroup, this.jiejiGameGroup];
            if (this.isOutOfDesign()) {
                this.rightGroup.right = 90 * this.getOutOfDesignScale();
                this.headGroup.left = 90 * this.getOutOfDesignScale();
                this.topRightGroup.right = 90 * this.getOutOfDesignScale();
            } else {
                this.rightGroup.right = this.topRightGroup.right = 10;
                this.headGroup.left = 10;
            }
            this.backToMainBtn.visible = false;
            this.gameCornerGroup.visible = false;
            this.cornerY = this.gameCornerGroup.y;

            this.duorenAnim.mask = this.duorenMaskRect;
            this.qipaiAnim.mask = this.qipaiMaskRect;
            var texture = RES.getRes("hallpaopao_png");
            var config = RES.getRes("hallpaopao_json");
            this.paopaoLizi = new particle.GravityParticleSystem(texture, config);
            this.paopaoLizi.start();
            this.particleGroup.addChild(this.paopaoLizi);
            texture = RES.getRes("guangdian_png");
            config = RES.getRes("guangdian_json");
            this.guangdian = new particle.GravityParticleSystem(texture, config);
            this.guangdian.start();
            this.particleGroup.addChild(this.guangdian);
            this.refreshPlayerInfo();
            game.NetConnectionUI.hide();

            if (UserService.instance.isFormal) {
                this.zhuceGroup.visible = false;
            } else {
                this.zhuceGroup.visible = true;
            }

            // this.createTextField();
        }

        private createTextField() {
             var text:egret.TextField = new egret.TextField();
            text.textColor = 0xffffff;
            text.width = 540;
            text.size = 30;
            text.lineSpacing = 40;
            
            /*** 本示例关键代码段开始 ***/
            //设置文本的混合样式
            text.textFlow = <Array<egret.ITextElement>>[
                {text: "妈妈再也不用担心我在", style: {"size": 20}}, 
                {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
                {text: "里说一句话不能包含", style: {"fontFamily": "楷体"}},
                {text: "各种", style: {"fontFamily": "楷体", "underline" : true}},
                {text: "五", style: {"textColor": 0xff0000}},
                {text: "彩", style: {"textColor": 0x00ff00}},
                {text: "缤", style: {"textColor": 0xf000f0}},
                {text: "纷", style: {"textColor": 0x00ffff}},
                {text: "、\n"},
                {text: "大", style: {"size": 56}},
                {text: "小", style: {"size": 16}},
                {text: "不", style: {"size": 26}},
                {text: "一", style: {"size": 34}},
                {text: "、"},
                {text: "格", style: {"italic": true, "textColor": 0x00ff00}},
                {text: "式", style: {"size": 26, "textColor": 0xf000f0}},
                {text: "各", style: {"italic": true, "textColor": 0xf06f00}},
                {text: "样的文字", style: {"fontFamily": "KaiTi"}},//楷体
                {text: "了！"}
            ];
            /*** 本示例关键代码段结束 ***/
            this.addChild(text);
            text.x = 320 - text.textWidth / 2;
            text.y = 400 - text.textHeight / 2;
        }

        private onTestBtnTap() {
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.ZJH, 0);
        }

        private refreshInfo() {
            this.nameLabel.text = UserService.instance.name;
        }

        private onOpenUserInfo() {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_USERINFO_PANEL);
        }
        private onQiandaoGroup() {
            TipsUtils.showTipsFromCenter("敬请期待");
        }
        private onGameByGroup() {
            TipsUtils.showTipsFromCenter("敬请期待");
        }

        private onQuick() {
            game.QuickStart.instance.quickStart();
        }

        private onZhuceGroupTap() {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_REGISTER_PANEL);
        }

        // //test
        // private onBcbmTestPanel(event){
        //     ModuleLoader.getInstance().loadRes(game.ChildGameType.BCBM, this.openGameTruely, this);
            
        // }


        private onOpenBankPanel(event) {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_PANEL);
        }
        private onOpenChargePanel(event) {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
        }
        private onOpenNoticePanel(event: egret.TouchEvent) {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BULLETIN_PANEL);
        }
        private onOpenRankUI(event: egret.TouchEvent) {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_RANK_PANEL);
        }
        private onExchangePanel(event: eui.UIEvent) {
            if (UserService.instance.isFormal) {
                game.AppFacade.instance.sendNotification(PanelNotify.OPEN_EXCHANGE_PANEL);
            } else {
                game.AppFacade.instance.sendNotification(PanelNotify.OPEN_REGISTER_PANEL);
                 TipsUtils.showTipsFromCenter("请先注册成为正式用户！");
            }
        }

        public refreshPlayerInfo() {
            let user = UserService.instance;
            this.headImg.source = "gp_head_" + (user.headNum + 1);
            this.moneyLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.safeLabel.text = CommonUtil.fixMoneyFormat(user.bankMoney);
            this.nameLabel.text = user.name;
        }

        private hideAllGames(): void {
            this.qipaiGameGroup.visible = false;
            this.jiejiGameGroup.visible = false;
            this.multiPlayerGameGroup.visible = false;
            this.byGameGroup.visible = false;
            for (let a of this.qipaiBtnArr) {
                a.clearAnim();
            }
            for (let a of this.jiejiBtnArr) {
                a.clearAnim();
            }
            for (let a of this.duorenBtnArr) {
                a.clearAnim();
            }
        }

        private tempOpenDiceBao() {
            // ModuleLoader.getInstance().loadRes(game.ChildGameType.DiceBao, this.openGameTruely, this);
            UserRequest.sendNoticeList();
        }
        private openGameTruely(gameType: game.ChildGameType): void {
            if (ResLoading.instance && ResLoading.instance.stage) {
                ResLoading.instance.parent.removeChild(ResLoading.instance);
            }
            if (gameType == game.ChildGameType.DiceBao) {
                if (AppFacade.getInstance().retrieveMediator(tb.TbStartPanelMediator.NAME) == null) {
                    AppFacade.getInstance().registerMediator(new tb.TbStartPanelMediator());
                }
                if (AppFacade.getInstance().retrieveMediator(tb.TbBattleMediator.NAME) == null) {
                    AppFacade.getInstance().registerMediator(new tb.TbBattleMediator());
                }
                AppFacade.instance.sendNotification(PanelNotify.OPEN_TB_START_UI);
            }

            // if (gameType == game.ChildGameType.BCBM) {
            //     if (AppFacade.getInstance().retrieveMediator(game.bcbm.BcbmRoomMediator.NAME) == null) {
            //         AppFacade.getInstance().registerMediator(new game.bcbm.BcbmRoomMediator());
            //     }
            //     if (AppFacade.getInstance().retrieveMediator(game.bcbm.BcbmBattleMediator.NAME) == null) {
            //         AppFacade.getInstance().registerMediator(new game.bcbm.BcbmBattleMediator());
            //     }
            //     // if (AppFacade.getInstance().retrieveMediator(tb.TbBattleMediator.NAME) == null) {
            //     //     AppFacade.getInstance().registerMediator(new tb.TbBattleMediator());
            //     // }
            //     AppFacade.instance.sendNotification(PanelNotify.OPEN_BCBM_ROOM_UI);
            // }
        }
        private showMainOperations(show: boolean) {
            this.rightGroup.visible = show;
            this.gameGroup.visible = show;
            this.gameIconsScroller.visible = !show;
            this.backToMainBtn.visible = !show;
        }

        private originX: number = 0;
        private originY: number = 0;
        private curGameGroup: eui.Group;
        private curBtnArr: Array<GameIcon>;
        private cornerY: number = 0;

        private tweenCorner(): void {
            this.gameCornerGroup.visible = true;
            this.gameCornerGroup.y = this.cornerY - 138;
            egret.Tween.get(this.gameCornerGroup).to({ y: this.cornerY }, 1500, egret.Ease.elasticOut);
        }

        private onOpenQipaiGames() {
            this.hideAllGames();
            this.curGameGroup = this.qipaiGameGroup;
            this.curBtnArr = this.qipaiBtnArr;
            this.gameCornerImg.source = "gpn_qipai_corner";
            this.tweenCorner();
            this.openGameShow();
            this.showMainOperations(false);
            SoundMenager.instance.playEffect("gameClick_mp3")
        }

        private openGameShow() {
            this.originY = this.backToMainBtn.y;
            this.backToMainBtn.y = -100;
            this.backToMainBtn.touchEnabled = false;
            this.qiandaoGroup.visible = false;
            this.zhuceGroup.visible = false;
            egret.Tween.get(this.backToMainBtn).to({ y: this.originY }, 500);
            this.curGameGroup.visible = true;
            this.curGameGroup.touchChildren = false;
            this.curGameGroup.touchEnabled = false;
            this.originX = this.curGameGroup.x;
            
            if(this.curGameGroup == this.multiPlayerGameGroup) {
                this.multiPlayerGameGroup.horizontalCenter = 600;
                egret.Tween.get(this.curGameGroup).to({ horizontalCenter: 0 }, 800, egret.Ease.backOut).call(() => {
                    this.backToMainBtn.touchEnabled = true;
                    this.curGameGroup.touchChildren = true;
                    this.curGameGroup.touchEnabled = true;
                    for (let a of this.curBtnArr) {
                        a.enableAnim();
                    }
                    this.curBtnArr[0].beginAnimPlay();
                }, this);
            } else {
                this.curGameGroup.x = 600;
                egret.Tween.get(this.curGameGroup).to({ x: this.originX }, 800, egret.Ease.backOut).call(() => {
                    this.backToMainBtn.touchEnabled = true;
                    this.curGameGroup.touchChildren = true;
                    this.curGameGroup.touchEnabled = true;
                    for (let a of this.curBtnArr) {
                        a.enableAnim();
                    }
                    this.curBtnArr[0].beginAnimPlay();
                }, this);
            }
            
            let index = 0;
            for (let icon of this.curBtnArr) {
                index++;
                icon.alpha = 0;
                egret.setTimeout(function () {
                    egret.Tween.get(icon).to({ alpha: 1 }, 100);
                }, this, index * 80);
            }
        }

        private onOpenJiejiGames() {
            this.hideAllGames();
            this.curGameGroup = this.jiejiGameGroup;
            this.curBtnArr = this.jiejiBtnArr;
            this.gameCornerImg.source = "gpn_jieji_corner";
            this.tweenCorner();
            this.openGameShow();
            this.showMainOperations(false);
              SoundMenager.instance.playEffect("gameClick_mp3")
        }

        private onOpenMultiGames() {
            this.hideAllGames();
            this.curGameGroup = this.multiPlayerGameGroup;
            this.curBtnArr = this.duorenBtnArr;
            this.gameCornerImg.source = "gpn_duoren_corner";
            this.tweenCorner();
            this.openGameShow();
            this.showMainOperations(false);
            this.gameIconsScroller.viewport.scrollH = 0;
              SoundMenager.instance.playEffect("gameClick_mp3")
        }

        private onOpenByGames() {
            this.hideAllGames();
            this.curGameGroup = this.byGameGroup;
            this.curBtnArr = this.byArr;
            this.gameCornerImg.source = "gpn_by_corner";
            this.tweenCorner();
            this.openGameShow();
            this.showMainOperations(false);
              SoundMenager.instance.playEffect("gameClick_mp3")
        }

        private onBackToMainTap() {
            // 先播放动画
            for (let i = this.curBtnArr.length - 1; i >= 0; i--) {
                let icon = this.curBtnArr[i];
                icon.alpha = 1;
                egret.setTimeout(function () {
                    egret.Tween.get(icon).to({ alpha: 0 }, 80);
                }, this, (this.curBtnArr.length - 1) * 50);
            }
            /*
            this.touchEnabled = false;
            this.touchChildren = false;
            */
           if(this.curGameGroup == this.multiPlayerGameGroup) {
                this.multiPlayerGameGroup.horizontalCenter = 0;
                egret.Tween.get(this.curGameGroup).to({ horizontalCenter: 600 }, 500).call(this.showMain, this);
            } else {
                egret.Tween.get(this.curGameGroup).to({ x: 600 }, 500).call(this.showMain, this);
            }
            egret.Tween.get(this.backToMainBtn).to({ y: -100 }, 500);
            egret.Tween.removeTweens(this.gameCornerGroup);
            egret.Tween.get(this.gameCornerGroup).to({ y: -138 }, 500);
        }

        private ox1: number = 0;
        private ox2: number = 0;
        private ox3: number = 0;
        private ox4: number = 0;
        private oy1: number = 0;
        private gameox: number = 0;
        private showMain(): void {
            this.curGameGroup.x = this.originX;
            this.backToMainBtn.y = this.originY;
            this.hideAllGames();
            this.qiandaoGroup.visible = true;
            if (UserService.instance.isFormal) {
                this.zhuceGroup.visible = false;
            } else {
                this.zhuceGroup.visible = true;
            }
            this.showMainOperations(true);
            this.rightBtnGroup.x = 130;
            this.gameox = this.gameGroup.x;
            this.gameGroup.x = this.gameGroup.x - 150;
            egret.Tween.get(this.rightBtnGroup).to({ x: 0 }, 1500, egret.Ease.elasticOut);
            egret.Tween.get(this.gameGroup).to({ x: this.gameox }, 1500, egret.Ease.elasticOut).call(() => {
                this.touchEnabled = true;
                this.touchChildren = true;
            }, this);
            for (let rf of this.rightFuncArr) { rf.alpha = 0 };
            for (let i = 0; i < this.rightFuncArr.length; i++) {
                CommonUtil.registerTimeOut(this.twAlpha, this.rightFuncArr[i], 100 * i);
            }
            for (let rf of this.gameGroupArr) { rf.alpha = 0 };
            for (let i = 0; i < this.gameGroupArr.length; i++) {
                CommonUtil.registerTimeOut(this.twAlpha, this.gameGroupArr[i], 100 * i);
            }
        }

        private showMainForceDirect() {
            
        }

        private twAlpha() {
            egret.Tween.get(this).to({ alpha: 1 }, 200);
        }

        public refreshGameIcons(): void {
            if (!this.allGameIcons) return;
            for (let gameIcon of this.allGameIcons) {
                if (gameIcon) {
                    gameIcon.refresh();
                }
            }
        }

        public showGameWaitDownload(gameType: number): void {
            for (let gameIcon of this.allGameIcons) {
                if (gameIcon.game == gameType) {
                    gameIcon.showProgress(0, 100);
                }
            }
        }

        private getGameIcon(gameType: game.ChildGameType): GameIcon {
            for (let gameIcon of this.allGameIcons) {
                if (gameIcon.game == gameType) {
                    return gameIcon;
                }
            }
            return null;
        }

        public showUpdateProgress(downloadInfo: DownloadInfo): void {
            var gameIcon: GameIcon = this.getGameIcon(downloadInfo.gameType);
            if (gameIcon) {
                gameIcon.showProgress(downloadInfo.downloadedSize, downloadInfo.totalSize);
            }
            if (downloadInfo.complete) {
                gameIcon.completeUpdate();
            }
        }

        public updateHeadIcon(data: any) {
            var iconIndex = data.number;
            if (data.type == 1) {
                this.headImg.source = "gp_head_" + (iconIndex + 1);
            }
        }
        public updateName() {
            this.nameLabel.text = game.UserService.instance.name;
        }
    }
}