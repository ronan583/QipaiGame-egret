/**
  * 开始游戏推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
// //游戏结果(结算展示 自己 ，庄家，的输赢金额 ，赢钱前五名的信息)
// message PushBenzBmwBattleFinsh {
// 	required int32 winType = 2;// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众 --- 胜负情况 最后一个数字为最新数据（要等结算后才显示出来）
// 	repeated OPBenzBmwPlayerBattleInfo battleInfo = 1;//按照玩家输赢的金额排名
// }
// //玩家游戏信息 --这句的输赢情况
// message OPBenzBmwPlayerBattleInfo {
// 	required int64 playerId = 1; //下注人
// 	optional string nickName = 2;//昵称
// 	required int64 costMoney = 3; //输赢金币
// }
    export class Processor_200003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("PushBenzBmwBattleFinsh", data);
            //console.log("=========finish data is ", result);
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_PUSH_BATTLEFINISH, result);
        }
    }
}
