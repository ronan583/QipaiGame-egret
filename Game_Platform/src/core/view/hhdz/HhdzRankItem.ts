module game.hhdz {
	export class HhdzRankItem extends eui.Component implements eui.UIComponent, eui.IItemRenderer  {
		public constructor() {
			super();
		}

		public nameLab: eui.Label;
		public moneyLab: eui.Label;
		public headKImg: eui.Image;
		public headImg: eui.Image;
		public maskRect: eui.Rect;
		private dushenFlag:eui.Image;
		private fuhaoFlag:eui.Image;
		private flag:number = -1;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this.headImg.mask = this.maskRect;
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

		public updateView(data: any) {
			this.nameLab.text = data.nickName;
			this.moneyLab.text =  CommonUtil.moneyFormatNoDecimal(data.money);
			this.headImg.source = "head_json.gp_head_" + (data.headNum + 1);
			this.dushenFlag.visible = data['flag'] == 0;
			this.fuhaoFlag.visible = data['flag'] == 1;
		}

	}
}