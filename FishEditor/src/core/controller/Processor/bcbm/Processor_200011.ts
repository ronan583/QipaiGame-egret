/**
  * 续投推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_200011 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200011";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200011", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            // var result: any = LhdzRequest.getReceiveData("OPPushLhuBattleStatus", data);
            // AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_PUSH_BATTLESTATUS, result);
        }
    }
}
