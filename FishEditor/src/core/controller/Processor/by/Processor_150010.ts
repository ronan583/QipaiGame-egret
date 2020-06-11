/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150010", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpChangeCannonRet",data);
            game.by.BYData.instance.getPlayerInfo(decodeData.playerId).canonIndex = Number(decodeData.cannonId);
            game.AppFacade.getInstance().sendNotification(PanelNotify.SWITCH_CANON, decodeData);
        }
    }
}
