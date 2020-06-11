module game {
    export class BulletinDetailPanel extends ResizePanel {
        public constructor(data: any) {
            super();
            this.skinName = "resource/eui_skins/common/Bulletin/BulletinDetailSkin.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.infoLab.text = data.noticeInfo.info;
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public closeBtn: IButton;
        public infoLab: eui.Label;

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            PopUpManager.removePopUp(this, 1);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }
    }
}