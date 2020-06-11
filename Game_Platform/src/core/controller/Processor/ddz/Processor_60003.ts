/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OPDdzDoubleRet", data);
            if(!game.ddz.DDZBattleData.getInstance().hasData()) {
                return;
            }
            game.ddz.DDZBattleData.getInstance().setJiabei(result);
            game.ddz.DDZSoundPlayer.instance.playVoice(result.currentPlayerId, game.ddz.DDZVoiceType.DOUBLE, result.multiple);
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_MULTI);
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_FIGHT);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TIPS_ON_MULTI, {playerId:result.currentPlayerId, multi:result.multiple});
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_MULTI);
            
        }
    }
}
