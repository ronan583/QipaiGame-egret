class MainInstruction extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		//this.instructionImg1.source = "instruction1";
		//this.instructionImg2.source = "instruction2";
		this.motionGroup.mask = this.maskRect;
	}

	private motionGroup:eui.Group;
	private instructionImg1:eui.Image;
	private instructionImg2:eui.Image;

	private motionIndex:number = 0;
	private motionIntervalIndex:number = 0;
	private motion1:eui.Image;
	private motion2:eui.Image;

	private maskRect:eui.Rect;

	private addToStage():void {
		this.motion1 = this.instructionImg1;
		this.motion2 = this.instructionImg2;
		this.instructionImg1.x = 0;
		this.instructionImg2.x = this.instructionImg1.x + this.instructionImg1.width;
		this.motionIntervalIndex = egret.setInterval(()=>{
			this.motion1.x  = 0;
			this.motion2.x = this.motion1.x + this.motion1.width;
			let left1X = this.motion1.x - 282;
			let left2X = this.motion2.x - 282;
			egret.Tween.get(this.motion1).to({
				x:left1X
			},500);
			egret.Tween.get(this.motion2).to({
				x:left2X
			},500);
			this.motionIndex++;
			let temp = this.motion1;
			this.motion1 = this.motion2;
			this.motion2 = temp;
		},this,4000);
	}

	private removeFromStage():void {
		if(this.motionIntervalIndex > 0) {
			egret.clearInterval(this.motionIntervalIndex);
		}
	}
	
}