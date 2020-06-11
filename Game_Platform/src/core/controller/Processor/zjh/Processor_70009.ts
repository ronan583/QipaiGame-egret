/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70009 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70009";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70009", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("PushBattleFinsh", data);
            console.warn("PushBattleFinsh ", result);
            var zdata: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            zdata.setBattleFinishData(result);

            let curPlayer = zdata.getCurOperationPlayer();
            let playerCount = zdata.getLeftPlayerCount();
            if (curPlayer != null) {
                if ((curPlayer.betType == 1 || curPlayer.betType == 2) && playerCount == 2 && zdata.currentRound == zdata.totalRound) {
                    let winPlayerId = result.winPlayerId;
                    for (let p of zdata.BattleFinishData.battleFinishPlayers) {
                        if (p.playerId == zdata.getCurOperationPlayer().playerId) {
                            var otherPlayerId = p.playerId;
                        } else if (zdata.getPlayerById(p.playerId).status == 1 || zdata.getPlayerById(p.playerId).status == 2) {
                            var targetId = p.playerId;
                        }
                    }
                    let bipaiData = { targetId: targetId, otherPlayerId: otherPlayerId, winPlayerId: winPlayerId };
                    AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_CMP_ANIM, bipaiData);
                } else {
                    //AppFacade.getInstance().sendNotification(CommonDataNotify.ZJH_SHOW_CARDS_ON_END);
                }
            }
            AppFacade.getInstance().sendNotification(CommonDataNotify.ZJH_BATTLE_END);
        }
    }
}
