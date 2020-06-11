/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPLookCardRet", data);
            console.error("--------------OPLookCardRet ", result);
            var zdata:game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            if(!zdata.hasStart()) {
                return;
            }
            var zjhPlayer:game.zjh.ZJHPlayer = zdata.getPlayerById(UserService.instance.playerId);
            zjhPlayer.addCard(result.card);
            zjhPlayer.cardType = result.cardType;
            zjhPlayer.isLook = true;
            AppFacade.getInstance().sendNotification(CommonDataNotify.ZJH_LOOK_CARDS);
            game.zjh.ZJHSoundPlayer.instance.playSound(game.UserService.instance.playerId, zjh.ZJHSoundType.SEE);
        }
    }
}
