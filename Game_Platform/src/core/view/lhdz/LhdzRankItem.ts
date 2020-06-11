module game.lhdz {
	export class LhdzRankItem extends eui.Component implements eui.UIComponent, eui.IItemRenderer {
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

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public selected: boolean;
		public itemIndex:number;
		private _data:any;
		public set data(cellData:any) {
			this._data = cellData;
			this.updateView(cellData);
		}

		public get data():any {
			return this._data;
		}

		private updateView(data:any) {
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