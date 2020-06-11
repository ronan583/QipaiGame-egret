module game.bjl {
	
	enum BjlStatus{
		prepared = 0,
		startBet = 1,
		stopBet = 2,
		dealCard = 3
	}

	export enum BjlStakeTpye{
		yaxian = 1,
		yazhuang = 2,
		he = 3,
		xiandui = 4,
		zhuangdui = 5
	}
	
	export class BjlBattleScene extends GameScene{
		public constructor() {
			super();
			this.gameType = ChildGameType.BJL;
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
			if(partName.indexOf("xianBetFlagPoint") >= 0) {
				this.xianBetPointArr[parseInt(partName.replace("xianBetFlagPoint", "")) - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("zhuangBetFlagPoint") >= 0) {
				this.zhuangBetPointArr[parseInt(partName.replace("zhuangBetFlagPoint", "")) - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("heBetFlagPoint") >= 0) {
				this.heBetPointArr[parseInt(partName.replace("heBetFlagPoint", ""))  - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("xianduiBetFlagPoint") >= 0) {
				this.xianduiBetPointArr[parseInt(partName.replace("xianduiBetFlagPoint", ""))  - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("zhuangduiBetFlagPoint") >= 0) {
				this.zhuangduiBetPointArr[parseInt(partName.replace("zhuangduiBetFlagPoint", ""))  - 1] = instance;
				instance.visible = false;
			}
		}

		public backBtn : IButton;
		public apllyBankerBtn : IButton;
		public playerListBtn : IButton;
		public settingBtn : IButton;
		public helpBtn : IButton;
		public settingAudioBtn: eui.Button;
		private bankBtn:eui.Button;
		public changeRoomBtn : IButton;
		private onlineLabel:eui.Label;
		// public gameLevelIcon : eui.Image;
		// public roomOrderIcon : eui.Image;
		public roomName : eui.BitmapLabel;
		public betButton1 : BjlBetButton;
		public betButton10 : BjlBetButton;
		public betButton50 : BjlBetButton;
		public betButton100 : BjlBetButton;
		public betButton500 : BjlBetButton;
		private continueBtn:IButton;
		private applyBankerBtn:IButton;
		private downBankerBtn:IButton;
		public selfHeadIcon : BjlHeadIcon;
		public headIcon1 : BjlHeadIcon;
		public headIcon2 : BjlHeadIcon;
		public headIcon3 : BjlHeadIcon;
		public headIcon4 : BjlHeadIcon;
		public headIcon5 : BjlHeadIcon;
		public headIcon6 : BjlHeadIcon;
		public bankerHeadIcon: BjlHeadIcon;
		public prepareCard1:BjlCard;
		public prepareCard2:BjlCard;
		public prepareCard3:BjlCard;
		public prepareCard4:BjlCard;

		public xianBetInfo : BjlBetInfoUI;
		public zhuangBetInfo : BjlBetInfoUI;
		public heBetInfo : BjlBetInfoUI;
		public xianduiBetInfo : BjlBetInfoUI;
		public zhuangduiBetInfo : BjlBetInfoUI;
		
		public xianBetGroup : eui.Group;
		public zhuangBetGroup : eui.Group;
		public heBetGroup : eui.Group;
		public xianduiBetGroup : eui.Group;
		public zhuangduiBetGroup : eui.Group;
		// public waitGroup : egret.tween.TweenGroup;
		public startGroup : egret.tween.TweenGroup;
		public stopGroup : egret.tween.TweenGroup;
		public xianWinGroup : egret.tween.TweenGroup;
		public zhuangWinGroup : egret.tween.TweenGroup;
		public heWinGroup : egret.tween.TweenGroup;
		public xianDuiGroup : egret.tween.TweenGroup;
		public zhuangDuiGroup : egret.tween.TweenGroup;

		public touchArea1 : BjlTouchArea;
		public touchArea2 : BjlTouchArea;
		public touchArea3 : BjlTouchArea;
		public touchArea4 : BjlTouchArea;
		public touchArea5 : BjlTouchArea;
		public bjlCardInfo : BjlCardInfo;
		public recoutTips : BjlTips;
		public cornerPanel : BjlCornerPanel;
		public trendPanel : BjlTrendPanel;
		public fapaiImg:eui.Image;
		private onlinePlayerGroup:eui.Group;
		
		//----------数据与结构;
		public playerHeads:BjlHeadIcon[] = null;
		private betHash : BjlBetButton[][];
		public betBtnArr : BjlBetButton[] = null;
		public currRoomId : number = -1;
		private betInfoArr : BjlBetInfoUI[] = null;
		private betTouchGroups : eui.Group[];
		private currStatus : BjlStatus = BjlStatus.prepared;		
		public bjlData : BjlData;
		private currBetButton :BjlBetButton;
		private tempBetPools : BjlBetButton[] = [];
		private tempBetGold : number = 0;

		public battleStartCountDown:game.BjlCountDown;
		public betContainer : eui.Group;
		private timeoutIdList:Array<number> = [];
		private bjlWinFailsData : any;
		private level0BetNums : number[] = [10,50,100,200,500];
		private level1BetNums : number[] = [1,5,10,50,100];
		private level2BetNums : number[] = [10,50,100,200,500];
		private level3BetNums : number[] = [50,100,200,500,1000];
		private customBetNums : number[];

		public gameType : number;
		public gameLevel : number;
		private initCardDeliver:BjlInitCardDeliver;
		private finishCardDeliver:BjlFinishCardDeliver;
		private roundResult:BjlRoundResult;
		private touchGroup:eui.Group;
		private touchImg1:eui.Image;
		private touchImg2:eui.Image;
		private touchImg3:eui.Image;
		private touchImg4:eui.Image;
		private touchImg5:eui.Image;
		private dushenFlag1:BjlDuShenFlag;
		private dushenFlag2:BjlDuShenFlag;
		private dushenFlag3:BjlDuShenFlag;
		private dushenFlag4:BjlDuShenFlag;
		private dushenFlag5:BjlDuShenFlag;

		private touchImgArr:Array<eui.Image>;
		private touchShanArr:Array<BjlShan>;

		private startAnim:DragonAnim;
		private stopAnim:DragonAnim;
		private changeBankerAnim:DragonAnim;
		private prevCache:Array<any> = []; 
		private cacheBet:Array<any> = []; 
		private bankerInfo:eui.Label;
		private lastChooseBet:number = -1;
		private lastOpenLevel:number = -1;
		private _curGameRound:number = 0;

		public set curGameRound(v:number) {
			this._curGameRound = v;
			if(this.bjlData) {
				this.bjlData.curGameRound = this._curGameRound;
			}
		}

		public get curGameRound():number{
			return this._curGameRound;
		}

		private xianBetPointArr:Array<eui.Rect> = [];
		private zhuangBetPointArr:Array<eui.Rect> = [];
		private heBetPointArr:Array<eui.Rect> = [];
		private xianduiBetPointArr:Array<eui.Rect> = [];
		private zhuangduiBetPointArr:Array<eui.Rect> = [];

		private polyStakeAreaArr:PolyStakeArea[];
		private testBtn:eui.Button;

		private polyStakeAreaXian:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaZhuang:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaHe:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaXiandui:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaZhuangdui:PolyStakeArea = new PolyStakeArea();

		private waitGroup:eui.Group;
		private waitAnim:DragonAnim;

		private dushenFlagArr:Array<BjlDuShenFlag>;
		private menuGroup:MenuGroup;
		private menuArrowImg:eui.Image;
        private menuContent:eui.Group;
		private bjlFinishTask:BjlFinishTask;
		protected componentInit():void
		{
			this.betInfoArr = [this.xianBetInfo , this.zhuangBetInfo , this.heBetInfo,this.xianduiBetInfo,this.zhuangduiBetInfo];
			this.playerHeads = [this.bankerHeadIcon, this.selfHeadIcon ,this.headIcon1, this.headIcon2 ,this.headIcon3, this.headIcon4,this.headIcon5, this.headIcon6];
			this.betBtnArr = [this.betButton1 , this.betButton10 ,this.betButton50 , this.betButton100 , this.betButton500];
			this.betTouchGroups = [this.touchArea1.stakeAreaGroup ,this.touchArea2.stakeAreaGroup ,this.touchArea3.stakeAreaGroup,this.touchArea4.stakeAreaGroup,this.touchArea5.stakeAreaGroup];
			this.playerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPlayerList , this);
			this.changeRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onChangeRoom , this);
			this.battleStartCountDown = new game.BjlCountDown();
			this.battleStartCountDown.countDownLabel = this.recoutTips.countLabel;
			this.battleStartCountDown.noticeAnim = this.recoutTips.clockAnim;
			this.battleStartCountDown.setSound("countdown_mp3")
			this.customBetNums = this.level0BetNums;
			this.applyBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplyBanker, this);
			this.downBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBanker, this);
			for(var i = 0 ; i < this.betBtnArr.length ; i++)
			{
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.selectedBetButton , this);
				this.betBtnArr[i].defaultY = this.betBtnArr[i].y;
			}
			this.touchImgArr = [this.touchImg1,this.touchImg2, this.touchImg3, this.touchImg4, this.touchImg5];
			this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP , this.checkStakeTap , this);
			this.initCardDeliver = new BjlInitCardDeliver([this.prepareCard1, this.prepareCard2, this.prepareCard3, this.prepareCard4], this);
			this.finishCardDeliver = new BjlFinishCardDeliver([this.prepareCard1, this.prepareCard2, this.prepareCard3, this.prepareCard4], this.bjlCardInfo,this)
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCacheBet, this);
			this.touchShanArr = [new BjlShan(this.touchImg1), new BjlShan(this.touchImg2),
				new BjlShan(this.touchImg3),new BjlShan(this.touchImg4),new BjlShan(this.touchImg5)]
			this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "bjlGame_json.btn_xiala", "bjlGame_json.btn_shangla");
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelpBtntap , this);
			this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtntap , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
			this.bankerHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerIconClick, this);
			this.polyStakeAreaXian.initByDisplayObjNodes(this.xianBetPointArr);
			this.polyStakeAreaZhuang.initByDisplayObjNodes(this.zhuangBetPointArr);
			this.polyStakeAreaHe.initByDisplayObjNodes(this.heBetPointArr);
			this.polyStakeAreaXiandui.initByDisplayObjNodes(this.xianduiBetPointArr);
			this.polyStakeAreaZhuangdui.initByDisplayObjNodes(this.zhuangduiBetPointArr);
			this.polyStakeAreaArr = [this.polyStakeAreaXian, this.polyStakeAreaZhuang, this.polyStakeAreaHe,
				this.polyStakeAreaXiandui, this.polyStakeAreaZhuangdui];
			this.dushenFlagArr = [this.dushenFlag1, this.dushenFlag2, this.dushenFlag3, this.dushenFlag4, this.dushenFlag5];
			let index = 1;
			for(let betBtn of this.betBtnArr) {
				betBtn.index = index;
				index++;
			}
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
		}

		private onBackHall()
		{
			if(this.bjlData && this.bjlData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if(this.bjlData && this.bjlData.isSelfBet) {
				if(this.currStatus == BjlStatus.prepared || (this.currStatus == BjlStatus.stopBet && this.bjlData.checkAllowExit(this.curGameRound))) {
					RoomRequest.leaveRoom(game.ChildGameType.BJL);
				} else {
					BattleLeaveTips.showTips({
						"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间?",
						"callback": (data: any) => {
							RoomRequest.leaveRoom(game.ChildGameType.BJL);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
					return;
				}
			} else {
				RoomRequest.leaveRoom(game.ChildGameType.BJL);
			}
			
		}

		private onSettingBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BJL);
		}

		private onHelpBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BJL);
		}

		private openBank() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BJL);
		}

		private onBankerIconClick() {
			let p = this.bankerHeadIcon.headIconImg.localToGlobal(
				this.bankerHeadIcon.headIconImg.width,
				this.bankerHeadIcon.headIconImg.height)
			let roomData = RoomManager.getInstance().curRoomData;
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, {pos:p, gameType:roomData.gameType});
		}

		private updateBankerState() {
			if(this.bjlData.isSelfInBankerUpList() || this.bjlData.isSelfBanker()) {
				this.applyBankerBtn.visible = false;
				this.downBankerBtn.visible = true;
			} else {
				this.applyBankerBtn.visible = true;
				this.downBankerBtn.visible = false;
			}
			this.bankerInfo.text = this.bjlData.bankerList.length.toFixed(0) + "人排队";
		}
		public isDownOper:boolean = false;
		private onDownBanker() {
			this.isDownOper = true;
			BjlRequest.downPlayerBank();
		}

		private onApplyBanker() {
			// 上庄
			if(this.tempBetGold < BjlData.bankerUpMoneyLimit) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:"+BjlData.bankerUpMoneyLimit+"元",
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
			BjlRequest.applyPlayerBank(1);
			
		}
		public downBankerRet(data)
		{
			this.bjlData.setBankerData(data.bankerInfos);
			this.updateBankerState();
			if(this.isDownOper) {
				this.isDownOper = false;
				if (this.bjlData.isSelfBanker()) {
					TipsUtils.showTipsFromCenter("申请成功,下局下庄");
				} else {
					TipsUtils.showTipsFromCenter("下庄成功");
				}
			}
		}

		public onApplyBankerRet(data)
		{
			if(this.bjlData.addBankerData(data).playerId == UserService.instance.playerId) {
				TipsUtils.showTipsFromCenter("申请成功");
			}
			this.updateBankerState();
		}

		protected onOpen() {
			this.isDownOper = false;
			this.initCardDeliver.init();
			this.bjlCardInfo.visible = false;
			this.bjlCardInfo.init();
			this.roundResult.visible = false;
			this.startAnim.visible = false;
			this.stopAnim.visible = false;
			this.changeBankerAnim.visible = false;
			this.continueBtn.enabled = false;
			this.cacheBet = [];
			this.stopAllShan();
			this.trendPanel.visible = true;
			this.trendPanel.showDefault();
			this.onlineLabel.text = game.RoomManager.getInstance().curRoomData.onlineCount.toFixed(0);
			let level = RoomManager.getInstance().curRoomData.gameLevel;
			if(level != this.lastOpenLevel) {
				this.lastChooseBet = 0;
			} 
			this.lastOpenLevel = level;
			this.waitGroup.visible = false;
			this.menuGroup.showDefault();
			BjlRequest.requestOPWinFail(0);
		}

		private showTrendPanel(event)
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BJL_HISTORY_UI);
		}

		private onHelp(event)
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BJL); 
		}

		private onChangeRoom(event)
		{
			AppFacade.instance.sendNotification(PanelNotify.OPEN_BJL_CHANGE_UI);
			this.onRoomList();
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
					this.lastChooseBet = index;
					this.currBetButton.lightMove();
				}else
				{
					this.betBtnArr[i].recovery();
				}
			}
		}

		private getBetButtonValue(betButton) : number
		{
			let betIndex = this.betBtnArr.indexOf(betButton);
			if(betIndex < 0) return 0;
			return this.customBetNums[betIndex];
		}

		private checkStakeTap(e:egret.TouchEvent) {
			egret.log("点了touchGroup" + egret.getTimer());
			if(this.bjlData.isSelfBanker()) {
				CommonUtil.noticeMsg("庄家不能下注");
				return;
			}
			if(this.currStatus != BjlStatus.startBet) {
				CommonUtil.noticeMsg("请稍候，还没到下注时间");
				return;
			}
			if(this.bjlData.getPlayerById(UserService.instance.playerId) == null)
			{
				return;
			}
			if(this.currStatus != BjlStatus.startBet) {
				return;
			}
			if(this.bjlData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("庄家不能下注");
				return;
			}
			let buttonType = 0;
			for(let i=0;i<this.touchImgArr.length;i++) {
				if(this.touchImgArr[i].hitTestPoint(e.stageX, e.stageY, true)) {
					buttonType = i+1;
					break;
				}
			}
			if(buttonType == 0) {egret.log("检测不到区域" +  egret.getTimer())};
			this.brightBetArea(buttonType);
			this.startStakeTrue(buttonType, this.currBetButton, true);
		}

		private brightBetArea(type:number) {
			let touchImg = this["touchImg" + type];
			egret.Tween.removeTweens(touchImg);
			touchImg.alpha = 0;
			touchImg.visible = true;
			egret.Tween.get(touchImg).to({alpha:1},250).call(()=>{
				egret.Tween.get(touchImg).to({alpha:0.01},250).call(()=>{

				})
			})
		}

		private startStakeTrue(buttonType, betButton:BjlBetButton, iscahce:boolean = true) {
			if(buttonType  == 0) return;
			var buttonValue =  this.getBetButtonValue(betButton);
			if(this.tempBetGold < buttonValue)
			{
				// TipsUtils.moneyTipsGame(this,buttonValue);
				TipsUtils.showTipsFromCenter("当前金币不足");
				return;
			}
			//直接飞筹码
			this.tempBetGold -= buttonValue;
			this.selfHeadIcon.showImmGold(this.tempBetGold);
			var betBtn = this.stakeEffect(UserService.instance.playerId , buttonType , buttonValue);
			this.tempBetPools.push(betBtn);
			this.refreshBtnState();
			BjlRequest.SendBets(buttonType , buttonValue);
			if(iscahce) this.cacheBet.push({buttonType:buttonType, betButton:betButton});
		}

		private sendCacheBet() {
			this.continueBtn["hasClick"] = true;
			let total = 0;
			for(let data of this.prevCache) {
				total += this.getBetButtonValue(data.betButton);
			}
			if(this.tempBetGold < total) {
				// 钱不够就不发协议了
				this.continueBtn.enabled = false;
				TipsUtils.showTipsFromCenter("金币不足");
				return ;
			}
			for(let data of this.prevCache) {
				this.startStakeTrue(data.buttonType, data.betButton, true);
			}
			this.continueBtn.enabled = false;
		} 

		public initScene()
		{
			this.bjlData = new BjlData();
			this.chooseChip();
			this.recoutTips.visible = false;
			this.bjlCardInfo.visible = false;
			this.bjlWinFailsData = RoomManager.getInstance().bjlWinFailsData;
			this.currRoomId = UserService.roomId;
			this.gameType = RoomManager.getInstance().curRoomData.gameType;
			this.gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			this.roomName.text = this.getName();
			BjlRequest.requestOPWinFail(0);
			this.updateScene();
			BjlSoundPlayer.instance.playBg();
		}

		public chooseChip(){
			let gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			switch(gameLevel){
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

		public ResumScene()
		{
			if(game.RoomManager.getInstance().curRoomData == null)
			{
				RoomRequest.sendEnterRoomInfo(this.gameType , this.gameLevel);
			}
			//this.bjlData = new BjlData();
			this.recoutTips.visible = false;
			this.bjlWinFailsData = RoomManager.getInstance().bjlWinFailsData;
			this.currRoomId = UserService.roomId;
			this.finishCardDeliver.stopDeliver();
			this.initCardDeliver.resetCard();
			this.updateScene();
		}

		
		public updateScene()
		{
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			if(roomData == null)
			{
				return;
			}
			this.onlineLabel.text = roomData.onlineCount.toFixed(0);
			//初始化头像
			for(let j = 0 ; j < this.playerHeads.length ; j++)
			{
				if(this.playerHeads[j]) {
					this.playerHeads[j].visible = false;
				}
			}
			for(let i=0;i<roomData.playerInfos.length;i++) 
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				let headIcon = this.getHeadIconByPos(playerInfo.postion);
				if(headIcon) {
					headIcon.visible = true;
					headIcon.ShowPlayerHead(playerInfo);
				}
			}
		}

		public getHeadIconByPos(pos:number) : BjlHeadIcon
		{
			return this.playerHeads[pos];
		}

		public getHeadIconByPlayerId(playerId:number) : BjlHeadIcon {
			for(let headIcon of this.playerHeads) {
				if(headIcon.playerInfo && headIcon.playerInfo.playerId == playerId) {
					return headIcon;
				}
			}
			return null;
		}
 
		private refreshBtnState() {
			if(this.bjlData.isSelfBanker() || this.currStatus != BjlStatus.startBet) {
				for(let btn of this.betBtnArr) {
					btn.canChoose = false;
				}
				this.continueBtn.enabled = false;
				egret.log("我是庄家  所以续压按钮不能用");
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
				xuyaNeedValue += this.getBetButtonValue(p.betButton);
			}
			if(this.tempBetGold < xuyaNeedValue) {
				this.continueBtn.enabled = false;
			} else {
				if(this.prevCache && this.prevCache.length > 0 && !this.continueBtn["hasClick"]) {
					this.continueBtn.enabled = true;
				}
			}
			if(this.currStatus == BjlStatus.startBet) {
				if(this.lastChooseBet > (avaliableArr.length - 1)) {
					if(avaliableArr.length > 0) {
						this.selectedBetButtonByIndex(avaliableArr.length - 1);
					}
				} else {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				}
			}
		}

		public pushBattleStatus(data)
		{
			this.currStatus = <BjlStatus>data.status;
			egret.log("bjl status change : " + this.currStatus);
			this.recoutTips.visible = true;
			switch(this.currStatus)
			{
				case BjlStatus.prepared:
				{
					this.waitGroup.visible = false;
					this.waitAnim.stop();
					this.roundResult.visible = false;
					//没有准备开始状态
					this.recoutTips.initUI(0,data.downTime);
					this.battleStartCountDown.startCountDown(data.downTime);
					// 这个时候需要清除beticon 和 cardinfo
					this.bjlCardInfo.reset();
					this.bjlCardInfo.visible = false;
					this.betContainer.removeChildren();
					this.stopAllShan();
					this.resetBetInfo();
					this.refreshBtnState();
					if(data.downTime < 2) {
						this.initCardDeliver.showEnd();
					} else {
						this.recoutTips.visible = true;
						this.recoutTips.initUI(BjlStatus.prepared, data.downTime - 2);
						this.battleStartCountDown.startCountDown(data.downTime - 2);
						this.setTimeOut(this.startFapai, (data.downTime - 2) * 1000);
					}
					break;
				}
				case BjlStatus.startBet:
				{
					this.waitGroup.visible = false;
					this.waitAnim.stop();
					this.roundResult.visible = false;
					this.resetBetInfo();
					this.refreshBtnState();
					this.onStartBet(data);
					break;
				}
				case BjlStatus.stopBet:
				{
					this.refreshBtnState();
					this.onStopBet();
					this.recoutTips.initUI(2,data.downTime);
					this.battleStartCountDown.startCountDown(data.downTime);
					break;
				}
			}

			if(data.isSwitchBanker) {
				this.playChangeZhuang();
				this.refreshBtnState();
				this.updateScene();
				this.updateBankerState();
			}
		}

		private playChangeZhuang() {
			this.changeBankerAnim.visible = true;
			this.changeBankerAnim.playerOnce(()=>{
				this.changeBankerAnim.visible = false;
			}, this);
			SoundMenager.instance.playVoice("zhuang-change_mp3");
		}

		private resetBetInfo() {
			for(let betInfo of this.betInfoArr) {
				betInfo.reset();
			}
			for(let flag of this.dushenFlagArr) {
				flag.reset();
			}
		}
		
		public onStartBet(data)
		{
			this.continueBtn["hasClick"] = false;
			this.stopAllShan();
			this.startAnim.visible = true;
			this.startAnim.playerOnce(()=>{this.startAnim.visible = false;}, this);
			// this.initCardDeliver.playDeliver();
			this.betContainer.removeChildren();
			this.bjlCardInfo.visible = true;
			this.bjlCardInfo.reset();
			this.resetBetInfo();
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			roomData.status = game.GameStatus.RUNNING;
			let ori = this.bjlData;
			this.bjlData = new BjlData();
			this.curGameRound = data.serialNumber;
			if(ori) {
				this.bjlData.bankerList = ori.bankerList;
			}
			for(let i=0;i<roomData.playerInfos.length;i++) 
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				this.bjlData.addPlayer(playerInfo);
				this.bjlData.getPlayerById(playerInfo.playerId).state = BjlPlayerState.game;
				if(playerInfo.playerId == UserService.instance.playerId)
				{
					this.tempBetGold = this.bjlData.getPlayerById(UserService.instance.playerId).totolMoney;
				}
			}
			this.currBetButton = this.betBtnArr[0];
			if(this.lastChooseBet >= 0) {
				this.selectedBetButtonByIndex(this.lastChooseBet);
			} else {
				this.selectedBetButtonByIndex(0);
			}
			BjlSoundPlayer.instance.playAlert();
			BjlSoundPlayer.instance.playStartBet();
			this.setTimeOut(()=>{
				if(this.parent == null)
				{
					return;
				}

				BjlSoundPlayer.instance.playShow();
			},1250);

			this.recoutTips.visible = true;
			this.recoutTips.initUI(1,data.downTime);
			this.battleStartCountDown.startCountDown(data.downTime, true);
			this.betHash = new Array();
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push( new Array<BjlBetButton>());
			this.betHash.push( new Array<BjlBetButton>());

			this.updateBankerState();
			if(this.cacheBet.length > 0) {
				this.prevCache = this.cacheBet;
			}
			this.cacheBet = [];
			this.currStatus = BjlStatus.startBet;
			this.refreshBtnState();
		}
		
		public onStopBet()
		{
			this.stopAnim.visible = true;
			this.stopAnim.playerOnce(()=>{this.stopAnim.visible = false;}, this);
			var player = this.bjlData.getPlayerById(UserService.instance.playerId);
			if(player == null)
			{
				return;
			}
			var headIcon = this.getHeadIconByPos(player.position)
			//3秒后删除桌面未合法筹码，刷新当前钱数/
			for(var i = 0 ; i < this.tempBetPools.length ; i++)
			{
				this.tempBetGold -= this.tempBetPools[i].value;
				if(this.betContainer.contains(this.tempBetPools[i]))
				{
					this.betContainer.removeChild(this.tempBetPools[i]);
				}
			}
			headIcon.showImmGold(this.tempBetGold);
			this.tempBetPools.splice(0, this.tempBetPools.length);

			BjlSoundPlayer.instance.playStopBet();
		}

		//返回下注
		public onStakeRet(data)
		{
			var retPlayerId = Number(data.playerId);
			var lhdzPlayer = this.bjlData.getPlayerById(Number(retPlayerId));
			var betInfo = this.betInfoArr[data.type - 1];
			betInfo.visible = true;
			betInfo.updateTotalRetInfo(data.value);
			this.bjlData.recordTypeBetInfo(data.type, data.value);
			this.bjlData.recordPlayerTypeBet(retPlayerId, data.type, data.value);
			if(retPlayerId == UserService.instance.playerId)
			{
				if(lhdzPlayer) lhdzPlayer.addStakeInfo(data.type , data.value);
				this.bjlData.isSelfBet = true;
				//从tempPool里移除
				for(var i = 0 ; i < this.tempBetPools.length ; i++)
				{
					if(this.tempBetPools[i].value == data.value)
					{
						this.tempBetPools.splice(i , 1);
						break;
					}
				}
				if(lhdzPlayer) {
					betInfo.updateSelfRetInfo(data.value);//lhdzPlayer.getStakeByType(data.type)
				}
			}else
			{
				let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(retPlayerId);
				let isDushen:boolean =  false;
				if(playerInfo && playerInfo.postion == 2) {
					// 是赌神
					this.bjlData.recordDushenTypeBet(data.type, data.value);
					let v = this.bjlData.getRecordDushenTypeBet(data.type);
					egret.log("赌神金额：" + v);
					let targetBetInfoUI = this.dushenFlagArr[data.type - 1];
					if(!targetBetInfoUI.hasFlagDuShen && v > GameCfg.getNumberValue("bjlDushenCondition_" + RoomManager.getInstance().curRoomData.gameLevel)) {
						isDushen = true;
						this.setTimeOut(()=>{
							this.shensuanziParticle(targetBetInfoUI);
						}, 500);
					}
				} 
				this.stakeEffect(retPlayerId , data.type, data.value,isDushen);
			}
		}

		private getBetButtonByValue(value:number) : BjlBetButton
		{
			return this.betBtnArr[this.customBetNums.indexOf(value)];
		}
		
		private stakeEffect(playerId , type , betNum, isDushen:boolean = false){
			let from:egret.DisplayObject = this.playerListBtn;
			let fromPos:egret.Point = from.localToGlobal(from.width / 2, from.height / 2);
			if(playerId == UserService.instance.playerId) {
				// 如果是自己从筹码处飞出去
				from = this.getBetButtonByValue(betNum);
				fromPos = from.localToGlobal(from.width / 2, from.height / 2);
			} else {
				let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
				if(playerInfo) {
					let headIcon = this.getHeadIconByPos(playerInfo.postion);
					if(headIcon) {
						from = headIcon;
						fromPos = headIcon.getHeadPos();
					}
				}
			}
			let targetArea = this.polyStakeAreaArr[type-1];
			var betBtn = this.betButtonFactory(playerId , type , betNum);
			this.betContainer.addChild(betBtn);
			betBtn.showButtonLittle(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(betNum) + 1);
			fromPos = betBtn.parent.globalToLocal(fromPos.x, fromPos.y);
			betBtn.x = fromPos.x;
			betBtn.y = fromPos.y;
			let p = targetArea.randomPoint();
			if(from instanceof BjlHeadIcon) {
				(<BjlHeadIcon>from).stakePosEffect(egret.getTimer());
				if(from == this.selfHeadIcon) {
					// 自己的头像怎么能移动呢
					console.log("自己的头像怎么能移动呢");
				}
				this.flyBetBtn(betBtn , p.x, p.y, isDushen);
			} else {
				this.setTimeOut(()=>{
					this.flyBetBtn(betBtn , p.x, p.y);
				}, 100);
			}
			return betBtn;
		}
		private flyBetBtn(betBtn:BjlBetButton , offsetX, offsetY, isDushen:boolean = false){
			betBtn.randomRotation();
			if(!this.betHash) {
				this.betHash = new Array();
				this.betHash.push(new Array<BjlBetButton>());
				this.betHash.push(new Array<BjlBetButton>());
				this.betHash.push(new Array<BjlBetButton>());
				this.betHash.push( new Array<BjlBetButton>());
				this.betHash.push( new Array<BjlBetButton>());
			}
			this.betHash[betBtn.type - 1].push(betBtn);
			let point = this.betContainer.localToGlobal(offsetX , offsetY);
			if(!betBtn.parent) return;
			point = betBtn.parent.globalToLocal(point.x, point.y);
			egret.Tween.get(betBtn).to({x:point.x , y : point.y}, isDushen ? 1200 : 800, egret.Ease.quartOut).call(()=>{
				if(betBtn.stage) BjlSoundPlayer.instance.playBetCoin();
			},this ) ;
		}

		public startDealCard(data)
		{
			let resultData = new game.bjl.BjlRoundResultData();
            resultData.setData(data.resultInfos, data.cardInfos, data.winType);
			this.bjlCardInfo.visible = true;
			// this.finishCardDeliver.playFinishDeliver(resultData, this.onBattleFinish, this, {data:data, resultData:resultData});
			if(this.bjlFinishTask) this.bjlFinishTask.stop();
			this.bjlFinishTask = new BjlFinishTask(data, resultData, this, true);
			this.bjlFinishTask.execute();
		}

		public refreshOnlineCount(count:number) {
			this.onlineLabel.text = count.toFixed(0);
		}

		public checkTask() {
			if(this.bjlFinishTask) {
				this.bjlFinishTask.stop();
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
			this.stopAllShan();
		}

		public clearCardRelative() {
			this.initCardDeliver.resetCard();
		}

		private stopAllShan() {
			for(let shan of this.touchShanArr) {
				shan.stop();
			}
		}

		private flyBetToBanker(betBtn:BjlBetButton, time:number) {
			if(!betBtn.parent) return;
			let bankerIcon:BjlHeadIcon = this.bankerHeadIcon;
			let p = bankerIcon.getHeadPos();
			p = betBtn.parent.globalToLocal(p.x, p.y);
			egret.Tween.get(betBtn).to({x:p.x, y:p.y}, time, egret.Ease.backIn).call(()=>{
				if(betBtn.parent) betBtn.parent.removeChild(betBtn);
			}, this)
		}

		private flyBetFromBankerToArea(betBtn:BjlBetButton, p:egret.Point, time:number) {
			let bankerIcon:BjlHeadIcon = this.bankerHeadIcon;
			let headPos = bankerIcon.getHeadPos();
			headPos = betBtn.parent.globalToLocal(headPos.x, headPos.y);
			betBtn.x = headPos.x;betBtn.y = headPos.y;
			egret.Tween.get(betBtn).to({x:p.x, y:p.y}, time, egret.Ease.quartOut);
		}

		private checkBetToBanker(resultData:BjlRoundResultData):number{
			let needCheckArr:Array<number>;
			if(resultData.containsXianOrZhuang()) {
				needCheckArr = [1,2,3,4,5]
			} else if(resultData.containsHe()) {
				needCheckArr = [3,4,5];
			}
			let costTime:number = 0;
			for(let type of needCheckArr) {
				if(!resultData.containsWinType(type)) {
					let space = this.betHash[type - 1].length > 30 ? 5 : 10;
					let arr = this.betHash[type - 1];
					let index = 0;
					for(let bet of arr) {
						this.flyBetToBanker(bet, 500 + space * index);
						index++;
					}
					this.betHash[type - 1] = [];
					let time = 500 + arr.length * space;
					if(time > costTime) {
						costTime = time;
					}
				}
			}
			return costTime;
		}

		private getSimulateArrByValue(value:number):Array<number> {
			let result = [];
			for(let v of this.customBetNums) {
				if(value / v > 10) result.push(v);
			}
			return result;
		}

		private checkBankerToStakeArea(resultData:BjlRoundResultData):number{
			let wintypes = resultData.winTypes;
			let costTime:number = 0;
			for(let type of wintypes) {
				let targetArea = this.polyStakeAreaArr[type - 1];
				let value = this.bjlData.getRecordTypeBet(type);
				if(type == 3) {
					value = value * 8;
				} else if(type == 4 || type == 5) {
					value = value * 11;	
				} 
				let count = 0;
				let simulateArr = this.getSimulateArrByValue(value);
				let maxCount = 35;
				for(let m = simulateArr.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.customBetNums[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , simulateArr[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showButtonLittle(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(simulateArr[m]) + 1);
							let point = targetArea.randomPoint();
							count++;
							this.flyBetFromBankerToArea(betBtn, point, 400 + count * 10);
							this.betHash[type - 1].push(betBtn);
							if(count > maxCount) {
								break;
							}
						}
					}
					if(count > maxCount) {
						break;
					}
					value -= this.customBetNums[m] * betNum;
				}
				let time = 300 + count * 10;
				if(time > costTime) {
					costTime = time;
				}
			}
			return costTime;
		}

		private flyBetBtnByPlayerFocus(betBtn , headIcon:BjlHeadIcon | eui.Button, time, isSound:boolean = false){
			if(!headIcon) return;
			let point = headIcon.localToGlobal(0,0);
			if(headIcon instanceof BjlHeadIcon) {
				point = headIcon.getHeadPos();
			} else {
				point = headIcon.localToGlobal(headIcon.width / 2, headIcon.height / 2);
			}
			if(betBtn.parent) {
				point = betBtn.parent.globalToLocal(point.x, point.y);
				egret.Tween.get(betBtn).to({x:point.x , y : point.y},time, egret.Ease.backIn).call(()=>{
					if(betBtn && betBtn.parent)
					{
						betBtn.parent.removeChild(betBtn);
					}
					if(isSound) BjlSoundPlayer.instance.playWinCoin();
				},this ) ;
			}
		}

		private genAvailableBetArr(v:number):Array<number> {
			let calcArr = [];
			for(let i=this.customBetNums.length - 1;i >= 0;i--) {
				if(v / this.customBetNums[i] >= 5) {
					calcArr.push(this.customBetNums[i]);
				}
			}
			return calcArr;
		}

		private checkBetToPlayer(data:any, resultData:game.bjl.BjlRoundResultData):number{
			let selfWin = resultData.getSelfWin();
			let flyToSelfValue = 0;
			let costTime = 0;
			let winAreaArr = [];
			for(let area of [1,2,3,4,5]) {
				if(resultData.containsWinType(area)) {
					winAreaArr.push(area);
				}
			}
			// 现在修改成还是要飞玩家头像，改为生成新的做法
			for(let playerId of this.bjlData.getPlayerTypeBetAllPlayers()) {
				let headIcon = this.getHeadIconByPlayerId(playerId);
				if(!headIcon || !headIcon.visible) continue;
				for(let type = 1; type <= 5; type++) {
					if(winAreaArr.indexOf(type) >= 0) {
						let betArea = this.polyStakeAreaArr[type - 1];
						let v = (GameConst.getBjlMulti(type) + 1) * this.bjlData.getPlayerTypeBet(playerId, type);
						let count = 0;
						let maxCount = 20;
						let calcArr = this.genAvailableBetArr(v);
						if(betArea) {
							let count=0;
							let maxCount=10;
							for(let j = 0;j < calcArr.length;j++) {
								let betValue = calcArr[j];
								let num = Math.floor(v / betValue);
								for(let k=0;k<num;k++) {
									let betBtn = this.betButtonFactory2(betValue);
									this.betContainer.addChild(betBtn);
									betBtn.showButtonLittle(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(betValue) + 1)
									let p = betArea.randomPoint();
									betBtn.x = p.x;
									betBtn.y = p.y;
									this.flyBetBtnByPlayerFocus(betBtn, headIcon, 550 + k * 10, true);
									count++;
									if(count > maxCount) break;
								}
								v -= betValue * num;
								if(count > maxCount) break;
							}
						}
					}
				}
			}
			for(let arr of this.betHash) {
				let index = 0;
				let space = arr.length > 30 ? 5 : 10;
				for(let bet of arr) {
					// 飞向其他在线玩家
					this.flyBetBtnByPlayerFocus(bet, this.playerListBtn, 300 + index * space)
					index++;
				}
				let time = 300 + arr.length * space;
				if(time > costTime) {
					costTime = time;
				}
			}
			return costTime;
		}

		public showFinishAfterBetTween(data:any) {
			if(data.battleInfo != null && data.battleInfo != undefined && data.battleInfo.length > 0) {
				let selfData;
				for(let i = 0 ; i < data.battleInfo.length ; i++)
				{
					let tempInfo = data.battleInfo[i];
					let battlePlayerId = Number(tempInfo.playerId);
					let headIcon = this.getHeadIconByPlayerId(battlePlayerId)
					if(headIcon == null)
					{
						continue;
					}
					if(tempInfo.money > 0)
					{
						headIcon.showWin(tempInfo.money);
					}else if(tempInfo.money < 0)
					{
						headIcon.showLose(tempInfo.money);
					}
					
					if(battlePlayerId == UserService.instance.playerId)
					{
						this.tempBetGold = this.bjlData.selfMoney;
						selfData = tempInfo;
						tempInfo.totalMoney = this.bjlData.selfMoney;
						headIcon.showImmGold(this.bjlData.selfMoney);
					} else {
						headIcon.showImmGold(tempInfo.totalMoney);
					}
					let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(battlePlayerId);
					if(playerInfo) {
						playerInfo.money = tempInfo.totalMoney;
					}
					let battlePlayer = this.bjlData.getPlayerById(battlePlayerId)
					if(battlePlayer) {
						battlePlayer.money = tempInfo.money;
						battlePlayer.totolMoney = tempInfo.totalMoney;
					}
				}
				if(this.bjlData.isSelfBanker()) {
					if(selfData.money > 0)
					{
						this.selfHeadIcon.showWin(selfData.money);
						this.selfHeadIcon.showImmGold(selfData.totalMoney);
					}else if(selfData.money < 0)
					{
						this.selfHeadIcon.showLose(selfData.money);
						this.selfHeadIcon.showImmGold(selfData.totalMoney);
					}
				}
				let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
				roomData.status = game.GameStatus.RUNNING;
				for(let i=0;i<roomData.playerInfos.length;i++) 
				{
					let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
					if(playerInfo.playerId == UserService.instance.playerId)
					{
						playerInfo.money = this.bjlData.selfMoney;
					}
				}
			}
		}

		public onBattleFinish(dataObj,isShowEnd:boolean)
		{
			let data = dataObj.data;
			let resultData:BjlRoundResultData = dataObj.resultData;
			BjlRequest.requestOPWinFail(0);
			for(let win of data.winType) {
				this.touchShanArr[win - 1].play();
			}
			this.trendPanel.addItem(data.winType);
			if(this.betHash == null )
			{
				return;
			}
			let bankerTime = this.checkBetToBanker(resultData);
			this.setTimeOut(()=>{
				let bankerToAreaTime = this.checkBankerToStakeArea(resultData);
				this.setTimeOut(()=>{
					let tpPlayerTime = this.checkBetToPlayer(data, resultData);
					this.setTimeOut(()=>{
						this.showFinishAfterBetTween(data);
						if(isShowEnd) this.showFinishUI(resultData);
					}, 50 + tpPlayerTime);
				}, 50 + bankerToAreaTime);
			}, bankerTime + 50);
		}

		private handleNewBetGen(data:any) {
			this.bjlData = new BjlData();
			// data.stakeInfo 只代表自己
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHeadIcon.showImmGold(this.tempBetGold);
				}
			}
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.bjlData.addPlayer(playerInfo);
			this.betHash = new Array();
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push(new Array<BjlBetButton>());
			this.betHash.push( new Array<BjlBetButton>());
			this.betHash.push( new Array<BjlBetButton>());
			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				this.bjlData.recordTypeBetInfo(type, value);
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.updateTotalRetInfo(stakeInfo.value);
				let targetArea = this.polyStakeAreaArr[type - 1];
				for(let m = this.customBetNums.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.customBetNums[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , this.customBetNums[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showButtonLittle(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(this.customBetNums[m]) + 1);
							let point = targetArea.randomPoint();
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.betHash[type - 1].push(betBtn);
						}
					}
					value -= this.customBetNums[m] * betNum;
				}
			}
		}

		private handleAddBetGen(data:any) {
			// data.stakeInfo 只代表自己
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHeadIcon.showImmGold(this.tempBetGold);
				}
			}
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.bjlData.addPlayer(playerInfo);

			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				value = value - this.bjlData.getRecordTypeBet(type);
				let targetArea = this.polyStakeAreaArr[type - 1];
				for(let m = this.customBetNums.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.customBetNums[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , this.customBetNums[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showButtonLittle(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(this.customBetNums[m]) + 1);
							let point = targetArea.randomPoint();
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.betHash[type - 1].push(betBtn);
						}
					}
					value -= this.customBetNums[m] * betNum;
				}
			}
		}

		public firstEnterRoom(data)
		{
			if(this.bjlFinishTask) this.bjlFinishTask.stop();
			BjlData.bankerUpMoneyLimit = data.upBankerMinMoney / 1000
			this.clearAllTimeOut();
			this.tempBetGold = 0;
			this.currStatus = <BjlStatus>data.status;
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.recoutTips.visible = false;
			this.bjlCardInfo.reset();
			if(data.serialNumber == this.curGameRound) {
				this.handleAddBetGen(data);
			} else {
				this.betContainer.removeChildren();
				this.resetBetInfo();
				this.handleNewBetGen(data);
			}
			this.bjlData.clearPlayerTypeBet();
			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.reset();
				betInfo.updateTotalRetInfo(stakeInfo.value);
				this.bjlData.recordTypeBetInfo(type, value);
			}
			for(let battleInfo of data.battleInfo) {
				for(let stakeInfo of battleInfo.playerStake) {
					this.bjlData.recordPlayerTypeBet(Number(battleInfo.playerId), stakeInfo.type, stakeInfo.value);
				}
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						let betInfo = this.betInfoArr[stakeInfo.type - 1];
						betInfo.updateSelfRetInfo(stakeInfo.value);
					}
				}
			}
			for(let bankerInfo of data.bankerInfos) {
				this.bjlData.addBankerData(bankerInfo);
			}
			this.updateBankerState();
			this.bjlData.clearDushenTypeBet();
			for(let battleInfo of data.battleInfo) {
				let playerId = Number(battleInfo.playerId);
				let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
				if(playerInfo && playerInfo.postion == 2) {
					for(let stakeInfo of battleInfo.playerStake) {
						this.bjlData.recordDushenTypeBet(stakeInfo.type, stakeInfo.value);
						if(stakeInfo.value > 0) {
							if(stakeInfo.value > GameCfg.getNumberValue("bjlDushenCondition_" + RoomManager.getInstance().curRoomData.gameLevel)) {
								let targetBetInfoUI = this.dushenFlagArr[stakeInfo.type - 1];
								// this.shensuanziParticle(targetBetInfoUI);
								targetBetInfoUI.showShensuanziAnim();
								targetBetInfoUI.hasFlagDuShen = true;
							}
						}
					}
				}
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stake of battleInfo.playerStake) {
						if(stake.value > 0) {
							this.bjlData.isSelfBet = true;
						}
					}
				}
			}
			this.curGameRound = data.serialNumber;
			let roomData = RoomManager.getInstance().curRoomData;
			let playerInfo:game.PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.tempBetGold = playerInfo.money;
			this.bjlData.selfMoney = this.tempBetGold;
			this.selfHeadIcon.showImmGold(this.tempBetGold);
			this.updateBankerState();
			
			if(data.status == BjlStatus.prepared) {
				if(data.downTime < 2) {
					this.initCardDeliver.showEnd();
				} else {
					this.recoutTips.visible = true;
					this.recoutTips.initUI(BjlStatus.prepared, data.downTime - 2);
					this.battleStartCountDown.startCountDown(data.downTime - 2);
					this.setTimeOut(this.startFapai, (data.downTime - 2) * 1000);
				}
			}
			if(data.status == BjlStatus.startBet)
			{
				this.recoutTips.visible = true;
				this.battleStartCountDown.startCountDown(data.downTime, true);
				if(this.lastChooseBet >= 0) {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				} else {
					this.selectedBetButtonByIndex(0);
				}
				this.initCardDeliver.showEnd();
				this.recoutTips.initUI(data.status, data.downTime);
			}
			if(data.status == BjlStatus.stopBet) {
				this.recoutTips.initUI(data.status, data.downTime);
				this.recoutTips.visible = true;
				this.battleStartCountDown.startCountDown(data.downTime);
				let resultData = new game.bjl.BjlRoundResultData();
				resultData.setData(data.resultInfos, data.cardInfos, data.winType);
				resultData.showWaitTime = data.downTime * 1000;
				if(!this.bjlData.isSelfBet) {
					// this.showFinishUI(resultData);
					this.waitGroup.visible = true;
					this.waitAnim.play();
				} 
				this.initCardDeliver.showEnd();
				this.bjlCardInfo.visible = true;
				this.bjlFinishTask = new BjlFinishTask(data, resultData, this, this.bjlData.isSelfBet);
				this.bjlFinishTask.execute(20 - data.downTime)
				/*
				if(data.cardInfos.length >= 1)
				{
					this.bjlCardInfo.visible = true;
					this.bjlCardInfo.showResultNoEffect2(resultData);
				}
				*/
			}
			this.currStatus = data.status;
			this.refreshBtnState();
		}

		private startFapai() {
			this.recoutTips.visible = true;
			this.recoutTips.initUI(4, 2);
			this.battleStartCountDown.startCountDown(2);
			this.initCardDeliver.init();
			this.initCardDeliver.playDeliver();
		}
		
		public betButtonFactory(playerId , type , betNum) : BjlBetButton
		{
			var betBtn = new BjlBetButton();
			betBtn.enabled = false;
			betBtn.touchEnabled = false;
			betBtn.touchChildren = false;
			// betBtn.scaleX = 0.55;
			// betBtn.scaleY = 0.55;
			// betBtn.currentState = "bet" + betNum;
			betBtn.anchorOffsetX = betBtn.width/2;
			betBtn.anchorOffsetY = betBtn.height/2;
			betBtn.value = betNum;
			betBtn.type = type;
			betBtn.playerId = playerId;
			return betBtn;
		}

		public betButtonFactory2(betNum) : BjlBetButton
		{
			var betBtn = new BjlBetButton();
			betBtn.enabled = false;
			betBtn.touchEnabled = false;
			betBtn.touchChildren = false;
			betBtn.anchorOffsetX = betBtn.width/2;
			betBtn.anchorOffsetY = betBtn.height/2;
			betBtn.value = betNum;
			return betBtn;
		}

		public onPlayerList()
		{
			BjlRequest.requestPlayerRank();
		}

		public onRoomList()
		{
			BjlRequest.requestRoomList(0);
		}


		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
			this.tempBetGold += drawmoney;
			this.selfHeadIcon.showImmGold(this.tempBetGold)
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
			if(playerInfo) {
				playerInfo.money = totalmoney;
			}
			this.bjlData.getPlayerById(UserService.instance.playerId).money = totalmoney;
			this.bjlData.addMoney(drawmoney); 
			this.refreshBtnState();
		}

		public showFinishUI(resultData:game.bjl.BjlRoundResultData) {
			this.roundResult.visible = true;
			let darkSprite = this.roundResult["dark"];
			let p = this.roundResult.globalToLocal(0,0);
			darkSprite.x = p.x;
			darkSprite.y = p.y;
			this.roundResult.showRoundResult(this.bjlData, resultData);
			this.bjlData.recordResultPanelOpen();
		}

		protected onLeave() {
			super.onLeave();
			if(this.finishCardDeliver) {
				this.finishCardDeliver.stopDeliver();
			}
			this.prevCache = [];
			for(let headIcon of this.playerHeads) {
				headIcon.clearPlayerInfo();
			}
			this.checkTask();
			this.resetBetInfo();
			// this.lastChooseBet = 0;
		}

		public shensuanziParticle(targetBetInfoUI:BjlDuShenFlag) {
			if(targetBetInfoUI.hasFlagDuShen) return;
			targetBetInfoUI.hasFlagDuShen = true;
			let startPoint = this.playerHeads[2].getShensuzniStartPoint();
			if(startPoint) {
				let endPoint = targetBetInfoUI.getShensuanziPos();
				let index = this.dushenFlagArr.indexOf(targetBetInfoUI);
				if(endPoint) {
					let cfg = RES.getRes("bjl_dushen_particle_json");
					let chargeParticle = CommonUtil.generateDirectionParticle(
						RES.getRes("bjl_dushen_particle_png"), 
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
