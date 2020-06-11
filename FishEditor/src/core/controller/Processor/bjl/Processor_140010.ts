/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_140010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_140010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_140010", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BjlRequest.getReceiveData("OpBaccaraDownBankerRet", data);
            AppFacade.instance.sendNotification(PanelNotify.OPEN_BJL_DOWN_BANKER , result);

        }
    }
}
