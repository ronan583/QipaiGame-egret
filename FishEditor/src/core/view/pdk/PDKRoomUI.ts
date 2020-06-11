module game.pdk {
    export class PDKRoomUI extends RoomUI {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/pdk/pdkRoom.exml";
        }
        public backBtn: eui.Button;
        public helpBtn: eui.Button;
        private headImg: eui.Image;
        private goldAddBtn: eui.Button;
        private goldLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;

        private roomItem1: PdkRoomItem;
        private roomItem2: PdkRoomItem;
        private roomItem3: PdkRoomItem;
        private roomItem4: PdkRoomItem;

        private leftGroup: eui.Group;
        private rightGroup: eui.Group;
        private contentGroup: eui.Group;
        private leftCornerGroup: eui.Group;

        private init() {
        }
        protected addToStage() {
            super.addToStage();
            this.init();
            this.refreshInfo();
        }

        private afterAnim() {
        }


        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public onTestBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.PDK);
        } 

        protected childrenCreated(): void {
            super.childrenCreated();
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            // this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtn, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick0, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick1, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick2, this);
            this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjhBtnClick3, this);
            this.rightGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.refreshInfo();
            this.init();
        }


        private onQuickStart() {
            game.QuickStart.instance.quickStart(ChildGameType.PDK);
        }

        private onGoldAdd() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.PDK);
        }

        public onLeftPage(event: egret.TouchEvent): void {

        }

        public onNextPage(event: egret.TouchEvent): void {

        }

        private onHelpClick(): void {
            AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.PDK);
        }

        private onAddToStage(): void {
            this.refreshInfo();
        }

        public refreshPlayerInfo() {
            this.refreshInfo();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);

        }

        private onZjhBtnClick(index: number): void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.PDK, index);
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
        private onBackBtnClick(e: egret.TouchEvent): void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_PDK_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

    }
}