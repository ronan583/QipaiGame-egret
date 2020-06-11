class ResLoading extends ResizePanel implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private static _instance:ResLoading;

	public static get instance():ResLoading {
		if(!ResLoading._instance) {
			ResLoading._instance = new ResLoading();
		}
		return ResLoading._instance;
	}

	private forceDestoryTimeOutId:number = 0;

	protected childrenCreated():void
	{
		super.childrenCreated();
 		var data = RES.getRes("resloading_mc_json");
		var txtr = RES.getRes("resloading_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("resloading"));
		this.progressLabel.text = "0%";
		this.mcParent.addChild(this.mc);
		this.mc.gotoAndPlay(1);
		this.mc.play(-1);
	}

	public init():void {
		if(this.progressLabel) this.progressLabel.text = "0%";
		
	}

	private mc:egret.MovieClip;
	private mcParent:eui.Group;
	private progressLabel:eui.BitmapLabel;
	
    public onProgress(current: number, total: number): void {
		let progress:number = Math.floor((current / total) *100);
		this.progressLabel.text = (progress).toFixed(0) + "%";
		if(progress >= 99 && this.forceDestoryTimeOutId == 0) {
			this.forceDestoryTimeOutId = egret.setTimeout(this.close, this, 3000);
		}
    }

	private close():void {
		if(this.stage) {
			this.parent.removeChild(this);
		}
	}

	private removeStage():void {
		if(this.forceDestoryTimeOutId > 0) {
			egret.clearTimeout(this.forceDestoryTimeOutId);
		}
	}
}