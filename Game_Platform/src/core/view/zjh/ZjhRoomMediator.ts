/**
  * 加入房间
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class ZjhRoomMediator extends BaseMediator {
        public static NAME: string = "ZjhRoomMediator";

        public constructor(viewComponent: any = null) {
            super(ZjhRoomMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_ZJH_ROOM_UI,
                PanelNotify.CLOSE_ZJH_ROOM_UI
            ];
        }
        private panel: ZjhRoomUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJH_ROOM_UI: {
                    if(this.panel == null) {
                        this.panel = new ZjhRoomUI();
                    }
                    this.showUI(this.panel, false, 0, 0, 0);
                    break;
                }
                case PanelNotify.CLOSE_ZJH_ROOM_UI:
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