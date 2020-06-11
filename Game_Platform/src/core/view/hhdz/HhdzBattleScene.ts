module game.hhdz {

	export enum HhdzStatus {
		prepared = 0,
		startBet = 1,
		stopBet = 2,
		dealCard = 3
	}

	export enum HhdzType {
		none,
		red,
		black,
		lucky
	}

	export enum HhdzCardType {
		danzhang,
		duizi,
		shunzi,
		tonghua,
		tonghuashun,
		baozi
	}
	export class HhdzBattleScene extends GameScene {
		public constructor() {
			super();
			this.gameType = ChildGameType.HHDZ;
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
			if(partName.indexOf("red_point_") >= 0) {
				this.redBetPointArr[parseInt(partName.replace("red_point_", "")) - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("black_point_") >= 0) {
				this.blackBetPointArr[parseInt(partName.replace("black_point_", "")) - 1] = instance;
				instance.visible = false;
			}
			if(partName.indexOf("lucky_point_") >= 0) {
				this.luckyBetPointArr[parseInt(partName.replace("lucky_point_", ""))  - 1] = instance;
				instance.visible = false;
			}
		}

		public menuBtn: hhdz.HhdzMenu;
		//下注按钮区域
		public stakeBtn: eui.Group;
		private openBankBtn:eui.Button;

		public redBetGruop: eui.Group;
		public blackBetGruop: eui.Group;
		public luckBetGruop: eui.Group;


		//下注筹码
		public stakeBetGroup: eui.Group;
		public betButton1: hhdz.HhdzBetButton;
		public betButton2: hhdz.HhdzBetButton;
		public betButton3: hhdz.HhdzBetButton;
		public betButton4: hhdz.HhdzBetButton;
		public betButton5: hhdz.HhdzBetButton;
		public betButton6: hhdz.HhdzBetButton;
		private betBtnArr: Array<hhdz.HhdzBetButton>;
		private curBetButton:hhdz.HhdzBetButton;
		private level1BetNums: number[] = [1, 5, 10, 50, 100, 500];
		private level2BetNums: number[] = [10, 50, 100, 200, 500, 1000];
		private level3BetNums: number[] = [50, 100, 200, 500, 1000, 2000];

		public roomStatusImg: eui.Image;
		public downTimeLab: eui.BitmapLabel;
		public downTimeAnim: DragonAnim;

		//牌
		public hHCard1: hhdz.HHCard;
		public hHCard2: hhdz.HHCard;
		public hHCard3: hhdz.HHCard;
		public hHCard4: hhdz.HHCard;
		public hHCard5: hhdz.HHCard;
		public hHCard6: hhdz.HHCard;
		public cardInfoGruop: eui.Group;
		public cardArr:Array<hhdz.HHCard>;
		private cardPosArr:Array<egret.Point>;
		//开牌结果
		public redWinAnim: DragonAnim;
		public redTypeAnim: DragonAnim;
		public blackWinAnim: DragonAnim;
		public blackTypeAnim: DragonAnim;
		public redAnim:DragonAnim;
		public blackAnim:DragonAnim;

		//发牌动画
		public fapaiAnim: egret.tween.TweenGroup;

		//开始游戏
		public startStakeAnim: DragonAnim;
		public stopStakeAnim: DragonAnim;
		public pkAnim: DragonAnim;
		//等待
		public waitAnim: DragonAnim;


		//自己
		public nickNameLab: eui.Label;
		public myGoldenLab: eui.BitmapLabel;
		public winFailMoneyLab: eui.BitmapLabel;
		public myVipLab: eui.Image;
		public winFailTween: egret.tween.TweenGroup;

		//庄家
		public bankerNameLab: eui.Label;
		public bankerMoneyLab: eui.BitmapLabel;
		public bankerVipLab: eui.Image;
		public blankerEinFailMoneyTween: egret.tween.TweenGroup;
		public blankerEinFailMoneyLab: eui.BitmapLabel;

		private applyBankerBtn: IButton;
		private downBankerBtn: IButton;

		//下注筹码
		public redSelf: eui.BitmapLabel;
		public redTotal: eui.BitmapLabel;
		public blackSelf: eui.BitmapLabel;
		public blackTotal: eui.BitmapLabel;
		public luckySelf: eui.BitmapLabel;
		public luckyTotal: eui.BitmapLabel;

		//头像
		public hhdzHead2: hhdz.HhdzHeadMaxIcon;
		public hhdzHead3: hhdz.HhdzHeadMaxIcon;
		public hhdzHead4: hhdz.HhdzHeadMinIcon;
		public hhdzHead5: hhdz.HhdzHeadMinIcon;
		public hhdzHead6: hhdz.HhdzHeadMinIcon;
		public hhdzHead7: hhdz.HhdzHeadMinIcon;
		private hhdzHeads:Array<hhdz.HhdzHeadIcon>;
		public headInfoGruop: eui.Group;


		//房间下注情况
		private redTotalMoney: number = 0;
		private blackTotalMoney: number = 0;
		private luckyTotalMoney: number = 0;
		private myRedTotalMoney: number = 0;
		private myBlackTotalMoney: number = 0;
		private myLuckyTotalMoney: number = 0;

		public playerListBtn: IButton;
		public continueBtn: IButton;

		//赢动画
		public leftWinAnim: DragonAnim;
		public rigthWinAnim: DragonAnim;
		public centerWinAnim: DragonAnim;
		// public leftWinResultAnim: DragonAnim;

		//记录
		public historyInfoGroup: eui.Group;
		public historyCardTypeGroud: eui.Group;

		//走势图 
		public trendBtn: IButton;

		//结果mc动画
		public luckyWinMcAnim: MCAnim;
		public blackWinMcAnim: DragonAnim;
		public redWinMcAnim: DragonAnim;

		private isInit: boolean = false;
		private isStart: boolean = false;

		private changeBankerImg:eui.Image;
		private applyBankerNumLabel:eui.BitmapLabel;
		private bankerGroup:eui.Group;
		private bankerListShowGroup:eui.Group;
		private betContainer:eui.Group;
		private betCache:HhdzFlyCoin[][];
		private redBetPointArr:Array<eui.Rect> = [];
		private blackBetPointArr:Array<eui.Rect> = [];
		private luckyBetPointArr:Array<eui.Rect> = [];
		private polyStakeAreaArr:PolyStakeArea[];
		private xianzhiGroupRed:HhdzXianzhiFlag;
		private xianzhiGroupBlack:HhdzXianzhiFlag;
		private xianzhiGroupLucky:HhdzXianzhiFlag;
		public endBoomAnim:DragonAnim;
		private myInfoGruop:eui.Group;

		private polyStakeAreaRed:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaBlack:PolyStakeArea = new PolyStakeArea();
		private polyStakeAreaLucky:PolyStakeArea = new PolyStakeArea();
		private _curGameRound:number = 0;

		public set curGameRound(v:number) {
			this._curGameRound = v;
			if(this.hhdzData) {
				this.hhdzData.curGameRound = this._curGameRound;
			}
		}

		public get curGameRound():number{
			return this._curGameRound;
		}
		public hhdzData:HhdzData;
		private currStatus:HhdzStatus = HhdzStatus.prepared;
		private curBetValueArr:Array<number>;
		private lastChooseBet:number = -1;
		private lastOpenLevel:number = -1;
		private prevCache:Array<any> = []; 
		private cacheBet:Array<any> = []; 
		private betInfoGroup:HhdzBetInfoGroup;
		private xianzhiArr:Array<HhdzXianzhiFlag>;
		private finishTaskExec:BehaviorTaskExecutor;
		private testBtn:eui.Button;
		private blackStartPoint:eui.Group;
		private redStartPoint:eui.Group;
		private endPoint:eui.Group;
		private contentGroup:eui.Group;
		private onlineCountLabel:eui.BitmapLabel;
		private menuGroup:MenuGroup;
		private menuArrowImg:eui.Image;
		private menuContent:eui.Group;
		private backBtn : IButton;
		private bankBtn:eui.Button;
		public helpBtn : IButton;
		public settingAudioBtn : IButton;
		protected componentInit(): void {
			this.stakeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStakeAreaCheck, this);
			this.trendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrendButton, this);
			this.openBankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBank, this);
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCacheBet, this);
			this.playerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerListBtn, this);
			this.applyBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplyBanker, this);
			this.downBankerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBanker, this);
			this.bankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerHeadClick, this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackhall , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelpBtntap , this);
			this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtntap , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.openBank , this);
			this.betBtnArr = [this.betButton1, this.betButton2, this.betButton3, this.betButton4, this.betButton5, this.betButton6];
			this.hhdzHeads = [this.hhdzHead2, this.hhdzHead3, this.hhdzHead4, this.hhdzHead5, this.hhdzHead6, this.hhdzHead7];
			this.cardArr = [this.hHCard1, this.hHCard2, this.hHCard3, this.hHCard4, this.hHCard5, this.hHCard6]
			this.cardPosArr = [];
			for(let card of this.cardArr) {
				this.cardPosArr.push(egret.Point.create(card.x, card.y));
			}
			this.polyStakeAreaRed.initByDisplayObjNodes(this.redBetPointArr);
			this.polyStakeAreaBlack.initByDisplayObjNodes(this.blackBetPointArr);
			this.polyStakeAreaLucky.initByDisplayObjNodes(this.luckyBetPointArr);
			this.polyStakeAreaArr = [this.polyStakeAreaRed, this.polyStakeAreaBlack, this.polyStakeAreaLucky];
			this.betInfoGroup = new HhdzBetInfoGroup(
				this.redTotal, this.redSelf, this.blackTotal, this.blackSelf, this.luckyTotal, this.luckySelf
			)
			this.xianzhiArr = [this.xianzhiGroupRed, this.xianzhiGroupBlack, this.xianzhiGroupLucky];
			this.isInit = true;
			if (this.isStart) {
				this.initScene();
			}
			for(var i = 0 ; i < this.betBtnArr.length ; i++)
			{
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.selectedBetButton , this);
				this.betBtnArr[i].index = i + 1;
			}
			for(let tweenItem of this.fapaiAnim.items) {
				tweenItem.addEventListener(egret.Event.COMPLETE, this.onFapaiTweenItemComplete, this);
			}
			this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "hhdz_desk011", "hhdz_desk047");
			this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontest, this);
		}

		private ontest() {
			this.shensuanziParticle(this.xianzhiArr[0]);
		}

		private onBankerHeadClick() {
			let p = this.bankerListShowGroup.localToGlobal(
				this.bankerListShowGroup.width,
				this.bankerListShowGroup.height)
			let roomData = RoomManager.getInstance().curRoomData;
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, {pos:p, gameType:roomData.gameType});
		}

		public refreshOnlineCcount(count:number) {
			this.onlineCountLabel.text = "(" + count.toFixed(0) + ")"
		}

		//发牌
		public startDealCard(data: any): void {
			this.finishTaskExec = HhdzHelper.genFinishTask(data, this);
			this.finishTaskExec.execute();
		}

		//获取玩家的结果信息
		private getFinshBattleInfo(playerId: number, data: any): any {
			for (var i: number = 0; i < data.length; i++) {
				var battleInfo: any = data[i];
				if (battleInfo.playerId == playerId) {
					return battleInfo;
				}
			}
		}

		public resetBetInfo() {
			this.betInfoGroup.reset();
			for(let xianzhi of this.xianzhiArr) {
				xianzhi.reset();
			}
		}

		public onApplyBanker() {
			let roomData = RoomManager.getInstance().curRoomData;
			if (roomData.getPlayerInfo(UserService.instance.playerId).money < HhdzData.bankerUpMoneyLimit) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:" + HhdzData.bankerUpMoneyLimit + "元",
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
			if (roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId) {
				CommonUtil.noticeMsg("已是庄家，不能上庄！");
				return;
			}
			HhdzRequest.sendApplyBanker();
		}
		public isDownOper:boolean = false;
		public onDownBanker() {
			this.isDownOper = true;
			HhdzRequest.sendDownBanker();
		}

		public downBankerRet(data) {
			this.hhdzData.setBankerData(data.bankerInfos);
			this.updateBankerState();
			if(this.isDownOper) {
				this.isDownOper = false;
				if (this.hhdzData.isSelfBanker()) {
					TipsUtils.showTipsFromCenter("申请成功,下局下庄");
				} else {
					TipsUtils.showTipsFromCenter("下庄成功");
				}
			}
		}

		private updateBankerState() {
			if (this.hhdzData.isSelfInBankerUpList() || this.hhdzData.isSelfBanker()) {
				this.downBankerBtn.visible = true;
				this.applyBankerBtn.visible = false;
			} else {
				this.downBankerBtn.visible = false;
				this.applyBankerBtn.visible = true;
			}
			this.applyBankerNumLabel.text = this.hhdzData.bankerList.length.toFixed(0) + "人";
		}

		public onApplyBankerRet(data) {
			if(this.hhdzData.addBankerData(data).playerId == UserService.instance.playerId) {
				TipsUtils.showTipsFromCenter("申请成功");
			}
			this.updateBankerState();
		}

		private onSettingBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.HHDZ);
		}

		private onHelpBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.HHDZ);
		}

		private openBank() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.HHDZ);
		}

		public finishAfterFlyCoins(redWin:boolean, blackWin:boolean, luckyWin:boolean, data:any) {
			let roomData = RoomManager.getInstance().curRoomData;
			//赢动画
			if (redWin) {
				this.redWinMcAnim.visible = true;
				this.redWinMcAnim.playerOnce(() => {
					this.redWinMcAnim.visible = false;
					this.playRedWinParticle();
				}, this);
				
			}
			if (blackWin) {
				this.blackWinMcAnim.visible = true;
				this.blackWinMcAnim.playerOnce(() => {
					this.blackWinMcAnim.visible = false;
					this.playBlackWinParticle();
				}, this);
				
			}
			if (luckyWin) {
				this.luckyWinMcAnim.visible = true;
				this.luckyWinMcAnim.playerOnce(() => {
					this.luckyWinMcAnim.visible = false;
				}, this);
			}
			for (let i: number = 0; i < this.headInfoGruop.numChildren; i++) {
				let headInfo: any = this.headInfoGruop.getChildAt(i);
				let playerInfo: PlayerInfo = roomData.getPlayerInfoByPos(Number(headInfo.name));
				if (playerInfo == null) {
					continue;
				}
				var playerBattle: any = this.getFinshBattleInfo(playerInfo.playerId, data.battleInfo);
				if (playerBattle == null) {
					continue;
				}
				playerInfo.money = playerBattle.totalMoney;
				headInfo.showMoneyAnim(playerBattle.money, playerBattle.totalMoney);
				this.updateHeadMoney(playerInfo.playerId);
			}
			this.hhdzData.recordResultPanelOpen();
			//自己赢金币动画
			var myPlayerBattle: any = this.getFinshBattleInfo(UserService.instance.playerId, data.battleInfo);
			var myPlayerInfo: PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			if (myPlayerInfo != null) {
				myPlayerInfo.money = myPlayerBattle.totalMoney;
			}
			var winMoney: number = myPlayerBattle.money;
			if (winMoney != 0) {
				if (winMoney > 0) {
					this.winFailMoneyLab.text = "+" + winMoney.toFixed(2) + "元";
					this.winFailMoneyLab.font = "hhdz_ying_fnt";
				} else if (winMoney < 0) {
					this.winFailMoneyLab.text = winMoney.toFixed(2) + "元";
					this.winFailMoneyLab.font = "hhdz_shu_fnt";
				}
				this.winFailTween.play(1);
			}
			// this.updateHeadMoney(UserService.instance.playerId);
			//庄家金币
			let blankPlayerInfo: PlayerInfo = roomData.getPlayerInfoByPos(0);
			if (blankPlayerInfo != null) {
				var blankerPlayerBattle: any = this.getFinshBattleInfo(blankPlayerInfo.playerId, data.battleInfo);
				if (blankerPlayerBattle && blankerPlayerBattle.money != 0) {
					if (blankerPlayerBattle.money > 0) {
						this.blankerEinFailMoneyLab.text = "+" + blankerPlayerBattle.money.toFixed(2) + "元";
						this.blankerEinFailMoneyLab.font = "hhdz_ying_fnt";
					} else if (blankerPlayerBattle.money < 0) {
						this.blankerEinFailMoneyLab.text = blankerPlayerBattle.money.toFixed(2) + "元";
						this.blankerEinFailMoneyLab.font = "hhdz_shu_fnt";
					}
					this.blankerEinFailMoneyTween.play(1);
				}
				if(blankerPlayerBattle) {
					blankPlayerInfo.money = blankerPlayerBattle.totalMoney;
					this.updateHeadMoney(blankPlayerInfo.playerId);
				}
			}
			this.updateSelfMoneyAfterBattleFinish();
		}

		private updateSelfMoneyAfterBattleFinish() {
			let roomData = RoomManager.getInstance().curRoomData;
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			if(playerInfo) {
				playerInfo.money = this.hhdzData.selfMoney
			}
			this.myGoldenLab.text = CommonUtil.fixMoneyFormat(this.hhdzData.selfMoney);
			let blankPlayerInfo: PlayerInfo = roomData.getPlayerInfoByPos(0);
			if(blankPlayerInfo && blankPlayerInfo.playerId == UserService.instance.playerId) {
				this.bankerMoneyLab.text = CommonUtil.fixMoneyFormat(this.hhdzData.selfMoney);
			}
		}

		//判断对子是否大于9
		public getMaxCard(cards: any): boolean {
			var c1: number = parseInt((cards[0] / 4).toString());
			var c2: number = parseInt((cards[1] / 4).toString());
			var c3: number = parseInt((cards[2] / 4).toString());
			if (c1 == c2 && c1 >= 9) {
				return true;
			}
			if (c1 == c3 && c1 >= 9) {
				return true;
			}
			if (c2 == c3 && c2 >= 9) {
				return true;
			}
			return false;
		}

		//获取牌信息
		public getCardInfo(data: any, type: number): any {
			for (let i: number = 0; i < data.cardInfos.length; i++) {
				let info: any = data.cardInfos[i];
				if (info.type == type) {
					return info;
				}
			}
			return null;
		}

		public resetCardShow() {
			let index = 0;
			for(let card of this.cardArr) {
				card.showDefault();
				card.x = this.cardPosArr[index].x
				card.y = this.cardPosArr[index].y
				index++;
			}
		}

		private getBetButtonValue(betButton) : number
		{
			let idx = this.betBtnArr.indexOf(betButton);
			if(idx >= 0) {
				return this.curBetValueArr[idx];
			}
			return 0;
		}

		private getSelfMoney():number{
			let roomData = RoomManager.getInstance().curRoomData;
			if(roomData) {
				for(let playerInfo of roomData.playerInfos) {
					if(playerInfo.playerId == UserService.instance.playerId) {
						return playerInfo.money;
					}
				}
			}
			return 0;
		}

		private costSelfMoenyDirect(value:number){
			let roomData = RoomManager.getInstance().curRoomData;
			if(roomData) {
				for(let playerInfo of roomData.playerInfos) {
					if(playerInfo.playerId == UserService.instance.playerId) {
						playerInfo.money = playerInfo.money - value;
					}
				}
			}
		}

		//判断是否按钮是否显示可以下注
		private refreshBtnState() {
			if(this.hhdzData.isSelfBanker() || this.currStatus != HhdzStatus.startBet) {
				for(let btn of this.betBtnArr) {
					btn.canChoose = false;
				}
				this.continueBtn.enabled = false;
				return;
			}

			let avaliableArr = [];
			let selfMoney = this.getSelfMoney();
			for(let btn of this.betBtnArr) {
				let v = this.getBetButtonValue(btn);
				if(selfMoney < v) {
					btn.canChoose = false;
					egret.log("金币不足 按钮不可用 " + v  + "  " + selfMoney)
				} else {
					btn.canChoose = true;
					avaliableArr.push(btn);
				}
			}
			
			let xuyaNeedValue = 0;
			for(let p of this.prevCache) {
				xuyaNeedValue += this.getBetButtonValue(p.betButton);
			}
			if(selfMoney < xuyaNeedValue) {
				this.continueBtn.enabled = false;
			} else {
				if(this.prevCache && this.prevCache.length > 0 && !this.continueBtn["hasClick"]) {
					this.continueBtn.enabled = true;
				}
			}
			if(this.currStatus == HhdzStatus.startBet) {
				if(this.lastChooseBet > (avaliableArr.length - 1)) {
					if(avaliableArr.length > 0) {
						this.selectedBetButtonByIndex(avaliableArr.length - 1);
					}
				} else {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				}
			}
		}

		//选择下注筹码
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
					this.curBetButton = this.betBtnArr[i];
					this.curBetButton.lightMove();
					this.lastChooseBet = index;
				}else
				{
					this.betBtnArr[i].recovery();
				}
			}
		}
		//自己下注
		private onStakeAreaCheck(event: egret.TouchEvent) {
			var group: eui.Group = event.currentTarget;
			let stakeType: number = 0;
			for (var i: number = 0; i < group.numChildren; i++) {
				var img: eui.Image = group.getChildAt(i) as eui.Image;
				var isOk: boolean = img.hitTestPoint(event.stageX, event.stageY, true);
				if (isOk) {
					stakeType = Number(img.name);
				}
			}
			if(stakeType == 0) return;
			if(this.hhdzData.isSelfBanker()) {
				CommonUtil.noticeMsg("庄家不能下注");
				return;
			}
			if(this.currStatus != HhdzStatus.startBet) {
				CommonUtil.noticeMsg("请稍候，还没到下注时间");
				return;
			}
			// this.brightBetArea(stakeType);
			this.startStakeTrue(stakeType, this.curBetButton, true);
		}

		public getBetBtnByValue(value:number) : HhdzBetButton {
			for(let betBtn of this.betBtnArr) {
				if(betBtn.betMoney == value) {
					return betBtn;
				}
			}
		}

		public handleBetCreate(data:any, isDelta:boolean) {
			this.hhdzData.clearPlayerTypeBet();
			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				if(isDelta) {
					value = value - this.hhdzData.getRecordTypeBet(type);
				}
				let targetArea = this.polyStakeAreaArr[type - 1];
				for(let m = this.curBetValueArr.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / this.curBetValueArr[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.genFlyCoin(this.curBetValueArr[m]);
							this.betContainer.addChild(betBtn);
							betBtn.type = type;
							let point = targetArea.randomPoint();
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.betCache[type - 1].push(betBtn);
						}
					}
					value -= this.curBetValueArr[m] * betNum;
				}
			}
		}

		private updateHistory(data:any, isDelayShow:boolean = false) {
			this.historyInfoGroup.removeChildren();
			this.historyCardTypeGroud.removeChildren();
			for (var i: number = 0; i < data.winFails.length; i++) {
				var winFail: any = data.winFails[i];
				this.updateLogHistory(winFail.winType, winFail.cardType, isDelayShow);
			}
		}

		public firstEnterRoom(data) {
			this.checkFinishTask();
			this.clearBattle();
			this.resetCardShow();
			this.changeBankerImg.visible = false;
			egret.Tween.removeTweens(this.changeBankerImg);
			this.fapaiAnim.stop();
			HhdzHelper.clearAnims(this);
			//历史记录
			this.updateHistory(data);
			let gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			if(this.curGameRound == data.serialNumber && this.hhdzData && this.hhdzData.gameLevel == gameLevel) {
				this.handleBetCreate(data, true);
			} else {
				let hhdzData = new HhdzData();
				if(this.hhdzData) {
					hhdzData.bankerList = this.hhdzData.bankerList;
				}
				this.hhdzData = hhdzData;
				this.hhdzData.gameLevel = gameLevel;
				this.resetBetCache();
				this.clearBattle();
				this.clearCoins();
				this.handleBetCreate(data, false);
			}
			this.hhdzData.clearPlayerTypeBet();
			this.hhdzData.clearRecortTypeBet();
			//先是信息收集
			for(let battleInfo of data.battleInfo) {
				for(let playerStake of battleInfo.playerStake) {
					if(playerStake.value > 0) {
						this.hhdzData.recordPlayerTypeBet(battleInfo.playerId, playerStake.type, playerStake.value);
						if(battleInfo.playerId == UserService.instance.playerId) {
							this.hhdzData.isSelfBet = true;
							this.betInfoGroup.updateSelfTypeBet(playerStake.type, playerStake.value);
						}
					}
					let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(battleInfo.playerId);
					if(playerInfo && playerInfo.postion == 2) {
						for(let stakeInfo of battleInfo.playerStake) {
							this.hhdzData.recordDushenTypeBet(stakeInfo.type, stakeInfo.value);
							let targetBetInfoUI = this.xianzhiArr[stakeInfo.type - 1];
							if(!targetBetInfoUI.hasFlagDuShen && stakeInfo.value > GameCfg.getNumberValue("hhdzDushenCondition_" + RoomManager.getInstance().curRoomData.gameLevel)) {
								this.xianzhiArr[stakeInfo.type - 1].showShensuanziAnim();
								this.xianzhiArr[stakeInfo.type - 1].hasFlagDuShen = true;
							}
						}
					}
				}
				if(battleInfo.playerId == UserService.instance.playerId) {
					this.hhdzData.selfMoney = battleInfo.totalMoney
					this.myGoldenLab.text = CommonUtil.fixMoneyFormat(battleInfo.totalMoney);
				}
			}

			for(let stakeInfo of data.totalStake) {
				this.hhdzData.recordTypeBetInfo(stakeInfo.type, stakeInfo.value);
				this.betInfoGroup.updateTotalTypeBet(stakeInfo.type, stakeInfo.value);
			}
			this.curGameRound = data.serialNumber;
			egret.log("收到序号:" + data.serialNumber)
			//停止动画
			this.winFailTween.stop();
			HhdzData.bankerUpMoneyLimit = data.upBankerMinMoney / 1000;
			this.hhdzData.setBankerData(data.bankerInfos)
			this.updateBankerState();
			this.currStatus = data.status;
			if(data.status == 3) {
				this.currStatus = HhdzStatus.stopBet
			}
			this.updateRoomStatus(data.status, data.downTime);

			if(this.currStatus == HhdzStatus.stopBet) {
				if(!this.hhdzData.isSelfBet) {
					this.waitAnim.visible = true;
					this.waitAnim.playerOnce();
				}
				this.finishTaskExec = HhdzHelper.genFinishTask(data, this);
				this.finishTaskExec.execute(15 - data.downTime);
				this.refreshBtnState();
			}
		}

		//更新历史记录
		public updateLogHistory(type: number, cardType: number, isDelayShow:boolean = false) {
			if (this.historyInfoGroup.numChildren >= 15) {
				this.historyInfoGroup.removeChildAt(0);
			}
			var winFail1: eui.Image = new eui.Image("hhdz_history_type_" + type);
			this.historyInfoGroup.addChild(winFail1);

			if (this.historyCardTypeGroud.numChildren >= 7) {
				this.historyCardTypeGroud.removeChildAt(0);
			}
			var winFail2: eui.Image = new eui.Image("hhdz_history_cardtype_" + cardType);
			this.historyCardTypeGroud.addChild(winFail2);

			if(isDelayShow) {
				if(this.historyInfoGroup.numChildren > 0) {
					let icon = this.historyInfoGroup.getChildAt(this.historyInfoGroup.numChildren - 1);
					icon.alpha = 0;
				}
			}
		}

		private onFapaiTweenItemComplete(e:egret.Event) {
			if(this.fapaiAnim.items.indexOf(e.currentTarget) < this.fapaiAnim.items.length - 1) {
				SoundMenager.instance.playEffect("hhdz-fapai_mp3");
			}
		}

		//房间状态更新
		private updateRoomStatus(status: number, downTime: number): void {
			this.roomStatus = status;
			this.continueBtn.enabled = false;
			//状态
			if (status == HhdzStatus.startBet) {
				var roomData: RoomData = RoomManager.getInstance().curRoomData;
				var playerInfo: PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
				var myMoney: number = playerInfo.money;
				var cacheTotalMoney: number = 0;
				var blankPlayerInfo: PlayerInfo = roomData.getPlayerInfoByPos(0);
				for (let data of this.cacheBet) {
					cacheTotalMoney += data.money;
				}
				if (myMoney >= cacheTotalMoney && cacheTotalMoney != 0 && playerInfo.playerId != blankPlayerInfo.playerId) {
					this.continueBtn.enabled = true;
				} else {
					this.continueBtn.enabled = false;
				}
				//等待
				this.waitAnim.visible = false;
				this.waitAnim.stop();
				this.resetCardShow();
				this.fapaiAnim.stop();
				this.roomStatusImg.source = "hhzd_status_touzhuzhong";
				if (downTime > 15) {
					this.pkAnim.visible = true;
					this.cardInfoGruop.visible = false;
					HhdzSoundPlayer.instance.playBattle();
					this.pkAnim.playerOnce(() => {
						this.pkAnim.visible = false;
						this.startStakeAnim.visible = true;
						HhdzSoundPlayer.instance.playStartBet();
						this.startStakeAnim.playerOnce(() => {
							this.startStakeAnim.visible = false;
						}, this);
						this.cardInfoGruop.visible = true;
						SoundMenager.instance.playEffect("hhdz-fapai_mp3");
						this.fapaiAnim.play(0);
					}, this);
				} else {
					this.cardInfoGruop.visible = true;
				}
				if(this.lastChooseBet >= 0) {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				} else {
					this.selectedBetButtonByIndex(0);
				}
				this.refreshBtnState();
				this.resetResultAnim();
			} else if (status == HhdzStatus.prepared) {
				this.cardInfoGruop.visible = false;
				this.roomStatusImg.source = "hhdz_status_xiuxizong";
				this.updateBankerState();
				this.refreshBtnState();
				this.waitAnim.visible = false;
				this.resetResultAnim();
			} else if (status == HhdzStatus.stopBet) {
				this.roomStatusImg.source = "hhdz_status_kaijiangzhong";
				this.stopStakeAnim.visible = true;
				HhdzSoundPlayer.instance.playStopBet();
				this.stopStakeAnim.playerOnce(() => {
					this.stopStakeAnim.visible = false;
				}, this);
				this.refreshBtnState();
				this.waitAnim.visible = false;
			} else {
				this.roomStatusImg.source = "hhdz_status_kaijiangzhong";
			}
			//倒计时
			this.downTime = downTime * 1000 + egret.getTimer();
			this.startDownTime();
		}

		//倒计时
		private downTime: number = 0;
		private roomStatus: number = -1;
		public startDownTime(): void {
			egret.stopTick(this.updateDownTime, this);
			egret.startTick(this.updateDownTime, this);
		}

		private currentDownTime: number = 0;
		private updateDownTime(timestamp: number): boolean {
			let leftTime: number = this.downTime - timestamp;
			if (leftTime <= 0) {
				leftTime = 0;
				egret.stopTick(this.updateDownTime, this);
			}
			var time: number = Math.round(leftTime / 1000);
			this.downTimeLab.text = time.toString();
			if (this.roomStatus == 1 && this.currentDownTime != time) {
				this.currentDownTime = time;
				if (this.currentDownTime == 3) {
					HhdzSoundPlayer.instance.playDownTime();
					this.downTimeAnim.playerOnce(() => {
						this.downTimeAnim.visible = false;
					}, this);
					this.downTimeAnim.visible = true;
				} else if (this.currentDownTime == 2) {
					HhdzSoundPlayer.instance.playDownTime();
				} else if (this.currentDownTime == 1) {
					HhdzSoundPlayer.instance.playDownTime();
				}
			}
			return true;
		}

		protected onOpen() {
			this.isDownOper = false;
			this.initScene();
			this.changeBankerImg.visible = false;
			let roomData = RoomManager.getInstance().curRoomData;
			if(roomData.gameLevel == 1) {
				this.curBetValueArr = this.level1BetNums;
			} else if(roomData.gameLevel == 2) {
				this.curBetValueArr = this.level2BetNums;
			} else if(roomData.gameLevel == 3) {
				this.curBetValueArr = this.level3BetNums;
			}
			let level = roomData.gameLevel;
			if(level != this.lastOpenLevel) {
				this.lastChooseBet = 0;
			} 
			this.lastOpenLevel = level;
			for(let i=0;i < this.curBetValueArr.length; i++) {
				this.betBtnArr[i].updateBetImg(roomData.gameLevel, this.curBetValueArr[i]);
			}
			this.resetBetInfo();
			this.onlineCountLabel.text = "(" + roomData.onlineCount.toFixed(0) + ")";
			this.menuGroup.showDefault();
		}

		//界面初始化
		public initScene() {
			this.isStart = true;
			if (this.isInit) {
				this.init();
			}
			this.cacheBet = [];
		}
		public init() {
			var roomData: RoomData = RoomManager.getInstance().curRoomData;

			//自己的信息
			var playerInfo: PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.nickNameLab.text = playerInfo.nickName;
			this.updateHeadMoney(UserService.instance.playerId);
			this.myVipLab.source = "hhdz_V" + playerInfo.vipLevel;

			//庄家信息
			var blankPlayerInfo: PlayerInfo = roomData.getPlayerInfoByPos(0);
			this.bankerNameLab.text = blankPlayerInfo.nickName;
			this.updateHeadMoney(blankPlayerInfo.playerId);
			this.bankerVipLab.source = "hhdz_V" + blankPlayerInfo.vipLevel;
		}

		public showHeadInfo(): void {
			var roomData: RoomData = RoomManager.getInstance().curRoomData;
			this.onlineCountLabel.text = "(" + roomData.onlineCount.toFixed(0) + ")";
			for (var i: number = 0; i < this.headInfoGruop.numChildren; i++) {
				var obj = this.headInfoGruop.getChildAt(i);
				var postion: number = Number(obj.name);
				var playerInfo: PlayerInfo = roomData.getPlayerInfoByPos(postion);
				if (obj instanceof hhdz.HhdzHeadMaxIcon) {
					var headMaxInfo: hhdz.HhdzHeadMaxIcon = obj as hhdz.HhdzHeadMaxIcon;
					headMaxInfo.hide();
					if (playerInfo != null) {
						headMaxInfo.showByPlayer(playerInfo);
					} else {
						headMaxInfo.playerInfo = null;
					}
				}
				if (obj instanceof hhdz.HhdzHeadMinIcon) {
					var headMinInfo: hhdz.HhdzHeadMinIcon = obj as hhdz.HhdzHeadMinIcon;
					headMinInfo.hide();
					if (playerInfo != null) {
						headMinInfo.showByPlayer(playerInfo);
					} else {
						headMaxInfo.playerInfo = null;
					}
				}
			}
		}

		//更新用户金币
		public updateHeadMoney(playerId: number): void {
			var roomData: RoomData = RoomManager.getInstance().curRoomData;
			if (roomData == null) {
				return;
			}
			var playerInfo: PlayerInfo = roomData.getPlayerInfo(playerId);
			if (playerInfo == null) {
				return;
			}
			var postion: number = playerInfo.postion;
			if (postion == 0) {
				this.bankerMoneyLab.text = CommonUtil.fixMoneyFormat(playerInfo.money);
				// 顺便更新一下庄家的名字
				this.bankerNameLab.text = playerInfo.nickName;
				if(playerId == UserService.instance.playerId) {
					this.myGoldenLab.text = this.myGoldenLab.text = CommonUtil.fixMoneyFormat(playerInfo.money);
				}
			} else if (postion == 1) {
				this.myGoldenLab.text = CommonUtil.fixMoneyFormat(playerInfo.money);
			} else if (postion == 2) {
				this.hhdzHead2.updateMoney(playerInfo.money);
			} else if (postion == 3) {
				this.hhdzHead3.updateMoney(playerInfo.money);
			}
		}

		private resetResultAnim() {
			this.redAnim.playerTimes(null, null, 100, "animation");
			this.blackAnim.playerTimes(null, null, 100, "animation");
		}

		public updateBattleStatus(data: any): void {
			this.currStatus = data.status;
			egret.log("status update ======================= " + data.status);
			if(this.currStatus == HhdzStatus.startBet) {
				this.resetBetInfo();
			}
			this.updateRoomStatus(data.status, data.downTime);
			if(this.currStatus == HhdzStatus.startBet) {
				if(this.cacheBet.length > 0) {
					this.prevCache = this.cacheBet;
				}
				this.cacheBet = [];
				this.resetBetCache();
				this.betContainer.removeChildren();
				this.continueBtn["hasClick"] = false;
				let ori = this.hhdzData;
				this.hhdzData = new HhdzData();
				this.curGameRound = data.serialNumber;
				if(ori) {
					this.hhdzData.bankerList = ori.bankerList;
				}
				this.hhdzData.gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
				this.refreshBtnState();
				HhdzHelper.clearAnims(this)
				egret.log("开始    收到序号:" + data.serialNumber)
			} else if(this.currStatus == HhdzStatus.prepared) {
				this.resetBetInfo();
				HhdzHelper.clearAnims(this)
			} else {
				
			}
			if (data.isSwitchBanker) {
				let roomData = game.RoomManager.getInstance().curRoomData;
				this.updateHeadMoney(roomData.getPlayerInfoByPos(0).playerId);
				this.playChangeZhuang();
			}
		}

		public ResumScene() {
		}

		//接收下注
		public onStakeRet(data: any): void {
			let stakePlayerId: number = data.playerId;
			let type: number = data.type;
			let money: number = data.value;
			let playerId: number = UserService.instance.playerId;
			if (stakePlayerId != playerId) {
				if (type == HhdzType.black) {
					this.blackTotalMoney += money;
				} else if (type == HhdzType.red) {
					this.redTotalMoney += money;
				} else if (type == HhdzType.lucky) {
					this.luckyTotalMoney += money;
				}
				HhdzSoundPlayer.instance.playBetAction();
				this.updateHeadMoney(stakePlayerId);
				let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(stakePlayerId);
				if (playerInfo != null && playerInfo.playerId != UserService.instance.playerId) {
					playerInfo.money = playerInfo.money - money;
				}
				let isDushen:boolean =  false;
				if(playerInfo && playerInfo.postion == 2) {
					// 是赌神
					this.hhdzData.recordDushenTypeBet(data.type, data.value);
					let v = this.hhdzData.getRecordDushenTypeBet(data.type);
					egret.log("赌神金额：" + v);
					let targetBetInfoUI = this.xianzhiArr[data.type - 1];
					if(!targetBetInfoUI.hasFlagDuShen && v > GameCfg.getNumberValue("hhdzDushenCondition_" + RoomManager.getInstance().curRoomData.gameLevel)) {
						isDushen = true;
						this.setTimeOut(()=>{
							this.shensuanziParticle(targetBetInfoUI);
						}, 500);
					}
				} 
				this.playerFlyToArea(stakePlayerId, type, money, isDushen);
			} else {
				this.myBetsMoney(money, type);
				this.refreshBtnState();
			}
			this.hhdzData.recordTypeBetInfo(data.type, data.value);
			this.hhdzData.recordPlayerTypeBet(data.playerId, data.type, data.value);
			this.betInfoGroup.updateTotalTypeBet(data.type, data.totalValue);
		}
		
		public playBlackWinParticle() {
			let startPoint = new egret.Point(this.blackStartPoint.x, this.blackStartPoint.y);
			let endPoint = new egret.Point(this.endPoint.x, this.endPoint.y);
			let cfg = RES.getRes("hhdz_black_particle_json");
			let chargeParticle = CommonUtil.generateDirectionParticle(
				RES.getRes("hhdz_black_particle_png"), 
				cfg,
				startPoint,endPoint, 300,
				()=>{
					this.showResult();
				}, this);
			chargeParticle.start();
			this.contentGroup.addChild(chargeParticle);
		}

		public playRedWinParticle() {
			let startPoint = new egret.Point(this.redStartPoint.x, this.redStartPoint.y);
			let endPoint = new egret.Point(this.endPoint.x, this.endPoint.y);
			let cfg = RES.getRes("hhdz_red_particle_json");
			let chargeParticle = CommonUtil.generateDirectionParticle(
				RES.getRes("hhdz_red_particle_png"), 
				cfg,
				startPoint,endPoint, 600,
				()=>{
					this.showResult();
				}, this);
			chargeParticle.start();
			this.contentGroup.addChild(chargeParticle);
			chargeParticle.blendMode = egret.BlendMode.ADD;
		}

		private showResult() {
			if(this.historyInfoGroup.numChildren > 0) {
				let coin = this.historyInfoGroup.getChildAt(this.historyInfoGroup.numChildren - 1);
				egret.Tween.get(coin).to({alpha:1}, 500);
			}
			this.endBoomAnim.visible = true;
			this.endBoomAnim.playerOnce(()=>{
				this.endBoomAnim.visible = false;
			}, this, "animation");

			this.hhdzData.recordResultPanelOpen();
		}

		public shensuanziParticle(targetBetInfoUI:HhdzXianzhiFlag) {
			if(targetBetInfoUI.hasFlagDuShen) return;
			targetBetInfoUI.hasFlagDuShen = true;
			let startPoint = this.hhdzHead2.getShensuzniStartPoint();
			if(startPoint) {
				let endPoint = targetBetInfoUI.getShensuanziPos();
				if(endPoint) {
					let cfg = RES.getRes("hhdz_dushen_particle_json");
					let chargeParticle = CommonUtil.generateDirectionParticle(
						RES.getRes("hhdz_dushen_particle_png"), 
						cfg,
						startPoint,endPoint, 700,
						()=>{
							targetBetInfoUI.showShensuanziAnim();
						}, this, 20);
					chargeParticle.start();
					this.addChild(chargeParticle);
					// 同时需要飞小鸟
					let bird = new HHBird();
					this.addChild(bird);
					bird.startFromTo(startPoint, endPoint, 700);
				}
			}
		}

		//显示自己下的注
		private myBetsMoney(money: number, type: number) {
			if (type == HhdzType.black) {
				this.myBlackTotalMoney += money;
				this.blackTotalMoney += money;
			} else if (type == HhdzType.red) {
				this.myRedTotalMoney += money;
				this.redTotalMoney += money;
			} else if (type == HhdzType.lucky) {
				this.myLuckyTotalMoney += money;
				this.luckyTotalMoney += money;
			}
			this.updateHeadMoney(UserService.instance.playerId);
		}

		private getHeadIconByPlayerId(playerId:number):HhdzHeadIcon{
			for(let headIcon of this.hhdzHeads) {
				if(headIcon.playerInfo && headIcon.playerInfo.playerId == playerId) {
					return headIcon
				}
			}
			return null;
		}

		private getBetButtonByValue(value:number):HhdzBetButton {
			for(let betBtn of this.betBtnArr) {
				if(betBtn.betMoney == value) {
					return betBtn;
				}
			}
			return null;
		}

		private genFlyCoin(value:number):HhdzFlyCoin {
			let roomData = RoomManager.getInstance().curRoomData;
			let flyCoin = new HhdzFlyCoin("hhdz_bet_min_" + roomData.gameLevel + "_" + value);
			flyCoin.touchEnabled = false;
			flyCoin.rotation = this.random(0, 180);
			flyCoin.name = value.toString();
			flyCoin.value = value;
			return flyCoin;
		}

		private playerFlyToArea(stakePlayerId: number, stakeType: number, money:number, isDushen:boolean = false) {
			let from:egret.DisplayObject = this.playerListBtn;
			let fromPos:egret.Point = from.localToGlobal(this.playerListBtn.width  / 2,this.playerListBtn.height  / 2);
			if(stakePlayerId == UserService.instance.playerId) {
				// 如果是自己从筹码处飞出去
				from = this.getBetButtonByValue(money);
				fromPos = from.localToGlobal(from.width / 2, from.height / 2);
			} else {
				let headIcon = this.getHeadIconByPlayerId(stakePlayerId);
				if(headIcon && headIcon.visible) {
					from = headIcon;
					fromPos = headIcon.getHeadPos();
				}
			}
			let to:PolyStakeArea = this.polyStakeAreaArr[stakeType - 1];
			let betBtn = this.genFlyCoin(money);
			betBtn.type = stakeType;
			this.betContainer.addChild(betBtn);
			fromPos = betBtn.parent.globalToLocal(fromPos.x , fromPos.y);
			betBtn.x = fromPos.x;
			betBtn.y = fromPos.y;
			let p = to.randomPoint();
			if(from instanceof HhdzHeadIcon) {
				(<HhdzHeadIcon>from).stakePosEffect();
			} 
			this.flyBetBtnToTarget(betBtn , p.x , p.y, isDushen);
			
			return betBtn;
		}

		private getSimulateArrByValue(value:number):Array<number> {
			let result = [];
			for(let v of this.curBetValueArr) {
				if(value / v >= 5) result.push(v);
			}
			if(result.length == 0) {
				result.push(this.curBetValueArr[0]);
			}
			return result;
		}

		public checkBankerToStakeArea(typeArr:Array<number>, winCardType:number):HhdzPlayerFlyInfo{
			let playerFlyInfo = new HhdzPlayerFlyInfo();
			let multiArr:Array<number> = [];
			for(let type of typeArr) {
				if(type == HhdzType.lucky) {
					multiArr.push(GameConst.getHhdzMulti(winCardType));
				} else {
					multiArr.push(1);
				}
			}
			playerFlyInfo.initFromHhdzData(this.hhdzData, typeArr, multiArr);
			let costTime:number = 0;
			for(let type of typeArr) {
				let targetArea = this.polyStakeAreaArr[type - 1];
				let value = this.hhdzData.getRecordTypeBet(type);
				if(type == HhdzType.lucky) {
					value = value * GameConst.getHhdzMulti(winCardType);
				}
				let count = 0;
				let simulateArr = this.getSimulateArrByValue(value);
				for(let m = simulateArr.length - 1; m >= 0 ; m--){
					let betNum = Math.floor(value / this.curBetValueArr[m]);
					if(betNum > 0){
						for(let b = 0 ; b < betNum ; b++){
							let betBtn = this.genFlyCoin(simulateArr[m]);
							// let allocPlayerId = playerFlyInfo.alloc(type, simulateArr[m]);
							betBtn.allocPlayerId = 0;//allocPlayerId;
							// 其实这个时候就可以给玩家绑定需要飞的金币了
							this.betContainer.addChild(betBtn);
							let p = this.bankerGroup.localToGlobal(this.bankerGroup.width / 2, this.bankerGroup.height / 2)
							p = this.betContainer.globalToLocal(p.x, p.y);
							betBtn.x = p.x;
							betBtn.y = p.y;
							let point = targetArea.randomPoint();
							count++;
							this.flyBetFromBankerToArea(betBtn, point, 400 + count * 10);
							this.betCache[type - 1].push(betBtn);
						}
					}
					value -= simulateArr[m] * betNum;
				}
				let time = 300 + count * 10;
				if(time > costTime) {
					costTime = time;
				}
			}
			return playerFlyInfo;
		}

		public checkBetToPlayer(playerFlyInfo:HhdzPlayerFlyInfo):number{
			let specialPlayerRecord = new HashMap();
			function getPlayerRecord(playerId) {
				let k = "p_" + playerId;
				let result = 0;
				if(specialPlayerRecord.contains(k)) {
					result = specialPlayerRecord.get(k)
				}
				addPlayerRecord(playerId)
				return result;
			}

			function addPlayerRecord(playerId) {
				let k = "p_" + playerId;
				if(specialPlayerRecord.contains(k)) {
					specialPlayerRecord.put(k, specialPlayerRecord.get(k) + 1)
				} else {
					specialPlayerRecord.put(k, 1);
				}
			}

			for(let list of this.betCache) {
				let idx = 0;
				let space = list.length > 30 ? 5: 10;
				for(let coins of list) {
					let headIcon:egret.DisplayObject;
					if(coins.allocPlayerId > 0) {
						let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(coins.allocPlayerId);
						if(playerInfo.postion == 0) {
							// 是庄家
							headIcon = this.bankerGroup;
						} else if(playerInfo.postion == 1) {
							headIcon = this.myInfoGruop;
						} else {
							headIcon = this.getHeadIconByPlayerId(coins.allocPlayerId);
							if(!headIcon.visible) headIcon = null;
						}
						egret.log("飞向：coins.allocPlayerId " + coins.allocPlayerId +"  " + headIcon + " " + playerInfo.postion);
						idx = getPlayerRecord(coins.allocPlayerId)
					}
					if(!headIcon) {
						// 飞向其他玩家按钮
						headIcon = this.playerListBtn;
						egret.log("飞向：playerListBtn");
						idx = getPlayerRecord(-1)
					} 
					this.flyBetBtnByPlayerFocus(coins, headIcon, Math.min(550 + idx * space, 1000), true);
				}
			}
			// 处理完加个处理
			let playerGenCoins = playerFlyInfo.getLeftPlayers();
			for(let info of playerGenCoins) {
				for(let i=1;i<=3;i++) {
					let v = info.getTypeMoney(i);
					let headIcon:egret.DisplayObject;
					let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(info.playerId);
					if(playerInfo.postion == 0) {
						// 是庄家
						headIcon = this.bankerGroup;
					} else if(playerInfo.postion == 1) {
						headIcon = this.myInfoGruop;
						egret.log("飞向自己============== " + v);
					} else {
						headIcon = this.getHeadIconByPlayerId(info.playerId);
					}
					if(v > 0 && headIcon && headIcon.visible) {
						let simulateArr = this.getSimulateArrByValue(v);
						for(let m = simulateArr.length - 1; m >= 0 ; m--){
							let betNum = Math.floor(v / this.curBetValueArr[m]);
							if(betNum > 0){
								for(let b = 0 ; b < betNum ; b++){
									let betBtn = this.genFlyCoin(simulateArr[m]);
									// 其实这个时候就可以给玩家绑定需要飞的金币了
									this.betContainer.addChildAt(betBtn, 0);
									let p = this.polyStakeAreaArr[i - 1].randomPoint();
									p = this.betContainer.globalToLocal(p.x, p.y);
									betBtn.x = p.x;
									betBtn.y = p.y;
									let idx = getPlayerRecord(info.playerId);
									this.flyBetBtnByPlayerFocus(betBtn, headIcon, Math.min(550 + idx * 5, 1000), true);
								}
							}
							v -= simulateArr[m] * betNum;
						}
					}
				}
			}
			return 0;
		}

		private flyBetBtnByPlayerFocus(betBtn , headIcon:HhdzHeadIcon | egret.DisplayObject, time, isSound:boolean = false){
			if(!headIcon) return;
			let point = headIcon.localToGlobal(0,0);
			if(headIcon instanceof HhdzHeadIcon) {
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
					if(isSound) HhdzSoundPlayer.instance.playBetAction();
				},this ) ;
			}
		}

		private flyBetFromBankerToArea(betBtn:HhdzFlyCoin, p:egret.Point, time:number) {
			let headPos = this.bankerGroup.localToGlobal(this.bankerGroup.width / 2, this.bankerGroup.height / 2)
			headPos = betBtn.parent.globalToLocal(headPos.x, headPos.y);
			betBtn.x = headPos.x;betBtn.y = headPos.y;
			egret.Tween.get(betBtn).to({x:p.x, y:p.y}, time, egret.Ease.quartOut).call(()=>{
				HhdzSoundPlayer.instance.playBetAction();
			}, this);
			
		}

		private resetBetCache(){
			this.betCache = [[],[],[]];
		}

		private flyBetBtnToTarget(betBtn:HhdzFlyCoin, targetX, targetY, isDushen:boolean = false){
			this.betCache[betBtn.type - 1].push(betBtn);
			if(isDushen) {
				this.setTimeOut(()=>{
					egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 2000, egret.Ease.quartOut).call(()=>{
						if(betBtn.stage) HhdzSoundPlayer.instance.playBetAction();
					},this ) ;
				}, 50);
			} else {
				egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 1000, egret.Ease.quartOut).call(()=>{
					if(betBtn.stage) HhdzSoundPlayer.instance.playBetAction();
				},this ) ;
			}
		}

		private flyBetToBanker(betBtn:HhdzFlyCoin, time:number) {
			if(!betBtn.parent) return;
			let p = this.bankerGroup.localToGlobal(this.bankerGroup.width / 2, this.bankerGroup.height / 2);
			p = betBtn.parent.globalToLocal(p.x, p.y);
			egret.Tween.get(betBtn).to({x:p.x, y:p.y}, time, egret.Ease.backIn).call(()=>{
				if(betBtn.parent) betBtn.parent.removeChild(betBtn);
				HhdzSoundPlayer.instance.playBetAction();
			}, this)
		}

		//金币飞--飞到庄家头上
		public flyGoldenToBanker(stakeType: number) {
			if(!this.betCache) return;
			let list = this.betCache[stakeType - 1];
			let space = list.length > 30 ? 5 : 10;
			let index = 0;
			for(let flyCoin of list) {
				let t = 500 + space * index;
				t = Math.min(1000, t);
				this.flyBetToBanker(flyCoin, t);
				index++;
			}	
			this.betCache[stakeType - 1] = [];
		}

		public clearGolden(stakeType:number) {
			let list = this.betCache[stakeType - 1];
			for(let coin of list) {
				if(coin.parent) coin.parent.removeChild(coin);
			}
			this.betCache[stakeType - 1] = [];
		}

		//走势图
		private onTrendButton(event: egret.TouchEvent) {
			AppFacade.instance.sendNotification(PanelNotify.OPEN_HHDZ_HISTORY_UI);
		}

		private onOpenBank() {
			AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.HHDZ);
		}
 
		private random(lower, upper): number {
			return Math.floor(Math.random() * (upper - lower + 1)) + lower;
		}

		public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
			var roomData: RoomData = RoomManager.getInstance().curRoomData;
			var playerInfo: PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			playerInfo.money = playerInfo.money + drawmoney;
			this.myGoldenLab.text = CommonUtil.fixMoneyFormat(playerInfo.money);
			this.hhdzData.addMoney(drawmoney);
			this.refreshBtnState();
		}

		//排行
		private onPlayerListBtn(event: egret.TouchEvent) {
			HhdzRequest.requestPlayerBank(1);
		}

		private playChangeZhuang() {
			this.changeBankerImg.visible = true;
			this.changeBankerImg.alpha = 1;
			this.setTimeOut(()=>{
				egret.Tween.get(this.changeBankerImg).to({alpha : 0},1000).call(()=>{
						this.changeBankerImg.visible = false;
					},this);
			},1000);
			SoundMenager.instance.playVoice("zhuang-change_mp3");
		}

		public clearBattle() {
			this.clearAllTimeOut();
			for(let card of this.cardArr) {
				card.clearAllCardTween();
				card.showDefault();
			}
			this.redTypeAnim.clearAllListener();
			this.blackTypeAnim.clearAllListener();
			this.redWinAnim.clearAllListener();
			this.blackWinAnim.clearAllListener();
			// this.betContainer.removeChildren();
			this.resetBetInfo();
		}

		public checkFinishTask() {
			if(this.finishTaskExec) {
				this.finishTaskExec.stop();
			}
		}

		private sendCacheBet() {
			this.continueBtn["hasClick"] = true;
			let total = 0;
			for(let data of this.prevCache) {
				total += this.getBetButtonValue(data.betButton);
			}
			if(this.getSelfMoney() < total) {
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

		private startStakeTrue(buttonType, betButton:HhdzBetButton, iscahce:boolean = true) {
			if(buttonType  == 0) return;
			var buttonValue =  this.getBetButtonValue(betButton);
			if(this.getSelfMoney() < buttonValue)
			{
				TipsUtils.showTipsFromCenter("当前金币不足");
				return;
			}
			this.hhdzData.isSelfBet = true;
			//直接飞筹码
			this.costSelfMoenyDirect(buttonValue);
			this.updateHeadMoney(UserService.instance.playerId);
			this.playerFlyToArea(UserService.instance.playerId, buttonType, buttonValue);
			this.refreshBtnState();
			this.betInfoGroup.updateAddSelfTypeBet(buttonType, buttonValue);
			HhdzRequest.SendBets(buttonType , buttonValue);
			if(iscahce) this.cacheBet.push({buttonType:buttonType, betButton:betButton});
		}

		protected onLeave() {
			this.prevCache = [];
			super.onLeave();
			for(let headIcon of this.hhdzHeads) {
				headIcon.clearPlayerInfo();
			}
			this.clearBattle();
			this.resetBetCache();
			this.clearCoins();
			this.checkFinishTask();
		}

		public clearCoins() {
			for(let i=0;i<this.betContainer.numChildren;i++) {
				let coins = this.betContainer.getChildAt(i);
				egret.Tween.removeTweens(coins);
			}
			this.betContainer.removeChildren();
		}

		public onBackhall() {
			if(this.hhdzData && this.hhdzData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if(this.hhdzData && this.hhdzData.isSelfBet) {
				if(this.currStatus == HhdzStatus.prepared || (this.currStatus == HhdzStatus.stopBet && this.hhdzData.checkAllowExit(this.curGameRound))) {
					RoomRequest.leaveRoom(game.ChildGameType.HHDZ);
				} else {
					BattleLeaveTips.showTips({
						"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间?",
						"callback": (data: any) => {
							RoomRequest.leaveRoom(game.ChildGameType.HHDZ);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
					return;
				}
			} else {
				RoomRequest.leaveRoom(game.ChildGameType.HHDZ);
			}
		}
	}
}