/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_190006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_190006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_190006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TbRequest.getReceiveData("OpDiceBaoFirstRoomPush", data);
            for(let info of result.battleInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
                for(let stake of info.playerStake)
                    stake.value = stake.value / 1000;
            }
            for(let info of result.totalStake) {
                info.value = info.value / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.TB_FIRST_ENTERROOM , result);
        }
    }
}
