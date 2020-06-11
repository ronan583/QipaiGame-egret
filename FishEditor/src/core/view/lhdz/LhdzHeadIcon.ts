module game.lhdz {
	export class LhdzHeadIcon extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public exchangeBtn: eui.Button;
		public headbg: eui.Image;
		public headIconImg: eui.Image;

		public gold: eui.Label;
		public playerName: eui.Label;
		private gameVipLabel:eui.BitmapLabel;

		public newPlayerInfo: game.PlayerInfo;
		public playerInfo: game.PlayerInfo;
		public loseTip: eui.Group;
		public winTip: eui.Group;
		public loseTipLabel: eui.Label;
		public winTipLabel: eui.Label;

		public posFlag: number = 0;

		public isShow: boolean = false;

		public anim: string = "";
		public aligntype: string = "";
		public isloop: boolean = true;
		private commonDB: game.CommonDBLoop2;
		// 1 头像在左边 2 头像在右边
		public side: number = 1;
		private originX: number = 0;
		private headChangeAnim: DragonAnim;
		private winAnim: DragonAnim;
		private isHeadChange: boolean;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChargeBtn, this);
			this.originX = this.x;
			this.winTip.x = (this.side == 1 ? 20 : -20) + this.winTip.x;
			this.loseTip.x = (this.side == 1 ? 20 : -20) + this.loseTip.x;
			if (this.headChangeAnim) this.headChangeAnim.visible = false;
			if (this.winAnim) this.winAnim.visible = false;
			if (this.anim) {
				this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "animation", this.isloop);
				this.addChildAt(this.commonDB, 5);
				this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
				if (this.aligntype == "bottom") {
					this.commonDB.y = this.height;
				} else if (this.aligntype == "middle") {
					this.commonDB.y = this.height / 2;
				}
				this.commonDB.x = this.width / 2;
			}
		}

		private onChargeBtn() {
			game.AppFacade.instance.sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.LHDZ);
		}

		public getHeadPos(): egret.Point {
			return this.headIconImg.localToGlobal(this.headIconImg.width / 2, this.headIconImg.height / 2);
		}

		public ShowPlayerHead(playerInfo: game.PlayerInfo, isHeadChange): void {
			this.newPlayerInfo = playerInfo;
			this.isHeadChange = isHeadChange;
			CommonUtil.setNextFrameCall(this.nextTickShow, this);
		}

		public nextTickShow() {
			let isShowChange = false;
			if (this.newPlayerInfo.postion >= 2 && this.newPlayerInfo.postion <= 8) {
				if (this.playerInfo && this.playerInfo.playerId != this.newPlayerInfo.playerId && this.isHeadChange) {
					isShowChange = true;
				}
			}
			if (isShowChange) {
				this.headChangeAnim.visible = true;
				this.headChangeAnim.playerOnce(() => {
					this.headChangeAnim.visible = false;
				}, this);
				CommonUtil.registerTimeOut(() => {
					this.headIconImg.source = "gp_head_" + (this.newPlayerInfo.headNum + 1);
					this.gold.text = CommonUtil.fixMoneyFormat(this.newPlayerInfo.money);
					this.playerName.text = this.newPlayerInfo.nickName;
					this.gameVipLabel.text = this.newPlayerInfo.vipLevel.toFixed(0);
				}, this, 450);
			} else {
				this.headIconImg.source = "gp_head_" + (this.newPlayerInfo.headNum + 1);
				this.gold.text = CommonUtil.fixMoneyFormat(this.newPlayerInfo.money);
				this.playerName.text = this.newPlayerInfo.nickName;
				this.gameVipLabel.text = this.newPlayerInfo.vipLevel.toFixed(0);
			}
			this.playerInfo = this.newPlayerInfo;
		}

		public UpdatePlayerHead(lhdzPlayer: LhdzPlayer) {
			this.headIconImg.source = "gp_head_" + (lhdzPlayer.headNum + 1);
			// this.headFrameImg.source = "gp_headframe_0_" + (lhdzPlayer.headNum < 6 ? 2 : 1);
			this.gold.text = CommonUtil.fixMoneyFormat(lhdzPlayer.totolMoney);
			if (this.playerInfo) {
				if (this.currentState != 'self' && this.playerInfo.nickName.length > 4) {
					this.playerName.text = this.playerInfo.nickName.substring(0, 3) + "...";
				} else {
					this.playerName.text = this.playerInfo.nickName;
				}
			}
		}

		public showImmGold(gold: number): void {
			this.gold.text = CommonUtil.fixMoneyFormat(gold);
		}

		public reset() {
			this.isShow = false;
			this.winTip.y = 0;
			this.loseTip.y = 0;
			this.winTipLabel.text = "";
			this.loseTipLabel.text = "";
			if (this.headChangeAnim) this.headChangeAnim.visible = false;
			if (this.winAnim) this.winAnim.visible = false;
		}

		public showWin(win: number): void {
			if (this.isShow) return;
			this.isShow = true;
			this.winTip.visible = true;
			this.winTip.y = 0;
			this.winTipLabel.text = "+" + win;
			var tw: egret.Tween = egret.Tween.get(this.winTip);
			var target = this.winTip;
			tw.to({ y: -60 }, 3000, egret.Ease.sineInOut).call(() => {
				target.visible = false;
			});
			if (this.playerInfo.postion >= 2 && this.playerInfo.postion <= 8) {
				this.winAnim.visible = true;
				this.winAnim.playerOnce(() => {
					this.winAnim.visible = false;
				}, this);
			}
		}

		public showLose(lose: number): void {
			if (this.isShow) return;
			this.isShow = true;
			this.loseTip.visible = true;
			this.loseTip.y = 0;
			if (lose > 0) {
				this.loseTipLabel.text = "-" + lose;
			} else {
				this.loseTipLabel.text = lose + '';
			}
			var tw: egret.Tween = egret.Tween.get(this.loseTip);
			var target = this.loseTip;
			tw.to({ y: -60 }, 3000, egret.Ease.sineInOut).call(() => {
				target.visible = false;
			});
		}

		public stakeEffect() {
			egret.Tween.removeTweens(this);
			this.x = this.originX;
			let targetX = (this.side == 1 ? 20 : -20) + this.originX;
			egret.Tween.get(this).to({ x: targetX }, 150).call(() => {
				egret.Tween.get(this).to({ x: this.originX }, 150);
			}, this);
			return targetX;
		}

		public getShensuzniStartPoint(): egret.Point {
			if (this.commonDB) {
				return this.commonDB.localToGlobal(0, 0);
			}
			return null;
		}

		public clearPlayerInfo() {
			this.playerInfo = null;
		}
	}
}