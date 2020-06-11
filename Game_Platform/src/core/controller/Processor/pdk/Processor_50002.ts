/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_50002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_50002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_50002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = PDKRequest.getReceiveData("OpPdkBattleStepRet", data);
            if(!game.pdk.PDKBattleData.getInstance().hasBattleStart()) return;
            game.pdk.PDKBattleData.getInstance().setPlayStepData(result);
            let refreshOnOthersPlay = false;
            if(result.cards.length > 0) {
                if(result.currentPlayerId == UserService.instance.playerId) {
                    AppFacade.getInstance().sendNotification(PanelNotify.PDK_SELF_PLAY_CARDS);
                } else {
                    AppFacade.getInstance().sendNotification(PanelNotify.REMOVE_PLAY_CARDS);
                    // AppFacade.getInstance().sendNotification(PanelNotify.SHOW_TABLE_CARDS);
                    AppFacade.getInstance().sendNotification(PanelNotify.PDK_OTHERS_PLAY);
                    refreshOnOthersPlay = true;
                }
            }
            if(!refreshOnOthersPlay) {
                AppFacade.getInstance().sendNotification(PanelNotify.DDZ_REFRESH_ON_FIGHT);
            }
            AppFacade.getInstance().sendNotification(PanelNotify.PDK_REFRESH_ON_FIGHT);
            AppFacade.getInstance().sendNotification(PanelNotify.SHOW_LEFT_CARDS, data.currentPlayerId);
        }
    }
}
