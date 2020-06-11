/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.sgj {

    export class SgjRoomMediator extends BaseMediator {
        public static NAME: string = "SgjRoomMediator";

        public constructor(viewComponent: any = null) {
            super(SgjRoomMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_SGJ_ROOM_UI,
                PanelNotify.CLOSE_SGJ_ROOM_UI,
                PanelNotify.REFRESH_FRUIT_POOL
            ];
        }
        private sgjRoomUI: game.fruit.NSgjRoomUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_SGJ_ROOM_UI: {
                    if(this.sgjRoomUI == null) {
                        this.sgjRoomUI = new game.fruit.NSgjRoomUI();
                    }
                    if(this.sgjRoomUI.stage == null) {
                         this.showUI(this.sgjRoomUI, true, 0, 0, 0);
                    }
                    
                    break;
                }
                
               case PanelNotify.CLOSE_SGJ_ROOM_UI:
                    if(this.sgjRoomUI) {
                        this.closePanel();
                    }
               break;
               case PanelNotify.REFRESH_FRUIT_POOL:
                    if(this.sgjRoomUI) {
                        this.sgjRoomUI.refreshPool(<Array<number>>notification.getBody());
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