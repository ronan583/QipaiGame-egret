/**
  * 修改昵称
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = UserRequest.getReceiveData("OPBankMoneyRet", data);
            UserService.instance.updateMoney(result.money / 1000);
            UserService.instance.updateBankMoney(result.bankMoney / 1000);
            this.facade.sendNotification(ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE);
            this.facade.sendNotification(CommonDataNotify.UPDATE_PLAYER_INFO);
			TipsUtils.showTipsFromCenter("操作成功.")
            console.log("Processor_20009>>>>>>>>>>>>>>");
            GameLayerManager.gameLayer().findGameScenes().forEach(
                (gameScene:game.GameScene)=>{
                    gameScene.refreshPlayerInfo();
                }
            )
        }
    }
}
