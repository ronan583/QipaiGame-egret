module game.brnn {
	export class BrnnResultUI extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public closeBtn : IButton;
		public moneyLabel : eui.Label;
		public downTimeLabel : eui.BitmapLabel;
		public bankerHead : BrnnResultHeadIcon;
		public selfHead : BrnnResultHeadIcon;
		public otherHead1 : BrnnResultHeadIcon;
		public otherHead2 : BrnnResultHeadIcon;
		public otherHead3 : BrnnResultHeadIcon;		
		private battleStartCountDown:game.BattleStartCountDown;


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.battleStartCountDown = new game.BattleStartCountDown();
			this.battleStartCountDown.countDownLabel = this.downTimeLabel;
			this.downTimeLabel.touchEnabled = false;
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		}

		private closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
		}
		public showUI(brnnPlayerArr)
		{
			
			//5秒
			if(brnnPlayerArr[0].money > 0)
			{
				// this.currentState = "win";

				BrnnSoundPlayer.instance.playWin();
			}else if(brnnPlayerArr[0].money < 0)
			{
				// this.currentState = "lose";
				BrnnSoundPlayer.instance.playLose();
			}else
			{
				// this.currentState = "tie";
				BrnnSoundPlayer.instance.playValid();
			}
			this.moneyLabel.text = brnnPlayerArr[0].money;
			this.selfHead.InitUI(brnnPlayerArr[0]);
			this.bankerHead.InitUI(brnnPlayerArr[1]);
			for(var i = 1 ; i <= 3; i++)
			{
				if(brnnPlayerArr.length >= i + 2)
				{
					this["otherHead" + i].visible = true;
					this["otherHead" + i].InitUI(brnnPlayerArr[i+1]);
				}else
				{
					this["otherHead" + i].visible = false;
				}
			}
			this.battleStartCountDown.startCountDown(5);
			egret.setTimeout(function(){
				PopUpManager.removePopUp(this);
			},this,5000);
		}
	}
}