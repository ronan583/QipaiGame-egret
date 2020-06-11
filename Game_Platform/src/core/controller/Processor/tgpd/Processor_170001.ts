/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_170001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_170001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_170001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = TgpdRequest.getReceiveData("OPCandyEnterGameRet", data);
            if(!ModuleLoader.getInstance().IsResLoaded(game.ChildGameType.TGPD)){
                return;
            }            
            result.totalMoney = result.totalMoney / 1000;
            result.winMoney = result.winMoney / 1000;
            result.grand = result.grand / 1000;
            result.major = result.major / 1000;
            result.minor = result.minor / 1000;
            result.mini = result.mini / 1000;
            game.tgpd.CandyData.instance.setEnterData(result);
            
            let layer = game.tgpd.CandyData.instance.currentLayer;
            AppFacade.instance.sendNotification(PanelNotify.OPEN_TGPD_ROOM_CURTAIN, layer);
            // AppFacade.instance.sendNotification(PanelNotify.OPEN_TGPD_BATTLE_UI);
            // AppFacade.instance.sendNotification(CommonDataNotify.TGPD_ENTER_GAME);
            console.warn("OPCandyEnterGameRet", result);
        }
    }
}
/**
 * message OPCandyEnterGame{
	required int32 gameLevel = 1;//房间类型
}

message OPCandyEnterGameRet{
	required int32 currentLayer = 1;//当前层 1=1层 2=2层 3=3层
	required int64 totalMoney = 2;//余额
	required int32 currentPassCount = 3;//当前过关图案的数量
	required int32 totalPassCount = 4;//总过关图案数量
	required int64 grand = 5;//奖池
	required int64 major = 6;//奖池
	required int64 minor = 7;//奖池
	required int64 mini = 8;//奖池
	required int64 stake = 9;//注数
	required int32 line = 10;//单线点数
	required int32 gameLevel = 11;//房间类型
	required int64 winMoney = 12;//输赢的钱
}
 */
