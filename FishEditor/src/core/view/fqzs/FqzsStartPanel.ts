module game.fqzs {
    export class FqzsStartPanel extends RoomUI {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/fqzs/FqzsStartPanel.exml";
        }
        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public backBtn: eui.Button;
        public helpBtn: eui.Button;
        public zjcxBtn: eui.Button;
        private contentGroup: eui.Group;
        public goldLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private headImg: eui.Image;
        private goldAddBtn: eui.Button;
        private leftCornerGroup: eui.Group;
        private quickStartGroup: eui.Group;
        private roomItem1: FqzsRoomItem;
        private roomItem2: FqzsRoomItem;
        private roomItem3: FqzsRoomItem;

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.FQZS);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem3, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.refreshInfo();
            this.init();
        }

        protected addToStage() {
            super.addToStage();
            this.refreshInfo();
            this.init();
        }

        private onQuickStart() {
            FqzsSoundPlayer.instance.playTouch();
            game.QuickStart.instance.quickStart(ChildGameType.FQZS);
        }

        private onItem1() {
            FqzsSoundPlayer.instance.playTouch();
            RoomRequest.sendEnterRoomInfo(ChildGameType.FQZS, 1);
        }

        private onItem2() {
            FqzsSoundPlayer.instance.playTouch();
            RoomRequest.sendEnterRoomInfo(ChildGameType.FQZS, 2);
        }

        private onItem3() {
            FqzsSoundPlayer.instance.playTouch();
            RoomRequest.sendEnterRoomInfo(ChildGameType.FQZS, 3);
        }

        private onGoldAdd() {
            FqzsSoundPlayer.instance.playTouch();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.FQZS);
        }

        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        public handleBankDrawMoney(drawmoney: number, totalmoney: number) {
            this.goldLabel.text = CommonUtil.fixMoneyFormat(totalmoney);
        }

        private obHelpClick() {
            FqzsSoundPlayer.instance.playTouch();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.FQZS);
        }

        public onOpenChargePanel(event) {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
        }

        private onBackHall() {
            FqzsSoundPlayer.instance.playTouch();
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FQZS_START_UI);
        }

        private init() {
        }

        private afterAnim() {
        }

        public refreshPlayerInfo() {
            this.refreshInfo();
        }

        public initUI(data) {

        }

    }
}