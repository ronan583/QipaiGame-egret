module game {
    export class LoginUI extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/login/LoginSkin.exml";
            if (Global.isNative) {
                this.deviceLabel.visible = false;
            } else {
                this.deviceLabel.visible = true;
            }
            this.accountLoginGroup.visible = false;
            this.versionLib.text = Global.version;
        }
        public guestBtn: IButton;
        public loginBtn: IButton;
        public registerBtn: IButton;
        public kefuBtn: IButton;
        public versionLib: eui.Label;
        public deviceLabel: EditText;
        public accountLoginGroup: eui.Group;
        public loginAccountBtn: IButton;
        public phoneNumberInput:  eui.EditableText;
        public passwordInput:  eui.EditableText;
        public closeLoginBtn: IButton;
        public forgetPwdBtn: eui.Label;
        public registerBtn2: eui.Label;

        public createCompleteEvent(event: eui.UIEvent): void {

        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

    }
}