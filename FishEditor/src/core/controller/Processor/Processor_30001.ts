/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_30001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_30001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_30001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = RoomRequest.getReceiveData("OPEnterRoomRet", data);
            console.log("----------OPEnterRoomRet", result);
            RoomManager.getInstance().setRoomData(result);
            if(!ModuleLoader.getInstance().IsResLoaded(<game.ChildGameType>result.gameType)) {
                return ;
            }

            UserService.roomId = result.roomId;
            // 如果正常回复跳转到battle场景
            switch(<game.ChildGameType>result.gameType)
            {
              case  game.ChildGameType.ZJH:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJH_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.QYNN:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_QYNN_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.DDZ:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DDZ_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.BRNN:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BRNN_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.LHDZ:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_LHDZ_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.PDK:
              {
                  AppFacade.getInstance().sendNotification(PanelNotify.OPEN_PDK_BATTLE_UI);
                  break;
              }
              case game.ChildGameType.HHDZ:
              {
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HHDZ_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.DZPK:
              {
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DZPK_BATTLE_UI);
                  break;
              }
              case  game.ChildGameType.ERMJ:
              {
                AppFacade.getInstance().sendNotification(CommonDataNotify.ERMJ_ENTER_ROOM);
                  break;
              }
              case  game.ChildGameType.BY:
              {
                  if(game.by.BYData.instance.players && game.by.BYData.instance.players.length > 0) {
                      game.by.BYData.instance.refreshPlayers();
                  } 
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BY_BATTLE);
                  break;
              }
              case  game.ChildGameType.BJL:
              {
                // AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BJL_START_UI);
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BJL_BATTLE_UI);
                break;
              }
              case  game.ChildGameType.FRUIT:
              {
                  console.log("bottombnet : " + result.bottomBet);
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_FRUIT_BATTLE_UI);
                break;
              }
              case  game.ChildGameType.DiceBao:
              {
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_TB_BATTLE_UI);
                break;
              }
              case  game.ChildGameType.FQZS:
              {
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_FQZS_BATTLE_UI);
                break;
              }
              case  game.ChildGameType.BCBM:
              {
                AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BCBM_BATTLE_UI);
                break;
              }
            }
        }
    }
}
