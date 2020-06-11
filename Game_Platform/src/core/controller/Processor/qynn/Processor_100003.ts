/**
  * 压注
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobStakeRet", data);
            console.log("OPRobStakeRet------- ", result);
            // result.bets = result.bets / 1000;
            
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_ROBSTAKE_RET, result);
        }
    }
}
