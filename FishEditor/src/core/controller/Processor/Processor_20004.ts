/**
  * 获取验证码
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPGetCodeRet", data);
            game.AppFacade.getInstance().sendNotification(ResponseModify.OPEN_CODE_TIPS_INFO, result.result);
        }
    }
}
