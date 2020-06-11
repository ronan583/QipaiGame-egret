
/**
  * 胜负情况推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

// //开奖记录
// message OPBenzBmwRoundInfo{
// 	required int32 version = 1; 
// }
// message OPBenzBmwRoundInfoRet {
// 	repeated int32 type = 1;// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众
// }
    export class Processor_200005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OPBenzBmwRoundInfoRet", data);
            console.log("round info:", result);
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_HISTORY, result);
        }
    }
}
