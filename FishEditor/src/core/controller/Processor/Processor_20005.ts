/**
  * 修改头像
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPUpateHeadRet", data);
            UserService.instance.updateHeadNum(result);
            game.AppFacade.getInstance().sendNotification(ResponseModify.SUCCESS_CHANGEHEADICON_RESPONSE , result);
            console.log("Processor_20005>>>>>>>>>>>>>>");
        }
    }
}
