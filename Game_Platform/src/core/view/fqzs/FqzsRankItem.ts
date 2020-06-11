module game.fqzs {
	export class FqzsRankItem extends eui.Component implements eui.UIComponent, eui.IItemRenderer {
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