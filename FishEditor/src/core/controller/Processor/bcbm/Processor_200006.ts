/**
  * 首次进入房间推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
// //首次进入房间
// message OpBenzBmwFirstRoom{
// 	required int32 roomId = 1; //房间ID
// }

// message OpBenzBmwFirstRoomPush{
// 	required int32 status = 1; // 0.休息中 1.下注中 2.开奖中 
// 	required int32 downTime = 2;//倒计时时间
// 	repeated OPBenzBmwRoomStake  roomStakeInfo = 3;//总的下注情况
// 	repeated OPBenzBmwRoomStake  myStakeInfo = 4;//玩家的下注情况
// 	required int32 upBankerNum = 5;// 庄家信息 集合有多少数量就有多少人
// 	required bool isBanker = 6;// 进来的时候判断自己是否为 庄家(掉线进来的时候)
// 	required int64 upBankerMinMoney = 7;//上庄最低金额
// 	optional PushBenzBmwBattleFinsh  BattleFinsh = 8 ;//判断是否处于结算状态
// }
// //房间的下注
// message OPBenzBmwRoomStake{
// 	required int32 type = 1; // 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众 
// 	required int64 value = 2;//下注值
// }
    export class Processor_200006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OpBenzBmwFirstRoomPush", data);
            
            for(let info of result.roomStakeInfo) {
                info.value = info.value / 1000;
            }
            for(let info of result.myStakeInfo){
                info.value = info.value / 1000;
            }
            if(result.roomStakeInfo && result.roomStakeInfo.length > 0){
                for(let i = 0; i < result.roomStakeInfo.length; i++){
                    // console.log("------first enter roomStakeInfo type is---------" + result.roomStakeInfo[i].type);
                    // console.log("------first enter roomstakeinfo value is---------" + result.roomStakeInfo[i].value);
                }
            }
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_FIRST_ENTERROOM, result);
        }
    }
}
