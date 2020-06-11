module game {

    export class Processor_80010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_80010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_80010", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = LhdzRequest.getReceiveData("OpLhuDownBankerRet", data);
            AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_DOWN_BANKER , result);

        }
    }
}
