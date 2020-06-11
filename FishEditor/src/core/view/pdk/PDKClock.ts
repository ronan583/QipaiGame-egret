class PDKClock extends eui.Component implements  eui.UIComponent {
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
	}

	public leftTimeLabel:eui.BitmapLabel;
	private endTime = 0;

	public startClock(leftTime:number):void {
		this.visible = true;
		this.leftTimeLabel.text = "0";
		this.endTime = egret.getTimer() / 1000 + leftTime;
		egret.startTick(this.updateClock, this);
	}

	private updateClock(timestamp:number):boolean {
		let leftTime:number = this.endTime - timestamp / 1000;
		if(leftTime < 0) {
			egret.stopTick(this.updateClock, this);
		} else {
			this.leftTimeLabel.text = leftTime.toFixed(0);
		}
		return true;
	}
	
}