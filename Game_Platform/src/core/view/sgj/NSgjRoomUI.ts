module game.fruit {
	export class NSgjRoomUI extends RoomUI{
		public constructor() {
			super(ChildGameType.FRUIT);
			this.skinName = "resource/eui_skins/fruit/NSgjRoomUI.exml";
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public backBtn:eui.Button;
        public helpBtn:eui.Button;
        private contentGroup:eui.Group;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftCornerGroup:eui.Group;
        private quickStartGroup:eui.Group;

        private roomItem1:SgjRoomItem;
        private roomItem2:SgjRoomItem;
        private roomItem3:SgjRoomItem;
        private roomItem4:SgjRoomItem;
        private roomItem5:SgjRoomItem;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem3, this);
            this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem4, this);
            // this.roomItem5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem5, this);
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
		    game.QuickStart.instance.quickStart(ChildGameType.FRUIT);
        }

		private onItem1() {
            SoundMenager.instance.PlayClick();
            game.sgj.FruitData.instance.enterRoomLevel = 0
            RoomRequest.sendEnterRoomInfo(ChildGameType.FRUIT, 0);
		}

		private onItem2() {
            SoundMenager.instance.PlayClick();
            game.sgj.FruitData.instance.enterRoomLevel = 1
            RoomRequest.sendEnterRoomInfo(ChildGameType.FRUIT, 1);
		}

		private onItem3() {
            SoundMenager.instance.PlayClick();
            game.sgj.FruitData.instance.enterRoomLevel = 2
            RoomRequest.sendEnterRoomInfo(ChildGameType.FRUIT, 2);
		}

        private onItem4() {
            SoundMenager.instance.PlayClick();
            game.sgj.FruitData.instance.enterRoomLevel = 3
            RoomRequest.sendEnterRoomInfo(ChildGameType.FRUIT, 3);
        }

        private onItem5() {
            SoundMenager.instance.PlayClick();
            game.sgj.FruitData.instance.enterRoomLevel = 4
            RoomRequest.sendEnterRoomInfo(ChildGameType.FRUIT, 4);
        }

		private onGoldAdd() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.FRUIT);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            SoundMenager.instance.PlayClick();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.FRUIT);
        }
		
		public onOpenChargePanel(event)
        {
            SoundMenager.instance.PlayClick();
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
        }

		public showUI()
		{
			// this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		private onBackHall()
		{
            SoundMenager.instance.PlayClick();
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_SGJ_ROOM_UI);
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

        public refreshPool(poolMoneys:Array<number>):void {
            /*
            for(let i=0;i<this.moneyArr.length;i++) {
                this.moneyArr[i].text = poolMoneys[i].toFixed(0);
            }
            */
        }
	}
}  