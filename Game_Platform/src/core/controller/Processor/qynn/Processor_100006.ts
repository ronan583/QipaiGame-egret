/**
  * 结算
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPRobNiuBattleFinishRet", data);
            for(let info of result.totalInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_BATTLEFINNISH , result);
 
        }
    }
}
