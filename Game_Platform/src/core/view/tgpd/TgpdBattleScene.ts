module game.tgpd {
	export class TgpdBattleScene extends GameScene implements eui.UIComponent {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			//this.skinName = "resource\eui_skins\rgpd\TgpdBattleScene.exml";
			this.gameType = ChildGameType.TGPD;
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		private testBtn: eui.Button;

		public layerIcon: eui.Image;
		public passCountLabel: eui.BitmapLabel;
		public layerPassIcon: eui.Image;
		public grandLabel: eui.BitmapLabel;
		public majorLabel: eui.BitmapLabel;
		public minorLabel: eui.BitmapLabel;
		public miniLabel: eui.BitmapLabel;
		public totalPointLabel: eui.BitmapLabel;
		public currPointLabel: eui.BitmapLabel;

		public stakeLabel: eui.BitmapLabel;
		public lineLabel: eui.BitmapLabel;
		public reduceStakeBtn: IButton;
		public increaseStakeBtn: IButton;
		public reduceLineBtn: IButton;
		public increaseLineBtn: IButton;

		public startGameBtn: IButton;
		public tuoguanBtn: IButton;
		public qxTuoguanBtn: IButton;

		public titleGroup: eui.Group;
		public wordGroup: eui.Group;
		public passGroup: eui.Group;
		public poolGroup: eui.Group;
		public pointGroup: eui.Group;
		public currPointGroup: eui.Group;
		public stakeGroup: eui.Group;
		public lineGroup: eui.Group;

		public boxGroupArr: Array<eui.Group>;
		public layerGroup1: eui.Group;
		public layerGroup2: eui.Group;
		public layerGroup3: eui.Group;
		public currMoneyLabel: eui.Label;
		public iconNumLabel: eui.Label;
		public currIcon: eui.Image;
		// public startGame: egret.tween.TweenGroup;
		public showCurrInfo: egret.tween.TweenGroup;
		public menu: TgpdHelpMenu;
		private contentGroup: eui.Group;
		public gameArea: TgpdGameArea;
		private gameAreaMask: eui.Image;
		private candyMachine: CandyMachine;

		private levelImg: eui.Image;
		private layerLabel: eui.BitmapLabel;
		private rewardShowScroller: eui.Scroller;
		private rewardShowGroup: eui.Group;
		private rewardArr: TgpdRewardItem[] = [];
		private totalWinMoneyLabel: eui.BitmapLabel;

		private vipImg: eui.Image;
		private playerMoneyLabel: eui.Label;
		private nameLabel: eui.Label;
		private headImg: eui.Image;

		private roundWinAnim: CandyRoundWinAnim;
		private baofuAnimGroup: eui.Group;
		private baofuAnim: DragonAnim;
		private congratAnimGroup: eui.Group;
		private congratAnim: DragonAnim;
		private blastAnim: DragonAnim;

		private curtainUpAnimGroup: eui.Group;
		private curtainDownAnimGroup: eui.Group;
		private curtainUpAnim: DragonAnim;
		private curtainDownAnim: DragonAnim;

		private goldAddBtn: eui.Button;

		//数据与结构
		private rewardPos: eui.Image;
		private isAuto: boolean = false;
		private isStart: boolean = false;
		private isInit: boolean = false;
		private level: number = -1;
		public lastClick: number = -1;

		private isRunning: boolean = false;

		protected componentInit(): void {
			this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCongratAnim, this);

			this.startGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
			this.qxTuoguanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoguanCancel, this);
			this.tuoguanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoguan, this);

			this.reduceLineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceLine, this);
			this.increaseLineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIncreaseLine, this);
			this.reduceStakeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceStake, this);
			this.increaseStakeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIncreaseStake, this);
			this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);


			this.candyMachine = new CandyMachine();
			this.contentGroup.addChild(this.candyMachine);
			this.gameArea.x = this.contentGroup.width / 2 - this.gameArea.width / 2;
			console.warn(this.gameArea.parent.x);
			console.warn(this.gameArea.parent.width);
			console.warn(this.gameArea.width);
			this.candyMachine.x = this.gameArea.x;
			this.candyMachine.y = this.gameArea.y + this.gameArea.height;
			console.warn("============gameArea x is " + this.gameArea.x + "// y is " + this.gameArea.y);
			this.boxGroupArr = [this.layerGroup1, this.layerGroup2, this.layerGroup3];

			// this.menu.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall,this);

			// this.candyMachine.mask = this.gameArea;
			this.drawMask();
			this.isInit = true;
			this.isRunning = false;
			this.hideRoundWinAnim();
			this.hideCongratAnim();
		}

		protected onOpen() {
			this.isInit = true;
			if (this.isStart) {
				this.initScene();
			}
			this.updateScene();
		}

		public onResume() {
			/*
			if(this.isTuoguan && !this.candyMachine.isPlaying)
			{
				TgpdRequest.requestStartGame(0);
				// this.initScene(this.level);
				this.clearAllTimeOut();
			}
			*/
		}

		public onPause() {
			// 取消托管
			this.isInit = false;
			this.stopAuto();
			this.initScene();
			this.candyMachine.clear();
			this.isStart = false;
			this.isAuto = false;
			this.tuoguanBtn.enabled = true;
			this.startGameBtn.enabled = true;
			this.onTuoguanCancel();
			this.hideRoundWinAnim();
			this.hideCongratAnim();
		}

		public initScene() {
			this.isStart = true;
			if (this.isInit) {
				this.init();
			}
		}

		public init() {
			let candyData: CandyData = CandyData.instance;

			if (this.isInit) {
				this.isStart = false;
			}
			this.isRunning = false;

			this.hideRoundWinAnim();
			this.hideCongratAnim();

			this.rewardArr = [];
			this.rewardShowGroup.removeChildren();
			this.totalWinMoneyLabel.text = "0.00";
			this.initOperationBtn();
			this.stopAuto();
			this.refreshPlayerInfo();
			if (this.candyMachine) {
				this.candyMachine.clear();
			}
			this.rewardShowScroller.viewport.scrollV = 0;
		}

		public updateScene() {
			let candyData: CandyData = CandyData.instance;
			this.updateLayerShow();
			this.updateLevelShow();
			this.updatePool();
			this.updatePassCount();
			this.updateTotalWinMoney();
			this.updateStake();
			this.updateLine();
			this.updateContent(true);
			this.refreshBox();
			this.refreshPlayerInfo();
		}

		private onGoldAdd() {
			if (CandyData.instance.enterRoomLevel == 0) {
				TipsUtils.showTipsFromCenter("体验场不能进行取款操作！");
			} else {
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.TGPD);
			}
		}

		public onHistory() {
			RoomRequest.reqZJCXInfo(ChildGameType.TGPD);
		}

		public onSetting() {

			var settingPanel: CandySetting = new CandySetting();

			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
		}

		public showHelp(event) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.TGPD);
		}

		public onBackHall(event) {
			// TgpdRequest.requestExitGame(0);	
			let candyExitPanel: CandyExitPanel = new CandyExitPanel();
			PopUpManager.addPopUp(candyExitPanel, true, 0, 0, 1);
		}

		public drawMask() {
			var maskShape = new egret.Shape();
			this.contentGroup.addChild(maskShape);
			maskShape.graphics.beginFill(0);
			maskShape.graphics.drawRect(this.gameAreaMask.x, this.gameAreaMask.y, this.gameAreaMask.width, this.gameAreaMask.height);
			maskShape.graphics.endFill();
			this.candyMachine.mask = maskShape;
			console.warn("============gameArea x is " + this.gameAreaMask.x + "// y is " + this.gameAreaMask.y);
		}

		public playCurtainUpAnim() {
			let curLayer = CandyData.instance.currentLayer;
			let anim = "animation_" + curLayer;
			this.curtainUpAnimGroup.visible = true;
			this.curtainUpAnim.playerOnce(() => {
				this.curtainUpAnimGroup.visible = false;
			}, this, anim);
		}
		public playCurtainDownAnim() {
			let curLayer = CandyData.instance.currentLayer;
			let anim = "animation_" + curLayer;
			this.curtainDownAnimGroup.visible = true;
			this.curtainDownAnim.playerOnce(() => {
				this.curtainDownAnimGroup.visible = false;
			}, this, anim);
		}
		public playCurtainFullAnim() {
			let anim;
			if (CandyData.instance.currentLayer == 3) {
				anim = "animation_" + 1;
			} else {
				anim = "animation_" + (CandyData.instance.currentLayer + 1);
			}
			this.curtainDownAnimGroup.visible = true;
			this.curtainUpAnimGroup.visible = false;
			this.curtainDownAnim.playerOnce(() => {
				this.curtainDownAnimGroup.visible = false;
				this.curtainUpAnimGroup.visible = true;
				this.curtainUpAnim.playerOnce(() => {
					this.curtainUpAnimGroup.visible = false;
				}, this, anim);
			}, this, anim);

			//update current layer, BitmapLabel
			CommonUtil.registerTimeOut(this.updateLayerShow, this, 700);
		}

		private enableStartBtn(bool: boolean) {
			this.startGameBtn.enabled = bool;
		}
		private setTuoguanBtn(bool: boolean) {
			this.tuoguanBtn.visible = bool;
			this.qxTuoguanBtn.visible = !bool;
		}
		private enableTuoguanBtn(bool: boolean) {
			this.tuoguanBtn.enabled = bool;
		}

		private enableStakeLine(bool: boolean) {
			this.reduceLineBtn.enabled = bool;
			this.increaseLineBtn.enabled = bool;
			this.reduceStakeBtn.enabled = bool;
			this.increaseStakeBtn.enabled = bool;
		}

		private initOperationBtn() {
			this.enableStartBtn(true);
			this.enableTuoguanBtn(true);
			this.setTuoguanBtn(true);
			this.enableStakeLine(true);
		}

		public onStartGame() {
			if (this.lastClick != -1 && this.lastClick + 2000 > Date.now()) return;
			if (this.isRunning) return;

			let data = CandyData.instance;
			this.lastClick = Date.now();
			if (data.totalMoney < CandyData.instance.enterMinMoney) {
				TipsUtils.moneyTipsGame2(this, CandyData.instance.enterMinMoney);
				this.stopAuto();
				return;
			}
			if (data.totalMoney < data.lineValue * data.betValue) {
				TipsUtils.moneyTipsGame3(this);
				this.stopAuto();
				return;
			}
			this.isRunning = true;
			TgpdRequest.requestStartGame(0);
		}

		public onTuoguanCancel() {
			this.isAuto = false;
			this.setTuoguanBtn(true);
			if (this.isRunning) {
				this.enableTuoguanBtn(false);
			} else {
				this.enableStartBtn(true);
				this.enableStakeLine(true);
			}
		}

		public onTuoguan() {
			this.isAuto = true;
			this.setTuoguanBtn(false);
			if (!this.isRunning) {
				this.onStartGame();
			}
		}

		public startGameRet(data) {
			this.isStart = true;
			this.enableStartBtn(false);
			this.enableStakeLine(false);
			this.updateLayerShow();
			this.candyMachine.showCandys(CandyData.instance.candyMachineData, this.treasureMotionEnd, () => { }, () => { }, this);
			TgpdSoundPlayer.instance.playerGameStart();
		}

		private updateContent(flag: boolean) {
			if (!this.isAuto) {
				this.startGameBtn.visible = flag;
				this.tuoguanBtn.visible = flag;
			}
		}

		private updatePassCount() {
			let data: CandyData = CandyData.instance;
			this.passCountLabel.text = data.currentPassCount + "/" + data.totalPassCount;

		}
		public updateStake() {
			let data: CandyData = CandyData.instance;
			this.stakeLabel.text = data.betValue.toString();
		}

		public updateLine() {
			let data: CandyData = CandyData.instance;
			this.lineLabel.text = data.lineValue.toString();
		}

		public onReduceStake(event) {
			let currStake = CandyData.instance.betValue;
			if (currStake == 5) {
				TgpdRequest.requestSetStake(4);
			} else if (currStake == 4) {
				TgpdRequest.requestSetStake(3);
			} else if (currStake == 3) {
				TgpdRequest.requestSetStake(2);
			} else if (currStake == 2) {
				TgpdRequest.requestSetStake(1);
			} else {
				TgpdRequest.requestSetStake(5);
			}
		}
		public onIncreaseStake(event) {
			let currStake = CandyData.instance.betValue;
			if (currStake == 1) {
				TgpdRequest.requestSetStake(2);
			} else if (currStake == 2) {
				TgpdRequest.requestSetStake(3);
			} else if (currStake == 3) {
				TgpdRequest.requestSetStake(4);
			} else if (currStake == 4) {
				TgpdRequest.requestSetStake(5);
			} else {
				TgpdRequest.requestSetStake(1);
			}
		}
		public onReduceLine(event) {
			let currLine = CandyData.instance.lineValue;
			if (currLine == 5) {
				TgpdRequest.requestSetLine(4);
			} else if (currLine == 4) {
				TgpdRequest.requestSetLine(3);
			} else if (currLine == 3) {
				TgpdRequest.requestSetLine(2);
			} else if (currLine == 2) {
				TgpdRequest.requestSetLine(1);
			} else {
				TgpdRequest.requestSetLine(5);
			}
		}
		public onIncreaseLine(event) {
			let currLine = CandyData.instance.lineValue;
			if (currLine == 1) {
				TgpdRequest.requestSetLine(2);
			} else if (currLine == 2) {
				TgpdRequest.requestSetLine(3);
			} else if (currLine == 3) {
				TgpdRequest.requestSetLine(4);
			} else if (currLine == 4) {
				TgpdRequest.requestSetLine(5);
			} else {
				TgpdRequest.requestSetLine(1);
			}
		}


		public refreshPlayerInfo() {
			this.nameLabel.text = UserService.instance.name;
			this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(CandyData.instance.totalMoney);
			this.vipImg.source = "ncandy_game_vip" + UserService.instance.vipLevel;
			this.headImg.source = "gp_head_" + (UserService.instance.headNum + 1);
		}


		public updateLayerShow(): void {
			this.layerLabel.text = CandyData.instance.currentLayer + "";
		}

		public updateLevelShow(): void{
			let candyData: CandyData = CandyData.instance;
			let sourceArr = ["tiyan", "putong"];
			this.levelImg.source = "ncandy_game_level" + sourceArr[candyData.gameLevel];
		}

		private lastLayer = 0;
		private lastPassCount = 0;
		private treasureMotionEnd() {
			let candyData = CandyData.instance;
			this.isRunning = false;
			console.warn("---------treasureMotionEnd---------");
			this.updateTotalWinMoney();
			this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(candyData.totalMoney);	//待更换字体，换成新的方法
			this.updatePassCount();

			if (!this.isAuto) {
				this.initOperationBtn();
				console.warn("---------treasureMotionEnd0");
			}

			let curWinMoney = candyData.curWinMoney;
			console.warn("============curWinMoney", curWinMoney);
			this.showRoundWinAnim();

			if (candyData.currentLayer <= 3) {
				if (candyData.currentPassCount >= candyData.totalPassCount) {
					this.candyMachine.clear();
					// 换关
					if (candyData.currentLayer < 3) {
						this.playCurtainFullAnim();
						this.updateLayerShow();
						CommonUtil.registerTimeOut(() => {
							this.passCountLabel.text = "0/15";
						}, this, 300);
						//this.updatePassCount();
					}
					else if (candyData.currentLayer = 3) {
						let isAuto = this.isAuto;

						this.candyMachine.clear();
						// todo set operation buttons: start button & auto button
						this.showCongratAnim();
						this.updateLine();
						this.updateStake();
						this.updatePassCount();
						if (isAuto) {
							this.stopAuto();
						}
						CommonUtil.registerTimeOut(() => {
							this.playCurtainFullAnim();
							//this.initScene();
						}, this, 1500);
						CommonUtil.registerTimeOut(() => {
							this.refreshBox();
							this.passCountLabel.text = "0/15";
							if (isAuto) {
								this.onTuoguan();
							}
						}, this, 3200);
					}
				}
			}
			CommonUtil.registerTimeOut(() => {
				if (this.isAuto && !this.isRunning) {
					TgpdRequest.requestStartGame(0);
				}
			}, this, 1000);
		}

		public showAddMoney(data: any): void {
			let candyData = CandyData.instance;

			if (data.candyId % 100 == 6) {
				this.updatePassCount();
				this.updateLayerGroup();
				TgpdSoundPlayer.instance.playerShowPass();
			} else {
				if (data.money > 0) {
				}
				TgpdSoundPlayer.instance.playerClear();
			}

			// dont need to play winsmoke mc

			this.rewardShowScroller.verticalScrollBar.thumb.visible = false;
			if (data.money == 0) {
				return;
			}
			//创建新的item对象
			let rewardItem = new TgpdRewardItem();
			let h = rewardItem.height;
			this.rewardShowGroup.addChild(rewardItem);

			rewardItem.showInfo(data.candyId, data.money, data.eliminateCount);
			this.rewardArr.push(rewardItem);

			let length = this.rewardArr.length;
			if (length > 3) {
				if (length > 20) {
					this.rewardShowGroup.removeChildAt(0);
				}
				this.rewardShowScroller.viewport.scrollV = (((length > 20) ? 20 : length) - 3) * (5 + h);
				console.warn(this.rewardShowGroup.contentHeight, this.rewardShowScroller.viewport.height)
			}
			console.warn(length);
		}

		public showRoundWinAnim() {
			let candyData = CandyData.instance;
			let curWinMoney = candyData.curWinMoney;
			if (curWinMoney != 0) {
				let multi = candyData.lineValue * candyData.betValue;
				let level = candyData.gameLevel;
				let isBaofu: boolean = (curWinMoney >= multi * 10);
				this.roundWinAnim.showWin(curWinMoney.toFixed(2), isBaofu);
			}
		}
		public hideRoundWinAnim() {
			if (this.roundWinAnim) {
				this.roundWinAnim.clearWin();
			}
		}

		public showCongratAnim() {
			this.congratAnimGroup.visible = true;
			this.congratAnim.visible = true;
			this.congratAnim.playerOnce(() => {
				this.hideCongratAnim();
			}, this, "animation");
		}
		public hideCongratAnim() {
			this.congratAnimGroup.visible = false;
			this.congratAnim.visible = false;
			this.congratAnim.stop();
		}

		public updateTotalWinMoney() {
			this.totalWinMoneyLabel.text = Number(CandyData.instance.winMoney).toFixed(2);
			console.error(CandyData.instance.winMoney);
		}

		public refreshBox() {
			let candyData: CandyData = CandyData.instance;
			let layer = candyData.currentLayer;
			if (layer == 3) layer = 1;
			for (var i = 1; i < 4; i++) {
				if (layer > i) {
					// tempLayerGroup.visible = false;
					for (var j = 0; j < this.boxGroupArr[i - 1].numChildren; j++) {
						this.boxGroupArr[i - 1].getChildAt(j).visible = false;
					}
				} else if (layer < i) {
					this.boxGroupArr[i - 1].visible = true;
					for (var j = 0; j < this.boxGroupArr[i - 1].numChildren; j++) {
						this.boxGroupArr[i - 1].getChildAt(j).visible = true;
					}
				} else {
					this.boxGroupArr[i - 1].visible = true;
					for (var j = 0; j < this.boxGroupArr[i - 1].numChildren; j++) {
						if (j + 1 > CandyData.instance.currentPassCount % 15) {
							this.boxGroupArr[i - 1].getChildAt(j).visible = true;
						} else {
							this.boxGroupArr[i - 1].getChildAt(j).visible = false;
						}
					}
				}
			}
		}

		public destroyBox() {

		}

		public updateLayerGroup() {
			var tempLayerGroup: eui.Group = this.boxGroupArr[CandyData.instance.currentLayer - 1];
			for (var j = 0; j < tempLayerGroup.numChildren; j++) {
				if (j + 1 > CandyData.instance.currentPassCount) {
					tempLayerGroup.getChildAt(j).visible = true;
				} else {
					tempLayerGroup.getChildAt(j).visible = false;
					let img: egret.DisplayObject = tempLayerGroup.getChildAt(j);
					this.blastAnim.visible = true;
					let p = img.parent.localToGlobal(img.x, img.y);
					let p2 = this.blastAnim.parent.globalToLocal(p.x - 38, p.y - 28);
					this.blastAnim.x = p2.x;
					this.blastAnim.y = p2.y;
					this.blastAnim.playerAnimOnce("animation");
				}
			}
		}

		public updatePool() {
			let candyData = CandyData.instance;
			this.grandLabel.text = candyData.grand.toFixed(0);
			this.majorLabel.text = candyData.major.toFixed(0);
			this.minorLabel.text = candyData.minor.toFixed(0);
			this.miniLabel.text = candyData.mini.toFixed(0);
		}

		public onMovieComplete(event: egret.Event) {
			if (event.target.parent != null) {
				this.currPointGroup.removeChild(event.target);
			}
		}

		public addPassCount() {
		}

		public getRewardPosition() {
			return this.rewardPos.parent.localToGlobal(this.rewardPos.x, this.rewardPos.y);
		}

		public exitGameRet(data) {
			AppFacade.instance.sendNotification(PanelNotify.CLOSE_TGPD_BATTLE_UI);
		}
		private timeoutIdList: Array<number> = [];
		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public stopAuto(): void {
			this.isAuto = false;
			this.enableTuoguanBtn(true);
			this.setTuoguanBtn(true);
			if (this.isRunning) {
				this.enableTuoguanBtn(false);
			} else {
				this.enableTuoguanBtn(true);
				this.enableStakeLine(true);
			}
		}

		public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
			this.playerMoneyLabel.text = CommonUtil.fixMoneyFormat(totalmoney);
			CandyData.instance.totalMoney = totalmoney;
		}
	}
}