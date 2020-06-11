/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpFishesShootInfoRet", data);
            var playerInfo:game.by.BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(decodeData.playerId);
            playerInfo.shootInfo.shootType = decodeData.curShootType;
            playerInfo.shootInfo.lockTargetFishId = decodeData.curLockTargetFishId;
            playerInfo.shootInfo.autoShootTargetX = decodeData.curShootTargetX;
            playerInfo.shootInfo.autoShootTargetY = decodeData.curShootTargetY;

            if(playerInfo.playerId==game.UserService.instance.playerId) {
                game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_SHOOT_TYPE);
            }
        }
    }
}
