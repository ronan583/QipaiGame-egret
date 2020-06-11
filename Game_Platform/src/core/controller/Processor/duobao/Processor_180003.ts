/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_180003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_180003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_180003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DuobaoRequest.getReceiveData("OPTreasureLineRet", data);
            game.duobao.DuobaoData.instance.lineValue = result.value;
            AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_RFRESH_LINE_VALUE);
            console.log("OPTreasureLineRet ", result);                        
        }
    }
}
