/**
  * 状态推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    //     //开始or停止下注
    // message OPBenzBmwBattleStatusPush {
    //     required int32 status = 1; //1开始下注 2.停止下注 3.开始游戏
    //     required int32 downTime = 2;//倒计时时间
    //     required bool isSwitchBanker = 3;//是否切换庄家 true 切换
    // } 


    export class Processor_200001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_200001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_200001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = BcbmRequest.getReceiveData("OPBenzBmwBattleStatusPush", data);
            //console.log("=======status push is ", result);
            AppFacade.instance.sendNotification(CommonDataNotify.BCBM_PUSH_BATTLESTATUS, result);
        }
    }
}
