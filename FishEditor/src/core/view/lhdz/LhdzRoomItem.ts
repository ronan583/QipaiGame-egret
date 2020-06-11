class LhdzRoomItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "animation", this.isloop);
		this.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		if (this.aligntype == "bottom") {
			this.commonDB.y = this.height;
			this.commonDB.y = this.height - 20;
		} else if (this.aligntype == "middle") {
			this.commonDB.y = this.height / 2;
			if (this.gameLevel == 2) {
				this.commonDB.y -= 10;
			}
		}
		this.commonDB.x = this.width / 2;

		this.refresh();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAnimTap, this);
	}
	public anim: string = "";
	public aligntype: string = "";
	public limit: number = 0;
	public max: number = 0;
	public gameLevel: number = 0;
	public isloop: boolean = true;
	private commonDB: game.CommonDBLoop2;
	private freeImg: eui.Image;
	private stateImg: eui.Image;

	public playerOnce() {
		this.commonDB.playOnce();
	}
	private stateArr: Array<string> = ["lhdzn_kongxian", "lhdzn_yongji", "lhdzn_baoman"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0, 3)];
	}

	private onAnimTap(e:egret.TouchEvent) {
		if(this.commonDB.animDisplay && this.commonDB.animDisplay.stage) {
			if(this.commonDB.animDisplay.hitTestPoint(e.stageX, e.stageY, true)) {
				this.dispatchEvent(new game.AnimEvent());
			} else {
				e.stopImmediatePropagation();
			}
		}
	}

	public refresh() {
		this.randomState();
	}


}