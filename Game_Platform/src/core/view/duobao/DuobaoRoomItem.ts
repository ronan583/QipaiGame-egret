class DuobaoRoomItem extends eui.Component implements  eui.UIComponent {
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
		this.commonDB = new game.CommonDBLoop2(this.anim + "_ske_dbbin", this.anim + "_tex_json", this.anim + "_tex_png", "animation", this.isloop);
		this.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		if(this.aligntype == "bottom") {
			this.commonDB.y = this.height;
		} else if(this.aligntype == "middle") {
			this.commonDB.y = this.height / 2;
		}
		this.commonDB.x = this.width / 2;

		this.refresh();
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

	public playerOnce() {
		this.commonDB.playOnce();
	}
	private stateArr:Array<string> = ["bjln_kongxian", "bjln_yongji", "bjln_baomao"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0,3)];
	}
	public refresh() {
		this.randomState();
		if(this.gameLevel == 0) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			// this.limitLabel.text = "5000y";
			this.limitLabel.text = "200y"
		} else if(this.gameLevel == 1) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "300y";
		} else if(this.gameLevel == 2) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "500y";
		} else if(this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			this.limitLabel.text = "500y";
		}
	}
	
}