module game.tgpd {
    export class NTgpdRoomUI extends RoomUI {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/tgpd/TgpdRoomPanel.exml";
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private testBtn: eui.Button;

        public backBtn: eui.Button;
        public helpBtn: eui.Button;
        private contentGroup: eui.Group;
        private animGroup: eui.Group;
        private anim0: DragonAnim;
        private anim1: DragonAnim;
        private goldLabel: eui.Label;
        private nameLabel: eui.Label;
        private headImg: eui.Image;
        private goldAddBtn: eui.Button;
        private leftCornerGroup: eui.Group;
        private quickStartGroup: eui.Group;

        private roomItem1: eui.Rect;
        private roomItem2: eui.Rect;

        private roomMc1: RoomMc;
        private roomMc2: RoomMc;

        private headGroup: eui.Group;
        private headMaskImg: eui.Image;

        private curtainAnim: DragonAnim;

        protected childrenCreated(): void {
            super.childrenCreated();
            //this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.curtainDownAnim, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            //this.headImg.mask = this.headMaskImg;
            //this.roomMc1.setNextNode(this.roomMc2)
            //this.roomMc2.setNextNode(this.roomMc1)
            this.refreshInfo();
            this.init();
            //this.roomMc1.play();
        }

        protected addToStage() {
            super.addToStage();
            this.init();
            this.refreshInfo();
            //this.roomMc1.play();
        }

        private onQuickStart() {
            //暂缓
            // console.log("quickstart");
            // game.QuickStart.instance.quickStart(ChildGameType.TGPD);
            SoundMenager.instance.PlayClick();
            CandyData.instance.enterRoomLevel = 0;
            this.curtainDownAnim(() => {
                TgpdRequest.enterGame(0);
            }, this);
        }

        private onItem1() {
            SoundMenager.instance.PlayClick();
            CandyData.instance.enterRoomLevel = 0;
            this.curtainDownAnim(() => {
                TgpdRequest.enterGame(0);
            }, this);
            //AppFacade.getInstance().sendNotification(PanelNotify.OPEN_TGPD_BATTLE_UI, 0);
        }

        private onItem2() {
            SoundMenager.instance.PlayClick();
            if (UserService.instance.money < 10) {
                TipsUtils.moneyTipsGame(this, 10);
                return;
            }
            CandyData.instance.enterRoomLevel = 1;
            this.curtainDownAnim(() => {
                TgpdRequest.enterGame(1);
            }, this);
            //AppFacade.getInstance().sendNotification(PanelNotify.OPEN_TGPD_BATTLE_UI, 1);
        }

        private onItem3() {
            SoundMenager.instance.PlayClick();
            RoomRequest.sendEnterRoomInfo(ChildGameType.BJL, 3);
        }

        private playCourtAnim() {
            this.anim0.playerOnce(() => {
                this.anim1.playerOnce(this.playCourtAnim, this, "animation")
            }, this, "animation");
        }
        //         private playCourtAnim() {
        //     this.anim0.playerOnce(() => {
        //         egret.setTimeout(()=>{
        //             this.anim1.playerOnce(()=>{
        //                 egret.setTimeout(this.playCourtAnim, this, 3000);
        //             }, this, "animation")
        //         }, this, 3000);
        //     }, this, "animation");
        // }

        private onGoldAdd() {
            console.error("===================");
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.TGPD);
        }

        private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

        private obHelpClick() {
            SoundMenager.instance.PlayClick();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.TGPD);
        }

        public onOpenChargePanel() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.TGPD);
        }

        private func: Function = null;
        private funcObj: any = null;
        private curtainDownAnim(func: Function, funcObj: any) {
            this.func = func;
            this.funcObj = funcObj;
            this.animGroup.visible = true;
            this.curtainAnim.playerOnce(() => {
                this.func.call(this.funcObj);
                // this.animGroup.visible = false;
                // this.curtainAnim.stop();
            });
        }

        public showUI() {
            // this.goldNum.text = UserService.instance.money.toFixed(2);
        }

        private onBackHall() {
            SoundMenager.instance.PlayClick();
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
            PopUpManager.removePopUp(this);
        }

        private init() {
            this.playCourtAnim();
            this.animGroup.visible = false;
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