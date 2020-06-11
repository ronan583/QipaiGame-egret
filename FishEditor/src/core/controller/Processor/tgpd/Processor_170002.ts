/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_170002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_170002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_170002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TgpdRequest.getReceiveData("OPCandyStakeRet", data);
            game.tgpd.CandyData.instance.betValue = result.money;
            AppFacade.instance.sendNotification(CommonDataNotify.TGPD_SET_STAKE , result);
        }
    }
}
