/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_190004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_190004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_190004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TbRequest.getReceiveData("OPDiceBaoPlayerRankRet", data);
            for(var i = 0 ; i < result.rankInfo.length ; i++)
            {
                result.rankInfo[i].money = result.rankInfo[i].money / 1000;
                result.rankInfo[i].stake = result.rankInfo[i].stake / 1000;
                
            }
            AppFacade.instance.sendNotification(CommonDataNotify.TB_PLAYERRANK , result);
        }
    }
}
