/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_170006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_170006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_170006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TgpdRequest.getReceiveData("OPCandyRewardPoolPush", data);
            game.tgpd.CandyData.instance.grand = result.grand / 1000;
            game.tgpd.CandyData.instance.major = result.major / 1000;
            game.tgpd.CandyData.instance.minor = result.minor / 1000;
            game.tgpd.CandyData.instance.mini = result.mini / 1000;
            game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_CANDY_REWARD_POOL);
            // console.log("OPCandyRewardPoolPush ", result);                        
        }
    }
}
