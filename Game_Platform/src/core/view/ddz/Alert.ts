module game {
	export class Alert extends eui.UILayer {
		public constructor() {
			super();

			this.touchEnabled = false;
			this.touchChildren = false;
		}

		private anim: game.CommonDBLoop2;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.anim = new game.CommonDBLoop2("ddzwarning_ske_dbbin", "ddzwarning_tex_json", "ddzwarning_tex_png", "armature");
			this.addChild(this.anim);
			this.anim.x = 23;
			this.anim.y = 32;
			this.anim.touchChildren = false;
			this.anim.touchEnabled = false;
		}

		public play() {
			this.anim.playAnim("animation");
		}
	}
}