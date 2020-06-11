module game.hhdz {
	export class HhdzStartAnimation extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public startAnim : egret.tween.TweenGroup;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.touchEnabled = false;
		}


		public startPlayerAnimation()
		{
			this.visible = true;
			this.startAnim.stop();
			
			HhdzSoundPlayer.instance.playAlert();
			egret.setTimeout(function() {
				TweenUtils.playAnimation(this.startAnim , false);
			}, this,1000);
			egret.setTimeout(function(){
				if(this.parent == null)
				{
					return;
				}

				HhdzSoundPlayer.instance.playShow();
				HhdzSoundPlayer.instance.playStartBet();
			},this, 1250);
		}
	}
}