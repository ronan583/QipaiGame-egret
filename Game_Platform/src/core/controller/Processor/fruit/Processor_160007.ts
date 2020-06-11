/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160007 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160007";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160007", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsRoomInfoRet", data);
            game.sgj.FruitData.instance.lineValue = result.lineCount;
            game.sgj.FruitData.instance.poolMoney = Number(result.poolMoney);
            game.sgj.FruitData.instance.bottomBet = Number(result.money);
            game.sgj.FruitData.instance.winMoney = Number(result.winMoney / 1000);
            egret.log("game.sgj.FruitData.instance " + result.winMoney / 1000);
            game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_FRUIT_ROOM_INFO);
        }
    }
}
