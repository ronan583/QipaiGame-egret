/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_160005 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_160005";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_160005", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = FruitRequest.getReceiveData("OPFruitsWarPush", data);
            game.sgj.FruitData.instance.crazyArr = result.multiple;
            if(game.sgj.FruitData.instance.isReward) {
                egret.setTimeout(()=>{
                    AppFacade.instance.sendNotification(PanelNotify.SHOW_FRUIT_CRAZY_UI, result);
                },this,3000);
            } else {
                egret.setTimeout(()=>{
                    AppFacade.instance.sendNotification(PanelNotify.SHOW_FRUIT_CRAZY_UI, result);
                },this,1500);
            }

            
        }
    }
}
