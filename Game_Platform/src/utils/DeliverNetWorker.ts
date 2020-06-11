module game {
    // 对于密集协议的分开处理
    export class DeliverNetWorker {
        private static _instance:DeliverNetWorker;
        static get instance():DeliverNetWorker {
            if(!DeliverNetWorker._instance) {
                DeliverNetWorker._instance = new DeliverNetWorker();
            }
            return DeliverNetWorker._instance;
        }
        waitToDealList:Array<any> = [];
        isRunning:boolean = false;
        lastTime:number = 0;
        checkTime = 50;
        start() {
            if(this.isRunning) return;
            // 为了以防万一：
            egret.stopTick(this.updateDeal, this);
            egret.startTick(this.updateDeal, this);
            this.isRunning = true;
        }

        stop() {
            egret.stopTick(this.updateDeal, this);
            this.isRunning = false;
        }

        addNet(notification:string, data:any) {
            this.waitToDealList.push({notification:notification, data:data});
            if(this.waitToDealList.length == 1) {
                this.start();
            }
            // if(this.waitToDealList.length > 100) {
            //     this.checkTime = 10;
            // } else if(this.waitToDealList.length > 50) {
            //     this.checkTime = 20;
            // }  else if(this.waitToDealList.length > 10) {
            //     this.checkTime = 30;
            // } else if(this.waitToDealList.length > 5){
            //     this.checkTime = 35;
            // } else {
                this.checkTime = 25;
            // }
        }

        public dropAllNet() {
            this.waitToDealList = [];
        }

        updateDeal(timestamp:number):boolean  {
            if(this.waitToDealList.length > 0) {
                if(timestamp - this.lastTime > this.checkTime) {
                    let obj = this.waitToDealList[0];
                    this.waitToDealList.splice(0,1);
                    AppFacade.getInstance().sendNotification(obj.notification, obj.data);
                    this.lastTime = timestamp;
                }
            } else {
                this.stop();
            }
            return false;
        }
    }
}