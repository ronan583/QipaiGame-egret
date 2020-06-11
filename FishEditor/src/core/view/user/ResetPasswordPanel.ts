class ResetPasswordPanel extends game.ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/user/ResetPasswordPanelSkin.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	public phoneNumberInput: eui.EditableText;
	public checkNumberInput: eui.EditableText;
	public passwordInput: eui.EditableText;
	public passwordConformInput: eui.EditableText;
	public dumiaoLab: eui.Label;
	public codeTipsGroup: eui.Group;

	public closeBtn: IButton;
	public okBtn: IButton;
	public codeBtn: IButton;
	public isRequestCode: boolean = false;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLonResetPasswordogin, this);
		this.codeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRequestCode, this);

	}

	public closePanel() {
		PopUpManager.removePopUp(this);
	}

	public onRequestCode() {
		var phoneNumber = this.phoneNumberInput.text.trim();
		if (!RegUtils.checkMobile(phoneNumber.toString())) {
			TipsUtils.showTipsFromCenter("手机号码格式不正确");
			return;
		}
		UserRequest.sendGetCode(phoneNumber, 2);
	}

	public updateCode() {
		this.startClock(120);
	}

	public onLonResetPasswordogin() {
		var phoneNumber = this.phoneNumberInput.text.trim();
		if (!RegUtils.checkMobile(phoneNumber.toString())) {
			TipsUtils.showTipsFromCenter("手机号码格式不正确");
			return;
		}
		var password = this.passwordInput.text;
		if (password.length > 12 || password.length < 4) {
			TipsUtils.showTipsFromCenter("密码长度非法，5-12位.");
			return;
		}
		if (!RegUtils.checkPassword(password)) {
			TipsUtils.showTipsFromCenter("密码包含非法字符");
			return;
		}
		var confirmPassword = this.passwordConformInput.text;
		if (password.trim() != confirmPassword.trim()) {
			TipsUtils.showTipsFromCenter("两次密码不一致");
			return;
		}
		var code = this.checkNumberInput.text.trim();
		if (code.length != 4) {
			TipsUtils.showTipsFromCenter("验证码不正确");
			return;
		}
		if (!this.isRequestCode) {
			TipsUtils.showTipsFromCenter("请先申请验证码");
			return;
		}
		UserRequest.sendUpatePassword(phoneNumber, password, code);
	}

	private endTime: number = 0;
	public startClock(leftTime: number): void {
		this.codeBtn.visible = false;
		this.codeTipsGroup.visible = true;
		this.endTime = egret.getTimer() / 1000 + leftTime;
		egret.startTick(this.updateClock, this);
		this.isRequestCode = true;
	}

	private updateClock(timestamp: number): boolean {
		let leftTime: number = this.endTime - timestamp / 1000;
		if (leftTime < 0) {
			egret.stopTick(this.updateClock, this);
			this.codeBtn.visible = true;
			this.codeTipsGroup.visible = false;
		} else {
			this.dumiaoLab.text = "(" + leftTime.toFixed(0) + "秒)";
		}
		return true;
	}
}