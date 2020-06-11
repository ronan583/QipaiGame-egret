class RoomDB extends eui.Component implements  eui.UIComponent {
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
		var dragonbonesData = RES.getRes(this.animStr + "_ske_dbbin");
		var textureData = RES.getRes(this.animStr + "_tex_json");
		var texture = RES.getRes(this.animStr + "_tex_png");
		var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
		dragonbonesFactory.parseDragonBonesData(dragonbonesData);
		dragonbonesFactory.parseTextureAtlasData(textureData, texture);
		this.armature = dragonbonesFactory.buildArmature("Armature");
		this.display = this.armature.display;
		// display.debugDraw = true;
		this.addChild(this.display);
		// this.armature.armatureData.frameRate = 12;
		
		this.display.x = this.width / 2;
		this.display.y = this.height / 2;
		this.touchEnabled = false;
		this.touchChildren = false;

		if(this.needPlay) {
			this.play();
		}
	}

	public anim:string = "animation";
	private needPlay:boolean = false;
	private armature: dragonBones.Armature ;
	public animStr:string = "";
	private dragonbonesData:string;
	private textureData:string;
	private texture:string;
	private display:dragonBones.EgretArmatureDisplay;
	public timeout:number = 1000;
	private timeOutId:number = 0;
	private addStage() {
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	private removeStage() {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
		this.stop();
	}

	private _nextNode:RoomDB;
	public setNextNode(roomDB:RoomDB) {
		this._nextNode = roomDB;
	}

	public play() {
		if(!this.display) {
			this.needPlay = true;
			return;
		}
		dragonBones.WorldClock.clock.add(this.armature);
		this.armature.animation.play(this.anim, 1);
		this.timeOutId = egret.setTimeout(this.playNext, this, this.timeout);
	}

	public stop() {
		dragonBones.WorldClock.clock.remove(this.armature);
		if(this.timeOutId > 0) {
			egret.clearTimeout(this.timeOutId);
		}
	}

	public playNext() {
		if(this._nextNode) {
			this._nextNode.play();
		}
	}

}