/**
  * 申请上庄推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    //     //上庄
    // message OpBenzBmwUpBanker{
    //     required int32 version = 1;  //1普通 2抢庄
    // }
    //  message OpBenzBmwUpBankerRet{
    // 	    repeated OPBenzBmwBankerInfo bankerInfos = 1;//集合里面有多少人就有多少人在等待上庄
    //  }
//     message OPBenzBmwBankerInfo{
// 	optional int32 bankerNum = 1[default = 0];//连庄回合
// 	required OPBenzBmwPlayerInfo playerInfo = 2;//需要玩家的头像，地址，和余额三个信息
// }
    export class Processor_200009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OpBenzBmwUpBankerRet", data);
            for (let scoreData of result.bankerInfos) {
                scoreData.playerInfo.money = scoreData.playerInfo.money / 1000;
            }
            // console.warn(result);
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_UPBANKER, result);
        }
    }
}
