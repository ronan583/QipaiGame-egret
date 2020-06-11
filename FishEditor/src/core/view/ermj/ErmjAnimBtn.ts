module game.ermj {
	export class ErmjAnimBtn extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public dragonAnim: DragonAnim;

		public buttons: eui.Image;
		public icon: string = "";

		public anim: string = "";
		public isloop: boolean = true;
		public aligntype: string = "";
		public playOnStage: boolean = true;
		public defaultPlayAnim: string = "animation";
		private commonDB: game.CommonDBLoop2;

		protected childrenCreated(): void {
			super.childrenCreated();

			this.buttons.source = this.icon;
			this.addChildAt(this.buttons, 0);

			this.commonDB.playOnce();
		}

		public init(icon, anim) {
			this.icon = icon;

			this.anim = anim;
			this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", this.defaultPlayAnim, this.isloop, this.playOnStage);
			this.addChildAt(this.commonDB, 0);
			this.commonDB.width = 160;
			this.commonDB.height = 160;
			this.commonDB.x = 80;
			this.commonDB.y = 80;
			this.commonDB.touchChildren = false;
			this.commonDB.touchEnabled = false;
		}
	}
}