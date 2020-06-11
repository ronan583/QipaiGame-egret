module game.duobao {
	export class NDuobaoRoomUI extends RoomUI{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/duobao/DuobaoRoomPanel.exml";
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
        private headMaskImg:eui.Image;
        private goldAddBtn:eui.Button;
        private leftCornerGroup:eui.Group;
        private quickStartGroup:eui.Group;

        private roomItem1:eui.Group;
        private roomItem2:eui.Group;
        private roomItemTouch1:eui.Group;
        private roomItemTouch2:eui.Group;
        private tiyanAnim: DragonAnim;
        private putongAnim: DragonAnim;
        public isAnimPlay:boolean = true;

        private animGroup:eui.Group;
        private curtainAnim:DragonAnim;


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
            this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
            this.headImg.mask = this.headMaskImg;
            this.refreshInfo();
            this.init();

		}

        protected addToStage() {
            super.addToStage();
            this.init();
            this.refreshInfo();
        }

		private onQuickStart() {
            let money = UserService.instance.money;
            if (money > 10) {
                this.curtainDownAnim(() => {
                    DuobaoData.instance.enterRoomLevel = 1;
                    DuobaoRequest.sendEnterGame(1);
                }, this);
            } else {
                this.curtainDownAnim(()=>{
                    DuobaoData.instance.enterRoomLevel = 0;
                    DuobaoRequest.sendEnterGame(0);
                },this);
            }
        }

		private onItem1(e:egret.TouchEvent) {
            SoundMenager.instance.PlayClick();
            let p = this.roomItem1.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.roomItem1.width || p.x < 0 || p.y > this.roomItem1.height || p.y < 0) return; 
            this.curtainDownAnim(()=>{
                DuobaoData.instance.enterRoomLevel = 0;
                DuobaoRequest.sendEnterGame(0);
            },this);
		}

		private onItem2(e:egret.TouchEvent) {
            SoundMenager.instance.PlayClick();
             if (UserService.instance.money < 10) {
                TipsUtils.moneyTipsGame(this, 10);
                return;
            }
            let p = this.roomItem2.globalToLocal(e.stageX, e.stageY);
            if(p.x > this.roomItem2.width || p.x < 0 || p.y > this.roomItem2.height || p.y < 0) {
                return;
            }
            this.curtainDownAnim(()=>{
                DuobaoData.instance.enterRoomLevel = 1;
                DuobaoRequest.sendEnterGame(1);
            },this)
		}

		private onGoldAdd() {
            SoundMenager.instance.PlayClick();
	    	game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DUOBAO);
        }

		private refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }

		private obHelpClick() {
            SoundMenager.instance.PlayClick();
		    AppFacade.getInstance().sendNotification(PanelNotify.SHOW_DUOBAO_HELP_UI);
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

        public curtainDownAnim(func: Function, funcObj: any) {
            //this.func = func;
            //this.funcObj = funcObj;
            console.error("-----------anim curtainAnim");
            this.animGroup.visible = true;
            this.curtainAnim.playerOnce(() => {
                if(func) func.call(funcObj);
                // this.animGroup.visible = false;
                this.curtainAnim.stop();
            });
        }        

		private onBackHall()
		{
            SoundMenager.instance.PlayClick();
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_ROOM_UI);
		}

		private init() {
            // if(!this.isAnimPlay){
            //     this.afterAnim();
            //     return;
            // } 
            //this.animGroup.visible = true;
            
            this.contentGroup.visible = true;
            this.leftCornerGroup.visible = true;
            this.quickStartGroup.visible = true;

            this.tiyanAnim.touchChildren = this.tiyanAnim.touchChildren = false;  
            this.putongAnim.touchChildren = this.putongAnim.touchChildren = false;  
            this.tiyanAnim.isTouchByGroup = true;
            this.putongAnim.isTouchByGroup = true;
            this.animGroup.visible = false;            
            // this.anim.playerOnce();
            // CommonUtil.registerTimeOut(this.afterAnim, this, 1000);
        }

        private afterAnim() {
            //this.animGroup.visible = false;
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