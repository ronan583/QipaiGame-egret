module game {
    export class NoticeDetailPanel extends ResizePanel {
        public constructor(data: any) {
            super();
            this.skinName = "resource/eui_skins/common/notice/NoticeDetailSkin.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.titleLab.text = data.noticeInfo.title;
            this.infoLab.text = data.noticeInfo.info;
            this.senderLab.text = data.noticeInfo.sender;
            this.titleLab.touchEnabled = false;
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public closeBtn: IButton;
        public removalBtn: IButton;
        public titleLab: eui.Label;
        public infoLab: eui.Label;
        public senderLab: eui.Label;


        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.removalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removalBtnClick, this);
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            // SoundMenager.instance.PlayClick();
            PopUpManager.removePopUp(this, 1);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }

        private removalBtnClick(event: egret.TouchEvent): void {
            PopUpManager.removePopUp(this, 1);
            this.removalBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removalBtnClick, this);
        }
    }
}