module game.brnn {
	export class NBrnnStartPanel extends RoomUI{
		public constructor() {
			super(ChildGameType.BRNN);
			this.skinName = "resource/eui_skins/brnn/NBrnnStartPanel.exml";
		}
		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public backBtn:eui.Button;
        public helpBtn:eui.Button;
        public zjcxBtn:eui.Button;
        private contentGroup:eui.Group;
        private animGroup:eui.Group;
        private anim:DragonAnim;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftCornerGroup:eui.Group;
        private quickStartGroup:eui.Group;
        private roomItem1:BrnnRoomItem;
        private roomItem2:BrnnRoomItem;
        private roomItem3:BrnnRoomItem;
        private quickStartAnim:DragonAnim;

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.BRNN);
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
            this.quickStartAnim.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
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
            game.QuickStart.instance.quickStart(ChildGameType.BRNN);
        }

		private onItem1(e:egret.TouchEvent) {
            let p = this.roomItem1.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.roomItem1.width || p.x < 0 || p.y > this.roomItem1.height || p.y < 0) return; 
            this.selectGameLevel = 1;
            RoomRequest.sendEnterRoomInfo(ChildGameType.BRNN, 1);
		}

		private onItem2(e:egret.TouchEvent) {
            let p = this.roomItem2.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.roomItem2.width || p.x < 0 || p.y > this.roomItem2.height || p.y < 0) return; 
            this.selectGameLevel = 2;
            RoomRequest.sendEnterRoomInfo(ChildGameType.BRNN, 2);
		}

		private onItem3(e:egret.TouchEvent) {
            let p = this.roomItem3.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.roomItem3.width || p.x < 0 || p.y > this.roomItem3.height || p.y < 0) return; 
            this.selectGameLevel = 3;
            RoomRequest.sendEnterRoomInfo(ChildGameType.BRNN, 3);
		}

		private onGoldAdd() {
            SoundMenager.instance.PlayClick();
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BRNN);
        }

		public refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BRNN);
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
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BRNN_START_UI);
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

        private afterAnim() {
            /*
            this.animGroup.visible = false;
            this.contentGroup.visible = true;
            this.leftCornerGroup.visible = true;
            this.quickStartGroup.visible = true;
            */
        }

		public initUI(data)
		{
			
		}

	}
}