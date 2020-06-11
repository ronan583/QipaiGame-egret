module game {
    export class RegisterUI extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/common/register/RegisterSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public phoneNumberInput: eui.EditableText;
        public checkNumberInput: eui.EditableText;
        public passwordInput: eui.EditableText;
        public passwordConformInput: eui.EditableText;
        public dumiaoLab: eui.Label;
        public codeTipsGroup: eui.Group;

        public closeBtn: IButton;
        public registBtn: IButton;
        public codeBtn: IButton;
        public isRequestCode: boolean = false;
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public clear () : void {
            this.phoneNumberInput.text = "";
            this.checkNumberInput.text = "";
            this.passwordInput.text = "";
            this.passwordConformInput.text = "";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
        private endTime: number = 0;
        public startClock(leftTime: number): void {
            this.codeBtn.visible = false;
            this.codeTipsGroup.visible = true;
            this.endTime = egret.getTimer() / 1000 + leftTime;
            egret.startTick(this.updateClock, this);
            this.isRequestCode = true;
        }

        private updateClock(timestamp: number): boolean {
            let leftTime: number = this.endTime - timestamp / 1000;
            if (leftTime < 0) {
                egret.stopTick(this.updateClock, this);
                this.codeBtn.visible = true;
                this.codeTipsGroup.visible = false;
            } else {
                this.dumiaoLab.text = "(" + leftTime.toFixed(0) + "秒)";
            }
            return true;
        }

    }
}