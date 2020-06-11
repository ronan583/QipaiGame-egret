/**
  * 申请下庄推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210010", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FqzsRequest.getReceiveData("OpBirAndBeaDownBankerRet", data);
            for (let scoreData of result.bankerInfos) {
                scoreData.totalMoney = scoreData.totalMoney / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.FQZS_DOWNBANKER, result);
        }
    }
}
