module game.duobao {
    export class DuoBaoBattleUI extends GameScene implements eui.UIComponent {
        private recordStartTime: number;
        private startCheckId: number;
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/duobao/duobaoBattle.exml";
            this.gameType = ChildGameType.DUOBAO;
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected componentInit(): void {
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
            this.betAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetAdd, this);
            this.betSubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetSub, this);
            this.lineAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLineAdd, this);
            this.lineSubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLineSub, this);
            this.boxGroupArr = [this.rightBoxGroup, this.leftBoxGroup, this.bottomBoxGroup];
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartBegin, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onStartCancel, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartEnd, this);
            this.tuoguanCancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoPlayClick, this);
            this.leijiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openLeijiUI, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
            this.addGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
            this.duobaoMachine = new DuobaoMachine();
            this.gameArea.addChild(this.duobaoMachine);
            this.duobaoMachine.y = this.gameArea.height;
            this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "db_btn_down", "db_btn_up");
            // this.duobaoMachine.mask = this.gameAreaMask;
            // this.drawMask();
            this.init();
        }

        private openLeijiUI() {
            this.leijiHelpUI = new DBLeijiHelpUI();
            PopUpManager.addPopUp(this.leijiHelpUI, true, 0, 0, 1);
        }

        private openBank() {
            SoundMenager.instance.PlayClick();
            if (DuobaoData.instance.gameLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DUOBAO)
        }

        private onLineAdd(): void {
            let newCur: number = DuobaoData.instance.lineValue + 1;
            if (newCur > 5) {
                return;
            }
            egret.log("我点击了 ");
            this.betLineLabel.text = newCur.toFixed(0);
            DuobaoRequest.sendLineValue(newCur);
        }

        private onLineSub(): void {
            let newCur: number = DuobaoData.instance.lineValue - 1;
            if (newCur <= 0) {
                return;
            }
            DuobaoRequest.sendLineValue(newCur);
        }
        private onBetAdd(): void {
            let line: number = DuobaoData.instance.betValue + 1;
            if (line > 5) {
                this.betAddBtn.enabled = false;
                return;
            }
            DuobaoRequest.sendBetValue(line);
        }
        private onBetSub(): void {
            let line: number = DuobaoData.instance.betValue - 1;
            if (line > 0) {
                this.betSubBtn.enabled = false;
                DuobaoRequest.sendBetValue(line);
            }
        }

        protected onOpen() {
            this.playCurtainUpAnim();
            this.menuGroup.showDeault();
            this.isRunning = false;
            this.runningEnd = false;
            this.enableStartBtn();
            this.refreshGameLevel();
            this.startDragonAnim();
            this.showLevelTips(true);
            this.refreshPlayerInfo();
            // this.doorEffect(null, null);
        }

        public updateBattle(){
            this.congraAnimGroup.visible = false;     
            this.menuGroup.showDeault();
            this.refreshGameLevel();
            this.showLevelTips(true);
            this.refreshPlayerInfo();
            this.dbRewardItemArr = [];
            this.hideRoundWinAnim();
            this.refreshBox();   
            this.playCurtainUpAnim();
        }

        public refreshGameLevel(): void {
            if (DuobaoData.instance.gameLevel == 0) {
                this.roomImg.source = "db_tiyan";
            } else {
                this.roomImg.source = "db_putong";
            }
            console.warn("===========\n" + this.roomImg.source + "\n===========\n" + this.roomImg.visible);
        }
        public updateTotalWinMoney() {
            this.totalWinMoneyLabel.text = DuobaoData.instance.winMoney.toFixed(2);
        }

        public showRoundWinAnim() {
            let duobaoData = DuobaoData.instance;
            let curWinMoney = duobaoData.curWinMoney;
            if (curWinMoney != 0) {
                let multi = duobaoData.lineValue * duobaoData.betValue;
                let level = duobaoData.gameLevel;
                let isBaofu: boolean = (curWinMoney >= multi * 10);
                this.roundWinAnim.showWin(curWinMoney.toFixed(2), isBaofu);
                if(isBaofu){
                    this.baofuDragonAnim();
                }
            }
        }
        public hideRoundWinAnim() {
            this.roundWinAnim.clearWin();
        }

        private startDragonAnim() {
            let animArr = ["animation1", "animation3", "animation4", "animation5"];
            let anim = animArr[CommonUtil.RandomRangeInt(0, animArr.length - 1)];
            this.dragonAnim.playAnim(animArr[0]);
            this.dragonAnimClaw.playAnim(animArr[1]);
            //super.setTimeOut(this.startDragonAnim, 3000);
        }
        private baofuDragonAnim(){
            let animArr = ["animation1", "animation3", "animation4", "animation5"];
            this.dragonAnim.playerOnce(this.startDragonAnim, this, animArr[2]);
            this.dragonAnimClaw.playerAnimOnce(animArr[3]);                        
        }

        private showHistory() {
            RoomRequest.reqZJCXInfo(ChildGameType.DUOBAO);
        }

        public drawMask() {
            var maskShape = new egret.Shape();
            this.addChild(maskShape);
            maskShape.graphics.beginFill(0);
            maskShape.graphics.drawRect(this.gameArea.x, this.gameArea.y, this.gameArea.width, this.gameArea.height);
            maskShape.graphics.endFill();
            this.duobaoMachine.mask = maskShape;
        }


        private toggleSettingGroup(): void {
            // this.settingGroup.visible = !this.settingGroup.visible;
        }

        private leftBoxGroup: eui.Group;
        private rightBoxGroup: eui.Group;
        private bottomBoxGroup: eui.Group;

        //累积奖
        private accumulateLabel: eui.BitmapLabel;
        //总游戏币(弃用)
        private totalGameCoinLabel: eui.Label;
        //本场游戏币
        private winGameCoinLabel: eui.Label;
        //押注线条
        private betLineLabel: eui.Label;
        //单线分数
        private singleLineScoreLabel: eui.Label;
        private rewardCurTotalLabel: eui.BitmapLabel;
        private playerNameLabel: eui.Label;
        private playerMoneyLabel: eui.BitmapLabel;
        private vipLevel: eui.BitmapLabel;
        private layerImg: eui.Image;

        private winAddMoneyLabel: eui.Label;

        private tuoguanBtn: IButton
        private tuoguanCancelBtn: IButton;
        private startBtn: IButton;
        private testBtn: eui.Button;
        private bankBtn: eui.Button;

        private betAddBtn: IButton;
        private lineAddBtn: IButton;
        private lineSubBtn: IButton;
        private betSubBtn: IButton;
        private betProgressBar: eui.ProgressBar;

        private gameArea: eui.Group;
        private gameAreaMask: eui.Group;

        private dragonAnim: DragonAnim;
        private dragonAnimClaw: DragonAnim;
        private posuiAnim: DragonAnim;
        private levelTipsImg: eui.Image;

        private rewardShowGroup: eui.Group;
        private rewardShowScroller: eui.Scroller;
        private dbRewardItemArr: DBRewardItem[];
        private roundWinAnim: DuobaoRoundWinAnim;
        private congrateAnim: DragonAnim;
        private congraAnimGroup: eui.Group;

        private testIcon: DuobaoIcon;

        private boxGroupArr: Array<eui.Group>;
        private duobaoMachine: DuobaoMachine;

        private duobaoMenu: DuobaoMenu;
        private settingGroupBtn: eui.Button;
        private settingGroup: eui.Group;
        private settingBtn: eui.Button;
        private helpBtn: eui.Button;
        private exitBtn: eui.Button;
        private autoImg: eui.Image;
        private autoTipImg: eui.Image;
        private isRunning: boolean = false;
        private isAuto: boolean = false;
        private leijiHelpUI: DBLeijiHelpUI;
        private totalWinMoneyLabel: eui.BitmapLabel;

        private lineIcon1: DBMultiBet;
        private lineIcon2: DBMultiBet;
        private lineIcon3: DBMultiBet;
        private lineIcon4: DBMultiBet;
        private lineIcon5: DBMultiBet;

        private animGroup: eui.Group;
        private doorAnim: DragonAnim;

        // private lineIcons:Array<DBMultiBet>;

        private initAddMoneyY: number = 0;

        private leijiBtn: IButton;

        private rewardBoxArr: Array<DuobaoBox>;

        private dLevelMap: HashMap;

        private ballPos: egret.Point;

        private roomImg: eui.Image;

        private runningEnd: boolean;

        private zjBtn: eui.Button;

        private menuArrowImg: eui.Image;
        private menuContent: eui.Group;
        private menuGroup: MenuGroup;

        private addGoldBtn:eui.Button;

        public refreshBox(): void {
            for (let i = 0; i < this.boxGroupArr.length; i++) {
                this.boxGroupArr[i].removeChildren();
            }
            let duobaoData: DuobaoData = DuobaoData.instance;
            for (let i = 1; i <= this.boxGroupArr.length; i++) {
                let imgSource = i == 3 ? "db_zhuankuai2" : "db_zhuankuai";
                if (i < duobaoData.currentLayer) {
                    this.boxGroupArr[i - 1].removeChildren();
                } else if (i == duobaoData.currentLayer) {
                    let leftCount: number = duobaoData.totalPassCount - duobaoData.currentPassCount;
                    console.warn("----------refreshingbox current pass  is " + duobaoData.currentPassCount + " // totalpass is " + duobaoData.totalPassCount);
                    for (let j = 0; j < leftCount; j++) {
                        let img: eui.Image = new eui.Image();
                        img.source = imgSource;
                        if (i < 3) {
                            img.y = this.rightBoxGroup.height - j * (32);
                        } else {
                            img.x = j * (30);
                        }

                        this.boxGroupArr[i - 1].addChild(img);
                    }
                } else {
                    for (let j = 0; j < duobaoData.totalPassCount; j++) {
                        let img: eui.Image = new eui.Image();
                        img.source = imgSource;
                        if (i < 3) {
                            img.y = this.rightBoxGroup.height - j * (32);
                        } else {
                            img.x = j * (30);
                        }
                        this.boxGroupArr[i - 1].addChild(img);
                    }
                }
            }
        }

        // private isStart: boolean = false;
        // private isInit: boolean = false;
        // public initScene(){
		// 	this.isStart = true;
		// 	if(this.isInit){
		// 		this.init();
		// 	}
		// }

        public init(): void {
            let duobaoData: DuobaoData = DuobaoData.instance;

            this.levelTipsImg.visible = false;
            this.levelTipsImg.alpha = 1;
            this.animGroup.visible = false;            
            this.refreshRewardPool();
            this.updateLayerShow();
            this.refreshBox();
            this.updateAutoBtnShow();
            this.refreshLine();
            this.singleLineScoreLabel.text = DuobaoData.instance.betValue.toFixed(0);
            this.totalGameCoinLabel.text = DuobaoData.instance.totalMoney.toFixed(2);
            this.winGameCoinLabel.text = "0";
            this.winAddMoneyLabel.visible = false;
            //this.duobaoArea.visible = false;
            this.dbRewardItemArr = [];
            this.hideRoundWinAnim();
            this.animGroup.visible = false;
            this.congraAnimGroup.visible = false;
        }

        public refreshPlayerInfo() {
            this.playerNameLabel.text = UserService.instance.name;
            this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(DuobaoData.instance.totalMoney);
            this.vipLevel.text = "" + UserService.instance.vipLevel;
            console.warn("==========user money is " + UserService.instance.money + " // data money is " + DuobaoData.instance.totalMoney);
        }

        public updateLayerShow(layer:number = 0): void {
            if(layer == 0) {
                this.layerImg.source = "db_level" + DuobaoData.instance.currentLayer.toFixed(0);
            } else {
                this.layerImg.source = "db_level" + layer.toFixed(0);
            }
        }

        private onSliderChange(e: egret.Event): void {
            this.singleLineScoreLabel.text = e.data.toFixed(0);
            DuobaoRequest.sendBetValue(e.data);
        }





        public refreshStake(): void {
            this.singleLineScoreLabel.text = DuobaoData.instance.betValue.toFixed(0);
            this.betProgressBar.minimum = 0;
            this.betProgressBar.maximum = 4;
            this.betProgressBar.value = DuobaoData.instance.betValue - 1;
            this.betAddBtn.enabled = DuobaoData.instance.betValue < 5;
            this.betSubBtn.enabled = DuobaoData.instance.betValue > 1;
        }

        public refreshLine(): void {
            this.betLineLabel.text = DuobaoData.instance.lineValue.toFixed(0);
            this.lineAddBtn.enabled = DuobaoData.instance.lineValue < 5;
            this.lineSubBtn.enabled = DuobaoData.instance.lineValue > 1;
        }

        private onStartBegin(): void {
            this.recordStartTime = egret.getTimer();
            this.startCheckId = egret.setTimeout(this.updateCheckStartStatus, this, 1500);
        }

        private updateCheckStartStatus(): void {
            this.recordStartTime = 0;
            this.autoPlayClick()
            return;
        }

        private onStartCancel(): void {
            this.recordStartTime = 0;
        }

        private onStartEnd(): void {
            if (this.startCheckId > 0) {
                egret.clearTimeout(this.startCheckId);
                this.startCheckId = 0;
            }
            if (this.recordStartTime > 0) {
                if (egret.getTimer() - this.recordStartTime > 1500) {
                    this.autoPlayClick();
                } else {
                    this.startClick();
                }
            }
        }

        public startClick(): void {
            if (this.isRunning) return;
            if (DuobaoData.instance.totalMoney < DuobaoData.instance.enterMinMoney) {
                TipsUtils.moneyTipsGame2(this, DuobaoData.instance.enterMinMoney);
                this.stopAuto();
                return;
            }
            if (DuobaoData.instance.totalMoney < DuobaoData.instance.getTotalBet()) {
                TipsUtils.moneyTipsGame3(this);
                this.stopAuto();
                return;
            }

            this.isRunning = true;
            this.winGameCoinLabel.text = "0";
            DuobaoRequest.sendStartGame();
            this.disableStartBtn();
        }

        private disableStartBtn(): void {
            this.startBtn.enabled = false;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var flilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [flilter];
            this.startBtn.enabled = false;
        }

        private enableStartBtn(): void {
            this.startBtn.filters = [];
            this.startBtn.enabled = true;
        }

        private onTest() {
            // this.destoryBox();
            // this.showLevelTips();
            //测试巨龙页面
            // var data = {

            // }
            // game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DUOBAO_FINAL);

            //测试最后一轮转巨龙页面
            let reward = new DuobaoRewardPoint();
            reward.rewards = [2000, 3000, 4000, 5000, 6000];
            reward.index = 2;
            reward.totalMoney = 0;
            DuobaoData.instance.setRewardPoint(reward);
            this.treasureMotionEnd();
        }

        private blastTreasures(){
            this.duobaoMachine.blastCandys(DuobaoData.instance.duobaoMachineData);
            CommonUtil.registerTimeOut(this.playCongrateAnim, this, 1500);
        }
        private playCongrateAnim(){
            this.congraAnimGroup.visible = true;
			this.congrateAnim.playerOnce(()=>{
				this.congrateAnim.playAnim("animation2");
                CommonUtil.registerTimeOut(()=>{
                    this.animGroup.visible = true;
                    // this.congraAnimGroup.visible = false;
                    this.playCurtainDownAnim(()=>{
                        game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DUOBAO_FINAL);
                    }, this)
                }, this, 2000);
			}, this, "animation1");
        }

        private treasureMotionEnd(): void {
            this.isRunning = false;
            this.recoverLineBet();
            console.warn("---------treasureMotionEnd---------");
            if (!this.isAuto) {
                this.enableStartBtn();
                console.warn("---------treasureMotionEnd0");
            }
            //this.duobaoMachine.clear();
            if(DuobaoData.instance.currentLayer < 3) {
                if(DuobaoData.instance.currentPassCount >= DuobaoData.instance.totalPassCount){
                    this.duobaoMachine.clear();
                    game.AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_SHOW_LEVEL_TIPS);
                }
            }
            if (DuobaoData.instance.duobaoRewardPoint) {
                // this.startDuobaoBall();
                // 开始最终开奖
                console.error(DuobaoData.instance.duobaoRewardPoint);
                console.warn("---------treasureMotionEnd1");
                this.isAuto = false;
                this.enableStartBtn();

                this.blastTreasures();
                //game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DUOBAO_FINAL);
                // 取消自动
                this.isAuto = false;
                // this.tuoguanBtn.visible = !this.isAuto;
                this.tuoguanCancelBtn.visible = this.isAuto;
                // this.tuoguanBtn.filters = [];
                // this.tuoguanBtn.enabled = true;

                //更新自己的金额，和累计赢取
                // console.error("=========", DuobaoData.instance.duobaoRewardPoint.getReward())
                // this.playerMoneyLabel.text = (Number(this.playerMoneyLabel.text) + DuobaoData.instance.duobaoRewardPoint.getReward()).toFixed(2);
                // this.totalWinMoneyLabel.text = (Number(this.totalWinMoneyLabel.text) + DuobaoData.instance.duobaoRewardPoint.getReward()).toFixed(2);
                //操作dbdata数据
                let dbData = DuobaoData.instance;
                let rewardPoint = dbData.duobaoRewardPoint;
                this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(dbData.totalMoney - rewardPoint.getReward());
                this.totalWinMoneyLabel.text = (dbData.winMoney - rewardPoint.getReward()).toFixed(2);
                console.error(dbData);
                //DuobaoData.instance.duobaoRewardPoint = null;
                this.updateAutoBtnShow();
                DuobaoData.instance.currentLayer = 1;
                DuobaoData.instance.currentPassCount = 0;
                this.updateLayerShow();
                this.refreshBox();
                this.runningEnd = false;
            } else {
                this.updateTotalWinMoney();
                this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(DuobaoData.instance.totalMoney);
            }
            if (this.isAuto) {
                egret.setTimeout(() => {
                    if (!this.isAuto) return;
                    this.startClick();
                }, this, 1000);
            }

        }

        public startDuobao(): void {
            this.updateLayerShow();
            this.hideLevelTipsImg();
            // this.refreshPlayerInfo();
            this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(DuobaoData.instance.totalMoney - DuobaoData.instance.curWinMoney);
            this.duobaoMachine.showCandys(DuobaoData.instance.duobaoMachineData, this.treasureMotionEnd, this.showRoundWinAnim, this.hideRoundWinAnim, this);
            //this.clearAddMoney(); 
            this.setOperation(false);
        }

        public clear(): void {
            DuobaoData.instance.clear();
            this.isAuto = false;
            this.isRunning = false;
            this.updateLayerShow();
            this.updateAutoBtnShow();
            this.duobaoMachine.clear();
            this.clearAddMoney();
            this.hideRoundWinAnim();
            this.animGroup.visible = false;
            this.congraAnimGroup.visible = false;
            this.congrateAnim.stop();
            CommonUtil.removeTimeout(this);
        }

        public autoPlayClick(): void {
            this.isAuto = !this.isAuto;
            console.warn("=========\n" + this.isAuto + "\n=============");
            this.updateAutoBtnShow();
            if (this.isAuto && !this.isRunning) {
                this.startClick();
                console.warn("-----------1")
            }
            if (!this.isAuto && !this.isRunning) {
                this.enableStartBtn();
                console.warn("-----------1")
            }
            console.warn("=========\n" + this.isRunning + "\n=============")
        }

        private updateAutoBtnShow(): void {
            if (this.isAuto) {
                //  this.tuoguanBtn.visible = false;
                this.tuoguanCancelBtn.visible = true;
                this.autoTipImg.visible = false;
                this.autoImg.visible = true;
            } else {
                // this.tuoguanBtn.visible = false;
                // this.tuoguanBtn.filters = [];
                this.tuoguanCancelBtn.visible = false;
                this.autoTipImg.visible = true;
                this.autoImg.visible = false;
            }
        }

        public showAddMoney(data: any): void {
            // this.rewardShowScroller.verticalScrollBar.thumb.visible = false;
            this.rewardShowScroller.verticalScrollBar.thumb.visible = false;
            if (data.money == 0) {
                return;
            }
            //this.rewardShowGroup.removeChildren();
            //创建新的item对象
            let dbRewardItem = new DBRewardItem();
            let h = dbRewardItem.height;
            // console.warn(h);
            //将新item加入显示容器
            this.rewardShowGroup.addChild(dbRewardItem);

            //给item赋值
            dbRewardItem.showInfo(data.treasureId, data.money, data.eliminateCount);
            //将新item加入数组
            this.dbRewardItemArr.push(dbRewardItem);
            // if(index <= 4){
            // }
            // this.rewardShowGroup.validateNow();
            // this.rewardShowGroup.validateSize();	
            let length = this.dbRewardItemArr.length;
            if (length > 5) {
                if (length > 20) {
                    this.rewardShowGroup.removeChildAt(0);
                }
                this.rewardShowScroller.viewport.scrollV = (((length > 20) ? 20 : length) - 5) * (5 + h);
                console.warn(this.rewardShowGroup.contentHeight, this.rewardShowScroller.viewport.height)
            }
            console.warn(length);
        }

        //在每一轮点击开始后清空addmoney//弃用
        public clearAddMoney(): void {
            this.rewardShowGroup.removeChildren();
            this.dbRewardItemArr = [];
        }

        public setOperation(isEnable: boolean){
            //this.startBtn.enabled = isEnable;
            this.enableLineBet(isEnable);
        }

        private enabledArr: boolean[] = [];
        private enableLineBet(isEnable){
            this.enabledArr = [this.betAddBtn.enabled, this.betSubBtn.enabled, this.lineAddBtn.enabled, this.lineSubBtn.enabled];
            this.betAddBtn.enabled = this.betSubBtn.enabled = this.lineAddBtn.enabled = this.lineSubBtn.enabled = isEnable;            
        }
        private recoverLineBet(){
            this.refreshLine();
            this.refreshStake();
        }

        public refreshRewardPool(): void {
            /*
            let str:string = DuobaoData.instance.rewardPool.toFixed(0);
            if(str.length < 10) {
                // 补0
                let count:number = 10 - str.length;
                for(let i=0;i<count;i++) {
                    str = "0" + str;
                }
            }
            */
            this.accumulateLabel.text = DuobaoData.instance.rewardPool.toFixed(2);
        }

        // public startDuobaoBall():void {
        //     this.duobaoArea.visible = true;
        //     this.tuoguanBtn.visible = true;
        //     var colorMatrix = [
        //         0.3,0.6,0,0,0,
        //         0.3,0.6,0,0,0,
        //         0.3,0.6,0,0,0,
        //         0,0,0,1,0
        //     ];
        //     var flilter = new egret.ColorMatrixFilter(colorMatrix);
        //     this.tuoguanBtn.filters = [flilter];
        //     this.tuoguanBtn.enabled = false;
        //     this.tuoguanCancelBtn.visible = false;
        //     this.duobaoBall.x = this.ballPos.x;
        //     this.duobaoBall.y = this.ballPos.y;
        //     for(let i=0;i<DuobaoData.instance.duobaoRewardPoint.rewards.length;i++) {
        //         let reward:number = DuobaoData.instance.duobaoRewardPoint.rewards[i];
        //         this.rewardBoxArr[i].showReward(reward / 1000);
        //     }
        // }

        public refreshTotalMoney(money: number): void {
            this.totalGameCoinLabel.text = money.toFixed(2);
        }

        public onPause() {
            // 取消托管
            this.stopAuto();
            this.duobaoMachine.clear();
            this.updateAutoBtnShow();
            this.isRunning = false;
            this.hideRoundWinAnim();
            this.animGroup.visible = false;
        }

        public showLevelTips(isInit:boolean = false) {
            let layer = DuobaoData.instance.currentLayer + (isInit ? 0 : 1);
            if (layer == 1) {
                this.levelTipsImg.source = "db_level1_4";
            } else if (layer == 2) {
                this.levelTipsImg.source = "db_level2_5";
            } else if (layer == 3) {
                this.levelTipsImg.source = "db_level3_6";
            }
            egret.Tween.removeTweens(this.levelTipsImg);
            this.levelTipsImg.visible = true;
            //this.doorEffect(true);
            CommonUtil.registerTimeOut(this.hideLevelTipsImg, this, 3000);
            this.updateLayerShow(layer);
        }

        private hideLevelTipsImg() {
            egret.Tween.removeTweens(this.levelTipsImg);
            egret.Tween.get(this.levelTipsImg).to({ alpha: 0 }, 500).call(() => {
                this.levelTipsImg.visible = false;
                this.levelTipsImg.alpha = 1;
            }, this);
        }

        private doorFunc: Function = null;
        private doorFuncObj: any = null;
        public doorEffect(func: Function, funcObj: any){
            this.doorFunc = func;
            this.doorFuncObj = funcObj;
            this.animGroup.visible = true;
            this.doorAnim.playerOnce();
            CommonUtil.registerTimeOut(()=>{
                if(this.doorFunc) this.doorFunc.call(this.doorFuncObj);
            }, this, 700);            
            CommonUtil.registerTimeOut(()=>{
                this.animGroup.visible  = false;
            }, this, 3000);
        }

        private playCurtainUpAnim(){
            this.animGroup.visible = true;
            this.doorAnim.playerOnce(()=>{
                this.animGroup.visible = false;
            }, this, "animation");
            // CommonUtil.registerTimeOut(()=>{
            this.updateTotalWinMoney();
            this.refreshPlayerInfo();
            // }, this, 500);
        }

        private playCurtainDownAnim(func: Function, funcObj: any){
            this.animGroup.visible = true;
            this.doorAnim.playerOnce(()=>{
                this.animGroup.visible = false;
                func.call(funcObj);
            }, this, "animation1");
            // CommonUtil.registerTimeOut(()=>{
            //     this.animGroup.visible  = false;
            // }, this, 3000);
        }

        public onBallComplete(): void {
            this.winAddMoneyLabel.visible = true;
            this.winAddMoneyLabel.text = "+" + DuobaoData.instance.duobaoRewardPoint.getReward().toFixed(2);
            this.winAddMoneyLabel.y = this.initAddMoneyY;
            egret.Tween.get(this.winAddMoneyLabel).to({
                y: this.initAddMoneyY - 50
            }, 800).call(() => {
                this.winAddMoneyLabel.visible = false;
                this.winGameCoinLabel.text = DuobaoData.instance.duobaoRewardPoint.getReward().toFixed(2);
                this.totalGameCoinLabel.text = DuobaoData.instance.totalMoney.toFixed(2);
                //this.duobaoArea.visible = false;
                // 取消自动
                this.isAuto = false;
                // this.tuoguanBtn.visible = !this.isAuto;
                this.tuoguanCancelBtn.visible = this.isAuto;
                // this.tuoguanBtn.filters = [];
                // this.tuoguanBtn.enabled = true;
                DuobaoData.instance.duobaoRewardPoint = null;

                DuobaoData.instance.currentLayer = 1;
                DuobaoData.instance.currentPassCount = 0;
                this.updateLayerShow();
                this.refreshBox();
                this.runningEnd = false;
            }, this);
        }

        public destoryBox() {
            let index = DuobaoData.instance.currentLayer - 1;
            if (this.boxGroupArr[index].numChildren <= 0) return;
            let box: egret.DisplayObject = this.boxGroupArr[index].getChildAt(this.boxGroupArr[index].numChildren - 1);

            this.posuiAnim.visible = true;
            let p = box.parent.localToGlobal(box.x, box.y);
            let p2 = this.posuiAnim.parent.globalToLocal(p.x, p.y);
            this.posuiAnim.x = p2.x;
            this.posuiAnim.y = p2.y;
            if (index == 2) {
                this.posuiAnim.playerAnimOnce("Animation2");
            } else {
                this.posuiAnim.playerAnimOnce("Animation1");
            }
            this.boxGroupArr[index].removeChildAt(this.boxGroupArr[index].numChildren - 1);
        }

        public stopAuto() {
            this.isAuto = false;
            this.isRunning = false;
            this.enableStartBtn();
        }

        public setAuto(auto: boolean) {
            this.isAuto = auto;
            this.autoImg.visible = auto;
            this.autoTipImg.visible = !auto;
        }

        public getRewardPosition() {
            return this.totalWinMoneyLabel.parent.localToGlobal(this.totalWinMoneyLabel.x, this.totalWinMoneyLabel.y);
            // return this.rewardShowGroup.localToGlobal(50, 50);
        }

        public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
            DuobaoData.instance.totalMoney = totalmoney;
            this.refreshPlayerInfo();
        }
    }
}

