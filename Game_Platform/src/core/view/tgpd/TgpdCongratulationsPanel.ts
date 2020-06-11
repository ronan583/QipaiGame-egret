module game.tgpd {
	export class TgpdCongratulationsPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public totalPointLabel : eui.BitmapLabel;

		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public showPanel(state , totalPoint:number)
		{
			var pointStr:string = totalPoint.toFixed(2);
			// for(var i = 0 ; i < pointStr.length; i++)
			// {
			// 	egret.setTimeout()
			// }
			this.currentState = state;
			this.totalPointLabel.text = totalPoint.toFixed(0);
			egret.setTimeout(function(){
				PopUpManager.removePopUp(this,0);
			},this,6000);
		}
	}
}