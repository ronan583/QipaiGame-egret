module game.ermj {
	export enum MJPlayType {
		Idle = 0,			//等待
		Deal = 1 << 1,		//发牌
		Draw = 1 << 2,		//摸牌
		Discard = 1 << 3,	//打牌
		CanChi = 1 << 4,
		Chi = 1 << 5,		//吃
		CanPong = 1 << 6,
		Pong = 1 << 7,		//碰
		CanKong = 1 << 8,
		Kong = 1 << 9,		//明杠
		CanCealedKong = 1 << 10,
		CealedKong = 1 << 11,	//暗杠
		CanDotKong = 1 << 12,
		DotKong = 1 << 13,	//点杠
		CanHu = 1 << 14,
		Hu = 1 << 15,		//胡
		He = 1 << 16,		//黄庄
		Pass = 1 << 17,		//过
		CanTing = 1 << 18,
		Ting = 1 << 19,		//听
		Jiang = 1 << 20, 	//将
		Jiabei = 1 << 21	//加倍
	}

	export class ErmjBattleScene extends GameScene implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjBattleScene.exml";
			this.gameType = ChildGameType.ERMJ;
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public roomIndex: number = 0;
		public roomBet: eui.Label;

		public headIcon1: ErmjHeadIcon;
		public headIcon2: ErmjHeadIcon;
		public playerHeads: ErmjHeadIcon[] = null;

		public trusteeshipCancelBtn: IButton;
		public battleStartCountDown: game.BattleStartCountDown;
		public ermjGameInfo: ErmjGameInfo;
		public myCardGroup: ErmjMyCardGroup;
		public otherCardGroup: ErmjOtherCardGroup;
		public hitCardGroup1: HitCardGroup;
		public hitCardGroup2: HitCardGroup;
		public opraterGroup: eui.Group;
		public selectGroupPanel: ErmjSelectGroupPanel;
		public playTips: eui.Image;

		public selfAnimGroup: eui.Group;
		public otherAnimGroup: eui.Group;
		public waitAnimGroup: eui.Group;

		public selfTingIcon: eui.Image;
		public otherTingIcon: eui.Image;
		/** 听牌倍数界面 */
		public selfTingInfo: TingInfoPanel;

		/** 准备 */
		public startReady: eui.Image;
		/** 第一局 */
		private isfirstGame: boolean = false;
		/** 游戏数据 */
		private gameData: any = null;
		/** 自摸牌 */
		public zimoCard: eui.Image;
		/** 结算界面 */
		public battleFinish: ErmjResultPanel = null;
		/** 加倍界面 */
		public huOrDoublePanel: ErmjHuOrDoublePanel = null;
		/** 是否发牌 */
		public isDeal: boolean = false;
		/** 开游戏发牌动画数组 */
		private cardArr: Array<eui.Image> = [];

		private isShowTing: boolean = false;


		protected childrenCreated(): void {
			super.childrenCreated();
			if (this.roomBet) this.roomBet.visible = false;
			this.playerHeads = [this.headIcon1, this.headIcon2];

			this.battleStartCountDown = new game.BattleStartCountDown();
			if (this.ermjGameInfo && this.ermjGameInfo.countDownLabel) {
				this.battleStartCountDown.countDownLabel = this.ermjGameInfo.countDownLabel;
			}
			if (this.trusteeshipCancelBtn) {
				this.trusteeshipCancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrusteeshipCancelClick, this);
			}
			if (this.selfTingIcon) {
				this.selfTingIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selfTingIconClick, this);
			}

			this.zimoCard = new eui.Image();
		}

		private key: number = -1;
		public selfTingIconClick() {
			if (!this.selfTingInfo.visible) {
				if (this.key != -1) egret.clearTimeout(this.key);
				this.key = egret.setTimeout(function () {
					this.selfTingInfo.visible = false;
					this.key = -1;
				}, this, 3500);
			}
			this.selfTingInfo.visible = true;
			this.myCardGroup.showTingDarkCard();
		}

		public initScene() {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			this.roomIndex = roomData.gameLevel;

			this.trusteeshipCancelBtn.visible = false;
			this.ermjGameInfo.visible = false;
			this.ermjGameInfo.reset();

			this.hitCardGroup1.initGroup();
			this.hitCardGroup2.initGroup();
			this.opraterGroup.visible = false;
			this.selectGroupPanel.visible = false;
			this.otherTingIcon.visible = false;
			this.headIcon1.visible = this.headIcon2.visible = false;

			this.playTips.visible = false;
			this.isDeal = false;
			this.isfirstGame = false;
			this.selfTingIcon.visible = false;

			this.myCardGroup.visible = false;
			this.otherCardGroup.visible = false;
			this.myCardGroup.hideCardDark();
			this.otherCardGroup.hideCardDark();

			if (this.commonDB != null) {
				var index = this.getChildIndex(this.commonDB);
				if (index >= 0) {
					this.removeChildAt(index);
				}
			}
			if (this.commonDB2 != null) {
				var index = this.getChildIndex(this.commonDB2);
				if (index >= 0) {
					this.removeChildAt(index);
				}
			}

			this.selfTingInfo.visible = false;
			if (this.zimoCard != null && this.zimoCard.parent != null) {
				this.zimoCard.parent.removeChild(this.zimoCard);
				this.zimoCard = null;
			}
			ErmjSoundPlayer.instance.playBg();

			this.roomBet.text = "- 底注 " + game.RoomManager.getInstance().curRoomData.bottomBet.toFixed(2) + " -";
			this.roomBet.visible = true;
			this.startGame();
		}

		public ResumScene() {
			this.clearAllTimeOut();
			this.trusteeshipCancelBtn.visible = false;
			this.ermjGameInfo.visible = false;
			this.ermjGameInfo.reset();

			this.hitCardGroup1.initGroup();
			this.hitCardGroup2.initGroup();
			this.hitCardGroup1.visible = false;
			this.hitCardGroup2.visible = false;
			this.opraterGroup.visible = false;
			this.selectGroupPanel.visible = false;
			this.otherTingIcon.visible = false;


			this.playTips.visible = false;
			this.isDeal = false;
			this.isfirstGame = false;
			this.selfTingIcon.visible = false;

			this.myCardGroup.visible = false;
			this.otherCardGroup.visible = false;
			this.myCardGroup.hideCardDark();
			this.otherCardGroup.hideCardDark();

			this.selfTingInfo.visible = false;
			if (this.zimoCard != null && this.zimoCard.parent != null) {
				this.zimoCard.parent.removeChild(this.zimoCard);
				this.zimoCard = null;
			}
			if (this.commonDB != null) {
				var index = this.getChildIndex(this.commonDB);
				if (index >= 0) {
					this.removeChildAt(index);
				}
			}
			if (this.commonDB2 != null) {
				var index = this.getChildIndex(this.commonDB2);
				if (index >= 0) {
					this.removeChildAt(index);
				}
			}
			ErmjSoundPlayer.instance.playBg();
		}

		private onTrusteeshipCancelClick(): void {
			RoomRequest.trusteeship(ChildGameType.ERMJ, false);
		}

		public getHeadIconByPos(pos: number): ErmjHeadIcon {
			return this.playerHeads[pos - 1];
		}

		public startGame() {
			this.ResumScene();
			this.cleanBattle();
			this.startReady.visible = true;
		}

		public enterRoomRet() {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			let isHide: boolean = true;
			for (let i = 0; i < this.playerHeads.length; i++) {
				isHide = true;
				for (let j = 0; j < roomData.playerInfos.length; j++) {
					let playerInfo: game.PlayerInfo = roomData.playerInfos[j];
					if ((playerInfo.postion - 1) == i) {
						let headIcon = this.getHeadIconByPos(playerInfo.postion);

						headIcon.visible = true;
						headIcon.ShowPlayerHead(playerInfo);
						isHide = false;
					}
				}
				if (isHide) {
					this.playerHeads[i].visible = false;
				}
			}
			let myplayerInfo: game.PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId);
			if (roomData.status != GameStatus.RUNNING && myplayerInfo.isReady) {
				this.startReady.visible = true;
			}
		}

		/** 战斗开始 */
		public startGameRet(data) {
			// console.log('startGameRet ========== ', data);
			//删除准备
			this.startReady.visible = false;
			this.gameData = data;
			// 游戏状态开始
			if (game.RoomManager.getInstance().curRoomData != null) {
				game.RoomManager.getInstance().curRoomData.status = game.GameStatus.RUNNING;
			}

			if (this.isfirstGame == false && data.dice.length > 1) {
				this.isfirstGame = true;
				this.showTouzi(data.dice[0], data.dice[1]);
			} else {
				this.updateGameDate(this.gameData);
			}
		}

		private commonDB: any = null;
		private commonDB2: any = null;
		private showTouzi(anim1 = '1', anim2 = '2') {
			this.commonDB = new game.CommonDB("erqs_touzi_ske_dbbin", "erqs_touzi_tex_json", "erqs_touzi_tex_png", 'animation_' + anim1, 2000, true, () => {
				this.removeChild(this.commonDB);
				this.commonDB = null;
			});
			this.commonDB2 = new game.CommonDB("erqs_touzi_ske_dbbin", "erqs_touzi_tex_json", "erqs_touzi_tex_png", 'animation_' + anim2, 2000, true, () => {
				this.removeChild(this.commonDB2);
				this.commonDB2 = null;
			});
			this.commonDB.x = GameConfig.curWidth() / 2 - 60;
			this.commonDB.y = GameConfig.curHeight() / 2 + 20;
			this.commonDB2.x = GameConfig.curWidth() / 2 + 60;
			this.commonDB2.y = GameConfig.curHeight() / 2 + 20;
			this.addChild(this.commonDB);
			this.addChild(this.commonDB2);

			this.cardArr = [];
			var toX = 0;
			var toY = 0;
			var time = 0;
			this.registerTimeout(function () {
				for (let i = 0; i < 13; i++) {
					var card: eui.Image = new eui.Image();
					card.name = "fapai_card_id" + i;
					card.source = "ermj_battle_json.playedTiles0";
					card.validateNow();
					card.validateSize();
					card.anchorOffsetX = 75 / 2;
					card.anchorOffsetY = 114 / 2;
					card.x = GameConfig.curWidth() / 2;
					card.y = GameConfig.curHeight() / 2;
					card.scaleX = 0.5;
					card.scaleY = 0.5;
					toX = GameConfig.curWidth() * 0.05 + i * 75 + 75 / 2;
					toY = GameConfig.curHeight() - 114 + 114 / 2;
					this.addChild(card);
					this.cardArr.push(card);
					if (i % 4 == 0) {
						time += 150;
					}
					egret.Tween.removeTweens(card);
					egret.Tween.get(card).wait(time).to({ scaleX: 1, scaleY: 1, x: toX, y: toY }, 250).call(() => {
						if (i >= 12) {
							this.wave();
						}
					}, this);
				}
			}, 2000);
		}

		/***清除桌面信息 */
		private cleanBattle() {
			//删除准备 防止更新准备
			this.startReady.visible = false;
			//删除选牌打牌提示
			this.playTips.visible = false;
			//删除加倍界面
			if (this.huOrDoublePanel != null && this.huOrDoublePanel.visible) {
				PopUpManager.removePopUp(this.huOrDoublePanel);
				this.huOrDoublePanel = null;
			}
			this.selfTingInfo.visible = false;
			//删除选牌界面
			this.selectGroupPanel.visible = false;
			this.otherCardGroup.visible = false;
			this.ermjGameInfo.visible = false;
			this.hitCardGroup1.visible = false;
			this.hitCardGroup2.visible = false;
			this.myCardGroup.visible = false;
			this.opraterGroup.visible = false;
			this.selfAnimGroup.visible = false;
			this.otherAnimGroup.visible = false;
			this.trusteeshipCancelBtn.visible = false;
			this.otherTingIcon.visible = false;
			this.selfTingIcon.visible = false;
			this.startReady.visible = false;
			this.myCardGroup.drawedCard.visible = false;

		}

		private wave() {
			var times = 0;
			for (let i = 0; i < this.cardArr.length; i++) {
				var card = this.cardArr[i];
				egret.Tween.removeTweens(card);
				egret.Tween.get(card).wait(times).to({ scaleX: 1.1, scaleY: 1.1, }, 100).to({ scaleX: 1, scaleY: 1, }, 100).call(() => {
					if (i == this.cardArr.length - 1) {
						if (this.gameData) {
							this.updateGameDate(this.gameData);
						}
						for (let j = 0; j < this.cardArr.length; j++) {
							var card = this.cardArr[j];
							if (card != null && this.getChildIndex(card) != -1) {
								this.removeChild(card);
							}
						}
						this.cardArr = [];
					}
				}, this);
				times += 50;
			}
		}

		//当前出牌者
		private currentPlayerId = 0;
		/** 更新游戏数据 */
		public updateGameDate(data) {
			console.log('updateGameDates ========== ', data);
			this.currentPlayerId = Number(data.currentPlayerId);
			var direct = 0;
			if (this.currentPlayerId != UserService.instance.playerId) {
				direct = 1;
			} else {
				direct = 0;
			}
			//更新牌池当前数量
			this.ermjGameInfo.showGameInfo(data.cardPoolsCount, direct, data.downTime);
			for (var i = 0; i < data.playerInfo.length; i++) {
				var playInfo = data.playerInfo[i];
				var playerId = Number(playInfo.playerId);
				//本家
				if (playerId == UserService.instance.playerId) {
					this.myCardGroup.visible = true;

					//显示吃碰杠的牌 为空就清除
					this.myCardGroup.showFallCards(playInfo.fallCards);

					//手牌 如果没发过牌  (playType的deal有值就可做成统一逻辑)
					if (!this.isDeal) {
						this.isDeal = true;
						this.myCardGroup.visible = true;
						this.myCardGroup.dealCard(data.handCards);
						this.ermjGameInfo.visible = true;
					} else {
						//更新牌面数据
						this.myCardGroup.updateHandCards(data.handCards);
					}

					//打出的牌
					this.hitCardGroup1.visible = true;
					if ((playInfo.playType & <number>MJPlayType.Discard) > 0 ) {
						this.hitCardGroup1.tweenUpdateHitCard(playInfo.hitCards, this.myCardGroup.drawedCard);
					} else {
						this.hitCardGroup1.updateHitCard(playInfo.hitCards);
					}

					if (playInfo.isTing && playInfo.tingCards != null && playInfo.tingCards.length > 0) {
						this.showSelfTingInfo(playInfo.tingCards);
						if (!this.isShowTing) {
							this.isShowTing = true;
						} else {
							this.selfTingInfo.visible = false;
						}
					} else {
						this.selfTingInfo.visible = false;
					}

					//听牌
					if (playInfo.isTing) {
						this.selfTingIcon.visible = true;
						this.myCardGroup.showTingDarkCard();
					} else {
						this.selfTingIcon.visible = false;
						this.myCardGroup.hideCardDark();
					}

					//判断是否为直接打牌
					if ((playInfo.playType & <number>MJPlayType.Chi) > 0
						|| (playInfo.playType & <number>MJPlayType.Pong) > 0
					) {
						this.myCardGroup.rightShiftCard();
					}

					//过程逻辑
					this.processStepLogic(playInfo);

					//摸牌
					if ((playInfo.playType & <number>MJPlayType.Draw) > 0) {
						this.myCardGroup.visible = true;
						this.myCardGroup.drawCard(playInfo.cards[0]);
					}

					//托管 
					if (playInfo.isTrusteeship) {
						this.trusteeshipCancelBtn.visible = true;
						//设置不能选中牌
						this.myCardGroup.setOperattion(false);
						this.opraterGroup.visible = false;
					} else {
						this.trusteeshipCancelBtn.visible = false;
						//不是托管 才有操作逻辑
						this.showStepInfo(playInfo);
						//设置可以选中牌
						this.myCardGroup.canOperation(playInfo.playType);
					}
				} else { //对家
					//显示吃碰杠的牌 为空就清除
					this.otherCardGroup.showFallCards(playInfo.fallCards);

					//显示手牌
					this.otherCardGroup.visible = true
					var backCardArr: number[] = new Array<number>();
					if (!this.otherCardGroup.isDeal) {
						this.otherCardGroup.dealCard();
						//听牌了 明牌
						if (data.oppositeCards != null && data.oppositeCards.length > 0) {
							if (playInfo != null && ((playInfo.playType & <number>MJPlayType.Draw) > 0)) {
								var isAdd = true;
								for (var j = 0; j < data.oppositeCards.length; j++) {
									var vCard = data.oppositeCards[j];
									if (playInfo.cards.indexOf(vCard) != -1 && isAdd) {
										isAdd = false;
										continue;
									}
									backCardArr.push(vCard);
								}
							} else {
								backCardArr = data.oppositeCards;
							}
							this.otherCardGroup.updateHandCards(backCardArr);
						}
					} else {
						//1.已听牌
						if (data.oppositeCards != null && data.oppositeCards.length > 0) {
							if (playInfo != null && ((playInfo.playType & <number>MJPlayType.Draw) > 0)) {
								var isAdd = true;
								for (var j = 0; j < data.oppositeCards.length; j++) {
									var vCard = data.oppositeCards[j];
									if (playInfo.cards.indexOf(vCard) != -1 && isAdd) {
										isAdd = false;
										continue;
									}
									backCardArr.push(vCard);
								}
							} else {
								backCardArr = data.oppositeCards;
							}
						} else {
							// 根据牌的数量显示对家牌的背面
							for (var j = 0; j < Number(playInfo.cardCount); j++) {
								backCardArr.push(0);
							}
							// 摸牌去掉最后一张牌
							if ((playInfo.playType & <number>MJPlayType.Draw) > 0) {
								backCardArr.pop();
							}
						}
						this.otherCardGroup.updateHandCards(backCardArr);
					}

					//打出的牌
					this.hitCardGroup2.visible = true;
					var myPlayInfo = this.getPlayerInfo(UserService.instance.playerId);
					var isPass: boolean = false;
					if (myPlayInfo != null && ((myPlayInfo.playType & <number>MJPlayType.Pass) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.Chi) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.Pong) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.Kong) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.DotKong) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.CealedKong) > 0
						|| (myPlayInfo.playType & <number>MJPlayType.Jiabei) > 0
					)) {
						isPass = true;
					}
					//如果是pass 就不在播放动画
					if ((playInfo.playType & <number>MJPlayType.Discard) > 0 && !isPass) {
						this.hitCardGroup2.tweenUpdateHitCard(playInfo.hitCards, this.otherCardGroup.drawedCard);
					} else {
						this.hitCardGroup2.updateHitCard(playInfo.hitCards);
						if ((myPlayInfo.playType & <number>MJPlayType.Jiabei) > 0) {
							this.hitCardGroup2.showArrow();
						}
					}

					if (playInfo.isTing) {
						this.otherTingIcon.visible = true;
					} else {
						this.otherTingIcon.visible = false;
					}

					//过程逻辑
					this.processStepLogic(playInfo);

					// 最先摸牌
					if ((playInfo.playType & <number>MJPlayType.Draw) > 0) {
						if (myPlayInfo.isTing) {
							this.otherCardGroup.drawCard(playInfo.cards[0]);
						} else {
							this.otherCardGroup.drawCard(0);
						}
					}
				}

			}
		}

		private getPlayerInfo(playerId: number): any {
			for (var i = 0; i < this.gameData.playerInfo.length; i++) {
				var playInfo = this.gameData.playerInfo[i];
				if (playInfo.playerId == playerId) {
					return playInfo;
				}
			}
			return null;
		}

		// 过程逻辑
		private processStepLogic(playInfo) {
			var playerId = Number(playInfo.playerId);
			// console.log('step ========= ', playInfo, handCards);

			//打牌
			if ((playInfo.playType & <number>MJPlayType.Discard) > 0 && playInfo.cards[0] > 0) {
				// 点击加倍不出牌
				if ((playInfo.playType & <number>MJPlayType.Jiabei)) return;
				ErmjSoundPlayer.instance.playSendCard();
				if (playerId == UserService.instance.playerId) {
					this.opraterGroup.visible = false;
					this.myCardGroup.drawedCard.visible = false;
					if (this.playTips.visible) {
						this.playTips.visible = false;
					}
					ErmjSoundPlayer.instance.playMeCardType(playInfo.cards[0]);
					// this.hitCardGroup1.showArrow();
					this.hitCardGroup2.hideArrow();
				} else {
					ErmjSoundPlayer.instance.playCardType(playInfo.cards[0]);
					this.otherCardGroup.drawedCard.visible = false;
					this.hitCardGroup1.hideArrow();
					// this.hitCardGroup2.showArrow();
				}
			}

			//碰牌
			if ((playInfo.playType & <number>MJPlayType.Pong) > 0) {
				if (playerId == UserService.instance.playerId) {
					this.myCardGroup.visible = true;
					ErmjSoundPlayer.instance.playMeCardType("peng");
					this.showDBClip("erqs_pengtext", 1);
				} else {
					// this.otherCardGroup.showFallCards(playInfo.fallCards);
					// this.otherCardGroup.drawedCard.visible = true;
					this.otherCardGroup.visible = true;
					ErmjSoundPlayer.instance.playCardType("peng");
					this.showDBClip("erqs_pengtext", 2);
				}
				return;
			}

			//吃牌
			if ((playInfo.playType & <number>MJPlayType.Chi) > 0) {
				if (playerId == UserService.instance.playerId) {
					this.myCardGroup.visible = true;
					this.selectGroupPanel.visible = false;
					ErmjSoundPlayer.instance.playMeCardType("chi");
					this.showDBClip("erqs_chitext", 1);
				} else {
					// this.otherCardGroup.showFallCards(playInfo.fallCards);
					this.otherCardGroup.drawedCard.visible = true;
					this.otherCardGroup.visible = true;
					ErmjSoundPlayer.instance.playCardType("chi");
					this.showDBClip("erqs_chitext", 2);
				}
				return;
			}

			//杠牌
			if ((playInfo.playType & <number>MJPlayType.Kong) > 0
				|| (playInfo.playType & <number>MJPlayType.DotKong) > 0
				|| (playInfo.playType & <number>MJPlayType.CealedKong) > 0) {
				if (playerId == UserService.instance.playerId) {
					this.myCardGroup.visible = true;
					this.selectGroupPanel.visible = false;
					ErmjSoundPlayer.instance.playMeCardType("gang");
					this.showDBClip("erqs_gangtexteffect", 1);
				} else {
					// this.otherCardGroup.showFallCards(playInfo.fallCards);
					this.otherCardGroup.drawedCard.visible = true;
					this.otherCardGroup.visible = true;
					ErmjSoundPlayer.instance.playCardType("gang");
					this.showDBClip("erqs_gangtexteffect", 2);
				}
				return;
			}

			//黄庄
			if ((playInfo.playType & <number>MJPlayType.He) > 0) {
				return;
			}

			//胡
			if ((playInfo.playType & <number>MJPlayType.Hu) > 0) {
				this.selfTingInfo.visible = false;
				this.selfTingIcon.visible = false;
				this.myCardGroup.hideCardDark();
				// this.otherCardGroup.hideCardDark();
				return;
			}
		}


		//推送听 加倍等信息
		public onPushBattleStep(data) {
			var playerId = Number(data.playerId);
			switch (data.playType) {
				case <number>MJPlayType.Ting: {
					if (playerId == UserService.instance.playerId) {
						ErmjSoundPlayer.instance.playTingBg();
						ErmjSoundPlayer.instance.playMeCardType("ting");
						this.showDBClip("erqs_tingtext", 1);
					} else {
						ErmjSoundPlayer.instance.playMeCardType("ting");
						this.showDBClip("erqs_tingtext", 2);
					}
					break;
				}
				case <number>MJPlayType.Jiabei: {
					ErmjSoundPlayer.instance.playDouble();
					break;
				}
			}
		}

		/** 结算 */
		public onBattleFinish(data) {
			this.startReady.visible = false;
			if (this.huOrDoublePanel != null && this.huOrDoublePanel.visible) {
				PopUpManager.removePopUp(this.huOrDoublePanel);
				this.huOrDoublePanel = null;
			}
			var position: number = 1;
			if (Number(data.winPlayerId) == UserService.instance.playerId) {
				position = 1;
			} else {
				position = 2;
			}

			//data.type 1点炮 2自摸 3黄庄
			if (data.type == 1) {
				ErmjSoundPlayer.instance.playFangqiang();
				this.showZimo(position, data.huCard);
			} else if (data.type == 2) {
				ErmjSoundPlayer.instance.playZimo();
				this.showDBClip("erqs_zimotext", position);
				this.registerTimeout(() => {
					this.showZimo(position, data.huCard);
				}, 1000);
			} else if (data.type == 3) {
				this.trusteeshipCancelBtn.visible = false;
			}
			this.otherCardGroup.updateHandCards(data.oppositeCards);
			
			this.registerTimeout(() => {
				if (this.battleFinish == null) {
					this.battleFinish = new ErmjResultPanel;
				}
				PopUpManager.addPopUp(this.battleFinish, true, 0, 0, 1);
				this.battleFinish.showResult(data);
				// 游戏准备
				if (game.RoomManager.getInstance().curRoomData != null) game.RoomManager.getInstance().curRoomData.status = game.GameStatus.PREPARE;
				this.startReady.visible = false;
			}, 2000);
		}

		private showZimo(position: number, huCard) {
			this.myCardGroup.hideCardDark();
			// this.otherCardGroup.hideCardDark();
			var commonDB = new game.CommonDB("erqs_luoxuaneffect_ske_dbbin", "erqs_luoxuaneffect_tex_json", "erqs_luoxuaneffect_tex_png", "animation", 1000);
			if (position == 1) {
				if (this.zimoCard == null) {
					this.zimoCard = new eui.Image();
				}
				this.zimoCard.source = "ermj_battle_json.playedTiles" + huCard;
				this.zimoCard.x = 1085
				this.zimoCard.y = -148;
				commonDB.x = this.zimoCard.x + 25;
				commonDB.y = this.zimoCard.y + 70;
				this.myCardGroup.addChild(this.zimoCard);
				this.myCardGroup.addChild(commonDB);
			} else {
				this.otherCardGroup.drawedCard.visible = true;
				commonDB.x = this.otherCardGroup.drawedCard.x + 25;
				commonDB.y = this.otherCardGroup.drawedCard.y + 70;
				this.otherCardGroup.showHuCard(huCard);
				this.otherCardGroup.addChild(commonDB);
			}

		}

		private showDBClip(anim: string, position: number) {
			this.selfAnimGroup.visible = true;
			this.otherAnimGroup.visible = true;
			var commonDB = new game.CommonDB(anim + "_ske_dbbin", anim + "_tex_json", anim + "_tex_png", "animation", 2000, true, () => {
				if (position == 1) {
					this.selfAnimGroup.visible = false;
					this.otherAnimGroup.visible = false;
				} else {
					this.otherAnimGroup.addChild(commonDB);
				}
			});
			if (position == 1) {
				this.selfAnimGroup.addChild(commonDB);
			} else {
				this.otherAnimGroup.addChild(commonDB);
			}
		}

		// 操作功能界面
		private showStepInfo(playInfo) {
			this.opraterGroup.removeChildren();
			this.opraterGroup.visible = true;
			var isDrawBeforeOp = false;
			var isDrawAfterOp = false;

			//可点杠
			if (this.processCanDotKong(playInfo)) {
				isDrawBeforeOp = true;
			}

			//可明杠和暗杠
			if (this.processCanDrawKong(playInfo)) {
				isDrawAfterOp = true;
			}

			//可吃牌
			if (this.processCanChi(playInfo)) {
				isDrawBeforeOp = true;
			}

			//可碰牌
			if (this.processCanPong(playInfo)) {
				isDrawBeforeOp = true;
			}

			//可听牌
			if (this.processCanTing(playInfo)) {
				if ((playInfo.playType & <number>MJPlayType.Draw) > 0) {
					isDrawAfterOp = true;
				} else {
					isDrawBeforeOp = true;
				}
			}

			//过牌操作
			if (playInfo.playType != 0 && (isDrawBeforeOp || isDrawAfterOp)) {
				this.opraterGroup.visible = true;
				var passButton = new ErmjAnimBtn;
				passButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					this.opraterGroup.visible = false;
					ErmjRequest.SendBattleStep(<number>MJPlayType.Pass, playInfo.cards);
				}, this);
				passButton.init('ermj_battle_json.ermj_pass_btn', 'erqs_guomenu');
				this.opraterGroup.addChildAt(passButton, 0);
			} else {
				this.opraterGroup.visible = false;
			}

			//可胡牌 特殊操作显示加倍界面
			if (this.processCanHu(playInfo)) {
				// if ((playInfo.playType & <number>MJPlayType.Draw) > 0) {
				// 	//自摸
				// 	isDrawAfterOp = true;
				// } else {
				// 	//胡
				// 	isDrawBeforeOp = true;
				// }
			}
		}

		//是否胡牌
		private processCanHu(playInfo): boolean {
			if ((playInfo.playType & <number>MJPlayType.CanHu) > 0) {
				if (this.huOrDoublePanel == null) {
					this.huOrDoublePanel = new ErmjHuOrDoublePanel();
				}
				PopUpManager.addPopUp(this.huOrDoublePanel, true, 0, 0, 1)

				this.huOrDoublePanel.init(playInfo.cards, playInfo.totalFan);
				this.opraterGroup.removeChildren();
				this.opraterGroup.visible = false;
				return true;
			}
			return false;
		}

		//是否点杠
		private processCanDotKong(playInfo) {
			if ((playInfo.playType & <number>MJPlayType.CanDotKong) > 0) {
				var kongButton = new ErmjAnimBtn();
				kongButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					this.opraterGroup.visible = false;
					ErmjRequest.SendBattleStep(MJPlayType.DotKong, playInfo.cards);
				}, this);
				kongButton.init('ermj_battle_json.ermj_gang_btn', 'erqs_gangmenu_guess_2');
				this.opraterGroup.addChild(kongButton);
				return true;
			}
			return false;
		}

		//是否明杠和暗杠
		private processCanDrawKong(playInfo) {
			if ((playInfo.playType & <number>MJPlayType.CanKong) > 0
				|| (playInfo.playType & <number>MJPlayType.CanCealedKong) > 0) {
				var kongButton = new ErmjAnimBtn();
				kongButton.init('ermj_battle_json.ermj_gang_btn', 'erqs_gangmenu_guess_2');
				this.opraterGroup.addChild(kongButton);
				kongButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					//杠的牌组大于1， 选择
					//否则直接发送gang的行为
					var gangList = this.myCardGroup.canSelfGongList(playInfo.cards[0]);
					if (gangList.length > 1) {
						this.selectGroupPanel.showGang(gangList);
						this.opraterGroup.visible = false;
					} else {
						ErmjRequest.SendBattleStep(gangList[0]["playType"], gangList[0]["card"]);
					}
				}, this);
				return true;
			}
			return false;
		}

		//是否吃牌
		private processCanChi(playInfo) {
			if ((playInfo.playType & <number>MJPlayType.CanChi) > 0) {
				var chiButton = new ErmjAnimBtn();
				chiButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					var chiList = this.myCardGroup.canChiList(playInfo.cards[0]);
					if (chiList.length == 1) {
						this.opraterGroup.visible = false;
						ErmjRequest.SendBattleStep(MJPlayType.Chi, chiList[0]);
					} else {
						this.selectGroupPanel.showChi(chiList);
						this.opraterGroup.removeChildren();
						var cancelButton = new eui.Image();
						cancelButton.source = "ermj_battle_json.cancel_btn";
						this.opraterGroup.addChild(cancelButton);
						cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
							this.selectGroupPanel.visible = false;
							this.opraterGroup.visible = false;
							this.showStepInfo(playInfo);
						}, this);
					}
				}, this);
				chiButton.init('ermj_battle_json.ermj_chi_btn', 'erqs_chimenu_guess_3');
				this.opraterGroup.addChild(chiButton);
				return true;
			}
			return false;
		}

		//是否碰牌
		private processCanPong(playInfo) {
			if ((playInfo.playType & <number>MJPlayType.CanPong) > 0) {
				var pongButton = new ErmjAnimBtn();
				pongButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					this.opraterGroup.visible = false;
					ErmjRequest.SendBattleStep(MJPlayType.Pong, playInfo.cards);
				}, this);
				pongButton.init('ermj_battle_json.ermj_peng_btn', 'erqs_pengmenu_guess_5');
				this.opraterGroup.addChild(pongButton);
				return true;
			}
			return false;
		}

		//是否听牌
		private processCanTing(playInfo) {
			if (playInfo.tingDiscards != null && playInfo.tingDiscards.length > 0
				&& ((playInfo.playType & <number>MJPlayType.Draw) > 0
					|| (playInfo.playType & <number>MJPlayType.Chi) > 0
					|| (playInfo.playType & <number>MJPlayType.Pong) > 0)) {
				let tingDiscards = playInfo.tingDiscards;
				var tingButton = new ErmjAnimBtn();
				tingButton.init('ermj_battle_json.ermj_ting_btn', 'erqs_tingmenu_guess_4');
				this.opraterGroup.addChild(tingButton);
				tingButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
					//选择要听的牌，显示取消按钮
					this.myCardGroup.showCanTingCard(tingDiscards);
					this.playTips.visible = true;
					this.opraterGroup.removeChildren();
					var cancelButton = new eui.Image();
					cancelButton.source = "ermj_battle_json.cancel_btn";
					this.opraterGroup.addChild(cancelButton);
					cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
						this.opraterGroup.visible = false;
						this.playTips.visible = false;
						this.selfTingIcon.visible = false;
						this.selfTingInfo.visible = false;
						this.myCardGroup.hideCardDark();
						this.showStepInfo(playInfo);
					}, this);
				}, this);
				return true;
			}
			return false;
		}

		// 听牌倍数界面
		public showSelfTingInfo(tingHuInfos) {
			if (this.selfTingInfo.visible == false) {
				this.selfTingInfo.visible = true;
				if (this.key != -1) {
					egret.clearTimeout(this.key);
				}
				var t: number = new Date().getTime();
				this.key = egret.setTimeout(function () {
					this.selfTingInfo.visible = false;
					this.key = -1;
				}, this, 3500);

			}
			this.selfTingInfo.showTingInfo(tingHuInfos);
		}

		private timeoutIdList: Array<number> = [];
		public backToMainBg(): void {
			SoundMenager.instance.playBg("hallBG_mp3");
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

		public clearAllTimeOut(): void {
			if (this.timeoutIdList.length > 0) {
				for (let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}

		public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			let playerInfo: game.PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId)
			playerInfo.money =totalmoney;
			this.headIcon1.showImmGold(playerInfo.money);
		}
		public trusteeship() {
			this.trusteeshipCancelBtn.visible = false;
			var playerInfo: any = this.getPlayerInfo(UserService.instance.playerId);
			if (playerInfo != null) {
				//设置可以选中牌
				this.myCardGroup.canOperation(playerInfo.playType);
				this.showStepInfo(playerInfo);
			}
		}
	}
}