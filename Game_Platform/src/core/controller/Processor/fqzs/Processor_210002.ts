/**
  * 下注推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_210002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_210002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_210002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FqzsRequest.getReceiveData("OPBirAndBeaStakeRet", data);
            result.value = result.value / 1000;
            result.totalValue = result.totalValue / 1000;
            DeliverNetWorker.instance.addNet(CommonDataNotify.FQZS_STAKE_RET , result)
        }
    }
}
