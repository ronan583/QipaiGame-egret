/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {
    export class Processor_70002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }
        public static NAME: string = "Processor_70002";
        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70002", this);
        }
        /**
         * //推送玩家状态
            message PushPlayerStatus {
            required int64 playerId = 1;//状态变化者
            required int32 status =2;//玩家信息 1.暗牌 2.看牌 3.弃牌 4.失败
            required int64 currentPlayerId = 3;//当前出牌的人
            required int32 downTime = 4;//倒计时
            required int32 currentRound = 5;//回合数
            required int64 totalBet = 6;//总下注
            required bool isAllIn = 7;//是否全压
        }
            //下注
            message OPBets {
                required int32 type = 1;//类型 1.跟注 2.加注
                required int32 singleBet = 2;//单注注值
            }
        
            message OPBetsRet {
                required int32 type = 1;//类型 1.跟注 2.加注
                required int64 singleBet = 2;//单注注值
                required int64 nextPlayerId = 3;//下位操作者
                required int32 downTime = 4;//倒计时
            }
         */
        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPBetsRet", data);
            var zdata: game.zjh.ZJHData = game.zjh.ZJHData.getInstance();
            if (!zdata.hasStart()) {
                return;
            }
            result.costMoney = result.costMoney / 1000;
            result.singleBet = result.singleBet / 1000;
            console.warn("----------- bet info is ", result);

            let prevSingleBet = zdata.singleBet;
            zdata.downTime = result.downTime;
            zdata.singleBet = result.singleBet;

            let player: game.zjh.ZJHPlayer = ZJHData.getInstance().getPlayerById(result.playerId);
            if (player == null) {
                console.error("========未找到玩家！", result);
                return;
            }
            if (zdata.getCurOperationPlayer() != null) {
                zdata.getCurOperationPlayer().costMoney = result.costMoney;
                zdata.getCurOperationPlayer().betType = result.type;
            }

            AppFacade.getInstance().sendNotification(PanelNotify.BET_ANIM, result);

            //-------------------------
            if (player.isLook) {
                zdata.singleBet /= 2;
            }
            //-------------------------

            //跟注/加注，不用tip气泡。全押功能弃用。————lilm
            if (result.type == 1) {
                // 普通跟注
                game.zjh.ZJHSoundPlayer.instance.playSound(result.playerId, zjh.ZJHSoundType.FOLLOW);
            } else if (result.type == 3) {
                game.zjh.ZJHSoundPlayer.instance.playSound(result.playerId, zjh.ZJHSoundType.ALL_IN);
            } else if (result.type == 2) {
                game.zjh.ZJHSoundPlayer.instance.playSound(result.playerId, zjh.ZJHSoundType.ADD);
            }
        }
    }
}
