/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30012 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30012";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30012", this);
        }

        public execute(notification: puremvc.INotification): void {
            let data: any = notification.getBody();//携带数据
            let result: any = RoomRequest.getReceiveData("OpRoomPlayerRecordInfoRet", data);
            console.log("==================================");
            console.log(result);
            console.log("==================================");
            for(let info of result.recordInfo){
                let recordInfo: any = JSON.parse(info.recordInfo);
                console.log(recordInfo);
            }
            console.log("==================================");
            AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJCX_UI,result);  
        }
    }
}
