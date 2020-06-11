module game.sgj {
    export class SgjRoomUI extends RoomUI {
        public constructor() {
            super(ChildGameType.FRUIT);
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
            this.skinName = "resource/eui_skins/sgj/sgjRoom.exml";
        }
        public backBtn:eui.Button = null;

        private money0:eui.BitmapLabel;
        private money1:eui.BitmapLabel;
        private money2:eui.BitmapLabel;
        private money3:eui.BitmapLabel;

        private moneyArr:Array<eui.BitmapLabel>;

        private roomTop:RoomTop;
        private roomMc1:RoomDB;
        private roomMc2:RoomDB;
        private roomMc3:RoomDB;
        private roomMc4:RoomDB;
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected childrenCreated():void {
            super.childrenCreated();
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.moneyArr = [this.money0,this.money1,this.money2,this.money3];
            this.roomTop.backFuncObj = this;
            this.roomTop.backFunc = this.onBackBtnClick;
            this.roomMc1.setNextNode(this.roomMc2);
            this.roomMc2.setNextNode(this.roomMc3);
            this.roomMc3.setNextNode(this.roomMc4);
            this.roomMc4.setNextNode(this.roomMc1);
            this.roomMc1.play();
        }

        private onAdd():void {
            this.roomMc1.play();
            // 请求房间奖池信息
            FruitRequest.reqAllRoomPoolMoney();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if(partName.indexOf("btn") >= 0) {
                let index = parseInt(partName.replace("btnRoom",""));
                if(index == 0) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick1, this);
                }else if(index == 1) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick2, this);
                } else if(index == 2) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick3, this);
                }else if(index == 3) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick0, this);
                }            }
        }

        private onByBtnClick(index:number) : void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.FRUIT, index);
        }

        private onByBtnClick0(e:egret.TouchEvent):void {
            this.onByBtnClick(0);
            game.sgj.FruitData.instance.poolMoney = Number(this.money0.text);
        }
        private onByBtnClick1(e:egret.TouchEvent):void {
            this.onByBtnClick(1);
            game.sgj.FruitData.instance.poolMoney = Number(this.money1.text);
        }
        private onByBtnClick2(e:egret.TouchEvent):void {
            this.onByBtnClick(2);
            game.sgj.FruitData.instance.poolMoney = Number(this.money2.text);
        }
        private onByBtnClick3(e:egret.TouchEvent):void {
            this.onByBtnClick(3);
            game.sgj.FruitData.instance.poolMoney = Number(this.money3.text);
        }
        private onByBtnClick4(e:egret.TouchEvent):void {
            this.onByBtnClick(4);
        }
        private onBackBtnClick(e:egret.TouchEvent):void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_SGJ_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

        public refreshPool(poolMoneys:Array<number>):void {
            for(let i=0;i<this.moneyArr.length;i++) {
                this.moneyArr[i].text = poolMoneys[i].toFixed(0);
            }
        }

    }
}