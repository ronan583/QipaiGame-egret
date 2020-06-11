/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_10001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_10001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_10001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ErrorRequest.getReceiveData("OPErrorInfo", data);
            var txt = LangManager.instance.getText("@" + result.errorId);
            console.error("errorId is " + result.errorId + "// errorMsg is " + result.errorMsg + "// channel is " + result.channelId);
            if (txt != "") {
                TipsUtils.showTipsFromCenter(txt);
            }

            if (result.errorId == -999) {
                var deviceId: string = NativeApi.getLocalData("user_login_deviceid");
                if (Global.isNative) {
                    var account: string = NativeApi.getLocalData("user_login_account");
                    var pwd: string = NativeApi.getLocalData("user_login_password");
                    if (account != null && pwd != null && pwd !== "" && account !== "") {
                        UserRequest.sendAccountLogin(account, pwd, deviceId, Global.os, Global.platform);
                    } else {
                        UserRequest.sendGuestLogin(deviceId, Global.os, Global.platform);
                    }
                } else {
                    if (deviceId == null || deviceId === "") {
                        game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_LOGIN);
                    } else {
                        UserRequest.sendGuestLogin(deviceId, Global.os, Global.platform);
                    }
                    game.NetConnectionUI.hide();
                }
            }

            if (result.errorId == -1013) {
                TipsUI.showTips({
                    "text": "携带金额大于房间限制",
                    "callback": this.nothing,
                    "callbackObject": this,
                    "okBitmapLabelPath": "btn_charge_quick",
                    "tipsType": TipsType.OnlyOk,
                    "effectType": 0
                })
            }

            if(result.errorId == -1007) {
                game.AppFacade.getInstance().sendNotification(PanelNotify.CARD_SEND_RULE_ERROR);
            }
        }
        private nothing(): void {

        }
    }
}
