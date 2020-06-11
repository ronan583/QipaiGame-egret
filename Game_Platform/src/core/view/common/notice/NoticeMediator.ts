/**
  * 公告
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class NoticeMediator extends BaseMediator {
        public static NAME: string = "NoticeMediator";

        public constructor(viewComponent: any = null) {
            super(NoticeMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_NOTICE,
                PanelNotify.CLOSE_NOTICE
            ];
        }
        private panel: NoticePanel = new NoticePanel();
        private data: any;
        public handleNotification(notification: puremvc.INotification): void {
            this.data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_NOTICE: {
                    //显示角色面板
                    this.showUI(this.panel, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.CLOSE_NOTICE: {
                    this.closePanel(1);
                    break;
                }
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.panel.init();
            this.panel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            if (this.data == null) {
                return;
            }
            for (var i = 0; i < this.data.noticeInfos.length; i++) {
                this.panel.dataGroup.addChild(new GameNoticeList(this.data.noticeInfos[i]));
            }
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            // SoundMenager.instance.PlayClick();
            this.closePanel(1);
        }

        private onOperatorBtnClick(event: egret.TouchEvent): void {
            // SoundMenager.instance.PlayClick();
            var info: string = this.panel.kefuInfoLab.text;
            if (info == null || info.trim() == "") {
                TipsUtils.showTipsFromCenter("请输入内容", true);
                return;
            }
            UserRequest.sendKefuInfo(info);
        }

        private onTypeRadClick(evt: eui.UIEvent): void {
            // SoundMenager.instance.PlayClick();
            var select: eui.RadioButton = evt.target;
            var value: number = Number(select.value);
            if (value == 1) {
                this.panel.noticeData.visible = true;
                this.panel.kefeData.visible = false;
            } else {
                this.panel.noticeData.visible = false;
                this.panel.kefeData.visible = true;
            }
        }


        public destroy(): void {
            this.panel.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }

    }
}