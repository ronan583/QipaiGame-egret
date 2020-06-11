/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            game.by.BYData.instance.setData(BYRequest.getReceiveData("OpFishesEnterRoom", data));
            game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_BY_PLAYERS);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CREATE_FISHS);
        }
    }
}
