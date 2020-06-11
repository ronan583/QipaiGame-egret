module game.lhdz {
	export class NLhdzStartPanel extends RoomUI{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/lhdz/NLhdzStartPanel.exml";
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
        private roomItem1:LhdzRoomItem;
        private roomItem2:LhdzRoomItem;
        private roomItem3:LhdzRoomItem;
        private roomGroup1:eui.Group;
        private roomGroup2:eui.Group;
        private roomGroup3:eui.Group;
        private quickAnim:DragonAnim;

        public onZjcxBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.LHDZ);
        }

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomGroup1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.roomGroup2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.roomGroup3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem3, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.refreshInfo();
            this.init();
		}

        protected addToStage() {
            super.addToStage();
            this.refreshInfo();
            this.init();
        }

        private checkClickAreaValid(e:egret.TouchEvent, targetDis:egret.DisplayObject):boolean {
            let p = targetDis.globalToLocal(e.stageX, e.stageY);
            if(p.x > targetDis.width || p.x < 0 || p.y > targetDis.height || p.y < 0) return false;
            return true;
        }

        private onQuickStart(e:egret.TouchEvent) {
            let p = this.quickAnim.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.quickAnim.width || p.x < 0 || p.y > this.quickAnim.height || p.y < 0) return;
            game.QuickStart.instance.quickStart(ChildGameType.LHDZ);
        }

		private onItem1(e:egret.TouchEvent) {
            if(this.checkClickAreaValid(e, this.roomGroup1)) {
                RoomRequest.sendEnterRoomInfo(ChildGameType.LHDZ, 1);
            }
		}

		private onItem2(e:egret.TouchEvent) {
            if(this.checkClickAreaValid(e, this.roomGroup2)) {
                RoomRequest.sendEnterRoomInfo(ChildGameType.LHDZ, 2);
            }
		}

		private onItem3(e:egret.TouchEvent) {
            if(this.checkClickAreaValid(e, this.roomGroup3)) {
                RoomRequest.sendEnterRoomInfo(ChildGameType.LHDZ, 3);
            }
		}

		private onGoldAdd() {
            // game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.LHDZ);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.LHDZ);
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
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_LHDZ_START_UI);
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