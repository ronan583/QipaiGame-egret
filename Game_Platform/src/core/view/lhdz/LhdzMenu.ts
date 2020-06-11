module game.lhdz {
	export class LhdzMenu extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		public menuGroup: eui.Group;
		public bankBtn: IButton;
		public backBtn: IButton;
		public helpBtn: IButton;
		public settingBtn: IButton;
		public upBtn: IButton;
		public downBtn: IButton;

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtn, this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBank, this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);

		}

		public onCheckFocus(event: egret.TouchEvent) {
			if (!this.isThis(event.target)) {
				this.hideMenu(event);
			}
		}

		public isThis(target) {
			if (target == this.stage || target == this.bankBtn || target == this.settingBtn || target == this.helpBtn || target == this.backBtn || target == null) {
				return false;
			}
			if (target != this) {
				return this.isThis(target.parent);
			} else {
				return true;
			}
		}

		public onSettingBtn() {
			this.hideMenu(null);
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.LHDZ);
		}

		public onBank(event) {
			this.hideMenu(null);
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.LHDZ);
		}

		public onHelp(event) {
			this.hideMenu(null);
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.LHDZ);
		}

		private onBack() {
			if (LhdzData.isSelfBanker()) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试");
				return;
			}
			if (LhdzData.isSelfStake == true) {
				BattleLeaveTips.showTips({
					"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间?",
					"callback": (data: any) => {
						RoomRequest.leaveRoom(game.ChildGameType.LHDZ);
					},
					"callbackObject": this,
					"effectType": 0,
					"tipsType": TipsType.OkAndCancel
				});
				return;
			}
			RoomRequest.leaveRoom(game.ChildGameType.LHDZ);
		}

		public onPopMenu(event) {
			egret.Tween.removeTweens(this.menuGroup);
			// egret.Tween.get(this.menuGroup).to({ y: 115 }, 200);
			this.menuGroup.visible = true;
			this.menuGroup.alpha = 1;
			this.menuGroup.y = 115;
			this.upBtn.visible = true;
			this.downBtn.visible = false;
		}

		public hideMenu(event) {
			if (this.menuGroup.y == 115) {
				egret.Tween.get(this.menuGroup).to({ y: 0, alpha: 0 }, 200).call(() => {
					this.menuGroup.visible = false;
					this.upBtn.visible = false;
					this.downBtn.visible = true;
				});
			}
		}
	}
}