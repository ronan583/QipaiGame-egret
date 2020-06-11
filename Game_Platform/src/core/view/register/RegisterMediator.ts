module game {
    export class RegisterMediator extends BaseMediator {
        public static NAME: string = "RegisterMediator";

        public constructor(viewComponent: any = null) {
            super(RegisterMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_REGISTER_PANEL,
                ResponseModify.OPEN_CODE_TIPS_INFO,
                PanelNotify.CLOSE_REGISTER_PANEL
            ];
        }
        private panel: RegisterUI = null;
        private data: any;
        public handleNotification(notification: puremvc.INotification): void {
            this.data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_REGISTER_PANEL: {
                    //显示面板
                    if (this.panel == null) {
                        this.panel = new RegisterUI();
                    }
                    this.showUI(this.panel, true, 0, 0, 1);
                    this.panel.clear();
                    break;
                }
                case PanelNotify.CLOSE_REGISTER_PANEL: {
                    this.closePanel(1);
                    break;
                }
                case ResponseModify.OPEN_CODE_TIPS_INFO: {
                    if (this.data == 1) {
                        this.panel.startClock(120);
                    }
                    break;
                }
            }
        }

        /**
        * 初始化面板ui
        */
        public initUI(): void {
            this.panel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.panel.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registBtnClick, this);
            this.panel.codeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.codeBtnClick, this);
        }

        public destroy(): void {
            this.data = null;
            this.panel.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.panel.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registBtnClick, this);
            this.panel.codeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.codeBtnClick, this);
        }

        private registBtnClick(event: egret.TouchEvent): void {
            var phoneNumber: string = this.panel.phoneNumberInput.text;
            if (!RegUtils.checkMobile(phoneNumber)) {
                TipsUtils.showTipsFromCenter("手机号不正确");
                return;
            }
            var checkNumber: string = this.panel.checkNumberInput.text;
            if (checkNumber == "" || checkNumber.length != 4) {
                TipsUtils.showTipsFromCenter("验证码不正确");
                return;
            }
            var password: string = this.panel.passwordInput.text;
            var repassword: string = this.panel.passwordConformInput.text;


            if (password.length > 12 || password.length < 5) {
                TipsUtils.showTipsFromCenter("密码长度非法，5-12位.", true);
                return;
            }
            if (!RegUtils.checkPassword(password)) {
                TipsUtils.showTipsFromCenter("密码包含非法字符", true);
                return;
            }
            if (password != repassword) {
                TipsUtils.showTipsFromCenter("两次输入密码不一致");
                return;
            }

            if (!this.panel.isRequestCode) {
                TipsUtils.showTipsFromCenter("请先申请验证码");
                return;
            }
            UserRequest.sendRegisterAccount(phoneNumber, checkNumber, password);
        }

        private codeBtnClick(event: egret.TouchEvent): void {
            var phoneNumber: string = this.panel.phoneNumberInput.text;
            if (!RegUtils.checkMobile(phoneNumber)) {
                TipsUtils.showTipsFromCenter("手机号不正确");
                return;
            }
            UserRequest.sendGetCode(phoneNumber, 1);
        }
        private closeBtnClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }
    }
}