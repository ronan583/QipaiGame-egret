module game.hhdz {
	export class HhdzFlyCoin extends eui.Image {
		public constructor(source?: string | egret.Texture) {
			super(source);
			this.anchorOffsetX = 23;
			this.anchorOffsetY = 25;
		}

		public value:number;
		public type:number = 0;
		public allocPlayerId:number = 0;
	}
}