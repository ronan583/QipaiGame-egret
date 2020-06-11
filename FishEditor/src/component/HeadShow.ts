class HeadShow extends eui.Component implements  eui.UIComponent {
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
		this.headIconFrames = [
			this.headIconFrame0,
			this.headIconFrame1,
			this.headIconFrame2,
			this.headIconFrame3,
			this.headIconFrame4,
			this.headIconFrame5,
			this.headIconFrame6,
			this.headIconFrame7,
			this.headIconFrame8,
			this.headIconFrame9,
			this.headIconFrame10,
			this.headIconFrame11,
			this.headIconFrame12,
			this.headIconFrame13,
			this.headIconFrame14,
			this.headIconFrame15,
			this.headIconFrame16
		]
		this.update();
	}

	private headIcon:eui.Image;
	private headIconFrame0:eui.Image;
	private headIconFrame1:eui.Image;
	private headIconFrame2:eui.Image;
	private headIconFrame3:eui.Image;
	private headIconFrame4:eui.Image;
	private headIconFrame5:eui.Image;
	private headIconFrame6:eui.Image;
	private headIconFrame7:eui.Image;
	private headIconFrame8:eui.Image;
	private headIconFrame9:eui.Image;
	private headIconFrame10:eui.Image;
	private headIconFrame11:eui.Image;
	private headIconFrame12:eui.Image;
	private headIconFrame13:eui.Image;
	private headIconFrame14:eui.Image;
	private headIconFrame15:eui.Image;
	private headIconFrame16:eui.Image;

	private headIndex:number = 0;
	private frameIndex:number = 0;

	private headIconFrames:Array<eui.Image> = [];

	public showHead(headIndex:number):void {
		this.headIndex = headIndex;
		this.update();
	}

	public showFrame(frameIndex:number):void {
		this.frameIndex = frameIndex;
		this.update();
	}

	private hiedAll() {
		for(let img of this.headIconFrames) {
			img.visible = false;
		}
	}

	private update() {
		if(this.headIconFrames.length == 0) return;
		this.headIcon.source = "gp_head_" + (this.headIndex + 1);
		this.hiedAll();
		this.headIconFrames[this.frameIndex].visible = true;
		if(this.frameIndex == 0) {
			this.headIconFrames[this.frameIndex].source = "vip_k_0" ;
		} else if(this.frameIndex == 1) {
			this.headIconFrames[this.frameIndex].source = "vip_k_1" ;
		}else{
			this.headIconFrames[this.frameIndex].source = "vip_k_" + (this.frameIndex-1);
		}
	}

    public hideFrame() {
        this.hiedAll();
    }

	public hideHead() {
		this.headIcon.visible = false;
	}
}