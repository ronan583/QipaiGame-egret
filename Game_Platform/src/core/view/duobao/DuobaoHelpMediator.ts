/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.duobao {

    export class DuobaoHelpMediator extends BaseMediator {
        public static NAME: string = "DuobaoHelpMediator";

        public constructor(viewComponent: any = null) {
            super(DuobaoHelpMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.SHOW_DUOBAO_HELP_UI,
                PanelNotify.CLOSE_DUOBAO_HELP_UI
            ];
        }
        private duobaoHelpUI:game.duobao.DuobaoHelpUI = null;

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.SHOW_DUOBAO_HELP_UI: {
                    if(this.duobaoHelpUI == null) {
                        this.duobaoHelpUI = new game.duobao.DuobaoHelpUI();
                    }
                    if(this.duobaoHelpUI.stage == null) {
                         this.showUI(this.duobaoHelpUI, true, 0, 0, 1);
                    }
                    break;
                }
                
               case PanelNotify.CLOSE_DUOBAO_HELP_UI:
                    if(this.duobaoHelpUI) {
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