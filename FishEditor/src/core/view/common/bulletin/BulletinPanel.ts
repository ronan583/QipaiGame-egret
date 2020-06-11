module game {
    export class BulletinPanel extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/common/bulletin/BulletinSkin.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public titleImg: eui.Image;
        public closeBtn: eui.Button;
        public noticeData: eui.Group;
        public noticeScroller: eui.Scroller;
        public dataGroup: eui.Group;

        private noticeSelectBtn: eui.Button;
        private kefuSelectBtn: eui.Button;

        public refreshBtnStatus(isNotice: boolean): void {
            if (isNotice) {
                this.noticeSelectBtn.currentState = "select";
                this.kefuSelectBtn.currentState = null;
            } else {
                this.noticeSelectBtn.currentState = null;
                this.kefuSelectBtn.currentState = "select";
            }
            this.onTypeRadClick(isNotice);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this["title"] = this.titleImg;
            this.noticeSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoticeClick, this);
            this.kefuSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKefuClick, this);
            if (this.noticeScroller.horizontalScrollBar != null) {
                this.noticeScroller.horizontalScrollBar.autoVisibility = false;
                this.noticeScroller.horizontalScrollBar.visible = false;
            }
            if (this.noticeScroller.verticalScrollBar != null) {
                this.noticeScroller.verticalScrollBar.autoVisibility = false;
                this.noticeScroller.verticalScrollBar.visible = false;
            }
        }

        private onNoticeClick(): void {
            this.refreshBtnStatus(true);
        }

        private onKefuClick(): void {
            this.refreshBtnStatus(false);
        }

        public init(): void {
            this.noticeData.visible = true;
            this.dataGroup.removeChildren();
            this.refreshBtnStatus(true);
        }

        private onTypeRadClick(isNotice: boolean): void {
            if (isNotice) {
                this.noticeData.visible = true;
            } else {
                this.noticeData.visible = false;
            }
        }
    }
}

