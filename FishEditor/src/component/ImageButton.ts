class ImageButton extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public buttonImage : eui.Image;
	public labelImage : eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN , this.OnTouchEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_END , this.OnTouchEffect , this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchEffect , this);
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
				egret.Tween.get(btn).to({scaleX : 0.9 * sign,scaleY : 0.9},80,egret.Ease.sineIn);
			break;
			
			case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
			case  egret.TouchEvent.TOUCH_END:
				btn.filters = null;
				egret.Tween.get(btn).to({scaleX : 1 * sign,scaleY : 1},50,egret.Ease.sineOut);
			break;
		}
		
	}
}