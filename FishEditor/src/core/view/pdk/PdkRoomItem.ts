class PdkRoomItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.roomImg.touchEnabled = false;
		this.refresh();
	}
	public gameLevel: number = 0;
	public group: eui.Group;
	public roomImg: eui.Image;
	private freeImg: eui.Image;
	private stateImg: eui.Image;
	private infoGroup: eui.Group;
	private limitLabel: eui.Label;

	private stateArr: Array<string> = ["pdkn_kongxian", "pdkn_yongji", "pdkn_baoman"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0, 3)];
	}
	public refresh() {
		this.randomState();
		if (this.gameLevel == 0) {
			this.roomImg.source = "pdkn_tiyan";
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
		} else if (this.gameLevel == 1) {
			this.roomImg.source = "pdkn_chuji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "50y";
		} else if (this.gameLevel == 2) {
			this.roomImg.source = "pdkn_zhongji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "500y";
		} else if (this.gameLevel == 3) {
			this.roomImg.source = "pdkn_gaoji";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "1000y";
		}
	}
}