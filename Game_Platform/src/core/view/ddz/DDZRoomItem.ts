class DDZRoomItem extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.refresh();
	}

	public gameLevel:number = 0;
	private gameLevelImg:eui.Image;
	private freeImg:eui.Image;
	private stateImg:eui.Image;
	private infoGroup:eui.Group;
	private infoLabel:eui.BitmapLabel;

	private stateArr:Array<string> = ["ddzn_icon_kongxian", "ddzn_icon_guobao", "ddzn_icon_yongji"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0,3)];
	}
	public refresh() {
		this.randomState();
		if(this.gameLevel == 0) {
			this.gameLevelImg.source = "ddzn_tiyan";
			this.freeImg.visible = true;
			this.infoGroup.visible = false;

		} else if(this.gameLevel == 1) {
			this.gameLevelImg.source = "ddzn_1";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.infoLabel.text = "0.05y";
		} else if(this.gameLevel == 2) {
			this.gameLevelImg.source = "ddzn_20";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.infoLabel.text = "0.5y";
		} else if(this.gameLevel == 3) {
			this.gameLevelImg.source = "ddzn_50";
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.infoLabel.text = "1y";
		}
	}
}