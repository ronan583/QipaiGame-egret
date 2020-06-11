module game.lhdz {
	export class LhdzStartAnimation extends eui.Component implements eui.UIComponent{
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
			TweenUtils.playAnimation(this.startAnim , false);

			LhdzSoundPlayer.instance.playAlert();
			setTimeout(function() {
			}, 1000);
			egret.setTimeout(function(){
				if(this.parent == null)
				{
					return;
				}

				LhdzSoundPlayer.instance.playShow();
				LhdzSoundPlayer.instance.playStartBet();
			},this, 1000);
		}
	}
}