/**
  * 下注推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
// //个人的下注
// message OPBenzBmwStake{
	
// 	required int32 type = 2; // 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众
// 	required int64 value = 3;//下注值
// }

// message OPBenzBmwStakeRet{
// 	required int64 playerId = 1; //下注人
// 	required int32 type = 2; // 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众
// 	required int64 value = 3;//下注值
// }
    export class Processor_200002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OPBenzBmwStakeRet", data);
            result.totalValue = result.totalValue / 1000;
            result.value = result.value / 1000;
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_STAKE_RET, result);
        }
    }
}
