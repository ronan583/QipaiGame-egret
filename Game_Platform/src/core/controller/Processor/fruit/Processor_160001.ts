/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsSetMoneyRet", data);
            if(!ModuleLoader.getInstance().IsResLoaded(game.ChildGameType.FRUIT)){
                return;
            }
            game.sgj.FruitData.instance.bottomBet = Number(result.money);
            AppFacade.instance.sendNotification(PanelNotify.FRUIT_REFRESH_BET_MONEY);
        }
    }
}
