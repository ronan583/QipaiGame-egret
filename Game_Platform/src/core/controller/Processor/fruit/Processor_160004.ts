/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsPoolMoneyPush", data);
            result.moneyInfo.poolMoney = result.moneyInfo.poolMoney / 1000;
            AppFacade.instance.sendNotification(PanelNotify.REFRESH_FRUIT_POOL_IN_ROOM, result);
        }
    }
}
