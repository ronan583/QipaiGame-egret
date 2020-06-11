/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpFishesCreatePush", data);
            for(let d of decodeData.fishesInfo) {
                var addFish:game.by.FishInfo = game.by.BYData.instance.addFishInfo(d);
                game.AppFacade.getInstance().sendNotification(PanelNotify.CREATE_SINGLE_FISH, addFish);
            }
        }
    }
}
