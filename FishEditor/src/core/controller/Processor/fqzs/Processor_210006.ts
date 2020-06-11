/**
  * 首次进入房间推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FqzsRequest.getReceiveData("OpBirAndBeaFirstRoomPush", data);
            for (let scoreData of result.roomStakeInfo) {
                scoreData.value = scoreData.value / 1000;
            }
            for (let scoreData of result.myStakeInfo) {
                scoreData.value = scoreData.value / 1000;
            }
            result.upBankerMinMoney = result.upBankerMinMoney / 1000;
            result.totalStake = result.totalStake / 1000;
            if (result.BattleFinsh != null) {
                result.BattleFinsh.otherCosMoney = result.BattleFinsh.otherCosMoney / 1000;
                for (let scoreData of result.BattleFinsh.battleInfo) {
                    scoreData.totalMoney = scoreData.totalMoney / 1000;
                    scoreData.money = scoreData.money / 1000;
                }
            }
            AppFacade.instance.sendNotification(CommonDataNotify.FQZS_FIRST_ENTERROOM, result);
        }
    }
}
