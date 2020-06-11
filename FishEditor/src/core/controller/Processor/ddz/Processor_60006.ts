/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OpDdzBattleFinish", data);
            if(!game.ddz.DDZBattleData.getInstance().hasData()) {
                return;
            }
            game.ddz.DDZBattleData.getInstance().setFinishData(result);
            RoomManager.getInstance().curRoomData.status = GameStatus.PREPARE;
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_BATTLE_END);
        }
    }
}
