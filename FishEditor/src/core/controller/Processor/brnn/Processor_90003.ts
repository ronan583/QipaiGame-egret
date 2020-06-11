/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_90003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_90003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_90003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BrnnRequest.getReceiveData("OpBrenUpBankerRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.BRNN_APPLY_BANKER_RET , result);
        }
    }
}
