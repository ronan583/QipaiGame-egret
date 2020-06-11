/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_140004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_140004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_140004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BjlRequest.getReceiveData("OPPushBaccaraBattleStatus", data);
            AppFacade.instance.sendNotification(CommonDataNotify.BJL_BATTLE_STATUS , result);
        }
    }
}
