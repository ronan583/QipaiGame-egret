module game.bcbm {
	export class BcbmRankItem extends eui.Component implements eui.UIComponent, eui.IItemRenderer{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bcbm/BcbmRankItem.exml"
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headFrameIcon: eui.Image;
		public headIcon: eui.Image;
		public playerName: eui.Label;
		public playerMoney: eui.Label;
		protected childrenCreated(): void{
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
			this.playerName.text = this.data.nickName;
			//console.warn("----------- name is " + this.playerName.text);
			this.headIcon.source = "gp_head_" + (this.data.headNum + 1);
			this.playerMoney.text = CommonUtil.convertMonetShow(this.data.money);
		}
	}
}