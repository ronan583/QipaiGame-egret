module game.tb {
	export class TbOpenCapAnim extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public capGroup : egret.tween.TweenGroup;
		public resetGroup : egret.tween.TweenGroup;
		public touziIcon1 : eui.Image;
		public touziIcon2 : eui.Image;
		public touziIcon3 : eui.Image;

		protected childrenCreated():void
		{
			super.childrenCreated();
		}

		public startTouziAnim(touziValue1 : number,touziValue2 : number ,touziValue3 : number)
		{
			//显示摇晃动画
			TweenUtils.playAnimation(this.capGroup , false);
			this.touziIcon1.source = "tbGame_json.tb" + touziValue1;
			this.touziIcon2.source = "tbGame_json.tb" + touziValue2;
			this.touziIcon3.source = "tbGame_json.tb" + touziValue3;
		}

		public resetAnim()
		{
			TweenUtils.playAnimation(this.resetGroup , false);
		}
	}
}