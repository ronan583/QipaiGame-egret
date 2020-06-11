class DuobaoMenu extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	public menuGroup: eui.Group;
	public bankBtn: IButton;
	public backBtn: IButton;
	public helpBtn: IButton;
	public settingBtn: IButton;
	public upBtn: IButton;
	public downBtn: IButton;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu, this);
		this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtn, this);
		this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);

		this.menuGroup.alpha = 0;
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

	public onSettingBtn(event: egret.TouchEvent) {
		// game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BCBM);
		let settingPanel: DuobaoSetting = new DuobaoSetting();
		PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
		this.hideMenu(event);

	}

	public onBank(event: egret.TouchEvent) {
		if (DuobaoData.instance.gameLevel == 0) {
			TipsUtils.showTipsFromCenter("体验场不能进行取款操作！");
		} else {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DUOBAO);
		}
		this.hideMenu(event);
	}

	public onHelp(event: egret.TouchEvent) {
		AppFacade.getInstance().sendNotification(PanelNotify.SHOW_DUOBAO_HELP_UI);
		this.hideMenu(event);
	}

	private onBack(event: egret.TouchEvent) {
		game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_DUOBAO_EXIT_UI);
		this.hideMenu(event);
	}

	public onPopMenu(event: egret.TouchEvent) {
		egret.Tween.get(this.menuGroup).to({ y: 90 }, 200);
		egret.Tween.get(this.menuGroup).to({ alpha: 1 }, 50);
		this.upBtn.visible = true;
		this.downBtn.visible = false;
	}

	public hideMenu(event: egret.TouchEvent) {
		egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height }, 200);
		egret.Tween.get(this.menuGroup).to({ alpha: 0 }, 150);
		this.upBtn.visible = false;
		this.downBtn.visible = true;
	}
}