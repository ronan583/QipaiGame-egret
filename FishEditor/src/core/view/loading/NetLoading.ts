class NetLoading extends ResizePanel implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		var data = RES.getRes("loding_mc_json");
		var txtr = RES.getRes("loding_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.loadingMc = new egret.MovieClip(mcFactory.generateMovieClipData("loding"));
		this.mcGroup.addChild(this.loadingMc);
		this.loadingMc.x = this.mcGroup.width / 2;
		this.loadingMc.y = this.mcGroup.height / 2;
	}

	private static _instance:NetLoading;

	public static get instance():NetLoading {
		if(!NetLoading._instance) {
			NetLoading._instance = new NetLoading();
		}
		return NetLoading._instance;
	}

	private startTime:number = 0;
	private showTimeId:number = 0;
	private timeoutId:number = 0;
	private loadingMc:egret.MovieClip;
	private mcGroup:eui.Group;

	private static CHECK_CMD_IDS:Array<number> = [
		20002,20003,20004,20005,20006,20007,20008,20009,20010,20011,20012,20013,20014,20015,20016,20017,
		30001,30002,30003,30004,30005,30006
	];

	public static showLoading(cmdId:number):void {
		if(NetLoading.CHECK_CMD_IDS.indexOf(cmdId) < 0) return;
		NetLoading.instance.startTime = egret.getTimer();
		//egret.MainContext.instance.stage.touchEnabled = false;
		egret.MainContext.instance.stage.touchChildren = false;
		NetLoading.instance.showTimeId = egret.setTimeout(()=>{
			egret.MainContext.instance.stage.addChild(NetLoading.instance);
	},NetLoading.instance, Global.isNative ? 300 : 500);

		NetLoading.instance.timeoutId = egret.setTimeout(()=>{
			NetLoading.hideLoading();
		},NetLoading.instance, 5000);
		
	}

	public static hideLoading():void {
		if(NetLoading.instance.showTimeId > 0) {
			egret.clearTimeout(NetLoading.instance.showTimeId);
		}
		if(NetLoading.instance.timeoutId > 0) {
			egret.clearTimeout(NetLoading.instance.timeoutId);
		}
		//egret.MainContext.instance.stage.touchEnabled = true;
		egret.MainContext.instance.stage.touchChildren = true;
		if(NetLoading.instance.stage) {
			NetLoading.instance.parent.removeChild(NetLoading.instance);
		}	
	}

	private onAdd():void {
		if(this.loadingMc) {
			this.loadingMc.play(-1);
		}
	}

	private onRemove():void {
		if(this.loadingMc) {
			this.loadingMc.stop();
		}
	}

	private img:eui.Image;

	private updateImg(timestamp:number):boolean {
		this.img.rotation += 10;
		return false;
	}
}