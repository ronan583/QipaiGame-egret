/**
  * 修改昵称
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20008 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20008";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20008", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("PushOffline", data);
            if(result.status == 2) {
                // 有人顶出来
                Global.isKickFromServer = true;
                SocketManager.socketClose();
                TipsUI.showTips({
                    "text":"你的账号已经在别处登录",
                    "callback":this.onConfirm,
                    "callbackObject":this,
                    "okBitmapLabelPath":"bt_charge_now_png",
                    "tipsType":TipsType.OnlyOk,
                    "effectType":0
                })
            }
        }

        private onConfirm():void {
            GameLayerManager.gameLayer().panelLayer.removeChildren();
            game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_HALL);
            if(Global.isNative) {
                game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_CHANGE_LOGIN);
            } else {
                game.AppFacade.getInstance().sendNotification(SceneNotify.TEMP_OPEN_LOGIN);
            }
        }
    }
}
