module game {
    export class SettingMediator extends BaseMediator {

        public static NAME: string = "SettingMediator";

        public constructor(viewComponent: any = null) {
            super(SettingMediator.NAME, viewComponent);
        }

        private settingUI: NSettingUI = null;
        private settingUIMap: HashMap = new HashMap();

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_SETTING_UI
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_SETTING_UI:
                    let settingUI: any = null;
                    if (this.settingUIMap.contains("setting" + data)) {
                        settingUI = this.settingUIMap.get("setting" + data);
                    } else {
                        settingUI = new NSettingUI(data);
                        this.settingUIMap.put("setting" + data, settingUI);
                    }
                    this.settingUI = settingUI;
                    this.settingUI.udpateStatus();
                    PopUpManager.addPopUp(this.settingUI, true, 0, 0, 1);
                    break;
            }
        }
    }
}