/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = RoomRequest.getReceiveData("OPExistRoomInPush", data);
            let gameName:string = GameConst.getGameName(result.gameType);
            TipsUI.showTips({
                "text": "您当前正在参与"+gameName+"，无法进入其他房间，是否回到正在参与的游戏中？",
                "callback": () => {
                    QuickStart.instance.helpToEnterGame(result.gameType, result.gameLevel)
                },
                "callbackObject": this,
                "okBitmapLabelPath": "bt_charge_now_png",
                "tipsType": TipsType.OkAndCancel,
                "effectType": 0
            })
        }
    }
}
