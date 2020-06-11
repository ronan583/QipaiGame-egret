module game.brnn {
	export class BrnnResultHeadIcon extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public headIconImg : eui.Image;
		public headFrameImg : eui.Image;
		public nameLabel : eui.Label;
		public moneyLabel : eui.Label;

		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public InitUI(brnnPlayer : BrnnPlayer)
		{
			this.headIconImg.source = "head_icon_" + brnnPlayer.headNum;
			this.headFrameImg.source = "frame_" + brnnPlayer.headFrameNum + "_png";
			this.nameLabel.text = brnnPlayer.playerName;
			this.moneyLabel.text = brnnPlayer.money.toFixed(2);
		}
	}
}