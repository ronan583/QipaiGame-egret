/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_190009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_190009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_190009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TbRequest.getReceiveData("OpDiceBaoUpBankerRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.TB_UP_BANKER , result);
        }
    }
}
