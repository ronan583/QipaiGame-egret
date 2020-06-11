/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150004 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150004";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150004", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpFishesSetBulletMoneyRet",data);
            game.by.BYData.instance.setBulletMoney(Number(decodeData.playerId), decodeData.bulletMoney);
            game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_BULLET_MONEY, 
                {"playerId":Number(decodeData.playerId), "bulletMoney":Number(decodeData.bulletMoney / 1000)})
        }
    }
}
