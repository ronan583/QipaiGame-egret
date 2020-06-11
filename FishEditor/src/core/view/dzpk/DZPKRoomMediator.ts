/**
  * 加入房间
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.dzpk {

    export class DZPKRoomMediator extends BaseMediator {
        public static NAME: string = "DZPKRoomMediator";

        public constructor(viewComponent: any = null) {
            super(DZPKRoomMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_DZPK_ROOM_UI,
                PanelNotify.CLOSE_DZPK_ROOM_UI
            ];
        }
        private panel: DZPKRoomUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DZPK_ROOM_UI: {
                    if(this.panel == null) {
                        this.panel = new DZPKRoomUI();
                    }
                    this.showUI(this.panel, false, 0, 0, 0);
                    break;
                }
                case PanelNotify.CLOSE_DZPK_ROOM_UI:
                    this.closePanel(0);
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