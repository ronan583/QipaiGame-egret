/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class HelpMediator extends BaseMediator {
        public static NAME: string = "HelpMediator";

        public constructor(viewComponent: any = null) {
            super(HelpMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_HELP_UI,
                PanelNotify.CLOSE_HELP_UI,
            ];
        }
        private helpUI: HelpUI = null;
        private helpOtherUI:HelpOtherUIPanel = null;

        private helpUIMap:HashMap = new HashMap();

        public isUIShow():boolean {
            return this.helpUI != null && this.helpUI.stage != null;
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_HELP_UI: {
                    /*
                    if(GameConst.COMMON_HELP.indexOf(data) >= 0) {
                        if(this.helpUI == null || this.helpUI.stage == null) {
                            this.helpUI = new HelpUI();
                            this.showUI(this.helpUI, true, 0, 0, 1);
                        }
                        this.helpUI.showGameHelp(data);
                    } else {
                        if(this.helpOtherUI == null || this.helpOtherUI.stage == null) {
                            this.helpOtherUI = new HelpOtherUIPanel();
                            PopUpManager.addPopUp(this.helpOtherUI, true, 0, 0, 1);
                        }
                        this.helpOtherUI.showGameHelp(data);
                    }
                    */
                    let helpUI:any = null;
                    if(this.helpUIMap.contains("help" + data)) {
                        helpUI = this.helpUIMap.get("help" + data);
                    } else {
                        helpUI = new NHelpUI(data);
                        this.helpUIMap.put("help" + data, helpUI);
                    }
                    this.helpUI = helpUI;
                    PopUpManager.addPopUp(this.helpUI, true, 0, 0, 1);
                    break;
                }
                case PanelNotify.CLOSE_HELP_UI:
                    if(this.helpUI != null) {
                        PopUpManager.removePopUp(this.helpUI);
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