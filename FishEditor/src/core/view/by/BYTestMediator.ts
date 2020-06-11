/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class BYTestMediator extends GameMeditator {
        public static NAME: string = "BYTestMediator";

        public constructor(viewComponent: any = null) {
            super(BYTestMediator.NAME, viewComponent, PanelNotify.OPEN_BY_TRACK_UI);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BY_TRACK_UI
            ];
        }
        private byTrackUI:game.by.BYTrackShowUI = null;

        public handleNotificationSafe(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_BY_TRACK_UI: {
                    if(this.byTrackUI == null) {
                        this.viewComponent = this.byTrackUI = new game.by.BYTrackShowUI();
                    }
                    if(this.byTrackUI.stage == null) {
                         this.showUI(this.byTrackUI, true, 0, 0, 0);
                    }
                    break;
                }
               
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