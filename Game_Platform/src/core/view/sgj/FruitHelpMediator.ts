/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.sgj {

    export class FruitHelpMediator extends BaseMediator {
        public static NAME: string = "FruitHelpMediator";

        public constructor(viewComponent: any = null) {
            super(FruitHelpMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.SHOW_FRUIT_HELP_UI,
                PanelNotify.CLOSE_FRUIT_HELP_UI
            ];
        }
        private fruitHelpUI:FruitHelpUI = null;

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.SHOW_FRUIT_HELP_UI: {
                    if(this.fruitHelpUI == null) {
                        this.fruitHelpUI = new game.sgj.FruitHelpUI();
                    }
                    if(this.fruitHelpUI.stage == null) {
                         this.showUI(this.fruitHelpUI, true, 0, 0, 1);
                    }
                    break;
                }
                
               case PanelNotify.CLOSE_FRUIT_HELP_UI:
                    if(this.fruitHelpUI) {
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