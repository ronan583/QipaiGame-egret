class ExchangeAccount extends ResizePanel {
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/common/exchange/ExchangeAccount.exml";
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: eui.UIEvent): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
    }

    public closeBtn: IButton;
    public maxBtn: IButton;
    public okBtn: IButton;
    public balanceLabel: eui.BitmapLabel;
    public titleName: eui.Image;
    public editable: eui.EditableText;
    public coinSlider: eui.HSlider;
    private AccountType: ExchangeType;
    private isInit = false;

    public partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        this.maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxNum, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOperator, this);
        this.editable.addEventListener(egret.TouchEvent.CHANGE, this.onInputChange, this)
        this.coinSlider.addEventListener(eui.UIEvent.CHANGE, this.onSliderChange, this);
        this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
        if (!this.isInit) {
            this.updateUIByType();
            this.isInit = true;
        }
    }

    public initUI(AccountType) {
        this.AccountType = AccountType;
        if (this.isInit) {
            this.updateUIByType();
        }
    }

    private updateUIByType() {
        this.balanceLabel.text = game.UserService.instance.money + '';
        if (this.AccountType == ExchangeType.ali) {
            this.titleName.source = "exchange_alipay_title";
            this.editable.text = "0";
        } else {
            this.titleName.source = "exchange_bankCard_title";
            this.editable.text = "0";
        }
        this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
    }

    private onOperator(event: egret.TouchEvent) {
        var opratorNum = Number(this.editable.text);
        if (opratorNum <= 0) {
            TipsUtils.showTipsFromCenter("输入的金额不正确！");
            return;
        }
        UserRequest.sendExchange(this.AccountType, opratorNum);
    }

    private onSliderChange(event: eui.UIEvent) {
        var changeNum = Math.floor((this.coinSlider.value / 100) * game.UserService.instance.money);
        this.resetValue(game.UserService.instance.money - changeNum, game.UserService.instance.bankMoney + changeNum);
        // this.bankProgress.value = this.bankSlider.value;
    }

    private onInputChange(event: eui.UIEvent) {
        var changeNum = Number(this.editable.text);
        this.editable.text = changeNum.toString();
        if (changeNum <= 0) {
            this.editable.text = "0";
            return;
        }
        if (!RegUtils.isNumber(this.editable.text)) {
            this.editable.text = "0";
            this.resetValue(game.UserService.instance.money, game.UserService.instance.bankMoney);
            return;
        }

        if (changeNum > game.UserService.instance.money) {
            changeNum = Math.floor(game.UserService.instance.money);
            this.editable.text = changeNum.toString();
        }
        this.resetValue(game.UserService.instance.money - changeNum, game.UserService.instance.bankMoney + changeNum);
    }

    private resetValue(currGoldNum: number, bankGoldNum: number): void {
        this.balanceLabel.text = game.UserService.instance.money + '';
        var changeNum = 0;
        var showNum = 0;
        showNum = (game.UserService.instance.money - currGoldNum);
        changeNum = showNum / game.UserService.instance.money;

        if (changeNum == 0) {
            this.coinSlider.value = 0;
            this.editable.text = "0";
            // this.deposit.resetTipContent();
        } else {
            this.coinSlider.value = Math.floor(changeNum * 100);
            this.editable.text = showNum.toFixed(0);
            // this.deposit.resetTipContent("");
        }
    }

    public closeBtnClick(): void {
        PopUpManager.removePopUp(this, 1);
    }

    private onMaxNum(event: egret.TouchEvent): void {
        var money = Math.floor(game.UserService.instance.money);
        this.resetValue(game.UserService.instance.money - money, game.UserService.instance.bankMoney + money);
    }
}