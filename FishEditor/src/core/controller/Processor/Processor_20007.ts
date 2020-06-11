/**
  * 修改昵称
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20007 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20007";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20007", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPPasswordRet", data);
            UserService.instance.updatePassword(result);
            this.facade.sendNotification(ResponseModify.SUCCESS_RESETPASSWORD_RESPONSE, 2);
            console.log("Processor_20007>>>>>>>>>>>>>>");
        }
    }
}
