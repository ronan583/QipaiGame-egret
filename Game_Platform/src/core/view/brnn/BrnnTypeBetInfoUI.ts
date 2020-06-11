module game.brnn {
	export class BrnnTypeBetInfoUI extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public areaIndex:number = 0;
		public bgImage : eui.Image;
		public totalBetNumLabel : eui.BitmapLabel;
		public selfBetNumLabel : eui.BitmapLabel;
		public no1BetFlag : eui.Image;
		public selfBetFlag : eui.Image;
		public selfBetInfo : eui.Group;
		private areaImg:eui.Image;
		private betValue = 0;
		private selfBetValue = 0;
		private shensuanziPos:eui.Group;
		private shensuanziAnim:DragonAnim;
		private _hasFlagDuShen:boolean = false;
		public set hasFlagDuShen(v:boolean) {
			this._hasFlagDuShen = v;
		}
		public get hasFlagDuShen():boolean {
			return this._hasFlagDuShen;
		}

		public get SelfBetNumber()
		{
			return this.selfBetValue;
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.reset();
			this.areaImg.source = "brnn_area_bg_" + this.areaIndex.toFixed(0);
			this.shensuanziAnim.visible = false;
		}

		public reset()
		{
			this.betValue = 0;
			this.selfBetValue = 0;
			this.totalBetNumLabel.text = "";
			this.selfBetInfo.visible = this.no1BetFlag.visible = false;
			this.hasFlagDuShen = false;
			this.shensuanziAnim.visible = false;
		}

		public updateSelfRetInfo(selfRetNum)
		{
			this.selfBetValue+= selfRetNum;
			if(this.selfBetInfo.visible == false && this.selfBetValue != 0)
			{
				this.selfBetInfo.visible = true;
			}
			this.selfBetNumLabel.text = this.selfBetValue.toFixed(0);
		}

		public showTotalRetInfo(totalValue:number) {
			if(totalValue  <= 0) {
				this.totalBetNumLabel.visible = false;
			} else {
				this.totalBetNumLabel.visible = true;
			}
			this.betValue = totalValue;
			this.totalBetNumLabel.text = totalValue.toString();
		}

		public updateTotalRetInfo(retNum)
		{
			this.betValue += retNum;
			this.totalBetNumLabel.text = this.betValue.toString();
		}

		public getShensuanziPos():egret.Point {
			if(this.shensuanziPos) {
				return this.shensuanziPos.localToGlobal(this.shensuanziPos.width / 2, this.shensuanziPos.height / 2);
			}
			return null;
		}

		public showShensuanziAnim() {
			this.shensuanziAnim.visible = true;
			this.shensuanziAnim.playerOnce();
		}
	}
}