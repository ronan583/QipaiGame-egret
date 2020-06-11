module game {
    export class LoginManager extends puremvc.SimpleCommand implements puremvc.ICommand {
        private loginUI: LoginUI;

        public constructor() {
            super();
        }

        public static NAME: string = "LoginManager";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(SceneNotify.OPEN_LOGIN, this);//打开主城
            this.facade.registerCommand(SceneNotify.CLOSE_LOGIN, this);//关闭主城
            this.facade.registerCommand(ResponseModify.OPEN_CODE_TIPS_INFO, this);//获取验证码成功
            this.facade.registerCommand(ResponseModify.SUCCESS_RESETPASSWORD_RESPONSE, this);//重置密码成功
        }

        public resetpasswordPanel: ResetPasswordPanel;

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var panelCon = GameLayerManager.gameLayer().loginLayer;
            switch (notification.getName()) {
                case SceneNotify.OPEN_LOGIN: {
                    if (this.loginUI == null) {
                        this.loginUI = new LoginUI();
                    }
                    panelCon.addChild(this.loginUI);
                    GameLayerManager.gameLayer().panelLayer.removeChildren();    
                    GameLayerManager.gameLayer().mainLayer.removeChildren();
                    if (Global.isNative) {
                        this.loginUI.deviceLabel.visible = false;
                    }
                    this.initData();
                    break;
                }
                case SceneNotify.CLOSE_LOGIN: {
                    if (this.loginUI != null) {
                        panelCon.removeChild(this.loginUI);
                        this.loginUI = null;
                    }
                    break;
                }
                case ResponseModify.OPEN_CODE_TIPS_INFO: {
                    if (this.loginUI != null && data == 2) {
                        this.resetpasswordPanel.updateCode();
                    }
                    break;
                }
                case ResponseModify.SUCCESS_RESETPASSWORD_RESPONSE: {
                    if (this.loginUI != null && data == 2) {
                        TipsUtils.showTipsFromCenter("修改成功");
                        PopUpManager.removePopUp(this.resetpasswordPanel);
                    }
                    break;
                }
            }
        }

        private initData() {
            this.loginUI.guestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guestBtnClick, this);
            this.loginUI.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginBtnClick, this);
            this.loginUI.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerBtnClick, this);
            this.loginUI.registerBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerBtnClick, this);
            this.loginUI.kefuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kefuBtnClick, this);
            this.loginUI.closeLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeLoginBtnClick, this);
            this.loginUI.loginAccountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginAccountBtnClick, this);
            this.loginUI.forgetPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.forgetPwdBtnClick, this);
            this.loginUI.passwordInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearPwdBtnClick, this);
            this.loginUI.phoneNumberInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearPhoneBtnClick, this);
        }

        private clearPhoneBtnClick(event: egret.TouchEvent): void {
             this.loginUI.phoneNumberInput.text = "";
        }
        private clearPwdBtnClick(event: egret.TouchEvent): void {
             this.loginUI.passwordInput.text = "";
        }
        private guestBtnClick(event: egret.TouchEvent): void {
            if (Global.isNative) {
                var deviceid: string = NativeApi.getLocalData("user_login_deviceid");
                UserRequest.sendGuestLogin(deviceid, Global.os, Global.platform);
            } else {
                var deviceid: string = this.loginUI.deviceLabel.editInput.text;
                if (deviceid == null || deviceid === "") {
                    TipsUtils.showTipsFromCenter("请输入账号信息");
                    return;
                }
                UserRequest.sendGuestLogin(deviceid, Global.os, Global.platform);
                UserService.curGuestLoginDeviceId = deviceid;
            }
        }
        //弹出登陆页面
        private loginBtnClick(event: egret.TouchEvent): void {
            this.loginUI.accountLoginGroup.visible = true;
            var account: string = NativeApi.getLocalData("user_login_account");
            var pwd: string = NativeApi.getLocalData("user_login_password");
            if (account != null && account !== "" && pwd != null && pwd !== "") {
                this.loginUI.phoneNumberInput.text = account;
                this.loginUI.passwordInput.text = pwd;
            }
        }
        //关闭登陆页面
        private closeLoginBtnClick(event: egret.TouchEvent): void {
            this.loginUI.accountLoginGroup.visible = false;
        }

        //注册页面
        private registerBtnClick(event: egret.TouchEvent): void {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_REGISTER_PANEL);
        }
        //忘记密码
        private forgetPwdBtnClick(event: egret.TouchEvent): void {
            this.resetpasswordPanel = new ResetPasswordPanel();
            PopUpManager.addPopUp(this.resetpasswordPanel, true, 0, 0, 1);
        }
        //客服
        private kefuBtnClick(event: egret.TouchEvent): void {
        }
        //账号登陆
        private loginAccountBtnClick(event: egret.TouchEvent): void {
            var account: string = this.loginUI.phoneNumberInput.text;
            var pwd: string = this.loginUI.passwordInput.text;
            if (!RegUtils.checkMobile(account)) {
                TipsUtils.showTipsFromCenter("请输正确的手机号");
                return;
            }
            if (!RegUtils.cTrim(pwd, 0)) {
                TipsUtils.showTipsFromCenter("请输正确的密码");
                return;
            }
            var deviceid: string = NativeApi.getLocalData("user_login_deviceid");
            UserRequest.sendAccountLogin(account, pwd, deviceid, Global.os, Global.platform);
        }

    }
}