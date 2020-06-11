class ErmjRoomItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/ermj/ErmjRoomItem.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "animation", this.isloop);
		this.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		this.commonDB.scaleX = this.commonDB.scaleY = 1.2;
		if (this.aligntype == "bottom") {
			this.commonDB.y = this.height;
		} else if (this.aligntype == "middle") {
			this.commonDB.y = this.height / 2;
		}
		this.commonDB.x = this.width / 2;

		this.refresh();
	}

	public anim: string = "";
	public aligntype: string = "";
	public limit: number = 0;
	public max: number = 0;
	public gameLevel: number = 0;
	public isloop: boolean = true;
	private commonDB: game.CommonDBLoop2;
	private limitLabel: eui.BitmapLabel;
	private gameLevelImg: eui.Image;
	private freeImg: eui.Image;
	private stateImg: eui.Image;
	private infoGroup: eui.Group;

	public playerOnce() {
		this.commonDB.playOnce();
	}

	private stateArr: Array<string> = ["ermjn_kongxian", "ermjn_yongji", "ermjn_baoman"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0, 3)];
	}

	public refresh() {
		this.randomState();
		if (this.gameLevel == 0) {
			this.gameLevelImg.source = "ermjn_tiyan";
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
			// this.limitLabel.text = "5000y";
		} else if (this.gameLevel == 1) {
			this.gameLevelImg.source = "ermjn_chuji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "50y";
		} else if (this.gameLevel == 2) {
			// this.gameLevelImg.source = "ermjn_putong";
			this.gameLevelImg.source = "ermjn_zhongji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "500y";
		} else if (this.gameLevel == 3) {
			this.gameLevelImg.source = "ermjn_gaoji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "1000y";
		}
	}

}