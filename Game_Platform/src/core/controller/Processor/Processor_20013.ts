/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20013 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20013";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20013", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPRankingRet", data);
            console.log("Processor_20013")
            AppFacade.instance.sendNotification(ResponseModify.REQUEST_RANKING_RESPONSE, result);

		    // game.AppFacade.instance.sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
        }
    }
}
