/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_90002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_90002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_90002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BrnnRequest.getReceiveData("OPBrenStakeRet", data);
            result.value = result.value / 1000;
            result.totalValue = result.totalValue / 1000;
            AppFacade.instance.sendNotification(CommonDataNotify.BRNN_BRENSTAKE_RET , result);
        }
    }
}
