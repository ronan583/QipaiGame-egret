module game.brnn {
	export class BrnnHeadIcon extends eui.Component implements eui.UIComponent{
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
		public bankerImg:eui.Image;
		// public bankerText : eui.Image;
		public playerInfo : game.PlayerInfo;
		public vipLevelIcon : eui.Image;
		public loseTip:eui.Group;
		public winTip:eui.Group;
		public loseTipLabel:eui.Label;
		public winTipLabel:eui.Label;

		public posFlag:number = 0;
		private specialFrame:eui.Group;
		private fuhaoFrameImg:eui.Image;
		private dushenFrameImg:eui.Image;
		private dushenAnim:DragonAnim;
		private fuhaoAnim:DragonAnim;
		private posFlagGroup:eui.Group;
		private originX:number = 0;
		// 1 头像在左边 2 头像在右边
		public side:number = 1;
		private shensuanziPos:eui.Group;
		private headChangeAnim:DragonAnim;
		private gameVipLabel:eui.BitmapLabel;
		protected childrenCreated():void
		{
			super.childrenCreated();
			// this.headIconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
			this.originX = this.x;
			if(this.headChangeAnim) this.headChangeAnim.visible = false;
		}

		private onHeadClick():void {
			PlayerInfoPanel.Instance.showPlayerInfo(this.playerInfo.playerId, this, this.posFlag);
		}

		public getHeadPos() : egret.Point{
			if(this.posFlagGroup) {
				return this.posFlagGroup.localToGlobal(this.posFlagGroup.width / 2, this.posFlagGroup.height / 2);
			} else {
				return this.headIconImg.localToGlobal(this.headIconImg.width / 2, this.headIconImg.height / 2);
			}
		}

		public showPlayerHeadExcludeSpecial(playerInfo:game.PlayerInfo) {
			this.playerInfo = playerInfo;
			this.headIconImg.source = "gp_head_" + (this.playerInfo.headNum + 1);
			this.gold.text = CommonUtil.fixMoneyFormat(this.playerInfo.money);
			this.playerName.text = this.playerInfo.nickName;
			this.visible = true;
		}

		public ShowPlayerHead(playerInfo:game.PlayerInfo):void {
			this.visible = true;
			if(playerInfo.postion == 3) {
				this.specialFrame.visible = true;
				this.fuhaoAnim.visible = true;
				this.dushenAnim.visible = false;
				this.fuhaoFrameImg.visible = true;
				this.dushenFrameImg.visible = false;
			} else if(playerInfo.postion == 2) {
				this.specialFrame.visible = true;
				this.fuhaoAnim.visible = false;
				this.dushenAnim.visible = true;
				this.fuhaoFrameImg.visible = false;
				this.dushenFrameImg.visible = true;
			} else {
				if(this.specialFrame) this.specialFrame.visible = false;
			}
			let isShowChange = false;
			if(playerInfo.postion >= 2 && playerInfo.postion <= 5) {
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

		public UpdatePlayerHead(brnnPlayer : BrnnPlayer)
		{
			this.headIconImg.source = "gp_head_" + (brnnPlayer.headNum + 1);
			this.gold.text = CommonUtil.fixMoneyFormat(brnnPlayer.totolMoney);
			this.playerName.text = brnnPlayer.playerName;
		}

		public ShowBanker(isBanker:boolean) :void {
			this.bankerImg.visible = isBanker;
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

		public stakeEffect() {
			egret.Tween.removeTweens(this);
			this.x = this.originX;
			let targetX = (this.side == 1?20:-20) + this.originX;
			egret.Tween.get(this).to({x:targetX}, 150).call(
				()=>{
					egret.Tween.get(this).to({x:this.originX}, 150);
				}, this
			)
			return targetX;
		}

		public getShensuzniStartPoint():egret.Point {
			if(this.shensuanziPos) {
				return this.shensuanziPos.localToGlobal(0,0);
			}
			return null;
		}

		public test() {
			this.headChangeAnim.visible = true;
			this.headChangeAnim.playerOnce(()=>{
				this.headChangeAnim.visible = false;
			}, this);
		}

		public clearPlayerInfo() {
			this.playerInfo = null;
		}
	}
}