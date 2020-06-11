/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_180001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_180001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_180001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = DuobaoRequest.getReceiveData("OPTreasureEnterGameRet", data);
            console.log("OPTreasureEnterGameRet ", result);
            if(!ModuleLoader.getInstance().IsResLoaded(game.ChildGameType.DUOBAO)){
                return;
            }
            game.duobao.DuobaoData.instance.setEnterData(result);
            AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DUOBAO_BATTLE);
        }   
    }
}
