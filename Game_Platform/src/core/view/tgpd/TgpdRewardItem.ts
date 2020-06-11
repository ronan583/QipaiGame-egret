module game.tgpd {
	export class TgpdRewardItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/tgpd/TgpdRewardItem.exml"
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			if (this.treasureId > 0) {
				//this.gemImg.source = "db_gem_" + game.GameConst.getTreasureIconIndex(this.treasureId);
				this.gemImg.source = "pic_symbol_m" + (this.treasureId % 100).toFixed(0) + "_round" + Math.floor(this.treasureId / 100).toFixed(0);
				this.moneyLabel.text = CommonUtil.convertMonetShow2(this.money);
			}
		}

		private gemImg: eui.Image;
		private moneyLabel: eui.BitmapLabel;

		private treasureId: number = 0;
		private money: number = 0;
		private eliminateCount: number = 0;

		public showInfo(treasureId: number, money: number, count: number) {
			this.treasureId = treasureId;
			this.money = money;
			this.eliminateCount = count;
			// if(this.gemImg) {
			//this.gemImg.source = "db_gem_" + game.GameConst.getTreasureIconIndex(this.treasureId);
			this.gemImg.source = "pic_symbol_m" + (treasureId % 100).toFixed(0) + "_round" + Math.floor(treasureId / 100).toFixed(0);			
			this.moneyLabel.text = "x" + count + " +" + CommonUtil.convertMonetShow2(this.money);
			// }

		}

	}
}