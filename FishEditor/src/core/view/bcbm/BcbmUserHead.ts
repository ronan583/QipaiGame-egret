module game.bcbm {
	export class BcbmUserHead extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headImg: eui.Image;
		public genderFrame: eui.Image;
		public goldNum: eui.BitmapLabel;
		public nameLabel: eui.Label;
		public vipLabel: eui.BitmapLabel;

		public goldPushBtn: eui.Button;
		public bankerIcon: eui.Image;

		//public playerType: number;	//0 banker 1 self
		public playerInfo: game.PlayerInfo;

		public isSelfBanker: boolean = false;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.headImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
			this.goldPushBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChargeBtn, this);
		}

		private onHeadClick(){

		}
		private onChargeBtn(){
			console.error("is banker ", this.isSelfBanker);
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BCBM);
			// if(this.isSelfBanker){
			// 	TipsUtils.showTipsFromCenter("您当前正在参与游戏，结算前暂时无法使用银行功能");
			// } else{
			// 	game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BCBM);
			// }
		}

		public ShowPlayerHead(info: game.PlayerInfo): void{
			this.playerInfo = info;
			// if(info.postion == 0) this.playerType = 0;
			// else this.playerType = 1;
		
			CommonUtil.setNextFrameCall(this.nextTickShow, this);
		}

		public nextTickShow(){
			this.headImg.source = "gp_head_" + (this.playerInfo.headNum + 1);
			if(this.playerInfo.city.length > 4){
				this.nameLabel.text = this.playerInfo.city.substring(0, 4) + "..."
			} else{
				this.nameLabel.text = this.playerInfo.city;
			}
			this.goldNum.text = CommonUtil.fixMoneyFormat(this.playerInfo.money);
			console.error("------------", this.goldNum.text);
			this.vipLabel.text = "V" + this.playerInfo.vipLevel;
		}

		public UpdatePlayerHead(player: BcbmPlayer) {
			this.headImg.source = "gp_head_" + (player.headNum + 1);
			// this.headFrameImg.source = "gp_headframe_0_" + (lhdzPlayer.headNum < 6 ? 2 : 1);
			// this.goldNum.text = CommonUtil.moneyFormat(lhdzPlayer.totolMoney);
			// if (this.currentState != 'self' && this.playerInfo.nickName.length > 4) {
			// 	this.playerName.text = this.playerInfo.nickName.substring(0, 3) + "...";
			// } else {
			// 	this.playerName.text = this.playerInfo.nickName;
			// }
		}

		public showImmGold(gold: number): void{
			console.error("-----------", gold);
			this.goldNum.text = CommonUtil.fixMoneyFormat(gold);
		}

		public showWin(win: number): void{

		}

		public showLose(lose: number): void{
			
		}
	}
}