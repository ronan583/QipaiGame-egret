/**
  * 用户心跳
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_20002 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = "Processor_20002";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand("Processor_20002", this);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            SocketManager.resHeartbeatCount();
        }
    }
}
