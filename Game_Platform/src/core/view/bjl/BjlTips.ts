module game.bjl {
	export class BjlTips extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public statusLabel : eui.Label;
		public countLabel : eui.BitmapLabel;
		public clockAnim:DragonAnim;

		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public initUI(status:number,countNum)
		{
			//0x1FC4D3 兰色
			this.countLabel.text = countNum;
			if(status == 0)
			{
				this.statusLabel.text = "空闲时间";
			}else if(status == 1)
			{
				this.statusLabel.text = "下注时间";
			}else if(status >= 2)
			{
				this.statusLabel.text = "开牌时间";
			}

			if(status == 4) {
				this.statusLabel.text = "发牌时间";
			}
		}
	}
}