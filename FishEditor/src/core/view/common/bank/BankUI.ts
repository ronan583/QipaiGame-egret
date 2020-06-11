enum BankType {
	save = 1,
	get = 2
}
class BankUI extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/common/bank/BankUI.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	private type: OperatorType = OperatorType.save;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public closeBtn: IButton;
	public depositBtn: IButton;
	public withdrawBtn: IButton;
	public rechargeBtn: IButton;
	public coinLabel: eui.BitmapLabel;

	protected childrenCreated(): void {
		super.childrenCreated();
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.depositBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.depositBtnClick, this);
		this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.withdrawBtnClick, this);
		this.rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rechargeBtnClick, this);
		this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
	}

	private depositBtnClick(): void {
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_DEPOSIT_PANEL);
	}

	private withdrawBtnClick(): void {
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_WITHDRAW_PANEL);
	}

	private rechargeBtnClick(): void {
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
	}

	public initUI() {
		this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
	}

	private onMaxNum() {
		if (this.type == OperatorType.save) {
			var money = Math.floor(game.UserService.instance.money);
			this.resetValue(game.UserService.instance.money - money, game.UserService.instance.bankMoney + money);
			// this.resetValue(0 , game.UserService.instance.money + game.UserService.instance.bankMoney);
		} else {
			this.resetValue(game.UserService.instance.money + game.UserService.instance.bankMoney, 0);
		}
	}

	private onMinNum() {
		if (this.type == OperatorType.save) {
			if (game.UserService.instance.money >= 1) {
				this.resetValue(game.UserService.instance.money - 1, game.UserService.instance.bankMoney + 1);
			} else {
				this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
			}
			// this.resetValue(game.UserService.instance.bankMoney + game.UserService.instance.money,0);
		} else {
			if (game.UserService.instance.bankMoney >= 1) {
				this.resetValue(game.UserService.instance.money + 1, game.UserService.instance.bankMoney - 1);
			} else {
				this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
			}
			// this.resetValue(0, game.UserService.instance.money + game.UserService.instance.bankMoney);
		}
	}

	private resetValue(currGoldNum: number, bankGoldNum: number): void {
		this.coinLabel.text = currGoldNum.toFixed(2);
		this.depositBtn['depositLabel'].text = CommonUtil.fixMoneyFormat2(currGoldNum);
		this.withdrawBtn['withdrawLabel'].text = CommonUtil.fixMoneyFormat2(bankGoldNum);
	}

	private closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this, 1);
	}
}