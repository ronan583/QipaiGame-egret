class SgjRoomItem extends eui.Component implements  eui.UIComponent {
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
		this.animGroup.addChildAt(this.commonDB, 0);
		this.commonDB.touchChildren = this.commonDB.touchEnabled = false;
		if(this.aligntype == "bottom") {
			this.commonDB.y = this.height;
		} else if(this.aligntype == "middle") {
			this.commonDB.y = this.animGroup.height / 2;
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
	private zhunruImg:eui.Image;
	private animGroup:eui.Group;
	private levelImg:eui.Image;

	public playerOnce() {
		this.commonDB.playOnce();
	}
	private stateArr:Array<string> = ["fruitn_kongxian", "fruitn_yongji", "fruitn_huobao"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0,3)];
	}
	public refresh() {
		this.randomState();
		if(this.gameLevel == 0) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			// this.limitLabel.text = "5000y";
			//this.limitLabel.text = "200y"
			this.zhunruImg.source = "fruitn_mianfei"
			this.levelImg.source = "fruitn_bg_tiyan"
		} else if(this.gameLevel == 1) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			//this.limitLabel.text = "300y";
			this.zhunruImg.source = "fruitn_zhunru10"
			this.levelImg.source = "fruitn_bg_chuji"
		} else if(this.gameLevel == 2) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			//this.limitLabel.text = "500y";
			this.zhunruImg.source = "fruitn_zhunru500"
			this.levelImg.source = "fruitn_bg_zhongji"
		} else if(this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			//this.limitLabel.text = "500y";
			this.zhunruImg.source = "fruitn_zhunru1000"
			this.levelImg.source = "fruitn_bg_gaoji"
		} else if(this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = true;
			//this.limitLabel.text = "500y";
			this.zhunruImg.source = "fruitn_zhunru1000"
			this.levelImg.source = "fruitn_bg_gaoji"
		}
	}
	
}