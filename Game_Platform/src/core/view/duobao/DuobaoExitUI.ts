module game.duobao {
    export class DuobaoExitUI extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/duobao/DuobaoExit.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closeBtn:eui.Button;

        private giveUpBtn:eui.Button;
        private saveBtn:eui.Button;

        protected childrenCreated():void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upClick, this);
            this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downClick, this);

        }

        protected addToStage() {
            super.addToStage();
            egret.setTimeout(() => {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }, this, 100);
        }

        protected removeFromStage() {
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }
        }


        private stageClick(e: egret.TouchEvent) {
            if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
                this.closePanel();
            }
        }

        private closePanel():void {
            // AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_EXIT_UI);
			SoundMenager.instance.PlayClick();
            PopUpManager.removePopUp(this);
            this.removeFromStage();
        }

        private upClick():void {
            DuobaoRequest.sendExit(false);
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_EXIT_UI);
            this.removeFromStage();
        }

        private downClick():void {
            DuobaoRequest.sendExit(true);
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_EXIT_UI);
            this.removeFromStage();
        }

    }
}