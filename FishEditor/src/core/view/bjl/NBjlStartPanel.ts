module game.bjl {
	export class NBjlStartPanel extends RoomUI{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bjl/NBjlStartPanel.exml";
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public backBtn:eui.Button;
        public helpBtn:eui.Button;
        public zjcxBtn:eui.Button;
        private contentGroup:eui.Group;
        private anim:DragonAnim;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftCornerGroup:eui.Group;
        private quickStartGroup:eui.Group;

        private roomItem1:BjlRoomItem;
        private roomItem2:BjlRoomItem;
        private roomItem3:BjlRoomItem;

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.BJL);
        }        

		protected childrenCreated():void
		{
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
            this.init();
            this.refreshInfo();
        }

		private onQuickStart() {
		    game.QuickStart.instance.quickStart(ChildGameType.BJL);
        }

		private onItem1() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.BJL, 1);
		}

		private onItem2() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.BJL, 2);
		}

		private onItem3() {
            RoomRequest.sendEnterRoomInfo(ChildGameType.BJL, 3);
		}

		private onGoldAdd() {
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BJL);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BJL);
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
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BJL_START_UI);
		}

		private init() {
        }

        private afterAnim() {
            this.contentGroup.visible = true;
            this.leftCornerGroup.visible = true;
            this.quickStartGroup.visible = true;
        }

        public refreshPlayerInfo() {
			this.refreshInfo();
		}

		public initUI(data)
		{
			
		}
	}
}  