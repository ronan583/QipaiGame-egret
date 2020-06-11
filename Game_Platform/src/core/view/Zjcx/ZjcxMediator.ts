/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class ZjcxMediator extends BaseMediator {
        public static NAME: string = "ZjcxMediator";

        public constructor(viewComponent: any = null) {
            super(ZjcxMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_ZJCX_UI,
                PanelNotify.CLOSE_ZJCX_UI
            ];
        }
        private zjcxUI: ZjcxUI = null;
        private zjcxUIMap:HashMap = new HashMap();

        public isUIShow():boolean {
            return this.zjcxUI != null && this.zjcxUI.stage != null;
        }
        private data :any;
        public handleNotification(notification: puremvc.INotification): void {
            this.data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJCX_UI: {
                    let zjcxUI:any = null;
                    if(this.zjcxUIMap.contains("help" + this.data.gameType)) {
                        zjcxUI = this.zjcxUIMap.get("help" + this.data.gameType);
                    } else {
                        zjcxUI = new ZjcxUI(this.data.gameType);
                        this.zjcxUIMap.put("help" + this.data.gameType, zjcxUI);
                    }
                    this.zjcxUI = zjcxUI;
                    this.showUI(this.zjcxUI)
                    this.zjcxUI.showGameZJCX(this.data);
                    break;
                }
                case PanelNotify.CLOSE_ZJCX_UI:
                    if(this.zjcxUI != null) {
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