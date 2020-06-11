module game.bjl {
	export class BjlTouchArea extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public winTween : egret.tween.TweenGroup;
		public upTween : egret.tween.TweenGroup;
		public downTween : egret.tween.TweenGroup;
		public lightIcon : eui.Image;
		public stakeAreaGroup : eui.Group;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.lightIcon.alpha = 0;
			this.lightIcon.pixelHitTest = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin , this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd , this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap , this);
		}

		public playWin()
		{
			TweenUtils.playAnimation(this.winTween,false);
		}

		public onBegin(event)
		{
			if(this.lightIcon.alpha == 0)
			{
				egret.Tween.get(this.lightIcon).to({alpha : 1 }, 350).call(function(){
				
				},this);
			}
		}
		public onEnd(event)
		{
			// if(this.lightIcon.alpha == 1)
			// {
				egret.Tween.get(this.lightIcon).to({alpha : 0 }, 350).call(function(){
					
				},this);
			// }
		}

		public onTap(event)
		{

		}
	}
}