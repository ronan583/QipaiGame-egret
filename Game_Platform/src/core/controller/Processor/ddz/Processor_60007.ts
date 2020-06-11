/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60007 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60007";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60007", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OpDdzReconnect", data);
            game.ddz.DDZBattleData.getInstance().setReconnectData(result);
            console.log("====================== data.isTrusteeship  " + result.isTrusteeship)
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_RECONNECT);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_LEFT_CARDS);
        }
    }
}
