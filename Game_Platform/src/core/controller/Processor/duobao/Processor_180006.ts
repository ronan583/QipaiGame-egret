/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_180006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_180006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_180006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DuobaoRequest.getReceiveData("OPTreasureRewardPoolPush", data);
            game.duobao.DuobaoData.instance.rewardPool = result.rewardPoolMoney / 1000;
            game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_DUOBAO_REWARD_POOL);
        }
    }
}
