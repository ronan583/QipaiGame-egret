/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_170003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_170003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_170003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TgpdRequest.getReceiveData("OPCandyLineRet", data);
            game.tgpd.CandyData.instance.lineValue = result.value;
            AppFacade.instance.sendNotification(CommonDataNotify.TGPD_SET_LINE , result);
        }
    }
}
