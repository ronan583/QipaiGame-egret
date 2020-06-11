class IButton extends eui.Button implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	public imageLabelPath : string = "";
	public imageUnableLabelPath : string = "";
	public imageLabel : eui.Image = null;
	private orgScaleX : number = 1;
	private orgScaleY : number = 1;
	protected childrenCreated():void
	{
		super.childrenCreated();
		
    	this.addEventListener(egret.TouchEvent.TOUCH_BEGIN , this.OnTouchEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_END , this.OnTouchEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onTapEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEffect , this);
		if(this.imageLabel == null && this.imageLabelPath != "")
		{
			this.imageLabel =  new eui.Image();
			this.imageLabel.addEventListener(eui.UIEvent.RESIZE , this.onImageLabelComplete , this);
			this.addChild(this.imageLabel);
			this.imageLabel.source = this.imageLabelPath;
			this.imageLabel.touchEnabled = false;
			
		}
		
		if(this.anchorOffsetX == 0 && this.anchorOffsetY == 0)
		{
			
			this.anchorOffsetX =  this.width / 2;
			this.anchorOffsetY =  this.height / 2;
			this.x += this.anchorOffsetX;
			this.y += this.anchorOffsetY; 
		}
		this.orgScaleX = this.scaleX;
		this.orgScaleY = this.scaleY;
	}
	public reset()
	{
		this.scaleX = this.scaleY = 1;
		this.filters = null;

	}

	public onImageLabelComplete(event : eui.UIEvent)
	{
			this.imageLabel.x = this.anchorOffsetX - this.imageLabel.width/2;
			this.imageLabel.y = this.anchorOffsetY - this.imageLabel.height/2;
	}

	public updateImageLabel(source : string)
	{
		if(this.imageLabel != null && this.imageLabelPath != source)
		{
			this.imageLabel.source = this.imageLabelPath = source;
			// this.imageLabel.x = this.anchorOffsetX - this.imageLabel.width/2;
			// this.imageLabel.y = this.anchorOffsetY - this.imageLabel.height/2;
		}
	}
	
	private onTapEffect(event : egret.TouchEvent) : void 
	{
		SoundMenager.instance.PlayClick();
	}

	private OnTouchEffect(event : egret.TouchEvent) : void
	{
		var btn:eui.Button = <eui.Button>event.target;
		var sign:number = btn.scaleX / Math.abs(btn.scaleX); 
		
		switch(event.type)
		{
			case  egret.TouchEvent.TOUCH_BEGIN:
				var colorMatrix = [
					1,0,0,0,50,
					0,1,0,0,50,
					0,0,1,0,50,
					0,0,0,1,0
				];
				var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
				btn.filters = [colorFlilter];
				egret.Tween.get(btn).to({scaleX : 0.95 * this.orgScaleX, scaleY : 0.95 * this.orgScaleY},80,egret.Ease.sineIn);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEffect, this);
			break;
			
			case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
			case  egret.TouchEvent.TOUCH_END:
			case egret.TouchEvent.TOUCH_CANCEL:
				btn.filters = null;
				egret.Tween.get(btn).to({scaleX : 1 * this.orgScaleX, scaleY : 1*this.orgScaleY},50,egret.Ease.sineOut);
				if(this.stage != null && this.stage.hasEventListener(egret.TouchEvent.TOUCH_CANCEL))
				{
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEffect, this);
				}
			break;
		}
		
	}
	

}