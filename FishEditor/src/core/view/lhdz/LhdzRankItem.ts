module game.lhdz {
	export class LhdzRankItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headFrameIcon: eui.Image;
		public palyerType: eui.Image;
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
			this.palyerName.text = this.data.nickName;
			this.headIcon.source = "gp_head_" + (this.data.headNum + 1);
			this.palyerMoney.text = CommonUtil.convertMonetShow(this.data.money);
			if (this.data.type == 0) {
				this.palyerType.source = "lhdz_battle_json.lhdz_online_calculation";
			} else if (this.data.type == 1) {
				this.palyerType.source = "lhdz_battle_json.lhdz_online_ wealthy";
			} else {
				this.palyerType.source = "";
			}
			if (this.palyerName.x != null && this.palyerType.width) {
				this.palyerType.x = this.palyerName.x - this.palyerType.width;
			}
		}
	}
}