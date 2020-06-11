/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_50001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_50001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_50001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = PDKRequest.getReceiveData("OPPdkBattleStart", data);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLEAR_PDK_BATTLE_UI);
            let isChange = game.pdk.PDKBattleData.getInstance().setBattleStart(result);
            AppFacade.getInstance().sendNotification(PanelNotify.PDK_REFRESH_ON_START, isChange);
        }
    }
}
