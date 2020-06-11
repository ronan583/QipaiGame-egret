/**
  * OPRobPushBanker
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobPushBanker", data);
            console.log("OPRobPushBanker------- ", result);
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_PUSHBANKER , result);
        }
    }
}
