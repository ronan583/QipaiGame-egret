/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = RoomRequest.getReceiveData("OPTrusteeshipRet", data);
            if(RoomManager.getInstance().curRoomData.gameType == ChildGameType.DDZ) {
                let playerIcon:game.ddz.DDZPlayerInfo =game.ddz.DDZBattleData.getInstance().getPlayer(UserService.instance.playerId);
                if(playerIcon) playerIcon.isTrusteeship = RoomRequest.isTrusteeship;
            }
            if(RoomManager.getInstance().curRoomData.gameType == ChildGameType.PDK) {
                let playerIcon:game.pdk.PDKPlayerInfo =game.pdk.PDKBattleData.getInstance().getPlayer(UserService.instance.playerId);
                if(playerIcon) playerIcon.isTrusteeship = RoomRequest.isTrusteeship;
            }
            AppFacade.getInstance().sendNotification(PanelNotify.CHANGE_TRUSTEESHIP_STATE, UserService.instance.playerId);  
            
        }
    }
}
