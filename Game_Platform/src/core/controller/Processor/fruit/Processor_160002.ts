/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsStartGameRet", data);
            var gameResult:game.sgj.FruitGameResult = new game.sgj.FruitGameResult();
            gameResult.setData(result);
            game.sgj.FruitData.instance.isReward = gameResult.addMoney > 0;
            game.sgj.FruitData.instance.winMoney = result.winMoney / 1000;
            egret.log("game.sgj.FruitData.instance " + result.winMoney / 1000);
            AppFacade.instance.sendNotification(PanelNotify.FRUIT_GAME_RESULT, gameResult);
        }
    }
}