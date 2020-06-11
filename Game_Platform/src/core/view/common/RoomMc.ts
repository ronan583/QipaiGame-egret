class RoomMc extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		var data = RES.getRes(this.mcData);
		var txtr = RES.getRes(this.mcTxtr);
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		
		this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.mcName));
		this.addChild(this.mc);
		this.mc.x = this.width / 2;
		this.mc.y = this.height / 2;
		this.touchEnabled = false;
		this.touchChildren = false;

		if(this.needPlay) {
			this.play();
		}
	}

	public mcData:string = "";
	public mcTxtr:string = "";
	public mcName:string = "";
	private mc:egret.MovieClip;
	private needPlay:boolean = false;

	private addStage() {
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	private removeStage() {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	private enterFrame() {
		if(this.mc.currentFrame >= this.mc.totalFrames) {
			this.stop();
			this.playNext();
		}
	}

	private _nextNode:RoomMc;
	public setNextNode(roommc:RoomMc) {
		this._nextNode = roommc;
	}

	public play() {
		if(!this.mc) {
			this.needPlay = true;
			return;
		}
		this.mc.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		this.mc.gotoAndStop(1);
		this.mc.play(1);
	}

	public stop() {
		// this.mc.gotoAndStop(1);
		this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
	}

	public playNext() {
		if(this._nextNode) {
			this._nextNode.play();
		}
	}

}