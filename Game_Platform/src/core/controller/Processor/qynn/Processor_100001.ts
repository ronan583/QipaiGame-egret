/**
  * 抢庄返回
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobBankerRet", data);
            console.log("OPRobBankerRet------- ", result);
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_ROBBANKER_RET , result);
        }
    }
}
