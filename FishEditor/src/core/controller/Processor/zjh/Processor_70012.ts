/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70012 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70012";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70012", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("PushThreeReadyMsg", data);
            AppFacade.instance.sendNotification(CommonDataNotify.ZJH_PUSHREADY, result);            
        }
    }
}
