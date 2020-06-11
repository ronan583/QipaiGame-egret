/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = RoomRequest.getReceiveData("OPSeeHeadRet", data);
            result.money = result.money / 1000;
            // AppFacade.getInstance().sendNotification(PanelNotify.SHOW_PLAYER_INFO_PANEL);  
            // PlayerInfoPanel.Instance.showPlayer(result);
        }
    }
}
