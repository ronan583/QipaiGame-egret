/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_130007 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_130007";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_130007", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = HhdzRequest.getReceiveData("OPRedBlackSingleRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.HHDZ_SINGLE_ROOM , result);
        }
    }
}
