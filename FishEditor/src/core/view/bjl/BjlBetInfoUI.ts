module game.bjl {
	export class BjlBetInfoUI extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public betLabel : eui.BitmapLabel;
		public selfBetGroup : eui.Group;
		public selfBetLabel : eui.BitmapLabel;
		public no1BetFlag : eui.Image;

		private betValue = 0;
		private selfBet = 0;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.reset();
		}

		public reset()
		{
			this.betValue = 0;
			this.selfBet = 0;
			// this.no1BetFlag.visible;
			this.betLabel.text = "";
			this.selfBetGroup.visible = this.no1BetFlag.visible = false;;
		}

		public updateSelfRetInfo(selfRetNum)
		{
			this.selfBet += selfRetNum;
			egret.log("updateSelfRetInfo..........." + selfRetNum);
			if(this.selfBet > 0)
			{
				this.selfBetGroup.visible = true;
			}
			this.selfBetLabel.text = this.selfBet.toFixed(0);
		}

		public updateTotalRetInfo(retNum)
		{
			this.betValue += retNum;
			if(this.betValue > 0) this.betLabel.visible = true;
			this.betLabel.text = this.betValue.toString();
		}
	}
}