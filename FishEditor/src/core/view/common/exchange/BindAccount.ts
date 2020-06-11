class BindAccount extends ResizePanel {
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/common/exchange/BindAccount.exml";
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: eui.UIEvent): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
    }

    public okBtn: IButton;
    public closeBtn: IButton;
    public accountInput1: eui.EditableText;
    public accountInput2: eui.EditableText;
    public accountLabel1: eui.Label;
    public accountLabel2: eui.Label;
    public tipsLabel: eui.Label;
    public titleName: eui.Image;
    private exchangeType: ExchangeType;
    private isInit = false;

    public partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindAccount, this);
        if (!this.isInit) {
            this.updateUIByType();
            this.isInit = true;
        }
    }

    public initUI(bankType) {
        this.exchangeType = bankType;
        if (this.isInit) {
            this.updateUIByType();
        }
    }

    private onBindAccount(event: egret.TouchEvent) {
        if (this.accountInput1.text == null || this.accountInput1.text === "") {
            TipsUtils.showTipsFromCenter("请输入账号信息");
            return;
        }
        if (this.accountInput2.text == null || this.accountInput2.text === "") {
            TipsUtils.showTipsFromCenter("请输入真实姓名");
            return;
        }
        UserRequest.sendBindBank(this.exchangeType, this.accountInput1.text, this.accountInput2.text);
    }

    private updateUIByType() {
        if (this.exchangeType == ExchangeType.ali) {
            this.titleName.source = "binding_alipay_title";
            this.accountInput1.text = "";
            this.accountLabel1.text = "支付宝账号";
            this.accountInput2.text = "";
            this.tipsLabel.text = "请输入正确的支付宝账号，以及对应的实名制姓名，否则会导致绑定失败。";

        } else {
            this.titleName.source = "binding_bankCard_title";
            this.accountInput1.text = "";
            this.accountLabel1.text = "银行卡账号";
            this.accountInput2.text = "";
            this.tipsLabel.text = "请输入正确的银行卡账号，以及对应的实名制姓名，否则会导致绑定失败。";
        }
    }

    private closePanel(event: egret.TouchEvent): void {
        PopUpManager.removePopUp(this, 1);
    }
}
