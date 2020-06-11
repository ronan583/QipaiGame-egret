/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_50005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_50005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_50005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = PDKRequest.getReceiveData("OPPdkPushBomb", data);
            if(!game.pdk.PDKBattleData.getInstance().hasBattleStart()) return;
            game.pdk.PDKBattleData.getInstance().setBombScore(result);
            for(let scoreData of result.playerBomb) {
                scoreData.money = scoreData.money / 1000;
                scoreData.totalMoney = scoreData.totalMoney / 1000;
            }
            AppFacade.getInstance().sendNotification(PanelNotify.PDK_BOMB_SCORE, result);
        }
    }
}
