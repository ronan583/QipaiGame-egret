module game.hhdz {
	export class HhdzMenu extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public menuGroup: eui.Group;
		public bankBtn: IButton;
		public helpBtn: IButton;
		public settingBtn: IButton;
		public backBtn: IButton;
		public upBtn: IButton;
		public downBtn: IButton;
		public openTween: egret.tween.TweenGroup;
		public closeTween: egret.tween.TweenGroup;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBtn, this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBtn, this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtn, this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtn, this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankBtn, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetingBtn, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);
		}

		public onCheckFocus(event:egret.TouchEvent)
		{
			if(!this.isThis(event.target))
			{
				this.onUpBtn(event);
			}
		}

		public isThis(target)
		{
			if(!target) return false;
			if(!target.parent) return false;
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

		public onSetingBtn(event: egret.TouchEvent) {
			/*
			var settingPanel: HhdzSetting = new HhdzSetting();
			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
			*/
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.HHDZ);
		}
		public onDownBtn(event: egret.TouchEvent) {
			egret.Tween.get(this.menuGroup).to({ y: 98 }, 500);
			this.upBtn.visible = true;
			this.downBtn.visible = false;
			this.menuGroup.visible = true;
		}

		private onBankBtn() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.HHDZ)
		}

		public onUpBtn(event: egret.TouchEvent) {
			egret.Tween.get(this.menuGroup).to({ y: -25 }, 500);
			this.upBtn.visible = false;
			this.downBtn.visible = true;
			this.menuGroup.visible = false;
		}
		public onHelpBtn(event: egret.TouchEvent) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.HHDZ);
			this.onUpBtn(null);
		}
		public onBackBtn(event: egret.TouchEvent) {
			this.upBtn.visible = false;
			this.downBtn.visible = true;
			this.menuGroup.visible = false;
			// RoomRequest.leaveRoom(ChildGameType.HHDZ);
			game.AppFacade.getInstance().sendNotification(PanelNotify.BACK_HHDZ);
		}
	}
}