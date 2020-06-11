/**
  * 错误信息推送接收
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_70008 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_70008";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_70008", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var result: any = ZJHRequest.getReceiveData("OPBrightCardRet", data);
            console.error("-----------OPBrightCardRet", result);

            let info = result.cardInfo;
            let brightInfo = info[0];
            let zjhData = game.zjh.ZJHData.getInstance();
            if(zjhData.getPlayerById(brightInfo.targetId)){
                zjhData.getPlayerById(brightInfo.targetId).addCard(brightInfo.card);
                zjhData.getPlayerById(brightInfo.targetId).cardType = brightInfo.cardType;
            }

            for(let i=0;i<result.cardInfo.length;i++) {
                let c = result.cardInfo[i];
                //模拟三条数据
                // if(i == 0)                c.cardType = 5;
                game.zjh.ZJHData.getInstance().getPlayerById(c.targetId).addCard(c.card);
                game.zjh.ZJHData.getInstance().getPlayerById(c.targetId).cardType = c.cardType;
                // console.warn("============player is " + c.targetId + "// cardtype is " + c.cardType);
            }
            AppFacade.getInstance().sendNotification(CommonDataNotify.ZJH_SHOW_BRIGHTCARDS, brightInfo.targetId);
        }
    }
}
