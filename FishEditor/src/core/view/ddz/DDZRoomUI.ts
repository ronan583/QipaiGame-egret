module game.ddz {
    export class DDZRoomUI extends RoomUI {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/ddz/ddzRoom.exml";
        }

        private helpBtn: eui.Button;
        private backBtn: eui.Button;
        private roomItem1: DDZRoomItem;
        private roomItem2: DDZRoomItem;
        private roomItem3: DDZRoomItem;
        private roomItem4: DDZRoomItem;
        private roomAnim1: DragonAnim;
        private roomAnim2: DragonAnim;
        private roomAnim3: DragonAnim;
        private roomAnim4: DragonAnim;
        private roomGroup1: eui.Group;
        private headImg: eui.Image;
        private jiluBtn: eui.Button;
        private goldAddBtn: eui.Button;
        private goldLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private quickStartBtn: eui.Group;
        private contentGroup: eui.Group;
        private bgImg: eui.Image;

        private leftCornerGroup: eui.Group;

        private init() {

        }

        private afterAnim() {
        }

        public refreshPlayerInfo() {
            this.refreshInfo();
        }

        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public onTestBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.DDZ);
        }        

        protected childrenCreated(): void {
            super.childrenCreated();
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            // this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtn, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick1, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick2, this);
            this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick3, this);
            this.roomAnim1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomAnim2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomAnim3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomAnim4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.quickStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.jiluBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiluTap, this);
            this.refreshInfo();
            this.init();
        }

        private onGoldAdd() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DDZ);
        }

        private onQuickStart() {
            game.QuickStart.instance.quickStart(ChildGameType.DDZ);
        }

        private onJiluTap() {
            RoomRequest.reqZJCXInfo(ChildGameType.DDZ);
        }

        private onHelp(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DDZ);
        }

        protected addToStage() {
            super.addToStage();
            this.init();
            this.refreshInfo();
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_GAME_LOAD);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if (partName.indexOf("btn") >= 0) {
                let index = parseInt(partName.replace("btnRoom", ""));
                if (index == 0) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
                } else if (index == 1) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick1, this);
                } else if (index == 2) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick2, this);
                } else if (index == 3) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick3, this);
                } else if (index == 4) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick4, this);
                }
            }
        }

        private onZjhBtnClick(index: number): void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.DDZ, index);
        }

        private onZjhBtnClick0(e: egret.TouchEvent): void {
            this.onZjhBtnClick(0);
        }
        private onZjhBtnClick1(e: egret.TouchEvent): void {
            this.onZjhBtnClick(1);
        }
        private onZjhBtnClick2(e: egret.TouchEvent): void {
            this.onZjhBtnClick(2);
        }
        private onZjhBtnClick3(e: egret.TouchEvent): void {
            this.onZjhBtnClick(3);
        }
        private onZjhBtnClick4(e: egret.TouchEvent): void {
            this.onZjhBtnClick(4);
        }
        private onBackBtnClick(): void {
            if(!Global.IS_SDK_MODE) {
                AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DDZ_ROOM_UI);
                AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
            } else {
                egret.ExternalInterface.call("leaveGame", "");
            }
        }

    }
}