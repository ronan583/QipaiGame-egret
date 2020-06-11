/**
  * 开始(结束)游戏推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FqzsRequest.getReceiveData("PushBirAndBeaBattleFinsh", data);
            result.otherCosMoney = result.otherCosMoney / 1000;
            for (let scoreData of result.battleInfo) {
                scoreData.money = scoreData.money / 1000;
                scoreData.totalMoney = scoreData.totalMoney / 1000;
            }
            for (let scoreData of result.rankInfo) {
                scoreData.money = scoreData.money / 1000;
                scoreData.totalMoney = scoreData.totalMoney / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.FQZS_BATTLEFINSH, result);
        }
    }
}
