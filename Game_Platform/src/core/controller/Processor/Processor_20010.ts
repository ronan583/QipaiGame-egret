/**
  * 公告列表
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20010", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPNoticeListRet", data);
            AppFacade.instance.sendNotification(PanelNotify.OPEN_NOTICE, result);
        }
    }
}
