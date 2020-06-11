/**
  * 申请上庄推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FqzsRequest.getReceiveData("OpBirAndBeaUpBankerRet", data);
            for (let scoreData of result.bankerInfos) {
                scoreData.totalMoney = scoreData.totalMoney / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.FQZS_UPBANKER, result);
        }
    }
}
