/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.by {

    export class BYChangeCanonMediator extends BaseMediator {
        public static NAME: string = "BYChangeCanonMediator";

        public constructor(viewComponent: any = null) {
            super(BYChangeCanonMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_CHANGE_CANON_PANEL,
                PanelNotify.CLOSE_CHANGE_CANON_PANEL
            ];
        }
        private byChangeCanonPanel: game.by.BYChangeCanonPanel = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_CHANGE_CANON_PANEL: {
                    if(this.byChangeCanonPanel == null) {
                        this.byChangeCanonPanel = new game.by.BYChangeCanonPanel();
                    }
                    if(this.byChangeCanonPanel.stage == null) {
                         this.showUI(this.byChangeCanonPanel, true, 0, 0, 1);
                    }
                    this.byChangeCanonPanel.refresh();
                    break;
                }
                case PanelNotify.CLOSE_CHANGE_CANON_PANEL:
                    if(this.byChangeCanonPanel) {
                        this.closePanel();
                    }
                break;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            
        }


        /**
         * 初始化面板数据
         */
        public initData(): void {
        }

        public destroy(): void {
            
        }

    }
}