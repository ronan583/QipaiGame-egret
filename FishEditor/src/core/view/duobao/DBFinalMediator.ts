/**
  * 夺宝meditator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.duobao {

    export class DBFinalMediator extends GameMeditator {
        public static NAME: string = "DBFinalMediator";

        public constructor(viewComponent: any = null) {
            super(DBFinalMediator.NAME, viewComponent, PanelNotify.OPEN_DUOBAO_FINAL);
        }

        public listNotificationInterests(): Array<any> {
            return [
                    PanelNotify.OPEN_DUOBAO_FINAL,
                    PanelNotify.DUOBAO_OPEN_OTHRES
            ];
        }
        private finalUI:DBFinalUI = null;
        // public handleNotificationSafe(notification: puremvc.INotification): void {
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DUOBAO_FINAL: {
                    if(this.finalUI == null) {
                        this.finalUI = new game.duobao.DBFinalUI();
                    }
                    if(this.finalUI.stage == null) {
                        //  CommonUtil.registerTimeOut(()=>{
                            this.showUI(this.finalUI, false, 0, 0, 0);
                         this.finalUI.doorEffect();
                        //  }, this, 200);
                    }
                    break;
                }
                case PanelNotify.DUOBAO_OPEN_OTHRES:
                    this.finalUI.showUnReward();
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