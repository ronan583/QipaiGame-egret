/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_140002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_140002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_140002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BjlRequest.getReceiveData("OPBaccaraStakeRet", data);
            result.value = result.value / 1000;
            AppFacade.instance.sendNotification(CommonDataNotify.BJL_STAKE_RET , result);
        }
    }
}
