module game.brnn {
	export class BrnnTips extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}
		public clockAnim:DragonAnim;

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public tipLabel : eui.Image;
		public countLabel : eui.BitmapLabel;
		private showLabel:eui.Label;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.touchEnabled = this.touchChildren = false;
			// this.tipLabel.addEventListener(eui.UIEvent.RESIZE , this.onResize , this);	
		}

		public setTipsLabelContent(tipSource:string):void{
			this.showLabel.text = tipSource;
		}

		public initUI(tipSource , countNum)
		{
			//0x1FC4D3 兰色
			// this.tipLabel.source = tipSource;
			// this.tipLabel.validateNow();
			this.showLabel.text = tipSource;
			this.countLabel.text = countNum;
			// this.countLabel.x = this.tipLabel.width + this.tipLabel.x + 10;
		}
		
		public onResize(event : eui.UIEvent)
		{
			this.countLabel.x = this.tipLabel.width + this.tipLabel.x + 10;
		}
	}
}