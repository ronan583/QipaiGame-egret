module game {
	export class AnimEvent extends egret.Event{
		public static ANIM_CLICK:string = "ANIM_CLICK"
		public constructor() {
			super(AnimEvent.ANIM_CLICK, false, true, null);
		}
	}
}