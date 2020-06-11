module game.bcbm {
	export class BcbmRoomUI extends RoomUI{
		public constructor() {
			super(ChildGameType.BCBM);
			this.skinName = "resource/eui_skins/bcbm/BcbmRoomUI.exml";
		}
		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

        private testBtn: eui.Button;

        private putongTouchBtn: eui.Rect;
        private tiyanTouchBtn: eui.Rect;
        private backBtn: eui.Button;
        private helpBtn: eui.Button;
        private zjcxBtn: eui.Button;

        private zhunruLabel: eui.BitmapLabel;
        private difenLabel: eui.BitmapLabel;

        private anim1: DragonAnim;
        private anim2: DragonAnim;

        private quickStartGroup: eui.Group;
        private goldAddBtn: eui.Button;
        private headImg: eui.Image;
        private nameLabel: eui.Label;
        private goldLabel: eui.BitmapLabel;

        public PUTONG_RECOMMEND: number = 0;
        public GAOJI_RECOMMEND: number = 1000;


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            // this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            // this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            // this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem3, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.tiyanTouchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontiyanTouch, this);
            this.putongTouchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onputongTouch, this);

            this.refreshInfo();
            this.init();
		}

        protected addToStage() {
            super.addToStage();
            this.refreshInfo();
            this.init();
        }

        private onQuickStart() {
            SoundMenager.instance.PlayClick();
            // RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 1);
            let user = UserService.instance;
            if(user.money < this.GAOJI_RECOMMEND){
                RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 1);
            }else if(user.money >= this.GAOJI_RECOMMEND){
                RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 2);
            }else{
                RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 1);
            }
        }

		private ontiyanTouch() {
            SoundMenager.instance.PlayClick();
            RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 1);
		}
        private onputongTouch() {
            SoundMenager.instance.PlayClick();
            RoomRequest.sendEnterRoomInfo(ChildGameType.BCBM, 2);
		}

		private onGoldAdd() {
            SoundMenager.instance.PlayClick();
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BCBM);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            SoundMenager.instance.PlayClick();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BCBM);
        }

        public onZjcxBtn() {
            RoomRequest.sendPlayerRecord(ChildGameType.BCBM);
            //--------------------------------------
            // let result = {
            // 	"gameType": 2,
            // 	"recordInfo": [
            // 		{
            // 			"costMoney": 19000,
            // 			"createTime": "12-10 16:40",
            // 			"gameLevel": 1,
            // 			"playerId": 776,
            // 			"recordInfo": '{"otherResult":[{"cards":[[4,18,30,42,53]],"maxCard":53,"playType":0}, {"cards":[[4,22,11],[22,33]],"maxCard":53,"playType":0}],"isBanker":true,"myResult":{"cards":[[38,41,5],[47,9]],"maxCard":47,"playType":2}}'
            // 		}]
            // }
            // AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJCX_UI, result);
            //--------------------------------------
        }
		
		public onOpenChargePanel(event)
        {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
        }

		public showUI()
		{
			// this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		private onBackHall()
		{
            console.warn("=============");
            SoundMenager.instance.PlayClick();
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BCBM_ROOM_UI);
		}

		private init() {
        }

        private afterAnim() {
        }

        public refreshPlayerInfo() {
			this.refreshInfo();
		}

		public initUI(data)
		{
			
		}
	}
}