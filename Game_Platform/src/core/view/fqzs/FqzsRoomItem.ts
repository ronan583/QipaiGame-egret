class FqzsRoomItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/fqzs/FqzsRoomItem.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "armature", this.isloop);
		this.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		if (this.aligntype == "bottom") {
			this.commonDB.y = this.height;
			this.commonDB.y = this.height - 20;
		} else if (this.aligntype == "middle") {
			this.commonDB.y = this.height / 2;
		}
		this.commonDB.x = this.width / 2;
		this.refresh();
	}

	public anim: string = "";
	public aligntype: string = "";
	public gameLevel: number = 0;
	public isloop: boolean = true;
	private commonDB: game.CommonDBLoop2;
	private maxLimitLabel: eui.BitmapLabel;
	private freeImg: eui.Image;
	private stateImg: eui.Image;
	private infoGroup: eui.Group;

	public playerOnce() {
		this.commonDB.playOnce();
	}

	private stateArr: Array<string> = ["fqzs_kongxian", "fqzs_yongji", "fqzs_baoman"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0, 3)];
	}

	public refresh() {
		this.randomState();
		if (this.gameLevel == 0) {
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
			this.maxLimitLabel.text = "0"
		} else if (this.gameLevel == 1) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.maxLimitLabel.text = "50"
		} else if (this.gameLevel == 2) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.maxLimitLabel.text = "500"
		} else if (this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.maxLimitLabel.text = "2000"
		}
	}
}