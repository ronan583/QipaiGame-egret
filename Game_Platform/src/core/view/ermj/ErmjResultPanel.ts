module game.ermj {
	export class ErmjResultPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjResultPanel.exml";
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public group: eui.Group;
		public group1: eui.Group;
		public fallGroup: eui.Group;
		public fanGroup: eui.Group;

		public groupX: number;
		public groupX1: number;
		public groupX2: number;
		public groupX3: number;

		public huCard: eui.Image
		public current: eui.Image
		public fan: eui.Image
		public totalfan: eui.Image
		public antes: eui.Image
		public huType: eui.Label;
		public doubleLabel: eui.BitmapLabel;
		public huFanLabel: eui.BitmapLabel;
		public antesLabel: eui.BitmapLabel;
		public totalFanLabel: eui.BitmapLabel;
		public winMoneyLabel: eui.BitmapLabel;
		public downTimeLabel: eui.BitmapLabel;
		public leaveBtn: IButton;
		public continueBtn: IButton;

		public smallGroupList: Array<ErmjSmallGroup>;
		public battleStartCountDown: game.BattleStartCountDown;

		public anim: string = "erqs_failure";
		public isloop: boolean = true;
		public playOnStage: boolean = true;
		private commonDB: game.CommonDBLoop2;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.groupX = this.group.x;
			this.groupX1 = this.group1.x;
			this.groupX2 = this.fallGroup.x;
			this.groupX3 = this.fanGroup.x;
			this.huCard.visible = false;
			this.smallGroupList = new Array<ErmjSmallGroup>();
			this.battleStartCountDown = new game.BattleStartCountDown();
			this.battleStartCountDown.countDownLabel = this.downTimeLabel;
			this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveGame, this);
			this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinueGame, this);
		}

		private initAnim(anim, defaultPlayAnim) {
			this.anim = anim;
			if (this.commonDB) {
				this.commonDB.parent.removeChild(this.commonDB);
				this.commonDB = null;
			}
			this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", defaultPlayAnim, this.isloop, this.playOnStage);
			this.addChildAt(this.commonDB, 0);
			this.commonDB.x = this.width / 2;
			this.commonDB.y = this.height / 2;

			this.commonDB.playOnce();
			this.registerTimeout(() => {
				if (this.anim == 'erqs_liujutexteffect') {
					this.commonDB.stop();
				} else {
					this.commonDB.playerAnimOnce("idle", 0);
				}
			}, 2000);
		}

		public onLeaveGame() {
			this.closeResult();

			RoomRequest.leaveRoom(game.ChildGameType.ERMJ);
			PopUpManager.removePopUp(this);
		}

		public onContinueGame() {
			//  先判断钱后不够 不够的化打开充值面板
			if (RoomManager && RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId)) {
				let money = RoomManager.getInstance().curRoomData.getPlayerInfo(UserService.instance.playerId).money;
				console.log('money === ', money, RoomManager.getInstance().curRoomData.enterMinMoney);
				if (money < RoomManager.getInstance().curRoomData.enterMinMoney) {
					// 不够的化打开充值面板
					AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
					return;
				}
			}
			this.closeResult();
			PopUpManager.removePopUp(this);
			RoomRequest.sendBeady(true, game.ChildGameType.ERMJ);
			AppFacade.instance.sendNotification(ErmjBattleMediator.START_GAME);
		}

		public tweenGroup() {
			this.group.x = this.groupX - 300;
			this.group1.x = this.groupX1 - 300;
			this.fanGroup.x = this.groupX3 - 300;
			egret.Tween.get(this.group).to({ x: this.groupX }, 500);
			egret.Tween.get(this.group1).to({ x: this.groupX1 }, 500);
			egret.Tween.get(this.fanGroup).to({ x: this.groupX3 }, 500).call(() => {
				var time = 0
				for (let i = 0; i < this.fallGroup.numChildren; i++) {
					let img = this.fallGroup.getChildAt(i);
					img.alpha = 1;
					egret.Tween.get(img).wait(time).to({ y: img.y - 30 }, 250).to({ y: img.y - 20 }, 250);
					time += 100;
					if (i == this.fallGroup.numChildren - 1) {
						this.registerTimeout(() => {
							this.huCard.visible = true;
						}, 600 + time);
					}
				}
			}, this);
		}

		public showResult(data) {
			console.log('showResult ========= ', data);
			if (data.type == 3) {
				this.currentState = 'liuju';
				ErmjSoundPlayer.instance.playDraw();
				this.initAnim("erqs_liuju", "start");
			} else {
				this.currentState = 'loseOrwin';
				if (Number(data.winPlayerId) == UserService.instance.playerId) {
					ErmjSoundPlayer.instance.playWin();

					this.initAnim("erqs_winner_guess_2", "start");
					this.huFanLabel.font = ('ermj_win_small_fnt');
					this.antesLabel.font = ('ermj_win_small_fnt');
					this.totalFanLabel.font = ('ermj_win_small_fnt');
					this.winMoneyLabel.font =('ermj_win_big_fnt');
					this.winMoneyLabel.text = "+" + data.winMoney.toFixed(2);

					this.current.source = 'ermj_battle_json.current_win';
					this.fan.source = 'ermj_battle_json.fan_win';
					this.totalfan.source = 'ermj_battle_json.totalfan_win';
					this.antes.source = 'ermj_battle_json.antes_win';
				} else {
					ErmjSoundPlayer.instance.playLose();

					this.initAnim("erqs_failure", "start");
					this.huFanLabel.font = ('ermj_lose_small_fnt');
					this.antesLabel.font = ('ermj_lose_small_fnt');
					this.totalFanLabel.font = ('ermj_lose_small_fnt');
					this.winMoneyLabel.font = ('ermj_lose_big_fnt');
					this.winMoneyLabel.text = data.winMoney.toFixed(2);

					this.current.source = 'ermj_battle_json.current_lose';
					this.fan.source = 'ermj_battle_json.fan_lose';
					this.totalfan.source = 'ermj_battle_json.totalfan_lose';
					this.antes.source = 'ermj_battle_json.antes_lose';
				}
				this.doubleLabel.text = data.jiabeiCount;
				this.huFanLabel.text = data.huFan;
				let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
				this.antesLabel.text = roomData.bottomBet.toFixed(2);
				this.totalFanLabel.text = data.totalFan;
				this.showCard(data.fallCards, data.handCards, data.huCard);
				this.showHuTypes(data.huTypes, data.winPlayerId);
				this.tweenGroup();
			}
			this.battleStartCountDown.startCountDown(data.downTime);
			this.registerTimeout(() => {
				//this.onLeaveGame();
			}, data.downTime * 1000);
		}

		public closeResult() {
			this.commonDB.removeChildren();
			this.clearAllTimeOut();
		}

		private showHuTypes(huTypes, winPlayerId) {
			this.fanGroup.removeChildren();
			console.log('showHuTypes ========= ', huTypes, huTypes.length);
			for (var i = 0; i < huTypes.length; i++) {
				var fanLabel: ErmjFanLabel = new ErmjFanLabel();
				fanLabel.showLabel(huTypes[i], winPlayerId);
				this.fanGroup.addChild(fanLabel);
			}
		}

		private showCard(fallCards, handCards, huCard) {
			this.fallGroup.removeChildren();
			var card: eui.Image;
			var kong: eui.Image;
			var originX = 0;
			var originY = 12;
			for (var i = 0; i < fallCards.length; i++) {
				for (var j = 0; j < fallCards[i].card.length; j++) {
					if (j == 0) {
						originX += 5;
					}
					if (fallCards[i].type == <number>MJPlayType.Kong ||
						fallCards[i].type == <number>MJPlayType.CealedKong ||
						fallCards[i].type == <number>MJPlayType.DotKong) {
						card = new eui.Image();
						this.fallGroup.addChild(card);
						card.source = "ermj_battle_json.playedTiles" + fallCards[i].card[j];
						card.y = originY;
						if (j == 0) {
							kong = card;
							card.x = originX + 51;
							card.y = 0;
						} else {
							// 暗杠下面三张牌显示背面
							if (fallCards[i].type == MJPlayType.CealedKong) {
								card.source = "ermj_battle_json.playedTiles0"
								card.width = 51;
								card.height = 71;
							}
							card.x = originX;
							originX += 51;
							if (card.x == kong.x) {
								this.fallGroup.addChild(kong);
							}
						}
					} else {
						card = new eui.Image();
						this.fallGroup.addChild(card);
						card.source = "ermj_battle_json.playedTiles" + fallCards[i].card[j];
						card.x = originX;
						card.y = originY;
						originX += 51
					}
					card.alpha = 0;
				}
			}
			//显示胡牌
			for (var k = 0; k < handCards.length; k++) {
				card = new eui.Image();
				this.fallGroup.addChild(card);
				card.source = "ermj_battle_json.playedTiles" + handCards[k];
				if (k == 0) {
					originX += 5;
				}
				card.x = originX;
				card.y = originY;
				originX += 51;
				card.alpha = 0;
				this.huCard.visible = false;
				if (handCards[k] == huCard) {
					console.log('结算显示胡牌 ======= ', k, huCard);
					this.huCard.x = this.fallGroup.x + card.x + 8;
				}
			}
		}

		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		private timeoutIdList: Array<number> = [];
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

		public clearAllTimeOut(): void {
			if (this.timeoutIdList.length > 0) {
				for (let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}

	}
}