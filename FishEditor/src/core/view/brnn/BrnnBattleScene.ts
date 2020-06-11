module game.brnn {
	enum BrStatus{
		startBet = 1,
		stopBet = 2,
		dealCard = 3
	}
	export class BrnnBattleScene extends GameScene{
		public constructor() {
			super();
			this.gameType = ChildGameType.BRNN;
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public contentGroup:eui.Group;
		public backBtn : IButton;
		private bankBtn:eui.Button;
		public bottomBetLabel : eui.Label;
		public playerListBtn : eui.Button;
		public applyBanker : IButton;
		public forceBanker: IButton;
		public downBanker : IButton;
		public helpBtn : IButton;
		public historyBtn : IButton;
		public settingAudioBtn : IButton;
		public chargeBtn : IButton;
		public betGroup : eui.Group;
		public betButton1 : BetButton;
		public betButton10 : BetButton;
		public betButton50 : BetButton;
		public betButton100 : BetButton;
		public betButton500 : BetButton;
		public betButton1000 : BetButton;
		public xuyaBtn: eui.Button;
		public bankerHead : BrnnHeadIcon;
		public selfHead : BrnnHeadIcon;
		public headIcon1 : BrnnHeadIcon;
		public headIcon2 : BrnnHeadIcon;
		public headIcon3 : BrnnHeadIcon;
		public headIcon4 : BrnnHeadIcon;
		public headIcon5 : BrnnHeadIcon;
		public headIcon6 : BrnnHeadIcon;
		public cardGroup1 : BRNNCardGroup;
		public cardGroup2 : BRNNCardGroup;
		public cardGroup3 : BRNNCardGroup;
		public cardGroup4 : BRNNCardGroup;
		public cardGroup5 : BRNNCardGroup;
		public typeBetInfo1 : BrnnTypeBetInfoUI;
		public typeBetInfo2 : BrnnTypeBetInfoUI;
		public typeBetInfo3 : BrnnTypeBetInfoUI;
		public typeBetInfo4 : BrnnTypeBetInfoUI;
		public areaBtn1 : eui.Button;
		public areaBtn2 : eui.Button;
		public areaBtn3 : eui.Button;
		public areaBtn4 : eui.Button;
		private stakeArea1:eui.Group;
		private stakeArea2:eui.Group;
		private stakeArea3:eui.Group;
		private stakeArea4:eui.Group;
		private stakeAreaArr:Array<game.StakeArea> = [];
		public heartLightingTween : egret.tween.TweenGroup;
		public diamondLightingTween :egret.tween.TweenGroup;
		public spadeLightingTween : egret.tween.TweenGroup;
		public clubLightingTween : egret.tween.TweenGroup;
		public brnnHistoryPanel : BrnnHistoryPanel;
		public fapaiqiImg:eui.Image;
		public fapaiFlag:eui.Group;

		// public waitGroup : egret.tween.TweenGroup;
		public recoutTips : BrnnTips;
		public startGroup : eui.Group;
		public changeBankerGroup:eui.Group;
		public stopGroup : eui.Group;
		private betChangeBgImg:eui.Image;
		// public stopBG : eui.Image;
		public stopIcon : eui.Image;
		public waitLabel : eui.Label;
		public roomName : eui.BitmapLabel;
		public betInfoGroup : eui.Group;
		private lightFlagImg1:eui.Image;
		private lightFlagImg2:eui.Image;
		private lightFlagImg3:eui.Image;
		private lightFlagImg4:eui.Image;
		private lightFlagImg5:eui.Image;
		private lightFlagImg6:eui.Image;
		private lightFlagImgArr:Array<eui.Image>;
		//----------数据与结构
		public playerHeads:BrnnHeadIcon[] = null;
		public playerCardArr:BRNNCardGroup[] = null;
		public touchGroupArr : eui.Button[] = null;
		public betBtnArr : BetButton[] = null;
		public betInfoArr : BrnnTypeBetInfoUI[] = null;
		public currBetButton : BetButton = null;
		private brnnData : BrnnData = null;
		public battleStartCountDown:game.BrnnCountDown;
		private currStatus : BrnnStatus = BrnnStatus.PREPARE;
		private allBets : Object[] = null;
		private tempBetPools : BetButton[] = [];
		private tempBetGold : number = 0;		


		private betHash : BetButton[][];
		public betContainer : eui.Group;
		private otherPlayerGoldenFlag:eui.Group;
		public isBanker = false;
		public isInit = false;
		private isStart : boolean = false;

		private level0BetNums : number[] = [10,50,100,200,500];
		private level1BetNums : number[] = [1,5,10,50,100,200];
		private level2BetNums : number[] = [10,50,100,200,500,1000];
		private level3BetNums : number[] = [50,100,200,500,1000,2000];
		private customBetNums : number[];
		
		public gameType : number;
		public gameLevel : number;

        private menuGroup:MenuGroup;
        private menuArrowImg:eui.Image;
        private menuContent:eui.Group;
		private roundResult:BrnnRoundResult;
		private prevCache:Array<any> = []; 
		private cacheBet:Array<any> = []; 
		private onlineLabel:eui.Label;
		private bankerApplyCountLabel:eui.Label;
		private lastChooseBet:number = -1;
		private lastOpenLevel:number = -1;
		private _curGameRound:number = 0;

		public set curGameRound(v:number) {
			this._curGameRound = v;
			if(this.brnnData) {
				this.brnnData.curGameRound = this._curGameRound;
			}
		}
		public get curGameRound() {
			return this._curGameRound;
		}
		private waitGroup:eui.Group;
		private waitAnim:DragonAnim;
		private recordBtnPosYArr:Array<number>;
		private specialGroup:eui.Group;
		private tongchiAnim:DragonAnim;
		private tongpeiAnim:DragonAnim;
		private testBtn:eui.Button;
		private taskExecutor:game.BehaviorTaskExecutor;
		private playerOnlineGroup:eui.Group;
		protected componentInit():void
		{
			this.playerHeads = [this.bankerHead,this.selfHead, this.headIcon1,this.headIcon2,this.headIcon3,this.headIcon4];
			this.playerCardArr = [this.cardGroup1 , this.cardGroup2 , this.cardGroup3 , this.cardGroup4,this.cardGroup5];
			this.betBtnArr = [this.betButton1 , this.betButton10 ,this.betButton50 , this.betButton100 , this.betButton500, this.betButton1000];
			this.betInfoArr = [this.typeBetInfo1 ,this.typeBetInfo2 ,this.typeBetInfo3 ,this.typeBetInfo4];
			this.touchGroupArr = [this.areaBtn1 , this.areaBtn2 , this.areaBtn3 , this.areaBtn4];
			this.lightFlagImgArr = [this.lightFlagImg1, this.lightFlagImg2, this.lightFlagImg3,
				this.lightFlagImg4, this.lightFlagImg5, this.lightFlagImg6]
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelpBtntap , this);
			this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtntap , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
			this.bankerHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerHeadClick, this);
			this.stakeAreaArr = [
				game.StakeArea.convertFromGroup(this.stakeArea1),
				game.StakeArea.convertFromGroup(this.stakeArea2),
				game.StakeArea.convertFromGroup(this.stakeArea3),
				game.StakeArea.convertFromGroup(this.stakeArea4)
			]
			this.battleStartCountDown = new game.BrnnCountDown();
			// this.battleStartCountDown.tipsPanel = this.recoutTips;
			this.battleStartCountDown.countDownLabel = this.recoutTips.countLabel;
			this.battleStartCountDown.noticeAnim = this.recoutTips.clockAnim;
			this.battleStartCountDown.tipsPanel = this.recoutTips;
			this.battleStartCountDown.setSound("brnn_countdown_mp3");
			this.applyBanker.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onApplyBanker , this);
			this.forceBanker.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onForceBanker , this);
			this.downBanker.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onDownBanker , this);

			this.chargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onChargeBtn , this);
			// this.historyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHistory , this);
			this.playerOnlineGroup.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPlayerList , this);
			this.customBetNums = this.level0BetNums;
			this.recordBtnPosYArr = [];
			for(var i = 0 ; i < this.betBtnArr.length ; i++)
			{
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.selectedBetButton , this);
				this.betBtnArr[i].bindFlagImg(this.lightFlagImgArr[i]);
				this.betBtnArr[i].defaultY = this.betBtnArr[i].y;
			}
			
			for(var i = 0 ; i < this.betInfoArr.length ; i++)
			{
				this.touchGroupArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.startStakeTap , this);
			}
			for(let img of this.lightFlagImgArr) {
				img.visible = false;
			}
			this.xuyaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.sendCacheBet , this);
			// this.initScene();
			this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "brnn_menu_btn_down", "brnn_menu_btn_up");
			if(!this.roundResult["dark"]) {
				let darkSprite = new egret.Sprite();
				darkSprite.graphics.clear();
				darkSprite.graphics.beginFill(0x000000, 0.5);
				darkSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
				darkSprite.graphics.endFill();
				darkSprite.width = GameConfig.curWidth();
				darkSprite.height = GameConfig.curHeight();
				this.roundResult["dark"] = darkSprite;
				this.roundResult.addChildAt(darkSprite, 0);
				let p = this.roundResult.globalToLocal(0,0);
				darkSprite.x = p.x;
				darkSprite.y = p.y;
				darkSprite.touchEnabled = false;
			}
			this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shensuanziParticleTest, this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tstObj, this);
			CommonUtil.bindTouchEffect(this.playerOnlineGroup);
		}

		private tstObj(e:egret.TouchEvent) {
			console.log(e.currentTarget, e.target);
		}

		private onBankerHeadClick() {
			let p = this.bankerHead.headIconImg.localToGlobal(
				this.bankerHead.headIconImg.width,
				this.bankerHead.headIconImg.height)
			let roomData = RoomManager.getInstance().curRoomData;
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, {pos:p, gameType:roomData.gameType});
		}

		private onSettingBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BRNN);
		}

		private onHelpBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BRNN);
		}

		private openBank() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BRNN);
		}

		private resetAllBetBtn() {
			for(let i=0;i<this.betBtnArr.length;i++) {
				this.betBtnArr[i].y = this.recordBtnPosYArr[i];
			}
		}

		protected onOpen() {
			this.isInit = true;
			this.isDownOper = false;
			if(this.isStart)
			{
				this.initScene();
			}
			this.menuGroup.showDeault();
			this.roundResult.visible = false;
			this.cacheBet = [];
			this.xuyaBtn.enabled = false;
			this.onlineLabel.text = game.RoomManager.getInstance().curRoomData.onlineCount.toFixed(0);
			this.changeBankerGroup.visible = false;
			let level = RoomManager.getInstance().curRoomData.gameLevel;
			if(level != this.lastOpenLevel) {
				this.lastChooseBet = 0;
			} 
			this.lastOpenLevel = level;
			this.gameLevel = level;
			this.waitGroup.visible = false;
			let index = 1;
			for(let betBtn of this.betBtnArr) {
				betBtn.gameLevel = level;
				betBtn.index = index;
				index++;
			}
			this.chooseChip();
			this.resetAllBetBtn();
			this.specialGroup.visible = false;
		}
		
		public refreshPlayerInfo() {
			// 刷新身上的金钱
			
		}

		public getName() : string
		{
			switch(RoomManager.getInstance().curRoomData.gameLevel)
			{
				case 0:
				{
					return "体验场";
				}
				case 1:
				{
					return "普通场";
				}
				case 2:
				{
					return "高级场";
				}
				case 3:
				{
					return "富豪场";
				}
			}
			return "房间";
		}

		private onChargeBtn(){
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BRNN);
		}

		public onForceBanker() {
			if(this.tempBetGold < BrnnData.bankerUpMoneyLimit * 2) {
				TipsUI.showTips({
					"text": "您的余额不足,无法抢庄,抢庄条件:"+BrnnData.bankerUpMoneyLimit*2+"元",
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
			BrnnRequest.sendApplyBanker(2);
		}

		public onApplyBanker()
		{
			if(this.tempBetGold < BrnnData.bankerUpMoneyLimit) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:"+BrnnData.bankerUpMoneyLimit+"元",
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
			BrnnRequest.sendApplyBanker(1);
		}
		public isDownOper:boolean = false;
		public onDownBanker() {
			this.isDownOper = true;
			BrnnRequest.sendDownBanker();
		}

		public downBankerRet(data)
		{
			if(this.isDownOper) {
				if (this.brnnData.isSelfBanker()) {
					TipsUtils.showTipsFromCenter("申请成功,下局下庄");
				} else {
					TipsUtils.showTipsFromCenter("下庄成功");
				}
				this.isDownOper = false;
			}
			this.brnnData.setBankerData(data.bankerInfos);
			this.updateBankerState();
		}

		private updateBankerState() {
			if(this.brnnData.isSelfInBankerUpList() || this.brnnData.isSelfBanker()) {
				this.downBanker.visible = true;
				this.applyBanker.visible = this.forceBanker.visible = false;
			} else {
				this.downBanker.visible = false;
				this.applyBanker.visible = this.forceBanker.visible = true;
			}
			this.bankerApplyCountLabel.text = "申请人数:" + this.brnnData.bankerList.length;
		}

		public showOnlineCount(count:number) {
			this.onlineLabel.text = count.toFixed(0);
		}

		public onApplyBankerRet(data)
		{
			if(this.brnnData.addBankerData(data).playerId == UserService.instance.playerId) {
				TipsUtils.showTipsFromCenter("申请成功");	
			}
			this.updateBankerState();
		}


		public onUpdateBanker(data)
		{
			var playerInfo = new PlayerInfo();
			playerInfo.headFrameNum = data.headFrameNum;
			playerInfo.headNum = data.headNum;
			playerInfo.money = data.money;
			playerInfo.nickName = data.nickName;
			playerInfo.playerId = Number(data.bankerPlayerId);
			playerInfo.vipLevel = data.vipLevel;

			if(playerInfo.playerId == UserService.instance.playerId)
			{
				this.isBanker = true;
				this.applyBanker.visible = false;
				this.downBanker.visible = true;
			}else
			{
				this.isBanker = false;
				this.applyBanker.visible = true;
				this.downBanker.visible = false;
			}
		}

		public onHistory()
		{
			BrnnRequest.requestOPWinFail(0);
		}

		public onPlayerList()
		{
			BrnnRequest.requestPlayerBank(0);
		}

		public initScene()
		{
			this.isStart = true;
			if(this.isInit)
			{
				this.init();
			}
		}

		public clearBattle() {
			// 清除所有筹码
			for(let i=0;i<this.betContainer.numChildren;i++) {
				egret.Tween.removeTweens(this.betContainer.getChildAt(i));
			}
			this.betContainer.removeChildren();
			this.clearCardRelative();
			// 结算界面需要关闭
			this.roundResult.onClose();
		}

		public clearCardRelative() {
			// 停止发牌 翻牌各种动画
			for(let cardGroup of this.playerCardArr){
				cardGroup.stopAnim();
			}
		}

		public checkTask() {
			if(this.taskExecutor) {
				this.taskExecutor.stop();
				this.taskExecutor = null;
			}
		}

		private init()
		{
			this.brnnData = new BrnnData();
			this.recoutTips.visible = false;
			this.startGroup.visible = false;
			this.betChangeBgImg.visible = false;
			this.stopGroup.visible = false;
			this.roomName.text = this.getName();
			var roomData : RoomData = RoomManager.getInstance().curRoomData;
			this.bottomBetLabel.text = roomData.bottomBet.toString();
			for(var i = 0 ; i < this.playerCardArr.length ; i++)
			{
				var playerCard = this.playerCardArr[i];
				playerCard.hideCard();
			}
			this.updateScene();
			BrnnSoundPlayer.instance.playBg();
			BrnnRequest.requestOPWinFail(0);
		}

		public ResumScene()
		{
			if(game.RoomManager.getInstance().curRoomData == null)
			{
				RoomRequest.sendEnterRoomInfo(this.gameType , this.gameLevel);
			}
			this.recoutTips.visible = false;
			this.startGroup.visible = false;
			this.betChangeBgImg.visible = false;
			this.stopGroup.visible = false;
			this.updateScene();
		}

		public chooseChip()
		{
			var gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			switch(gameLevel)
			{
				case 0:
				{	
					this.customBetNums = this.level0BetNums;
					break;
				}
				case 1:
				{	
					this.customBetNums = this.level1BetNums;
					break;
				}
				case 2:{
					this.customBetNums = this.level2BetNums;
					break;
				}
				case 3:
				{
					this.customBetNums = this.level3BetNums;
					break;
				}
			}
			for(var i = 0 ; i < this.betBtnArr.length; i++)
			{
				this.betBtnArr[i].showButton(gameLevel , i + 1);
			}
		}

		public updateScene() {
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			this.onlineLabel.text = roomData.onlineCount.toFixed(0);
			for(let headIcon of this.playerHeads) {
				headIcon.visible = false;
			}
			for(let r=0; r<roomData.playerInfos.length; r++) {
				let playerInfo:game.PlayerInfo = roomData.playerInfos[r];
				if(playerInfo.postion == 1) {
					this.selfHead.showPlayerHeadExcludeSpecial(playerInfo);
					continue;
				}
				if(this.playerHeads[playerInfo.postion]) {
					this.playerHeads[playerInfo.postion].ShowPlayerHead(playerInfo);
				}
			}
		}

		private updateStatusShow(status:number, downtime:number) {
			if(status == BrnnStatus.PREPARE) {
				// 显示等待时间
				this.recoutTips.visible = true;
				this.recoutTips.initUI("休息时间" , downtime);
				this.battleStartCountDown.startCountDown(downtime);
			} else if(status == BrnnStatus.START) {
				// 开始发牌
				this.recoutTips.visible = true;
				this.recoutTips.initUI("下注时间" , downtime);
				this.battleStartCountDown.startCountDown(downtime, true);
				for(var i = 0 ; i < this.playerCardArr.length;i++)
				{
					this.playerCardArr[i].visible = true;
					this.playerCardArr[i].showCardBack();
				}
				this.UpdateBetInfo(true);
				if(this.lastChooseBet >= 0) {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				} else {
					this.selectedBetButtonByIndex(0);
				}
			} else if(status == BrnnStatus.STOP) {
				this.UpdateBetInfo(false);
				this.recoutTips.visible = true;
				this.recoutTips.initUI("开牌时间" , downtime);
				this.battleStartCountDown.startCountDown(downtime);
			}
		}

		private resetBetHash() {
			this.betHash = new Array();
			this.betHash.push(new Array<BetButton>());
			this.betHash.push(new Array<BetButton>());
			this.betHash.push(new Array<BetButton>());
			this.betHash.push( new Array<BetButton>());
		}

		public showInitBetByNewRound(data:any) {
			this.brnnData = new BrnnData();
			// data.stakeInfo 只代表自己
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						let betInfo = this.betInfoArr[stakeInfo.type - 1];
						betInfo.updateSelfRetInfo(stakeInfo.value);
						this.brnnData.setForzenMoney(stakeInfo.value);	
					}	
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHead.showImmGold(this.tempBetGold);
				}
				for(let stakeInfo of battleInfo.playerStake) {
					this.brnnData.recordPlayerTypeBet(Number(battleInfo.playerId), stakeInfo.type, stakeInfo.value);
				}
			}
			
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.brnnData.addPlayer(playerInfo);
			this.resetBetHash();
			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				this.brnnData.recordTypeBetInfo(type, value);
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.updateTotalRetInfo(stakeInfo.value);
				let targetArea = this.stakeAreaArr[type - 1];
				for(let m = this.customBetNums.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.customBetNums[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , this.customBetNums[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(this.customBetNums[m]) + 1);
							let point = targetArea.randomPoint(betBtn.width);
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.betHash[type - 1].push(betBtn);
						}
					}
					value -= this.customBetNums[m] * betNum;
				}
			}
		}

		public handleDeltaBet(data:any) {
			this.brnnData.clearPlayerTypeBet();
			// data.stakeInfo 只代表自己
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				let retPlayerId = Number(battleInfo.playerId);
				if(retPlayerId == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						let betInfo = this.betInfoArr[stakeInfo.type - 1];
						betInfo.updateSelfRetInfo(stakeInfo.value);
						this.brnnData.setForzenMoney(stakeInfo.value);	
					}	
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHead.showImmGold(this.tempBetGold);
				}
				for(let stakeInfo of battleInfo.playerStake) {
					this.brnnData.recordPlayerTypeBet(retPlayerId, stakeInfo.type, stakeInfo.value);
				}
			}
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.brnnData.addPlayer(playerInfo);

			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.updateTotalRetInfo(stakeInfo.value);
				value = value - this.brnnData.getRecordTypeBet(type);
				this.brnnData.recordTypeBetInfo(type, value);
				let targetArea = this.stakeAreaArr[type - 1];
				for(let m = this.customBetNums.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.customBetNums[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , this.customBetNums[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, 
								this.customBetNums.indexOf(this.customBetNums[m]) + 1);
							let point = targetArea.randomPoint(betBtn.width);
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.betHash[type - 1].push(betBtn);
						}
					}
					value -= this.customBetNums[m] * betNum;
				}
			}
		}

		private resetBetInfoShow() {
			for(let betInfo of  this.betInfoArr)
			{
				betInfo.reset();
			}
		}

		private nextTickExec(data:any) {
			this.tempBetGold = 0;
			this.stopGroup.visible = false;
			this.startGroup.visible = false;
			this.recoutTips.visible = false;
			this.betChangeBgImg.visible = false;
			BrnnData.bankerUpMoneyLimit = data.upBankerMinMoney / 1000
			this.resetBetInfoShow();
			this.clearCardRelative();
			if(data.serialNumber == this.curGameRound && this.brnnData) {
				// 补充不足的金币
				this.handleDeltaBet(data)
			} else {
				this.clearBattle();
				this.showInitBetByNewRound(data);
			}
			this.brnnData.clearDushenTypeBet();
			for(let battleInfo of data.battleInfo) {
				let playerId = Number(battleInfo.playerId);
				let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
				if(playerInfo && playerInfo.postion == 2) {
					for(let stakeInfo of battleInfo.playerStake) {
						this.brnnData.recordDushenTypeBet(stakeInfo.type, stakeInfo.value);
						if(stakeInfo.value > 0) {
							this.betInfoArr[stakeInfo.type - 1].showShensuanziAnim();
							this.betInfoArr[stakeInfo.type - 1].hasFlagDuShen = true;
						}
					}
				}
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stake of battleInfo.playerStake) {
						if(stake.value > 0) {
							this.brnnData.isSelfBet = true;
						}
					}
				}
			}
			this.curGameRound = data.serialNumber;
			if(this.tempBetGold == 0) {
				let roomData = RoomManager.getInstance().curRoomData;
				this.tempBetGold = roomData.getPlayerInfo(UserService.instance.playerId).money;
			}
			this.updateStatusShow(data.status, data.downTime)
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			if(data.status == BrnnStatus.STOP) {
				this.taskExecutor = BrnnFinishTask.generateTaskFromStartData(data, this, this.brnnData.isSelfBet);
				this.taskExecutor.execute(20 - data.downTime);
				let isSelfBet = false;
				for(let battleInfo of data.battleInfo) {
					if(Number(battleInfo.playerId) == UserService.instance.playerId) {
						for(let stake of battleInfo.playerStake) {
							if(stake.value > 0) {
								isSelfBet = true;
							}
						}
					}
				}
				if(!isSelfBet) {
					// 显示下一局
					this.waitGroup.visible = true;
					this.waitAnim.play();
				}
				/*
				else {
					// 直接显示结算面板
					let roundResult = new BrnnRoundResultData();
					roundResult.setData(data.resultInfos, data.cardInfos);
					roundResult.showWaitTime = data.downTime * 1000;
					AppFacade.instance.sendNotification(CommonDataNotify.BRNN_ROUND_RESULT , roundResult);
				}
				*/
			}
			if(data.status == BrnnStatus.START) {
				for(var i = 0 ; i < this.playerCardArr.length;i++)
				{
					this.playerCardArr[i].visible = true;
					this.playerCardArr[i].showCardBack();
				}
			}
			if(data.status == BrnnStatus.PREPARE) {
				if(data.downTime < 2) {
					this.startFapai();
				} else {
					this.recoutTips.visible = true;
					this.recoutTips.initUI("休息时间" , data.downTime - 2);
					this.battleStartCountDown.startCountDown(data.downTime - 2);
					this.setTimeOut(this.startFapai, (data.downTime - 2) * 1000);
				}
			}
			this.currStatus = data.status;
			this.changeBankerGroup.visible = false;
			this.brnnData.setBankerData(data.bankerInfos);
			this.updateBankerState();
			this.onlineLabel.text = game.RoomManager.getInstance().curRoomData.onlineCount.toFixed(0);
			this.refreshBtnState();
		}
		public firstEnterRoom(data)
		{
			this.checkTask();
			for(let bankerInfo of data.bankerInfos) {
				this.brnnData.addBankerData(bankerInfo);
			}
			this.updateBankerState();
			CommonUtil.setNextFrameCall(()=>{
				this.nextTickExec(data);
			}, this);
		}

		private refreshBtnState() {
			if(this.brnnData.isSelfBanker() || this.currStatus != BrnnStatus.START) {
				for(let btn of this.betBtnArr) {
					btn.canChoose = false;
				}
				this.xuyaBtn.enabled = false;
				return;
			}

			let avaliableArr = [];
			for(let btn of this.betBtnArr) {
				let v = this.getBetButtonValue(btn);
				if(this.tempBetGold < (v * 4 + this.brnnData.frozenMoney)) {
					btn.canChoose = false;
				} else {
					btn.canChoose = true;
					avaliableArr.push(btn);
				}
			}
			
			let xuyaNeedValue = 0;
			for(let p of this.prevCache) {
				xuyaNeedValue += this.getBetButtonValue(p.betButton);
			}
			if(this.tempBetGold < (xuyaNeedValue * 4 + this.brnnData.frozenMoney)) {
				this.xuyaBtn.enabled = false;
			} else {
				if(this.prevCache && this.prevCache.length > 0 && !this.xuyaBtn["hasClick"]) {
					this.xuyaBtn.enabled = true;
				}
			}
			if(this.currStatus == BrnnStatus.START) {
				if(this.lastChooseBet > (avaliableArr.length - 1)) {
					if(avaliableArr.length > 0) {
						this.selectedBetButtonByIndex(avaliableArr.length - 1);
					}
				} else {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				}
			}
		}

		private selectedBetButton(event : egret.TouchEvent)
		{
			SoundMenager.instance.PlayClick();
			var index = this.betBtnArr.indexOf(event.currentTarget);
			if(index > -1)
			{
				this.selectedBetButtonByIndex(index);
			}
		}
		private selectedBetButtonByIndex(index : number)
		{
			for(var i = 0 ; i < this.betBtnArr.length ; i++)
			{
				if(!this.betBtnArr[i].canChoose) continue;
				if(i == index)
				{
					this.currBetButton = this.betBtnArr[i];
					this.currBetButton.lightMove();
					this.lastChooseBet = index;
				}else
				{
					this.betBtnArr[i].recovery();
				}
			}
		}

		private startStakeTapTrue(betInfo:any, betButton:BetButton, iscahce:boolean = true) {
			if(this.brnnData.getPlayerById(UserService.instance.playerId) == null)
			{
				return;
			}
			if(this.currStatus != BrnnStatus.START) {
				return;
			}
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			var buttonValue =  this.getBetButtonValue(betButton);
			if(this.tempBetGold < buttonValue * 4 + this.brnnData.frozenMoney)
			{
				// TipsUtils.moneyTipsGame(this,buttonValue);
				TipsUtils.showTipsFromCenter("当前金币不足");
				return;
			}
			
			var typeBetInfo : eui.Button;
			for(var i = 0 ; i < this.touchGroupArr.length ; i++)
			{
				typeBetInfo = this.touchGroupArr[i];
				if(betInfo == typeBetInfo)
				{
					if(betButton == null)
					{
						return;
					}
					if(!this.validateBetButton(betButton))
					{
						return;
					}
					var buttonType = this.getInfoType(typeBetInfo);
					//直接飞筹码
					this.tempBetGold -= buttonValue;
					this.selfHead.showImmGold(this.tempBetGold);
					this.brnnData.addFrozenMoney(buttonValue * 3);
					this.brnnData.isSelfBet = true;
					var betBtn = this.stakeEffect(UserService.instance.playerId , buttonType , buttonValue);
					this.tempBetPools.push(betBtn);
					this.refreshBtnState();
					BrnnRequest.SendBets(this.getInfoType(typeBetInfo) , this.getBetButtonValue(betButton));
					if(iscahce) this.cacheBet.push({betInfo:betInfo, betButton:betButton})
				}
			}
		}

		private startStakeTap(event : egret.TouchEvent)
		{
			if(this.brnnData.isSelfBanker()) {
				CommonUtil.noticeMsg("庄家不能下注");
				return;
			}
			if(this.currStatus != BrnnStatus.START) {
				CommonUtil.noticeMsg("请稍候，还没到下注时间");
				return;
			}
			this.startStakeTapTrue(event.currentTarget, this.currBetButton);
		}

		private sendCacheBet() {
			this.xuyaBtn["hasClick"] = true;
			let total = 0;
			for(let data of this.prevCache) {
				total += this.getBetButtonValue(data.betButton);
			}
			if(this.tempBetGold < total) {
				// 钱不够就不发协议了
				this.xuyaBtn.enabled = false;
				TipsUtils.showTipsFromCenter("金币不足");
				return ;
			}
			for(let data of this.prevCache) {
				this.startStakeTapTrue(data.betInfo, data.betButton, true);
			}
			this.xuyaBtn.enabled = false;
		}

		private getInfoType(typeBetInfo : eui.Button) : number
		{
			switch(typeBetInfo)
			{
				case this.areaBtn1:
					return 1;
				case this.areaBtn2:
					return 2;
				case this.areaBtn3:
					return 3;
				case this.areaBtn4:
					return 4;
			}
			return 0;
		}

		private preparedStart(data)
		{
			this.roundResult.onClose();
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.resetBetInfoShow();
			this.UpdateBetInfo(false);
			this.betContainer.removeChildren();
			for(let cardGroup of this.playerCardArr) {
				cardGroup.hideCard();
				cardGroup.visible = false;
			}
			if(data.downTime > 2) 
			{
				//请耐心等待下一局
				this.recoutTips.visible = true;
				this.recoutTips.initUI("休息时间" , data.downTime - 2);
				this.battleStartCountDown.startCountDown(data.downTime - 2);
			}
			if(data.downTime < 2) {
				this.startFapai();
			} else {
				this.setTimeOut(this.startFapai, (data.downTime - 2) * 1000);
			}
		}

		private startFapai() {
			this.recoutTips.visible = true;
			this.recoutTips.initUI("发牌时间" , 2);
			this.battleStartCountDown.startCountDown(2);
			//开始发牌
			let battleUI:BrnnBattleScene = this;
			for(let i = 0 ; i < 5 ; i++)
			{
				this.setTimeOut(()=> {
					this.playerCardArr[i].visible = true;
					let index = i;
					this.playerCardArr[i].startFapai(battleUI, index);    			
				}, 100 + i * 300);
			}
		}

		public pushBattleStatus(data)
		{
			this.currStatus = <BrnnStatus>data.status;
			switch(this.currStatus)
			{
				case BrnnStatus.PREPARE:
				{
					this.preparedStart(data);
					break;
				}
				case BrnnStatus.START:
				{
					this.onStartBet(data);
					break;
				}
				case BrnnStatus.STOP:
				{
					this.xuyaBtn.enabled = false;
					this.recoutTips.visible = true;
					this.recoutTips.initUI("开牌时间" , data.downTime);
					this.battleStartCountDown.startCountDown(data.downTime);
					this.onStopBet();
					break;
				}
				/*
				case BrStatus.dealCard:
				{
					this.applyBanker.enabled = false;
					break;
				}
				*/
			}

			if(data.isSwitchBanker) {
				this.playChangeZhuang()
				this.brnnData.checkBankerList();
				this.updateBankerState();
				this.refreshBtnState();
			}
		}

		private playChangeZhuang() {
			this.changeBankerGroup.visible = true;
			this.betChangeBgImg.visible = true;
			this.changeBankerGroup.alpha = this.betChangeBgImg.alpha = 1;
			this.setTimeOut(()=>{
				egret.Tween.get(this.changeBankerGroup).to({alpha : 0},1000).call(()=>{
					this.startGroup.visible = false;
					this.betChangeBgImg.visible = false;
					},this);
				egret.Tween.get(this.betChangeBgImg).to({alpha : 0},1000)
			},1000);
			SoundMenager.instance.playVoice("zhuang-change_mp3");
		}

		public onStartBet(data)
		{
			this.roundResult.onClose();
			this.xuyaBtn["hasClick"] = false;
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.betContainer.removeChildren();
			this.resetBetInfoShow();
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			roomData.status = game.GameStatus.RUNNING;
			let ori = this.brnnData;
			this.brnnData = new BrnnData();
			if(ori) {
				this.brnnData.bankerList = ori.bankerList;
			}
			for(let i=0;i<roomData.playerInfos.length;i++) 
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				this.brnnData.addPlayer(playerInfo);
				this.brnnData.getPlayerById(playerInfo.playerId).state = BRNNPlayerState.game;
				if(playerInfo.playerId == UserService.instance.playerId)
				{
					this.tempBetGold = this.brnnData.getPlayerById(UserService.instance.playerId).totolMoney;
				}
			}
			this.brnnData.setBanker(Number(data.bankerPlayerId));
			if(Number(data.bankerPlayerId) == UserService.instance.playerId)
			{
				this.UpdateBetInfo(false);
			}else
			{
				this.UpdateBetInfo(true);
			}
			if(this.isBanker)
			{
				this.betGroup.visible = false;
			}else
			{
				this.betGroup.visible = true;
			}
			this.currBetButton = this.betBtnArr[0];
			if(this.lastChooseBet >= 0) {
				this.selectedBetButtonByIndex(this.lastChooseBet);
			}
			
			BrnnSoundPlayer.instance.playShow();
			this.startGroup.visible = true;
			this.betChangeBgImg.visible = true;
			this.startGroup.alpha = this.betChangeBgImg.alpha = 1;
			this.stopGroup.visible = false;
			this.changeBankerGroup.visible = false;
			egret.Tween.get(this.startGroup).to({alpha : 0},1000).call(()=>{
				this.startGroup.visible = false;
				this.betChangeBgImg.visible = false;
				},this);
			egret.Tween.get(this.betChangeBgImg).to({alpha : 0},1000)
			this.setTimeOut(()=>{
				BrnnSoundPlayer.instance.playStartBet();
			}, 500);
			for(let cardGroup of this.playerCardArr) {
				cardGroup.visible = true;
				// cardGroup.showDefaultCard();
			}
			this.recoutTips.visible = true;
			this.recoutTips.initUI("下注时间" , data.downTime );
			this.battleStartCountDown.startCountDown(data.downTime, true);
			this.betHash = new Array();
			this.betHash.push(new Array<BetButton>());
			this.betHash.push(new Array<BetButton>());
			this.betHash.push(new Array<BetButton>());
			this.betHash.push(new Array<BetButton>());

			if(this.cacheBet.length > 0) {
				this.prevCache = this.cacheBet;
			}
			this.cacheBet = [];
			if(this.prevCache.length > 0) {
				this.xuyaBtn.enabled = true;
			} else {
				this.xuyaBtn.enabled = false;
			}
			this.refreshBtnState();
		}


		public onStakeRet(data){
			let retPlayerId = Number(data.playerId);
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(retPlayerId);
			if(this.brnnData) {
				this.brnnData.recordTypeBetInfo(data.type, data.value)
				this.brnnData.recordPlayerTypeBet(retPlayerId, data.type, data.value);
			}
			if(!this.betHash) {
				this.resetBetHash();
			}
			
			let brnnPlayer = this.brnnData.getPlayerById(retPlayerId);
			let betInfo = this.betInfoArr[data.type - 1];
			// betInfo.updateTotalRetInfo(data.value);
			betInfo.showTotalRetInfo(data.totalValue);
			if(retPlayerId ==UserService.instance.playerId){
				if(brnnPlayer){
					brnnPlayer.addStakeInfo(data.type , data.value);
				}
				//从tempPool里移除
				for(var i = 0 ; i < this.tempBetPools.length ; i++){
					if(this.tempBetPools[i].value == data.value){
						this.tempBetPools.splice(i , 1);
						break;
					}
				}
				betInfo.updateSelfRetInfo(data.value);
			}else
			{
				let showDushen = false;
				if(playerInfo && playerInfo.postion == 2) {
					// 是赌神
					this.brnnData.recordDushenTypeBet(data.type, data.value);
					let v = this.brnnData.getRecordDushenTypeBet(data.type);
					let targetBetInfoUI = this.betInfoArr[data.type - 1];
					if(!targetBetInfoUI.hasFlagDuShen && v > GameCfg.getNumberValue("brnnDushenCondition_" + this.gameLevel)) {
						showDushen = true;
						this.setTimeOut(()=>{
							this.shensuanziParticle(targetBetInfoUI);
						}, 500);
					}
				} 
				this.stakeEffect(retPlayerId , data.type, data.value, showDushen);
			}
		}

		private getBetButtonByValue(value:number) : BetButton
		{
			return this.betBtnArr[this.customBetNums.indexOf(value)];
		}

		private stakeEffect(playerId , type , betNum, isDushen = false)
		{
			let from:egret.DisplayObject = this.otherPlayerGoldenFlag;
			let fromPos:egret.Point = from.localToGlobal(0,0);
			if(playerId == UserService.instance.playerId) {
				// 如果是自己从筹码处飞出去
				from = this.getBetButtonByValue(betNum);
				fromPos = from.localToGlobal(from.width / 2, from.height / 2);
			} else {
				let headIcon = this.getHeadIconByPlayerId(playerId);
				if(headIcon) {
					from = headIcon;
					fromPos = headIcon.getHeadPos();
				}
			}
			let to:StakeArea = this.stakeAreaArr[type-1];
			let betBtn = this.betButtonFactory(playerId , type , betNum);
			this.betContainer.addChild(betBtn);
			betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, 
				this.customBetNums.indexOf(betNum) + 1);
			fromPos = betBtn.parent.globalToLocal(fromPos.x , fromPos.y);
			betBtn.x = fromPos.x;
			betBtn.y = fromPos.y;
			let p = to.randomPoint(betBtn.width);
			if(from instanceof BrnnHeadIcon) {
				(<BrnnHeadIcon>from).stakeEffect();
			} 
			this.flyBetBtnToTarget(betBtn , p.x , p.y, isDushen);
			return betBtn;
		}

		public betButtonFactory(playerId , type , betNum) : BetButton
		{
			var betBtn = new BetButton();
			betBtn.enabled = false;
			betBtn.anchorOffsetX = betBtn.width/2;
			betBtn.anchorOffsetY = betBtn.height/2;
			betBtn.value = betNum;
			betBtn.type = type;
			betBtn.playerId = playerId;
			return betBtn;
		}

		public betButtonFactory2(betValue:number, betIndex:number = 0) : eui.Image
		{
			if(betIndex == 0) {
				betIndex = this.customBetNums.indexOf(betValue) + 1;
			}
			var img = new eui.Image();
			img.touchEnabled = false;
			img.source = "chip_desk_" + this.gameLevel + "_" + betIndex;
			img.width = img.height = 47;
			img.anchorOffsetX = img.width/2;
			img.anchorOffsetY = img.height/2;
			return img;
		}

		private flyBetBtnToTarget(betBtn:BetButton, targetX, targetY, isDushen:boolean = false){
			betBtn.randomRotation();
			this.betHash[betBtn.type - 1].push(betBtn);
			if(isDushen) {
				this.setTimeOut(()=>{
					egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 2000, egret.Ease.quartOut).call(()=>{
						if(betBtn.stage) BrnnSoundPlayer.instance.playBetOn();
					},this ) ;
				}, 50);
			} else {
				egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 1000, egret.Ease.quartOut).call(()=>{
					if(betBtn.stage) BrnnSoundPlayer.instance.playBetOn();
				},this ) ;
			}
		}

		private flyBetBtnToArea(betBtn:BetButton, targetX, targetY, addTime:number){
			betBtn.randomRotation();
			this.betHash[betBtn.type - 1].push(betBtn);
			egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 800 + addTime, egret.Ease.quartOut).call(()=>{
				egret.Tween.get(betBtn).to({scaleX : 1 , scaleY : 1},100).call(()=>{
					if(betBtn.stage) BrnnSoundPlayer.instance.playBetOn();
				},this ) ;
			},this ) ;
		}

		private flyBetBtnToAreaFromBanker(betBtn:BetButton | eui.Image, targetX, targetY, addTime:number){
			if(betBtn instanceof BetButton) {
				betBtn.randomRotation();
			} else {
				betBtn.rotation = 360 * Math.random();
			}
			egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 400 + addTime, egret.Ease.quartOut).call(()=>{
				egret.Tween.get(betBtn).to({scaleX : 1 , scaleY : 1},100).call(()=>{
					if(betBtn.stage) BrnnSoundPlayer.instance.playBetOn();
				},this ) ;
			},this ) ;
		}

		public onStopBet()
		{
			this.UpdateBetInfo(false);
			var player = this.brnnData.getPlayerById(UserService.instance.playerId);
			if(player == null)
			{
				return;
			}
			for(var i = 0 ; i < this.tempBetPools.length ; i++)
			{
				this.tempBetGold -= this.tempBetPools[i].value;
				if(this.betContainer.contains(this.tempBetPools[i]))
				{
					this.betContainer.removeChild(this.tempBetPools[i]);
				}
			}
			this.tempBetPools.splice(0, this.tempBetPools.length);

			var headIcon = this.getHeadIconByPlayerId(player.playerId)
			headIcon.showImmGold(this.tempBetGold);
			//播放停止下注
			this.stopGroup.visible = true;
			this.betChangeBgImg.visible = true;
			this.betChangeBgImg.alpha = this.stopGroup.alpha = 1;
			
			BrnnSoundPlayer.instance.playShow();
			BrnnSoundPlayer.instance.playStopBet();
			egret.Tween.get(this.betChangeBgImg).to({alpha:0},1000).call(()=>{
				this.betChangeBgImg.visible = false;
			}, this)
			egret.Tween.get(this.stopGroup).to({alpha:0},1000).call(()=>{
				this.stopGroup.visible = false;
			}, this);

		}

		public startDealCard(data)
		{
			if(!this.betHash) {
				// 说明firstenterroom 没有执行
				this.setTimeOut(()=>{
					this.taskExecutor = BrnnFinishTask.generateTaskFromStartData(data, this, true);
					this.curGameRound = data.serialNumber;
					this.taskExecutor.execute();
				}, 100);
			} else {
				this.taskExecutor = BrnnFinishTask.generateTaskFromStartData(data, this, true);
				this.curGameRound = data.serialNumber;
				this.taskExecutor.execute();
			}
		}

		private shakeWinTypeArea(type:number) {
			if(type == 1)
			{
				TweenUtils.playAnimation(this.spadeLightingTween , false);
			}
			if(type == 2)
			{
				TweenUtils.playAnimation(this.heartLightingTween , false);
			}
			if(type == 3)
			{
				TweenUtils.playAnimation(this.clubLightingTween , false);
			}
			if(type == 4)
			{
				TweenUtils.playAnimation(this.diamondLightingTween , false);
			}
		}
		private flyToBankerList:Array<BetButton> = [];
		public calcBankerWinFlyTime(cardInfos:any):number {
			let costTime = 0;
			for(let i = 0 ; i < cardInfos.length ; i++){
				let cardInfo = cardInfos[i];
				let time = 0;
				if(cardInfo.type > 0){
					if(!cardInfo.isWin){
						let space = this.betHash[cardInfo.type - 1].length > 20 ? 5 : 10;
						time = 600 + this.betHash[cardInfo.type - 1].length * space;
						if(time > costTime) {
							costTime = time;
						}
					}
				}
			}
			return costTime;
		}
		public checkBankerWinFly(cardInfos:any):number {
			let costTime = 0;
			this.flyToBankerList = [];
			for(var i = 0 ; i < cardInfos.length ; i++)
			{
				let cardInfo = cardInfos[i];
				let betBtn : BetButton;
				let time = 0;
				if(cardInfo.type > 0)
				{
					if(!cardInfo.isWin)
					{
						let space = this.betHash[cardInfo.type - 1].length > 20 ? 5 : 10;
						for(let j = 0 ; j < this.betHash[cardInfo.type - 1].length ; j++)
						{
							//筹码飞向庄家
							if(this.parent == null)
							{
								return;
							}
							let to = this.bankerHead;
							let from = this.betInfoArr[cardInfo.type - 1];
							// betBtn.cloneBet(this.betHash[cardInfo.type - 1][j]);
							betBtn = this.betHash[cardInfo.type - 1][j];
							if(betBtn == null)
							{
								return;
							}
							this.flyBetBtnByPlayerFocus(betBtn , 0 , 0 , from , to, 600 + space * j, true);
							this.flyToBankerList.push(betBtn);
						}
						time = 600 + this.betHash[cardInfo.type - 1].length * space;
						if(time > costTime) {
							costTime = time;
						}
					}
				}
			}
			return costTime;
		}

		private getWinArea(cardInfos:Array<any>):Array<any>{
			let result:Array<any> = [];
			for(var i = 0 ; i < cardInfos.length ; i++)
			{
				let cardInfo = cardInfos[i];
				let betBtn : BetButton;
				let time = 0;
				if(cardInfo.type > 0)
				{
					if(cardInfo.isWin)
					{
						result.push(cardInfo);
					}
				}
			}
			return result;
		}

		public calcBankerToStakeAreaTime(cardInfos:any, roundResult:BrnnRoundResultData):number {
			let costTime = 0;
			function getMultiValue(niuValue) {
				if(niuValue >= 0 && niuValue <= 6) return 1; 
				if(niuValue >= 7 && niuValue <= 9) return 2;
				if(niuValue >= 11 && niuValue <= 12) return 4;
				if(niuValue == 10) return 4;
			}
			let simulateArr = [this.customBetNums[0], this.customBetNums[1], this.customBetNums[2], this.customBetNums[3]];
			for(let i=0;i<cardInfos.length;i++) {
				let cardInfo = cardInfos[i];
				if(cardInfo.isWin) {
					let v = getMultiValue(cardInfo.value) * this.brnnData.getRecordTypeBet(cardInfo.type);
					egret.log("checkBankerToStakeAreacheckBankerToStakeArea需要飞：" + v);
					let count = 0;
					let maxCount = 40;
					for(let i = simulateArr.length - 1; i>=0; i--) {
						let betValue = simulateArr[i];
						let num = Math.floor(v / betValue);
						for(let j=0;j<num;j++) {
							count++;
							if(count > maxCount) break;
						}
						v -= betValue * num;
					}
					let t = 200 + count * 10;
					if(t > costTime) {
						costTime = t;
					}
				}
			}
			return costTime;
		}

		private bankerToStakeArr:HashMap;
		public checkBankerToStakeArea(cardInfos:any, roundResult:BrnnRoundResultData):number {
			this.bankerToStakeArr = new HashMap();
			let costTime = 0;
			let recordCurBetLayerIndex = this.betContainer.numChildren;
			let simulateArr = [this.customBetNums[0], this.customBetNums[1], this.customBetNums[2], this.customBetNums[3]];
			for(let i=0;i<cardInfos.length;i++) {
				let cardInfo = cardInfos[i];
				if(cardInfo.isWin) {
					let v = GameConst.getBrnnMultiValueByNiu(cardInfo.value) * this.brnnData.getRecordTypeBet(cardInfo.type);
					let count = 0;
					let maxCount = 40;
					for(let i = simulateArr.length - 1; i>=0; i--) {
						let betValue = simulateArr[i];
						let num = Math.floor(v / betValue);
						for(let j=0;j<num;j++) {
							let betBtn = this.betButtonFactory2(betValue);
							this.betContainer.addChildAt(betBtn, recordCurBetLayerIndex);
							let from = this.bankerHead;
							let targetArea = this.stakeAreaArr[cardInfo.type - 1];
							let p = from.getHeadPos();
							p = betBtn.parent.globalToLocal(p.x, p.y);
							betBtn.x = p.x;
							betBtn.y = p.y;
							let tp = targetArea.randomPoint(50);
							this.flyBetBtnToAreaFromBanker(betBtn , tp.x , tp.y, count * 10);
							if(!this.bankerToStakeArr.contains("type" + cardInfo.type)) {
								this.bankerToStakeArr.put("type" + cardInfo.type, []);
							}
							this.bankerToStakeArr.get("type" + cardInfo.type).push(betBtn);
							count++;
							if(count > maxCount) break;
						}
						v -= betValue * num;
					}
					let t = 200 + count * 10;
					if(t > costTime) {
						costTime = t;
					}
				}
			}
			return costTime;
		}

		private isTypeWin(cardInfos:any, type):boolean{
			for(var i = 0 ; i < cardInfos.length ; i++)
			{
				let cardInfo = cardInfos[i];
				if((cardInfo.type - 1) == type && cardInfo.isWin)
				{
					return true;
				}
			}
			return false;
		}

		public calcStakeWinTime(data:any):number {
			let costTime = 0;
			let roundResult = new BrnnRoundResultData();
			roundResult.setData(data.resultInfos, data.cardInfos);
			for(let type=0;type < 4; type++) {
				let time = 0;
				let space = this.betHash[type].length > 30 ? 5 : 10;
				time = 400 + type * 50 + this.betHash[type].length * space;
				if(time > costTime) {
					costTime = time;
				}
			}
			return costTime;
		}

		private genAvailableBetArr(v:number):Array<number> {
			let ret = [];
			for(let betValue of this.customBetNums) {
				if(v / betValue >= 5) {
					ret.push(betValue);
				}
			}
			return ret;
		}

		public checkStakeWin(data:any):number {
			let costTime = 0;
			let roundResult = new BrnnRoundResultData();
			roundResult.setData(data.resultInfos, data.cardInfos);
			let winAreaArr = [];
			for(let cardInfo of data.cardInfos) {
				if(cardInfo.type > 0 && cardInfo.isWin) {
					winAreaArr.push(cardInfo.type);
				}
			}
			for(let playerId of this.brnnData.getPlayerTypeBetAllPlayers()) {
				let headIcon = this.getHeadIconByPlayerId(playerId);
				if(!headIcon || !headIcon.visible) continue;
				for(let type = 1; type <=4; type++) {
					if(winAreaArr.indexOf(type) >= 0) {
						let betArea = this.stakeAreaArr[type - 1];
						let v = (roundResult.getCardInfoNiuMultiByType(type) + 1) * this.brnnData.getPlayerTypeBet(playerId, type);
						let count=0;
						let maxCount=10;
						let calcArr = this.genAvailableBetArr(v);
						for(let j = calcArr.length-1;j >=0;j--) {
							let betValue = calcArr[j];
							let num = Math.floor(v / betValue);
							for(let k=0;k<num;k++) {
								let betBtn = this.betButtonFactory2(betValue);
								this.betContainer.addChild(betBtn);
								let p = betArea.randomPoint(50);
								betBtn.x = p.x;
								betBtn.y = p.y;
								this.flyBetBtnByPlayerFocus(betBtn , 0 , 0 , null , headIcon, 550 + k * 10, true);
								count++;
								if(count > maxCount) break;
							}
							v -= betValue * num;
							if(count > maxCount) break;
						}
					}
				}
			}
			
			for(let type=0;type < 4; type++) {
				let time = 0;
				let space = this.betHash[type].length > 30 ? 5 : 10;
				for(let j = 0 ; j < this.betHash[type].length ; j++)
				{// 飞向玩家按钮
					let betBtn = this.betHash[type][j];
					let to:any= this.otherPlayerGoldenFlag;
					let from = this.betInfoArr[type];
					let isself = false;
					if(betBtn.playerId == UserService.instance.playerId) {
						if(this.isTypeWin(data.cardInfos, type)) {
							// 发现自己头像
							isself = true;
						}
					}
					if(isself && roundResult.getSelfWin() > 0) {
						to = this.selfHead;
					}
					this.flyBetBtnByPlayerFocus(betBtn , 0 , 0 , from , to, 400 + type * 50 + j * space, true);	 
				}	
				time = 400 + type * 50 + this.betHash[type].length * space;
				if(time > costTime) {
					costTime = time;
				}
			}
			let costIime2 = 0;
			if(this.bankerToStakeArr) {
				for(let i=1;i<=4;i++) {
				let arr = this.bankerToStakeArr.get("type" + i);
				if(arr) {
					let space = arr.length > 30 ? 5 : 10;
					let index = 0;
					for(let betBtn of arr) {
						let to:any= this.otherPlayerGoldenFlag;
						let from = this.betInfoArr[0];
						this.flyBetBtnByPlayerFocus(betBtn , 0 , 0 , from , to, 400 + (i-1) * 50 + index * space, true);	
						index++;
					}
					let time = 400 + (i-1) * 50 + arr * space;
					if(time > costIime2) {
						costIime2 = time;
					}
				}
			}
			}
			
			return costTime + costIime2;
		}

		public isBankerAllWin(cardInfos:Array<any>):boolean[] {
			let winCount = 0;
			for(let i = 0 ; i < cardInfos.length ; i++){
				let cardInfo = cardInfos[i];
				if(cardInfo.type > 0)
				{
					if(cardInfo.isWin)
					{
						winCount ++;
					}
				}
			}
			return [winCount == 0, winCount == 4];
		}

		public shakeWinType(cardInfos:Array<any>):boolean {
			let winCount = 0;
			for(let i = 0 ; i < cardInfos.length ; i++)
			{
				let cardInfo = cardInfos[i];
				if(cardInfo.type > 0)
				{
					if(cardInfo.isWin)
					{
						this.shakeWinTypeArea(cardInfo.type);
						winCount++;
					} 
				}
				egret.log(cardInfo.type + "--------" + cardInfo.isWin);
			}
			let isBankerAllWin = winCount == 0;
			let isBankerAllLose = winCount == 4;
			this.specialGroup.visible = false;
			
			if(isBankerAllWin) {
				this.specialGroup.visible = true;
				this.tongchiAnim.visible = true;
				this.tongpeiAnim.visible = false;
				this.tongchiAnim.playerOnce(()=>{
					this.specialGroup.visible = false;
					this.tongchiAnim.stop();
				}, this);
			}

			if(isBankerAllLose) {
				this.specialGroup.visible = true;
				this.tongchiAnim.visible = false;
				this.tongpeiAnim.visible = true;
				this.tongpeiAnim.playerOnce(()=>{
					this.specialGroup.visible = false;
					this.tongpeiAnim.stop();
				}, this);
			}
			return isBankerAllWin;
		}

		public showFinish(data:any, isShowEnd:boolean) {
			let battlePlayerId = 0;
			var tempArr = new Array<any>();
			tempArr = tempArr.concat(data.battleInfo);
			var tempInfo;
			for(var i = 0 ; i < data.battleInfo.length ; i++)
			{
				for(var j = 0 ; j < data.battleInfo.length - 1 ; j++)
				{
					if(tempArr[j].money <  tempArr[j+1].money)
					{
						tempInfo = tempArr[j];
						tempArr[j] = tempArr[j + 1];
						tempArr[j + 1] = tempInfo;
					}
				}
				tempInfo = data.battleInfo[i];
				battlePlayerId = Number(data.battleInfo[i].playerId);
				if(battlePlayerId == UserService.instance.playerId && this.brnnData.isSelfBanker()) {
					this.bankerHead.showImmGold(tempInfo.totalMoney);
					this.selfHead.showImmGold(tempInfo.totalMoney);
					if(tempInfo.money > 0)
					{
						this.bankerHead.showWin(tempInfo.money);
						this.selfHead.showWin(tempInfo.money);
					}else if(tempInfo.money < 0)
					{
						this.bankerHead.showLose(data.battleInfo[i].money);
						this.selfHead.showLose(data.battleInfo[i].money);
					}
				} else {
					let headIcon = this.getHeadIconByPlayerId(battlePlayerId);
					if(headIcon == null)
					{
						continue;
					}
					headIcon.showImmGold(tempInfo.totalMoney);
					if(tempInfo.money > 0)
					{
						headIcon.showWin(tempInfo.money);
					}else if(tempInfo.money < 0)
					{
						headIcon.showLose(data.battleInfo[i].money);
					}
				}
				
				if(battlePlayerId == UserService.instance.playerId)
				{
					this.tempBetGold = tempInfo.totalMoney;
				}
			}
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			roomData.status = game.GameStatus.RUNNING;
			for(let i=0;i<roomData.playerInfos.length;i++) 
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				
				if(playerInfo.playerId == UserService.instance.playerId)
				{
					playerInfo.money = this.tempBetGold;
				}
			}
			var brnnPlayerArr = new Array<BrnnPlayer>();
			var selfPlayer = this.brnnData.getPlayerById(UserService.instance.playerId);
			if(selfPlayer == null )
			{
				selfPlayer = new BrnnPlayer();
				
				selfPlayer.playerId = UserService.instance.playerId;
				selfPlayer.position = 1;
				selfPlayer.headNum = UserService.instance.headNum;
				selfPlayer.headFrameNum = UserService.instance.headFrameNum;
				selfPlayer.playerName = UserService.instance.name;
				selfPlayer.totolMoney = UserService.instance.money;
			}
			brnnPlayerArr.push(selfPlayer);
			brnnPlayerArr.push(this.brnnData.getPlayerById(this.brnnData.bankerId));
			for(var i = 0 ; i < tempArr.length ; i++)
			{
				battlePlayerId = Number(tempArr[i].playerId);
				if((battlePlayerId == this.brnnData.bankerId && battlePlayerId == 1000000) 
				|| this.brnnData.getPlayerById(battlePlayerId) == null)
				{
					continue;
				}
				if(tempArr[i].money == 0)
				{
					continue;
				}
				brnnPlayerArr.push(this.brnnData.getPlayerById(battlePlayerId));
			}
			if(isShowEnd) {
				let roundResult = new BrnnRoundResultData();
				roundResult.setData(data.resultInfos, data.cardInfos);
				AppFacade.instance.sendNotification(CommonDataNotify.BRNN_ROUND_RESULT , roundResult);
			}
		}

		public onBattleFinish(data)
		{
			this.setTimeOut(() => {
				BrnnRequest.requestOPWinFail(0);
			}, 7000);

			if(this.betHash == null )
			{
				return;
			}
			let roundResult = new BrnnRoundResultData();
			roundResult.setData(data.resultInfos, data.cardInfos);
			let isBankerAllWin = this.shakeWinType(data.cardInfos);
			this.setTimeOut(()=>{
				egret.log("checkBankerWinFly");
				let bankerFlyDelay = this.checkBankerWinFly(data.cardInfos);
				this.setTimeOut(()=>{
					egret.log("checkBankerToStakeArea");
					let bankerToAreaTime = this.checkBankerToStakeArea(data.cardInfos, roundResult);
					this.setTimeOut(()=>{
						egret.log("checkStakeWin");
						let stakeWinTime = this.checkStakeWin(data);	
						if(!isBankerAllWin) {
							this.setTimeOut(()=>{
								this.showFinish(data, false);
							}, bankerToAreaTime + 500);
						} else {
							this.showFinish(data, false);
						}
					}, bankerToAreaTime + 500);
				}, bankerFlyDelay + 500);
			}, 2000);
		}

		private flyBetBtnByPlayerFocus(betBtn , offsetX, offsetY , from, headIcon:BrnnHeadIcon | eui.Group, time, isSound:boolean = false){
			if(!headIcon) return;
			let point = headIcon.localToGlobal(0,0);
			if(headIcon instanceof BrnnHeadIcon) {
				point = headIcon.getHeadPos();
			} 
			if(betBtn.parent) {
				point = betBtn.parent.globalToLocal(point.x, point.y);
				egret.Tween.get(betBtn).to({x:point.x , y : point.y},time, egret.Ease.backIn).call(()=>{
					if(betBtn && betBtn.parent)
					{
						betBtn.parent.removeChild(betBtn);
					}
					if(isSound) BrnnSoundPlayer.instance.playWinCoin();
				},this ) ;
			}
		}

		public getHeadIconByPos(pos:number) : BrnnHeadIcon {
			for(let headIcon of this.playerHeads) {
				if(headIcon.playerInfo && headIcon.playerInfo.postion == pos) return headIcon;
			}
			return null;
		}

		public getHeadIconByPlayerId(playerId:number):BrnnHeadIcon {
			if(playerId == UserService.instance.playerId) {
				return this.selfHead;
			}
			for(let headIcon of this.playerHeads) {
				if(headIcon.playerInfo && headIcon.playerInfo.playerId == playerId) return headIcon;
			}
			return null;
		}

		private onBackHall() {
			if(this.brnnData && this.brnnData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if(this.brnnData && this.brnnData.isSelfBet) {
				if(this.currStatus == BrnnStatus.PREPARE || (this.currStatus == BrnnStatus.STOP && this.brnnData.checkAllowExit(this.curGameRound))) {
					RoomRequest.leaveRoom(game.ChildGameType.BRNN);
				} else {
					TipsUtils.showTipsFromCenter("当前游戏未结束，无法退出房间");
					return;
				}
			}else {
				RoomRequest.leaveRoom(game.ChildGameType.BRNN);
			}
		}

		private UpdateBetInfo(canBet)
		{
			console.log("Update BetInfo : " + canBet);	
			if(canBet)
			{
				this.refreshBtnState();
			}else
			{
				var betButton : BetButton;
				for(var i = 0 ; i < this.betBtnArr.length ; i++)
				{
					betButton = this.betBtnArr[i];
					betButton.canChoose = false;
				}
				this.currBetButton = null;
			}
		}

		private getBetButtonValue(betButton) : number
		{
			switch(betButton)
			{
				case this.betButton1:{
						return this.customBetNums[0];
				}
				case this.betButton10:{
						return this.customBetNums[1];
				}
				case this.betButton50:{
						return this.customBetNums[2];
				}
				case this.betButton100:{
						return this.customBetNums[3];
				}
				case this.betButton500:{
						return this.customBetNums[4];
				}
				case this.betButton1000:{
						return this.customBetNums[5];
				}
			}
			return 0;
		}

		private validateBetButton(betButton) : boolean
		{
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			console.log(roomData.bottomBet);
			if(roomData.gameLevel > 0)
			{
				if(this.tempBetGold >= this.getBetButtonValue(betButton))
				{
					return true;
				}
			}
			return false;
		}
		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public showRoundResult(data:BrnnRoundResultData) {
			this.roundResult.visible = true;
			let darkSprite = this.roundResult["dark"];
			let p = this.roundResult.globalToLocal(0,0);
			darkSprite.x = p.x;
			darkSprite.y = p.y;
			this.roundResult.showRoundResult(data);
			this.brnnData.recordResultPanelOpen();
		}

		protected onLeave() {
			super.onLeave();
			this.cacheBet = [];
			this.prevCache = [];
			this.xuyaBtn.enabled = false;
			this.clearBattle();
			this.lastChooseBet = 0;
			for(let headIcon of this.playerHeads) {
				headIcon.clearPlayerInfo();
			}
			this.checkTask();
		}

		public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
			this.tempBetGold += drawmoney;
			this.selfHead.showImmGold(this.tempBetGold);
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
			if(playerInfo) {
				playerInfo.money = totalmoney;
			}
			this.brnnData.getPlayerById(UserService.instance.playerId).money = totalmoney;
			this.refreshBtnState();
		}

		private shensuanziParticleTest() {
			let curRoomData = RoomManager.getInstance().curRoomData;
			if(curRoomData && curRoomData.getPlayerInfoByPos(2)) {
				this.stakeEffect(curRoomData.getPlayerInfoByPos(2).playerId, 1, 5, true);
			}
		}

		public shensuanziParticle(targetBetInfoUI:BrnnTypeBetInfoUI) {
			if(targetBetInfoUI.hasFlagDuShen) return;
			targetBetInfoUI.hasFlagDuShen = true;
			let startPoint = this.playerHeads[2].getShensuzniStartPoint();
			if(startPoint) {
				let endPoint = targetBetInfoUI.getShensuanziPos();
				let index = this.betInfoArr.indexOf(targetBetInfoUI);
				if(endPoint) {
					let cfg = RES.getRes("brnn_dushen_particle_json");
					cfg.maxParticles = 100 - 10 * index;
					let chargeParticle = CommonUtil.generateDirectionParticle(
						RES.getRes("brnn_dushen_particle_png"), 
						cfg,
						startPoint,endPoint, 800,
						()=>{
							targetBetInfoUI.showShensuanziAnim();
						}, this);
					chargeParticle.start();
					this.addChild(chargeParticle);
				}
			}
		}
	}
}