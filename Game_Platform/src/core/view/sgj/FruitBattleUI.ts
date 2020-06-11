module game.sgj {
    import FruitSetting = game.ddz.FruitSetting;

    export class FruitBattleUI extends GameScene {

        public constructor() {
            super();
            this.skinName = "resource/eui_skins/sgj/sgjBattleUI.exml";
            this.gameType = ChildGameType.FRUIT;
        }

        protected componentInit(): void {
            // this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClick, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartBegin, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onStartCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStartMoveCheck, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartEnd, this);
            this.autoGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoClick, this)
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this)
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this)
            //this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBet, this);
            //this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubBet, this);
            this._initBarY = this.startGroup.y;
            this.playerIcons = [this.playerIcon1, this.playerIcon2, this.playerIcon3, this.playerIcon4];
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackClick, this);
            this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingAudioClick, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            // this.zjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjClick, this);
            this.maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxBet, this);
            this.lineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLineChange, this);
            this.bottomBetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBet, this)
            this.fruitMachine.touchEnabled = false;
            this.fruitMachine.touchChildren = false;
            this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "nfruit_btn_down", "nfruit_btn_up");
            this.winLeftParticle = new particle.GravityParticleSystem(RES.getRes("fruit_particle_win_png"), RES.getRes("fruit_particle_win_json"));
            this.winLeftParticle.start();
            this.winLeftParticle.rotation = 180;
            this.particleLeft.addChild(this.winLeftParticle);
            this.winLeftParticle.y = this.particleLeft.height / 2;

            this.winRightParticle = new particle.GravityParticleSystem(RES.getRes("fruit_particle_win_png"), RES.getRes("fruit_particle_win_json"));
            this.winRightParticle.start();
            this.particleRight.addChild(this.winRightParticle);
            this.winRightParticle.y = this.particleRight.height / 2;
        }

        protected onLeave() {
            super.onLeave();
            this.hasStart = false;
            this.isAuto = false;
            this.stopReward();
            this.clearRewardState();
            FruitData.instance.isRollingReward = false;
            this.fruitMachine.forceStopRoll();
        }

        private onTest() {
            this.randomCoinsFly();
        }

        private onBackClick(): void {
            SoundMenager.instance.PlayClick();
            if (RoomManager.getInstance().curRoomData.gameLevel != 0 && FruitData.instance.isRollingReward) {
                BattleLeaveTips.showTips({
                    "text": "当前游戏进行中，确认退出吗？",
                    "callback": (data: any) => {
                        RoomRequest.leaveRoom(ChildGameType.FRUIT);
                    },
                    "callbackObject": this,
                    "effectType": 0,
                    "tipsType": TipsType.OkAndCancel
                });
            } else {
                RoomRequest.leaveRoom(ChildGameType.FRUIT);
            }
        }

        private onSettingAudioClick(): void {
            SoundMenager.instance.PlayClick();
            var settingPanel: FruitSetting = new FruitSetting();
            PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
        }

        private onHelpClick(): void {
            SoundMenager.instance.PlayClick();
            // AppFacade.getInstance().sendNotification(PanelNotify.SHOW_FRUIT_HELP_UI);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.FRUIT);

        }
        //点击战绩查询按钮
        private onZjClick(): void {
            // AppFacade.getInstance().sendNotification(PanelNotify.SHOW_FRUIT_ZJCX_UI);
            RoomRequest.reqZJCXInfo(game.ChildGameType.FRUIT);

        }

        protected onOpen(): void {
            this.winMoneyLabel.text = "0";
            this.menuGroup.showDefault();
            this.fruitMachine.hideResult();
            this.bigwinAnim.visible = false;
            this.bigwinAnim.stop();
            this.fruitMachine.clear();
            FruitRequest.reqRoomInfo();
            // 请求房间奖池信息
            this.poolMoneyLabel.text = "0";
            FruitRequest.reqAllRoomPoolMoney();
            this.hasStart = false;
            this.init();
            this.particleLeft.visible = this.particleRight.visible = false;
            FruitData.instance.isRollingReward = false;
            this.winCoinGroup.removeChildren();
        }

        private init(): void {
            if (FruitData.instance.bottomBet == 0) {
                FruitData.instance.bottomBet = RoomManager.getInstance().curRoomData.bottomBet * 1000;
            }
            this.gameRoomLabel.text = this.roomName(RoomManager.getInstance().curRoomData.gameLevel);
            this.yaxianLabel.text = FruitData.instance.yaxian.toFixed(0);
            this.totalBetLabel.text = FruitData.instance.getTotalBet().toFixed(2);
            this.singleBetLabel.text = (FruitData.instance.bottomBet / 1000).toFixed(2);

            this.fruitMachine.ShowInit();
            this.winResultGroup.visible = false;
            this.poolMoneyLabel.text = FruitData.instance.poolMoney.toFixed(0);
            this.isAuto = false;
            this.startBtn.touchEnabled = true;
            this.winMoney.visible = false;

            if (this.startCheckId > 0) {
                egret.clearTimeout(this.startCheckId);
            }

            if (this.winMoneyTimeOutId > 0) {
                egret.clearTimeout(this.winMoneyTimeOutId);
            }

            this.setAuto(false);
            if (this.waitToshowWinMoney > 0) {
                egret.stopTick(this.updateWinMoneyShow, this);
            }

        }

        private showWinMoney(value: number): void {
            if (value == 0) return;
            this.waitToshowWinMoney = value;
            this.winMoney.text = "0";
            this.winMoney.visible = true;
            this.setTimeOut(this.hideWinMoney, 1500);
            this.winStartShowTime = egret.getTimer();
            if (value < 10) {
                this.showWinTotalTime = 200;
            } else {
                this.showWinTotalTime = 500;
            }
            egret.startTick(this.updateWinMoneyShow, this);
            if(this.tempGameResult.type < 4) {
                this.randomCoinsFly();    
            }
        }

        private updateWinMoneyShow(timestamp: number): boolean {
            if (timestamp - this.winStartShowTime > this.showWinTotalTime) {
                this.winMoney.text = "+" + this.waitToshowWinMoney.toFixed(2);
                egret.stopTick(this.updateWinMoneyShow, this);
                this.waitToshowWinMoney = 0;
                return false;
            }
            let value = this.waitToshowWinMoney * ((timestamp - this.winStartShowTime) / this.showWinTotalTime);
            this.winMoney.text = "+" + value.toFixed(2);
            return false;
        }

        private hideWinMoney(): void {
            this.winMoney.visible = false;
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private startGroup: eui.Group;
        private startBtn: eui.Button;
        private _initBarY: number;
        private winResultGroup: eui.Group;
        private winTypeImg: eui.Image;

        private playerIcon1: FruitPlayerIcon;
        private playerIcon2: FruitPlayerIcon;
        private playerIcon3: FruitPlayerIcon;
        private playerIcon4: FruitPlayerIcon;
        private playerIcons: Array<FruitPlayerIcon>;
        private winMoneyLabel:eui.BitmapLabel;
        private playerMoneyLabel: eui.BitmapLabel;
        private poolMoneyLabel: eui.BitmapLabel;
        private playerNameLabel: eui.Label;
        private totalBetLabel: eui.BitmapLabel;
        private singleBetLabel: eui.BitmapLabel;
        private gameRoomLabel: eui.Label;
        private yaxianLabel: eui.BitmapLabel;
        private addBtn: eui.Label;
        private subBtn: eui.Label;
        private fruitMachine: FruitMachine;
        private bigwinAnim:DragonAnim;
        private coinsParent: eui.Group;
        private tempGameResult: FruitGameResult;
        private rewardLabel: eui.Label;
        private winMoney: eui.BitmapLabel;
        private _hasStart: boolean = false;
        private waitToshowWinMoney: number;
        private winStartShowTime: number;
        private backBtn: eui.Button;
        private settingAudioBtn: eui.Button;
        private helpBtn: eui.Button;
        private zjBtn: eui.Button;  //战绩查询按钮
        private maxBtn: eui.Button;
        private lineBtn: eui.Button;
        private bottomBetBtn: eui.Button;
        private rollEndTime:number;

        private isAuto: boolean = false;
        private recordStartTime: number = 0;
        private autoGroup: eui.Group;
        private startCheckId: number;
        private winMoneyTimeOutId: number;
        private showWinTotalTime: number;
        private bankBtn:eui.Button;
        private menuGroup:MenuGroup;
        private menuArrowImg:eui.Image;
        private menuContent:eui.Group;

        private maxDisableImg:eui.Group;
        private lineDisableImg:eui.Group;
        private bottomDisableImg:eui.Group;
        private winCoinGroup:eui.Group;
        private coinColletct:eui.Image;

        private leftStart:eui.Group;
        private leftMiddle:eui.Group;
        private leftEnd:eui.Group;
        private leftGroup:eui.Group;
        private rightStart:eui.Group;
        private rightMiddle:eui.Group;
        private rightEnd:eui.Group;
        private rightGroup:eui.Group;

        public testBtn:eui.Button;

        private startCheckTimeout:game.TickTimeOut;
        private particleLeft:eui.Group;
        private winLeftParticle:particle.GravityParticleSystem;
        private particleRight:eui.Group;
        private winRightParticle:particle.GravityParticleSystem;
        public get hasStart():boolean {
            return this._hasStart
        }
        public set hasStart(v:boolean) {
            this._hasStart = v;
            if(this._hasStart) {
                this.bottomBetBtn.enabled = false;
                this.lineBtn.enabled = false;
                this.maxBtn.enabled = false;
                this.maxDisableImg.visible = true;
                this.lineDisableImg.visible = true;
                this.bottomDisableImg.visible = true;
            } else {
                this.bottomBetBtn.enabled = true;
                this.lineBtn.enabled = true;
                this.maxBtn.enabled = true;
                this.maxDisableImg.visible = false;
                this.lineDisableImg.visible = false;
                this.bottomDisableImg.visible = false;
            }
        }

        private onStartBtnClick(): void {
            if (this.hasStart) return;
            if (FruitData.instance.isRollingReward) return;
            this.clearRewardState();
            this.fruitMachine.hideResult();
            let roomData = RoomManager.getInstance().curRoomData;
            if(!roomData) return;
            let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
            if(playerInfo.money < roomData.enterMinMoney) {
                TipsUtils.moneyTipsGame2(this, roomData.enterMinMoney);
                this.clearAutoAndBackStart();
                return;
            }
            if(playerInfo.money < FruitData.instance.getTotalBet()) {
                if(roomData.gameLevel == 0) {
                    TipsUtils.showTipsFromCenter("金币不足");
                } else {
                    TipsUtils.moneyTips(this, "你的余额不足，无法进行游戏");
                }
                this.clearAutoAndBackStart();
                return;
            }

            FruitRequest.reqStartGame();
            this.hasStart = true;
            FruitSoundPlayer.instance.playSound(FruitSoundType.START);
        }

        private onStartBegin(): void {
            this.recordStartTime = egret.getTimer();
            this.startCheckTimeout = this.setTimeOut(this.updateCheckStartStatus, 1800);
        }

        private onStartMoveCheck(e:egret.TouchEvent) {
            if(!this.startBtn.hitTestPoint(e.stageX, e.stageY)) {
                egret.log("不在按钮上了");
                this.onStartCancel();
            }
        }

        private updateCheckStartStatus(): void {
            this.recordStartTime = 0;
            this.setAuto(true);
            return;
        }

        private onStartCancel(): void {
            this.recordStartTime = 0;
            if(this.startCheckTimeout) {
                this.startCheckTimeout.stop();
                this.startCheckTimeout = null;
            }
        }

        private onStartEnd(): void {
            if(this.startCheckTimeout) {
                this.startCheckTimeout.stop();
                this.startCheckTimeout = null;
            }
            if (this.recordStartTime > 0) {
                if (egret.getTimer() - this.recordStartTime > 2000) {
                    this.setAuto(true);
                } else {
                    this.onStartBtnClick();
                }
            }
        }

        private setAuto(isauto: boolean): void {
            this.isAuto = isauto;
            this.autoGroup.visible = this.isAuto;
            this.startGroup.visible = !this.isAuto;
            if (this.isAuto) {
                if (!this.hasStart) {
                    this.onStartBtnClick();
                }
                this.startBtn.touchEnabled = false;
            } else {
                this.startBtn.touchEnabled = true;
            }
        }

        private upBar(): void {
            var tw: egret.Tween = egret.Tween.get(this.startGroup);
            tw.to({ y: this._initBarY }, 150);
        }

        public refreshBetMoney(): void {
            this.yaxianLabel.text = FruitData.instance.yaxian.toFixed(0);
            this.totalBetLabel.text = FruitData.instance.getTotalBet().toFixed(2);
            this.singleBetLabel.text = (FruitData.instance.bottomBet / 1000).toFixed(2);
        }

        private roomName(roomLevel: number): string {
            if (roomLevel == 1) {
                return "初级场";
            } else if (roomLevel == 2) {
                return "中级场";
            } else if (roomLevel == 3) {
                return "高级场";
            } else if (roomLevel == 0) {
                return "体验场";
            }
            return "";
        }

        public refreshPlayer(): void {
            let players: Array<game.PlayerInfo> = RoomManager.getInstance().curRoomData.playerInfos;
            let playerIndex: number = 0;
            for (let player of players) {
                if (player.playerId == UserService.instance.playerId) {
                    this.playerMoneyLabel.text = player.money.toFixed(2);
                    this.playerNameLabel.text = player.nickName;
                }
            }
        }

        private onAddBet(): void {
            let bet: number = FruitData.instance.bottomBet + RoomManager.getInstance().curRoomData.bottomBet * 1000;
            if (bet > (10000 * RoomManager.getInstance().curRoomData.bottomBet)) {
                // 不能超出10倍
                bet = RoomManager.getInstance().curRoomData.bottomBet * 1000;
            }
            FruitRequest.reqSetMoney(bet);
        }

        private onMaxBet(): void {
            if(FruitData.instance.lineValue >= 9 && FruitData.instance.bottomBet >= 10000 * RoomManager.getInstance().curRoomData.bottomBet) {
                TipsUtils.showTipsFromCenter("已处于满押状态");
                return ;
            }
            FruitRequest.reqSetMoney(10000 * RoomManager.getInstance().curRoomData.bottomBet);
            FruitData.instance.lineValue = 9;
            FruitRequest.reqSetLine(9);
        }

        private onLineChange(): void {
            let newLineValue: number = FruitData.instance.lineValue;
            newLineValue++;
            if (newLineValue > 9) {
                newLineValue = 1;
            }
            FruitRequest.reqSetLine(newLineValue);
        }

        private onSubBet(): void {
            let bet: number = FruitData.instance.bottomBet - RoomManager.getInstance().curRoomData.bottomBet * 1000;
            if (bet <= 0) return;
            FruitRequest.reqSetMoney(bet);
        }

        public updateRollEnd(data: any): void {
            this.fruitMachine.showFruit(this.tempGameResult, data.rollIndex, data.fruitsIcons);
            if(data.rollIndex == 4) {
                // 显示结算过程
                this.showEnd();
            }
        }

        public getPlayerIcon(playerId: number): FruitPlayerIcon {
            for (let playerIcon of this.playerIcons) {
                if (playerIcon.playerInfo && playerIcon.playerInfo.playerId == playerId) {
                    return playerIcon;
                }
            }
            return null;
        }

        public refreshMoneyByPush(data: any): void {
            this.poolMoneyLabel.text = data.moneyInfo.poolMoney.toFixed(0);
            /*
            let playerIcon: FruitPlayerIcon = this.getPlayerIcon(data.playerId);
            if (playerIcon) {
                playerIcon.showPlayerMoney(Number(data.money));
            }
            */
            if (data.playerId == UserService.instance.playerId) {
                this.playerMoneyLabel.text = Number(data.money).toFixed(2);
            }
        }

        public showGameResult(gameResult: FruitGameResult): void {
            this.tempGameResult = gameResult;
            FruitData.instance.isRollingReward = true;
            this.fruitMachine.startRoll(gameResult);
            this.fruitMachine.stopShowLines();
            // this.setTimeOut(this.showEnd, 4000);
            this.rollEndTime = egret.getTimer() + 4000;
            FruitSoundPlayer.instance.playRollSound();
            this.setTimeOut(this.playRoolSound, 500);
        }

        private playRoolSound() {
            FruitSoundPlayer.instance.playRollSound();
            if(egret.getTimer() < this.rollEndTime - 500) {
                this.setTimeOut(this.playRoolSound, 500);
            }
        }

        private showEnd(): void {
            if (!this.stage) return;
            this.poolMoneyLabel.text = this.tempGameResult.roomPoolMoney.toFixed(0);
            this.winMoneyLabel.text = (FruitData.instance.winMoney).toFixed(2);
            this.playerMoneyLabel.text = this.tempGameResult.totalMoney.toFixed(2);
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
            if(playerInfo) {
                playerInfo.money = this.tempGameResult.totalMoney
            }
            if (this.tempGameResult.addMoney > 0) {
                if (this.tempGameResult.type > 1) {
                    FruitSoundPlayer.instance.playSound(FruitSoundType.WIN_BIG);
                } else {
                    FruitSoundPlayer.instance.playSound(FruitSoundType.WIN_LITTLE);
                }
                this.particleLeft.visible = this.particleRight.visible = true;
                this.fruitMachine.startShowLines(this.tempGameResult, ()=>{
                    this.showWinMoney(this.tempGameResult.addMoney);
                    this.winResultGroup.visible = false;
                    let multi = this.tempGameResult.addMoney / FruitData.instance.getBottomBet() 
                    egret.log("================ fruit  mult : " + multi)
                    if(multi >= 50) {
                        this.bigwinAnim.visible = true;
                        this.bigwinAnim.bindFrameHandler(this.playBigwinCoins, this, "playCoins");
                        this.bigwinAnim.playerOnce(()=>{
                            this.bigwinAnim.visible = false;
                            this.bigwinAnim.clearAllListener();
                        },this);
                    }
				}, this);
            } else {
                FruitData.instance.isRollingReward = false;
                this.stopReward();
            }
            this.hasStart = false;
            //if (this.isAuto) {
            //    this.setTimeOut(this.startNext, this.tempGameResult.winLines.length * 2500 + 1500);
            //}
        }

        private startNext(): void {
            if (!this.stage) return;
            if (!this.isAuto) return;
            this.onStartBtnClick();
        }

        private onBank() {
            SoundMenager.instance.PlayClick();
            if (FruitData.instance.enterRoomLevel == 0) {
                CommonUtil.noticeMsg("体验场不能进行取款操作！");
                return ;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.FRUIT)
        }

        private onAutoClick(): void {
            this.setAuto(false);
            /*
            this.isAuto = !this.isAuto;
            this.autoSendImg.visible = this.isAuto;
            if(this.isAuto) {
                if(!this.hasStart) {
                    this.onStartBtnClick();
                }
                this.startBtn.touchEnabled = false;
            } else {
                this.startBtn.touchEnabled = true;
            }
            */
        }

        public clear(): void {
            FruitData.instance.bottomBet = 0;
            this.isAuto = false;
            this.fruitMachine.stopShowLines();
            this.fruitMachine.showAllLines();
            if (this.startCheckId > 0) {
                egret.clearTimeout(this.startCheckId);
            }
            if (this.winMoneyTimeOutId > 0) {
                egret.clearTimeout(this.winMoneyTimeOutId);
            }
            this.winMoney.visible = false;
            if (this.waitToshowWinMoney > 0) {
                egret.stopTick(this.updateWinMoneyShow, this);
            }
        }


        public stopAuto(): void {
            this.isAuto = false;
        }

        public setLine() {
            this.yaxianLabel.text = FruitData.instance.lineValue.toFixed(0);
            this.fruitMachine.showLine(FruitData.instance.lineValue);
            this.totalBetLabel.text = FruitData.instance.getTotalBet().toFixed(2);
        }

        public refreshRoomInfo() {
            this.singleBetLabel.text = (FruitData.instance.bottomBet / 1000).toFixed(2);
            this.winMoneyLabel.text = (FruitData.instance.winMoney).toFixed(2);
            this.setLine();
        }

        public clearAutoAndBackStart(): void {
            this.setAuto(false);
            this.hasStart = false;
        }

        public forceStopCheckStart() {

        }

        public refreshPool(m:number) {
            this.poolMoneyLabel.text = m.toFixed(0);
        }

        public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
            this.playerMoneyLabel.text = totalmoney.toFixed(2);
            let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
            playerInfo.money = totalmoney;
        }
        
        public randomCoinsFly() {
            let endpoint = this.coinColletct.localToGlobal(this.coinColletct.width /2, this.coinColletct.height / 2);
            endpoint = this.winCoinGroup.globalToLocal(endpoint.x, endpoint.y);
            let lastTime = 0;
            let imgArr:Array<eui.Image> = [];
            for(let i=0;i<30;i++) {
                let img:eui.Image = new eui.Image("fruit_fly_coin_ns_png");
                this.winCoinGroup.addChild(img);
                img.width = img.height = 44;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                img.x = this.winCoinGroup.width / 2;
                img.y = 0;
                imgArr.push(img);
                img.visible = false;
            } 
            for(let i=0;i<30;i++) {
                let img = imgArr[i];
                CommonUtil.registerTimeOut(()=>{
                    img.visible = true;
                    new FruitCoinBehavior(img,this.winCoinGroup).start((idx:number)=>{
                        }, this, i);
                }, this, lastTime);
                lastTime += CommonUtil.RandomRangeInt(0, 50);
            } 
            this.setTimeOut(()=>{
                let idx = 0;
                for(let img of imgArr) {
                    idx++;
                    egret.Tween.removeTweens(img);
                    egret.Tween.get(img).to({x:endpoint.x, y:endpoint.y}, 300 + idx * 20).call(()=>{
                        if(img.parent) img.parent.removeChild(img);
                        if(idx == imgArr.length) {
                            FruitData.instance.isRollingReward = false;
                            this.stopReward();
                        }
                    });
                }
            }, lastTime + 1000)
        }

        public playBigwinCoins() {
            this.flyBig(this.leftGroup, this.leftStart, this.leftMiddle, this.leftEnd, -1, null)
            this.flyBig(this.rightGroup, this.rightStart, this.rightMiddle, this.rightEnd, 1, this.stopReward)
        }

        private stopReward() {
            if(this.isAuto) {
                this.setTimeOut(this.startNext, 1000);
            }
        }

        private clearRewardState() {
            this.particleLeft.visible = this.particleRight.visible = false;
            this.fruitMachine.stopReward();
        }

        private flyBig(container:eui.Group, startGroup:eui.Group, 
            middleGroup:eui.Group, endGroup:eui.Group, 
            dir:number = 1, func:Function) {
            for (let i = 0; i < 20; i++) {
                this.setTimeOut(() => {
                    let fruitCoin: FruitFlyCoin = new FruitFlyCoin();
                    container.addChild(fruitCoin);
                    fruitCoin.x = CommonUtil.RandomRangeInt(startGroup.x - 10, startGroup.x + 10);
                    fruitCoin.y = CommonUtil.RandomRangeInt(startGroup.y - 10, startGroup.y + 10);;
                    fruitCoin.startFly(fruitCoin.x, fruitCoin.y,
                        CommonUtil.RandomRangeInt(middleGroup.x - 10, middleGroup.x + 10), 
                        CommonUtil.RandomRangeInt(middleGroup.y - 10, middleGroup.y + 10),
                        endGroup.x + CommonUtil.RandomRangeInt(0, endGroup.width), 
                        endGroup.y, func, this, dir);
                }, i * 100);
            }
        }
    }
}