
class QynnBattleScene extends game.GameScene implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/qynn/QynnBattleScene.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public menu: QynnMenu;

	public player1Icon: QynnHeadIcon;
	public player2Icon: QynnHeadIcon;
	public player3Icon: QynnHeadIcon;
	public player4Icon: QynnHeadIcon;
	public player5Icon: QynnHeadIcon;
	public qzBtnGroup: eui.Group;
	public xzBtnGroup: eui.Group;

	public playerRsTips1: eui.BitmapLabel;
	public playerRsTips2: eui.BitmapLabel;
	public playerRsTips3: eui.BitmapLabel;
	public playerRsTips4: eui.BitmapLabel;
	public playerRsTips5: eui.BitmapLabel;

	public playerRsBg1: eui.BitmapLabel;
	public playerRsBg2: eui.BitmapLabel;
	public playerRsBg3: eui.BitmapLabel;
	public playerRsBg4: eui.BitmapLabel;
	public playerRsBg5: eui.BitmapLabel;

	public playerRsGroup1: eui.Group;
	public playerRsGroup2: eui.Group;
	public playerRsGroup3: eui.Group;
	public playerRsGroup4: eui.Group;
	public playerRsGroup5: eui.Group;

	public bottomBetLabel: eui.Label;
	public gameLeveLabel: eui.Label;

	public startAnim: DragonAnim;
	public recoutTips: QynnTips;
	public noRobBtn: IButton;
	public multiBtn1: IButton;
	public multiBtn2: IButton;
	public multiBtn3: IButton;
	public multiBtn4: IButton;
	public multiBtn5: IButton;
	public multiBtn10: IButton;
	public multiBtn15: IButton;
	public multiBtn20: IButton;
	public showCardBtn: IButton;
	public battleStartCountDown: game.BattleStartCountDown;

	public playerCard1: QYNNCardGroup;
	public playerCard2: QYNNCardGroup;
	public playerCard3: QYNNCardGroup;
	public playerCard4: QYNNCardGroup;
	public playerCard5: QYNNCardGroup;

	public goldContentLayer: egret.DisplayObjectContainer;
	public darkSprite: egret.Sprite;

	//----------数据与结构
	public playerHeads: QynnHeadIcon[] = null;
	public playerCardArr: QYNNCardGroup[] = null;
	public playerRsTipArr: eui.BitmapLabel[] = null;
	public playerRsbgArr: eui.BitmapLabel[] = null;
	public playerRsGroupArr: eui.Group[] = null;
	private qynnData: QynnData = null;
	private positionMap: Object = null;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.playerHeads = [this.player1Icon, this.player2Icon, this.player3Icon, this.player4Icon, this.player5Icon];
		this.playerCardArr = [this.playerCard1, this.playerCard2, this.playerCard3, this.playerCard4, this.playerCard5];
		this.playerRsTipArr = [this.playerRsTips1, this.playerRsTips2, this.playerRsTips3, this.playerRsTips4, this.playerRsTips5];
		this.playerRsbgArr = [this.playerRsBg1, this.playerRsBg2, this.playerRsBg3, this.playerRsBg4, this.playerRsBg5];
		this.playerRsGroupArr = [this.playerRsGroup1, this.playerRsGroup2, this.playerRsGroup3, this.playerRsGroup4, this.playerRsGroup5];

		this.battleStartCountDown = new game.BattleStartCountDown();
		this.battleStartCountDown.countDownLabel = this.recoutTips.countLabel;
		this.goldContentLayer = new egret.DisplayObjectContainer();
		this.addChild(this.goldContentLayer);
		this.addChild(this.menu);

		this.darkSprite = new egret.Sprite();
		this.darkSprite.graphics.clear();
		this.darkSprite.graphics.beginFill(0x000000, 0.5);
		this.darkSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
		this.darkSprite.graphics.endFill();
		this.darkSprite.width = GameConfig.curWidth();
		this.darkSprite.height = GameConfig.curHeight();
		this.darkSprite.visible = false;
		this.addChild(this.darkSprite);

		this.noRobBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoRob, this);
		this.multiBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQZMulti1, this);
		this.multiBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQZMulti2, this);
		this.multiBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQZMulti3, this);
		this.multiBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQZMulti4, this);
		this.multiBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXZMulti5, this);
		this.multiBtn10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXZMulti10, this);
		this.multiBtn15.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXZMulti15, this);
		this.multiBtn20.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXZMulti20, this);
		this.showCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowCard, this);
	}

	public onShowCard() {
		QynnRequest.SendLookCar(0);
	}

	public getHeadIconByPos(pos: number): QynnHeadIcon {
		return this.playerHeads[pos - 1];
	}

	public initScene() {
		this.updateScene();

		this.playerCard1.hideCard();
		this.playerCard2.hideCard();
		this.playerCard3.hideCard();
		this.playerCard4.hideCard();
		this.playerCard5.hideCard();

		this.qzBtnGroup.visible = false;
		this.xzBtnGroup.visible = false;
		this.showCardBtn.visible = false;
		this.startAnim.visible = false;

		this.playerRsGroup1.visible = this.playerRsGroup2.visible = this.playerRsGroup3.visible = this.playerRsGroup4.visible = this.playerRsGroup5.visible = false;

		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		this.bottomBetLabel.text = "- 底注 : " + roomData.bottomBet.toFixed(2) + " -";
		this.gameLeveLabel.text = this.getName();
		QYNNSoundPlayer.instance.playQYNNBg();
	}

	public getName(): string {
		switch (game.RoomManager.getInstance().curRoomData.gameLevel) {
			case 0:
				{
					return "体验场";
				}
			case 1:
				{
					return "初级场";
				}
			case 2:
				{
					return "中级场";
				}
			case 3:
				{
					return "高级场";
				}
		}
		return "房间";
	}

	public ResumScene() {
		this.clearAllTimeOut();
		this.qynnData = new QynnData();
		this.playerCard1.hideCard();
		this.playerCard2.hideCard();
		this.playerCard3.hideCard();
		this.playerCard4.hideCard();
		this.playerCard5.hideCard();
		this.qzBtnGroup.visible = false;
		this.xzBtnGroup.visible = false;
		this.showCardBtn.visible = false;
		this.darkSprite.visible = false;
		this.playerRsGroup1.visible = this.playerRsGroup2.visible = this.playerRsGroup3.visible = this.playerRsGroup4.visible = this.playerRsGroup5.visible = false;
		for (var i = 0; i < this.playerHeads.length; i++) {
			var playerHeads = this.playerHeads[i];
			playerHeads.visible = false;
			playerHeads.clearClock();
		}
		if (this.goldContentLayer.numChildren > 0) {
			this.goldContentLayer.removeChildren();
		}
	}

	public updateScene() {
		this.clearAllTimeOut();
		this.qynnData = new QynnData();
		// 更新头像信息
		this.clearPlayerHeads();
		this.darkSprite.visible = false;
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		for (let i = 0; i < roomData.playerInfos.length; i++) {
			let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
			let headIcon = this.getHeadIconByPos(playerInfo.postion);
			headIcon.visible = true;
			headIcon.ShowPlayerHead(playerInfo);
			headIcon.showBanker(false);
			if (roomData.status != game.GameStatus.PREPARE) {
				if (playerInfo.playerId == game.UserService.instance.playerId) {
					this.menu.playerState = QYNNPlayerState.ob;
				}
			} else {
				if (playerInfo.playerId == game.UserService.instance.playerId) {
					this.menu.playerState = QYNNPlayerState.qzing;
				}
			}
		}
		if (roomData.status == game.GameStatus.PREPARE) {
			if (roomData.downTime > 0) {
				//初始化界面，并显示游戏开始倒计时
				this.recoutTips.visible = true;
				this.recoutTips.initUI("qznn_battle_json.start_tips", roomData.downTime);
				if (this.battleStartCountDown == null) {
					this.battleStartCountDown = new game.BattleStartCountDown();
				}
				this.battleStartCountDown.startCountDown(roomData.downTime);
			} else {
				//没有打到最大人数，显示等待界面，隐藏倒计时界面
				this.recoutTips.visible = true;
				this.recoutTips.initUI("qznn_battle_json.wait_add_tips", "");
				this.recoutTips.startEllipsis();
			}
		}
	}

	/** 开始游戏 */
	public onBatteStart(data) {
		// 清除玩家牌面
		for (var i = 0; i < this.playerCardArr.length; i++) {
			var playerCard = this.playerCardArr[i];
			playerCard.hideCard();
		}
		this.playerRsGroup1.visible = this.playerRsGroup2.visible = this.playerRsGroup3.visible = this.playerRsGroup4.visible = this.playerRsGroup5.visible = false;
		QYNNSoundPlayer.instance.playerGameStart();
		//强制切换房间状态为：运行中
		game.RoomManager.getInstance().curRoomData.status = game.GameStatus.RUNNING;
		this.recoutTips.visible = false;
		if (this.battleStartCountDown == null) {
			this.battleStartCountDown = new game.BattleStartCountDown();
		}
		this.battleStartCountDown.countDownLabel = this.recoutTips.countLabel;
		this.startAnim.visible = true;
		this.startAnim.playerOnce();
		var self = this;
		this.registerTimeout(function () {
			self.startAnim.visible = false;
			self.startAnim.stop();
		}, 500);
		this.registerTimeout(function () {
			this.recoutTips.visible = true;
			this.qzBtnGroup.visible = true;
			this.xzBtnGroup.visible = false;
			this.recoutTips.initUI("qznn_battle_json.wait_banker_tips", data.downTime);
			this.battleStartCountDown.startCountDown(data.downTime);
		}, 1000);

		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		this.positionMap = new Object();
		for (let i = 0; i < roomData.playerInfos.length; i++) {
			let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
			this.positionMap[playerInfo.playerId] = playerInfo.postion;
			let headIcon = this.getHeadIconByPos(playerInfo.postion);
			this.qynnData.addPlayer(playerInfo);
			if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(playerInfo.playerId).state = QYNNPlayerState.qzing;
			headIcon.showBanker(false);
			headIcon.alpha = 1;
			headIcon.showClock(data.downTime);
		}
	}

	public isValidate(playerId): boolean {
		if (this.qynnData == null || this.qynnData.getPlayerById(Number(playerId)) == null ||
			(this.qynnData.getPlayerById(Number(playerId)) != null && this.qynnData.getPlayerById(Number(playerId)).state == QYNNPlayerState.ob)) {
			return false;
		}
		return true;
	}

	/** 抢庄 */
	public onQZRet(data) {
		// 清除玩家牌面
		for (var i = 0; i < this.playerCardArr.length; i++) {
			var playerCard = this.playerCardArr[i];
			playerCard.hideCard();
		}
		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.qzing;
		if (Number(data.playerId) == game.UserService.instance.playerId) {
			if (!this.isValidate(data.playerId)) {
				return;
			}
			this.qzBtnGroup.visible = false;
			this.recoutTips.visible = true;
			this.recoutTips.initUI("qznn_battle_json.wait_banker_tips", "");
			this.recoutTips.startEllipsis();
			var playerHead = this.getHeadIconByPos(1);
			if (playerHead == null) {
				return;
			}
			playerHead.clearClock();
			playerHead.bebankerBitlabel.visible = true;
			if (data.multiple == 0) {
				playerHead.bebankerBitlabel.text = "b";
			} else {
				playerHead.bebankerBitlabel.text = "x" + data.multiple;
			}
		} else {
			if (this.positionMap[Number(data.playerId)] == null) {
				return;
			}
			var position = this.positionMap[Number(data.playerId)];
			var playerHead = this.getHeadIconByPos(position);
			playerHead.clearClock();
			playerHead.bebankerBitlabel.visible = true;
			if (data.multiple == 0) {
				playerHead.bebankerBitlabel.text = "b";
			} else {
				playerHead.bebankerBitlabel.text = "x" + data.multiple;
			}
		}
	}

	private qzHeadIcons: QynnHeadIcon[];
	private currEffectIndex: number = 0;
	/** 选庄 */
	public onPushBanker(data) {
		// 清除玩家牌面
		for (var i = 0; i < this.playerCardArr.length; i++) {
			var playerCard = this.playerCardArr[i];
			playerCard.hideCard();
		}
		if (this.qynnData != null) this.qynnData.setBanker(data.bankerId);
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		var headIcon: QynnHeadIcon;

		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.qzed;
		if (data.robPlayerId.length > 1) {
			this.qzHeadIcons = new Array<QynnHeadIcon>();
			for (var i = 0; i < data.robPlayerId.length; i++) {
				headIcon = this.playerHeads[roomData.getPlayerInfo(data.robPlayerId[i]).postion - 1];
				this.qzHeadIcons.push(headIcon);
			}
			this.currEffectIndex = 0;
			this.onQzEffect(500, data);
		} else {
			headIcon = this.playerHeads[roomData.getPlayerInfo(data.bankerId).postion - 1];
			headIcon.showEffect();
			QYNNSoundPlayer.instance.playerBanker();
			this.onXZStart(data);
		}
	}

	/** 选庄动画 */
	private onQzEffect(delay: number, data) {
		let self = this;
		// 显示全屏黑透
		this.darkSprite.visible = true;
		this.registerTimeout(() => {
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;

			var headIcon = self.qzHeadIcons[self.currEffectIndex];
			self.currEffectIndex++;

			if (delay < 50) {
				//选定
				headIcon = self.playerHeads[roomData.getPlayerInfo(data.bankerId).postion - 1];
				headIcon.showEffect();
				// 清除全屏黑透
				this.darkSprite.visible = false;
				QYNNSoundPlayer.instance.playerBanker();
				self.onXZStart(data);
			} else {
				headIcon.flashImage(headIcon.boxLightImg, 1);
				if (self.currEffectIndex >= self.qzHeadIcons.length) {
					self.currEffectIndex = 0;
					delay /= 2;
				}
				delay = Math.max(Math.floor(delay), 0);
				QYNNSoundPlayer.instance.playerChoosing();
				self.onQzEffect(delay, data);
			}
		}, delay);
	}

	/** 下注 */
	public onXZStart(data) {
		// 清除玩家牌面
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		for (var i = 0; i < this.playerCardArr.length; i++) {
			var playerCard = this.playerCardArr[i];
			playerCard.hideCard();
		}

		// 清除全屏黑透
		this.darkSprite.visible = false;
		this.playerRsGroup1.visible = this.playerRsGroup2.visible = this.playerRsGroup3.visible = this.playerRsGroup4.visible = this.playerRsGroup5.visible = false;
		this.recoutTips.visible = true;
		this.qzBtnGroup.visible = false;

		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.xzing;
		//如果不是庄，显示下注 pls_throw,
		if (this.battleStartCountDown == null) {
			this.battleStartCountDown = new game.BattleStartCountDown();
		}
		// 不是观战者 显示下注倒计时
		if (this.isValidate(game.UserService.instance.playerId)) {
			this.recoutTips.initUI("qznn_battle_json.wait_throw_tips", data.downTime);
			this.battleStartCountDown.startCountDown(data.downTime);
			if (data.downTime > 5) {
				this.registerTimeout(function () {
					// 如果不是庄 显示下注按钮
					if (data.bankerId != game.UserService.instance.playerId) this.xzBtnGroup.visible = true;
					this.onXZCloce(data);
				}, 1000);
			} else {
				// 如果不是庄 显示下注按钮
				if (data.bankerId != game.UserService.instance.playerId) this.xzBtnGroup.visible = true;
				this.onXZCloce(data);
			}
		}
		// 如果是庄 显示等待其他玩家下注wait_others，不显示下注头像旋转倒计时和下注按钮
		if (data.bankerId == game.UserService.instance.playerId) {
			this.battleStartCountDown.stop();
			if (this.isValidate(game.UserService.instance.playerId)) {
				this.recoutTips.initUI("qznn_battle_json.wait_throw_tips", "");
				this.recoutTips.startEllipsis();
			}
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			var playerHead = this.playerHeads[roomData.getPlayerInfo(data.bankerId).postion - 1];
			playerHead.clearClock();
			this.xzBtnGroup.visible = false;
		}
	}

	private onXZCloce(data) {
		// 显示下注头像旋转倒计时
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		for (var i = 0; i < this.playerHeads.length; i++) {
			var playerHeads = this.playerHeads[i];
			if (playerHeads.playerInfo && playerHeads.playerInfo.playerId != data.bankerId && this.isValidate(playerHeads.playerInfo.playerId)) {
				playerHeads.showClock(data.downTime);
			}
		}
	}

	/** 显示下注倍数 */
	public onXZRet(data) {
		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.yxz;
		if (data.playerId == game.UserService.instance.playerId) {
			if (!this.isValidate(data.playerId)) {
				return;
			}
			this.recoutTips.visible = false;
			this.qzBtnGroup.visible = false;
			this.xzBtnGroup.visible = false;

			var playerHead = this.getHeadIconByPos(1);
			if (this.qynnData.getPlayerById(data.playerId) != null && this.qynnData.getPlayerById(data.playerId).isBanker) {
				playerHead.multipleBitLabel.text = "";
			} else {
				playerHead.bebankerBitlabel.visible = false;
				playerHead.multipleBitLabel.visible = true;
				playerHead.multipleBitLabel.text = "x" + data.bets;
				playerHead.clearClock();
			}
		} else {
			if (this.positionMap[Number(data.playerId)] == null) {
				return;
			}
			var position = this.positionMap[Number(data.playerId)];
			var playerHead = this.getHeadIconByPos(position);
			if (this.qynnData.getPlayerById(data.playerId) != null && this.qynnData.getPlayerById(data.playerId).isBanker) {
				playerHead.multipleBitLabel.text = "";
			} else {
				playerHead.multipleBitLabel.text = "x" + data.bets;
				playerHead.bebankerBitlabel.visible = false;
				playerHead.multipleBitLabel.visible = true;
				playerHead.clearClock();
			}
		}
	}

	/** 派牌逻辑 */
	public onDealCard(data) {
		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.canCookCard;
		let self = this;
		let index = 0;
		let players = game.RoomManager.getInstance().curRoomData.playerInfos;
		for (let i = 0; i < players.length; i++) {
			let pos = game.RoomManager.getInstance().curRoomData.getPlayerInfo(players[i].playerId).postion;
			if (!this.isValidate(players[i].playerId)) {
				continue;
			}
			index = 0;
			for (let j = 0; j < 5; j++) {
				this.registerTimeout(function () {
					self.playerCardArr[pos - 1].showFapaiTween(j, self);
				}, (index++) * 100);
			}
			let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
			var playerHead = this.playerHeads[roomData.getPlayerInfo(players[i].playerId).postion - 1];
			//不是观战者，显示看牌倒计时
			if (this.qynnData.getPlayerById(players[i].playerId).state != QYNNPlayerState.ob) {
				playerHead.showClock(data.downTime);
			}
		}
		if (!this.isValidate(game.UserService.instance.playerId)) {
			return;
		}
		this.recoutTips.visible = false;
		//派牌结束后，显示自己的牌
		this.registerTimeout(function () {
			self.showCardBtn.visible = true;
			self.playerCard1.showContentTween(data.cards);
		}, index * 100 + 1000);
	}

	/** 看牌 */
	public onLookCardRet(data) {
		console.log('onLookCardRet1 === ', data);
		if (this.qynnData.getPlayerById(data.playerId)) this.qynnData.getPlayerById(data.playerId).state = QYNNPlayerState.lookedCard;
		if (data.playerId == game.UserService.instance.playerId) {
			this.menu.playerState = QYNNPlayerState.lookedCard;
		}
		if (this.positionMap[Number(data.playerId)] == null) {
			return;
		}

		if (!this.isValidate(data.playerId)) {
			return;
		}
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		var playerHead = this.playerHeads[roomData.getPlayerInfo(data.playerId).postion - 1];
		playerHead.clearClock();
		var position = this.positionMap[Number(data.playerId)];
		var playerCard: QYNNCardGroup = this.playerCardArr[position - 1];
		if (data.isEnd) {
			QYNNSoundPlayer.instance.playerShowCard();
			if (data.groupCards.length == 1) {
				playerCard.showContentTween(data.groupCards[0].cards)
			} else {
				playerCard.showContentTween2(data.groupCards[0].cards, data.groupCards[1].cards);
			}
			playerCard.showCardType(data.value);
			playerCard.showOkIcon(false);
			this.showCardBtn.visible = false;
			// 只播放我的牛几
			if (data.playerId == game.UserService.instance.playerId) {
				QYNNSoundPlayer.instance.playerCardType(data.value);
			}
			//value 有可能为0
			if (data.value != null) {
				this.qynnData.getPlayerById(data.playerId).value = data.value;
			}
			this.onLookCardFinish();
		} else {
			if (data.playerId != game.UserService.instance.playerId) {
				playerCard.showOkIcon(true);
			} else {
				this.showCardBtn.visible = false;
				if (data.groupCards.length == 1) {
					playerCard.showContentTween(data.groupCards[0].cards)
				} else {
					playerCard.showContentTween2(data.groupCards[0].cards, data.groupCards[1].cards);
				}
				playerCard.showCardType(data.value);
			}
			// 保存数据
			if (this.qynnData.getPlayerById(data.playerId)) {
				if (data.groupCards) {
					if (data.groupCards.length == 1) {
						this.qynnData.getPlayerById(data.playerId).groupCards = data.groupCards;
					} else {
						this.qynnData.getPlayerById(data.playerId).groupCards[0] = data.groupCards[0];
						this.qynnData.getPlayerById(data.playerId).groupCards[1] = data.groupCards[1];
					}
				}
				//value 有可能为0
				if (data.value != null) {
					this.qynnData.getPlayerById(data.playerId).value = data.value;
				}
			}
		}
	}

	private onLookCardFinish() {
		for (var player of this.qynnData.qynnPlayers) {
			var position = this.positionMap[Number(player.playerId)];
			var playerCard: QYNNCardGroup = this.playerCardArr[position - 1];
			if (playerCard && this.qynnData.getPlayerById(player.playerId).state != 0) {
				if (player.groupCards.length > 0) {
					if (player.groupCards.length == 1) {
						playerCard.showContentTween(player.groupCards[0].cards);
					} else {
						playerCard.showContentTween2(player.groupCards[0].cards, player.groupCards[1].cards);
					}
				}
				if (player.value != null) playerCard.showCardType(player.value);
			}
		}
	}

	/** 结算 */
	public onBatteFinish(data) {
		console.log('onBatteFinish ====', data);
		if (this.isValidate(data.playerId)) {
			this.recoutTips.visible = false;
			this.qzBtnGroup.visible = false;
			this.xzBtnGroup.visible = false;
		}
		for (var i = 0; i < data.totalInfo.length; i++) {
			var infoPlayerId = Number(data.totalInfo[i].playerId);
			if (!this.isValidate(infoPlayerId)) {
				continue;
			}
			//飛金幣
			if (this.qynnData.bankerId != infoPlayerId) {
				if (!data.totalInfo[i].isWin) {
					this.flyGoldById(infoPlayerId, this.qynnData.bankerId, 2000);
				} else {
					this.flyGoldById(this.qynnData.bankerId, infoPlayerId, 2000);
				}
			}

			//显示收益
			var position = this.positionMap[Number(data.totalInfo[i].playerId)];
			var headIcon = this.getHeadIconByPos(position);
			var resultBitLabel = this.playerRsTipArr[position - 1];
			var resultBitBg = this.playerRsbgArr[position - 1];
			var resultGroup = this.playerRsGroupArr[position - 1];
			if (data.totalInfo[i].isWin) {
				QYNNSoundPlayer.instance.playerGameWin();
				if (data.totalInfo[i].money > 0) {
					headIcon.showRenx();
				}
				if (data.totalInfo[i].money != 0) resultGroup.visible = true;
				resultBitLabel.font = RES.getRes("qznn_win_fnt");
				resultBitLabel.text = "+" + Number(data.totalInfo[i].money).toFixed(2);
				resultBitBg.width = resultBitLabel.width + 15;
			} else {
				QYNNSoundPlayer.instance.playerGameOver();
				if (data.totalInfo[i].money != 0) resultGroup.visible = true;
				resultBitLabel.font = RES.getRes("qznn_lose_fnt");
				resultBitLabel.text = Number(data.totalInfo[i].money).toFixed(2);
			}
			if (infoPlayerId == UserService.instance.playerId) {
				this.player1Icon.showImmGold(data.totalInfo[i].totalMoney);
			}
		}
	}

	private flyGoldById(currId, targetId, delay) {
		var self = this;
		var currHead: QynnHeadIcon;
		var targetHead: any;
		this.registerTimeout(function () {
			if (self.positionMap[currId] != undefined && self.positionMap[targetId] != undefined) {
				currHead = self.playerHeads[self.positionMap[currId] - 1];
				targetHead = self.playerHeads[self.positionMap[targetId] - 1];
				self.flyGold(currHead, targetHead);
			}
		}, delay);
	}

	private ball: egret.Bitmap;
	private flyGold(currHead, targetHead, flyCount = 20) {
		var index = 0;
		var targetHeadIcon = targetHead.headIconImg;
		for (var g: number = 0; g < flyCount; g++) {
			this.registerTimeout(function () {
				this.ball = goldImg;
				var goldImg = new eui.Image("qznn_battle_json.qznn_fly_gold");
				this.goldContentLayer.addChild(goldImg);
				var offsetY = targetHeadIcon.width / 8 + Math.random() * targetHeadIcon.width / 4;
				var offsetX = targetHeadIcon.height / 8 + Math.random() * targetHeadIcon.height / 4;
				var point = currHead.localToGlobal(currHead.width / 4, currHead.height / 4);
				goldImg.x = point.x;
				goldImg.y = point.y;
				QYNNSoundPlayer.instance.playerFlyGold();
				point = targetHeadIcon.localToGlobal(offsetX, offsetY);
				egret.Tween.get(goldImg).to({ x: point.x, y: point.y }, 500).call(() => {
					index++;
					if (index >= flyCount) {
						if (this.goldContentLayer != null && this.goldContentLayer.parent != null) {
							this.goldContentLayer.parent.removeChild(this.goldContentLayer);
						}
						targetHead.showCoin();
					}
				}, goldImg);
			}, g * 50);
		}
	}

	/** 重连更新数据 */
	public qynnReconnect(data) {
		console.log('qynnReconnect === ', data);
		// 清除玩家牌面
		this.clearPlayerHeads();
		if (this.goldContentLayer.numChildren > 0) {
			this.goldContentLayer.removeChildren();
		}

		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		let headIcon: QynnHeadIcon;
		this.positionMap = new Object();
		// 清除玩家数据
		this.qynnData = new QynnData();
		this.qynnData.qynnPlayers = new Array<QynnPlayer>();
		for (let i = 0; i < roomData.playerInfos.length; i++) {
			let playerInfo: game.PlayerInfo = roomData.playerInfos[i];
			this.positionMap[playerInfo.playerId] = playerInfo.postion;
			this.qynnData.addPlayer(playerInfo);
		}

		this.qynnData.setBanker(Number(data.bankerPlayerId));
		var battleInfoPlayerId;
		//初始化每個玩家的頭像和牌
		for (var i = 0; i < data.battleInfo.length; i++) {
			battleInfoPlayerId = Number(data.battleInfo[i].playerId);
			headIcon = this.getHeadIconByPos(this.positionMap[battleInfoPlayerId]);
			headIcon.visible = true;
			if (battleInfoPlayerId == data.bankerPlayerId) {
				headIcon.showBanker(true);
			} else {
				headIcon.showBanker(false);
			}
			//robBankerBets -1表示还没有抢庄 
			if (data.battleInfo[i].robBankerBets == -1) {
				headIcon.bebankerBitlabel.visible = false;
			} else {
				headIcon.bebankerBitlabel.visible = true;
				//robBankerBets 0 表示为不抢
				if (data.battleInfo[i].robBankerBets == 0) {
					headIcon.bebankerBitlabel.text = "b";
				} else {
					headIcon.bebankerBitlabel.text = "x" + data.battleInfo[i].robBankerBets;
				}
			}

			// -1表示还没有压注 ，0 表示为庄家 庄家没有压注值
			if (data.battleInfo[i].bets > 0) {
				headIcon.bebankerBitlabel.visible = false;
				headIcon.multipleBitLabel.visible = true;
				headIcon.multipleBitLabel.text = "x" + data.battleInfo[i].bets;
				//bets 0 表示为庄家
				if (data.battleInfo[i].bets == 0) {
					headIcon.showBanker(true);
					headIcon.bebankerBitlabel.text = "x1";
					headIcon.multipleBitLabel.visible = false;
				}
			}

			if (this.battleStartCountDown == null) {
				this.battleStartCountDown = new game.BattleStartCountDown();
			}
			// 0.观看 1.抢庄 , 2已抢庄 3.压注 4.已押注 5.看牌 6.已看牌 
			if (this.qynnData.getPlayerById(battleInfoPlayerId) != null) this.qynnData.getPlayerById(battleInfoPlayerId).state = <QYNNPlayerState>data.battleInfo[i].status;

			switch (data.battleInfo[i].status) {
				case 0: {
					headIcon.alpha = 0.5;
					if (battleInfoPlayerId == game.UserService.instance.playerId) {
						this.recoutTips.visible = true;
						this.recoutTips.initUI("qznn_battle_json.wait_next_tips", "");
						this.recoutTips.startEllipsis();
						this.menu.playerState = QYNNPlayerState.ob;
					}
					if (roomData.status == game.GameStatus.PREPARE) {
						if (data.downTime > 0) {
							headIcon.alpha = 1;
							this.recoutTips.visible = true;
							this.recoutTips.initUI("qznn_battle_json.start_tips", data.downTime);
							this.battleStartCountDown.startCountDown(data.downTime);
						}
					}
					break;
				}
				case 1: {
					headIcon.alpha = 1;
					if (battleInfoPlayerId == game.UserService.instance.playerId) {
						this.qzBtnGroup.visible = true;
						this.recoutTips.visible = true;
						this.recoutTips.initUI("qznn_battle_json.wait_banker_tips", data.downTime);
						this.battleStartCountDown.startCountDown(data.downTime);
					}
					break;
				}
				case 2: {
					headIcon.alpha = 1;
					if (battleInfoPlayerId == game.UserService.instance.playerId) {
						this.recoutTips.visible = true;
						this.recoutTips.initUI("qznn_battle_json.wait_banker_tips", "");
						this.recoutTips.startEllipsis();
					}
					break;
				}
				case 3: {
					headIcon.alpha = 1;
					if (battleInfoPlayerId == game.UserService.instance.playerId) {
						this.recoutTips.visible = true;
						this.qzBtnGroup.visible = false;
						if (battleInfoPlayerId == this.qynnData.bankerId) {
							headIcon.showBanker(true);
							this.recoutTips.initUI("qznn_battle_json.wait_throw_tips", "");
							this.recoutTips.startEllipsis();
						} else {
							this.xzBtnGroup.visible = true;
							this.battleStartCountDown.startCountDown(data.downTime);
							this.recoutTips.initUI("qznn_battle_json.wait_throw_tips", data.downTime);
							this.battleStartCountDown.startCountDown(data.downTime);
						}
					}
					break;
				}
				case 4: {
					headIcon.alpha = 1;
					if (battleInfoPlayerId == this.qynnData.bankerId) {
						this.recoutTips.visible = false;
						this.qzBtnGroup.visible = false;
						this.xzBtnGroup.visible = false;
					}
					this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1].ShowCard();
					break;
				}
				case 5: {
					headIcon.alpha = 1;
					if (battleInfoPlayerId == game.UserService.instance.playerId) {
						this.recoutTips.visible = false;
						this.qzBtnGroup.visible = false;
						this.xzBtnGroup.visible = false;
						this.playerCard1.ShowCardContent(data.cards)
						this.showCardBtn.visible = true;
					} else {
						this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1].ShowCard();
					}
					break;
				}
				case 6: {
					headIcon.alpha = 1;
					this.recoutTips.visible = false;
					this.qzBtnGroup.visible = false;
					this.xzBtnGroup.visible = false;
					this.showCardBtn.visible = false;
					if (data.battleInfo[i].groupCards.length > 1) {
						if (this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1] != null) this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1].ShowCardContent2(
							data.battleInfo[i].groupCards[0].cards, data.battleInfo[i].groupCards[1].cards
						);
					} else {
						if (this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1] != null) this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1].ShowCardContent(
							data.battleInfo[i].groupCards[0].cards
						);
					}
					this.playerCardArr[roomData.getPlayerInfo(battleInfoPlayerId).postion - 1].showCardType(data.battleInfo[i].value);

					//显示收益
					if (data.totalInfo.length > 0) {
						var position = this.positionMap[Number(data.totalInfo[i].playerId)];
						headIcon = this.getHeadIconByPos(position);
						var resultBitLabel = this.playerRsTipArr[position - 1];
						var resultBitBg = this.playerRsbgArr[position - 1];
						var resultGroup = this.playerRsGroupArr[position - 1];
						if (data.totalInfo[i].isWin) {
							QYNNSoundPlayer.instance.playerGameWin();
							if (data.totalInfo[i].money > 0) {
								headIcon.showRenx();
							}
							if (data.totalInfo[i].money != 0) resultGroup.visible = true;
							resultBitLabel.font = RES.getRes("qznn_win_fnt");
							resultBitLabel.text = "+" + Number(data.totalInfo[i].money).toFixed(2);
							resultBitBg.width = resultBitLabel.width + 15;
						} else {
							QYNNSoundPlayer.instance.playerGameOver();
							if (data.totalInfo[i].money != 0) resultGroup.visible = true;
							resultBitLabel.font = RES.getRes("qznn_lose_fnt");
							resultBitLabel.text = Number(data.totalInfo[i].money).toFixed(2);
						}
					}
					if (battleInfoPlayerId == UserService.instance.playerId && data.totalInfo.length > 0) {
						this.player1Icon.showImmGold(data.totalInfo[i].totalMoney);
					}
					break;
				}
			}
		}
	}

	private clearPlayerHeads() {
		for (var i = 0; i < this.playerCardArr.length; i++) {
			var playerCard = this.playerCardArr[i];
			playerCard.hideCard();

			var playerRsGroup = this.playerRsGroupArr[i];
			playerRsGroup.visible = false;

			var playerHead = this.playerHeads[i];
			playerHead.resetHeadIcon();
			playerHead.visible = false;
		}
	}

	public onNoRob() {
		QynnRequest.SendRobBanker(0);
	}
	public onQZMulti1() {
		QynnRequest.SendRobBanker(1);
	}
	public onQZMulti2() {
		QynnRequest.SendRobBanker(2);
	}
	public onQZMulti3() {
		QynnRequest.SendRobBanker(3);
	}
	public onQZMulti4() {
		QynnRequest.SendRobBanker(4);
	}
	public onXZMulti5() {
		QynnRequest.SendBets(5);
	}
	public onXZMulti10() {
		QynnRequest.SendBets(10);
	}
	public onXZMulti15() {
		QynnRequest.SendBets(20);
	}
	public onXZMulti20() {
		QynnRequest.SendBets(50);
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

	public backToMainBg(): void {
		SoundMenager.instance.playBg("hallBG_mp3");
	}

	public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		let playerInfo: game.PlayerInfo = roomData.getPlayerInfo(UserService.instance.playerId)
		playerInfo.money = playerInfo.money + drawmoney;
		this.player1Icon.showImmGold(playerInfo.money);
	}
}