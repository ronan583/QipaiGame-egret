class QynnMenu extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public menuGroup: eui.Group;
	public backBtn: IButton;
	public helpBtn: IButton;
	public settingBtn: IButton;
	public withdrawBtn: IButton;
	public upBtn: IButton;
	public downBtn: IButton;

	public setPanel: QynnSetPanel;
	public playerState: QYNNPlayerState = 0;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu, this);
		this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtn, this);
		this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdraw, this);
		this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);
	}

	public onCheckFocus(event: egret.TouchEvent) {
		if (!this.isThis(event.target)) {
			this.hideMenu(event);
		}
	}

	public isThis(target) {
		if (!target) return false;
		if (target == this.stage) {
			return false;
		}
		if (target != this) {
			return this.isThis(target.parent);
		} else {
			return true;
		}
	}

	public onSettingBtn() {
		if (this.setPanel == null) {
			this.setPanel = new QynnSetPanel();
		}
		PopUpManager.addPopUp(this.setPanel, true, 0, 0, 1);
	}

	public onWithdraw() {
		if (game.RoomManager.getInstance().curRoomData.gameLevel == 0) {
			CommonUtil.noticeMsg("体验场不能进行取款操作");
			return
		}
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.QYNN)
	}

	public onHelp(event) {
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.QYNN);
	}

	public onHistory(event) {
		RoomRequest.reqZJCXInfo(ChildGameType.QYNN);
	}

	private onBack() {
		if (game.RoomManager.getInstance().curRoomData.gameLevel != 0 && this.playerState != QYNNPlayerState.ob && game.RoomManager.getInstance().curRoomData.status == game.GameStatus.RUNNING) {
			CommonUtil.noticeMsg("游戏进行中，无法退出房间");
		} else {
			QYNNSoundPlayer.instance.backToMainBg();
			RoomRequest.leaveRoom(game.ChildGameType.QYNN);
		}
	}

	public onPopMenu(event) {
		egret.Tween.get(this.menuGroup).to({ y: 114 }, 200);
		this.upBtn.visible = true;
		this.downBtn.visible = false;
	}

	public hideMenu(event) {
		egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height }, 200);
		this.upBtn.visible = false;
		this.downBtn.visible = true;
	}
}