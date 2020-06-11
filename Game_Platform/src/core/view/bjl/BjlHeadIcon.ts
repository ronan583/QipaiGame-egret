module game.bjl {
	export class BjlHeadIcon extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public headIconImg:eui.Image;
		public headFrameImg:eui.Image;
		public titleImage:eui.Image;
		public gold:eui.Label;
		public playerName:eui.Label;
		// public bankerImg:eui.Image;
		// public bankerText : eui.Image;
		public playerInfo : game.PlayerInfo;
		public vipLevelIcon : eui.Image;
		public loseTip:eui.Group;
		public winTip:eui.Group;
		public loseTipLabel:eui.Label;
		public winTipLabel:eui.Label;
		private addBtn:eui.Button;
		public posFlag:number = 0;

		private fuhaoGroup:eui.Group;
		private dushenGroup:eui.Group;
		private headChangeAnim:DragonAnim;
		private gameVipLabel:eui.BitmapLabel;
		private goldGroup:eui.Group;
		public side:number = 1;
		private originX:number = 0;
		private posFlagGroup:eui.Group;
		private shensuanziPos:eui.Group;
		private contentGroup:eui.Group;
		protected childrenCreated():void
		{
			super.childrenCreated();
			// this.headIconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
			if(this.addBtn) {
				this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddMoney, this);
			}
			this.originX = this.x;
			if(this.headChangeAnim) this.headChangeAnim.visible = false;
		}

		private onHeadClick():void {
			PlayerInfoPanel.Instance.showPlayerInfo(this.playerInfo.playerId, this, this.posFlag);
		}

		private onAddMoney() {
			// game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
			SoundMenager.instance.PlayClick();
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BJL);
		}

		public ShowPlayerHead(playerInfo:game.PlayerInfo):void {
			this.visible = true;
			if(playerInfo.postion == 3) {
				this.fuhaoGroup.visible = true;
				this.dushenGroup.visible = false;
				this.goldGroup.visible = true;
			} else if(playerInfo.postion == 2) {
				this.fuhaoGroup.visible = false;
				this.dushenGroup.visible = true;
				this.goldGroup.visible = true;
			} else {
				if(this.fuhaoGroup) this.fuhaoGroup.visible = false;
				if(this.dushenGroup) this.dushenGroup.visible = false;
				if(this.goldGroup) this.goldGroup.visible = false;
			}
			let isShowChange = false;
			if(playerInfo.postion >= 2 && playerInfo.postion <= 7) {
				if(this.playerInfo && this.playerInfo.playerId != playerInfo.playerId) {
					isShowChange = true;
				}
			}
			if(isShowChange) {
				this.headChangeAnim.visible = true;
				this.headChangeAnim.playerOnce(()=>{
					this.headChangeAnim.visible = false;
				}, this);
				CommonUtil.registerTimeOut(()=>{
					this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
					this.gold.text = CommonUtil.fixMoneyFormat(playerInfo.money);
					this.playerName.text = playerInfo.nickName;
					this.gameVipLabel.text = playerInfo.vipLevel.toFixed(0);
				}, this, 450);
			} else {
				this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
				this.gold.text = CommonUtil.fixMoneyFormat(playerInfo.money);
				this.playerName.text = playerInfo.nickName;
				this.gameVipLabel.text = playerInfo.vipLevel.toFixed(0);
			}
			this.playerInfo = playerInfo;
		}

		public ShowBanker(isBanker:boolean) :void {
			// this.bankerImg.visible = isBanker;
		}

		public showImmGold(gold:number):void {
			this.gold.text = CommonUtil.fixMoneyFormat(gold);
		}
		
		public showWin(win:number):void {
			this.winTip.visible = true;
			this.winTip.x = 0;
			this.winTip.y = 0;
			this.winTipLabel.text = "+" + CommonUtil.fixMoneyFormat2(win) + "y";
			var tw:egret.Tween = egret.Tween.get(this.winTip);
			var target = this.winTip;
			tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
				target.visible = false;
			});
		}

		public showLose(lose:number):void {
			this.loseTip.visible = true;
			this.loseTip.x = 0;
			this.loseTip.y = 0;
			if(lose > 0)
			{
				this.loseTipLabel.text = "-" + CommonUtil.fixMoneyFormat2(lose) + "y";
			}else
			{
				this.loseTipLabel.text = CommonUtil.fixMoneyFormat2(lose) + "y";
			}
			var tw:egret.Tween = egret.Tween.get(this.loseTip);
			var target = this.loseTip;
			tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
				target.visible = false;
			});
		}

		public getHeadPos() : egret.Point{
			if(this.posFlagGroup) {
				return this.posFlagGroup.localToGlobal(this.posFlagGroup.width / 2, this.posFlagGroup.height / 2);
			} else {
				return this.headIconImg.localToGlobal(this.headIconImg.width / 2, this.headIconImg.height / 2);
			}
		}

		public stakePosEffect(time:number) {
			if(this.contentGroup) 
			{
				egret.Tween.removeTweens(this.contentGroup);
				if(!this.playerInfo || this.playerInfo.postion == 1 || this.playerInfo.postion == 0) return;
				if(this.side == 0) return;
				this.contentGroup.x = 0;
				let targetX = (this.side == 1?20:-20);
				egret.Tween.get(this.contentGroup).to({x:targetX}, 150).call(
					()=>{
						egret.Tween.get(this.contentGroup).to({x:0}, 150);
					}, this
				)
				egret.log("play stake effect : " + this.playerInfo.postion + "  " + (this instanceof BjlHeadIcon) + "  " + time);
				return targetX;
			}
		}

		public getShensuzniStartPoint():egret.Point {
			if(this.shensuanziPos) {
				return this.shensuanziPos.localToGlobal(0,0);
			}
			return null;
		}

		public clearPlayerInfo() {
			this.playerInfo = null;
		}
	}
}