module game {
    export enum NoticeType {
        sys = 1,//系统
        kefu = 2,//客服
        reward = 3//有奖
    }
    export class NoticePanel extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/common/notice/NoticeSkin.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public closeBtn: eui.Button;
        public noticeData: eui.Group;
        public kefeData: eui.Group;
        public noticeScroller: eui.Scroller;
        public dataGroup: eui.Group;
        public kefuInfoLab: eui.EditableText;
        public operatorBtn: IButton;
        public rewardSelectBtn: IButton;

        private noticeSelectBtn: eui.Button;
        private kefuSelectBtn: eui.Button;

        private selectIndex : number = NoticeType.sys;

        public refreshBtnStatus(index: number): void {
            if (index == NoticeType.sys) {
                this.noticeSelectBtn.currentState = "select";
                this.kefuSelectBtn.currentState = null;
                this.rewardSelectBtn.currentState = null;
            } else if (index == NoticeType.kefu) {
                this.noticeSelectBtn.currentState = null;
                this.rewardSelectBtn.currentState = null;
                this.kefuSelectBtn.currentState = "select";
            } else {
                this.noticeSelectBtn.currentState = null;
                this.kefuSelectBtn.currentState = null;
                this.rewardSelectBtn.currentState = "select";
            }
            this.onTypeRadClick(index);
            this.selectIndex = index;
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.noticeSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoticeClick, this);
            this.kefuSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKefuClick, this);
            this.rewardSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardClick, this);
            if (this.noticeScroller.horizontalScrollBar != null) {
                this.noticeScroller.horizontalScrollBar.autoVisibility = false;
                this.noticeScroller.horizontalScrollBar.visible = false;
            }
            if (this.noticeScroller.verticalScrollBar != null) {
                this.noticeScroller.verticalScrollBar.autoVisibility = false;
                this.noticeScroller.verticalScrollBar.visible = false;
            }
            this.operatorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOperatorBtnClick, this);
        }

        private onRewardClick(): void {
            this.refreshBtnStatus(NoticeType.reward);
        }
        private onNoticeClick(): void {
            this.refreshBtnStatus(NoticeType.sys);
        }

        private onKefuClick(): void {
            this.refreshBtnStatus(NoticeType.kefu);
        }

        public init(): void {

            this.noticeData.visible = true;
            this.kefeData.visible = false;
            //this.noticeRadio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeRadClick, this);
            //this.kefuRadio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeRadClick, this);

            this.dataGroup.removeChildren();
            this.kefuInfoLab.text = "";

            this.refreshBtnStatus(NoticeType.sys);
        }

        private onOperatorBtnClick(event: egret.TouchEvent): void {
            var info: string = this.kefuInfoLab.text;
            if (info == null || info.trim() == "") {
                TipsUtils.showTipsFromCenter("请输入内容", true);
                return;
            }
            UserRequest.sendKefuInfo(info);
        }

        private onTypeRadClick(index: number): void {
            if (index == NoticeType.sys) {
                this.noticeData.visible = true;
                this.kefeData.visible = false;
            } else if (index == NoticeType.kefu) {
                this.noticeData.visible = false;
                this.kefeData.visible = true;
            } else {
                this.noticeData.visible = false;
                this.kefeData.visible = false;
            }
        }
    }
}

