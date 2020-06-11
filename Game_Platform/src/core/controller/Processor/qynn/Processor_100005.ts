/**
  * 看牌
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobLookCardRet", data);
            console.log("OPRobLookCardRet------- ", result);
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_LOOKCARD , result);
 
        }
    }
}
