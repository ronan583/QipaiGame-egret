/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.by {

    export class BYFishBaikeMediator extends BaseMediator {
        public static NAME: string = "BYFishBaikeMediator";

        public constructor(viewComponent: any = null) {
            super(BYFishBaikeMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_FISH_BAIKE_PANEL,
                PanelNotify.CLOSE_FISH_BAIKE_PANEL
            ];
        }
        private baikePanel: game.by.BYFishBaikePanel = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_FISH_BAIKE_PANEL: {
                    if(this.baikePanel == null) {
                        this.baikePanel = new game.by.BYFishBaikePanel();
                    }
                    if(this.baikePanel.stage == null) {
                         this.showUI(this.baikePanel, true, 0, 0, 1);
                    }
                    break;
                }
                case PanelNotify.CLOSE_FISH_BAIKE_PANEL:
                    if(this.baikePanel) {
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