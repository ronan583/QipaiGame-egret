module game.bjl {
	export class BjlMenu extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public menuGroup : eui.Group;
		public bankBtn : IButton;
		public helpBtn : IButton;
		public settingBtn : IButton;
		public backBtn : IButton;
		public upBtn : IButton;
		public downBtn : IButton;

		public bjlBattleScene:BjlBattleScene;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPopMenu , this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu , this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtn , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelp , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBank , this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall , this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);

		}
		
		public onCheckFocus(event:egret.TouchEvent)
		{
			if(!this.isThis(event.target))
			{
				this.hideMenu(event);
			}
		}

		private onBank() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI,game.ChildGameType.BJL);
		}
		
		private onBackHall()
		{
			this.hideMenu(null);
			if(this.bjlBattleScene.bjlData && this.bjlBattleScene.bjlData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			/*
			if(this.bjlData && this.bjlData.isSelfBet) {
				TipsUtils.showTipsFromCenter("当前游戏未结束，无法退出房间");
				return;
			}
			*/
			RoomRequest.leaveRoom(game.ChildGameType.BJL);
		}


		public isThis(target)
		{
			if(!target) return false;
			if(target == this.stage)
			{
				return false;
			}
			if(target != this)
			{
				return this.isThis(target.parent);
			}else
			{
				return true;
			}
		}

		public onSettingBtn()
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BJL);
		}

		public onHelp(event)
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BJL); 
		}
		
		public onHistory(event)
		{
			//			
			RoomRequest.reqZJCXInfo(ChildGameType.BJL);

		}
		public onPopMenu(event)
		{
			this.menuGroup.alpha = 1;
			egret.Tween.get(this.menuGroup).to({y : 92 }, 200);
			this.upBtn.visible = true;
			this.downBtn.visible = false;
		}

		public hideMenu(event)
		{
			egret.Tween.get(this.menuGroup).to({y : -this.menuGroup.height, alpha:0}, 200);
			this.upBtn.visible = false;
			this.downBtn.visible = true;
		}

	}
}