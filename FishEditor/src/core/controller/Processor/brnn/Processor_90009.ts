/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_90009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_90009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_90009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BrnnRequest.getReceiveData("OpBrenFirstRoomPush", data);
            for(let battleInfo of result.battleInfo) {
                battleInfo.money = battleInfo.money / 1000;
                battleInfo.totalMoney = battleInfo.totalMoney / 1000;
                for(let stake of battleInfo.playerStake){
                    stake.value = stake.value / 1000;
                }
            }
            for(let stake of result.totalStake) {
                stake.value = stake.value / 1000;
            }

                
            AppFacade.instance.sendNotification(CommonDataNotify.BRNN_FIRST_ENTERROOM , result);
        }
    }
}
