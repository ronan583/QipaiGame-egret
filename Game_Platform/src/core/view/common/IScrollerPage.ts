class IScrollerPage extends eui.Scroller implements  eui.UIComponent {
	public constructor() {
		super();
	}

	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public maxHorizontalMoveDis = 50;
	public maxVerticalMoveDis = 30;
	

	private currGroup : eui.Group;
	private startPoint : egret.Point;

	private currPage : number = 0;
	private pageNum: number;
	private pageHeight : number;

	protected childrenCreated():void
	{
		super.childrenCreated();
		for(var i = 0 ; i < this.numChildren ; i++)
		{
			if(egret.is(this.getChildAt(i) , "egret.Group"))
			{
				this.currGroup =  <eui.Group>this.getChildAt(i);
				break;
			}
		}
		if(this.horizontalScrollBar != null)
		{
			this.horizontalScrollBar.autoVisibility = false;
			this.horizontalScrollBar.visible = false;
		}
		if(this.verticalScrollBar != null)
		{
			this.verticalScrollBar.autoVisibility = false;
			this.verticalScrollBar.visible = false;
			// console.log(this._scroller.scrollPolicyV);
		}
		this.pageNum = this.viewport.width / this.width;
		this.pageHeight = this.viewport.height / this.width;
		this.throwSpeed = 0;
		this.addEventListener(eui.UIEvent.CHANGE_START , this.onChange_Start , this);
		this.addEventListener(eui.UIEvent.CHANGE_END , this.onChange_End , this);
		// this.addEventListener(egret.TouchEvent.TOUCH_CANCEL , this.onChange_End , this);
		// this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE , this.onChange_End , this);
	}
	
	
	private onChange_Start()
	{
		this.startPoint = new egret.Point(this.viewport.scrollH , this.viewport.scrollV);
	}
	

	private onChange_End()
	{
		// if(this.start)
		var measureH = this.startPoint.x - this.viewport.scrollH;
		var targetScrollH = 0;
		var targetPage = 0;
		if(measureH < this.maxHorizontalMoveDis)//right
		{
			targetPage = Math.min(Math.ceil(this.viewport.scrollH / this.width) , this.pageNum - 1);
			targetScrollH = targetPage * this.width;
			
		}else if(measureH > this.maxHorizontalMoveDis)//left
		{
			targetPage = Math.max(Math.floor(this.viewport.scrollH / this.width), 0);
			targetScrollH = targetPage * this.width;
		}else{ //back
			targetPage = Math.round(this.viewport.scrollH / this.width)
			targetScrollH = targetPage * this.width;
		}
		egret.Tween.get(this.viewport).to({scrollH : targetScrollH} ,300);
        this.currPage = targetPage;
		console.log("[currPage]:" + targetPage + " , [targetScrollH] : " + targetScrollH);

	}

	
}