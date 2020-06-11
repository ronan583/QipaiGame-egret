/**
  * 修改昵称
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPUpateNickNameRet", data);
            UserService.instance.updateNikename(result);
            this.facade.sendNotification(ResponseModify.SUCCESS_RESETNAME_RESPONSE);
            console.log("Processor_20006>>>>>>>>>>>>>>");
        }
    }
}
