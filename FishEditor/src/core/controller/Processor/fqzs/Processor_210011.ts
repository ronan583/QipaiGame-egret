/**
  * 续投推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210011 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210011";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210011", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            // var result: any = FqzsRequest.getReceiveData("OPPushLhuBattleStatus", data);
            // AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_PUSH_BATTLESTATUS, result);
        }
    }
}
