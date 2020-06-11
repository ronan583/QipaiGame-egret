module game.hhdz {
	export class HhdzHeadMinIcon extends HhdzHeadIcon {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzHeadMinIconSkin.exml";
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this.headImg.mask = this.maskRect;
		}

		public maskRect: eui.Rect;
		public winTween: egret.tween.TweenGroup;
		public coseTween: egret.tween.TweenGroup;
		public bg_d: eui.Image;
		public bg_k: eui.Image;
		public headImg: eui.Image;
		public vipImg: eui.Image;
		public nameLab: eui.Label;
		public winTipLabel: eui.BitmapLabel;
		public loseTipLabel: eui.BitmapLabel;
		private headBg:eui.Image;

		public show(bg_k: number, headNum: number, vipLevel: number, name: string): void {
			this.visible = true;
			this.headImg.source = "head_json.gp_head_" + headNum;
			this.vipImg.source = "hhdz_V" + vipLevel;
			this.nameLab.text = name;
		}

		public showPlayer(playerInfo:game.PlayerInfo) {
			this.show(playerInfo.headFrameNum, playerInfo.headNum, playerInfo.vipLevel, playerInfo.nickName)
		}

		public showMoneyAnim(money: number, totalMoney: number) {
			if (money > 0) {
				this.winTipLabel.visible = true;
				this.winTipLabel.text = "+" + money.toFixed(2) + "元";
				this.winTween.play(1);
				this.showWinAnim();
			} else if (money < 0) {
				this.loseTipLabel.visible = true;
				this.loseTipLabel.text = money.toFixed(2) + "元";
				this.coseTween.play(1);
			}
		}

	}
}