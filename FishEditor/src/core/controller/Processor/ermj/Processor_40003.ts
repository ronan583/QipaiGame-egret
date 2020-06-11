/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_40003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_40003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_40003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ErmjRequest.getReceiveData("OPMahjongFinishRet", data);
            result.winMoney = result.winMoney/1000;
            AppFacade.instance.sendNotification(CommonDataNotify.ERMJ_FINISH_BATTLE , result);
        }
    }
}
