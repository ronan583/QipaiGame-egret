/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60001", this);
        }

        public execute(notification: puremvc.INotification): void {
            if(!RoomManager.getInstance().curRoomData) return;
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OPDdzStartGame", data);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLEAR_DDZ_BATTLE_UI);
            RoomManager.getInstance().curRoomData.status = GameStatus.RUNNING;
            game.ddz.DDZBattleData.getInstance().setBattleStart(result);
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_START);
        }
    }
}
