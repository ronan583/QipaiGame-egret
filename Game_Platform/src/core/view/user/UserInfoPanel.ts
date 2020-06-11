
class UserInfoPanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.skinName = "resource/eui_skins/user/UserInfoPanelSkin.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	public closeBtn: IButton;
	public logoutBtn: IButton;
	public settingBtn: IButton;
	public updateNameBtn: IButton;
	public copyBtn: IButton;
	public phoneBindBtn: IButton;
	public bankBindBtn: IButton;
	public aliBindBtn: IButton;
	public changeHeadBtn: eui.Group;
	// public headShow: HeadShow;
	public sex: eui.Image;
	public headImg: eui.Image;
	public accountLabel: eui.Label;
	public nikeNameLabel: eui.Label;
	public refereeLabel: eui.Label;
	public phoneLabel: eui.Label;
	public bankLabel: eui.Label;
	public aliLabel: eui.Label;

	public updateNikenamePanel: UpdateNikenamePanel;
	public exchangeUI: ExchangesPanel;

	// public bigVIPLevel : eui.Image;
	// public vipGroup : eui.Group;
	// public goldLabel:eui.BitmapLabel;
	// public expLabel: IButton
	// public expProgressBar: eui.ProgressBar;
	// private vipBg:eui.Image;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.headImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openChangePanel, this);
		this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSettingPanel, this);
		this.logoutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openLogoutPanel, this);
		this.updateNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUpdateNamePanel, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCopyTap, this);
		this.phoneBindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.phoneBindBtnClick, this);
		this.bankBindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbankBind, this);
		this.aliBindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbankBind, this);
		this.showInfo();
	}

	private onCopyTap() {
		NativeApi.copyToBoard(this.accountLabel.text);
	}

	private onAddToStage(): void {
		this.showInfo();
	}

	public showInfo(): void {
		if (game.UserService.instance.isUpdateName) {
			this.updateNameBtn.visible = false;
		}
		this.headImg.source = "gp_head_" + (game.UserService.instance.headNum + 1);
		this.accountLabel.text = game.UserService.instance.userId;
		this.nikeNameLabel.text = game.UserService.instance.name;

		//手机
		if (UserService.instance.isFormal) {
			this.phoneBindBtn.visible = false;
			this.phoneLabel.text = UserService.instance.userAccount;
		} else {
			this.phoneBindBtn.visible = true;
			this.phoneLabel.text = "未绑定";
		}

		//支付宝
		if (UserService.instance.bindingAlipay != null && UserService.instance.bindingAlipay !== "") {
			this.aliBindBtn.visible = false;
			this.aliLabel.text = UserService.instance.bindingAlipay;
		} else {
			this.aliBindBtn.visible = true;
			this.aliLabel.text = "未绑定";
		}

		//银行卡
		if (UserService.instance.bindingBank != null && UserService.instance.bindingBank !== "") {
			this.bankBindBtn.visible = false;
			this.bankLabel.text = UserService.instance.bindingBank;
		} else {
			this.bankBindBtn.visible = true;
			this.bankLabel.text = "未绑定";
		}

		// if(game.UserService.instance.vipLevel <= 0)
		// {
		// 	this.vipGroup.visible = false;
		// }else
		// {
		// 	this.vipGroup.visible = true;
		// 	this.bigVIPLevel.source = "num_vip_" + game.UserService.instance.vipLevel;
		// }
		// if(game.UserService.instance.vipLevel == 0) {
		// 	this.vipBg.visible = false;
		// } else {
		// 	this.vipBg.visible = true;
		// }
		if (game.UserService.instance.isUpdateName) {
			this.updateNameBtn.visible = false;
		}
		// this.goldLabel.text = game.UserService.instance.money.toFixed(2);
		// this.expLabel.label = game.UserService.instance.level.toString();
		// this.expProgressBar.minimum = 0;
		// this.expProgressBar.maximum = game.UserService.instance.totalExp;
		// this.expProgressBar.value = game.UserService.instance.exp;

		if (game.UserService.instance.sex) {
			this.sex.source = "info_male";
		} else {
			this.sex.source = "info_female";
		}
	}

	public openUpdateNamePanel(event: egret.TouchEvent) {
		this.updateNikenamePanel = new UpdateNikenamePanel();
		PopUpManager.addPopUp(this.updateNikenamePanel, true, 0, 0, 1);
	}

	public phoneBindBtnClick(event: egret.TouchEvent) {
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_REGISTER_PANEL);
	}

	public onbankBind(event: egret.TouchEvent) {
		if (UserService.instance.isFormal) {
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_EXCHANGE_PANEL , 2);
		} else {
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_REGISTER_PANEL);
			TipsUtils.showTipsFromCenter("请先注册成为正式用户！");
		}
	}

	public updateName() {
		this.nikeNameLabel.text = game.UserService.instance.name;
		this.updateNameBtn.visible = false;
		if (this.updateNikenamePanel != null) {
			PopUpManager.removePopUp(this.updateNikenamePanel, 1);
		}
		this.phoneLabel.text = game.UserService.instance.mobile;
	}

	public openChangePanel(event: egret.TouchEvent) {
		var changeHeadIconPanel = new ChangeHeadIconPanel();
		PopUpManager.addPopUp(changeHeadIconPanel, true, 0, 0, 1);
	}

	public openSettingPanel(event: egret.TouchEvent) {
		var settingPanel: SetPanel = new SetPanel();
		PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
	}

	public openLogoutPanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this);
		GameLayerManager.gameLayer().panelLayer.removeChildren();
		NativeApi.deleteLocalData("user_login_account");
		NativeApi.deleteLocalData("user_login_password");
		game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_HALL);
		game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_LOGIN);
	}


	public updateHeadIcon(data: any) {
		var iconIndex = data.number;
		if (data.type == 1) {
			this.headImg.source = "gp_head_" + (iconIndex + 1);
			if (iconIndex > 5) {
				game.UserService.instance.sex = false;
				this.sex.source = "info_female";
			} else {
				game.UserService.instance.sex = true;
				this.sex.source = "info_male";
			}
		} else if (data.type == 2) {
			// this.headShow.showFrame(iconIndex);
		}
	}

	public closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this, 1);
	}
}