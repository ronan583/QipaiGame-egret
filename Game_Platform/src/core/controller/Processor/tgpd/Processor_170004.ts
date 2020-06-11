/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_170004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_170004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_170004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TgpdRequest.getReceiveData("OPCandyStartGameRet", data);
            result.totalMoney = result.totalMoney / 1000;
            result.rewardPoolPush.grand = result.rewardPoolPush.grand / 1000;
            result.rewardPoolPush.major = result.rewardPoolPush.major / 1000;
            result.rewardPoolPush.minor = result.rewardPoolPush.minor / 1000;
            result.rewardPoolPush.mini = result.rewardPoolPush.mini / 1000;
            result.winMoney = result.winMoney / 1000;
            for(var eliminateInfo of result.eliminateInfos)
            {
                eliminateInfo.money = eliminateInfo.money / 1000;
            }
            console.warn("------------", result);
            game.tgpd.CandyData.instance.setData(result);
            AppFacade.instance.sendNotification(CommonDataNotify.TGPD_START_GAME);
        }
    }
}
