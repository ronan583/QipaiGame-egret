/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_130005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_130005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_130005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = HhdzRequest.getReceiveData("OPPushRedBlackStartGame", data);
            for(let info of result.battleInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
                for(var i = 0 ; i < info.playerStake.length ; i++)
                {
                    info.playerStake[i].value = info.playerStake[i].value / 1000;
                }
            }
            AppFacade.instance.sendNotification(CommonDataNotify.HHDZ_SHOWCARD , result);
        }
    }
}
