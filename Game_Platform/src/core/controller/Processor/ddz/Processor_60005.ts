/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_60005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_60005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_60005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DDZRequest.getReceiveData("OpDdzBattleStepRet", data);
            if(!game.ddz.DDZBattleData.getInstance().hasData()) {
                return;
            }
            game.ddz.DDZBattleData.getInstance().setPlayStepData(result);
            let refreshOnOthersPlay = false;
            if(result.cards.length > 0) {
                if(result.currentPlayerId == UserService.instance.playerId) {
                    AppFacade.getInstance().sendNotification(PanelNotify.SELF_PLAY_CARDS);
                } else {
                    AppFacade.getInstance().sendNotification(PanelNotify.REMOVE_PLAY_CARDS);
                    // AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TABLE_CARDS);
                    // 为了操作的细腻 这里重新制作
                    AppFacade.getInstance().sendNotification(PanelNotify.DDZ_OTHERS_PLAY);
                    refreshOnOthersPlay = true;
                }
            }
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_CLEAR_SCORE_OR_MULTI_SHOW);
            if(!refreshOnOthersPlay) {
                AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_FIGHT);
            }
            AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_MULTI);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_LEFT_CARDS, data.currentPlayerId);
        }
    }
}
