module game.tgpd {
    export class CandyExitPanel extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/tgpd/CandyExit.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public closeBtn : IButton;
        private cancelBtn:eui.Button;
        private confirmBtn:eui.Button;

        protected childrenCreated():void
        {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP  , this.onCancel , this);
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP  , this.onConfirm , this);
        }

        private onCancel() {
            TgpdRequest.requestExitGame(false);
            this.closePanel();
        }

        private onConfirm() {
            TgpdRequest.requestExitGame(true);
            this.closePanel();
        }


        public closePanel()
        {
            SoundMenager.instance.PlayClick();
            PopUpManager.removePopUp(this);
        }
    }
}