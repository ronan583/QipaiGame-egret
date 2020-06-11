/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_130006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_130006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_130006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = HhdzRequest.getReceiveData("OpRedBlackFirstRoomPush", data);
            for(let info of result.battleInfo) {
                info.playerId = Number(info.playerId);
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
                for(let playStake of info.playerStake)
                {
                    playStake.value = playStake.value / 1000;
                }
            }
            for(let info of result.totalStake) {
                info.value = info.value / 1000;
            }

            AppFacade.instance.sendNotification(CommonDataNotify.HHDZ_FIRST_ENTERROOM , result);

        }
    }
}
