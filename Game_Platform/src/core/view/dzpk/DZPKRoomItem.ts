class DZPKRoomItem extends eui.Component implements eui.UIComponent {
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
	private maxLimitLabel: eui.BitmapLabel;
	private gameLevelImg: eui.Image;
	private freeImg: eui.Image;
	private stateImg: eui.Image;
	private infoGroup: eui.Group;
	private maxFlagImg: eui.Image;
	public playerOnce() {
		this.commonDB.playOnce();
	}

	private stateArr: Array<string> = ["dzpkn_kongxian", "dzpkn_yongji", "dzpkn_baoman"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0, 3)];
	}
	public refresh() {
		this.randomState();
		if (this.gameLevel == 0) {
			this.gameLevelImg.source = "dzpkn_tiyan";
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
			// this.limitLabel.text = "5000y";
			this.maxLimitLabel.text = "5000y"
			this.maxLimitLabel.visible = false;
			this.maxFlagImg.visible = false;
		} else if (this.gameLevel == 1) {
			this.gameLevelImg.source = "dzpkn_chuji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "50y";
			this.maxLimitLabel.text = "2000y"
			this.limitLabel.text = game.GameRuleData.Instance.getMinMoney(ChildGameType.DZPK, 1).toFixed(0) + "y";
			this.maxLimitLabel.text = game.GameRuleData.Instance.getMaxMoney(ChildGameType.DZPK, 1).toFixed(0) + "y"
		} else if (this.gameLevel == 2) {
			this.gameLevelImg.source = "dzpkn_zhongji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = game.GameRuleData.Instance.getMinMoney(ChildGameType.DZPK, 2).toFixed(0) + "y";
			this.maxLimitLabel.text = game.GameRuleData.Instance.getMaxMoney(ChildGameType.DZPK, 2).toFixed(0) + "y"
		} else if (this.gameLevel == 3) {
			this.gameLevelImg.source = "dzpkn_gaoji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = game.GameRuleData.Instance.getMinMoney(ChildGameType.DZPK, 3).toFixed(0) + "y";
			this.maxLimitLabel.text = game.GameRuleData.Instance.getMaxMoney(ChildGameType.DZPK, 3).toFixed(0) + "y"
		}
	}

}