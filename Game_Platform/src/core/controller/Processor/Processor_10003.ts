/**
  * 玩家基本信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_10003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_10003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_10003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据

            //创建user_login_class
            var result: any = UserRequest.getReceiveData("OPPushBroadcast", data);
            // UserService.instance.updatePlayerInfo();
            if(result.type == 1) {
                AppFacade.getInstance().sendNotification(CommonDataNotify.PUSH_BROADCAST,result);
            } else {
                egret.log(result.content + "    " + result.count);
                AbundantScrollerText.showNotice(result.content, result.count);
            }
        }
    }
}
