/**
  * 离开房间
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = RoomRequest.getReceiveData("OPExitRoomRet", data);
            
            CommonUtil.leaveGame();
            // AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
            // GameLayerManager.gameLayer().panelLayer.removeChildren();
        }
    }
}
