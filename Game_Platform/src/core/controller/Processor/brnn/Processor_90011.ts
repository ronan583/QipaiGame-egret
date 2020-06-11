/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_90011 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_90011";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_90011", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BrnnRequest.getReceiveData("OPBrenListRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.BRNN_LIST_ROOM , result);
        }
    }
}
