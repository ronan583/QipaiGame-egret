/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70006 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70006";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70006", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPComparisonCardRet", data);
            if(!game.zjh.ZJHData.getInstance().hasStart()) {
                return;
            }
            console.error("-------------------OPComparisonCardRet ", result);
            var zdata: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            result.singleBet = result.singleBet / 1000;
            result.costMoney = result.costMoney / 1000;
            zdata.singleBet = result.singleBet;

            //处理比牌结果数据
            let failPlayerId = Number(result.failPlayerId);
            let targetId = Number(result.targetId);
            let winPlayerId = Number(result.winPlayerId);
            result.playerId = targetId == failPlayerId ? winPlayerId : failPlayerId;    // 发起比牌的玩家

            let bipaiPlayer: game.zjh.ZJHPlayer = ZJHData.getInstance().getPlayerById(result.playerId);
            if(bipaiPlayer == null){
                console.error("========未找到玩家！", result);
                return;
            }
            
            let bipaiData = {targetId:targetId, otherPlayerId:result.playerId, winPlayerId:winPlayerId};
            zjh.ZJHData.getInstance().getPlayerById(result.playerId).costMoney = result.costMoney;

            AppFacade.getInstance().sendNotification(PanelNotify.BET_ANIM, result);
            
            //-------------------------
            if(bipaiPlayer.isLook){
                zdata.singleBet /= 2;
            }
            //-------------------------
            AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_CMP_ANIM, bipaiData);
            //AppFacade.getInstance().sendNotification(CommonDataNotify.UPDATE_ZJH_BATTLE_INFO);
            //todo 延时或回调
            // let tipsData:any = {"playerId":result.targetId, "status": game.zjh.ZJHPlayerStatus.SHIBAI};
            // AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_TIPS, tipsData);
        }
    }
}
