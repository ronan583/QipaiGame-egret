/**
  * 注册
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPRegisterAccountRet", data);
            UserService.instance.setRegistAccount(result);
             CommonUtil.noticeMsg("恭喜您注册成功！");
            game.AppFacade.getInstance().sendNotification(ResponseModify.SUCCESS_REG_RESPONSE);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_REGISTER_PANEL);
        }
    }
}
