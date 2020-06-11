module game {
    export class DepositPanel extends ResizePanel {
        public constructor(data: any) {
            super();
            this.skinName = "resource/eui_skins/common/bank/DepositSkin.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.balanceLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.bankMoney);
            this.currentLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.money);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public closeBtn: IButton;
        public maxBtn: IButton;
        public depositBtn: IButton;
        public balanceLabel: eui.BitmapLabel;
        public currentLabel: eui.BitmapLabel;
        public editable: eui.EditableText;
        public coinSlider: SettingSlider;

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxNum, this);
            this.depositBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOperator, this);
            this.editable.addEventListener(egret.TouchEvent.CHANGE, this.onInputChange, this)
            this.coinSlider.addEventListener(eui.UIEvent.CHANGE, this.onSliderChange, this);
            this.initUI();
        }

        public initUI() {
            this.coinSlider.value = 0;
            this.coinSlider["track"].mask = this.coinSlider["bar"];
            this.coinSlider["bar"].width = this.coinSlider.value;
            this.editable.text = "0";
            this.balanceLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.bankMoney);
            this.currentLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.money);
        }

        private onOperator(event: egret.TouchEvent) {
            var opratorNum = Number(this.editable.text);
            if (opratorNum == 0) {
                return;
            }
            UserRequest.sendOperatorMoney(BankType.save, opratorNum);
        }

        private onSliderChange(event: eui.UIEvent) {
            var changeNum = this.coinSlider.value / 100 * Math.floor(game.UserService.instance.money);
            this.resetValue(Math.floor(game.UserService.instance.money) - changeNum);
        }

        private onInputChange(event: eui.UIEvent) {
            var changeNum = Math.floor(Number(this.editable.text));
            this.editable.text = changeNum.toString();
            if (changeNum <= 0) {
                this.editable.text = "0";
                return;
            }
            if (!RegUtils.isNumber(this.editable.text)) {
                this.editable.text = "0";
                this.resetValue(Math.floor(game.UserService.instance.money));
                return;
            }

            if (changeNum > Math.floor(game.UserService.instance.money)) {
                changeNum = Math.floor(game.UserService.instance.money);
                this.editable.text = changeNum.toString();
            }
            this.resetValue(Math.floor(game.UserService.instance.money) - changeNum);
        }

        private resetValue(currGoldNum: number): void {
            this.balanceLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.bankMoney);
            this.currentLabel.text = CommonUtil.fixMoneyFormat2(game.UserService.instance.money);
            var changeNum = 0;
            var showNum = 0;
            showNum = Math.floor(game.UserService.instance.money) - currGoldNum;
            changeNum = showNum / Math.floor(game.UserService.instance.money);
            if (changeNum == 0 || !changeNum) {
                this.coinSlider.value = 0;
                this.editable.text = "0";
            } else if (changeNum > 0) {
                this.coinSlider["bar"].width = 660 * changeNum;
                this.coinSlider.value = Math.floor(changeNum * 100);
                this.editable.text = showNum.toFixed(0) + '';
            }
        }

        public closeBtnClick(event: egret.TouchEvent): void {
            PopUpManager.removePopUp(this, 1);
        }

        private onMaxNum(event: egret.TouchEvent): void {
            var money = Math.floor(game.UserService.instance.money);
            this.resetValue(Math.floor(game.UserService.instance.money) - money);
        }
    }
}