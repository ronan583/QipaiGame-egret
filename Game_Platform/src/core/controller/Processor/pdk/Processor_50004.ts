/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_50004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_50004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_50004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = PDKRequest.getReceiveData("OpPdkReconnect", data);
            game.pdk.PDKBattleData.getInstance().setReconnectData(result);
            AppFacade.getInstance().sendNotification(PanelNotify.PDK_REFRESH_ON_RECONNECT);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_LEFT_CARDS);
        }
    }
}
