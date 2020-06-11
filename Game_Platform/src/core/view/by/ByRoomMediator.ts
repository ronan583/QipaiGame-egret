/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.by {

    export class ByRoomMediator extends BaseMediator {
        public static NAME: string = "ByRoomMediator";

        public constructor(viewComponent: any = null) {
            super(ByRoomMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BY_ROOM_UI,
                PanelNotify.CLOSE_BY_ROOM_UI,
                PanelNotify.HIDE_MAINUI_AND_ROOM
            ];
        }
        private byRoomUI: game.by.BYRoomUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_BY_ROOM_UI: {
                    if(this.byRoomUI == null) {
                        this.byRoomUI = new game.by.BYRoomUI();
                    }
                    if(this.byRoomUI.stage == null) {
                         this.showUI(this.byRoomUI, true, 0, 0, 0);
                    }
                    break;
                }
                case PanelNotify.HIDE_MAINUI_AND_ROOM:
                    if(this.byRoomUI) {
                        this.closePanel();
                    }
                break;
                
               case PanelNotify.CLOSE_BY_ROOM_UI:
                    if(this.byRoomUI) {
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