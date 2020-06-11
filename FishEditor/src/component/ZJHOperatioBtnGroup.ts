class ZJHOperatioBtnGroup extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e:egret.Event):void {
		egret.log("onAddToStage : " + this.width + "  " + this.stage.stageWidth)
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public discardBtn:eui.Button;
	private discardBtn2:eui.Button;
	public alwaysFollowBtn:eui.Button;
	public followBtn:eui.Button;
	public compareBtn:eui.Button;
	public lookBtn:eui.Button;
	public cancelFollowBtn:eui.Button;
	public allInBtn:eui.Button;
	public addBtn: eui.Button;

	public addBetGroup: eui.Group;
	public addBetBtn1:eui.Button;
	public addBetBtn2Mask: eui.Image;
	public addBetBtn2:eui.Button;
	public addBetBtn3:eui.Button;
	public addBetBtn4:eui.Button;
	public cancelCompareBtn:eui.Button;
	private addBg:eui.Image;
	private addBgOriginY:number;
	private addBgOriginHeight:number;
	private turnGroup:eui.Group;
	private unturnGroup:eui.Group;

	private isCompare:boolean;

	public activeBtns:Array<eui.Button>;
	private allBtns:Array<eui.Button> = [];
	private addBtnArr:Array<eui.Button> = [];
	private ctrlVisibleBtnArr:Array<eui.Button> = [];
	public hideAll():void {
		/*
		this.discardBtn.visible = false;
		this.alwaysFollowBtn.visible = false;
		this.followBtn.visible = false;
		this.compareBtn.visible = false;
		this.lookBtn.visible = false;
		this.cancelFollowBtn.visible = false;
		this.allInBtn.visible = false;
		this.addBetBtn1.visible = false;
		this.addBetBtn2.visible = false;
		this.addBetBtn3.visible = false;
		this.addBetBtn4.visible = false;
		this.cancelCompareBtn.visible = false;
		*/
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.activeBtns = new Array<eui.Button>();
		this.allBtns = [this.discardBtn, this.alwaysFollowBtn, this.followBtn, this.compareBtn,
			this.lookBtn, this.cancelFollowBtn,this.allInBtn,this.cancelCompareBtn,this.addBetBtn1, this.addBetBtn2, this.addBetBtn3, this.addBetBtn4, this.addBtn];
		// this.addBtnArr = [this.addBetBtn1, this.addBetBtn2, this.addBetBtn3, this.addBetBtn4]
		this.addBtnBitmapLabel(this.addBetBtn1);
		this.addBtnBitmapLabel(this.addBetBtn2);
		this.addBtnBitmapLabel(this.addBetBtn3);
		this.addBtnBitmapLabel(this.addBetBtn4);
		this.addBgOriginY = this.addBg.y;
		this.addBgOriginHeight = this.addBg.height;
		this.ctrlVisibleBtnArr = [/*this.addBetBtn1,this.addBetBtn2,this.addBetBtn3,this.addBetBtn4,*/this.lookBtn];
		this.showDefault();
		this.initEvent();
	}

	private addBtnBitmapLabel(btn:eui.Button):void {
		let bitmapLabel:eui.BitmapLabel = new eui.BitmapLabel();
		bitmapLabel.font = RES.getRes("zjhmoney_fnt");
		btn["bitmapLabel"] = bitmapLabel;
		btn.addChild(bitmapLabel);
		bitmapLabel.scaleX = 1;
		bitmapLabel.scaleY = 1;
		bitmapLabel.horizontalCenter = 0;
		bitmapLabel.verticalCenter = 0;
	}

	private initEvent():void {
		this.followBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
		this.addBetBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick1, this);
		this.addBetBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick2, this);
		this.addBetBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick3, this);
		this.addBetBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick4, this);
		this.discardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDiscardBtnClick, this);
		this.discardBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDiscardBtnClick, this);
		this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookBtnClick, this);
		this.compareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCompareBtnClick, this);
		this.cancelCompareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelCompareBtnClick, this);
		this.alwaysFollowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlwaysFollowBtnClick, this);
		this.cancelFollowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelAlwaysFollowBtnClick, this);
		this.allInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAllInBtnClick, this);
	}

	private onAllInBtnClick():void {
		ZJHRequest.Follow(3, 0);
	}
	
	private onAlwaysFollowBtnClick():void {
		// var zdata:game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
		// var zjhPlayer:game.zjh.ZJHPlayer = zdata.getPlayerById(game.UserService.instance.playerId);
		// zjhPlayer.isAlways = true;
		ZJHRequest.alwaysFollow(true);
	}

	private onCancelAlwaysFollowBtnClick():void {
		// var zdata:game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
		// var zjhPlayer:game.zjh.ZJHPlayer = zdata.getPlayerById(game.UserService.instance.playerId);
		// zjhPlayer.isAlways = false;
		ZJHRequest.alwaysFollow(false);
	}

	private prevActiceBtns:Array<eui.Button>;
	public startCompareState():void {
		this.isCompare = true;
		this.prevActiceBtns = this.activeBtns;
		this.activeBtns = new Array<eui.Button>();
		this.activeBtns.push(this.cancelCompareBtn);
		this.showActive();
	}

	public endCompareState():void {
		this.isCompare = false;
		this.activeBtns = this.prevActiceBtns;
		this.showActive();
	}

	private onCancelCompareBtnClick(e:egret.TouchEvent):void {
		this.endCompareState();
		game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_COMPARE);
	}

	private onCompareBtnClick(e:egret.TouchEvent):void {
		this.startCompareState();
		this.unturnGroup.visible = this.turnGroup.visible = false;
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_COMPARE);
		// 同时取消自动跟著
		if(this.alwaysFollowBtn.enabled) {
			var zdata:game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
			var zjhPlayer:game.zjh.ZJHPlayer = zdata.getPlayerById(game.UserService.instance.playerId);
			zjhPlayer.isAlways = false;
			ZJHRequest.alwaysFollow(false);
		}
		let b1 = game.zjh.ZJHData.getInstance().isAllIn;
		let b2:boolean = (game.zjh.ZJHData.getInstance().getLeftPlayerCount() <= 2);
		if(b1&&b2){
			ZJHRequest.Follow(3, 0);
		}
	}

	public showDefault():void {
		this.hideAll();
		this.activeBtns = new Array<eui.Button>();
		this.activeBtns.push(this.discardBtn,this.alwaysFollowBtn);
		this.showActive();
		this.turnGroup.visible = false;
		this.unturnGroup.visible = true;
	}

	public showActive():void {
		for(let btn of this.allBtns) {
			if(this.activeBtns && this.activeBtns.indexOf(btn) >= 0) {
				btn.enabled = true;
				if(this.ctrlVisibleBtnArr.indexOf(btn) >= 0) {
					btn.visible = true;
				}
			} else {
				btn.enabled = false;
				//获取到按钮的文本，可以实现改颜色
				// if(btn.name == "addBet"){
				// 	let label: eui.BitmapLabel = btn["bitmapLabel"];
				// 	if(label){
				// 		console.warn(label.text);
				// 	}
				// }
				if(this.ctrlVisibleBtnArr.indexOf(btn) >= 0) {
					btn.visible = false;
				}
			}
		}
		this.addBetGroup.visible = false;
		// this.addBtn.visible = true;
	}

	public showUnTurnState(curRound:number, status:game.zjh.ZJHPlayerStatus, isAlways: boolean) :void {
		console.error("----------showUnTurnState isAlways ", isAlways);
		this.hideAll();

		this.turnGroup.visible = false;
		this.unturnGroup.visible = true;
		if(status == game.zjh.ZJHPlayerStatus.QIPAI || status == game.zjh.ZJHPlayerStatus.SHIBAI || status == game.zjh.ZJHPlayerStatus.NO_PLAY) {
			this.unturnGroup.visible = false;
			return;
		}
		this.activeBtns = new Array<eui.Button>();
		if(isAlways) {
			this.cancelFollowBtn.visible = true;
			this.alwaysFollowBtn.visible = false;
			this.activeBtns.push(this.discardBtn,this.cancelFollowBtn);
		} else {
			this.cancelFollowBtn.visible = false;
			this.alwaysFollowBtn.visible = true;
			this.activeBtns.push(this.discardBtn,this.alwaysFollowBtn);
		}
		if(curRound >= 2) {
			if(status == game.zjh.ZJHPlayerStatus.ANPAI) {
				this.activeBtns.push(this.lookBtn);
			}
		}
		this.showActive();
	}

	public showButtonStateInTurn(curRound:number, status:game.zjh.ZJHPlayerStatus, isAlways: boolean) :void {
		//console.warn("showButtonStateInTurn");
		this.hideAll();
		this.turnGroup.visible = true;
		this.unturnGroup.visible = false;
		if(status == game.zjh.ZJHPlayerStatus.QIPAI || status == game.zjh.ZJHPlayerStatus.SHIBAI) {
			return;
		}
		var zjhData = game.zjh.ZJHData.getInstance();
		this.seBetNumber();
		this.activeBtns = new Array<eui.Button>();
		this.activeBtns.push(this.discardBtn2, this.cancelFollowBtn);
		if(curRound == 1) {
			// 第一轮 只有跟注加注 弃牌
			// this.activeBtns.push(this.discardBtn, this.followBtn);
			this.activeBtns.push(this.discardBtn, this.followBtn);
			if(!this.getIfCurMax()) {
				this.activeBtns.push(this.addBtn); 
			} 
			this.addBetBtn();
		} else if(curRound == 2) {
			this.activeBtns.push(this.discardBtn);
			if(!this.getIfCurMax()) {
				this.activeBtns.push(this.addBtn); 
			}
			
			if(status == game.zjh.ZJHPlayerStatus.ANPAI) {
				this.activeBtns.push(this.lookBtn);
			}
			if(isAlways) {
				this.activeBtns.push(this.cancelFollowBtn);
			} else {
				this.activeBtns.push(this.followBtn);
				this.addBetBtn();
			}
		} else {
			this.activeBtns.push(this.discardBtn);
			this.activeBtns.push(this.compareBtn);
			if(status == game.zjh.ZJHPlayerStatus.ANPAI) {
				this.activeBtns.push(this.lookBtn);
			}
			if(zjhData.isAllIn){
				if(zjhData.getLeftPlayerCount() > 2){
					this.activeBtns.push(this.allInBtn);
				}
			} else{
				this.activeBtns.push(this.allInBtn);
				if(!this.getIfCurMax()){
					this.activeBtns.push(this.addBtn);
				}
				if(isAlways){
					this.activeBtns.push(this.cancelFollowBtn)
				} else {
					this.activeBtns.push(this.followBtn)
					this.addBetBtn();
				}
			}
			{
				/*
				if(!this.getIfCurMax()) {
					this.activeBtns.push(this.addBtn); 
				}
				if(game.zjh.ZJHData.getInstance().isAllIn) {
					if(game.zjh.ZJHData.getInstance().getLeftPlayerCount() > 2)
						// 一旦有人全压 后面的人全是全压
						this.activeBtns.push(this.allInBtn);
				} else {
					//剩余在玩的人少于2，且另一个人已经allin，则禁用全押按钮
					if(game.zjh.ZJHData.getInstance().getLeftPlayerCount() <= 2/* && !game.zjh.ZJHData.getInstance().isAllIn) {
						this.activeBtns.push(this.allInBtn);
					}
					if(player.isAlways) {
						this.activeBtns.push(this.cancelFollowBtn);
					} else {
						this.activeBtns.push(this.followBtn);
						this.addBetBtn();
					}
				}
				if(status == game.zjh.ZJHPlayerStatus.NAPAI) {
					this.activeBtns.push(this.lookBtn);
				}
				this.activeBtns.push(this.compareBtn);
				*/
			}			
		} 
		if(isAlways/* && !(curRound == 3 && zjhData.getLeftPlayerCount() <= 2)*/){
				this.unturnGroup.visible = true;
				this.turnGroup.visible = false;
		}else{
				this.unturnGroup.visible = false;
				this.turnGroup.visible = true;
		}
		this.showActive();
	}

	public seBetNumber():void {
		let level = game.RoomManager.getInstance().curRoomData.gameLevel;
		if(level == 0) level = 2;
		this.addBetBtn1["bitmapLabel"].text = "" + game.GameConst.betConfig[level * 100 + 1].toString() + "y";
		this.addBetBtn2["bitmapLabel"].text  = "" + game.GameConst.betConfig[level * 100 + 2].toString() + "y";
		this.addBetBtn3["bitmapLabel"].text  = "" + game.GameConst.betConfig[level * 100 + 3].toString() + "y";
		this.addBetBtn4["bitmapLabel"].text  = "" + game.GameConst.betConfig[level * 100 + 4].toString() + "y";
	} 

	private getMaxConfigBet() : number {
		let level = game.RoomManager.getInstance().curRoomData.gameLevel;
		if(level == 0) level = 2;
		return game.GameConst.betConfig[level * 100 + 4];
	}

	private getIfCurMax(): boolean{
		let bet = game.zjh.ZJHData.getInstance().singleBet;
		return (bet >= this.getMaxConfigBet());
	}

	private addBetBtn() : void {
		let bet = game.zjh.ZJHData.getInstance().singleBet;		
		console.error("-------showButtonStateInTurn, bet is ", bet);
		let level = game.RoomManager.getInstance().curRoomData.gameLevel;
		let showAddCount:number = 0;
		if(level == 0) level = 2;
		for(let i = 1; i <= 4; i++) {
			if(game.GameConst.betConfig[level * 100 + i] > bet) {
				if(i == 1) {
					this.activeBtns.push(this.addBetBtn1);
					showAddCount++;
				} else if(i == 2) {
					this.activeBtns.push(this.addBetBtn2);
					showAddCount++;
				} else if(i == 3) {
					this.activeBtns.push(this.addBetBtn3);
					showAddCount++;
				} else if(i == 4) {
					this.activeBtns.push(this.addBetBtn4);
					showAddCount++;
				}
			}
		}

		let delta = 4 - showAddCount;
	}
	
	public showLiangpai():void {
		
	}

	private onLookBtnClick(e:egret.TouchEvent):void {
		ZJHRequest.look();
	}

	private onDiscardBtnClick(e:TouchEvent):void {
		ZJHRequest.discard();
	}

	private onFollowBtnClick(e:TouchEvent):void {
		ZJHRequest.Follow(1,0);
	}

	private onAddBtnClick(e: TouchEvent): void{
		this.addBetGroup.visible = true;
	}	

	private onFollowBtnClick1(e:TouchEvent):void {
		ZJHRequest.Follow(2,1);
		this.addBetGroup.visible = false;
	}

	private onFollowBtnClick2(e:TouchEvent):void {
		ZJHRequest.Follow(2,2);
		this.addBetGroup.visible = false;
	}

	private onFollowBtnClick3(e:TouchEvent):void {
		ZJHRequest.Follow(2,3);
		this.addBetGroup.visible = false;
	}

	private onFollowBtnClick4(e:TouchEvent):void {
		ZJHRequest.Follow(2,4);
		this.addBetGroup.visible = false;
	}

	public onDestory():void {
		this.followBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick, this);
		this.addBetBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick1, this);
		this.addBetBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick2, this);
		this.addBetBtn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick3, this);
		this.addBetBtn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnClick4, this);
		this.discardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDiscardBtnClick, this);
		this.lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookBtnClick, this);
		this.compareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCompareBtnClick, this);
		this.cancelCompareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelCompareBtnClick, this);
		this.alwaysFollowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlwaysFollowBtnClick, this);
		this.cancelFollowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelAlwaysFollowBtnClick, this);
		this.allInBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAllInBtnClick, this);
	}
	

}
