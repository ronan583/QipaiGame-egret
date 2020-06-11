module game.ermj {
	export class ErmjMenu extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjMenu.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public menuGroup: eui.Group;
		public withdrawBtn: IButton;
		public helpBtn: IButton;
		public settingBtn: IButton;
		public backBtn: IButton;
		public upBtn: IButton;
		public downBtn: IButton;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPopMenu, this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingBtn, this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
			this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdraw, this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);
		}

		public onCheckFocus(event: egret.TouchEvent) {
			if (!this.isThis(event.target)) {
				this.hideMenu(event);
			}
		}

		public isThis(target) {
			if (!target) return false;
			if (target == this.stage || target == null) {
				return false;
			}
			if (target != this) {
				return this.isThis(target.parent);
			} else {
				return true;
			}
		}

		public onSettingBtn() {
			var settingPanel: ErmjSetPanel = new ErmjSetPanel();

			PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
		}

		public onHelp(event) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.ERMJ);
		}

		public onWithdraw(event) {
			if (RoomManager.getInstance().curRoomData.gameLevel == 0) {
				CommonUtil.noticeMsg("体验场不能进行取款操作！");
				return;
			}
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.ERMJ);
		}

		private onBack() {
			if (game.RoomManager.getInstance().curRoomData == null) {
				// GameLayerManager.gameLayer().panelLayer.removeChildren();
				AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ERMJ_BATTLE_UI);
				return;
			}
			let curRoomData: RoomData = game.RoomManager.getInstance().curRoomData;
			if (curRoomData.status == game.GameStatus.RUNNING) {
				if (curRoomData.gameLevel == 0) {
					BattleLeaveTips.showTips({
						"text": "您还在游戏中，是否退出房间",
						"callback": (data: any) => {
							RoomRequest.leaveRoom(game.ChildGameType.ERMJ);
						},
						"callbackObject": this,
						"effectType": 0,
						"tipsType": TipsType.OkAndCancel
					});
				} else {
					TipsUtils.showTipsFromCenter("当前游戏阶段无法退出游戏");
				}

			} else {
				RoomRequest.leaveRoom(game.ChildGameType.ERMJ);
			}
		}

		public onPopMenu(event) {
			if (this.menuGroup.y != -this.menuGroup.height) return;
			egret.Tween.get(this.menuGroup).to({ y: 85 }, 500);
			this.upBtn.visible = true;
			this.downBtn.visible = false;
		}

		public hideMenu(event) {
			if (this.menuGroup.y != 85) return;
			egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height }, 500);
			this.upBtn.visible = false;
			this.downBtn.visible = true;
		}
	}
}