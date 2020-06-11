module game.hhdz {
	export class HhdzHeadMaxIcon extends HhdzHeadIcon {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzHeadMaxIconSkin.exml";
		}

		public winTween: egret.tween.TweenGroup;
		public coseTween: egret.tween.TweenGroup;

		public bg_k: eui.Image;
		public headImg: eui.Image;
		public vipImg: eui.Image;
		public maskRect: eui.Rect;

		public nameLab: eui.Label;
		public moneyLab: eui.BitmapLabel;
		public winTipLabel: eui.BitmapLabel;
		public loseTipLabel: eui.BitmapLabel;
		private shensuanziPos:eui.Group;
		public titleAnim: DragonAnim;
		public side:number = 0;
		private headBg:eui.Image;

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.headImg.mask = this.maskRect;
			if (Number(this.name) == 2) {
				this.titleAnim.playerTimes(null, null, 0, "xianzhi");
			} else {
				this.titleAnim.playerTimes(null, null, 0, "dafuwen");
			}
		}


		public show(bg_k: number, headNum: number, vipLevel: number, name: string, money: number): void {
			this.visible = true;
			this.headImg.source = "head_json.gp_head_" + (headNum + 1);
			this.vipImg.source = "hhdz_V" + vipLevel ;
			this.nameLab.text = name;
			this.moneyLab.text = CommonUtil.fixMoneyFormat(money);
		}

		protected showPlayer(playerInfo:PlayerInfo) {
			this.show(playerInfo.headFrameNum, playerInfo.headNum, playerInfo.vipLevel, playerInfo.nickName, playerInfo.money)
		}

		public updateMoney(money: number): void {
			this.moneyLab.text = CommonUtil.fixMoneyFormat(money);
		}

		public showMoneyAnim(money: number) {
			if (money > 0) {
				this.winTipLabel.visible = true;
				this.winTipLabel.text = "+" + CommonUtil.fixMoneyFormat(money) + "元";
				this.winTween.play(1);
				this.showWinAnim();
			} else if (money < 0) {
				this.loseTipLabel.visible = true;
				this.loseTipLabel.text = CommonUtil.fixMoneyFormat(money) + "元";
				this.coseTween.play(1);
			}
		}

		public getShensuzniStartPoint():egret.Point {
			if(this.shensuanziPos) {
				return this.shensuanziPos.localToGlobal(0,0);
			}
			return null;
		}

	}
}