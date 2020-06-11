140009/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_140009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_140009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_140009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BjlRequest.getReceiveData("OpBaccaraUpBankerRet", data);
            AppFacade.instance.sendNotification(PanelNotify.OPEN_BJL_APPLY_BANKER , result);

        }
    }
}
