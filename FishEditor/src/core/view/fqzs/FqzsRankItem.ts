module game.fqzs {
	export class FqzsRankItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/fqzs/FqzsRankItem.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headFrameIcon: eui.Image;
		public headIcon: eui.Image;
		public palyerName: eui.Label;
		public palyerMoney: eui.Label;
		private data: any;
		private isInit = false;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.isInit = true;
			if (this.data != null) {
				this.initItem();
			}
		}
		public initData(rank, data: any) {
			this.data = data;
			if (this.isInit) {
				this.initItem();
			}
		}

		public initItem() {
			this.palyerName.text = this.data.city;
			this.headIcon.source = "gp_head_" + (this.data.headNum + 1);
			if (!this.data.money) {
				this.palyerMoney.visible = false;
			} else {
				this.palyerMoney.visible = true;
				this.palyerMoney.text = CommonUtil.convertMonetShow(this.data.money);
			}
		}
	}
}