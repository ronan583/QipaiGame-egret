module game.lhdz {
	enum LHStatus {
		prepared = 0,//空闲
		startBet = 1,//开始下注
		stopBet = 2, //停止下注		
		dealCard = 3 //翻牌	
	}

	enum LHDZWinTableType {
		LONG,
		HE,
		HU
	}
	export class LhdzBattleScene extends GameScene implements eui.UIComponent {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = "resource/eui_skins/lhdz/LhdzBattleScene.exml";
			this.gameType = ChildGameType.LHDZ;
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		//---------UI
		public roomName: eui.Image;

		public playerListBtn: IButton;
		public settingBtn: IButton;
		public historyBtn: IButton;
		public betButton1: LhdzBetButton;
		public betButton10: LhdzBetButton;
		public betButton50: LhdzBetButton;
		public betButton100: LhdzBetButton;
		public betButton500: LhdzBetButton;
		public betButton1000: LhdzBetButton;

		public headIcon0: LhdzHeadIcon;
		public headIcon1: LhdzHeadIcon;
		public headIcon2: LhdzHeadIcon;
		public headIcon3: LhdzHeadIcon;
		public headIcon4: LhdzHeadIcon;
		public headIcon5: LhdzHeadIcon;
		public headIcon6: LhdzHeadIcon

		public dragonBetInfo: LhdzBetInfoUI;
		public tigerBetInfo: LhdzBetInfoUI;
		public tieBetInfo: LhdzBetInfoUI;

		public lhdzHistoryBar: LhdzHistoryBar;
		public group: eui.Group;
		public dragonCard: LhCard;
		public tigerCard: LhCard;
		public tigerBetGroup: eui.Group;
		public dragonBetGroup: eui.Group;
		public tieBetGroup: eui.Group;
		public continueBtn: IButton;
		private prevCache: Array<any> = [];
		private cacheBet: Array<any> = [];

		//----------数据与结构;
		public playerHeads: LhdzHeadIcon[] = null;
		private betHash: LhdzBetButton[][];
		public betBtnArr: LhdzBetButton[] = null;
		private betInfoArr: LhdzBetInfoUI[] = null;
		private betTouchGroups: eui.Group[];
		private currStatus: LHStatus = LHStatus.prepared;
		private lhdzData: LhdzData;
		private curGameRound: number = 0;
		private positionMap: Object = null;
		private currBetButton: LhdzBetButton;

		private tempBetPools: LhdzBetButton[] = [];
		private tempBetGold: number = 0;

		private winIcon: eui.Image[];
		private dragonWinIcon: eui.Image;
		private tigerWinIcon: eui.Image;
		private tieIcon: eui.Image;

		private level0BetNums: number[] = [10, 50, 100, 200, 500, 1000];
		private level1BetNums: number[] = [1, 5, 10, 50, 100, 500];
		private level2BetNums: number[] = [10, 50, 100, 200, 500, 1000];
		private level3BetNums: number[] = [50, 100, 200, 500, 1000, 2000];
		private customBetNums: number[];

		public battleStartCountDown: game.lhdz.LhdzBattleStartCountDown;
		public betContainer: eui.Group;

		private isInit = false;
		private isStart: boolean = false;

		public recoutTips: LhdzTips;
		private longWinTableAnim: DragonAnim;
		private heWinTableAnim: DragonAnim;
		private huWinTableAnim: DragonAnim;
		private longWinAnim: DragonAnim;
		private huWinAnim:DragonAnim;
		private waitAnim: DragonAnim;
		private switchBankerAnim: DragonAnim;
		private vsAnim: DragonAnim;
		private startAnim: DragonAnim;
		private stopAnim: DragonAnim;

		private lastChooseBet: number = -1;
		private lastOpenLevel: number = -1;

		private menuGroup:MenuGroup;
        private menuArrowImg:eui.Image;
		private menuContent:eui.Group;
		public backBtn : IButton;
		private bankBtn:eui.Button;
		public settingAudioBtn : IButton;
		public helpBtn : IButton;

		protected componentInit(): void {
			super.componentInit();
			this.continueBtn.enabled = false;
			this.betInfoArr = [this.dragonBetInfo, this.tigerBetInfo, this.tieBetInfo];
			this.playerHeads = [this.headIcon0, this.headIcon1, this.headIcon2, this.headIcon3, this.headIcon4, this.headIcon5, this.headIcon6];
			this.betBtnArr = [this.betButton1, this.betButton10, this.betButton50, this.betButton100, this.betButton500, this.betButton1000];
			this.betTouchGroups = [this.dragonBetGroup, this.tigerBetGroup, this.tieBetGroup];
			this.winIcon = [this.dragonWinIcon, this.tigerWinIcon, this.tieIcon]
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueButton, this);
			this.customBetNums = this.level0BetNums;

			this.battleStartCountDown = new game.lhdz.LhdzBattleStartCountDown();
			this.battleStartCountDown.lhdzTips = this.recoutTips;
			this.battleStartCountDown.countDownLabel = this.recoutTips.countLabel;
			this.battleStartCountDown.setSound("lhdz_countdown_mp3");
			this.battleStartCountDown.isPlaySound = false;
			this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "lhdz_battle_json.down_Btn", "lhdz_battle_json.up_Btn");
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBack , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelp , this);
			this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtn , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this);
			this.lhdzData = new LhdzData();
			this.playerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerList, this);

			for (var i = 0; i < this.betBtnArr.length; i++) {
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectedBetButton, this);
			}
			for (var i = 0; i < this.betTouchGroups.length; i++) {
				this.betTouchGroups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.startStakeTap, this);
				this.winIcon[i].alpha = 0;
			}
			this.isInit = true;
			if (this.isStart) {
				this.initScene();
			}
			this.betHashInit();
		}

		public onSettingBtn() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.LHDZ);
		}

		public onBank(event) {
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.LHDZ);
		}

		public onHelp(event) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.LHDZ);
		}

		private onBack() {
			if (LhdzData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if(LhdzData.isSelfStake) {
				if(this.currStatus == LHStatus.prepared || (this.currStatus == LHStatus.stopBet && LhdzData.resultPlayEnd)) {
					RoomRequest.leaveRoom(game.ChildGameType.LHDZ);
				} else {
					BattleLeaveTips.showTips({
						"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间?",
						"callback": (data: any) => {
							RoomRequest.leaveRoom(game.ChildGameType.LHDZ);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
					return;
				}
			}else {
				RoomRequest.leaveRoom(game.ChildGameType.LHDZ);
			}
		}

		public onHistory() {
			AppFacade.instance.sendNotification(PanelNotify.OPEN_LHDZ_HISTORY_UI);
		}

		public onPlayerList() {
			LhdzRequest.requestPlayerBank(0);
		}

		protected onOpen() {
			super.onOpen();
			let level = RoomManager.getInstance().curRoomData.gameLevel;
			if (level != this.lastOpenLevel) {
				this.lastChooseBet = 0;
				//换房间清理
				for (var i = 0; i < this.betInfoArr.length; i++) {
					this.betInfoArr[i].reset();
				}
				if (this.lhdzData) this.lhdzData.clearRecortTypeBet();
				if (this.lhdzData) this.lhdzData.clearDushenTypeBet();
				this.betContainer.removeChildren();
				this.selectedBetButtonByIndex(0);
				this.betHashInit();
			}
			this.lastOpenLevel = level;
			this.menuGroup.showDeault();
			this.longWinAnim.visible = false;
			this.huWinAnim.visible = false;
			this.longWinTableAnim.visible = false;
			this.heWinTableAnim.visible = false;
			this.huWinTableAnim.visible = false;
			this.switchBankerAnim.visible = false;
			this.waitAnim.visible = false;
			this.vsAnim.visible = false;
			this.startAnim.visible = false;
			this.stopAnim.visible = false;
		}

		private selectedBetButton(event: egret.TouchEvent) {
			SoundMenager.instance.PlayClick();
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
					this.lastChooseBet = index;
				} else {
					this.betBtnArr[i].closeLight();
				}
			}
		}

		private startStakeTap(event: egret.TouchEvent) {
			//  LhdzSoundPlayer.instance.playTouch();
			if (LhdzData.isSelfBanker()) {
				CommonUtil.noticeMsg("庄家不能下注");
				return;
			}
			if (this.currStatus != LHStatus.startBet) {
				CommonUtil.noticeMsg("请稍候，还没到下注时间");
				return;
			}

			//没选择筹码和自己是庄家 返回
			if (this.currBetButton == null || LhdzData.isSelfBanker() == true) {
				return;
			}

			var buttonValue = this.getBetButtonValue(this.currBetButton);
			var typeBetInfo: eui.Group;
			for (var i = 0; i < this.betTouchGroups.length; i++) {
				typeBetInfo = this.betTouchGroups[i];
				if (event.currentTarget == typeBetInfo) {
					this.flashImage(this.winIcon[i]);
					if (this.tempBetGold < buttonValue) {
						TipsUtils.showTipsFromCenter("当前金币不足！");
						return
					}
					//直接飞筹码
					var buttonType = this.getInfoType(typeBetInfo);
					this.tempBetGold -= buttonValue;
					this.tempBetGold = Math.max(0, this.tempBetGold);
					console.log("this.tempBetGold ======= ", this.tempBetGold);
					this.headIcon0.showImmGold(this.tempBetGold);
					LhdzData.selfTotolMoney = this.tempBetGold;
					var betBtn = this.stakeEffect(UserService.instance.playerId, buttonType, buttonValue);
					this.tempBetPools.push(betBtn);
					LhdzRequest.SendBets(buttonType, buttonValue);
					this.refreshBtnState();
					this.cacheBet.push({buttonType:buttonType, buttonValue:buttonValue});
				}
			}
		}

		private flashImage(img: eui.Image) {
			if (!img || img == null) {
				return;
			}
			img.alpha = 1;
			egret.Tween.removeTweens(img);
			egret.Tween.get(img).to({ alpha: 0 }, 500).call(() => {
				img.alpha = 0;
			}, this);
		}

		private getInfoType(typeBetInfo: eui.Group): number {
			switch (typeBetInfo) {
				case this.dragonBetGroup:
					return 1;
				case this.tigerBetGroup:
					return 2;
				case this.tieBetGroup:
					return 3;
			}
			return 0;
		}

		public initScene() {
			this.isStart = true;
			if (this.isInit) {
				this.init();
			}
		}

		public init() {
			this.chooseChip();
			this.dragonCard.hideCard();
			this.tigerCard.hideCard();
			this.updatePlayerInfo();
			this.roomName.source = 'lhdz_battle_json.lhdz_gameLevel_' + (RoomManager.getInstance().curRoomData.gameLevel - 1);
			LhdzRequest.requestOPWinFail(0);
			this.positionMap = new Object();
			this.cacheBet = [];
			this.prevCache = [];
		}

		public chooseChip() {
			var gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			switch (gameLevel) {
				case 0:
					this.customBetNums = this.level0BetNums;
					break;
				case 1:
					this.customBetNums = this.level1BetNums;
					break;
				case 2:
					this.customBetNums = this.level2BetNums;
					break;
				case 3:
					this.customBetNums = this.level3BetNums;
					break;
			}
			for (var i = 0; i < this.betBtnArr.length; i++) {
				var level = gameLevel == 0 ? 2 : gameLevel;
				var betSource = "lhdz_battle_json.level" + level + "_chip_" + (i + 1);

				this.betBtnArr[i].showButton(betSource);
			}
			this.refreshBtnState();
		}

		private betHashInit() {
			this.betHash = new Array();
			this.betHash.push(new Array<LhdzBetButton>());
			this.betHash.push(new Array<LhdzBetButton>());
			this.betHash.push(new Array<LhdzBetButton>());
			if (this.lhdzData) this.lhdzData.clearDushenTypeBet();
		}

		public ResumScene() {
			LhdzRequest.requestOPWinFail(0);
		}

		public updatePlayerInfo() {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			if (roomData == null) {
				return;
			}
			if (this.lhdzData == null) {
				this.lhdzData = new LhdzData();
			}

			this.playerListBtn["bitLabel"].text = roomData.onlineCount;

			//初始化头像
			for (let i = 0; i < this.playerHeads.length; i++) {
				this.playerHeads[i].visible = false;
			}

			for (let i = 0; i < roomData.playerInfos.length; i++) {
				let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
				this.lhdzData.addPlayer(playerInfo);
				//更新庄家状态
				if (playerInfo.postion == 0) {
					this.lhdzHistoryBar.updateBanker(playerInfo);
				}

				if (playerInfo.postion == 0 || playerInfo.postion > 8) continue;
				let headIcon = this.getHeadIconByPos(playerInfo.postion);
				headIcon.visible = true;
				// console.log('updatePlayerInfo ========= ', playerInfo.postion, playerInfo.nickName);
				if (playerInfo.postion == 2 || playerInfo.postion == 4 || playerInfo.postion == 6) {
					headIcon.side = 2;
				} else {
					headIcon.side = 1;
				}
				let level = RoomManager.getInstance().curRoomData.gameLevel;
				headIcon.ShowPlayerHead(playerInfo, this.currStatus == LHStatus.stopBet && level == this.lastOpenLevel);

				if (playerInfo.playerId == game.UserService.instance.playerId) {
					this.tempBetGold = playerInfo.money;
					LhdzData.selfTotolMoney = this.tempBetGold;
				}
			}

			if (LhdzData.isSelfBanker() || this.lhdzData.isSelfInBankerUpList()) {
				this.lhdzHistoryBar.setUpBanker(false);
			} else {
				this.lhdzHistoryBar.setUpBanker(true);
			}
			this.refreshBtnState();
		}

		public updateOnlineNum(data) {
			this.playerListBtn["bitLabel"].text = data.length + '';
		}

		/** 首次进入房间 */
		public firstEnterRoom(data) {
			egret.Tween.removeTweens(this.dragonCard);
			egret.Tween.removeTweens(this.tigerCard);
			this.dragonCard.clearAllTimeOut();
			this.tigerCard.clearAllTimeOut();
			this.dragonCard.showBack();
			this.tigerCard.showBack();
			this.dragonCard.y = -98;
			this.tigerCard.y = -98;
			CommonUtil.setNextFrameCall(() => {
				this.nextTickExecs(data);
			}, this);
		}

		private nextTickExecs(data: any) {
			console.log("firstEnterRoom === ", data);
			var selfBetValue = 0;
			var selfBetStake = [];

			for (let stake of data.totalStake) {
				var betInfo = this.betInfoArr[stake.type - 1];
				betInfo.updateTotalRetInfo2(Number(stake.value));
			}

			LhdzData.isSelfStake = false;
			for (let stake of data.stakeInfo) {
				if (stake.playerId == UserService.instance.playerId) {
					console.log('playerStake ==== ', stake);
					for (let datas of stake.playerStake) {
						var betInfo = this.betInfoArr[datas.type - 1];
						betInfo.updateSelfRetInfo(Number(datas.value));
						LhdzData.isSelfStake = true;
					}
				}
			}

			//每个下注值
			if (data.serialNumber == this.curGameRound && this.lhdzData) {
				// 补充不足的金币
				this.handleDeltaBet(data.totalStake);
			} else {
				this.betContainer.removeChildren();
				this.showInitBetByNewRound(data.totalStake);
			}
			this.curGameRound = data.serialNumber;
			LhdzData.bankerUpMoneyLimit = data.upBankerMinMoney;
			this.lhdzData.setBankerData(data.bankerInfos);
			this.lhdzHistoryBar.updateUpBankerNum(this.lhdzData.bankerList.length);
			if (this.lhdzData.isSelfInBankerUpList()) {
				this.lhdzHistoryBar.setUpBanker(false);
			} else {
				this.lhdzHistoryBar.setUpBanker(true);
			}
			if (LhdzData.isSelfBanker()) {
				this.lhdzHistoryBar.setUpBanker(false);
			}
			LhdzData.resultPlayEnd = false;
			this.pushBattleStatus(data);

			if (<LHStatus>data.status == LHStatus.dealCard) {
				this.showWaitMc();
				if (data.downTime > 13) {
					this.startDealCard(data, true, true)
				} else if (data.downTime > 8) {
					this.startDealCard(data, false, false)
				} else {
					this.startDealCard(data, false, false)
				}
			}
		}

		/** 再次进入房间的筹码 */
		public handleDeltaBet(data: any) {
			var value;
			var type;
			var playerId;
			for (let stake of data) {
				if (stake.value == 0) {
					continue;
				}
				type = stake.type;
				playerId = stake.playerId;
				value = stake.value - this.lhdzData.getRecordTypeBet(type);
				// console.log('handleDeltaBet ============================ ', value, stake.value, this.lhdzData.getRecordTypeBet(type));

				this.lhdzData.recordTypeBetInfo(type, value);
				var betInfo = this.betTouchGroups[type - 1];
				this.firstEnterRoomBet(value, type, betInfo, playerId);
			}
		}

		/** 首次进入房间的筹码 */
		private showInitBetByNewRound(data: any) {
			var value;
			var type;
			var playerId;
			for (let stake of data) {
				if (stake.value == 0) {
					continue;
				}
				type = stake.type;
				playerId = stake.playerId;
				value = stake.value;
				var betInfo = this.betTouchGroups[type - 1];
				this.lhdzData.recordTypeBetInfo(type, value);

				this.firstEnterRoomBet(value, type, betInfo, playerId);
			}
		}

		private firstEnterRoomBet(value, type, to, playerId) {
			var betBtn: LhdzBetButton;
			var betMulArr = this.customBetNums;
			let toPos = to.localToGlobal();
			toPos = this.betContainer.globalToLocal(toPos.x, toPos.y);
			for (var i = betMulArr.length - 1; i >= 0; i--) {
				var betNum = Math.floor(value / betMulArr[i]);
				if (betNum > 0) {
					for (var k = 0; k < betNum; k++) {
						betBtn = this.betButtonFactory(playerId, type, betMulArr[i]);
						this.betContainer.addChild(betBtn);
						var gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
						var level = gameLevel == 0 ? 2 : gameLevel;
						betBtn.showLittleButton(level, this.customBetNums.indexOf(betMulArr[i]) + 1);
						betBtn.x = toPos.x + (betBtn.width / 2) + Math.random() * (to.width - betBtn.width);
						betBtn.y = toPos.y + (betBtn.height / 2) + Math.random() * (to.height - betBtn.height);
						this.betHash[type - 1].push(betBtn);
					}
				}
				value -= betMulArr[i] * betNum;
			}
		}

		/** 更新上庄 */
		public upBanker(data: any) {
			console.log('upBanker === ', UserService.instance.playerId, data);
			if (data.bankerInfos) {
				this.lhdzData.addBankerData(data.bankerInfos);
				if (data.bankerInfos.playerId == UserService.instance.playerId) {
					TipsUtils.showTipsFromCenter("申请成功!");
					this.refreshBtnState();
					this.lhdzHistoryBar.setUpBanker(false);
				}
				this.lhdzHistoryBar.updateUpBankerNum(this.lhdzData.bankerList.length);
			}
		}

		/** 更新下庄 */
		public downBanker(data) {
			console.log('downBanker === ', UserService.instance.playerId, data);
			if (data.bankerInfos) {
				this.lhdzData.setBankerData(data.bankerInfos);
				if (LhdzData.isSelfBanker() || this.lhdzData.isSelfInBankerUpList()) {
					this.lhdzHistoryBar.setUpBanker(false);
				} else {
					this.lhdzHistoryBar.setUpBanker(true);
				}
				if (this.lhdzHistoryBar.isDownOper) {
					//本人是庄家
					if (LhdzData.isSelfBanker()) {
						TipsUtils.showTipsFromCenter("申请成功,下局下庄");
					} else {
						TipsUtils.showTipsFromCenter("下庄成功");
					}
					this.lhdzHistoryBar.isDownOper = false;
				}
				this.lhdzHistoryBar.updateUpBankerNum(this.lhdzData.bankerList.length);
			}
		}

		public UpdateHistory(data) {
			this.lhdzHistoryBar.showHistory(data);
		}

		public getHeadIconByPos(pos: number): LhdzHeadIcon {
			return this.playerHeads[pos - 1];
		}

		public getHeadIconByPlayerId(playerId: number): LhdzHeadIcon {
			if (playerId == UserService.instance.playerId) {
				return this.headIcon0;
			}
			for (let headIcon of this.playerHeads) {
				if (headIcon.playerInfo && headIcon.playerInfo.playerId == playerId) return headIcon;
			}
			return null;
		}

		public pushBattleStatus(data, first = false) {
			this.currStatus = <LHStatus>data.status;
			console.log(">>>>>>>>>>>>CurrStatus" + this.currStatus);

			this.continueBtn.enabled = false;
			LhdzData.resultPlayEnd = false;
			switch (this.currStatus) {
				case LHStatus.prepared:
					this.recoutTips.setImage('lhdz_battle_json.lhdz_recount_tips_1');
					this.recoutTips.showCount();
					this.battleStartCountDown.isPlaySound = false;
					this.battleStartCountDown.startCountDown(data.downTime);

					// egret.Tween.removeAllTweens();
					this.betContainer.removeChildren();
					this.betHashInit();

					//初始化头像
					for (let i = 0; i < this.playerHeads.length; i++) {
						this.playerHeads[i].reset();
					}
					this.tigerCard.visible = this.dragonCard.visible = false;

					//空闲清空下注状态
					LhdzData.isSelfStake = false;
					this.lhdzData.getPlayerById(UserService.instance.playerId).selfStakeInfos = [0, 0, 0];
					for (var i = 0; i < this.betInfoArr.length; i++) {
						this.betInfoArr[i].reset();
					}
					this.positionMap = new Object();
					break;
				case LHStatus.startBet:
					if (data.downTime > 18) this.showStartMc();
					this.onStartBet(data);
					this.recoutTips.setImage('lhdz_battle_json.lhdz_recount_tips_2');
					this.battleStartCountDown.isPlaySound = true;
					this.battleStartCountDown.startCountDown(data.downTime);

					this.dragonCard.showBack();
					this.tigerCard.showBack();

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
					if (this.prevCache.length > 0 && LhdzData.isSelfBanker() == false && this.tempBetGold >= tempGold) this.continueBtn.enabled = true;
					this.cacheBet = [];
					break;
				case LHStatus.stopBet:
					LhdzSoundPlayer.instance.playStopBet();
					//播放停止下注
					this.showStopMc();

				case LHStatus.dealCard:
					this.recoutTips.setImage('lhdz_battle_json.lhdz_recount_tips_3');
					this.recoutTips.showCount();
					this.battleStartCountDown.isPlaySound = false;
					this.battleStartCountDown.startCountDown(data.downTime);
					break;
			}
			this.refreshBtnState();
			if (data.isSwitchBanker == true) {
				this.showSwitchBanker();
			}
		}

		public onStartBet(data) {
			this.continueBtn["hasClick"] = false;
			if (data.downTime <= 18) {
				this.tigerCard.visible = this.dragonCard.visible = true;
			}
			this.tigerCard.showBack();
			this.dragonCard.showBack();

			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			roomData.status = game.GameStatus.RUNNING;

			for (let i = 0; i < roomData.playerInfos.length; i++) {
				let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
				this.positionMap[playerInfo.playerId] = playerInfo.postion;
				this.lhdzData.addPlayer(playerInfo);
				this.lhdzData.getPlayerById(playerInfo.playerId).state = LhdzPlayerState.game;
			}

			if (this.lastChooseBet > 0) {
				this.selectedBetButtonByIndex(this.lastChooseBet);
			} else {
				this.selectedBetButtonByIndex(0);
			}

			if (this.cacheBet.length > 0) {
				this.prevCache = this.cacheBet;
			}
			this.cacheBet = [];
			this.refreshBtnState();
		}

		public playTableWinAnim(winTableType:LHDZWinTableType) {

		}

		public showSwitchBanker(): void {
			this.switchBankerAnim.visible = true;
			this.switchBankerAnim.playerOnce(()=>{
				this.switchBankerAnim.visible = false;
			}, this);
		}

		public showWaitMc(anim = 'animation'): void {
			this.waitAnim.visible = true;
			this.waitAnim.playerOnce(()=>{
				this.waitAnim.visible = false;
			}, this);
		}

		public showVsMc(): void {
			LhdzSoundPlayer.instance.playVs();
			this.vsAnim.visible = true;
			this.vsAnim.playerOnce(()=>{
				this.vsAnim.visible = false;
			}, this);
		}

		public showStartMc(): void {
			this.tigerCard.visible = this.dragonCard.visible = false;
			this.showVsMc();
			this.setTimeOut(()=> {
				this.showFapaiTween();
			}, 1000);
			this.setTimeOut(()=>{
				LhdzSoundPlayer.instance.playStartBet();
				this.startAnim.visible = true;
				this.startAnim.playerOnce(()=>{
					this.startAnim.visible = false;
				}, this);
			}, 2000);
		}

		public showStopMc(): void {
			this.stopAnim.visible = true;
			this.stopAnim.playerOnce(()=>{
				this.stopAnim.visible = false;
			}, this);
		}

		public onStakeRet(data) {
			if (this.lhdzData) {
				this.lhdzData.recordTypeBetInfo(data.type, data.value)
			}

			var retPlayerId = Number(data.playerId);

			if (this.positionMap == null) {
				return null;
			}
			var position = this.positionMap[retPlayerId];
			var headIcon = this.getHeadIconByPos(position);
			if (this.lhdzData == null) {
				return;
			}
			var lhdzPlayer = this.lhdzData.getPlayerById(Number(retPlayerId));
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(retPlayerId);
			var betInfo = this.betInfoArr[data.type - 1];
			betInfo.updateTotalRetInfo(data.value);
			if (retPlayerId == UserService.instance.playerId) {
				if (lhdzPlayer == null) {
					return;
				}
				lhdzPlayer.addStakeInfo(data.type, data.value);
				//从tempPool里移除
				for (var i = 0; i < this.tempBetPools.length; i++) {
					if (this.tempBetPools[i].betNum == data.value) {
						this.tempBetPools.splice(i, 1);
						break;
					}
				}
				betInfo.updateSelfRetInfo(lhdzPlayer.getStakeByType(data.type));
				LhdzData.isSelfStake = true;
			} else {
				this.stakeEffect(retPlayerId, data.type, data.value);
				if (lhdzPlayer != null && lhdzPlayer.position < 8) {
					lhdzPlayer.addStakeInfo(data.type, data.value);
					if (headIcon) headIcon.UpdatePlayerHead(lhdzPlayer);
				}
			}
			// if (playerInfo) console.log('playerInfo ===== ', playerInfo.postion, playerInfo.nickName);
			if (playerInfo && playerInfo.postion == 2) {
				// 是赌神
				this.lhdzData.recordDushenTypeBet(data.type, data.value);
				let v = this.lhdzData.getRecordDushenTypeBet(data.type);
				let targetBetInfoUI = this.betInfoArr[data.type - 1];
				if (!targetBetInfoUI.hasFlagDuShen && v > GameCfg.getNumberValue("LhdzDushenCondition_" + RoomManager.getInstance().curRoomData.gameLevel)) {
					this.setTimeOut(() => {
						this.shensuanziParticle(targetBetInfoUI);
					}, 500);
				}
			}
		}

		private getBetButtonByValue(value: number): LhdzBetButton {
			return this.betBtnArr[this.customBetNums.indexOf(value)];
		}

		private stakeEffect(playerId, type, betNum) {
			let from: egret.DisplayObject = this.playerListBtn;
			let fromPos: egret.Point = from.localToGlobal(0, 0);
			if (playerId == UserService.instance.playerId) {
				// 如果是自己从筹码处飞出去
				from = this.getBetButtonByValue(betNum);
				fromPos = from.localToGlobal(from.width / 2, from.height / 2);
			} else {
				let headIcon = this.getHeadIconByPlayerId(playerId);
				if (headIcon) {
					from = headIcon;
					fromPos = headIcon.getHeadPos();
				}
			}
			var to = this.betTouchGroups[type - 1];

			var betBtn = this.betButtonFactory(playerId, type, betNum);
			this.betContainer.addChild(betBtn);
			var gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			var level = gameLevel == 0 ? 2 : gameLevel;
			betBtn.showLittleButton(level, this.customBetNums.indexOf(betNum) + 1);

			let offsetX = Math.random() * (to.width - betBtn.width) + (betBtn.width / 2);
			let offsetY = Math.random() * (to.height - betBtn.height) + (betBtn.height / 2);

			fromPos = betBtn.parent.globalToLocal(fromPos.x, fromPos.y);
			betBtn.x = fromPos.x;
			betBtn.y = fromPos.y;

			if (from instanceof LhdzHeadIcon) {
				(<LhdzHeadIcon>from).stakeEffect();
			}
			this.flyBetBtn(betBtn, offsetX, offsetY, from, to);

			return betBtn;
		}

		public betButtonFactory(playerId, type, betNum): LhdzBetButton {
			var betBtn = new LhdzBetButton();
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

		public startDealCard(data, flyBet = true, dealCard = true) {
			//重置翻牌
			this.clearAllTimeOut();
			egret.Tween.removeTweens(this.dragonCard);
			egret.Tween.removeTweens(this.tigerCard);
			this.dragonCard.clearAllTimeOut();
			this.tigerCard.clearAllTimeOut();
			this.dragonCard.showBack();
			this.tigerCard.showBack();
			this.dragonCard.y = -98;
			this.tigerCard.y = -98;

			var typeWin = 3;
			for (let i = 0; i < data.cardInfos.length; i++) {
				let cardInfo = data.cardInfos[i];
				if (cardInfo.isWin) {
					typeWin = cardInfo.type;
				}
				if (dealCard == true) {
					if (cardInfo.type == 1) {
						this.setTimeOut(()=>{
							egret.Tween.get(this.dragonCard).to({ y: 99 }, 200).call(() => {
								this.dragonCard.showCard2(cardInfo.card);
							}, this).wait(1500).to({ y: -98 }, 200);
						}, 1000)
					}
					if (cardInfo.type == 2) {
						this.setTimeOut(()=>{
							egret.Tween.get(this.tigerCard).to({ y: 99 }, 200).call(() => {
								this.tigerCard.showCard2(cardInfo.card);
							}, this).wait(1500).to({ y: -98 }, 200);
						}, 3000);
					}
				} else {
					if (cardInfo.type == 1) this.dragonCard.showCard(cardInfo.card);
					if (cardInfo.type == 2) this.tigerCard.showCard(cardInfo.card);
				}
			}

			if (dealCard == true) {
				var self = this;
				this.setTimeOut(()=>{
					if (this.parent == null) {
						return;
					}
					switch (typeWin) {
						case 1:
							LhdzSoundPlayer.instance.playLongWin();
							this.showWinMc(LHDZWinTableType.LONG);
							this.showWinAmin(LHDZWinTableType.LONG);
							break;
						case 2:
							LhdzSoundPlayer.instance.playHuWin();
							this.showWinMc(LHDZWinTableType.HU);
							this.showWinAmin(LHDZWinTableType.HU);
							break;
						case 3:
							LhdzSoundPlayer.instance.playHe();
							this.showWinMc(LHDZWinTableType.HE);
							break;
					}
					if (flyBet == true) {
						self.setTimeOut(()=> {
							var winType = typeWin;
							var to = this.betTouchGroups[winType - 1];
							this.flyParticle(to, () => {
								this.lhdzHistoryBar.showHistory(data, true);
							})
							self.onBattleFinish(data, winType);
						}, 1500);
					} else {
						this.resultTips(data.stakeInfo);
					}
				}, 5000);
			} else {
				if (this.parent == null) {
					return;
				}
				switch (typeWin) {
					case 1:
						LhdzSoundPlayer.instance.playLongWin();
						this.showWinMc(LHDZWinTableType.LONG);
						this.showWinAmin(LHDZWinTableType.LONG);
						break;
					case 2:
						LhdzSoundPlayer.instance.playHuWin();
						this.showWinMc(LHDZWinTableType.HU);
						this.showWinAmin(LHDZWinTableType.HU);
						break;
					case 3:
						LhdzSoundPlayer.instance.playHe();
						this.showWinMc(LHDZWinTableType.HE);
						break;
				}
				if (flyBet == true) {
					self.setTimeOut(()=>{
						var winType = typeWin;
						var to = this.betTouchGroups[winType - 1];
						this.flyParticle(to, () => {
							this.lhdzHistoryBar.showHistory(data, true);
						})
						self.onBattleFinish(data, winType);
					}, 1500);
				} else {
					this.resultTips(data.stakeInfo);
				}
			}
		}

		public showWinMc(winTableType:LHDZWinTableType): void {
			let playAnim:DragonAnim;
			if(winTableType == LHDZWinTableType.HE) {
				playAnim = this.heWinTableAnim;
			} else if(winTableType == LHDZWinTableType.LONG) {
				playAnim = this.longWinTableAnim;
			} else if(winTableType == LHDZWinTableType.HU) {
				playAnim = this.huWinTableAnim;
			}
			playAnim.visible = true;
			playAnim.playerOnce(()=>{
				playAnim.visible = false;
			}, this);
		}

		public showWinAmin(winTableType:LHDZWinTableType): void {
			let playAnim:DragonAnim;
			if(winTableType == LHDZWinTableType.LONG) {
				playAnim = this.longWinTableAnim;
			} else if(winTableType == LHDZWinTableType.HU) {
				playAnim = this.huWinTableAnim;
			}
			if(playAnim) {
				playAnim.visible = true;
				playAnim.playerOnce(()=>{
					playAnim.visible = false;
				}, this);
			}
		}

		/** 游戏结果 */
		public onBattleFinish(data, winType) {
			console.log("onBattleFinish === ", data);
			this.flyLoseBet(data, winType);
		}

		//飞输的筹码
		private flyLoseBet(data: any, winType: number) {
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var betBtn: LhdzBetButton;

			for (var l = 0; l < this.betHash.length; l++) {
				let space = this.betHash[l].length > 30 ? 5 : 10;
				// 和牌没有输家
				if (this.betHash[l] && this.betHash[l].length > 0 && winType != 3) {
					for (let j = 0; j < this.betHash[l].length; j++) {
						betBtn = this.betHash[l][j];
						if (betBtn.type == winType) {
						} else {
							to = this.lhdzHistoryBar.banker;
							from = this.betTouchGroups[l];
							this.flyBetBtnByPlayerFocus(betBtn, 0, 0, from, to, 400 + l * 50 + space * j);
						}
					}
				}
				if (l == (this.betHash.length - 1)) {
					this.setTimeOut(()=>{
						this.flyWinBet(data, winType);
					}, 1000);
				}
			}
		}

		//飞赢的筹码
		private flyWinBet(data: any, winType: number) {
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var betBtn: LhdzBetButton;

			let count = 0;
			let maxCount = 40;
			let winTypes = winType - 1;
			if (this.betHash[winTypes] && this.betHash[winTypes].length > 0) {
				let space = this.betHash[winTypes].length > 30 ? 5 : 10;
				for (let w = 0; w < this.betHash[winTypes].length; w++) {
					betBtn = this.betHash[winTypes][w];
					if (betBtn.type == winType) {
						count++;
						if (count > maxCount) break;
						var newBetBtn = this.betButtonFactory(betBtn.playerId, betBtn.type, betBtn.betNum);
						this.betContainer.addChild(newBetBtn);
						from = this.lhdzHistoryBar.banker;
						let fromPos: egret.Point = from.localToGlobal(0, 0);
						to = this.betTouchGroups[winTypes];
						fromPos = this.betContainer.globalToLocal(from.x, from.y);
						newBetBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, (this.customBetNums.indexOf(betBtn.betNum) + 1));
						newBetBtn.x = fromPos.x;
						newBetBtn.y = fromPos.y;

						let offsetX = Math.random() * (to.width - betBtn.width) + (betBtn.width / 2);
						let offsetY = Math.random() * (to.height - betBtn.height) + (betBtn.height / 2);

						this.flyBetBtntoPlayer(newBetBtn, offsetX, offsetY, from, to, 550 + space * w);
					}
				}

				let self = this;
				this.setTimeOut(()=>{
					self.flyPosBet(data, winType);
				}, 1500);
			}
		}

		//飞对应位置筹码(自己或者玩家)
		private flyPosBet(data: any, winType: number) {
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var betBtn: LhdzBetButton;

			let winTypes = winType - 1;
			for (var o = 0; o < this.betHash.length; o++) {
				if (this.betHash[o] && this.betHash[o].length > 0) {
					let space = this.betHash[o].length > 30 ? 5 : 10;
					for (let p = 0; p < this.betHash[o].length; p++) {
						betBtn = this.betHash[o][p];
						if (this.positionMap[betBtn.playerId] != undefined && this.getHeadIconByPos(this.positionMap[betBtn.playerId]) != undefined) {
							to = this.getHeadIconByPos(this.positionMap[betBtn.playerId]).headIconImg;
						} else {
							to = this.playerListBtn;
						}
						if (to == null && to == undefined) {
							to = this.playerListBtn;
						}
						from = this.betTouchGroups[o];
						this.flyBetBtnByPlayerFocus(betBtn, 0, 0, from, to, 550 + space * p);
					}
				}
				if (o == this.betHash.length - 1) {
					this.setTimeOut(()=>{
						this.resultTips(data.battleInfo);
					}, 500);
				}
			}
		}

		private resultTips(data: any) {
			// 这个方法调用表示已经结束结算的画面播放了
			LhdzData.resultPlayEnd = true;
			if (data != null && data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					let tempInfo = data[i];
					let battlePlayerId = Number(data[i].playerId);
					let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(battlePlayerId);
					if(!playerInfo) continue;
					if(playerInfo.postion == 0) {
						// 是庄家
						if (tempInfo.money > 0) {
							this.lhdzHistoryBar.showWin(data[i].money);
						} else if (tempInfo.money < 0) {
							this.lhdzHistoryBar.showLose(data[i].money);
						}
						this.lhdzHistoryBar.updateBankerMoney(tempInfo.totalMoney);
					} else {
						let headIcon: LhdzHeadIcon = this.getHeadIconByPos(this.lhdzData.getPlayerById(battlePlayerId).position);
						if (headIcon == null) {
							continue;
						}
						if (tempInfo.money > 0) {
							if (battlePlayerId == UserService.instance.playerId) {
								LhdzSoundPlayer.instance.playSelfWin();
							}
							headIcon.showWin(data[i].money);
							headIcon.showImmGold(tempInfo.totalMoney);
						} else if (tempInfo.money < 0) {
							headIcon.showLose(data[i].money);
							headIcon.showImmGold(tempInfo.totalMoney);
						}
					}
					playerInfo.money = tempInfo.totalMoney;
					if (battlePlayerId == UserService.instance.playerId) {
						console.log('resultTips ===== ', data[i].totalMoney);
						this.headIcon0.showImmGold(tempInfo.totalMoney);
						LhdzData.selfTotolMoney = this.tempBetGold;
					} 
				}
			}
		}

		private flyBetBtn(betBtn, offsetX, offsetY, from, to, remove = false, save = true) {
			betBtn.randomRotation();
			let point = to.localToGlobal(offsetX, offsetY);
			point = this.betContainer.globalToLocal(point.x, point.y);
			egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, 1000, egret.Ease.quartOut).call(() => {
				if (betBtn.stage) LhdzSoundPlayer.instance.playBetCoin();
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
					if (betBtn.stage && isSound) LhdzSoundPlayer.instance.playWinCoin();
					if (remove && betBtn.parent != null) {
						betBtn.parent.removeChild(betBtn);
					}
				}, this);
			}
		}

		private flyBetBtntoPlayer(betBtn, offsetX, offsetY, from, to, addTime: number, isSound: boolean = true, save = true) {
			betBtn.randomRotation();
			let point = to.localToGlobal(offsetX, offsetY);
			point = this.betContainer.globalToLocal(point.x, point.y);
			egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, addTime, egret.Ease.quartOut).call(() => {
				if (betBtn.stage && isSound) LhdzSoundPlayer.instance.playWinCoin();
				if (save) this.betHash[(betBtn.type - 1)].push(betBtn);
			}, this);
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

		public showFapaiTween(): void {
			let arr: LhCard[] = [this["dragonCard"], this["tigerCard"]];
			let index = 0;

			for (var i = 0; i < 2; i++) {
				arr[i].showBack();
				arr[i].visible = false;
				this.fapai(arr[i], i * 5);
			}
		}

		private fapai(bjlcard: LhCard, index) {
			this.setTimeOut(()=>{
				var bsCard = new BSTweenCard();

				this.addChild(bsCard);
				bsCard.tweenCard.source = "lhdz_battle_json.cards_back";
				bsCard.scaleX = 0.3;
				bsCard.scaleY = 0.3;
				bsCard.x = (Global.designRect.x / 2) + 50;
				bsCard.y = Global.designRect.y / 2;
				var targetPoint = bjlcard.localToGlobal(200, 240);
				targetPoint = bsCard.parent.globalToLocal(targetPoint.x, targetPoint.y);
				bsCard.startTween2(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, this.scaleX, this.scaleY, -180, bjlcard);
			}, index * 100);
		}

		public backToMainBg(): void {
			this.lhdzData = null;
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		//续押
		private onContinueButton(event: egret.TouchEvent) {
			this.continueBtn["hasClick"] = true;
			for (let data of this.prevCache) {
				this.tempBetGold -= data.buttonValue;
				this.tempBetGold = Math.max(0, this.tempBetGold);
				this.headIcon0.showImmGold(this.tempBetGold);
				LhdzData.selfTotolMoney = this.tempBetGold;
				this.lhdzData.getPlayerById(UserService.instance.playerId).money = this.tempBetGold;
				this.refreshBtnState();
				this.stakeEffect(UserService.instance.playerId, data.buttonType, data.buttonValue);
				LhdzRequest.SendBets(data.buttonType, data.buttonValue);
				let buttonType = data.buttonType;
				let buttonValue = data.buttonValue;
				this.cacheBet.push({ buttonType, buttonValue });
			}
			this.continueBtn.enabled = false;
		}

		public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
			this.tempBetGold += drawmoney;
			if (this.currStatus == LHStatus.stopBet) {
				this.lhdzData.getPlayerById(UserService.instance.playerId).money = totalmoney;
			}
			this.headIcon0.showImmGold(totalmoney);
			LhdzData.selfTotolMoney = this.tempBetGold;
			this.refreshBtnState();
		}

		private validateBetButton(betButton): boolean {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			if (roomData.gameLevel > 0) {
				if (this.tempBetGold >= this.getBetButtonValue(betButton)) {
					return true;
				}
			} else {
				if (this.lhdzData != null && this.lhdzData.getPlayerById(UserService.instance.playerId) != null && this.lhdzData.getPlayerById(UserService.instance.playerId).money >= this.getBetButtonValue(betButton)) {
					return true;
				}
			}
			return false;
		}

		private refreshBtnState() {
			if(LhdzData.isSelfBanker() || this.currStatus != LHStatus.startBet) {
				for(let btn of this.betBtnArr) {
					btn.canChoose = false;
				}
				this.continueBtn.enabled = false;
				return;
			}

			let avaliableArr = [];
			for(let btn of this.betBtnArr) {
				let v = this.getBetButtonValue(btn);
				if(this.tempBetGold < v) {
					btn.canChoose = false;
				} else {
					btn.canChoose = true;
					avaliableArr.push(btn);
				}
			}
			
			let xuyaNeedValue = 0;
			for(let p of this.prevCache) {
				xuyaNeedValue += p.buttonValue;
			}
			if(this.tempBetGold < xuyaNeedValue) {
				this.continueBtn.enabled = false;
			} else {
				if(this.prevCache && this.prevCache.length > 0 && !this.continueBtn["hasClick"]) {
					this.continueBtn.enabled = true;
				}
			}
			if(this.currStatus == LHStatus.startBet) {
				if(this.lastChooseBet == -1) {
					this.lastChooseBet = 0;
				}
				if(this.lastChooseBet > (avaliableArr.length - 1)) {
					if(avaliableArr.length > 0) {
						this.selectedBetButtonByIndex(avaliableArr.length - 1);
					}
				} else {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				}
			}
		}

		public shensuanziParticle(targetBetInfoUI: LhdzBetInfoUI) {
			if (targetBetInfoUI.hasFlagDuShen) return;
			targetBetInfoUI.hasFlagDuShen = true;
			let startPoint = this.playerHeads[1].getShensuzniStartPoint();
			if (startPoint) {
				let endPoint = targetBetInfoUI.getShensuanziPos();
				let index = this.betInfoArr.indexOf(targetBetInfoUI);
				if (endPoint) {
					let cfg = RES.getRes("lhdz_lz_json");
					cfg.maxParticles = 100 - 10 * index;
					let chargeParticle = CommonUtil.generateDirectionParticle(
						RES.getRes("lhdz_lz_png"),
						cfg,
						startPoint, endPoint, 800,
						() => {
							targetBetInfoUI.showShensuanziAnim();
						}, this);
					chargeParticle.start();
					this.addChild(chargeParticle);
				}
			}
		}

		public flyParticle(start, func: Function) {
			let startPoint = start.localToGlobal(start.width / 2, start.height / 2);
			if (startPoint) {
				let endPoint = this.lhdzHistoryBar.getBoomAnimPos();
				if (endPoint) {
					let cfg = RES.getRes("lhdz_lz_json");
					cfg.maxParticles = 100;
					let chargeParticle = CommonUtil.generateDirectionParticle(
						RES.getRes("lhdz_lz_png"),
						cfg,
						startPoint, endPoint, 800,
						() => {
							func();
						}, this);
					chargeParticle.start();
					this.addChild(chargeParticle);
				}
			}
		}

		protected onLeave() {
			super.onLeave();
			for(let headIcon of this.playerHeads) {
				headIcon.clearPlayerInfo();
			}
		}

	}
}