/**
  * 玩家基本信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_10004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_10004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_10004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据

            //创建user_login_class
            var result: any = ErrorRequest.getReceiveData("OPMoneyErrorInfo", data);
            console.log('result ======= ',result);
            if(RoomUI.curActiveRoomUI == null && GameLayerManager.gameLayer().findGameScenes().length == 0) return;
            if (result.gameIn) {
                let money = (result.money / 1000).toFixed(0);
                NoMoneyTipsUI2.showTips({
                    "text": "最小需要" + money + "元才能继续，是否立即充值",
                    "callback": () => {
                        game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
                    },
                    "callbackObject": this,
                    "cancelCallback": () => {
                        if(game.RoomManager.getInstance().curRoomData && game.RoomManager.getInstance().curRoomData.gameLevel >= 0) {
                            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.RoomManager.getInstance().curRoomData.gameType);
                        } else {
                            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_WITHDRAW_PANEL);
                        }
                    },
                    "okBitmapLabelPath": "bt_charge_now_png",
                    "tipsType": TipsType.OnlyOk,
                    "effectType": 0,
                    "forceCloseExitGame":true
                })
            } else {
                TipsUtils.moneyTipsRoom(this, (result.money / 1000).toFixed(0));
            }
            game.AppFacade.getInstance().sendNotification(PanelNotify.MOENY_NOT_ENOUGH);
        }
    }
}
