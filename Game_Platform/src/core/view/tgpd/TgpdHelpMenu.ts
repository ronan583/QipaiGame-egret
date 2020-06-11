module game.tgpd {
	export class TgpdHelpMenu extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public menuGroup: eui.Group;
		public bankBtn: IButton;
		public backBtn: IButton;
		public helpBtn: IButton;
		public settingBtn: IButton;
		public upBtn: IButton;
		public downBtn: IButton;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtn, this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);

			this.menuGroup.alpha = 0;
		}


		public onCheckFocus(event: egret.TouchEvent) {
			if (!this.isThis(event.target)) {
				this.hideMenu(event);
			}
		}

		public isThis(target) {
			if (!target) return false;
			if (target == this.stage) {
				return false;
			}
			if (target != this) {
				return this.isThis(target.parent);
			} else {
				return true;
			}
		}

		public onSettingBtn(event: egret.TouchEvent) {
			// game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BCBM);
			let settingPanel: CandySetting = new CandySetting();
			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
			this.hideMenu(event);

		}

		public onBank(event: egret.TouchEvent) {
			if (CandyData.instance.enterRoomLevel == 0) {
				TipsUtils.showTipsFromCenter("体验场不能进行取款操作！");
			} else {
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.TGPD); 
			}
			this.hideMenu(event);
		}

		public onHelp(event: egret.TouchEvent) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.TGPD); 
			this.hideMenu(event);
		}

		private onBack(event: egret.TouchEvent) {
			let level = CandyData.instance.gameLevel;
			if (level == 0) {
            	TgpdRequest.requestExitGame(false);
				//AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_EXIT_UI);
			} else {
				let candyExitPanel: CandyExitPanel = new CandyExitPanel();
				PopUpManager.addPopUp(candyExitPanel, true, 0, 0, 1);
			}


			// let candyExitPanel: CandyExitPanel = new CandyExitPanel();
			// PopUpManager.addPopUp(candyExitPanel, true, 0, 0, 1);
		}

		public onPopMenu(event: egret.TouchEvent) {
			egret.Tween.removeTweens(this.menuGroup);
			this.menuGroup.visible = true;
			this.menuGroup.alpha = 0;
			this.menuGroup.y = this.upBtn.y;
			egret.Tween.get(this.menuGroup).to({ y: this.height }, 300, egret.Ease.backOut);
			egret.Tween.get(this.menuGroup).to({ alpha: 1 }, 200);
			this.upBtn.visible = true;
			this.downBtn.visible = false;
		}

		public hideMenu(event: egret.TouchEvent) {
			egret.Tween.removeTweens(this.menuGroup);
			egret.Tween.get(this.menuGroup).to({ y: this.upBtn.y , alpha: 0}, 200).call(()=>{
				this.menuGroup.visible = false;
			});
			// egret.Tween.get(this.menuGroup).to({ alpha: 0 }, 150);
			this.upBtn.visible = false;
			this.downBtn.visible = true;
		}
	}
}