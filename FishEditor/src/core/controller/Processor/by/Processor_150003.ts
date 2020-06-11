/**
  * 鱼死亡
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_150003 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_150003";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_150003", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var decodeData:any = BYRequest.getReceiveData("OpFishesDeadPush", data);
            var deadInfo:game.by.FishDeadInfo = new game.by.FishDeadInfo();
            deadInfo.fishId = decodeData.uuid;
            deadInfo.killerId = Number(decodeData.playerId);
            deadInfo.addMoney = decodeData.moneyChange / 1000;
            game.by.BYData.instance.addKillMoney(deadInfo.killerId, deadInfo.addMoney);
            // game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_BY_ADD_MONEY, deadInfo);
            game.AppFacade.getInstance().sendNotification(PanelNotify.BY_FISH_DEAD, deadInfo);
        }
    }
}

