class DDZClock extends eui.Component implements  eui.UIComponent {
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
		this.maskShape = new egret.Shape;
		this.addChild(this.maskShape);
		this.aperture.mask = this.maskShape;
		this.maskShape.graphics.clear();
		this.maskShape.x = this.aperture.x;
		this.maskShape.y = this.aperture.y;
		this.maskShape.rotation = -90;
	}

	public leftTimeLabel:eui.BitmapLabel;
	private endTime = 0;
	private aperture:eui.Image;
	private maskShape:egret.Shape;
	private startTime:number;
	private totalTime:number;
	private drawShape(angle:number) {
		this.maskShape.graphics.clear();
		this.maskShape.graphics.beginFill(0x000000);
		this.maskShape.graphics.moveTo(0, 0);
		this.maskShape.graphics.drawArc(0,0, 50, 0, angle * Math.PI / 180, false);
		this.maskShape.graphics.lineTo(0, 0);
		this.maskShape.graphics.endFill();
		return false;
	}

	public startClock(leftTime:number):void {
		this.visible = true;
		this.leftTimeLabel.text = "0";
		this.endTime = egret.getTimer() / 1000 + leftTime;
		this.startTime = egret.getTimer();
		this.totalTime = leftTime * 1000;
		egret.startTick(this.updateClock, this);
	}

	private updateClock(timestamp:number):boolean {
		let angle = ((timestamp - this.startTime) / this.totalTime) * 360;
		this.drawShape(angle);
		let leftTime:number = this.endTime - timestamp / 1000;
		if(leftTime < 0) {
			egret.stopTick(this.updateClock, this);
		} else {
			this.leftTimeLabel.text = leftTime.toFixed(0);
		}
		return true;
	}
	
}