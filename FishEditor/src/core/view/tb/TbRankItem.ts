module game.tb {
	export class TbRankItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		private data:any;
		public headIcon : eui.Image;
		public nameLabel : eui.Label;
		public moneyLabel : eui.Label;

		protected childrenCreated():void
		{
			super.childrenCreated();
			if(this.data) {
				this.init(this.data);
			}
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