module game.dzpk {
    export class DZPKRoomUI extends RoomUI {
        public constructor() {
            super(ChildGameType.DZPK);
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/dzpk/dzpkRoom.exml";
        }
        public backBtn: eui.Button;
        public helpBtn: eui.Button;
        public zjcxBtn: eui.Button;
        private contentGroup: eui.Group;
        private goldLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private headImg: eui.Image;
        private goldAddBtn: eui.Button;
        private leftCornerGroup: eui.Group;
        private quickStartGroup: eui.Group;
        private roomItem1: DZPKRoomItem;
        private roomItem2: DZPKRoomItem;
        private roomItem3: DZPKRoomItem;
        private roomItem4: DZPKRoomItem;

        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private init() {
        }

        private afterAnim() {
        }

        public refreshPlayerInfo() {
            this.refreshInfo();
        }

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.DZPK);
        }

        protected childrenCreated(): void {
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
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.refreshInfo();
            this.init();
        }

        private onQuickStart() {
            game.QuickStart.instance.quickStart(ChildGameType.DZPK);
        }

        private onGoldAdd() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DZPK);
        }

        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DZPK);
        }

        private onAddToStage(): void {
            this.init();
            this.refreshInfo();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);

        }

        private onZjhBtnClick(index: number): void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.DZPK, index);
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
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DZPK_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

    }
}