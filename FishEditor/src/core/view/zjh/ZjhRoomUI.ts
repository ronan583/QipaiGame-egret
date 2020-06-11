module game {
    export class ZjhRoomUI extends RoomUI {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/zjhRoom/ZjhRoom.exml";
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage, this);
        }


        public backBtn:eui.Button;
        public helpBtn:eui.Button;
        public zjcxBtn:eui.Button;
        private contentGroup:eui.Group;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftcornerGroup:eui.Group;
        private quickStartGroup:eui.Group;
        private girlAnim:DragonAnim;

        private roomItem1:eui.Group;
        private roomItem2:eui.Group;
        private roomItem3:eui.Group;
        private roomItem4:eui.Group;

        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.ZJH);
        }

        protected childrenCreated():void {
            super.childrenCreated();
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick1, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick2, this);
            this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick3, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.refreshInfo();
            this.init();
            //this.girlAnim.scaleY = this.girlAnim.scaleX = 1.3;
        }

        private onQuickStart() {
            game.QuickStart.instance.quickStart(ChildGameType.ZJH);
        }

        private init() {
        }

        private afterAnim() {
        }

        public refreshPlayerInfo() {
            this.refreshInfo();
        }


        private onGoldAdd() {
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.ZJH);
        }

        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.ZJH);
        }

        private onAddToStage():void {
            this.init();
            this.refreshInfo();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if(partName.indexOf("btn") >= 0) {
                let index = parseInt(partName.replace("btnRoom",""));
                if(index == 0) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
                }else if(index == 1) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick1, this);
                } else if(index == 2) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick2, this);
                }else if(index == 3) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick3, this);
                }else if(index == 4) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick4, this);
                }
            }
        }

        private onZjhBtnClick(index:number) : void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.ZJH, index);
        }

        private onZjhBtnClick0(e:egret.TouchEvent):void {
            this.onZjhBtnClick(0);
        }
        private onZjhBtnClick1(e:egret.TouchEvent):void {
            this.onZjhBtnClick(1);
        }
        private onZjhBtnClick2(e:egret.TouchEvent):void {
            this.onZjhBtnClick(2);
        }
        private onZjhBtnClick3(e:egret.TouchEvent):void {
            this.onZjhBtnClick(3);
        }
        private onZjhBtnClick4(e:egret.TouchEvent):void {
            this.onZjhBtnClick(4);
        }
        private onBackBtnClick(e:egret.TouchEvent):void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ZJH_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

    }
}