module game.bcbm {
	export class BcbmMenu extends eui.Component implements eui.UIComponent {
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

		public isSelfBet: boolean = false;
		public isResultShown: boolean = false;
		public isBanker: boolean = false;

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

		public menuInitDefault() {
			this.isSelfBet = false;
			this.isResultShown = false;
			this.isBanker = false;
		}

		public onCheckFocus(event: egret.TouchEvent) {
			if (!this.isThis(event.target)) {
				this.hideMenu(event);
			}
		}

		public isThis(target: any) {
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

		public onSettingBtn(event : egret.TouchEvent ) {
			// game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BCBM);
			let settingPanel: BcbmSettingPanel = new BcbmSettingPanel();
			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
			this.hideMenu(event);
		}

		public onBank(event: egret.TouchEvent) {
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BCBM);
			this.hideMenu(event);
		}

		public onHelp(event: egret.TouchEvent) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BCBM);
			this.hideMenu(event);
		}

		private onBack(event: egret.TouchEvent) {
			this.hideMenu(event);
			console.error("------ did you bet? ", this.isSelfBet);
			console.error("------ does result show? ", this.isResultShown);
			console.error("------ room status ", game.RoomManager.getInstance().curRoomData.status);
			if (this.isBanker) {
				TipsUtils.showTipsFromCenter("您当前是庄家，无法退出房间，请下庄后再试！");
			} 
			else if (game.RoomManager.getInstance().curRoomData.status == game.GameStatus.RUNNING && this.isSelfBet && !this.isResultShown) {
				BattleLeaveTips.showTips({
					"text": "您当前已下注，退出房间后仍然会计算胜负，是否退出房间？",
					"callback": (data: any) => {
						RoomRequest.leaveRoom(game.ChildGameType.BCBM);
					},
					"callbackObject": this,
					"effectType": 0,
					"tipsType": TipsType.OkAndCancel
				});
			} 
			else {
				RoomRequest.leaveRoom(game.ChildGameType.BCBM);
			}
		}

		public onPopMenu(event: egret.TouchEvent) {
			// if(!this.status)
			// {
			// TgpdSoundPlayer.instance.playerButton();
			egret.Tween.get(this.menuGroup).to({ y: 90 }, 200);
			egret.Tween.get(this.menuGroup).to({ alpha: 1 }, 50);
			this.upBtn.visible = true;
			this.downBtn.visible = false;
			// }
		}

		public hideMenu(event : egret.TouchEvent) {
			// TgpdSoundPlayer.instance.playerButton();
			egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height }, 200);
			egret.Tween.get(this.menuGroup).to({ alpha: 0 }, 150);
			this.upBtn.visible = false;
			this.downBtn.visible = true;
		}
	}
}