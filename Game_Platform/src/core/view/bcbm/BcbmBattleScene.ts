module game.bcbm {
	enum BcbmStatus {
		idle = 0,
		bet = 1,
		open = 2
	}
	export class BcbmBattleScene extends GameScene implements eui.UIComponent {
		public constructor() {
			super();
			this.gameType = ChildGameType.BCBM;
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = "resource/eui_skins/bcbm/BcbmBattleScene.exml";
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		//---------UI
		private rootGroup: eui.Group;
		private gameLevel: eui.Image;
		private onlinePlayerBtn: IButton;
		private countdownTip: game.bcbm.BcbmTip;

		private animGroup: eui.Group;

		private bcbmMenu: game.bcbm.BcbmMenu;

		public selfPlayerHead: BcbmUserHead;
		public bankerPlayerHead: BcbmUserHead;
		private selfHeadImg: eui.Image;
		private bankerHeadImg: eui.Image;

		private betBsjLabel0: eui.BitmapLabel;
		private betBenzLabel0: eui.BitmapLabel;
		private betBmwLabel0: eui.BitmapLabel;
		private betVwLabel0: eui.BitmapLabel;
		private betBsjLabel1: eui.BitmapLabel;
		private betBenzLabel1: eui.BitmapLabel;
		private betBmwLabel1: eui.BitmapLabel;
		private betVwLabel1: eui.BitmapLabel;

		private betBsjLabel2: eui.BitmapLabel;
		private betBenzLabel2: eui.BitmapLabel;
		private betBmwLabel2: eui.BitmapLabel;
		private betVwLabel2: eui.BitmapLabel;
		private betBsjLabel3: eui.BitmapLabel;
		private betBenzLabel3: eui.BitmapLabel;
		private betBmwLabel3: eui.BitmapLabel;
		private betVwLabel3: eui.BitmapLabel;

		public betButton1: BcbmBetButton;
		public betButton5: BcbmBetButton;
		public betButton10: BcbmBetButton;
		public betButton50: BcbmBetButton;
		public betButton100: BcbmBetButton;
		public betButton200: BcbmBetButton;
		public continueBtn: IButton;

		public bsj0BetGroup: eui.Group;
		public bsj1BetGroup: eui.Group;
		public benz0BetGroup: eui.Group;
		public benz1BetGroup: eui.Group;
		public bmw0BetGroup: eui.Group;
		public bmw1BetGroup: eui.Group;
		public vw0BetGroup: eui.Group;
		public vw1BetGroup: eui.Group;

		private touchMask0: eui.Image;
		private touchMask1: eui.Image;
		private touchMask2: eui.Image;
		private touchMask3: eui.Image;
		private touchMask4: eui.Image;
		private touchMask5: eui.Image;
		private touchMask6: eui.Image;
		private touchMask7: eui.Image;

		private resultGrp0: eui.Group;
		private resultGrp1: eui.Group;
		private resultGrp2: eui.Group;
		private resultGrp3: eui.Group;
		private resultGrp4: eui.Group;
		private resultGrp5: eui.Group;
		private resultGrp6: eui.Group;
		private resultGrp7: eui.Group;
		private resultGroups: eui.Group[];


		private prevCache: Array<any>;
		private cacheBet: Array<any>;

		private roomName: eui.Image;

		private cIcon0: eui.Image;
		private frame0: eui.Image;
		private frame1: eui.Image;
		private frame2: eui.Image;
		private frame3: eui.Image;
		private frame4: eui.Image;
		private frame5: eui.Image;
		private frame6: eui.Image;
		private frame7: eui.Image;
		private frame8: eui.Image;
		private frame9: eui.Image;
		private frame10: eui.Image;
		private frame11: eui.Image;
		private frame12: eui.Image;
		private frame13: eui.Image;
		private frame14: eui.Image;
		private frame15: eui.Image;
		private frame16: eui.Image;
		private frame17: eui.Image;
		private frame18: eui.Image;
		private frame19: eui.Image;
		private frame20: eui.Image;
		private frame21: eui.Image;
		private frame22: eui.Image;
		private frame23: eui.Image;
		private frame24: eui.Image;
		private frame25: eui.Image;
		private frame26: eui.Image;
		private frame27: eui.Image;
		private frame28: eui.Image;
		private frame29: eui.Image;
		private frame30: eui.Image;
		private frame31: eui.Image;

		private tempCar: eui.Image;

		private downBanker: IButton;
		private upBanker: IButton;
		public upBankerNum: eui.Label;

		private resultGroup: eui.Group;
		private resultScroller: eui.Scroller;
		private resultBox: eui.Image;

		// private menuGroup: eui.Group;
		// private menuDownBtn: eui.Image;
		// private menuUpBtn: eui.Image;
		// private withdrawBtn: eui.Image;
		// private helpBtn: eui.Image;
		// private settingBtn: eui.Image;
		// private backBtn: eui.Image;

		private resultPanel: BcbmResultPanel;

		private statusAnimImg: eui.Image;
		private statusAnimBg: eui.Image;

		private waitAnim: DragonAnim;
		private winAnim: game.CommonDBLoop2;
		private circleLightAnim: game.CommonDBLoop2;
		// private bsjAnim: game.CommonDBLoop2;
		// private benzAnim: game.CommonDBLoop2;
		// private bmwAnim: game.CommonDBLoop2;
		// private vwAnim: game.CommonDBLoop2;
		//private resultCarAnim: game.CommonDBLoop2;
		private resultBsjAnim: game.CommonDBLoop2;
		private resultBenzAnim: game.CommonDBLoop2;
		private resultBmwAnim: game.CommonDBLoop2;
		private resultVwAnim: game.CommonDBLoop2;
		private curResultAnim: game.CommonDBLoop2;
		private resultAnims: game.CommonDBLoop2[];

		//----------数据与结构;
		private bcbmData: BcbmData = BcbmData.getInstance();
		private isInit = false;
		private isStart = false;
		private currStatus: BcbmStatus = BcbmStatus.idle;
		private isSelfBanker: boolean;
		private isSwitchBanker: boolean;
		public battleStartCountDown: BattleStartCountDown;

		private currBetButton: BcbmBetButton;
		public betBtnArr: BcbmBetButton[] = null;
		public betTouchGroups: eui.Group[] = null;
		private touchMaskArr: eui.Image[] = null;
		private chipHash: BcbmBetButton[][];
		private level0BetNums: number[] = [1, 5, 10, 50, 100, 200];
		private level1BetNums: number[] = [10, 50, 100, 200, 500, 1000];
		private frameArr: eui.Image[] = null;
		private curBetNums: number[];
		private tempBetGold: number = 0;
		public chipContainer: egret.DisplayObjectContainer;

		private curGameRound: number = 0;
		private lockContinue: boolean = false;		

		private timeoutIdList: Array<number> = [];

		public isResultShow: boolean = false;


		//自己飞筹码节点
		private headImg: eui.Image;
		private onlinePlayerBtnImg: eui.Image;

		private lastWinNode: number = 0;

		private carNodes: number[][] =
		[[678.46, 72], [715.46, 72], [753.46, 72], [792.46, 72], [831.46, 72], [869.46, 72], [907.46, 72], [945.46, 72], [985.44, 72],	//0~8 1-5 3-6 5-7 7-8 
		[1027.51, 76.84], [1064.78, 94.5], [1100.79, 115.16], [1137.44, 136.46], [1170.13, 161.51], 													//9~12 9-1 11-2
		[1190, 201.83], [1190, 242.17], [1190, 281.5], [1190, 322.83], [1190, 362.83], [1190, 402.83], [1190, 444.15], 			//13~19 13-3 
		[1178.07, 488.85], [1150.73, 522.17], [1111.73, 547.17], [1071.76, 569.81], 												//20~23
		[1031.77, 588.52], [986.43, 600], [947.43, 600], [908.43, 600], [869.43, 600], [830.43, 600], [791.43, 600], 				//24~30
		[752.43, 600], [713.43, 600], [674.43, 600], [635.43, 600], [596.43, 600], [557.43, 600], 						//31~36
		[518.43, 600], [478.43, 600], [439.43, 600], [400.43, 600], [357.04, 600], 									//37~41
		[313.07, 593.52], [274.06, 577.5], [237.73, 556.83], [199.73, 533.83], 													//42-46
		[166, 508.82], [142.71, 474.2], [137, 432.49], [137, 392.49], [137, 352.49], [137, 312.49], [137, 272.49], [137, 232.82], 					//47~53
		[141.21, 191.2], [165.21, 157.2], [202.71, 131.66], [240.04, 110.33], [274.46, 90.5], 													//54~57
		[312.46, 76.5], [356.46, 72], [397.46, 72], [442.46, 72], [479.46, 72], [521.46, 72], [562.46, 72], [600.46, 72], [638.46, 72]];//58~66

		//所有节点对应的车标type数组
		public static nodeToType: number[] =
		[0, 5, 0, 6, 0, 7, 0, 8, 0,	//0-8
			1, 0, 0, 2, 0, 3, 0, 4, 0,	//9-17
			5, 0, 0, 6, 0, 7, 0, 8, 0, 1,	//18-27
			0, 2, 0, 3, 0, 4, 0, 5, 0,	//28-36
			6, 0, 7, 0, 8, 0, 1, 0, 0, 2,	//37-46
			0, 3, 0, 0, 4, 0, 5, 0, 6,	//47-55
			0, 0, 7, 0, 8, 0, 1, 0, 2, 0, 3, 0, 4];	//56-68
		//每个type对应的节点位置
		public static typeToNode: number[][] = [[9, 27, 43, 62], [12, 29, 46, 64], [14, 31, 48, 66], [16, 33, 51, 68],
		[1, 18, 35, 53], [3, 21, 37, 55], [5, 23, 39, 58], [7, 25, 41, 60]];
		public static typeIndexOfAllNodes: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 29, 31, 33,
			35, 37, 39, 41, 43, 46, 48, 51, 53, 55, 58, 60, 62, 64, 66, 68];
		private carBetLabelArr: eui.BitmapLabel[];
		private carBetLabelArrSelf: eui.BitmapLabel[];
		// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众
		public carBetData: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
		public carBetDataSelf: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

		//private carMotion:CarMotion;
		private bcbmCar: BcbmCar;


		//test
		private testBtn: eui.Button;
		private test1: eui.Button;
		private test2: eui.Button;
		private test3: eui.Button;
		private test4: eui.Button;
		private test5: eui.Button;
		private test6: eui.Button;
		private test7: eui.Button;
		private test8: eui.Button;

		private testBtnGroup: eui.Button[];

		private frameBtn10:eui.Button;
		private frameBtn20:eui.Button;
		private frameBtn30:eui.Button;

		protected componentInit(): void {
			// protected childrenCreated(): void {
			super.componentInit();
			this.betBtnArr = [this.betButton1, this.betButton5, this.betButton10, this.betButton50, this.betButton100, this.betButton200];

			this.onlinePlayerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOnlinePlayer, this);
			// this.menuUpBtn.visible = false;
			// this.menuDownBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
			// this.menuUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHideMenu, this);
			// this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdraw, this);
			// this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
			// this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
			// this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackClick, this);
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueButton, this);
			this.bankerPlayerHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerHeadClick, this);
			this.frameBtn10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFrame10, this);
			this.frameBtn20.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFrame20, this);
			this.frameBtn30.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFrame30, this);

			this.downBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBanker, this);
			this.upBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBanker, this);

			this.carBetLabelArr = [this.betBsjLabel0, this.betBsjLabel1, this.betBenzLabel0, this.betBenzLabel1,
			this.betBmwLabel0, this.betBmwLabel1, this.betVwLabel0, this.betVwLabel1];
			this.carBetLabelArrSelf = [this.betBsjLabel2, this.betBsjLabel3, this.betBenzLabel2, this.betBenzLabel3,
			this.betBmwLabel2, this.betBmwLabel3, this.betVwLabel2, this.betVwLabel3];
			this.betTouchGroups = [this.bsj0BetGroup, this.bsj1BetGroup, this.benz0BetGroup, this.benz1BetGroup,
			this.bmw0BetGroup, this.bmw1BetGroup, this.vw0BetGroup, this.vw1BetGroup];
			this.resultGroups = [this.resultGrp0, this.resultGrp4, this.resultGrp1, this.resultGrp5,
			this.resultGrp2, this.resultGrp6, this.resultGrp3, this.resultGrp7];
			this.touchMaskArr = [this.touchMask0, this.touchMask1, this.touchMask2, this.touchMask3,
			this.touchMask4, this.touchMask5, this.touchMask6, this.touchMask7]



			this.frameArr = [this.frame0, this.frame1, this.frame2, this.frame3, this.frame4, this.frame5, this.frame6, this.frame7,
			this.frame8, this.frame9, this.frame10, this.frame11, this.frame12, this.frame13, this.frame14,
			this.frame15, this.frame16, this.frame17, this.frame18, this.frame19, this.frame20, this.frame21, this.frame22, this.frame23,
			this.frame24, this.frame25, this.frame26, this.frame27, this.frame28, this.frame29, this.frame30, this.frame31];


			this.chipContainer = new egret.DisplayObjectContainer();
			this.addChildAt(this.chipContainer, 3);

			this.circleLightAnim = new game.CommonDBLoop2("bcbmgameselectgq_ske_dbbin", "bcbmgameselectgq_tex_json", "bcbmgameselectgq_tex_png",
				"animation", false, false);

			this.resultBsjAnim = new game.CommonDBLoop2("baoshijie_ske_dbbin", "baoshijie_tex_json", "baoshijie_tex_png",
				"idle", false, false);
			this.resultBenzAnim = new game.CommonDBLoop2("benchi_ske_dbbin", "benchi_tex_json", "benchi_tex_png",
				"idle", false, false);
			this.resultBmwAnim = new game.CommonDBLoop2("baoma_ske_dbbin", "baoma_tex_json", "baoma_tex_png",
				"idle", false, false);
			this.resultVwAnim = new game.CommonDBLoop2("bcbmgamexzqlogo_ske_dbbin", "bcbmgamexzqlogo_tex_json", "bcbmgamexzqlogo_tex_png",
				"idle", false, false);

			this.resultAnims = [this.resultBsjAnim, this.resultBenzAnim, this.resultBmwAnim, this.resultVwAnim];
			for (var i = 0; i < this.betBtnArr.length; i++) {
				this.betBtnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectedBetButton, this);
				this.betBtnArr[i].defaultY = this.betBtnArr[i].y;

			}
			for (var i = 0; i < this.touchMaskArr.length; i++) {
				this.touchMaskArr[i].alpha = 0;
			}
			for (var i = 0; i < this.touchMaskArr.length; i++) {
				let self = this;
				this.touchMaskArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.startStakeTap, this);
				this.touchMaskArr[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapEffect, this);
				this.touchMaskArr[i].addEventListener(egret.TouchEvent.TOUCH_END, this.tapEffectOff, this);
				this.touchMaskArr[i].addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.tapEffectOff, this);
				this.touchMaskArr[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.tapEffectOff, this);
			}
			for (var i = 0; i < this.frameArr.length; i++) {
				this.frameArr[i].alpha = 0;
			}


			//test
			this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showWait, this);
			this.testBtnGroup = [this.test1, this.test2, this.test3, this.test4, this.test5, this.test6, this.test7, this.test8];
			for (let i = 0; i < 8; i++) {
				this.testBtnGroup[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestWintype, this);
			}

			this.battleStartCountDown = new game.BattleStartCountDown();
			this.battleStartCountDown.countDownLabel = this.countdownTip.countdownLabel;
			this.battleStartCountDown.setSound("bcbm_countdown_mp3");

			this.lastWinNode = 0;
			// test
			CarMotion.getInstance().getCarMotionByData(this.carNodes);
			this.bcbmCar = new BcbmCar();
			//this.bcbmCar.prevFinalNodeNum = this.lastWinNode;
			this.rootGroup.addChild(this.bcbmCar);
			this.bcbmCar.x = this.tempCar.x;
			this.bcbmCar.y = this.tempCar.y;
			/*
			//test
			for (let i = 0; i < this.carNodes.length; i++) {
				let dot = new eui.Rect(6, 6, 0x000000);
				this.rootGroup.addChild(dot);
				dot.anchorOffsetX = dot.anchorOffsetY = 3;
				dot.x = this.carNodes[i][0];
				dot.y = this.carNodes[i][1];
			}
			*/
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tstObj, this);
		}

		private onFrame10() {
			CarMotion.getInstance().runFrame = 10;
		}

		private onFrame20() {
			CarMotion.getInstance().runFrame = 20;
		}

		private onFrame30() {
			CarMotion.getInstance().runFrame = 30;
		}

		private tstObj(e: egret.TouchEvent) {
			//console.log(e.currentTarget, e.target);
		}

		protected onOpen() {
			this.isInit = true;
			if (this.isStart) {
				this.initScene();
			}
			let roomData = RoomManager.getInstance().curRoomData;
			let level = roomData.gameLevel;
			this.bcbmMenu.menuInitDefault();
			this.bankBtnCtrl(true);
			this.continueBtn.enabled = false;
			this.tempCar.visible = false;	//test
			this.initChips();
			this.selfBetValue = 0;
			this.chipHashInit();
			this.cacheBet = [];
			this.onlinePlayerBtn["bitLabel"].text = roomData.onlineCount;

			this.bcbmCar.playCarAnim();
			this.launchShine();
		}

		private bankBtnCtrl(up: boolean){
			if(up){
				this.upBanker.visible = true;
				this.downBanker.visible = false;
			}
			else{
				this.upBanker.visible = false;
				this.downBanker.visible = true;
			}
		}

		private clearShine() {
			egret.clearInterval(this.shineIntervKeyArr[0]);
			this.shineIntervKeyArr = [];
			for (let frame of this.frameArr) {
				this.iconShine(frame, 0);
			}
		}

		private shineIntervKeyArr: Array<number> = [];
		private launchShine() {
			let index = 0;
			let length = this.frameArr.length;
			let alpha1 = 0.5;
			let alpha2 = 0.3;
			if (this.shineIntervKeyArr.length > 0) {
				return;
			}
			let shineIntervKey = egret.setInterval(() => {
				this.iconShine(this.frameArr[this.indexChain(index)], alpha1);
				this.iconShine(this.frameArr[this.indexChain(index - 1)], alpha2);
				this.iconShine(this.frameArr[this.indexChain(index - 2)], 0);

				this.iconShine(this.frameArr[this.indexChain(index + 8)], alpha1);
				this.iconShine(this.frameArr[this.indexChain(index + 8 - 1)], alpha2);
				this.iconShine(this.frameArr[this.indexChain(index + 8 - 2)], 0);

				this.iconShine(this.frameArr[this.indexChain(index + 16)], alpha1);
				this.iconShine(this.frameArr[this.indexChain(index + 16 - 1)], alpha2);
				this.iconShine(this.frameArr[this.indexChain(index + 16 - 2)], 0);

				this.iconShine(this.frameArr[this.indexChain(index + 24)], alpha1);
				this.iconShine(this.frameArr[this.indexChain(index + 24 - 1)], alpha2);
				this.iconShine(this.frameArr[this.indexChain(index + 24 - 2)], 0);
				index = this.indexChain(index + 1);
			}, this, 1000);
			this.shineIntervKeyArr.push(shineIntervKey);
		}

		private indexChain(index: number): number {
			let length = this.frameArr.length;
			if (index >= length) {
				index -= length;
			} else if (index < 0) {
				index += length;
			}
			return index;
		}

		private iconShine(icon: eui.Image, alpha) {
			icon.alpha = alpha;
		}

		private onOnlinePlayer() {
			BcbmRequest.requestOnlinePlayer(0);
		}

		public initScene() {
			this.isStart = true;
			if (this.isInit) {
				this.init();
			}
		}

		public init() {
			egret.log("brnn battle scene init " + egret.getTimer());
			for (let anim of this.resultAnims) {
				anim.scaleX = anim.scaleY = 1;
			}
			this.bcbmData = new BcbmData();
			this.clearStatusAnim();
			this.updateScene();
			BcbmRequest.requestOPWinFail(0);
			BcbmSoundPlayer.instance.playBg();
			this.gameLevel.source = "bcbm_game_level" + RoomManager.getInstance().curRoomData.gameLevel;
			this.lockContinue = false;
		}
		public onCloseBattle() {
			this.clearAllTimeOut();
			egret.stopTick(this.updateCar, this);
			//egret.Tween.removeAllTweens();
			this.removeResult();
			this.stopWinAnim();
			this.battleStartCountDown.stop();
		}
		public ResumeScene() {
			if (game.RoomManager.getInstance().curRoomData == null) {
				RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, RoomManager.getInstance().curRoomData.gameLevel);
			}
			//this.clearAllTimeOut();
			//egret.stopTick(this.updateCar, this);
			//egret.Tween.removeAllTweens();
			this.clearStatusAnim();
			//this.chipContainer.removeChildren();
			this.removeResult();
			//this.resetAllCarBet();
			//for (var i = 0; i < this.frameArr.length; i++) {
			//	this.frameArr[i].alpha = 0;
			//}
			//BcbmRequest.requestOPWinFail(0);
			//this.stopWinAnim();
			this.updateScene();
		}
		public updateScene() {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			if (roomData == null) {
				return;
			}
			this.onlinePlayerBtn["bitLabel"].text = roomData.onlineCount;
			for (let i = 0; i < roomData.playerInfos.length; i++) {
				let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
				//console.error("========= init player info is ", playerInfo);
				BcbmData.getInstance().addPlayer(playerInfo);
			}
			//初始化庄家和自己的头像
			//console.log(">>>>>>>>>>bcbm playerinfo: ", roomData.playerInfos);
			for (let info of roomData.playerInfos) {
				if (info.postion == 0) {
					//this.bankerPlayerHead.playerType = 0;
					this.bankerPlayerHead.ShowPlayerHead(info);
					if (info.playerId == UserService.instance.playerId) {
						this.bankBtnCtrl(false);
						// console.error("self banker");
						this.isSelfBanker = this.bcbmMenu.isBanker = this.selfPlayerHead.isSelfBanker = true;
					} else {
						this.bankBtnCtrl(true);
						this.isSelfBanker = this.bcbmMenu.isBanker = this.selfPlayerHead.isSelfBanker = false;
					}
					this.refreshBtnState();
				} else if (info.playerId == UserService.instance.playerId) {
					this.selfPlayerHead.ShowPlayerHead(info);
					this.UpdateBetButton();
					this.tempBetGold = info.money;
					//console.error("=========== update scene ", this.tempBetGold);
				}
			}
		}

		public clearBattle() {
			// 清除所有筹码
			for (let i = 0; i < this.chipContainer.numChildren; i++) {
				egret.Tween.removeTweens(this.chipContainer.getChildAt(i));
			}
			this.chipContainer.removeChildren();
			this.stopWinAnim();
			this.removeResult();
			egret.stopTick(this.updateCar, this);
		}

		public updateOnlineNum(data) {
			this.onlinePlayerBtn["bitLabel"].text = data.length + '';
		}

		// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众		
		public updateHistory(data) {
			let group: eui.Group;
			let icon: BcbmHistoryIcon;
			var array = ["bsj5", "bsj9", "benz5", "benz9", "bmw5", "bmw9", "vw5", "vw9"];
			while (this.resultGroup.numChildren > 0) {
				this.resultGroup.removeChildAt(0);
			}
			this.resultScroller.verticalScrollBar.thumb.visible = false;
			// console.log('UpdateHistory ==== ', data.type);
			for (var i = 0; i < data.type.length; i++) {
				icon = new BcbmHistoryIcon();
				//console.warn(array[data.type[i]-1]);
				icon.icon.source = "bcbm_caricon_" + array[data.type[i] - 1];
				if (data.type[i] % 2 != 0) {
					icon.icon.scaleX = icon.icon.scaleY = 0.9;
				}
				if (i != data.type.length - 1) {
					this.resultGroup.addChild(icon);
					icon.x = 10;
					// console.warn(icon.width)
					// console.warn(icon.anchorOffsetX)
					// console.warn(icon.x)
				} else {
					group = new eui.Group;
					group.width = group.height = 52;
					this.resultGroup.addChild(group);
					this.resultBox = new eui.Image;
					this.resultBox.x = -9;
					this.resultBox.y = -8;
					this.resultBox.source = "bcbm_game_selectcar";
					group.addChild(this.resultBox)
					//this.flashImage(this.resultBox, true);
					group.addChild(icon);
				}
			}
			this.resultGroup.validateNow();
			this.resultGroup.validateSize();
			// console.log("scrollV == ", this.resultGroup.contentHeight, this.resultScroller.viewport.height, this.resultScroller.viewport.height);
			this.resultScroller.viewport.scrollV = this.resultGroup.contentHeight - this.resultScroller.viewport.height;
		}

		private onBankerHeadClick() {
			let p = this.bankerPlayerHead.headImg.localToGlobal(
				this.bankerPlayerHead.headImg.width,
				this.bankerPlayerHead.headImg.height)
			let roomData = RoomManager.getInstance().curRoomData;
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, {pos:p, gameType:roomData.gameType});
		}

		private onUpBanker(e: TouchEvent) {
			// console.error("------- tap upbanker ", e.currentTarget);
			//bcbmsound touch
			if (BcbmData.bankerUpMoneyLimit > this.tempBetGold) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:" + BcbmData.bankerUpMoneyLimit + "元",
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
			BcbmRequest.requestUpBanker(1);
		}

		private onDownBanker(e: TouchEvent) {
			BcbmRequest.requestDownBanker(1);
		}

		public updateBanker(data) {
			// console.warn('upBankers === ', data);
			if (data.bankerPlayerId == UserService.instance.playerId) {
				this.bankBtnCtrl(false);
				TipsUtils.showTipsFromCenter("申请成功！");
			}
			// console.warn("============= some one on banker");
			this.upBankerNum.text = '申请人数：' + data.bankerInfos.length;
		}

		public downBankers(data) {
			// console.warn('downBankers === ', data);
			// console.warn('isSelfBanker === ', this.isSelfBanker);
			if (data.bankerPlayerId == UserService.instance.playerId) {
				if (this.isSelfBanker) {
					if (this.isSwitchBanker != true) {
						TipsUtils.showTipsFromCenter("申请成功,下局下庄");
					}
				} else {
					TipsUtils.showTipsFromCenter("下庄成功");
					this.upBanker.visible = true;
					this.downBanker.visible = false;
					this.bankBtnCtrl(true);
				}
			} else {
				if (data.bankerInfos.length > 0) {
					this.upBanker.visible = true;
					this.downBanker.visible = !this.upBanker.visible;
					for (var i = 0; i < data.bankerInfos.length; i++) {
						if (data.bankerInfos[i].playerId == UserService.instance.playerId) {
							this.upBanker.visible = false;
							this.downBanker.visible = !this.upBanker.visible;
						}
					}
				}
			}
			this.upBankerNum.text = '申请人数：' + data.bankerInfos.length;
		}


		public backToMainBg() {

		}

		private chipHashInit() {
			this.chipHash = new Array();
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
			this.chipHash.push(new Array<BcbmBetButton>());
		}

		private clearTableChips(){
			this.chipContainer.removeChildren();
		}

		public firstEnterRoom(data) {
			CommonUtil.setNextFrameCall(() => {
				this.nextTickExec(data);
			}, this);
		}

		private selfBetValue;
		public nextTickExec(data) {
			console.log('firstEnterRoom === ', data);
			let isWaiting = true;
			this.isResultShow = false;
			this.bcbmMenu.isResultShown = false;
			//this.chipContainer.removeChildren();
			this.stopWinAnim();
			this.clearStatusAnim();
			this.clearWait();
			this.launchShine();
			var roomData = game.RoomManager.getInstance().curRoomData;
			this.selfBetValue = 0;
			var gameData = BcbmData.getInstance();

			//console.error(data.serialNumber, this.curGameRound);
			if (data.serialNumber == this.curGameRound && this.bcbmData) {
				// 补充不足的金币
				this.handleDeltaBet(data)
			} else {
				console.error("not handleDeltaBet");
				this.bcbmData = new BcbmData();
				this.clearBattle();
				this.resetAllCarBet();
				if (data.roomStakeInfo.length >= 1) {
					var stakeInfo = data.roomStakeInfo;
					var singleChip: BcbmBetButton;
					var stake;
					var myStake;
					var value;
					var type;
					var playerId;

					console.error(stakeInfo);
					console.error(this.bcbmData.RecordTypeBetMap);

					// console.log(">>>>>>>>>>>>>>>>>>>>>  roomStakeInfo is ", stakeInfo);

					for (let i = 0; i < stakeInfo.length; i++) {
						stake = stakeInfo[i];
						value = stake.value;
						type = stake.type;
						this.bcbmData.recordTypeBetInfo(type, value);
						var tarGrp = this.betTouchGroups[type - 1];
						for (let m = this.curBetNums.length - 1; m >= 0; m--) {
							let betNum = Math.floor(value / this.curBetNums[m]);
							if (betNum > 0) {
								for (let n = 0; n < betNum; n++) {
									singleChip = this.chipFactory(playerId, type, this.curBetNums[m]);
									this.chipContainer.addChild(singleChip);
									let level = RoomManager.getInstance().curRoomData.gameLevel;
									let name: string;
									if (level == 1) { name = "tiyan" }
									else if (level == 2) { name = "high" }
									let chipSource = "bcbm_chip_" + name + "_" + this.curBetNums[m];
									singleChip.showButton(chipSource);
									//设置筹码位置
									let offsetX = singleChip.width * singleChip.scaleX / 2 + Math.random() * (tarGrp.width - singleChip.width * singleChip.scaleX);
									let offsetY = singleChip.width * singleChip.scaleY / 2 + Math.random() * (tarGrp.height - singleChip.height * singleChip.scaleY);
									let point = tarGrp.localToGlobal(offsetX, offsetY);
									singleChip.randomRotation();
									singleChip.x = point.x;
									singleChip.y = point.y;
									this.chipHash[type - 1].push(singleChip);
									//this.updateCarBet(this.curBetNums[m], type);
								}
							}
							value -= this.curBetNums[m] * betNum;
						}
						this.carBetLabelArr[stake.type - 1].text = stake.value + "";
						this.carBetLabelArr[stake.type - 1].visible = true;
					}

					if (data.myStakeInfo != null) {
						//打印自己的注信息
						//console.error("my stake info is ", data.myStakeInfo);

						let myStakeInfo = data.myStakeInfo;
						for (let i = 0; i < myStakeInfo.length; i++) {
							myStake = myStakeInfo[i];
							if (myStake.value == 0) { continue; }
							value = myStake.value;
							type = myStake.type;
							this.selfBetValue += value;
							this.updateCarBetSelf(value, type);
						}
						if (this.selfBetValue > 0) {
							this.bcbmMenu.isSelfBet = true;
						}

						console.error("first init ", this.tempBetGold, this.selfBetValue)
						this.selfPlayerHead.showImmGold(this.tempBetGold);
					}
				}
			}
			this.curGameRound = data.serialNumber;


			if (data.myStakeInfo != null) {
				//打印自己的注信息
				//console.error("my stake info is ", data.myStakeInfo);
				isWaiting = false;
				if (data.status == 2) {
					isWaiting = true;
				}
				isWaiting = false;
				if (data.status == 2) {
					isWaiting = true;
				}
				console.error("first init ", this.tempBetGold, this.selfBetValue)
				this.selfPlayerHead.showImmGold(this.tempBetGold);
			}
			this.currStatus = <BcbmStatus>data.status;
			this.UpdateBetButton();
			//第一次进/重进 游戏，按不同状态设置界面

			//等待
			if (data.status == 0) {
				this.countdownTip.setImage("bcbm_game_idle");
				// console.error("first 0")
				this.countdownTip.showCount();
				this.battleStartCountDown.isPlaySound = false;
				this.battleStartCountDown.startCountDown(data.downTime);
				this.bcbmMenu.isSelfBet = false;
				this.bcbmData.clearRecortTypeBet();
				this.chipHashInit();
				this.clearTableChips();
				this.resetAllCarBet();
			} //下注 
			else if (data.status == 1) {
				//等待动画
				// if(isWaiting){
				// 	this.showStatusAnim(1);
				// }
				// console.error("first 1")
				roomData.status = game.GameStatus.RUNNING;
				this.countdownTip.setImage("bcbm_game_bet");
				this.countdownTip.showCount();
				this.battleStartCountDown.isPlaySound = true;
				this.battleStartCountDown.startCountDown(data.downTime);
				if (this.currBetButton == null && this.validateBetButton(this.betBtnArr[0])) {
					this.selectedBetButtonByIndex(0);
				}
				//this.tempBetGold -= this.selfBetValue;
				this.selfPlayerHead.showImmGold(this.tempBetGold);
			} else if (data.status >= 2) {
				let time: number = data.downTime;
				let finishData = data.BattleFinsh;

				this.battleFinishData = finishData;
				this.bcbmCar.winType = finishData.winType;
				this.bcbmCar.posRandomPlace = finishData.rondom;
				//todo
				//判断自己是否下注了
				if (this.selfBetValue > 0 && finishData != null) {
					//this.clearShineTimeOut();
					console.error("wintype is ", finishData.winType);
					this.showWinAnim(finishData.winType);
					if (time >= 8) {
						console.error("延时");
						let self = this;
						this.registerTimeout(function () {
							self.showResult(finishData);
						}, (time * 1000 - 8000));
					} else {
						console.error("立即");
						this.showResult(finishData);
					}
				} else {
					this.showWait(time * 1000 - 500);
				}
				this.clearShine();
				this.countdownTip.setImage("bcbm_game_open");
				this.countdownTip.showCount();
				this.battleStartCountDown.isPlaySound = false;
				this.battleStartCountDown.startCountDown(data.downTime);

				this.lockContinue = false;
			}

			if(data.status == 2) {
				this.parkCarAtWin();
			} else {
				this.resetCardToDataPos();
			}

			BcbmData.bankerUpMoneyLimit = data.upBankerMinMoney / 1000;
			//console.log("@@@@@@@@@@ data.upBankerMinMoney is" + data.upBankerMinMoney);
			//todo 上庄信息
			this.upBankerNum.text = "申请人数：" + data.upBankerNum;
			if (data.isBanker) {
				this.bankBtnCtrl(false);

				// console.error("self banker")
				this.isSelfBanker = this.bcbmMenu.isBanker = this.selfPlayerHead.isSelfBanker = true;

				this.refreshBtnState();
			}
		}

		public handleDeltaBet(data: any) {
			console.error("handleDeltaBet");
			var roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			var value;
			var type;
			var chip: BcbmBetButton;
			var tarGrp: eui.Group;
			var playerId;
			for (let stake of data.roomStakeInfo) {
				if (stake.value == 0) { continue; }
				type = stake.type;
				value = stake.value - this.bcbmData.getRecordTypeBet(type);
				this.bcbmData.recordTypeBetInfo(type, value);
				tarGrp = this.betTouchGroups[type - 1];
				for (let m = this.curBetNums.length - 1; m >= 0; m--) {
					let betNum = Math.floor(value / this.curBetNums[m]);
					if (betNum > 0) {
						for (let n = 0; n < betNum; n++) {
							chip = this.chipFactory(playerId, type, this.curBetNums[m]);
							this.chipContainer.addChild(chip);
							let level = RoomManager.getInstance().curRoomData.gameLevel;
							let name: string;
							if (level == 1) { name = "tiyan" }
							else if (level == 2) { name = "high" }
							let chipSource = "bcbm_chip_" + name + "_" + this.curBetNums[m];
							chip.showButton(chipSource);
							//设置筹码位置
							// let offsetX = Math.random() * (tarGrp.width - chip.width * chip.scaleX);
							// let offsetY = Math.random() * (tarGrp.height - chip.height * chip.scaleY);
							let offsetX = chip.width * chip.scaleX / 2 + Math.random() * (tarGrp.width - chip.width * chip.scaleX);
							let offsetY = chip.width * chip.scaleY / 2 + Math.random() * (tarGrp.height - chip.height * chip.scaleY);
							let point = tarGrp.localToGlobal(offsetX, offsetY);
							chip.randomRotation();
							chip.x = point.x;
							chip.y = point.y;
							this.chipHash[type - 1].push(chip);
							// this.updateCarBet(this.curBetNums[m], type);
						}
					}
					value -= this.curBetNums[m] * betNum;
				}
				this.carBetLabelArr[stake.type - 1].text = stake.value + "";
			}
			if (data.myStakeInfo != null) {
				//打印自己的注信息
				//console.error("my stake info is ", data.myStakeInfo);

				let myStakeInfo = data.myStakeInfo;
				for (let i = 0; i < myStakeInfo.length; i++) {
					if (myStakeInfo[i].value == 0) { continue; }
					value = myStakeInfo[i].value;
					type = myStakeInfo[i].type;
					this.selfBetValue += value;
				}
				if (this.selfBetValue > 0) {
					this.bcbmMenu.isSelfBet = true;
				}

				console.error("first init ", this.tempBetGold, this.selfBetValue)
				this.selfPlayerHead.showImmGold(this.tempBetGold);
			}

		}


		public showStatusAnim(status: number) {
			let sources = ["bcbm_btn_switch", "bcbm_btn_betstart", "bcbm_btn_betover"];
			let source = sources[status];
			this.statusAnimImg.source = source;

			egret.Tween.get(this.statusAnimImg).to({ x: 548 }, 250).wait(1500).call(() => {
				egret.Tween.get(this.statusAnimImg).to({ x: 1674 }, 250);
				//egret.Tween.removeTweens(this.statusAnimImg);
			}, this);
			egret.Tween.get(this.statusAnimBg).to({ x: 399 }, 250).wait(1500).call(() => {
				egret.Tween.get(this.statusAnimBg).to({ x: -727 }, 250);
				//egret.Tween.removeTweens(this.statusAnimBg);
			}, this);
		}

		public clearStatusAnim() {
			egret.Tween.removeTweens(this.statusAnimBg);
			egret.Tween.removeTweens(this.statusAnimImg);
			this.statusAnimBg.x = -727;
			this.statusAnimImg.x = 1674;
		}



		public pushBattleStatus(data) {
			this.currStatus = <BcbmStatus>data.status;
			this.continueBtn.enabled = false;
			switch (this.currStatus) {
				case 0:
					this.isResultShow = false;
					this.bcbmMenu.isResultShown = false;
					this.removeResult();
					this.stopWinAnim();
					this.launchShine();

					this.chipHashInit();
					this.clearTableChips();
					this.resetAllCarBet();

					BcbmRequest.requestOPWinFail(0);
					this.countdownTip.setImage("bcbm_game_idle");
					this.countdownTip.showCount();
					this.battleStartCountDown.isPlaySound = false;
					this.battleStartCountDown.startCountDown(data.downTime);
					this.curGameRound = data.serialNumber;
					this.selfBetValue = 0;
					this.bcbmMenu.isSelfBet = false;
					break;
				case 1:
					this.onStartBet(data);
					this.selfBetValue = 0;
					this.countdownTip.setImage("bcbm_game_bet");
					this.battleStartCountDown.isPlaySound = true;
					this.battleStartCountDown.startCountDown(data.downTime);
					break;
				case 2:
					this.onStopBet();
					this.clearShine();
					this.countdownTip.setImage("bcbm_game_open");
					this.countdownTip.showCount();
					this.battleStartCountDown.isPlaySound = false;
					this.battleStartCountDown.startCountDown(data.downTime);

					this.lockContinue = false;

					break;
			}
			if (data.isSwitchBanker == true) {
				this.showStatusAnim(0);
			}
			this.isSwitchBanker = data.isSwitchBanker;
			this.registerTimeout(function () {
				this.isSwitchBanker = false;
			}, 2000);
		}

		public onStartBet(data) {
			BcbmSoundPlayer.instance.playStartBet();
			this.chipContainer.removeChildren();
			this.resetAllCarBet();
			this.bcbmData.clearRecortTypeBet();

			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			roomData.status = game.GameStatus.RUNNING;

			//操作下注按钮
			//播放开始下注动画
			this.prevCache = this.cacheBet;
			//console.error("prevCache is ", this.prevCache);
			this.UpdateBetButton();
			if (this.validateBetButton(this.betBtnArr[0])) {
				this.betBtnArr[0].openLight(0);
			}
			this.currBetButton = this.betBtnArr[0];
			this.cacheBet = [];
			this.refreshBtnState();

			// var self = this;
			// this.registerTimeout(function () {
			// 	if (this.parent == null) {
			// 		return;
			// 	}
			// 	self.showStatusAnim(1);
			// }, 2000);
			this.showStatusAnim(1);
		}

		public onStopBet() {
			BcbmSoundPlayer.instance.playStopBet();
			//播放停止下注动画
			this.UpdateBetButton();
			this.showStatusAnim(2);
			this.refreshBtnState();
		}


		//test function
		private testWin: number = 1;
		private onTestWintype(e: egret.TouchEvent) {
			let btn: eui.Button = e.currentTarget;
			let index = this.testBtnGroup.indexOf(btn);
			this.testWin = index + 1;
		}
		//结算入口方法
		private battleFinishData: any;
		public onBattleFinish(data) {
			console.error("-------onBattleFinish")
			this.battleFinishData = data;
			for(let battleInfo of data.battleInfo) {
				if(Number(battleInfo.playerId) == UserService.instance.playerId) {
					this.bcbmData.selfMoney = battleInfo.totalMoney;
				}
			}
			//console.warn("==============battle finish is ", data);
			this.bcbmCar.winType = data.winType;
			this.bcbmCar.posRandomPlace = data.rondom;
			this.moveCar();

			//old
			/*		
			let lap = CommonUtil.RandomRangeInt(2, 3);
			let newWinType = this.frameArr.length * lap + BcbmBattleScene.getPosByWinType(data.winType) - this.lastWinNode + 1;
			if (newWinType - this.lastWinNode < this.frameArr.length) {
				newWinType = this.frameArr.length * (lap + 1) + BcbmBattleScene.getPosByWinType(data.winType) - this.lastWinNode + 1;
			}

			let self = this;
			let pointer = 0;
			let acc = 0;
			let acc2 = 0;
			let stime = 200;
			let maxStime = 70;
			let max = false;
			egret.Tween.removeTweens(this.tempCar)
			for (var i = 0; i < newWinType; i++) {
				if (max) {
					if (i >= newWinType - 10) {
						acc2 += 0.5
						acc += 0.5;
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
				// console.warn("========= stime is " + stime);
				// console.error("========= move car " + i);
				this.registerTimeout(function () {
					let win = pointer + self.lastWinNode;
					win = win % self.frameArr.length;
					//self.flashImage(self.frameArr[win]);
					//bcbmsound flash skip

					let node0 = self.carNodes[win - 1];
					let node = self.carNodes[win];
					let car = self.tempCar;

					//FqzsSoundPlayer.instance.playSkip();
					pointer++;
					if (pointer == newWinType) {
						//self.frameArr[win].alpha = 1;
						//self.lastWinNode = win;
						self.flyLoseBet(data);
						//self.showWinAnim(data.winType);
					}
				}, i * stime);
			}*/
		}

		public static carNodeToPath(carNode: number): number {
			let pathNode: number;
			pathNode = BcbmBattleScene.typeIndexOfAllNodes[carNode];
			return pathNode;
		}
		public static pathNodeToCar(pathNode: number): number {
			let carNode: number;
			carNode = BcbmBattleScene.typeIndexOfAllNodes.indexOf(pathNode);
			return carNode;
		}

		private resetCardToDataPos() {
			if(this.lastWinNode > 0) {
				this.bcbmCar.prevFinalNode = BcbmBattleScene.carNodeToPath(this.lastWinNode);
				let startIndex = this.bcbmCar.prevFinalNode;
				let node = CarMotion.getInstance().getCarPathNodeByIndex(startIndex);
				this.bcbmCar.x = node.getPoint().x;
				this.bcbmCar.y = node.getPoint().y;
				this.bcbmCar.curPathNode = node;
			} else {
				this.bcbmCar.prevFinalNode = 0;
				let node = CarMotion.getInstance().getCarPathNodeByIndex(this.bcbmCar.prevFinalNode);
				this.bcbmCar.x = node.getPoint().x;
				this.bcbmCar.y = node.getPoint().y;
				this.bcbmCar.curPathNode = node;
			}
		}

		private moveCar() {
			CarMotion.getInstance().startMove(this.bcbmCar, ()=>{
				this.lastWinNode = BcbmBattleScene.pathNodeToCar(this.bcbmCar.getPosByWintype(this.bcbmCar.winType));
				this.showWinAnim(this.bcbmCar.winType);
				this.bcbmCar.playCarAnim();
				this.flyLoseBet();
				this.bcbmCar.isFinal = true;
				this.stopCar();
			}, this, (index:number)=>{
				var typeIndex = BcbmBattleScene.pathNodeToCar(index);
				if (typeIndex != -1) {
					this.flashImage(this.frameArr[typeIndex]);
					BcbmSoundPlayer.instance.playSkip();
				}
			}, this);
		}

		public updateCar(timestamp: number): boolean {
			var delta: number = timestamp - this.bcbmCar.lastTickTime;
			// 计算目标点与当前位置的差值
			let distance = this.bcbmCar.speed / 85;
			if (egret.Point.distance(new egret.Point(this.bcbmCar.x, this.bcbmCar.y), this.bcbmCar.curPathNode.nextCarPathNode.getPoint()) < distance) {
				// 差不多到达了
				//经过的车标点闪烁,通过prevnode获取点
				let lastNode: number[] = [this.bcbmCar.curPathNode.x, this.bcbmCar.curPathNode.y];
				for (let node of CarMotion.getInstance().pathNodeList) {
					if (lastNode[0] == node.x && lastNode[1] == node.y) {
						let index = CarMotion.getInstance().pathNodeList.indexOf(node);
					}
				}
				//获取点的方法2
				let index2 = (this.bcbmCar.pointer + this.bcbmCar.prevFinalNode) % CarMotion.getInstance().pathNodeList.length;
				//获取path index 对应的type index，如果无对应则略过
				var typeIndex = BcbmBattleScene.pathNodeToCar(index2);
				if (typeIndex != -1) {
					this.flashImage(this.frameArr[typeIndex]);
					BcbmSoundPlayer.instance.playSkip();
				}
				this.bcbmCar.curPathNode = this.bcbmCar.curPathNode.nextCarPathNode;
				this.bcbmCar.pointer++;
			}

			// 控制显示朝向			
			this.bcbmCar.lookAt(this.bcbmCar.curPathNode.nextCarPathNode);
			// 朝目标前进
			let pos: egret.Point = this.bcbmCar.curPathNode.nextCarPathNode.getPoint();
			let moveDir = new egret.Point(pos.x - this.bcbmCar.x, pos.y - this.bcbmCar.y);
			moveDir.normalize(1);
			this.bcbmCar.x += moveDir.x * (delta / 1000) * this.bcbmCar.speed;
			this.bcbmCar.y += moveDir.y * (delta / 1000) * this.bcbmCar.speed;
			this.bcbmCar.lastTickTime = timestamp;

			//加速
			if (!this.bcbmCar.isMax) {
				//console.error("+++")
				if (this.bcbmCar.speed < this.bcbmCar.speedMax) {
					this.bcbmCar.speed += this.bcbmCar.acc;
				} else {
					this.bcbmCar.isMax = true;
				}
			}


			//减速
			if (this.bcbmCar.pointer >= this.bcbmCar.slowNodeNum) {
				//console.error(this.bcbmCar.pointer);
				if (this.bcbmCar.speed <= 0) {
					this.bcbmCar.speed = 0;
					//test	
					// console.warn(this.bcbmCar.finalNodeNum);
					// egret.stopTick(this.updateCar, this);
					// egret.setTimeout(this.moveCar, this, 3000);

					if (this.bcbmCar.pointer != this.bcbmCar.finalNodeNum) {
						console.error("=================car stop")
						//pathIndex -= 1;
						this.lastWinNode = BcbmBattleScene.pathNodeToCar(this.bcbmCar.getPosByWintype(this.bcbmCar.winType));
						this.showWinAnim(this.bcbmCar.winType);
						this.bcbmCar.playCarAnim();
						this.flyLoseBet();
						this.bcbmCar.isFinal = true;
						this.stopCar();
					}
				} else {
					//console.error("---");
					if (this.bcbmCar.acc2 > 0) {
						this.bcbmCar.acc2 -= this.bcbmCar.accc;
					} else {
						this.bcbmCar.acc2 = 0.8;
					}
					if (this.bcbmCar.pointer == this.bcbmCar.finalNodeNum) {
						this.bcbmCar.acc2 = 15;
						if (!this.bcbmCar.isFinal) {
							BcbmSoundPlayer.instance.playSkip();
							let pathIndex = (this.bcbmCar.finalNodeNum + this.bcbmCar.prevFinalNode) % this.carNodes.length;
							this.lastWinNode = BcbmBattleScene.pathNodeToCar(pathIndex);
							// console.warn("-----------pathnode is ", pathIndex);
							// console.warn("-----------on end last node is ", this.lastWinNode);
							// console.error("=============", this.bcbmCar.pointer);
							//处理误差，车可能不在目标点
							if (this.lastWinNode < 0) {
								//pathIndex -= 1;
								this.lastWinNode = BcbmBattleScene.pathNodeToCar(this.bcbmCar.getPosByWintype(this.bcbmCar.winType));
							}
							this.showWinAnim(this.bcbmCar.winType);
							this.bcbmCar.playCarAnim();
							this.flyLoseBet();
							this.bcbmCar.isFinal = true;
							this.stopCar();
						}
					}
					this.bcbmCar.speed -= this.bcbmCar.acc2;
				}
			}
			return false;
		}

		//// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众

		public showWinAnim(type): void {
			//bcbmsound battle end, win type
			//播放光圈
			this.circleLightAnim.visible = true;
			this.rootGroup.addChild(this.circleLightAnim);
			// this.circleLightAnim.visible = true;
			this.circleLightAnim.playOnce(10)
			//有错误
			//let targetIcon = this.frameArr[this.lastWinNode];
			let targetIcon = this.frameArr[BcbmBattleScene.pathNodeToCar(this.bcbmCar.getPosByWintype(type))];
			// console.error("showWinAnim car node ", this.bcbmCar.getPosByWintype(type))
			// console.error("showWinAnim path node ", BcbmBattleScene.pathNodeToCar(this.bcbmCar.getPosByWintype(type)))
			let circleX = targetIcon.x + targetIcon.width / 2;
			let circleY = targetIcon.y + targetIcon.height / 2;
			// console.error(this.lastWinType)
			// console.warn(circleX);
			// console.warn(circleY);
			this.circleLightAnim.x = circleX;// + 145;
			this.circleLightAnim.y = circleY;
			this.circleLightAnim.touchChildren = false;
			this.circleLightAnim.touchEnabled = false;

			//播放中奖car类型
			let index = Math.floor((type + 1) / 2) - 1;
			this.curResultAnim = this.resultAnims[index];
			this.curResultAnim.visible = true;
			let resultGroup = this.resultGroups[type - 1];
			resultGroup.addChild(this.curResultAnim);
			this.curResultAnim.playOnce(5);
			this.curResultAnim.x = 53;
			this.curResultAnim.y = 53;
			this.curResultAnim.scaleX = this.curResultAnim.scaleY = 1.2;
			if (type % 2 == 0) {
				//console.error("缩小", this.curResultAnim.width, this.curResultAnim.height);
				this.curResultAnim.scaleY = 0.85;
				this.curResultAnim.scaleX = 0.85;
			}
		}

		//飞输的筹码
		private flyLoseBet() {
			var data = this.battleFinishData;
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var chip: BcbmBetButton;
			var edgeWin: number = 0;
			// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众		

			for (var i = 0; i < this.chipHash.length; i++) {
				if (this.chipHash[i] && this.chipHash[i].length > 0) {
					for (let j = 0; j < this.chipHash[i].length; j++) {
						chip = this.chipHash[i][j];
						// console.log('betBtn === ', betBtn.type, data.winType, edgeWin);
						if (chip.type == data.winType) {
						} else {
							to = this.bankerHeadImg;
							from = this.betTouchGroups[i];
							//this.flyChip(chip, 0, 0, from, to, true, false);
							if (j > 20) {
								this.flyBetBtnByPlayerFocus(chip, 0, 0, from, to, 650 + 20 * 25, false);
							} else {
								this.flyBetBtnByPlayerFocus(chip, 0, 0, from, to, 650 + 20 * j);
							}
						}
					}
				}
				if (i == (this.chipHash.length - 1)) {
					console.log('flyLoseBet === ', i, this.chipHash.length - 1);
					this.registerTimeout(function () {
						this.flyWinBet(data);
					}, 1400);
				}
			}
		}

		//飞赢的筹码
		private flyWinBet(data) {
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var chip: BcbmBetButton;
			// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众		
			let num = 0;

			var winType: number = data.winType - 1;
			var winChip: any = this.chipHash[winType];
			var addWinChip: Array<BcbmBetButton> = [];
			if (winChip != null) {
				for (let j = 0; j < winChip.length; j++) {
					chip = winChip[j];
					var newChip = this.chipFactory(chip.playerId, chip.type, chip.value);
					this.chipContainer.addChild(newChip);
					addWinChip.push(newChip);
					let level = RoomManager.getInstance().curRoomData.gameLevel;
					let name: string;
					if (level == 1) { name = "tiyan" }
					else if (level == 2) { name = "high" }
					let chipSource = "bcbm_chip_" + name + "_" + chip.value;
					newChip.showButton(chipSource);
					from = this.bankerHeadImg;
					newChip.x = from.localToGlobal().x;
					newChip.y = from.localToGlobal().y;
					to = this.betTouchGroups[winType];
					let offsetX = newChip.width * newChip.scaleX / 2 + Math.random() * (to.width - newChip.width * newChip.scaleX);
					let offsetY = newChip.width * newChip.scaleY / 2 + Math.random() * (to.height - newChip.height * newChip.scaleY);
					//this.flyChip(newChip, offsetX, offsetY, from, to, false, true);
					// if (j > 20) {
					//     this.flyBetBtntoPlayer(newChip, offsetX, offsetY, from, to, 650 + 20 * 25, false);
					// } else {
					this.flyBetBtntoPlayer(newChip, offsetX, offsetY, from, to, (650 + 20 * j));
					num++;
					// }	

				}
				for (var i = 0; i < addWinChip.length; i++) {
					this.chipHash[winType].push(addWinChip[i]);
				}
			}
			this.registerTimeout(()=> {
				this.flyPosBet(data);
			}, 800);

		}

		//飞对应位置筹码(自己或者玩家)
		private flyPosBet(data) {
			var from: egret.DisplayObject;
			var to: egret.DisplayObject;
			var chip: BcbmBetButton;

			var winType: number = data.winType - 1;
			var winChip: any = this.chipHash[winType];


			if (winChip != null) {
				for (var i = 0; i < winChip.length; i++) {
					var chip: BcbmBetButton = winChip[i];
					if(Number(chip.playerId) == UserService.instance.playerId){
						to = this.selfHeadImg;
					}else{
						to = this.onlinePlayerBtnImg;
					}
					from = this.betTouchGroups[winType];
					this.flyBetBtnByPlayerFocus(chip, 0, 0, from, to, 650 + 20 * i , false);
				}
			}
			this.registerTimeout(() => {
				this.showResult(data);
			}, 1000);

		}
		//设置结算页面
		// public showResult(isWin: boolean, winType, cityArr: Array<string>, costMoneyArr: Array<number>) {
		public showResult(data) {
			//是否已经弹出结算面板
			if (this.isResultShow) {
				return;
			}
			let battleInfo = data.battleInfo;
			let battleInfo2 = data.rankInfo;
			let winType = data.winType;
			//console.warn("======", battleInfo);
			//console.warn(winType); 
			let selfCostMoney: number;
			let isWin: boolean;
			//城市和金额列表
			let cityArr: Array<string> = new Array<string>();
			let costMoneyArr: Array<number> = new Array<number>();
			let cityArr2: Array<string> = new Array<string>();
			let costMoneyArr2: Array<number> = new Array<number>();

			for (let info of battleInfo) {
				cityArr.push(info.nickName);
				costMoneyArr.push(info.costMoney);

				if (info.playerId == UserService.instance.playerId) {
					selfCostMoney = info.costMoney;
					//结算更新自己的钱				
					// this.tempBetGold = info.totalMoney;
					//console.error("--------result panel, battle info self total money is ", info.totalMoney);
					this.tempBetGold = this.bcbmData.selfMoney;
					this.selfPlayerHead.showImmGold(this.tempBetGold);
					isWin = this.selfWin(selfCostMoney);
				}
			}
			for (let info of battleInfo2) {
				cityArr2.push(info.nickName);
				costMoneyArr2.push(info.costMoney);
			}
			BcbmRequest.requestOPWinFail(0);

			if (this.resultPanel == null) {
				this.resultPanel = new BcbmResultPanel(isWin);
			} else {
				this.resultPanel.isWin = isWin;
			}
			if (isWin) {
				BcbmSoundPlayer.instance.playWin();
			} else {
				BcbmSoundPlayer.instance.playLose();
			}
			this.resultPanel.initPanel(winType, cityArr, costMoneyArr, cityArr2, costMoneyArr2);
			this.isResultShow = true;
			this.bcbmMenu.isResultShown = true;
			PopUpManager.addPopUp(this.resultPanel, true, 0, 0, 1);

		}
		public removeResult() {
			if (this.resultPanel) {
				this.resultPanel.stopAnim();
				PopUpManager.removePopUp(this.resultPanel, 1);
			}
		}

		public selfWin(money: number): boolean {
			return (money >= 0);
		}

		// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众	
		//暂时没用到	
		public static getPosByWinType(winType: number): number {
			let frameId: number = 0;
			switch (winType) {
				case 1:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 4;
					break;
				case 2:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 5;
					break;
				case 3:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 6;
					break;
				case 4:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 7;
					break;
				case 5:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8;
					break;
				case 6:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 1;
					break;
				case 7:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 2;
					break;
				case 8:
					frameId = CommonUtil.RandomRangeInt(0, 4) * 8 + 3;
					break;
			}
			// console.log('imgId === ' + frameId);

			if (frameId != 0) {
				return frameId - 1;
			} else {
				return null;
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




		//停止结果动画，在  调用
		public stopWinAnim() {
			if (this.circleLightAnim) {
				this.circleLightAnim.stop();
				this.circleLightAnim.visible = false;
			}
			if (this.curResultAnim) {
				this.curResultAnim.stop();
				this.curResultAnim.visible = false;
				// this.curResultAnim = null;
			}
			for (let anim of this.resultAnims) {
				anim.scaleX = anim.scaleY = 1;
			}
			for(let anim of this.resultAnims){
				anim.stop();
				anim.visible = false;
			}
		}

		public showWait(timeLimit: number) {
			this.waitAnim.visible = true;
			this.waitAnim.play();
			let self = this;
			this.registerTimeout(function () {
				self.waitAnim.stop();
				self.waitAnim.visible = false;
			}, timeLimit);
			// let w = egret.lifecycle.stage.stageWidth;
			// let h = egret.lifecycle.stage.stageHeight;
			// if (w / h > 1334 / 750) {
			// 	this.waitAnim.x = this.parent.width / 2 - 150;
			// } else {
			// 	this.waitAnim.x = this.parent.width / 2;
			// }
			// this.waitAnim.y = this.parent.height / 2;
		}

		public clearWait() {
			if (this.waitAnim) {
				this.waitAnim.stop();
				this.waitAnim.visible = false;
			}
		}

		public selectedBetButton(e: egret.TouchEvent) {
			SoundMenager.instance.PlayClick();
			let index = this.betBtnArr.indexOf(e.currentTarget);
			if (index > -1) {
				this.selectedBetButtonByIndex(index);
			}
		}

		private selectedBetButtonByIndex(index: number) {
			for (let i = 0; i < this.betBtnArr.length; i++) {
				if (i == index) {
					this.betBtnArr[i].openLight(i);
					this.currBetButton = this.betBtnArr[i];
				} else {
					this.betBtnArr[i].closeLight();
				}
			}
		}

		public chipFactory(playerId: number, type: number, betNum: number): BcbmBetButton {
			var chip = new BcbmBetButton();
			chip.enabled = false;
			chip.touchEnabled = false;
			chip.touchChildren = false;
			chip.anchorOffsetX = chip.width / 2;
			chip.anchorOffsetY = chip.height / 2;
			chip.scaleX = chip.scaleY = 0.48;
			chip.value = betNum;
			chip.type = type;
			chip.playerId = playerId;
			return chip;
		}

		private startStakeTap(e: egret.TouchEvent) {
			BcbmSoundPlayer.instance.playTouch();
			if (BcbmData.getInstance().getPlayerById(UserService.instance.playerId) == null) {
				return;
			}
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			var buttonValue = this.getBetButtonValue(this.currBetButton);
			// console.warn("========== current button is ", this.currBetButton);
			// console.warn("========== bet value is "+ buttonValue);

			if (this.currStatus != BcbmStatus.bet) {
				TipsUtils.showTipsFromCenter("请稍等，还没到下注时间！");
				return
			}

			//如果自己是庄家.isselfbanker属性不一定准确
			// if(roomData.getPlayerInfoByPos(0).playerId == UserService.instance.playerId){
			if (this.isSelfBanker) {
				TipsUtils.showTipsFromCenter("您是庄家，当前不能下注！");
				return;
			}

			if (this.currBetButton == null) {
				return;
			}
			//console.warn("========== player money is "+ BcbmData.getInstance().getPlayerById(UserService.instance.playerId).totalMoney);

			//不再设置最低金额
			/*
			if (BcbmData.getInstance().getPlayerById(UserService.instance.playerId).totalMoney < roomData.enterMinMoney) {
				TipsUtils.moneyTipsGame(this, roomData.enterMinMoney);
				return;
			}
			*/

			//console.warn("========== tempBetGold is "+ this.tempBetGold);
			if (this.tempBetGold < buttonValue) {
				// TipsUtils.moneyTipsGame(this, buttonValue);
				TipsUtils.showTipsFromCenter("当前金币不足！");
				return;
			}

			let touchMask: eui.Image;
			for (let i = 0; i < this.touchMaskArr.length; i++) {
				touchMask = this.touchMaskArr[i];
				if (e.currentTarget == touchMask) {
					if (!this.validateBetButton(this.currBetButton)) {
						return;
					}
					let betType = i + 1;
					this.tempBetGold -= buttonValue;
					BcbmData.getInstance().getPlayerById(UserService.instance.playerId).money = this.tempBetGold;
					this.selfPlayerHead.showImmGold(this.tempBetGold);
					if (this.tempBetGold < buttonValue) {
						for (let i = this.betBtnArr.length - 1; i >= 0; i--) {
							if (this.validateBetButton(this.betBtnArr[i])) {
								this.currBetButton = this.betBtnArr[i];
								this.currBetButton.openLight(i);
								break;
							}
							// this.currBetButton = null;
							this.currBetButton = this.betBtnArr[0];
						}
						/*
						//下注时余额不足时，筹码后移1个
						let index = this.curBetNums.indexOf(buttonValue);
						console.error("---------- button index is ", index);
						if(index > 0){
							this.currBetButton = this.betBtnArr[index - 1];
							this.currBetButton.openLight();
						} else if(index == 0){
							this.currBetButton = null;
						}
						// this.currBetButton = this.betBtnArr[0];
						// this.currBetButton.openLight();
						*/
					}
					this.UpdateBetButton();
					BcbmRequest.SendBets(betType, buttonValue);
					this.cacheBet.push({ betType, buttonValue });
					this.bcbmMenu.isSelfBet = true;
				}
			}
		}

		private tapEffect(e: egret.TouchEvent) {
			let mask: eui.Image = e.currentTarget;
			mask.alpha = 1;
		}
		private tapEffectOff(e: egret.TouchEvent) {
			let mask: eui.Image = e.currentTarget;
			mask.alpha = 0;
		}


		//续押
		private onContinueButton(event: egret.TouchEvent) {
			for (let data of this.prevCache) {
				if (this.tempBetGold < data.buttonValue) {
					TipsUtils.moneyTipsGame(this, data.buttonValue);
					return;
				}
				this.tempBetGold -= data.buttonValue;
				BcbmData.getInstance().getPlayerById(UserService.instance.playerId).money = this.tempBetGold;
				this.selfPlayerHead.showImmGold(this.tempBetGold);
				this.refreshBtnState();
				//this.stakeEffect(UserService.instance.playerId, data.betType, data.buttonValue);
				BcbmRequest.SendBets(data.betType, data.buttonValue);
				let betType = data.betType;
				let buttonValue = data.buttonValue;
				this.cacheBet.push({ betType, buttonValue });
			}
			this.continueBtn.enabled = false;
			this.lockContinue = true;
		}

		public onStakeRet(data) {
			if (data.value == 0) {
				//this.carBetLabelArrSelf[i].text = data.myStakeInfo[i].value;
				return;
			}
			if (this.bcbmData) {
				this.bcbmData.recordTypeBetInfo(data.type, data.value);
			}
			//console.warn("=============stake return is ", data);
			//let betGroup = this.carBetLabelArr[data.type - 1];
			// if (data.playerId != UserService.instance.playerId) {
			// 	let chip = this.stakeEffect(data.playerId, data.type, data.value);
			// 	this.updateCarBet(data.value, data.type);
			// }

			// else if (data.playerId == UserService.instance.playerId) {
			// 	let chip = this.stakeEffect(data.playerId, data.type, data.value);
			// 	this.updateCarBetSelf(data.value, data.type);
			// }

			if (data.playerId == UserService.instance.playerId) {
				let chip = this.stakeEffect(data.playerId, data.type, data.value);
				this.updateCarBetSelf(data.value, data.type);
			}

			else {
				let chip = this.stakeEffect(data.playerId, data.type, data.value);
			}
			// console.error(data.type, data.totalValue);
			this.carBetLabelArr[data.type - 1].text = data.totalValue + "";
			this.carBetLabelArr[data.type - 1].visible = true;
			//	this.updateCarBet(data.value, data.type);

		}

		private UpdateBetButton() {
			if (this.currStatus == BcbmStatus.bet) {
				this.refreshBtnState();
				// console.error("-----cacheBet ", this.cacheBet);
				if (/*this.cacheBet.length > 0 && */!this.isSelfBanker) {
					if (!this.prevCache) {
						this.continueBtn.enabled = false;
						return;
					}
					if (this.prevCache.length < 1) {
						this.continueBtn.enabled = false;
						return;
					}
					// console.error(this.prevCache);
					let bettings = this.prevCache;
					let cacheTotal: number = 0;
					for (let betting of bettings) {
						cacheTotal += betting.buttonValue;
					}
					// console.error("-----cache total is ", cacheTotal);
					// console.error("-----this.temp gold is ", this.tempBetGold);
					//判断续押是否生效
					if (this.tempBetGold < cacheTotal) {
						this.continueBtn.enabled = false;
					} else if(this.lockContinue){
						this.continueBtn.enabled = false;
					} else {
						this.continueBtn.enabled = true;
					}
				}
			} else {
				this.refreshBtnState();
				this.currBetButton = null;
				this.continueBtn.enabled = false;
			}
		}

		private stakeEffect(playerId, type, betNum) {
			if (type == 0 || type == null) {
				console.log("type =================== null");
				return;
			}
			let from: any = this.onlinePlayerBtnImg;
			if (playerId == UserService.instance.playerId) {
				let chipButtonIndex = this.curBetNums.indexOf(betNum);
				if(chipButtonIndex >= 0){
					from = this.betBtnArr[chipButtonIndex];
				}
			} else {
				from = this.onlinePlayerBtnImg;
			}
			var to = this.betTouchGroups[type - 1];
			var singleChip = this.chipFactory(playerId, type, betNum);
			this.chipContainer.addChild(singleChip);
			let level = RoomManager.getInstance().curRoomData.gameLevel;
			let name: string;
			if (level == 1) { name = "tiyan" }
			else if (level == 2) { name = "high" }
			let chipSource = "bcbm_chip_" + name + "_" + betNum;
			singleChip.showButton(chipSource);

			let offsetX = singleChip.width * singleChip.scaleX / 2 + Math.random() * (to.width - singleChip.width * singleChip.scaleX);
			let offsetY = singleChip.width * singleChip.scaleY / 2 + Math.random() * (to.height - singleChip.height * singleChip.scaleY);

			singleChip.x = from.localToGlobal().x + 55;
			singleChip.y = from.localToGlobal().y + 60;
			this.flyChip(singleChip, offsetX, offsetY, from, to);

			return singleChip;
		}

		private flyChip(chip, offsetX, offsetY, from, to, remove = false, save = true) {
			chip.randomRotation();
			let point = to.localToGlobal(offsetX, offsetY);
			egret.Tween.get(chip).to({ x: point.x, y: point.y }, 500, egret.Ease.quartOut).call(() => {
				BcbmSoundPlayer.instance.playChip();
				if (remove && chip.parent != null) {
					chip.parent.removeChild(chip);
				}
				if (save) {
					this.chipHash[(chip.type - 1)].push(chip);
				}
			}, this);
		}

		private flyBetBtnByPlayerFocus(betBtn, offsetX, offsetY, from, to, addTime: number, isSound: boolean = false, remove = true) {
			if (!to) return;
			let point = to.localToGlobal(to.width / 2, to.height / 2);
			betBtn.randomRotation();
			if (betBtn.parent) {
				point = betBtn.parent.globalToLocal(point.x, point.y);
				egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, addTime, egret.Ease.backIn).call(() => {
					if (betBtn.stage && isSound) BcbmSoundPlayer.instance.playChip();
					if (remove && betBtn.parent != null) {
						betBtn.parent.removeChild(betBtn);
					}
				}, this);
			}

		}
		private flyBetBtntoPlayer(betBtn, offsetX, offsetY, from, to, addTime: number, isSound: boolean = false, save = true) {
			betBtn.randomRotation();
			let point = to.localToGlobal(offsetX, offsetY);
			egret.Tween.get(betBtn).to({ x: point.x, y: point.y }, addTime, egret.Ease.quartOut).call(() => {
				if (betBtn.stage && isSound) BcbmSoundPlayer.instance.playChip();
			}, this);
		}

		private onGoldAdd() {

		}

		private validateBetButton(betButton): boolean {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			if (roomData.gameLevel > 0) {
				let minEnterMoney = RoomManager.getInstance().curRoomData.enterMinMoney;
				//不再设置最低金额
				minEnterMoney = 1;
				// console.warn("tempBetGold//minEnterMoney//this.getBetButtonValue(betButton)")
				// console.warn(this.tempBetGold)
				// console.warn(minEnterMoney)
				// console.warn(this.getBetButtonValue(betButton))
				if (this.tempBetGold > minEnterMoney && this.tempBetGold > this.getBetButtonValue(betButton)) {
					return true;
				}
			} else {
				if (BcbmData.getInstance() != null && BcbmData.getInstance().getPlayerById(UserService.instance.playerId) != null && BcbmData.getInstance().getPlayerById(UserService.instance.playerId).totalMoney > this.getBetButtonValue(betButton)) {
					return true;
				}
			}
			return false;
		}
		private getBetButtonValue(betButton) {
			switch (betButton) {
				case this.betButton1: {
					return this.curBetNums[0];
				}
				case this.betButton5: {
					return this.curBetNums[1];
				}
				case this.betButton10: {
					return this.curBetNums[2];
				}
				case this.betButton50: {
					return this.curBetNums[3];
				}
				case this.betButton100: {
					return this.curBetNums[4];
				}
				case this.betButton200: {
					return this.curBetNums[5];
				}
			}
			return 0;
		}
		private refreshBtnState() {
			let minEnterMoney = RoomManager.getInstance().curRoomData.enterMinMoney;
			//不再设置最低金额
			minEnterMoney = 1;
			if (this.currStatus == BcbmStatus.bet && !this.isSelfBanker) {
				//for (let btn of this.betBtnArr) {
				for (let i: number = this.betBtnArr.length - 1; i >= 0; i--) {
					let btn = this.betBtnArr[i];
					let v = this.getBetButtonValue(btn);
					if (this.tempBetGold < minEnterMoney || this.tempBetGold < v) {
						btn.canChoose = false;
					} else if (this.tempBetGold > minEnterMoney && this.tempBetGold > v) {
						btn.canChoose = true;

					}
				}
			} else {
				for (let btn of this.betBtnArr) {
					btn.canChoose = false;
				}
			}
		}
		//// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众
		private getGroupType(typeBetInfo: eui.Image): number {
			switch (typeBetInfo) {
				case this.touchMask0:
					return 1;
				case this.touchMask1:
					return 3;
				case this.touchMask2:
					return 5;
				case this.touchMask3:
					return 7;
				case this.touchMask4:
					return 2;
				case this.touchMask5:
					return 4;
				case this.touchMask6:
					return 6;
				case this.touchMask7:
					return 8;
			}
			return 0;
		}

		public initChips() {
			let gameLevel = RoomManager.getInstance().curRoomData.gameLevel;
			//console.warn(">>>>>>>>>>>>>gameLevel is " + gameLevel);
			let levelName: string;
			switch (gameLevel) {
				case 1:
					this.curBetNums = this.level0BetNums;
					levelName = "tiyan";
					break;
				case 2:
					this.curBetNums = this.level1BetNums;
					levelName = "high";
					break;
			}
			for (let i = 0; i < this.betBtnArr.length; i++) {
				let betBtnSource = "bcbm_chip_" + levelName + "_" + this.curBetNums[i].toString();
				this.betBtnArr[i].showButton(betBtnSource);
			}
		}

		public resetAllCarBet() {
			for (let i = 0; i < this.carBetLabelArr.length; i++) {
				this.carBetLabelArr[i].text = 0 + "";
				this.carBetLabelArr[i].visible = false;
				this.carBetData[i] = 0;
			}
			for (let i = 0; i < this.carBetLabelArrSelf.length; i++) {
				this.carBetLabelArrSelf[i].text = 0 + "";
				this.carBetLabelArrSelf[i].visible = false;
				this.carBetDataSelf[i] = 0;
			}
		}
		public updateAllCarBet(stakes: any) {
			if (stakes && stakes.length > 0) {
				for (let i = 0; i < stakes.length; i++) {
					this.updateCarBet(stakes[i].value, stakes[i].type)
				}
			}
		}

		public updateAllCarBetSelf(stakes: any) {
			if (stakes && stakes.length > 0) {
				for (let i = 0; i < stakes.length; i++) {
					this.updateCarBetSelf(stakes[i].value, stakes[i].type)
				}
			}
		}

		public updateCarBet(value: number, type) {
			this.carBetData[type - 1] = Number(this.carBetData[type - 1]) + value;
			this.carBetLabelArr[type - 1].text = String(Number(this.carBetData[type - 1]));
			this.carBetLabelArr[type - 1].visible = true;
		}

		public updateCarBetSelf(value: number, type) {
			this.carBetDataSelf[type - 1] = Number(this.carBetDataSelf[type - 1]) + value;
			this.carBetLabelArrSelf[type - 1].text = String(Number(this.carBetDataSelf[type - 1]));
			this.carBetLabelArrSelf[type - 1].visible = true;
		}

		public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
			this.tempBetGold += drawmoney;
			this.selfPlayerHead.showImmGold(this.tempBetGold);
			this.bcbmData.addMoney(drawmoney);
			if(this.bcbmData.getPlayerById(UserService.instance.playerId)){
				this.bcbmData.getPlayerById(UserService.instance.playerId).money = totalmoney;
			}
			this.UpdateBetButton();
		}

		protected onLeave() {
			super.onLeave();
			this.cacheBet = [];
			this.prevCache = [];
			this.continueBtn.enabled = false;
			this.clearBattle();
		}

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

		public stopCar() {
			this.bcbmCar.stopMotion();
			this.bcbmCar.playCarAnim();
		}

		public parkCarAtWin() {
			let pathNode = this.bcbmCar.getPosByWintype(this.bcbmCar.winType);
			if (pathNode < 0 || pathNode > CarMotion.getInstance().pathNodeList.length - 1) return;
			let parkNodePoint = CarMotion.getInstance().getCarPathNodeByIndex(pathNode);
			this.bcbmCar.x = parkNodePoint.x;
			this.bcbmCar.y = parkNodePoint.y;
			this.bcbmCar.curPathNode = parkNodePoint;
			this.bcbmCar.playCarAnim();
			this.bcbmCar.lookAt(parkNodePoint.nextCarPathNode);
			this.stopCar();
			CarMotion.getInstance().stop();
		}

		public clearAllTimeOut(): void {
			if (this.timeoutIdList.length > 0) {
				for (let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
			this.clearShine();
		}
	}
}