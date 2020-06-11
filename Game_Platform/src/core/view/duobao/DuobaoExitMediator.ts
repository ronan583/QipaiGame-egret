/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.duobao {

    export class DuobaoExitMediator extends BaseMediator {
        public static NAME: string = "DuobaoExitMediator";

        public constructor(viewComponent: any = null) {
            super(DuobaoExitMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.SHOW_DUOBAO_EXIT_UI,
                PanelNotify.CLOSE_DUOBAO_EXIT_UI
            ];
        }
        private duobaoExitUI:game.duobao.DuobaoExitUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.SHOW_DUOBAO_EXIT_UI: {
                    let level = DuobaoData.instance.gameLevel;
                    if(level == 0){
                        DuobaoRequest.sendExit(false);
                        AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_EXIT_UI);    
                        break;                
                    }else{
                        if(this.duobaoExitUI == null) {
                            this.duobaoExitUI = new game.duobao.DuobaoExitUI();
                        }
                        if(this.duobaoExitUI.stage == null) {
                            this.showUI(this.duobaoExitUI, true, 0, 0, 1);
                        }
                        break;
                    }
                }
                
               case PanelNotify.CLOSE_DUOBAO_EXIT_UI:
                    if(this.duobaoExitUI) {
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