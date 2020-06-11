module game.ermj {
	export class ErmjHeadIcon extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjHeadIcon.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headIconImg: eui.Image;
		// public headFrameImg:eui.Image;
		public bankerIcon: eui.Image;
		public gold: eui.Label;
		public playerName: eui.Label;
		public playerInfo: game.PlayerInfo;
		public vip: eui.BitmapLabel;
		public posFlag: number = 0;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.headIconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
		}

		private onHeadClick(): void {
			PlayerInfoPanel.Instance.showPlayerInfo(this.playerInfo.playerId, this, this.posFlag);
		}

		public ShowPlayerHead(playerInfo: game.PlayerInfo): void {
			this.playerInfo = playerInfo;
			this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
			// this.headFrameImg.source = "gp_headframe_0_" + (playerInfo.headNum < 6 ? 2: 1);
			this.gold.text = CommonUtil.fixMoneyFormat(playerInfo.money);
			this.playerName.text = playerInfo.nickName;
			this.vip.text = "V" + playerInfo.vipLevel;
		}

		public UpdatePlayerHead(playerInfo: game.PlayerInfo) {
			this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
			// this.headFrameImg.source = "gp_headframe_0_" + (playerInfo.headNum < 6 ? 2: 1);
			this.gold.text = CommonUtil.fixMoneyFormat(playerInfo.money);
			this.playerName.text = playerInfo.nickName;
			this.vip.text = "V" + playerInfo.vipLevel;
		}

		public showImmGold(gold: number): void {
			this.gold.text = CommonUtil.fixMoneyFormat(gold);
		}
	}
}