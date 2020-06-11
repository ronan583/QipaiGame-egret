class MCAnim extends eui.Component implements  eui.UIComponent {
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
		this.loadMc();
	}

	public mcAnim:string = "";
	public playOnAwake:boolean = false;
	public isLoop:boolean = false;
	private mcData:string = "";
	private mcTxtr:string = "";
	private mc:egret.MovieClip;

	private loadMc() {
		this.mcData = this.mcAnim + "_mc_json";
		this.mcTxtr = this.mcAnim + "_tex_png";
		var data = RES.getRes(this.mcData);
		var txtr = RES.getRes(this.mcTxtr);
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.mcAnim));
		this.addChild(this.mc);
		this.mc.x = this.width / 2;
		this.mc.y = this.height / 2;

		if(this.playOnAwake) {
			this.play();
		}
	}

	private listenerArr: Array<any> = [];

	public setAnimScale(scalex:number, scaley:number) {
		this.mc.scaleX = scalex;
		this.mc.scaleY = scaley;
	}

	public playerOnce(listener: Function = null, target: any = null, anim: string = null) {
		if (listener) {
			this.listenerArr.push({ listener: listener, target: target });
			if (!this.mc.hasEventListener(egret.Event.ENTER_FRAME)) {
				this.mc.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
		}
		this.mc.gotoAndPlay(1, 1);
	}

	public play() {
		this.mc.gotoAndPlay(1, this.isLoop ? -1 : 1);
	}

	private onEnterFrame() {
		if(this.mc.currentFrame >= this.mc.totalFrames) {
			// 播放完成
			for (let d of this.listenerArr) {
				d.listener.call(d.target);
			}
			this.listenerArr = [];
			this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
	}

	public stop() {
		if(this.mc) {
			this.mc.stop();
			if (this.mc.hasEventListener(egret.Event.ENTER_FRAME)) {
				this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
		}
	}
	
}