/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_180002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_180002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_180002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DuobaoRequest.getReceiveData("OPTreasureStakeRet", data);
            game.duobao.DuobaoData.instance.betValue = Number(result.money);
            AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_RFRESH_STAKE_VALUE);
            console.log("OPTreasureStakeRet ", result);            
        }
    }
}
