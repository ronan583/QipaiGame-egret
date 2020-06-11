module game.ermj {
	export class ErmjStartPanel extends RoomUI implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjStartPanel.exml";
		}

		private goldLabel: eui.BitmapLabel;
		private nameLabel: eui.Label;
		private headImg: eui.Image;
		private goldAddBtn: eui.Button;
		public backBtn: eui.Button;
		public helpBtn: eui.Button;
		private contentGroup: eui.Group;
		private leftupGroup: eui.Group;
		private quickStartGroup: eui.Group;
		private scroller: eui.Scroller;

		private roomItem1: ErmjRoomItem;
		private roomItem2: ErmjRoomItem;
		private roomItem3: ErmjRoomItem;
		private roomItem4: ErmjRoomItem;

		private init() {
		}

		private afterAnim() {
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected addToStage() {
			super.addToStage();
			this.init();
			this.refreshInfo();
		}

		public refreshPlayerInfo() {
			this.refreshInfo();
		}

        public onTestBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.ERMJ);
        } 

		protected childrenCreated(): void {
			super.childrenCreated();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtn, this);
			// this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
			this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
			this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn0, this);
			this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
			this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
			this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3, this);
			this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);

			if (this.scroller.horizontalScrollBar != null) {
				this.scroller.horizontalScrollBar.autoVisibility = false;
				this.scroller.horizontalScrollBar.visible = false;
			}
			if (this.scroller.verticalScrollBar != null) {
				this.scroller.verticalScrollBar.autoVisibility = false;
				this.scroller.verticalScrollBar.visible = false;
				this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
				// console.log(this._scroller.scrollPolicyV);
			}

			this.refreshInfo();
			this.init();
		}

		private onQuickStart() {
			game.QuickStart.instance.quickStart(ChildGameType.ERMJ);
		}

		private refreshInfo() {
			let user = UserService.instance;
			this.nameLabel.text = user.name;
			this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
			this.headImg.source = "gp_head_" + (user.headNum + 1);
		}

		private obHelpClick() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.ERMJ);
		}
		private onGoldAdd() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.ERMJ);
		}

		public onBtn0(event: egret.TouchEvent) {
			this.onERMJBtnClick(0);
		}

		public onBtn1(event: egret.TouchEvent) {
			this.onERMJBtnClick(1);
		}

		public onBtn2(event: egret.TouchEvent) {
			this.onERMJBtnClick(2);
		}
		public onBtn3(event: egret.TouchEvent) {
			this.onERMJBtnClick(3);
		}

		private onERMJBtnClick(index: number): void {
			// 发送进入房间协议
			RoomRequest.sendEnterRoomInfo(game.ChildGameType.ERMJ, index);
		}

		public onBackHall() {
			egret.Tween.get(this).to({ x: this.width }, 500, egret.Ease.cubicOut);
			game.AppFacade.instance.sendNotification(PanelNotify.BACK_HALL);
			PopUpManager.removePopUp(this);
		}
	}
}