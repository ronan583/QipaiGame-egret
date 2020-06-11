module game.bcbm {
	export class BcbmOnlinePlayerPanel extends ResizePanel implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bcbm/BcbmOnlinePlayerPanel.exml"
			CommonUtil.bindOtherAreaTouchClose(this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}	


		public playerListGroup: eui.Group;
		public closeBtn: IButton;
		public onlineNum: eui.Label;
		public scroller: eui.Scroller;
		public confirmBtn: IButton;

		private rankItem: BcbmRankItem;

		protected childrenCreated(): void{
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.scroller.verticalScrollBar.autoVisibility = false;
			this.scroller.verticalScrollBar.visible = false;			
			this.scroller.horizontalScrollBar.autoVisibility = false;
			this.scroller.horizontalScrollBar.visible = false;
			this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckFocus, this);
		}

		protected addToStage() {
			super.addToStage();
			egret.setTimeout(() => {
				this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
			}, this, 100);
		}

		public initPlayerList(rankInfos: any){
			while(this.playerListGroup.numChildren > 0){
				this.playerListGroup.removeChildAt(0);
			}
			let rankItem: BcbmRankItem;
			for(let i = 0; i < rankInfos.length; i++){
				rankItem = new BcbmRankItem();
				this.playerListGroup.addChild(rankItem);
				rankItem.initData(rankInfos[i]);
			}
			this.onlineNum.text = rankInfos.length + "在线";
		}

		public onCheckFocus(event: egret.TouchEvent) {
			if (!this.isThis(event.target)) {
				this.closePanel(event);
			}
		}

		public isThis(target) {
			if(!target) return false;
			if (target == this.stage) {
				return false;
			}
			if (target != this) {
				return this.isThis(target.parent);
			} else {
				return true;
			}
		}

		private stageClick(e:egret.TouchEvent) {
			if(!this.hitTestPoint(e.stageX, e.stageY, true)) {
				PopUpManager.removePopUp(this);
			}
		}		

		private closePanel(e: egret.TouchEvent){
			PopUpManager.removePopUp(this, 1);
		}
	}
}