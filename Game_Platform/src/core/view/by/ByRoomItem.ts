class ByRoomItem extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public anim:string = "";
	public aligntype:string = "";
	public limit:number = 0;
	public max:number = 0;
	public gameLevel:number = 0;
	public isloop:boolean = true;
	private commonDB:game.CommonDBLoop2;
	private limitLabel:eui.BitmapLabel;
	private maxLimitLabel:eui.BitmapLabel;
	private freeImg:eui.Image;
	private stateImg:eui.Image;
	private infoGroup:eui.Group;
	private gameLevelImg:eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "animation", this.isloop);
		this.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		if(this.aligntype == "bottom") {
			this.commonDB.y = this.height;
		} else if(this.aligntype == "middle") {
			this.commonDB.y = this.height / 2;
		}
		this.commonDB.x = this.width / 2;
		this.commonDB.scaleX = this.commonDB.scaleY = 1.5;
		this.refresh();
	}
	private stateArr:Array<string> = ["nby_kongxian", "nby_yongji", "nby_huobao"];
	private gameLevelLabels:Array<string> = ["nby_tiyan","nby_chuji","nby_zhongji","nby_gaoji"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0,3)];
	}
	public refresh() {
		this.randomState();
		if(this.gameLevel == 0) {
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
			this.gameLevelImg.source = "nby_tiyan"
			this.limitLabel.text = "50元"
		} else if(this.gameLevel == 1) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "0.1元";
			this.gameLevelImg.source = "nby_chuji"
		} else if(this.gameLevel == 2) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "10元";
			this.gameLevelImg.source = "nby_zhongji"
		} else if(this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "100元";
			this.gameLevelImg.source = "nby_gaoji"
		}
	}

	public refreshItem(item:game.GameRuleItem) {
		if(item.gameLevel == 0) {
			this.freeImg.visible = true;
			this.infoGroup.visible = false;
		} else {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
		}

		this.limitLabel.text = item.minMoney + "元";
		this.gameLevelImg.source = this.gameLevelLabels[item.gameLevel]
	}
}