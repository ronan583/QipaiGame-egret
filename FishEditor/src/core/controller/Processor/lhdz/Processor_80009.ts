module game {

    export class Processor_80009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_80009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_80009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = LhdzRequest.getReceiveData("OpLhuUpBankerRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_UP_BANKER , result);

        }
    }
}
