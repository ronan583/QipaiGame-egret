module game.tb {
	export class TbTypeBetInfoUI extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbTypeBetInfoUISkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		// public bgImage : eui.Image;
		public totalBetNumLabel : eui.BitmapLabel;
		public selfBetNumLabel : eui.BitmapLabel;
		// public no1BetFlag : eui.Image;
		// public selfBetFlag : eui.Image;
		// public selfBetInfo : eui.Group;

		private betValue = 0;
		private selfBetValue = 0;
		public get SelfBetNumber()
		{
			return this.selfBetValue;
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.reset();
			this.touchChildren = this.touchEnabled = false;
		}

		public reset()
		{
			this.betValue = 0;
			this.selfBetValue = 0;
			this.totalBetNumLabel.text = "0";
			this.selfBetNumLabel.text = "0";
			this.totalBetNumLabel.visible = this.selfBetNumLabel.visible = false;
		}

		public updateSelfRetInfo(selfRetNum)
		{
			if(selfRetNum > 0) {
				this.selfBetNumLabel.visible = true;
				this.selfBetNumLabel.text = CommonUtil.moneyFormat(selfRetNum);
			} else {
				this.selfBetNumLabel.visible = false;
			}
		}

		public updateTotalRetInfo(retNum)
		{
			if(retNum > 0) {
				this.totalBetNumLabel.visible = true;
				this.totalBetNumLabel.text = CommonUtil.moneyFormat(retNum);
			} else {
				this.totalBetNumLabel.visible = false;
			}
		}
	}
}