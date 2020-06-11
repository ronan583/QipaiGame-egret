/**
  * 登录返回接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20001 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20001";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20001", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据

            //创建user_login_class
            var result: any = UserRequest.getReceiveData("OPLoginRet", data);

            //反序列化
            // UserService.instance.setUserInfo(result);
            UserService.resetInstance();
            UserService.instance.setNewUserInfo(result);

            game.AppFacade.getInstance().sendNotification(SceneNotify.LOGIN_SUCCESS);
            if(!Global.IS_SDK_MODE) {
                game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HALL);
                if (result.roomId == 0) {
                    // 没有房间
                    CommonUtil.leaveGame();
                    // 因为这个发消息回复的是错误id所以强制退出游戏
                    for(let gamesence of GameLayerManager.gameLayer().findGameScenes()) {
                        if(gamesence && gamesence.stage) gamesence.parent.removeChild(gamesence);
                    }
                }
            } else {
                GameHelper.instance.enterGame(InnerUpdateCheckDirectGame.instance.curGameType);
            }
            SocketManager.onLoginSuccess();
            if (game.AppFacade.getInstance().hasCommand(SceneNotify.CLOSE_LOGIN)) {
                game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOGIN);
            }

            RoomRequest.reqGameRule();
        }

    }
}
