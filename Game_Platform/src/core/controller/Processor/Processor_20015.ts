/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20015 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20015";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20015", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPExchangeRecordRet", data);
            for(let info of result.recordInfoInfo) {
                info.money = info.money / 1000;
            }
            console.log("Processor_20015");
            AppFacade.instance.sendNotification(ResponseModify.RQEUEST_EXCHANGERECODE_RESPONSE, result);
            NetLoading.hideLoading();
        }
    }
}
