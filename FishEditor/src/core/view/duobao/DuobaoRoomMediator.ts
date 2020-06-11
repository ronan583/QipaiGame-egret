/**
  * 捕鱼
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game.duobao {

    export class DuobaoRoomMediator extends BaseMediator {
        public static NAME: string = "DuobaoRoomMediator";

        public constructor(viewComponent: any = null) {
            super(DuobaoRoomMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_DUOBAO_ROOM_UI,
                PanelNotify.CLOSE_DUOBAO_ROOM_UI,
                PanelNotify.SHOW_DUOBAO_HELP_UI,
                PanelNotify.CLOSE_DUOBAO_HELP_UI,
                PanelNotify.OPEN_DUOBAO_BATTLE
            ];
        }
        private duobaoHelpUI:game.duobao.DuobaoHelpUI = null;
        private duobaoRoomUI: game.duobao.NDuobaoRoomUI = null;
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_DUOBAO_ROOM_UI: {
                    if(this.duobaoRoomUI == null) {
                        this.duobaoRoomUI = new game.duobao.NDuobaoRoomUI();
                    }
                    this.duobaoRoomUI.isAnimPlay = <boolean>data;
                    if(this.duobaoRoomUI.stage == null) {
                         this.showUI(this.duobaoRoomUI, true, 0, 0, 0);
                    }
                    
                    break;
                }
                case PanelNotify.OPEN_DUOBAO_BATTLE:
                    if(this.duobaoRoomUI) {
                        // this.duobaoRoomUI.curtainDownAnim(null, null);
                    }
                break;
                
               case PanelNotify.CLOSE_DUOBAO_ROOM_UI:
                    if(this.duobaoRoomUI) {
                        this.closePanel();
                    }
               break;
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