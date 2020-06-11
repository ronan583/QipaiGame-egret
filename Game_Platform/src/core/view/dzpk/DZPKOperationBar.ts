class DZPKOperationBar extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onBarAddToStage, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public dropBtn: eui.Button;
	public passBtn: eui.Button;
	public addBtn: eui.Button;
	public followBtn: eui.Group;
	public followLabel: eui.BitmapLabel;
	public damang3Btn: eui.Group;
	public damang4Btn: eui.Group;
	public bottomBtn: eui.Group;
	public bottom23Btn: eui.Group;
	public bottom5pBtn: eui.Group;

	public addGroup: eui.Group;
	public addBtn1: eui.Group;
	public addBtn2: eui.Group;
	public addBtn3: eui.Group;
	public addBtn4: eui.Group;
	public allInBtn: eui.Button;
	public allInBtnInAdd:eui.Button;
	private addBet: DZPKAddBet;

	public autoPassOrDropBtn: eui.Group;
	public autoPassBtn: eui.Group;
	public autoFollowBtn: eui.Group;

	public autoPassOrDropImg: eui.Image;
	public autoPassImg: eui.Image;
	public autoFollowImg: eui.Image;

	public add1Label: eui.BitmapLabel;
	public add2Label: eui.BitmapLabel;
	public add3Label: eui.BitmapLabel;
	public add4Label: eui.BitmapLabel;

	private addShowBg: egret.Shape;
	private relayoutArr: Array<egret.DisplayObject>;
	private relayoutGroup: eui.Group;

	private onBarAddToStage(): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onBarAddToStage, this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		CommonUtil.bindTouchEffect(this.autoPassOrDropBtn);
		CommonUtil.bindTouchEffect(this.autoPassBtn);
		CommonUtil.bindTouchEffect(this.autoFollowBtn);
		this.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPassBtnTap, this);
		this.dropBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDropBtnTap, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnTap, this);
		this.followBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFollowBtnTap, this);
		this.damang3Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDamang3BtnTap, this);
		this.damang4Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDamang4BtnTap, this);
		this.bottomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBottomBtnTap, this);
		this.bottom23Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBottom23BtnTap, this);
		this.bottom5pBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBottom5pBtnTap, this);

		this.addBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn1Tap, this);
		this.addBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn2Tap, this);
		this.addBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn3Tap, this);
		this.addBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn4Tap, this);

		this.allInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAllInBtnTap, this);
		this.allInBtnInAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAllInBtnTap, this);

		this.autoPassOrDropBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoPassOrDropTap, this);
		this.autoPassBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoPassTap, this);
		this.autoFollowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoFollowTap, this);

		CommonUtil.bindTouchEffect(this.followBtn);
		CommonUtil.bindTouchEffect(this.damang3Btn);
		CommonUtil.bindTouchEffect(this.damang4Btn);
		CommonUtil.bindTouchEffect(this.bottomBtn);
		CommonUtil.bindTouchEffect(this.bottom23Btn);
		CommonUtil.bindTouchEffect(this.bottom5pBtn);

		this.relayoutArr = [this.dropBtn, this.allInBtn, this.passBtn, this.addBtn, this.followBtn];
	}

	private autoPassOrDropTap(): void {
		if (game.dzpk.TexasBattleData.getInstance().autoOperationType == 1) {
			DZPKRequest.autoset(0);
		} else {
			DZPKRequest.autoset(1);
		}
	}

	private autoPassTap(): void {
		if (game.dzpk.TexasBattleData.getInstance().autoOperationType == 2) {
			DZPKRequest.autoset(0);
		} else {
			DZPKRequest.autoset(2);
		}
	}

	private autoFollowTap(): void {
		if (game.dzpk.TexasBattleData.getInstance().autoOperationType == 3) {
			DZPKRequest.autoset(0);
		} else {
			DZPKRequest.autoset(3);
		}
	}

	private onAllInBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.ALL_IN);
		this.visible = false;
	}

	private onAddBtn1Tap(): void {
		let bottombet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
		let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
		DZPKRequest.stake(game.dzpk.StakeType.ADD, followBet * 2);
		this.visible = false;
	}

	private onAddBtn2Tap(): void {
		let bottombet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
		let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
		DZPKRequest.stake(game.dzpk.StakeType.ADD, followBet * 4);
		this.visible = false;
	}

	private onAddBtn3Tap(): void {
		let bottombet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
		let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
		DZPKRequest.stake(game.dzpk.StakeType.ADD, followBet * 8);
		this.visible = false;
	}

	private onAddBtn4Tap(): void {
		let bottombet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
		let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
		DZPKRequest.stake(game.dzpk.StakeType.ADD, followBet * 16);
		this.visible = false;
	}

	private onPassBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.PASS);
		this.visible = false;
	}

	private onDropBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.DISCARD);
		this.visible = false;
	}

	private onAddBtnTap(): void {
		if (this.addBet.visible) {
			if (this.addBet.curBet <= 0) {
				this.refreshBtnState();
				return;
			}
			DZPKRequest.stake(game.dzpk.StakeType.ADD, this.addBet.curBet);
			this.visible = false;
		} else {
			this.showAdd();
			let bottombet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
			let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
			var texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(game.UserService.instance.playerId);

			var needBetValue: number = followBet * 2;
			this.add1Label.text = needBetValue.toFixed(0);
			if (texasPlayer.money < needBetValue) {
				this.addBtn1.visible = false;
			} else {
				this.addBtn1.visible = true;
			}
			needBetValue = followBet * 4;
			this.add2Label.text = needBetValue.toFixed(0);
			if (texasPlayer.money < needBetValue) {
				this.addBtn2.visible = false;
			} else {
				this.addBtn2.visible = true;
			}
			needBetValue = followBet * 8;
			this.add3Label.text = needBetValue.toFixed(0);
			if (texasPlayer.money < needBetValue) {
				this.addBtn3.visible = false;
			} else {
				this.addBtn3.visible = true;
			}
			needBetValue = followBet * 16;
			this.add4Label.text = needBetValue.toFixed(0);
			if (texasPlayer.money < needBetValue) {
				this.addBtn4.visible = false;
			} else {
				this.addBtn4.visible = true;
			}
		}

	}

	private onFollowBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.FOLLOW);
		this.visible = false;
	}

	private onDamang3BtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.DAMANG_THREE);
		this.visible = false;
	}

	private onDamang4BtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.DAMANG_FOUR);
		this.visible = false;
	}

	private onBottomBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.BET_BOTTOM);
		this.visible = false;
	}

	private onBottom23BtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.BET_BOTTOM2);
		this.visible = false;
	}
	private onBottom5pBtnTap(): void {
		DZPKRequest.stake(game.dzpk.StakeType.BET_BOTTOM1);
		this.visible = false;
	}

	private hideAllBtns(): void {
		this.passBtn.visible = false;
		this.dropBtn.visible = false;
		this.addBtn.visible = false;
		this.followBtn.visible = false;
		this.damang3Btn.visible = false;
		this.damang4Btn.visible = false;
		this.bottomBtn.visible = false;
		this.bottom5pBtn.visible = false;
		this.bottom23Btn.visible = false;
		this.allInBtn.visible = false;
		this.autoFollowBtn.visible = false;
		this.autoPassBtn.visible = false;
		this.autoPassOrDropBtn.visible = false;

		this.addBtn1.visible = false;
		this.addBtn2.visible = false;
		this.addBtn3.visible = false;
		this.addBtn4.visible = false;
		this.addBet.visible = false;
		this.addGroup.visible = false;
		this.allInBtnInAdd.visible = false;
	}

	public showSelf(): void {
		this.hideAllBtns();
		this.refreshBtnState();
		game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.MY_TURN);
	}

	public showOthers(): void {
		this.hideAllBtns();
		if (!game.dzpk.TexasBattleData.getInstance().isSelfAllin() && !game.dzpk.TexasBattleData.getInstance().isSelfDrop) {
			this.autoFollowBtn.visible = true;
			this.autoPassBtn.visible = true;
			this.autoPassOrDropBtn.visible = true;
			this.showAutoType(game.dzpk.TexasBattleData.getInstance().autoOperationType);
		}
	}

	public showAdd(): void {
		this.hideAllBtns();
		this.addGroup.visible = true;
		this.addBtn1.visible = true;
		this.addBtn2.visible = true;
		this.addBtn3.visible = true;
		this.addBtn4.visible = true;
		// let texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(game.UserService.instance.playerId);
		// this.addBet.minBet = 0;
		// this.addBet.maxBet = texasPlayer.money - game.dzpk.TexasBattleData.getInstance().curStakeMoney;
		// this.addBet.showDefault();
		// this.addBet.visible = false;
		this.addBtn.visible = true;
		this.allInBtn.visible = true;
		let battleData = game.dzpk.TexasBattleData.getInstance();
		let texasPlayer = null;
		if(battleData && (texasPlayer = battleData.getPlayer(game.UserService.instance.playerId))) {
			this.addBet.visible = true;
			let base = battleData.curStakeMoney;
			let damangPlayer = battleData.getDamangPlayer();
			if(damangPlayer) {
				base += damangPlayer.bet;
				this.addBet.setLimit(base, texasPlayer.money, damangPlayer.bet, this.checkAddIsAllIn, this);
				this.addBet.showDefault();
			} else {
				this.addBet.visible = false;
			}
		} else {
			this.addBet.visible = false;
		}
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideAdd, this);
	}

	private checkAddIsAllIn(isAllIn:boolean) {
		if(isAllIn) {
			this.allInBtnInAdd.visible = true;
			this.addBtn.visible = false;
		} else {
			this.allInBtnInAdd.visible = false;
			this.addBtn.visible = true;
		}
	}

	public hideAdd(e: egret.TouchEvent): void {
		egret.log("hide add  ============= " + e.target.name);
		egret.log("hide add  ============= " + e.currentTarget.name);
		if(!this.hitTestPoint(e.stageX, e.stageY)) {
			if (this.stage) this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideAdd, this);
			this.refreshBtnState();
		}
	}

	public refreshBtnState(): void {
		this.hideAllBtns();

		let battleData: game.dzpk.TexasBattleData = game.dzpk.TexasBattleData.getInstance();
		let activeBtns: Array<egret.DisplayObject> = [];
		if ((battleData.currentOperatorType & game.dzpk.StakeType.DISCARD) > 0) {
			this.dropBtn.visible = true;
			activeBtns.push(this.dropBtn);
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.PASS) > 0) {
			this.passBtn.visible = true;
			console.log("show pass btn:" + battleData.currentOperatorType + "  " + this.followBtn.visible);
			activeBtns.push(this.passBtn);
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.FOLLOW) > 0) {
			this.followBtn.visible = true;
			console.log("show followBtn btn:" + battleData.currentOperatorType);
			// 需要显示跟多少
			this.followLabel.text = 'g' + game.dzpk.TexasBattleData.getInstance().getSelfFollowBet().toFixed(0);
			activeBtns.push(this.followBtn);
		}
		console.log('allInBtn ========== ', battleData.currentOperatorType, game.dzpk.StakeType.ALL_IN, battleData.currentOperatorType & game.dzpk.StakeType.ALL_IN);
		if ((battleData.currentOperatorType & game.dzpk.StakeType.ALL_IN) > 0) {
			this.allInBtn.visible = true;
			activeBtns.push(this.allInBtn);
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.ADD) > 0) {
			this.addBtn.visible = true;
			activeBtns.push(this.addBtn);

			let followBet: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBetWithClient();
			var texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(game.UserService.instance.playerId);
			if (texasPlayer.money < followBet * 2) {
				this.addBtn.enabled = false;
			} else {
				this.addBtn.enabled = true;
			}

			var roomBottomBet: number = game.RoomManager.getInstance().curRoomData.bottomBet;
			var followValue: number = game.dzpk.TexasBattleData.getInstance().getSelfFollowBet();
			if (battleData.round == 1) {
				this.damang3Btn.visible = true;
				this.damang4Btn.visible = true;
				this.bottomBtn.visible = true;
				this.bottom23Btn.visible = false;
				this.bottom5pBtn.visible = false;
				if (texasPlayer.money < (3 * roomBottomBet) || (3 * roomBottomBet) < followValue) {
					CommonUtil.disableDisplayObj(this.damang3Btn);
				} else {
					CommonUtil.enableDisplayObj(this.damang3Btn);
				}
				if (texasPlayer.money < (4 * roomBottomBet) || (4 * roomBottomBet) < followValue) {
					CommonUtil.disableDisplayObj(this.damang4Btn);
				} else {
					CommonUtil.enableDisplayObj(this.damang4Btn);
				}
				if (texasPlayer.money < battleData.totalPoolMoney || (battleData.totalPoolMoney) < followValue) {
					CommonUtil.disableDisplayObj(this.bottomBtn);
				} else {
					CommonUtil.enableDisplayObj(this.bottomBtn);
				}
			} else {
				this.damang3Btn.visible = false;
				this.damang4Btn.visible = false;
				this.bottomBtn.visible = true;
				this.bottom23Btn.visible = true;
				this.bottom5pBtn.visible = true;
				if (texasPlayer.money && (texasPlayer.money < battleData.totalPoolMoney || (battleData.totalPoolMoney) < followValue)) {
					CommonUtil.disableDisplayObj(this.bottomBtn);
				} else {
					CommonUtil.enableDisplayObj(this.bottomBtn);
				}
				if (texasPlayer.money < Math.floor(battleData.totalPoolMoney * 0.5) || (battleData.totalPoolMoney * 0.5) < followValue) {
					CommonUtil.disableDisplayObj(this.bottom5pBtn);
				} else {
					CommonUtil.enableDisplayObj(this.bottom5pBtn);
				}
				if (texasPlayer.money < Math.floor(battleData.totalPoolMoney * 2 / 3) || (battleData.totalPoolMoney * 0.5) < followValue) {
					CommonUtil.disableDisplayObj(this.bottom23Btn);
				} else {
					CommonUtil.enableDisplayObj(this.bottom23Btn);
				}
			}
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.DAMANG_THREE) > 0) {
			this.damang3Btn.visible = true;
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.DAMANG_FOUR) > 0) {
			this.damang4Btn.visible = true;
		}
		if ((battleData.currentOperatorType & game.dzpk.StakeType.BET_BOTTOM) > 0) {
			this.bottomBtn.visible = true;
		}
		if (activeBtns.length > 0) {
			this.relayoutGroup.removeChildren();
			for (let btn of activeBtns) {
				this.relayoutGroup.addChild(btn);
				btn.visible = true;
			}
			this.relayoutGroup.visible = true;
		}
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideAdd, this);
	}

	public showAutoType(type: number): void {
		this.autoPassOrDropImg.visible = false;
		this.autoPassImg.visible = false;
		this.autoFollowImg.visible = false;
		if (type == 1) {
			this.autoPassOrDropImg.visible = true;
		} else if (type == 2) {
			this.autoPassImg.visible = true;
		} else if (type == 3) {
			this.autoFollowImg.visible = true;
		}
	}

}