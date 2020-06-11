/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */

module game {

    import ZJHPlayer = game.zjh.ZJHPlayer;

    export class Processor_70010 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70010";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70010", this);
        }
/**
 * //推送玩家状态
    message PushPlayerStatus {
	required int64 playerId = 1;//状态变化者
	required int32 status =2;//玩家信息 0.noplay 1.暗牌 2.看牌 3.弃牌 4.失败
	required int64 currentPlayerId = 3;//当前出牌的人
	required int32 downTime = 4;//倒计时
	required int32 currentRound = 5;//回合数
	required int64 totalBet = 6;//总下注
	required bool isAllIn = 7;//是否全压
}
 */
        private BIPAI_TIME: number = 2000;

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("PushPlayerStatus", data);
            var zdata: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            console.warn("----------- Player Status change info is ", result);
            zdata.totalBet = result.totalBet / 1000;
            zdata.downTime = result.downTime;

            let p: game.zjh.ZJHPlayer = zdata.getPlayerById(result.playerId);
            let playerStatus: number = result.status;
            if (p != null) {
                zdata.getPlayerById(result.playerId).status = result.status;
                if (result.status == 2) {
                    AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_TIPS, result);
                } else if (result.status == 3) {
                    AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_TIPS, result);
                    AppFacade.getInstance().sendNotification(PanelNotify.ZJH_FOLD_CARDS, result.playerId);
                    //AppFacade.getInstance().sendNotification(PanelNotify.ZJH_HEAD_CLOCK, 0); 
                } else if (result.status == 4) {
                    //tipsData = { "playerId": result.playerId, "tipsName": "zjh_flag_cmp" };
                    //AppFacade.getInstance().sendNotification(PanelNotify.ZJH_HEAD_CLOCK, this.BIPAI_TIME); 
                } 
            } else {
                console.error("player not found : " + result.playerId);
            }

            if (result.currentPlayerId > 0) {
                zdata.getCurOperationPlayer().isPay = false;
                let zjhPlayer = zdata.getPlayerById(result.currentPlayerId);
                if (zjhPlayer) {
                    zjhPlayer.isPay = true;
                }
            }
            if(zdata.currentRound < zjh.ZJHData.getInstance().totalRound){
                zdata.currentRound = result.currentRound;
            }
            // todo 如果有人同时变状态
            if(result.currentPlayerId != result.playerId){
                let delay: number = 0;
                if(playerStatus == 4){
                    delay = this.BIPAI_TIME;
                }
                AppFacade.getInstance().sendNotification(PanelNotify.ZJH_HEAD_CLOCK, delay);   
            }

            if(result.playerId == UserService.instance.playerId){
                if(result.status == 2){
                    
                } else if(result.status == 3){
                    
                }
            }
        }
    }
}
