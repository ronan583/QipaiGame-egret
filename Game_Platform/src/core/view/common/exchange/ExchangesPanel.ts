enum ExchangeType {
	ali = 1,
	bank = 2
}
class ExchangesPanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/common/exchange/ExchangesPanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public closeBtn: IButton;
	public coinLabel: eui.BitmapLabel;
	public bindingSelectBtn: IButton;
	public recordSelectBtn: IButton;
	public exchangeSelectBtn: IButton;
	public rechargeBtn: IButton;

	public exchangeGroup: eui.Group;
	public exchangeAlipayBtn: IButton;
	public exchangeBankCardBtn: IButton;

	public recordsGroup: eui.Group;
	public bindingGroup: eui.Group;
	public bindAlipayBtn: IButton;
	public bindBankBtn: IButton;
	public bindAccount: BindAccount;

	public recordGroup: eui.Group;
	public exchangeAccount: ExchangeAccount;
	private isType = 0;

	private refreshBtnStatus(isType: Number = 0): void {
		if (isType == 0) {
			this.bindingSelectBtn.currentState = null;
			this.recordSelectBtn.currentState = null;
			this.exchangeSelectBtn.currentState = "select";
			this.exchangeGroup.visible = true;
			this.recordsGroup.visible = false;
			this.bindingGroup.visible = false;
		} else if (isType == 1) {
			this.bindingSelectBtn.currentState = null;
			this.recordSelectBtn.currentState = "select";
			this.exchangeSelectBtn.currentState = null;
			this.exchangeGroup.visible = false;
			this.recordsGroup.visible = true;
			this.bindingGroup.visible = false;
			UserRequest.sendExchangeRecord(1);
		} else if (isType == 2) {
			this.bindingSelectBtn.currentState = "select";
			this.recordSelectBtn.currentState = null;
			this.exchangeSelectBtn.currentState = null;
			this.exchangeGroup.visible = false;
			this.recordsGroup.visible = false;
			this.bindingGroup.visible = true;
		}
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rechargeBtnClick, this);
		this.bindingSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindingClick, this);
		this.recordSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recordClick, this);
		this.exchangeSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exchangeClick, this);
		this.exchangeAlipayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exchangeAlipayClick, this);
		this.exchangeBankCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exchangeBankCardClick, this);
		this.bindAlipayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindAlipayAccount, this);
		this.bindBankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBankAccount, this);

		this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
		this.refreshBtnStatus(this.isType);
	}

	public initUI(isType) {
		this.isType = isType;
		this.refreshBtnStatus(isType);
		this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
	}

	private rechargeBtnClick(): void {
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
	}

	private bindingClick(): void {
		this.refreshBtnStatus(2);
	}

	private recordClick(): void {
		this.refreshBtnStatus(1);
		UserRequest.sendExchangeRecord(1);
	}

	private exchangeClick(): void {
		this.refreshBtnStatus(0);
	}

	public UpdatePage(data) {
		var recordBar: ExchangeRecordsBar;
		var recordInfos = data.recordInfoInfo;
		this.recordGroup.removeChildren();
		for (var i = 0; i < recordInfos.length; i++) {
			recordBar = new ExchangeRecordsBar();
			recordBar.initData(i, recordInfos[i]);
			this.recordGroup.addChild(recordBar);
		}
	}

	private exchangeAlipayClick(): void {
		if (UserService.instance.bindingAlipay == null || UserService.instance.bindingAlipay === "") {
			TipsUtils.showTipsFromCenter("请先绑定支付宝账号！");
			return;
		}

		if (this.exchangeAccount == null) {
			this.exchangeAccount = new ExchangeAccount();
		}
		this.exchangeAccount.initUI(ExchangeType.ali);
		PopUpManager.addPopUp(this.exchangeAccount, true, 0, 0, 1);
	}

	private exchangeBankCardClick(): void {
		if (UserService.instance.bindingBank == null || UserService.instance.bindingBank === "") {
			TipsUtils.showTipsFromCenter("请先绑定银行卡！");
			return;
		}
		if (this.exchangeAccount == null) {
			this.exchangeAccount = new ExchangeAccount();
		}
		this.exchangeAccount.initUI(ExchangeType.bank);
		PopUpManager.addPopUp(this.exchangeAccount, true, 0, 0, 1);
	}

	private onBindAlipayAccount(): void {
		if (this.bindAccount == null) {
			this.bindAccount = new BindAccount();
		}
		this.bindAccount.initUI(ExchangeType.ali);
		PopUpManager.addPopUp(this.bindAccount, true, 0, 0, 1);
	}

	private onBindBankAccount(): void {
		if (this.bindAccount == null) {
			this.bindAccount = new BindAccount();
		}
		this.bindAccount.initUI(ExchangeType.bank);
		PopUpManager.addPopUp(this.bindAccount, true, 0, 0, 1);
	}

	public UpdateExchangeRecord(data) {
		this.UpdatePage(data);
	}

	public resetValue(currGoldNum: number, bankGoldNum: number): void {
		this.coinLabel.text = currGoldNum.toFixed(2);
		this.exchangeAlipayBtn['bitmapLabel'].text = currGoldNum.toFixed(2);
		this.exchangeBankCardBtn['bitmapLabel'].text = currGoldNum.toFixed(2);
	}

	private closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this, 1);
	}

}