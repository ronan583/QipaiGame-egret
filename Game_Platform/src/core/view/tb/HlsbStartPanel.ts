module game.tb {
	export class HlsbStartPanel extends RoomUI{
		public constructor() {
			super(ChildGameType.DiceBao);
			this.skinName = "resource/eui_skins/tb/HlsbStartPanel.exml";
		}
		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public backBtn:eui.Button;
        public helpBtn:eui.Button;
        public zjcxBtn:eui.Button;
        private contentGroup:eui.Group;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftCornerGroup:eui.Group;
        private quickStartGroup:eui.Group;
        private roomItem1:HlsbRoomItem;
        private roomItem2:HlsbRoomItem;
        private roomItem3:HlsbRoomItem;

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.DiceBao);
        }

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
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
            this.init();
            this.refreshInfo();
        }

        public refreshPlayerInfo() {
			this.refreshInfo();
		}

        private onQuickStart() {
            game.QuickStart.instance.quickStart(ChildGameType.DiceBao);
        }


        private onItem1() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.DiceBao, 1);
		}

		private onItem2() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.DiceBao, 2);
		}

		private onItem3() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.DiceBao, 3);
		}

		private onGoldAdd() {
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DiceBao);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DiceBao);
        }
		
		public onOpenChargePanel(event)
        {
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DiceBao);
        }

		public showUI()
		{
			// this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		private onBackHall()
		{
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TB_START_UI);
		}

		private init() {
            /*
            this.animGroup.visible = true;
            this.contentGroup.visible = false;
            this.leftCornerGroup.visible = false;
            this.quickStartGroup.visible = false;
            this.anim.playerOnce();
            CommonUtil.registerTimeOut(this.afterAnim, this, 1800);
            */
        }

		public initUI(data)
		{
			
		}

	}
}