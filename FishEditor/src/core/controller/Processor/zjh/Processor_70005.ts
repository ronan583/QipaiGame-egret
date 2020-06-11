/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPAlwaysSetRet", data);
            console.warn("-----------------Processor_70005 OPAlwaysSetRet ", result);
            if(!game.zjh.ZJHData.getInstance().hasStart()) {
                return;
            }
            var zdata:game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            var zjhPlayer:game.zjh.ZJHPlayer = zdata.getPlayerById(game.UserService.instance.playerId);
            zjhPlayer.isAlways = result.vaule;

            // AppFacade.getInstance().sendNotification(CommonDataNotify.UPDATE_ZJH_BATTLE_INFO);
            AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_ZJH_OPERATION);
        }
    }
}
