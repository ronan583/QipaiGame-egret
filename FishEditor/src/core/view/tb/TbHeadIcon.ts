module game.tb {
	export class TbHeadIcon extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbHeadIconSkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public gold:eui.BitmapLabel;
		public playerName:eui.Label;
		public playerInfo : game.PlayerInfo;
		public vipLevelIcon : eui.Image;
		public otherBg:eui.Image

		public posFlag:number = 0;
		private addBtn:IButton;

		public posGroup:eui.Group;

		protected childrenCreated():void
		{
			super.childrenCreated();
			if(this.addBtn) {
				this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddClick, this);
			}
		}

		private onHeadClick():void {
			PlayerInfoPanel.Instance.showPlayerInfo(this.playerInfo.playerId, this, this.posFlag);
		}

		private onAddClick() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DiceBao);
		}

		public ShowPlayerHead(playerInfo:game.PlayerInfo):void {
			this.playerInfo = playerInfo;
			// CommonUtil.setNextFrameCall(this.nextTickShow, this);
			this.gold.text = CommonUtil.fixMoneyFormat(this.playerInfo.money);
			this.playerName.text = this.playerInfo.nickName;
			egret.log("ShowPlayerHead player info money : " + this.playerInfo.money)
		}
		public nextTickShow()
		{
			// this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
			// this.headFrameImg.source = "gp_headframe_0_" + (playerInfo.headNum < 6 ? 2: 1);
			this.gold.text = CommonUtil.fixMoneyFormat(this.playerInfo.money);//this.playerInfo.money.toFixed(2);
			this.playerName.text = this.playerInfo.nickName;
			
		}

		public UpdatePlayerHead(tbPlayer : TbPlayer)
		{
			this.gold.text = CommonUtil.fixMoneyFormat(tbPlayer.totolMoney);
			this.playerName.text = tbPlayer.playerName;
			egret.log("UpdatePlayerHead player info money : " + tbPlayer.totolMoney)
		}

		public ShowBanker(isBanker:boolean) :void {
			// this.bankerImg.visible = isBanker;
		}

		public showImmGold(gold:number):void {
			this.gold.text = CommonUtil.fixMoneyFormat(gold);
			egret.log("showImmGold player info money : " + gold)
		}
		
		// public showWin(win:number):void {
		// 	this.winTip.visible = true;
		// 	this.winTip.x = 0;
		// 	this.winTip.y = 0;
		// 	this.winTipLabel.text = "+" + win.toFixed(2) + "y";
		// 	var tw:egret.Tween = egret.Tween.get(this.winTip);
		// 	var target = this.winTip;
		// 	tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
		// 		target.visible = false;
		// 	});
		// }

		// public showLose(lose:number):void {
		// 	this.loseTip.visible = true;
		// 	this.loseTip.x = 0;
		// 	this.loseTip.y = 0;
		// 	if(lose > 0)
		// 	{
		// 		this.loseTipLabel.text = "-" + lose.toFixed(2) + "y";
		// 	}else
		// 	{
		// 		this.loseTipLabel.text = lose.toFixed(2) + "y";
		// 	}
		// 	var tw:egret.Tween = egret.Tween.get(this.loseTip);
		// 	var target = this.loseTip;
		// 	tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
		// 		target.visible = false;
		// 	});
		// }
	}
}