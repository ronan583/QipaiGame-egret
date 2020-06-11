/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150011 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150011";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150011", this);
        }

        public execute(notification: puremvc.INotification): void {
            let data: any = notification.getBody();//携带数据
            let decodeData:any = BYRequest.getReceiveData("PushFishTide",data);
            let arr:Array<game.by.FishTideInfo> = []
            for(let tideInfo of decodeData.fishTideInfos) {
                let fishTideInfo = new game.by.FishTideInfo();
                arr.push(fishTideInfo);
                fishTideInfo.setData(tideInfo, decodeData.fishTideTime)
            }

            AppFacade.getInstance().sendNotification(PanelNotify.CREATE_FISH_TIDE, arr);
        }
    }
}
