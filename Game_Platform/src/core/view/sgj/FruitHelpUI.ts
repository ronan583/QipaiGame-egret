module game.sgj {
    export class FruitHelpUI extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/fruit/FruitHelpUI.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closeBtn:eui.Button;

        protected childrenCreated():void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        }

        private closePanel():void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FRUIT_HELP_UI);
        }
    }
}