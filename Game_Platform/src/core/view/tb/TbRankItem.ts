module game.tb {
	export class TbRankItem extends eui.Component implements eui.UIComponent, eui.IItemRenderer {
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public headIcon : eui.Image;
		public nameLabel : eui.Label;
		public moneyLabel : eui.Label;
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
			this.headIcon.source = "gp_head_" + (data.headNum + 1);
			this.nameLabel.text = CommonUtil.limitName(data.nickName, 3);
			this.moneyLabel.text = CommonUtil.moneyFormatNoDecimal(data.money);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public init(data)
		{
			this.data = data;
			if(this.headIcon) {
				this.headIcon.source = "gp_head_" + (data.headNum + 1);
				this.nameLabel.text = CommonUtil.limitName(data.nickName, 3);
				this.moneyLabel.text = CommonUtil.moneyFormatNoDecimal(data.money);
			}
		}
	}
}