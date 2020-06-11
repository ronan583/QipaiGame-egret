class HhdzRoomItem extends eui.Component implements  eui.UIComponent {
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
			this.commonDB.y = this.height / 2 + this.offsetY;
		}
		this.commonDB.x = this.width / 2 + this.offsetX;

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
	private gameLevelImg:eui.Image;

	public offsetY:number = 0;
	public offsetX:number = 0;

	public playerOnce() {
		this.commonDB.playOnce();
	}
	private stateArr:Array<string> = ["hhdzn_kongxian", "hhdzn_help_yongji", "hhdzn_huobao"];
	private randomState() {
		this.stateImg.source = this.stateArr[CommonUtil.RandomRangeInt(0,3)];
	}
	public refresh() {
		this.randomState();
		if(this.gameLevel == 0) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			// this.limitLabel.text = "5000y";
			this.gameLevelImg.source = "hhdzn_putong"
			this.limitLabel.text = "50y"
		} else if(this.gameLevel == 1) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.limitLabel.text = "500y";
			this.gameLevelImg.source = "hhdzn_gaoji"
		} else if(this.gameLevel == 2) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.limitLabel.text = "2000y";
			this.gameLevelImg.source = "hhdzn_fuhao"
		} else if(this.gameLevel == 3) {
			this.freeImg.visible = false;
			this.infoGroup.visible = false;
			this.limitLabel.text = "500y";
		}
	}
	
}