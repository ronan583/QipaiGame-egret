/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20014 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20014";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20014", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPSetUpBankRet", data);
            if (result.type == 1) {
                TipsUtils.showTipsFromCenter("支付宝绑定成功!");
                UserService.instance.bindingAlipay = data.account;
            } else if (result.type == 2) {
                TipsUtils.showTipsFromCenter("银行卡绑定成功!");
                 UserService.instance.bindingBank = data.account;
            }
            //设置数据
            console.log("Processor_20014")
            // AppFacade.instance.sendNotification(ResponseModify.SUCCESS_SETUPBANK_RESPONSE, result);
        }
    }
}
