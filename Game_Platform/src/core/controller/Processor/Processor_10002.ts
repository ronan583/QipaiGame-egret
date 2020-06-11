/**
  * 玩家基本信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_10002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_10002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_10002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据

            //创建user_login_class
            var result: any = UserRequest.getReceiveData("OPSynchPlayerInfo", data);
            UserService.instance.syncPlayerInfo(result);
            AppFacade.getInstance().sendNotification(CommonDataNotify.SYNCH_PLAYER_INFO);
            if(RoomTop.curRoomTop) {
                RoomTop.curRoomTop.refresh();
            }
            let list = GameLayerManager.gameLayer().findRoomUIs();
            for(let roomui of list) {
                roomui.refreshPlayerInfo();
            }
        }
    }
}
