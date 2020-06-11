/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30010", this);
        }

        public execute(notification: puremvc.INotification): void {
            let data: any = notification.getBody();//携带数据
            let result: any = RoomRequest.getReceiveData("OPRoomBankerListRet", data);
            for(let bankerInfo of result.bankerInfos) {
                bankerInfo.money = bankerInfo.money / 1000;
                bankerInfo.cosMoney = bankerInfo.cosMoney / 1000;
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_BANKERLIST_DATA, result);
        }
    }
}
