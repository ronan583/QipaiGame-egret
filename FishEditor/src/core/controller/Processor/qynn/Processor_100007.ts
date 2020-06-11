/**
  * 开始发牌
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100007 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100007";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100007", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobDealCard", data);
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_DEALCARD , result);
 
        }
    }
}
