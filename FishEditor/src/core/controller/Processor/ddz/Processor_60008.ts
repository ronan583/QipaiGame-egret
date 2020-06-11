/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60008 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60008";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60008", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OPDdzMultipleDetailRet", data);
            game.ddz.DDZBattleData.getInstance().setMultiData(result);
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_MULTI_DETAIL);
        }
    }
}
