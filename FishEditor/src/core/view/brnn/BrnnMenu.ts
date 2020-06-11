module game.brnn {
	export class BrnnMenu extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public menuGroup : eui.Group;
		public historyBtn : IButton;
		public helpBtn : IButton;
		public settingBtn : IButton;
		public upBtn : IButton;
		public downBtn : IButton;
		private status = false;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPopMenu , this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu , this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingBtn , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelp , this);
			this.historyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHistory , this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);

		}
		
		public onCheckFocus(event:egret.TouchEvent)
		{
			if(!this.isThis(event.target))
			{
				this.hideMenu(event);
			}
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
			var settingPanel : SettingPanel = new SettingPanel();

			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
		}

		public onHelp(event)
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BRNN); 
		}
		
		public onHistory(event)
		{
			//
			RoomRequest.reqZJCXInfo(ChildGameType.BRNN);
		}
		public onPopMenu(event)
		{
			// if(!this.status)
			// {
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.menuGroup).to({y : 75 }, 500);
				this.status = true;
				this.upBtn.visible = true;
				this.downBtn.visible = false;
			// }
		}

		public hideMenu(event)
		{
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.menuGroup).to({y : -this.menuGroup.height}, 500);
				this.status = false;
				this.upBtn.visible = false;
				this.downBtn.visible = true;
		}

	}
}