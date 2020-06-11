/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsRoomPoolMoneyRet", data);
            var moneyArr:Array<number> = [];
            for(let mi of result.moneyInfo) {
                moneyArr.push(mi.poolMoney / 1000);
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_FRUIT_POOL, moneyArr);
        }
    }
}
