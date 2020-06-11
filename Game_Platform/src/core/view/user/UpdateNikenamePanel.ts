class UpdateNikenamePanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/user/UpdateNikenamePanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public closeBtn: IButton;
	public okBtn: IButton;
	public nameInput: eui.EditableText;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpdateName, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.nameInput.prompt = '请输入新昵称';
		this.nameInput.promptColor = 0x6c81a8;
	}
	public onUpdateName(event: egret.TouchEvent): void {
		if (RegUtils.isNickName(this.nameInput.text)) {
			UserRequest.sendUpateNickName(this.nameInput.text);
		} else {
			CommonUtil.noticeMsg("输入的昵称不合法");
		}
	}

	public closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this);
	}
}