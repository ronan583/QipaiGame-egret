/**
  * 玩家排行推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
// //查看在线玩家排行列表 --按照余额进行排名 
// message OPBenzBmwPlayerRank{
// 	required int32 version = 1; //
// }
// message OPBenzBmwPlayerRankRet{
// 	repeated OPBenzBmwPlayerInfo playerInfo = 1;//玩家的四个消息都需要
// }
    export class Processor_200004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OPBenzBmwPlayerRankRet", data);
            console.log("=========== rankInfo is ", result);
            for (var i = 0; i < result.playerInfo.length; i++) {
                result.playerInfo[i].money = result.playerInfo[i].money / 1000;
                result.playerInfo[i].stake = result.playerInfo[i].stake / 1000;
            }
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_ONLINEPLAYER, result);
        }
    }
}
