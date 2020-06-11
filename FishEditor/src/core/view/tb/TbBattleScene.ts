module game.tb {
	enum TbStatus{
		prepared = 0,
		startBet = 1,
		stopBet = 2
	}
	export class TbBattleScene extends GameScene{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbBattleSceneSkin.exml';
			this.gameType = ChildGameType.DiceBao;
		}
        
		public resultPanel : TbResultPanel;

		public backBtn : IButton;
		// public bottomBetLabel : eui.Label;
		public playerListBtn : IButton;
		public helpBtn : IButton;
		private settingAudioBtn:eui.Button;
		private bankBtn:eui.Button;
		public historyBtn : IButton;
		public settingBtn : IButton;
		public continueBtn : IButton;
		public applyBanker : IButton;
		public downBanker : IButton;
		public trendBtn : IButton;
		public TbCountDown :TbCountDownUI;
		public betGroup : eui.Group;
		public betButton1 : TbBetButton;
		public betButton10 : TbBetButton;
		public betButton50 : TbBetButton;
		public betButton100 : TbBetButton;
		public betButton500 : TbBetButton;
		public betButton1000 : TbBetButton;
		public selfHead : TbHeadIcon;
		public bankerHead:TbHeadIcon;
		public headIcon1 : TbHeadIcon;
		public headIcon2 : TbHeadIcon;
		public headIcon3 : TbHeadIcon;
		public headIcon4 : TbHeadIcon;
		public headIcon5 : TbHeadIcon;
		public headIcon6 : TbHeadIcon;
		public typeBetInfo1 : TbTypeBetInfoUI;
		public typeBetInfo2 : TbTypeBetInfoUI;
		public typeBetInfo3 : TbTypeBetInfoUI;
		public typeBetInfo4 : TbTypeBetInfoUI;
		public typeBetInfo5 : TbTypeBetInfoUI;
		public typeBetInfo6 : TbTypeBetInfoUI;
		public typeBetInfo7 : TbTypeBetInfoUI;
		public typeBetInfo8 : TbTypeBetInfoUI;
		public typeBetInfo9 : TbTypeBetInfoUI;
		public typeBetInfo10 : TbTypeBetInfoUI;
		public typeBetInfo11 : TbTypeBetInfoUI;
		public typeBetInfo12 : TbTypeBetInfoUI;
		public typeBetInfo13 : TbTypeBetInfoUI;
		public typeBetInfo14 : TbTypeBetInfoUI;
		public typeBetInfo15 : TbTypeBetInfoUI;
		public typeBetInfo16 : TbTypeBetInfoUI;
		public typeBetInfo17 : TbTypeBetInfoUI;
		public typeBetInfo21 : TbTypeBetInfoUI;
		public typeBetInfo22 : TbTypeBetInfoUI;
		public typeBetInfo23 : TbTypeBetInfoUI;
		public typeBetInfo24 : TbTypeBetInfoUI;
		public typeBetInfo25 : TbTypeBetInfoUI;
		public typeBetInfo26 : TbTypeBetInfoUI;
		public typeBetInfo27 : TbTypeBetInfoUI;
		public typeBetInfo28 : TbTypeBetInfoUI;
		public typeBetInfo31 : TbTypeBetInfoUI;
		public typeBetInfo32 : TbTypeBetInfoUI;
		public typeBetInfo33 : TbTypeBetInfoUI;
		public typeBetInfo34 : TbTypeBetInfoUI;
		public typeBetInfo35 : TbTypeBetInfoUI;
		public typeBetInfo36 : TbTypeBetInfoUI;
		public typeBetInfo41 : TbTypeBetInfoUI;
		public typeBetInfo42 : TbTypeBetInfoUI;
		public typeBetInfo43 : TbTypeBetInfoUI;
		public typeBetInfo44 : TbTypeBetInfoUI;
		public typeBetInfo45 : TbTypeBetInfoUI;
		public typeBetInfo46 : TbTypeBetInfoUI;
		public typeBetInfo47 : TbTypeBetInfoUI;
		public typeBetInfo48 : TbTypeBetInfoUI;
		public typeBetInfo49 : TbTypeBetInfoUI;
		public typeBetInfo50 : TbTypeBetInfoUI;
		public typeBetInfo51 : TbTypeBetInfoUI;
		public typeBetInfo52 : TbTypeBetInfoUI;
		public typeBetInfo53 : TbTypeBetInfoUI;
		public typeBetInfo54 : TbTypeBetInfoUI;
		public typeBetInfo55 : TbTypeBetInfoUI;
		public typeBetInfo61 : TbTypeBetInfoUI;
		public typeBetInfo62 : TbTypeBetInfoUI;
		public typeBetInfo63 : TbTypeBetInfoUI;
		public typeBetInfo64 : TbTypeBetInfoUI;
		public typeBetInfo65 : TbTypeBetInfoUI;
		public typeBetInfo66 : TbTypeBetInfoUI;
		public areaGroup1 : eui.Group;
		public areaGroup2 : eui.Group;
		public areaGroup3 : eui.Group;
		public areaGroup4 : eui.Group;
		public areaGroup5 : eui.Group;
		public areaGroup6 : eui.Group;
		public areaGroup7 : eui.Group;
		public areaGroup8 : eui.Group;
		public areaGroup9 : eui.Group;
		public areaGroup10 : eui.Group;
		public areaGroup11 : eui.Group;
		public areaGroup12 : eui.Group;
		public areaGroup13 : eui.Group;
		public areaGroup14 : eui.Group;
		public areaGroup15 : eui.Group;
		public areaGroup16 : eui.Group;
		public areaGroup17 : eui.Group;
		public areaGroup21 : eui.Group;
		public areaGroup22 : eui.Group;
		public areaGroup23 : eui.Group;
		public areaGroup24 : eui.Group;
		public areaGroup25 : eui.Group;
		public areaGroup26 : eui.Group;
		public areaGroup27 : eui.Group;
		public areaGroup28 : eui.Group;
		public areaGroup31 : eui.Group;
		public areaGroup32 : eui.Group;
		public areaGroup33 : eui.Group;
		public areaGroup34 : eui.Group;
		public areaGroup35 : eui.Group;
		public areaGroup36 : eui.Group;
		public areaGroup41 : eui.Group;
		public areaGroup42 : eui.Group;
		public areaGroup43 : eui.Group;
		public areaGroup44 : eui.Group;
		public areaGroup45 : eui.Group;
		public areaGroup46 : eui.Group;
		public areaGroup47 : eui.Group;
		public areaGroup48 : eui.Group;
		public areaGroup49 : eui.Group;
		public areaGroup50 : eui.Group;
		public areaGroup51 : eui.Group;
		public areaGroup52 : eui.Group;
		public areaGroup53 : eui.Group;
		public areaGroup54 : eui.Group;
		public areaGroup55 : eui.Group;
		public areaGroup61 : eui.Group;
		public areaGroup62 : eui.Group;
		public areaGroup63 : eui.Group;
		public areaGroup64 : eui.Group;
		public areaGroup65 : eui.Group;
		public areaGroup66 : eui.Group;
		private touchAreaGroup:eui.Group;
		public tbHistoryPanel : TbHistoryPanel;
		public tbTrendPanel : TbTrendPanel;
		public tbDiceBao : TbDiceBao;
		public tbCountDown : TbCountDownUI;
		public openCapAnim : TbOpenCapAnim;
		public trendPanel : TbTrendPanel;
		
		public playerNum : eui.Label;
		public applyBankerNumLabel : eui.Label;
		public roomName : eui.BitmapLabel;
		public betInfoGroup : eui.Group;


		//----------数据与结构
		public playerHeads:TbHeadIcon[] = null;
		public touchGroupArr : eui.Group[] = null;
		public betBtnArr : TbBetButton[] = null;
		public betInfoArr : TbTypeBetInfoUI[] = null;
		public currBetButton : TbBetButton = null;
		private tbData : TbData = null;
		private positionMap : Object = null;
		public battleStartCountDown:game.tb.TBBattleStartCountDown;
		private currStatus : TbStatus = TbStatus.startBet;
		private allBets : Object[] = null;
		private tempBetPools : TbBetButton[] = [];
		private tempBetGold : number = 0;
		private isStaked = false;
		public selfLastBets : Object[] = [];
		public selfCurrBets : Object[] = [];
		public isBanker = false;
		private startAnim:DragonAnim;
		private stopAnim:DragonAnim;
		private countdownAnim:DragonAnim;

		private betHash : TbBetButton[][];
		private betHashMap : HashMap;
		public betContainer : eui.Group;
		// public isBanker = false;
		public isInit = false;
		private isStart : boolean = false;

		private level0BetNums : number[] = [10,50,100,200,500,1000];
		private level1BetNums : number[] = [1,5,10,50,100,200];
		private level2BetNums : number[] = [10,50,100,200,500,1000];
		private level3BetNums : number[] = [50,100,200,500,1000,2000];
		private customBetNums : number[];

		public gameType : number;
		public gameLevel : number;

		public touzhiDB : CommonDB;
		private changeZhuangGroup:eui.Group;
		private lastChooseBet:number = -1;
		private lastOpenLevel:number = -1;
		private prevCache:Array<any> = []; 
		private cacheBet:Array<any> = []; 
		private _curGameRound:number = 0;

		public set curGameRound(v:number) {
			this._curGameRound = v;
			if(this.tbData) {
				this.tbData.curGameRound = this._curGameRound;
			}
		}

		public get curGameRound():number{
			return this._curGameRound;
		}
		private stakeAreaArr:Array<game.StakeArea> = [];
		private waitGroup:eui.Group;
		private waitAnim:DragonAnim;
		private finishTask:game.BehaviorTaskExecutor;

		private menuGroup:MenuGroup;
		private menuArrowImg:eui.Image;
        private menuContent:eui.Group;

		public getStakeArea(type:number):game.StakeArea {
			for(let area of this.stakeAreaArr) {
				if(area.flag == type) {
					return area;
				}
			}
			return null;
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
			if(partName.indexOf("areaGroup") >= 0) {
				let area = game.StakeArea.convertFromGroup(instance);
				area.flag = Number(partName.replace("areaGroup", ""));
				this.stakeAreaArr.push(area);
			}
		}

        protected componentInit():void
		{
			this.playerHeads = [this.bankerHead,this.selfHead];//,this.headIcon2,this.headIcon3,this.headIcon4,this.headIcon5,this.headIcon6];
			this.betBtnArr = [this.betButton1 , this.betButton10 ,this.betButton50 , this.betButton100 , this.betButton500,this.betButton1000];
			this.betInfoArr = [this.typeBetInfo1 ,this.typeBetInfo2 ,this.typeBetInfo3 ,this.typeBetInfo4,this.typeBetInfo5 ,this.typeBetInfo6 ,this.typeBetInfo7 ,this.typeBetInfo8,
				this.typeBetInfo9 ,this.typeBetInfo10 ,this.typeBetInfo11 ,this.typeBetInfo12,
				this.typeBetInfo13 ,this.typeBetInfo14 ,this.typeBetInfo15 ,this.typeBetInfo16,this.typeBetInfo17,null,null,null,
				this.typeBetInfo21,this.typeBetInfo22,this.typeBetInfo23,this.typeBetInfo24,this.typeBetInfo25,this.typeBetInfo26,this.typeBetInfo27,this.typeBetInfo28,null,null,
				this.typeBetInfo31,this.typeBetInfo32,this.typeBetInfo33,this.typeBetInfo34,this.typeBetInfo35,this.typeBetInfo36,null , null, null, null,
				this.typeBetInfo41 ,this.typeBetInfo42 ,this.typeBetInfo43 ,this.typeBetInfo44,this.typeBetInfo45 ,this.typeBetInfo46 ,this.typeBetInfo47 ,this.typeBetInfo48,
				this.typeBetInfo49 ,this.typeBetInfo50 ,this.typeBetInfo51 ,this.typeBetInfo52,
				this.typeBetInfo53 ,this.typeBetInfo54 ,this.typeBetInfo55,null,null,null,null,null,this.typeBetInfo61 ,this.typeBetInfo62,
				this.typeBetInfo63 ,this.typeBetInfo64 ,this.typeBetInfo65,this.typeBetInfo66];

			this.touchGroupArr = [this.areaGroup1 , this.areaGroup2 , this.areaGroup3 , this.areaGroup4,
				this.areaGroup5 , this.areaGroup6 , this.areaGroup7 , this.areaGroup8,
				this.areaGroup9 , this.areaGroup10 , this.areaGroup11 , this.areaGroup12,
				this.areaGroup13 , this.areaGroup14 , this.areaGroup15 , this.areaGroup16,this.areaGroup17,
				this.areaGroup21 , this.areaGroup22 , this.areaGroup23 , this.areaGroup24,this.areaGroup25,this.areaGroup26 , this.areaGroup27 , this.areaGroup28
				, this.areaGroup31,this.areaGroup32, this.areaGroup33,this.areaGroup34, this.areaGroup35,this.areaGroup36
				, this.areaGroup41,this.areaGroup42, this.areaGroup43,this.areaGroup44, this.areaGroup45,this.areaGroup46, this.areaGroup47,this.areaGroup48, this.areaGroup49,this.areaGroup50, this.areaGroup51,this.areaGroup52, this.areaGroup53,this.areaGroup54, this.areaGroup55
				,this.areaGroup61, this.areaGroup62,this.areaGroup63,this.areaGroup64, this.areaGroup65,this.areaGroup66];

			this.applyBanker.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onApplyBanker , this);
			this.downBanker.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onDownBanker , this);
			this.playerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRequestPlayerList,this);
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onContinueStake, this);
			this.bankerHead.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBankerHeadClick, this);
			this.battleStartCountDown = new game.tb.TBBattleStartCountDown();
			this.battleStartCountDown.countDownLabel = this.tbCountDown.tbCount;
			this.battleStartCountDown.countdownDragonAnim = this.countdownAnim;
			this.battleStartCountDown.setSound("dice_sound-countdown_mp3");
			this.customBetNums = this.level0BetNums;
			for(var i = 0 ; i < this.betBtnArr.length ; i++)
			{
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.selectedBetButton , this);
				this.betBtnArr[i].index = i + 1;
				this.betBtnArr[i].defaultY = this.betBtnArr[i].y;
			}
			for(var i = 0 ; i < this.touchGroupArr.length ; i++)
			{
				this.touchGroupArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP , this.startStakeTap , this);
			}
			this.isInit = true;
			if(!this.resultPanel["dark"]) {
				let darkSprite = new egret.Sprite();
				darkSprite.graphics.clear();
				darkSprite.graphics.beginFill(0x000000, 0.5);
				darkSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
				darkSprite.graphics.endFill();
				darkSprite.width = GameConfig.curWidth();
				darkSprite.height = GameConfig.curHeight();
				this.resultPanel["dark"] = darkSprite;
				this.resultPanel.addChildAt(darkSprite, 0);
				let p = this.resultPanel.globalToLocal(0,0);
				darkSprite.x = p.x;
				darkSprite.y = p.y;
				darkSprite.touchEnabled = false;
			}
			this.menuGroup = new MenuGroup(this.menuArrowImg, this.menuContent, "game_dice_image_main_btn_menu_1", "game_dice_image_main_btn_menu_2");
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelpBtntap , this);
			this.settingAudioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtntap , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
        }

		protected onOpen() {
			if(!this.isStart)
			{
				this.initScene();
			}
			this.isDownOper = false;
			this.resultPanel.visible = false;
			this.startAnim.visible = false;
			this.stopAnim.visible = false;
			this.hideAllBetInfoText();
			// 先默认显示上庄
			this.applyBanker.visible = true;
			this.downBanker.visible = false;
			this.changeZhuangGroup.visible = false;
			this.countdownAnim.visible = false;
			let level = RoomManager.getInstance().curRoomData.gameLevel;
			if(level != this.lastOpenLevel) {
				this.lastChooseBet = 0;
			} 
			this.lastOpenLevel = level;
			this.menuGroup.showDeault();
		}

		public refreshOnlineCount(count:number) {
			this.playerNum.text = count.toFixed(0);
		}

		private onBankerHeadClick() {
			if(this.bankerHead.posGroup) {
				let p = this.bankerHead.posGroup.localToGlobal(0,0);
				let roomData = RoomManager.getInstance().curRoomData;
				game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, {pos:p, gameType:roomData.gameType});
			}
		}

		public onContinueStake(event)
		{
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
			this.isStart = true;
			if(this.isInit)
			{
				this.init();
			}
		}
		private init(){
			this.tbData=new TbData();
			this.chooseChip();
			this.updateScene();
			TbRequest.requestOPWinFail(0);
			this.isStaked = false;
			this.continueBtn.enabled = false;
			TbSoundPlayer.instance.playBg();
		}
		public updateScene()
		{
			console.log("TbData updateScene>>>>");
			// BrnnRequest.requestPlayerBank(0);
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			this.playerNum.text = roomData.onlineCount.toFixed(0);
			//初始化头像
			for(let i=0;i<roomData.playerInfos.length;i++)
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				let headIcon = this.getHeadIconByPos(playerInfo.postion);
				headIcon.visible = true;
				headIcon.ShowPlayerHead(playerInfo);
			}

			for(let r=0; r<roomData.playerInfos.length; r++)
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[r];
				if(playerInfo.postion == 0)
				{
					this.bankerHead.ShowPlayerHead(playerInfo);
					// this.bankerHead.ShowBanker(true);
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
				if(playerInfo.postion == 1) {
					// 1 是自己
					this.selfHead.ShowPlayerHead(playerInfo);
				}
			}
		}

		private onSettingBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.DiceBao);
		}

		private onHelpBtntap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DiceBao);
		}

		private openBank() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DiceBao);
		}


		private updateApplyBankerNum(length)
		{
			this.applyBankerNumLabel.text = "申请人数:" + length;
		}

		protected onLeave() {
			super.onLeave();
			this.selfLastBets = [];
			if(this.finishTask) {
				this.finishTask.stop();
			}
			this.tbDiceBao.clearAllTimeOut();
			this.tbDiceBao.clear();
			this.tbData = null;
			this.betContainer.removeChildren();
			this.lastChooseBet = 0;
		}

		private resetBetInfo() {
			for(let betInfo of this.betInfoArr) {
				if(betInfo) betInfo.reset();
			}
		}

		private getAvaliableBetArr(v:number):Array<number> {
			let ret = [];
			for(let value of this.customBetNums) {
				if(v / value >= 10) {
					ret.push(value);
				}
			}
			if(ret.length == 0) {
				// 给一个最低的
				ret.push(this.customBetNums[0]);
			}
			return ret;
		}

		private addToHashMap(type:number, betBtn:TbBetButton) {
			if(!this.betHashMap) {
				this.betHashMap = new HashMap();
			}
			let list:Array<TbBetButton>;
			if(this.betHashMap.contains("bet_" + type)) {
				list = this.betHashMap.get("bet_" + type);
			} else {
				list = [];
				this.betHashMap.put("bet_" + type, list);
			}
			list.push(betBtn);
		}

		public handleDeltaBet(data:any) {
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						let betInfo = this.betInfoArr[stakeInfo.type - 1];
						betInfo.updateSelfRetInfo(stakeInfo.value);
					}	
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHead.showImmGold(this.tempBetGold);
				}
			}
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.tbData.addPlayer(playerInfo);

			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.updateTotalRetInfo(stakeInfo.value);
				value = value - this.tbData.getRecordTypeBet(type);
				// egret.log("收到：" + value + "  原有：" + this.tbData.getRecordTypeBet(type))
				if(value <= 0) continue;
				this.tbData.recordTypeBetInfo(type, value);
				let targetArea = this.getStakeArea(type);
				let arr = this.getAvaliableBetArr(value);
				for(let m = arr.length - 1; m >= 0 ; m--)
				{
					let betNum = Math.floor(value / arr[m]);
					if(betNum > 0)
					{
						for(let b = 0 ; b < betNum ; b++)
						{
							let betBtn = this.betButtonFactory(0 , type , arr[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(arr[m]) + 1);
							let point = targetArea.randomGlobalPoint(betBtn.width);
							point = betBtn.parent.globalToLocal(point.x, point.y);
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.addToHashMap(type, betBtn);
						}
					}
					value -= arr[m] * betNum;
				}
			}
		}

		private showInitBetByNewRound(data:any) {
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						let betInfo = this.betInfoArr[stakeInfo.type - 1];
						betInfo.updateSelfRetInfo(stakeInfo.value);
					}	
					this.tempBetGold = battleInfo.totalMoney;
					this.selfHead.showImmGold(this.tempBetGold);
				}
			}
			this.betHashMap = new HashMap();
			let playerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			this.tbData.addPlayer(playerInfo);
			for(let stakeInfo of data.totalStake) {
				let value = stakeInfo.value;
				let type = stakeInfo.type;
				this.tbData.recordTypeBetInfo(type, value);
				// egret.log("存储了值" + value)
				let betInfo = this.betInfoArr[stakeInfo.type - 1];
				betInfo.updateTotalRetInfo(stakeInfo.value);
				let targetArea = this.getStakeArea(type);
				let arr = this.getAvaliableBetArr(value);
				for(let m = arr.length - 1; m >= 0 ; m--) {
					let betNum = Math.floor(value / arr[m]);
					if(betNum > 0){
						for(let b = 0 ; b < betNum ; b++){
							let betBtn = this.betButtonFactory(0 , type , this.customBetNums[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(arr[m]) + 1);
							let point = targetArea.randomGlobalPoint(betBtn.width);
							point = betBtn.parent.globalToLocal(point.x, point.y);
							betBtn.x = point.x;
							betBtn.y = point.y;
							this.addToHashMap(type, betBtn);
						}
					}
					value -= arr[m] * betNum;
				}
			}
		}

		public firstEnterRoom(data){
			TbData.bankerUpMoneyLimit = data.upBankerMinMoney / 1000
			this.tempBetGold = 0;
			
			this.updateApplyBankerNum(data.bankerInfos.length);
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			this.playerNum.text = roomData.onlineCount.toFixed(0);
			this.resetBetInfo();
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.stopAnim.visible = false;
			this.stopAnim.stop();
			egret.log("对比serialNumber : " + data.serialNumber + "   " + this.curGameRound)
			if(data.serialNumber == this.curGameRound && this.tbData) {
				// 补充不足的金币
				this.handleDeltaBet(data)
			} else {
				let ori = this.tbData;
				this.tbData = new TbData();
				if(ori) {
					this.tbData.bankerList = ori.bankerList;
				}
				this.betContainer.removeChildren();
				this.showInitBetByNewRound(data);
			}
			this.curGameRound = data.serialNumber
			egret.log("当前局数编号 : " + data.serialNumber)
			this.tbData.clearPlayerTypeBet();
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					for(let stakeInfo of battleInfo.playerStake) {
						if(stakeInfo.value > 0) {
							this.tbData.isSelfBet = true;
							this.tbData.recordPlayerTypeBet(UserService.instance.playerId, stakeInfo.type, stakeInfo.value);
						}
					}	
				}
			}
			this.tbData.initFromRoomData();
			for(let bankerInfo of data.bankerInfos) {
				this.tbData.addBankerData(bankerInfo);
			}
			this.updateBankerState();
			if(this.tempBetGold == 0) {
				this.tempBetGold = this.tbData.getPlayerById(UserService.instance.playerId).totolMoney;
			}
			// 处理一下 上庄的数据
			this.tbData.setBankerData(data.bankerInfos);
			this.updateBankerState();
			this.currStatus = data.status;
			
			if(data.status == TbStatus.startBet)
			{
				this.waitGroup.visible = false;
				this.waitAnim.stop();
				this.tbCountDown.initUI(1 , data.downTime);
				this.battleStartCountDown.isPlaySound = true;
				this.battleStartCountDown.startCountDown(data.downTime);
				this.UpdateBetInfo(true);
				if(this.lastChooseBet >= 0) {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				} else {
					this.selectedBetButtonByIndex(0);
				}
				this.refreshBtnState();
			}
			if(data.status == TbStatus.stopBet)//停止下注
			{
				this.tbCountDown.initUI(2, data.downTime);
				this.battleStartCountDown.isPlaySound = false;
				this.battleStartCountDown.startCountDown(data.downTime);
				this.UpdateBetInfo(false);
				if(!this.tbData.isSelfBet) {
					// 显示下一局
					this.waitGroup.visible = true;
					this.waitAnim.play();
				}
				if(this.finishTask) {
					this.finishTask.stop();
				}
				this.tbDiceBao.clear();
				this.finishTask = new game.BehaviorTaskExecutor();
				this.bindTaskTo(this.finishTask, data);
				this.finishTask.execute(16 - data.downTime)
				for(let win of data.winTypes) {
					egret.log("==================== win " + win);
				}

				for(let dd of data.diceNumbers) {
					egret.log("==================== diceNumbers " + dd);
				}
			}
			if(data.status == TbStatus.prepared)
			{
				this.tbCountDown.initUI(0 , data.downTime);
				this.battleStartCountDown.isPlaySound = false;
				this.battleStartCountDown.startCountDown(data.downTime);
				this.waitGroup.visible = false;
				this.waitAnim.stop();
				this.UpdateBetInfo(false);
			}
		}

		public onRequestPlayerList(event)
		{
			TbRequest.requestPlayerBank(0);
		}
		public isDownOper:boolean = false;
		public onDownBanker() {
			this.isDownOper = true;
			TbRequest.sendDownBanker(0);
		}

		public onApplyBanker()
		{
			if(this.tempBetGold < TbData.bankerUpMoneyLimit) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:"+TbData.bankerUpMoneyLimit+"元",
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
			TbRequest.sendApplyBanker(1);
		}

		public downBankerRet(data)
		{
			this.updateApplyBankerNum(data.bankerInfos.length);
			this.tbData.setBankerData(data.bankerInfos);
			this.updateBankerState();
			if(this.isDownOper) {
				this.isDownOper = false;
				if (this.tbData.isSelfBanker()) {
					TipsUtils.showTipsFromCenter("申请成功,下局下庄");
				} else {
					TipsUtils.showTipsFromCenter("下庄成功");
				}
			}
		}

		private updateBankerState() {
			if(this.tbData.isSelfInBankerUpList() || this.tbData.isSelfBanker()) {
				this.downBanker.visible = true;
				this.applyBanker.visible = false;
			} else {
				this.downBanker.visible = false;
				this.applyBanker.visible = true;
			}
		}

		public onApplyBankerRet(data)
		{
			// this.tbData.addBankerData(data);
			if(this.tbData.addBankerData(data).playerId == UserService.instance.playerId) {
				TipsUtils.showTipsFromCenter("申请成功");
			}
			this.updateBankerState();
			this.updateApplyBankerNum(this.tbData.bankerList.length);
		}

		public pushBattleStatus(data)
		{
			this.currStatus = <TbStatus>data.status;
			console.log(">>>>>>>>>>>>CurrStatus" + this.currStatus);
			switch(this.currStatus)
			{
				case TbStatus.prepared:
				{
					this.onPrepared(data);
					break;
				}
				case TbStatus.startBet:
				{
					this.onStartBet(data);
					break;
				}
				case TbStatus.stopBet:
				{
					this.onStopBet(data);
					break;
				}
			}
			if(data.isSwitchBanker) {
				this.playChangeZhuang()
				this.tbData.checkBankerList();
				this.updateBankerState();
				this.refreshBtnState();
			}
		} 

		private playChangeZhuang() {
			// TbSoundPlayer.instance.changeZhuang();
			this.changeZhuangGroup.visible = true;
			this.changeZhuangGroup.alpha = 1;
			this.setTimeOut(()=>{
				egret.Tween.get(this.changeZhuangGroup).to({alpha:0}, 500);
				this.changeZhuangGroup.visible = false;
			}, 2000);
			SoundMenager.instance.playVoice("zhuang-change_mp3");
		}

		public onPrepared(data)
		{
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.tbCountDown.initUI(0 , data.downTime);
			this.battleStartCountDown.isPlaySound = false;
			this.battleStartCountDown.startCountDown(data.downTime);
		}

		public onStartBet(data)
		{
			this.resetBetInfo();
			this.tbData.isSelfBet = false;
			this.waitGroup.visible = false;
			this.waitAnim.stop();
			this.startAnim.playerOnce(()=>{this.startAnim.visible = false;}, this);
			TbSoundPlayer.instance.playStartBet();
			this.selfCurrBets = [];
			if(this.selfLastBets.length > 0 && !this.continueBtn.enabled)
			{
				this.continueBtn.enabled = true;
			}
			this.betContainer.removeChildren();
			for(var i = 0 ; i < 18 ; i++)
			{
				if(i > 0)
				{
					this.betInfoArr[i-1].reset();
				}
			}
			this.openCapAnim.resetAnim();
			this.tbDiceBao.playStartAnim();

			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			this.positionMap = new Object();
			roomData.status = game.GameStatus.RUNNING;
			this.tbData = new TbData();
			this.curGameRound = data.serialNumber
			for(let i=0;i<roomData.playerInfos.length;i++)
			{
				let playerInfo:game.PlayerInfo = roomData.playerInfos[i];
				this.positionMap[playerInfo.playerId] = playerInfo.postion;
				this.tbData.addPlayer(playerInfo);
				this.tbData.getPlayerById(playerInfo.playerId).state = TBPlayerState.game;
			}
			this.tempBetGold = this.tbData.getPlayerById(UserService.instance.playerId).totolMoney;
			egret.log("tempBetGold..............." + this.tempBetGold)
			this.UpdateBetInfo(true);
			if(this.validateBetButton(this.betBtnArr[0])){
				this.betBtnArr[0].openLight();
			}
			this.currBetButton = this.betBtnArr[0];
			if(this.lastChooseBet >= 0) {
				this.selectedBetButtonByIndex(this.lastChooseBet);
			} else {
				this.selectedBetButtonByIndex(0);
			}
			this.tbCountDown.initUI(1 , data.downTime);
			this.battleStartCountDown.isPlaySound = true;
			this.battleStartCountDown.startCountDown(data.downTime);

			if(this.cacheBet.length > 0) {
				this.prevCache = this.cacheBet;
			}
			this.cacheBet = [];
			this.currStatus = TbStatus.startBet;
			this.refreshBtnState();
			this.betHashMap = new HashMap();
		}
		public onStopBet(data:any)
		{
			this.tbCountDown.initUI(2 , data.downTime);
			this.battleStartCountDown.isPlaySound = false;
			this.battleStartCountDown.startCountDown(data.downTime);
			this.stopAnim.visible = true;
			this.stopAnim.playerOnce(()=>{this.stopAnim.visible = false;}, this);
			TbSoundPlayer.instance.playStopBet();
			this.UpdateBetInfo(false);
			if(this.selfCurrBets != null && this.selfCurrBets.length > 0)
			{
				this.selfLastBets = this.selfCurrBets;
			}
			this.continueBtn.enabled = false;
			var player = this.tbData.getPlayerById(UserService.instance.playerId);
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
			this.selfHead.showImmGold(this.tempBetGold);
		}

		private handleStartData(data) {
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			for(let battleData of data.battleInfo) {
				let battlePlayerId = Number(battleData.playerId);
				let tbPlayer = this.tbData.getPlayerById(battlePlayerId);
				if(!tbPlayer) continue;
				tbPlayer.totolMoney = battleData.totalMoney;
				let playerInfo:game.PlayerInfo = roomData.getPlayerInfo(tbPlayer.playerId);
				playerInfo.money = battleData.totalMoney;
				egret.log("sync battle end data money : " + battleData.totalMoney + "  " + tbPlayer.playerId)
				if(tbPlayer.playerId == UserService.instance.playerId) {
					this.tempBetGold = battleData.totalMoney;
				}
			}
		}

		private isInWinTypes(type:number, wintypes:number[]) {
			for(let t of wintypes) {
				if(t == type) {
					return true;
				}
			}
			return false;
		}

		private flyBetBtnByPlayerFocus(betBtn, headIcon:TbHeadIcon | eui.Group, time, isSound:boolean = false){
			if(!headIcon) {
				egret.log("errrrrrrrrrrrpr");
				return;
			}
			let point = headIcon.localToGlobal(headIcon.width / 2,headIcon.height / 2);
			if(betBtn.parent) {
				point = betBtn.parent.globalToLocal(point.x, point.y);
				egret.Tween.get(betBtn).to({x:point.x , y : point.y},time, egret.Ease.backIn).call(()=>{
					if(betBtn && betBtn.parent)
					{
						betBtn.parent.removeChild(betBtn);
					}
					if(isSound) TbSoundPlayer.instance.playWinCoin();
				},this ) ;
			} else {
				egret.log("errrrrrrrrrrrpr22222222");
			}
		}

		private checkFlyToBanker(data) {
			let costTime = 0;
			for(let i = 1 ; i <= 66 ; i++) {
				if(this.betHashMap.contains("bet_" + i) && !this.isInWinTypes(i, data.winTypes)) {
					let list = this.betHashMap.get("bet_" + i)
					let space = list.length > 20 ? 5 : 10;
					for(let j = 0 ; j < list.length ; j++) {
						//筹码飞向庄家
						if(!this.parent)
						{
							return;
						}
						let to = this.bankerHead;
						let betBtn = list[j];
						if(!betBtn)
						{
							continue;
						}
						this.flyBetBtnByPlayerFocus(betBtn, to, 600 + space * j, true);
					}
					this.betHashMap.put("bet_" + i, []);
					let time = 600 + list.length * space;
					if(time > costTime) {
						costTime = time;
					}
				}
			}
		}

		private flyBetBtnToAreaFromBanker(betBtn:TbBetButton | eui.Image, targetX, targetY, addTime:number){
			if(betBtn instanceof TbBetButton) {
				betBtn.randomRotation();
			} else {
				betBtn.rotation = 360 * Math.random();
			}
			egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 400 + addTime, egret.Ease.quartOut).call(()=>{
				egret.Tween.get(betBtn).to({scaleX : 1 , scaleY : 1},100).call(()=>{
					if(betBtn.stage) TbSoundPlayer.instance.playBetCoin();
				},this ) ;
			},this ) ;
		}

		private bankerToArea(data) {
			let oriLayerCount = this.betContainer.numChildren;
			for(let type of data.winTypes) {
				let value = this.tbData.getRecordTypeBet(type);
				// egret.log("value:" + value + "   " + GameConst.getTbValueMulti(type))
				value = GameConst.getTbValueMulti(type) * value;
				// egret.log("需要飞：" + value);
				if(value == 0) continue;
				let targetArea = this.getStakeArea(type);
				let arr = this.getAvaliableBetArr(value);
				let count = 0;
				let maxCount = 20;
				for(let m = arr.length - 1; m >= 0 ; m--) {
					let betNum = Math.floor(value / arr[m]);
					if(betNum > 0){
						for(let b = 0 ; b < betNum ; b++){
							let betBtn = this.betButtonFactory2(arr[m]);
							this.betContainer.addChildAt(betBtn, oriLayerCount);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(arr[m]) + 1);
							let point = this.bankerHead.localToGlobal(this.bankerHead.width / 2, this.bankerHead.height / 2)
							point = betBtn.parent.globalToLocal(point.x, point.y);
							betBtn.x = point.x;
							betBtn.y = point.y;
							let p = targetArea.randomGlobalPoint(betBtn.width);
							p = betBtn.parent.globalToLocal(p.x, p.y);
							this.flyBetBtnToAreaFromBanker(betBtn, p.x, p.y, count * 10);
							count++;
							this.addToHashMap(type, betBtn);
							if(count > maxCount) break;
						}
					}
					if(count > maxCount) break;
					value -= arr[m] * betNum;
				}
			}
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
			// 自己的还是单独处理吧
			for(let type=1;type <= 66; type++) {
				if(!this.isInWinTypes(type, data.winTypes)) continue;
				let v = this.tbData.getPlayerTypeBet(UserService.instance.playerId, type) * (GameConst.getTbValueMulti(type) + 1);
				if(v <= 0) continue;
				let arr = this.genAvailableBetArr(v);
				for(let i=arr.length-1;i>=0;i--) {
					let n = v / (arr[i]);
					for(let j = 0;j < n; j++) {
						let betBtn = this.betButtonFactory(UserService.instance.playerId , type , arr[i]);
						betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(arr[i]) + 1);
						this.betContainer.addChild(betBtn);
						let area = this.getStakeArea(type);
						if(area) {
							let p = area.randomGlobalPoint(betBtn.width);
							p = this.betContainer.globalToLocal(p.x, p.y);
							betBtn.x = p.x;
							betBtn.y = p.y;
						}
						this.flyBetBtnByPlayerFocus(betBtn, this.selfHead, 400 + j * 10, true);	 
					}
					v -= n * arr[i];
					if(v<=0) continue;
				}
			}
			for(let type=1;type <= 66; type++) {
				if(!this.betHashMap.contains("bet_" + type)) {
					continue;
				}
				let time = 0;
				let list = this.betHashMap.get("bet_" + type);
				let space = list.length > 30 ? 5 : 10;
				for(let j = 0 ; j < list.length ; j++)
				{// 飞向玩家按钮
					let betBtn = list[j];
					let to:any= this.playerListBtn;
					if(!betBtn.parent) {
						this.betContainer.addChild(betBtn);
						let area = this.getStakeArea(type);
						if(area) {
							let p = area.randomGlobalPoint(betBtn.width);
							p = this.betContainer.globalToLocal(p.x, p.y);
							betBtn.x = p.x;
							betBtn.y = p.y;
						}
					}
					this.flyBetBtnByPlayerFocus(betBtn, to, 400 + j * space, true);	 
				}	
				time = 400 * 50 + list.length * space;
				if(time > costTime) {
					costTime = time;
				}
			}
			return costTime;
		}

		private directShowBankerToArea(data:any) {
			for(let type of data.winTypes) {
				let value = this.tbData.getRecordTypeBet(type);
				value = GameConst.getTbValueMulti(type) * value;
				let targetArea = this.getStakeArea(type);
				let arr = this.getAvaliableBetArr(value);
				let count = 0;
				let maxCount = 20;
				for(let m = arr.length - 1; m >= 0 ; m--) {
					let betNum = Math.floor(value / arr[m]);
					if(betNum > 0){
						for(let b = 0 ; b < betNum ; b++){
							let betBtn = this.betButtonFactory2(arr[m]);
							this.betContainer.addChild(betBtn);
							betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel,
								this.customBetNums.indexOf(arr[m]) + 1);
							let p = targetArea.randomGlobalPoint(betBtn.width);
							p = betBtn.parent.globalToLocal(p.x, p.y);
							betBtn.x = p.x;
							betBtn.y = p.y;
							count++;
							this.addToHashMap(type, betBtn);
							if(count > maxCount) break;
						}
					}
					if(count > maxCount) break;
					value -= arr[m] * betNum;
				}
			}
		}

		private bindTaskTo(finishTask:game.BehaviorTaskExecutor, data) {
			let winTypes :number[] = data.winTypes;
			
			finishTask.addTask(2000, ()=>{
				this.tbDiceBao.playTouzhiAnim(data.diceNumbers);
			}, this, ()=>{
				this.tbDiceBao.showResultAnimDirect(data.diceNumbers);
			}, this, 0)

			finishTask.addTask(900, ()=>{
				this.tbDiceBao.showResult(data.diceNumbers);
			}, this, ()=>{
				this.tbDiceBao.showResultDircet(data.diceNumbers);
			}, this, 0)

			finishTask.addTask(500, ()=>{
				this.tbDiceBao.playTotalVoice(data.diceNumbers);
			}, this, ()=>{
				
			}, this, 0)

			finishTask.addTask(500, ()=>{
				this.tbDiceBao.playResultVoice(data.diceNumbers);
			}, this, ()=>{
				
			}, this, 0)

			finishTask.addTask(500, ()=>{
				this.tbDiceBao.directEnd();
			}, this, ()=>{
				this.tbDiceBao.directEnd();
			}, this, 0)

			finishTask.addTask(2000, ()=>{
				for(let i = 0 ; i < winTypes.length ;i++) {
					this.winIconTweenByType(winTypes[i])
				}
			}, this, ()=>{

			}, this, 0)
			finishTask.addTask(1000, ()=>{
				this.checkFlyToBanker(data);
			}, this, ()=>{
				for(let i = 1 ; i <= 66 ; i++) {
					if(this.betHashMap.contains("bet_" + i) && !this.isInWinTypes(i, data.winTypes)) {
						let list = this.betHashMap.get("bet_" + i);
						for(let betBtn of list) {
							if(betBtn.parent) betBtn.parent.removeChild(betBtn);
						}
						this.betHashMap.put("bet_" + i, []);
					}
				}
			}, this, 0);
			finishTask.addTask(1000, ()=>{
				this.bankerToArea(data);
			}, this, ()=>{
				this.directShowBankerToArea(data);
			}, this, 0);
			finishTask.addTask(1000, ()=>{
				this.checkStakeWin(data);
			}, this, null, null, 0);
			finishTask.addTask(500, ()=>{
				TbSoundPlayer.instance.playGetCoin();
			}, this, null, null, 0);
			finishTask.addTask(1000, ()=>{
				this.resultPanel.visible = true;
				let darkSprite = this.resultPanel["dark"];
				let p = this.resultPanel.globalToLocal(0,0);
				darkSprite.x = p.x;
				darkSprite.y = p.y;
				this.resultPanel.showResult(data.battleInfo);
				this.tbData.recordResultPanelOpen();
				// 清除所有下注数额
				this.hideAllBetInfoText();
				this.bankerHead.showImmGold(data.battleInfo[0].totalMoney)
				this.selfHead.showImmGold(data.battleInfo[1].totalMoney)
				TbRequest.requestOPWinFail(0);
			}, this, null, null, 1000);
		}

		public startDealDiceBao(data)
		{
			
			this.handleStartData(data);
			this.tbDiceBao.visible = true;
			this.playerNum.text = data.onlineNum;
			if(!this.betHashMap) return;
			this.finishTask = new game.BehaviorTaskExecutor();
			// 空等1s 就是结束下注的动画时间
			this.finishTask.addTask(1600, ()=>{
			}, this, null, null, 0)
			this.bindTaskTo(this.finishTask, data);
			this.finishTask.execute();
		}

		private hideAllBetInfoText() {
			for(let betP of this.betInfoArr) {
				if(betP) betP.reset();
			}
		}

		public winIconTweenByType(type)
		{
			let winIcon = this["winType" + type];
			egret.Tween.get(winIcon).to({alpha : 1},500).call(()=>{
				egret.Tween.get(winIcon).to({alpha : 0},500).call(()=>{
					egret.Tween.get(winIcon).to({alpha : 1},500).call(()=>{
						egret.Tween.get(winIcon).to({alpha : 0},500).call(()=>{
							winIcon.alpha = 0;
						}, this)
					}, this)
				}, this)
			}, this)
		}

		private UpdateBetInfo(canBet)
		{
			console.log("Update BetInfo : " + canBet);
			if(canBet)
			{
				this.betButton1.alpha = this.betButton10.alpha = this.betButton100.alpha = this.betButton50.alpha = this.betButton500.alpha = 1;
				this.betButton1.enabled = this.betButton10.enabled = 
					this.betButton100.enabled = this.betButton50.enabled = 
					this.betButton500.enabled = this.betButton1000.enabled = true;

				var betButton : TbBetButton;
				/*
				for(var i = 0 ; i < this.betBtnArr.length ; i++)
				{
					betButton = this.betBtnArr[i];

					if(this.tbData.getPlayerById(UserService.instance.playerId).totolMoney < 50)
					{
						betButton.alpha = 0.5;
					}else if(this.validateBetButton(betButton))
					{
						betButton.enabled = true;
						betButton.alpha = 1;
					}else
					{
						betButton.enabled = false;
						betButton.alpha = 0.5;
					}
				}
				*/
			}else
			{
				var betButton : TbBetButton;
				for(var i = 0 ; i < this.betBtnArr.length ; i++)
				{
					betButton = this.betBtnArr[i];
					betButton.closeLight();
					betButton.alpha = 0.5;
					betButton.enabled = false;
					betButton.canChoose = false;
				}
				this.currBetButton = null;
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
					this.lastChooseBet = index;
					this.currBetButton.lightMove();
				}else
				{
					this.betBtnArr[i].recovery();
				}
			}
		}

		private startStakeTap(event : egret.TouchEvent)
		{
			if(this.tbData.isSelfBanker()) {
				CommonUtil.noticeMsg("庄家不能下注");
				return;
			}
			if(this.currStatus != TbStatus.startBet) {
				CommonUtil.noticeMsg("请稍候，还没到下注时间");
				return;
			}
			if(this.tbData.getPlayerById(UserService.instance.playerId) == null)
			{
				return;
			}
			if(this.currStatus != TbStatus.startBet) {
				return;
			}
			if(this.tbData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("庄家不能下注");
				return;
			}
			let buttonType = 0;
			var typeBetInfo : eui.Group;
			for(var i = 0 ; i < this.touchGroupArr.length ; i++)
			{
				typeBetInfo = this.touchGroupArr[i];
				if(event.currentTarget == typeBetInfo)
				{
					buttonType = this.getInfoType(typeBetInfo);
					// 闪烁一下
					this.brightBetArea(buttonType);
				}
			}
			if(buttonType == 0) {egret.log("检测不到区域" +  egret.getTimer())};
			this.startStakeTrue(buttonType, this.currBetButton, true);
		}

		private brightBetArea(type:number) {
			let winIcon = this["winType" + type];
			egret.Tween.removeTweens(winIcon);
			winIcon.alpha = 0;
			winIcon.visible = true;
			egret.Tween.get(winIcon).to({alpha:1},250).call(()=>{
				egret.Tween.get(winIcon).to({alpha:0},250);
			})
		}

		private startStakeTrue(buttonType, betButton:TbBetButton, iscahce:boolean = true) {
			if(buttonType  == 0) return;
			var buttonValue =  this.getBetButtonValue(betButton);
			if(this.tempBetGold < buttonValue || !betButton)
			{
				TipsUtils.showTipsFromCenter("当前金币不足");
				return;
			}
			//直接飞筹码
			this.tempBetGold -= buttonValue;
			this.selfHead.showImmGold(this.tempBetGold);
			var betBtn = this.stakeEffect(UserService.instance.playerId , buttonType , buttonValue);
			this.tempBetPools.push(betBtn);
			this.refreshBtnState();
			TbRequest.SendBets(buttonType , buttonValue);
			if(iscahce) this.cacheBet.push({buttonType:buttonType, betButton:betButton});
		}

		public onStakeRet(data)
		{
			var retPlayerId = Number(data.playerId);
			let targetPlayer = RoomManager.getInstance().curRoomData.getPlayerInfo(retPlayerId);
			let headIcon:any = null;
			if(targetPlayer) {
				headIcon = this.getHeadIconByPos(targetPlayer.postion);
			}
			this.tbData.recordTypeBetInfo(data.type, data.value);
			var tbPlayer = this.tbData.getPlayerById(Number(retPlayerId));
			var betInfo = this.betInfoArr[data.type - 1];
			if(retPlayerId == UserService.instance.playerId) {
				this.tbData.addSelfBetValue(data.type, data.value);
				betInfo.updateSelfRetInfo(this.tbData.getSelfBetValue(data.type));
				this.tbData.isSelfBet = true;
			}
			this.tbData.addBetValue(data.type, data.value);
			betInfo.updateTotalRetInfo(this.tbData.getTotalBetValue(data.type));

			//显示下注信息：总注数/自己下注数/神算子下注信息
			if(retPlayerId ==UserService.instance.playerId)
			{
				this.tbData.recordPlayerTypeBet(UserService.instance.playerId, data.type, data.value);
				this.selfCurrBets.push(data);
				this.isStaked = true;
				if(tbPlayer == null)
				{
					return;
				}
				tbPlayer.addStakeInfo(data.type , data.value);
				//从tempPool里移除
				for(var i = 0 ; i < this.tempBetPools.length ; i++)
				{
					if(this.tempBetPools[i].value == data.value)
					{
						this.tempBetPools.splice(i , 1);
						break;
					}
				}

			}else
			{
				this.stakeEffect(retPlayerId , data.type, data.value);
				if(tbPlayer != null && tbPlayer.position <= 7 )
				{
					tbPlayer.addStakeInfo(data.type , data.value);
					if(headIcon) headIcon.UpdatePlayerHead(tbPlayer);
				}
			}
		}
		private getBetButtonByValue(value:number) : TbBetButton {
			return this.betBtnArr[this.customBetNums.indexOf(value)];
		}

		private flyBetBtnToTarget(betBtn:TbBetButton, targetX, targetY){
			betBtn.randomRotation();
			this.addToHashMap(betBtn.type, betBtn);
			egret.Tween.get(betBtn).to({x:targetX , y : targetY}, 1000, egret.Ease.quartOut).call(()=>{
				if(betBtn.stage) TbSoundPlayer.instance.playBetCoin();
			},this ) ;
		}

		private stakeEffect(playerId , type , betNum )
		{
			let from:egret.DisplayObject = this.playerListBtn;
			if(playerId == UserService.instance.playerId) {
				// 如果是自己从筹码处飞出去
				from = this.getBetButtonByValue(betNum);
			}
			let targetArea = this.getStakeArea(type);
			var betBtn = this.betButtonFactory(playerId , type , betNum);
			this.betContainer.addChild(betBtn);
			betBtn.showLittleButton(RoomManager.getInstance().curRoomData.gameLevel, this.customBetNums.indexOf(betNum) + 1);
			let fromPos = from.localToGlobal(from.width / 2, from.height / 2);
			fromPos = betBtn.parent.globalToLocal(fromPos.x, fromPos.y);
			betBtn.x = fromPos.x;
			betBtn.y = fromPos.y;
			let p  = targetArea.randomGlobalPoint(betBtn.width);
			p = betBtn.parent.globalToLocal(p.x, p.y);
			this.flyBetBtnToTarget(betBtn , p.x , p.y);
			return betBtn;
		}
		public betButtonFactory(playerId , type , betNum) : TbBetButton
		{
			var betBtn = new TbBetButton();
			betBtn.enabled = false;
			betBtn.anchorOffsetX = betBtn.width/2;
			betBtn.anchorOffsetY = betBtn.height/2;
			betBtn.value = betNum;
			betBtn.type = type;
			betBtn.playerId = playerId;
			return betBtn;
		}
		public betButtonFactory2(betNum) : TbBetButton
		{
			var betBtn = new TbBetButton();
			betBtn.enabled = false;
			betBtn.anchorOffsetX = betBtn.width/2;
			betBtn.anchorOffsetY = betBtn.height/2;
			betBtn.value = betNum;
			return betBtn;
		}
		private flyBetBtn(betBtn:TbBetButton , offsetX, offsetY , from,to){
			betBtn.randomRotation();
			this.betHash[betBtn.type - 1].push(betBtn);
			let point = to.localToGlobal(offsetX , offsetY);
			point = betBtn.parent.globalToLocal(point.x, point.y);
			egret.Tween.get(betBtn).to({x:point.x , y : point.y},1000, egret.Ease.quartOut).call(()=>{
				egret.Tween.get(betBtn).to({scaleX : 1 , scaleY : 1},200).call(()=>{
					TbSoundPlayer.instance.playBetCoin();
				},this ) ;
			},this ) ;
		}

		private flyBetBtnByPlayer(betBtn , offsetX, offsetY , from,to){
			this.registerTimeout(function(){
				// HhdzSoundPlayer.instance.playWinCoin();
				let point = to.localToGlobal(offsetX , offsetY);
				if(!betBtn.parent) return;
				point = betBtn.parent.globalToLocal(point.x, point.y);
				egret.Tween.get(betBtn).to({x:point.x , y : point.y + 34},1000, egret.Ease.backIn).call(()=>{
					egret.Tween.get(betBtn).to({scaleX : 0.5 , scaleY : 0.5 },100).call(()=>{
						if(betBtn != null && betBtn.parent != null)
						betBtn.parent.removeChild(betBtn);
					},this ) ;
				},this ) ;
			} , 1500);
		}

		private getBetButtonValue(betButton) : number
		{
			let idx = this.betBtnArr.indexOf(betButton);
			if(idx >= 0) {
				return this.customBetNums[idx];
			}
			return 0;
		}
		public getHeadIconByPos(pos:number) : TbHeadIcon
		{
			return this.playerHeads[pos];
		}

		private validateBetButton(betButton) : boolean
		{
			let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
			if(roomData.gameLevel > 0)
			{
				if(this.tempBetGold >= this.getBetButtonValue(betButton))
				{
					return true;
				}
			}
			return false;
		}

		private getInfoType(typeBetInfo : eui.Group) : number
		{
			switch(typeBetInfo)
			{
				case this.areaGroup1:
					return 1;
				case this.areaGroup2:
					return 2;
				case this.areaGroup3:
					return 3;
				case this.areaGroup4:
					return 4;
				case this.areaGroup5:
					return 5;
				case this.areaGroup6:
					return 6;
				case this.areaGroup7:
					return 7;
				case this.areaGroup8:
					return 8;
				case this.areaGroup9:
					return 9;
				case this.areaGroup10:
					return 10;
				case this.areaGroup11:
					return 11;
				case this.areaGroup12:
					return 12;
				case this.areaGroup13:
					return 13;
				case this.areaGroup14:
					return 14;
				case this.areaGroup15:
					return 15;
				case this.areaGroup16:
					return 16;
				case this.areaGroup17:
					return 17;
				case this.areaGroup21:
					return 21;
				case this.areaGroup22:
					return 22;
				case this.areaGroup23:
					return 23;
				case this.areaGroup24:
					return 24;
				case this.areaGroup25:
					return 25;
				case this.areaGroup26:
					return 26;
				case this.areaGroup27:
					return 27;
				case this.areaGroup28:
					return 28;
				case this.areaGroup31:
					return 31;
				case this.areaGroup32:
					return 32;
				case this.areaGroup33:
					return 33;
				case this.areaGroup34:
					return 34;
				case this.areaGroup35:
					return 35;
				case this.areaGroup36:
					return 36;
				case this.areaGroup41:
					return 41;
				case this.areaGroup42:
					return 42;
				case this.areaGroup43:
					return 43;
				case this.areaGroup44:
					return 44;
				case this.areaGroup45:
					return 45;
				case this.areaGroup46:
					return 46;
				case this.areaGroup47:
					return 47;
				case this.areaGroup48:
					return 48;
				case this.areaGroup49:
					return 49;
				case this.areaGroup50:
					return 50;
				case this.areaGroup51:
					return 51;
				case this.areaGroup52:
					return 52;
				case this.areaGroup53:
					return 53;
				case this.areaGroup54:
					return 54;
				case this.areaGroup55:
					return 55;
				case this.areaGroup61:
					return 61;
				case this.areaGroup62:
					return 62;
				case this.areaGroup63:
					return 63;
				case this.areaGroup64:
					return 64;
				case this.areaGroup65:
					return 65;
				case this.areaGroup66:
					return 66;
			}
			return 0;
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

		private refreshBtnState() {
			if(this.tbData.isSelfBanker() || this.currStatus != TbStatus.startBet) {
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
				xuyaNeedValue += this.getBetButtonValue(p.betButton);
			}
			if(this.tempBetGold < xuyaNeedValue) {
				this.continueBtn.enabled = false;
			} else {
				if(this.prevCache && this.prevCache.length > 0 && !this.continueBtn["hasClick"]) {
					this.continueBtn.enabled = true;
				}
			}
			if(this.currStatus == TbStatus.startBet) {
				if(this.lastChooseBet > (avaliableArr.length - 1)) {
					if(avaliableArr.length > 0) {
						this.selectedBetButtonByIndex(avaliableArr.length - 1);
					}
				} else {
					this.selectedBetButtonByIndex(this.lastChooseBet);
				}
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
					return "贵宾场";
				}
				case 3:
				{
					return "豪华场";
				}
			}
			return "房间";
		}

		private onBackHall()
		{
			if(this.tbData && this.tbData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if(this.tbData && this.tbData.isSelfBet) {
				if(this.currStatus == TbStatus.prepared || (this.currStatus == TbStatus.stopBet && this.tbData.checkAllowExit(this.curGameRound))) {
					RoomRequest.leaveRoom(game.ChildGameType.DiceBao);
				} else {
					BattleLeaveTips.showTips({
						"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间?",
						"callback": (data: any) => {
							RoomRequest.leaveRoom(game.ChildGameType.DiceBao);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
				}
				return;
			} else {
				RoomRequest.leaveRoom(game.ChildGameType.DiceBao);
			}
			
		}
		private timeoutIdList:Array<number> = [];
		private registerTimeout(func:Function, time:number):void {
			var holder:any = this;
			var timeOutId:number = egret.setTimeout(function(){
				func.call(holder);
				let index:number = this.timeoutIdList.indexOf(timeOutId);
				if(index >= 0) {
					this.timeoutIdList.splice(index, 1);
				}
			} , this , time);
			this.timeoutIdList.push(timeOutId);
		}

		public clearAllTimeOut():void {
			if(this.timeoutIdList.length > 0) {
				for(let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}
		private onTrendBtn(e:egret.TouchEvent){
			if(this.tbTrendPanel == null)
			{
				this.tbTrendPanel = new TbTrendPanel();
			}
			PopUpManager.addPopUp(this.tbTrendPanel, true, 0, 0, 1);
		}
		public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
			this.tempBetGold += drawmoney;
			this.selfHead.showImmGold(this.tempBetGold);
			egret.log("aaaaaaaaaaaaaaa : " + this.tempBetGold)
			this.tbData.getPlayerById(UserService.instance.playerId).money = totalmoney;
			let playerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId);
			if(playerInfo) {
				playerInfo.money = totalmoney;
			}
			this.refreshBtnState();
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}
    }
}

