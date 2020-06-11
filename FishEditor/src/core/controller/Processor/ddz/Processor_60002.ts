/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OPDdzCallScoreRet", data);
            if(!game.ddz.DDZBattleData.getInstance().hasData()) {
                return;
            }
            game.ddz.DDZBattleData.getInstance().setCallScore(result);
            game.ddz.DDZSoundPlayer.instance.playVoice(result.currentPlayerId, game.ddz.DDZVoiceType.RATE, result.score)
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_CALLSCORE);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TIPS_ON_SCORE, {playerId:result.currentPlayerId, score:result.score});
            if(game.ddz.DDZBattleData.getInstance().landlordId == UserService.instance.playerId) {
                AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_HAND_CARDS, true);
            }
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_MULTI);
        }
    }
}
