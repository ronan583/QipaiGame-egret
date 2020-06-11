/**
  * 房间列表推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    //OPCODE_BENZBMW_ROOM_LIST
    export class Processor_200008 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200008";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200008", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            // var result: any = LhdzRequest.getReceiveData("OPBirAndBeaPlayerRank", data);
            // // AppFacade.instance.sendNotification(CommonDataNotify.LHDZ_PUSH_BATTLESTATUS, result);
        }
    }
}
