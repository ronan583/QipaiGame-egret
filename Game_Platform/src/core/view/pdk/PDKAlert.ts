module game {
	export class PDKAlert extends eui.UILayer {
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
			this.anim.touchChildren = false;
			this.anim.touchEnabled = false;
			this.anim.width = 70;
			this.anim.height = 70;
			this.width = 70;
			this.height = 70;
		}

		public play() {
			this.anim.playAnim("animation");
		}
	}
}