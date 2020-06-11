/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70011 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70011";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70011", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPStartGame", data);
            console.error("--------------OPStartGame ", result);
            game.zjh.ZJHData.getInstance().setData(result);
            // 如果正常回复跳转到battle场景
            AppFacade.getInstance().sendNotification(CommonDataNotify.UPDATE_ZJH_BATTLE_INFO_RESTART);
            for(let player of game.zjh.ZJHData.getInstance().zjhPlayers) {
                if(player.status == 2) {
                    let tipsData:any = {"playerId":player.playerId, "status": game.zjh.ZJHPlayerStatus.KANPAI};
                    AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_TIPS, tipsData);
                }
            }
        }
    }
}
