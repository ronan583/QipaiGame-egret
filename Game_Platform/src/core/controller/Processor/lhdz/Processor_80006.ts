/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_80006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_80006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_80006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = LhdzRequest.getReceiveData("OpLhuFirstRoomPush", data);
            for (let info of result.stakeInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
                for (let stake of info.playerStake) {
                    stake.value = stake.value / 1000;
                }
            }
            result.upBankerMinMoney = result.upBankerMinMoney / 1000;
            for (let stake of result.totalStake) {
                stake.value = stake.value / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_FIRST_ENTERROOM, result);
        }
    }
}
