/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_90005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_90005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_90005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BrnnRequest.getReceiveData("OPPushBrenStartGame", data);
            for(let info of result.battleInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
                for(let playerStake of info.playerStake)
                {
                    playerStake.value /= 1000;
                }
                // info.playerStake.value = info.playerStake.value / 1000;
                // info.playerStake.totalMoney = info.playerStake.totalMoney / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.BRNN_STARTGAME , result);
            
        }
    }
}
