/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }
        public static NAME: string = "Processor_70001";
        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70001", this);
        }
/*
//玩家信息
message OPThreeBattle {
	required int64 playerId = 1;//玩家id
	required int32 status = 2;//玩家状态 1.暗牌 2.看牌 3.弃牌 4.失败
	required int64 costMoney = 3;//已消耗钱
	required int64 totalMoney = 4;//总金额
	required bool isPay = 5;//是否能出牌
	required bool isBanker = 6;//是否是庄家
	required bool isAlways = 7;//跟到底
	repeated int32 cards =8;//自己的牌 如果看牌了才有值
	required int32 cardType = 9;//类型0.散牌 1.对子 2.顺子 3.同花 4.同花顺 5.豹子 -1没看牌
	repeated int64 betsRecord =10;//自己下注记录 只有重连给数据
}

//开始游戏
message OPStartGame{
	required int32 gameType = 1;//游戏类型 
	required int64 bottomBet = 2;//底注
	required int64 singleBet = 3;//单注
	required int64 totalBet = 4;//总下注
	required int32 currentRound = 5;//当前回合数
	required int32 totalRound = 6;//总回合数
	required int32 downTime = 7;//倒计时
	repeated OPThreeBattle playerBattle =8;//自己的牌 如果看牌了才有值
	required bool isAllIn = 9;//是否全压
}
*/        
        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPStartGame", data);
            game.zjh.ZJHData.getInstance().setData(result);
            console.error("------------OPStartGame ", result);
            RoomManager.getInstance().curRoomData.status = GameStatus.RUNNING;
            game.zjh.ZJHData.getInstance().BattleFinishData = new game.zjh.ZJHBattleFinishData();
        // game.zjh.ZJHData.getInstance().BattleFinishData.isBattleFinish = false;
            // 如果正常回复跳转到battle场景
            AppFacade.getInstance().sendNotification(CommonDataNotify.START_ZJH_BATTLE);
            //console.warn("================\n start \n===============");
        }
    }
}


