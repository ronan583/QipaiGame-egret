/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20012 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20012";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20012", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPCustomerServiceRet", data);
            AppFacade.instance.sendNotification(PanelNotify.CLOSE_NOTICE);
            TipsUI.showTips({
                "text": "您的问题已提交。客服会在5分钟内处理并在游戏公告里回复您，请您注意查收。",
                "callback": this.showCharge,
                "callbackObject": this,
                "tipsType": TipsType.OnlyOk
            })
        }

        public showCharge(): void {
        }
    }
}
