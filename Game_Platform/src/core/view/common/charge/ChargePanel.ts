enum ChargeType {
	chat = 1,
	ali = 2,
	bank = 3
}
class ChargePanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/common/charge/ChargePanelSkin.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}


	public closeBtn: IButton;
	private aliSelectBtn: eui.Button;
	private bankSelectBtn: eui.Button;
	private chatSelectBtn: eui.Button;

	// public vipChargeRadio: eui.RadioButton;
	// public aliChargeRadio: eui.RadioButton;
	// public bankChargeRadio: eui.RadioButton;

	public bankChargeGroup: eui.Group;
	public aliChargeGroup: eui.Group;
	public chatChargeGroup: eui.Group;

	private aliBtn: eui.Button;
	private bankBtn: eui.Button;
	private vipBtn: eui.Button;

	private curChargeType: ChargeType;

	public aliChargeInput: EditText; //输入框
	public bankChargeInput: EditText; //输入框

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private refreshBtnStatus(): void {
		if (this.curChargeType == ChargeType.bank) {
			this.bankChargeGroup.currentState = "select";
			this.aliChargeGroup.currentState = null;
			this.chatChargeGroup.currentState = null;

			this.bankChargeGroup.visible = true;
			this.aliChargeGroup.visible = false;
			this.chatChargeGroup.visible = false;
		} else if (this.curChargeType == ChargeType.ali) {
			this.bankChargeGroup.currentState = null;
			this.aliChargeGroup.currentState = "select";
			this.chatChargeGroup.currentState = null;

			this.bankChargeGroup.visible = false;
			this.aliChargeGroup.visible = true;
			this.chatChargeGroup.visible = false;
		} else if (this.curChargeType == ChargeType.chat) {
			this.bankChargeGroup.currentState = null;
			this.aliChargeGroup.currentState = null;
			this.chatChargeGroup.currentState = "select";

			this.bankChargeGroup.visible = false;
			this.aliChargeGroup.visible = false;
			this.chatChargeGroup.visible = true;
		}
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);

		this.bankSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this);
		this.aliSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAli, this);
		this.chatSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChat, this);

		this.bankChargeGroup.visible = true;
		this.aliChargeGroup.visible = false;
		this.chatChargeGroup.visible = false;

		this.curChargeType = ChargeType.bank;
		this.refreshBtnStatus();

		// this.aliChargeInput.editInput.size = 23;
		// this.aliChargeInput.editInput.textColor = 0xB59A7A;
		// this.bankChargeInput.editInput.size = 23;
		// this.bankChargeInput.editInput.textColor = 0xB59A7A;
	}

	private onAli() {
		this.curChargeType = ChargeType.ali;
		this.refreshBtnStatus();
	}

	private onBank() {
		this.curChargeType = ChargeType.bank;
		this.refreshBtnStatus();
	}

	private onChat() {
		this.curChargeType = ChargeType.chat;
		this.refreshBtnStatus();
	}

	private onRadioChange(event: eui.UIEvent) {
		// if (event.target.value == ChargeType.chat) {
		// 	this.chatChargeGroup.visible = true;
		// 	this.aliChargeGroup.visible = false;
		// 	this.bankChargeGroup.visible = false;
		// } else if (event.target.value == ChargeType.ali) {
		// 	this.chatChargeGroup.visible = false;
		// 	this.aliChargeGroup.visible = true;
		// 	this.bankChargeGroup.visible = false;
		// } else if (event.target.value == ChargeType.bank) {
		// 	this.chatChargeGroup.visible = false;
		// 	this.aliChargeGroup.visible = false;
		// 	this.bankChargeGroup.visible = true;
		// }
	}

	private closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this, 1);
	}
}