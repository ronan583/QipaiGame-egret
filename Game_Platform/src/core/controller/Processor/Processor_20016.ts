/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20016 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20016";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20016", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPExchangeRet", data);
            console.log("Processor_20016")
            AppFacade.instance.sendNotification(ResponseModify.SUCCESS_EXCHANGE_RESPONSE, result);
            
        }
    }
}
