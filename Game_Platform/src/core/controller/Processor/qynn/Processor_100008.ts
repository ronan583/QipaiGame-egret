/**
  * 开始发牌
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100008 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_100008";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_100008", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = QynnRequest.getReceiveData("OPReconnectAndGuanRet", data);
            console.log("OPReconnectAndGuanRet---------", result);
            let qdata = QynnData.getInstance()
            console.log("OPReconnectAndGuanRet---------", qdata);
            for (let info of result.totalInfo) {
                info.money = info.money / 1000;
                info.totalMoney = info.totalMoney / 1000;
            }
            // let roomData:game.RoomData = game.RoomManager.getInstance().curRoomData;
            // let nnData: QynnData = QynnData.getInstance();
            // nnData = new QynnData();
            // nnData.setBanker(Number(result.bankerPlayerId));
            // nnData.qynnPlayers = new Array<QynnPlayer>();
            AppFacade.instance.sendNotification(CommonDataNotify.QYNN_RECONNECT, result);
        }
    }
}
