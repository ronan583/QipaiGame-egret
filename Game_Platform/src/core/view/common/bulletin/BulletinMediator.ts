module game {
    export class BulletinMediator extends BaseMediator {
        public static NAME: string = "BulletinMediator";

        public constructor(viewComponent: any = null) {
            super(BulletinMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BULLETIN_PANEL,
                PanelNotify.CLOSE_BULLETIN_PANEL
            ];
        }
        private panel: BulletinPanel = new BulletinPanel();
        private data: any;
        public handleNotification(notification: puremvc.INotification): void {
            this.data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_BULLETIN_PANEL: {
                    //显示角色面板
                    this.showUI(this.panel, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.CLOSE_BULLETIN_PANEL: {
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
                this.panel.dataGroup.addChild(new GameBulletinList(this.data.noticeInfos[i]));
            }
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }

        private onTypeRadClick(evt: eui.UIEvent): void {
            var select: eui.RadioButton = evt.target;
            var value: number = Number(select.value);
            if (value == 1) {
                this.panel.noticeData.visible = true;
            } else {
                this.panel.noticeData.visible = false;
            }
        }

        public destroy(): void {
            this.panel.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        }
    }
}