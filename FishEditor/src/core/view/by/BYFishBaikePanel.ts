module game.by {
    export class BYFishBaikePanel extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/by/BYFishBaike.exml";
        }
        public closeBtn:eui.Button = null;

        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected childrenCreated():void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
        }

        private onAddToStage():void {

        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private onBackBtnClick(e:egret.TouchEvent):void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FISH_BAIKE_PANEL);
        }

    }
}