/**
  * 客服
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20018 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20018";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20018", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPGameBankMoneyPush", data);
            for(let gamescene of GameLayerManager.gameLayer().findGameScenes()) {
                if(gamescene.stage) gamescene.handleBankDrawMoney(result.money / 1000, result.totalMoney / 1000);
            }
        }
    }
}
