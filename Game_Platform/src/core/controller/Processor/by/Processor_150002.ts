/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpFishesBattleStepRet", data);
            game.by.BYData.instance.setShootData(decodeData);
            game.AppFacade.getInstance().sendNotification(PanelNotify.BY_SHOOT, decodeData);
        }
    }
}
