class DBSlider extends eui.Component implements  eui.UIComponent {
	public static SLIDER_CHANGE:string = "SLIDER_CHANGE";

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
		this.sliderBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.sliderBegin, this);
		
		this.sliderBtn.x = this.leftBegin = this.sliderBar.x;
		this.sliderBar.mask = this.sliderBarMask;
		this.sliderBarMask.width = 0;
		this.setSlider(1,5);

		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
		this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSub, this);
	}
	private sliderBar:eui.Image;
	private sliderBarMask:eui.Rect;
	private sliderBtn:eui.Button;

	private addBtn:eui.Button;
	private subBtn:eui.Button;

	public max:number = 5;
	private cur:number;
	public moveUnit:number = 1;

	private leftBegin:number;

	private isSliding:boolean = false;
	private recordMouseX:number = 0;
	private recordSliderX:number = 0;

	private onAdd():void {
		let newCur:number =this.cur + 1;
		if(newCur > this.max) {
			return;
		}
		this.setSlider(newCur, this.max);
		this.dispatchEvent(new egret.Event(DBSlider.SLIDER_CHANGE,false,false,newCur));
	}

	private onSub():void {
		let newCur:number =this.cur - 1;
		if(newCur <= 0) {
			return;
		}
		this.setSlider(newCur, this.max);
		this.dispatchEvent(new egret.Event(DBSlider.SLIDER_CHANGE,false,false,newCur));
	}

	private sliderBegin(e:egret.TouchEvent):void {
		this.isSliding = true;
		this.recordMouseX = e.stageX;
		this.recordSliderX = this.sliderBtn.x;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.sliderEnd, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.sliderMove, this);
	}
	private sliderEnd(e:egret.TouchEvent):void {
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.sliderEnd, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.sliderMove, this);
		this.isSliding = false;
		this.sliderBtn.x = this.leftBegin + this.sliderBar.width /  (this.max - 1) * (this.cur-1);
		this.dispatchEvent(new egret.Event(DBSlider.SLIDER_CHANGE,false,false,this.cur));
	}	
	private sliderMove(e:egret.TouchEvent):void {
		if(!this.isSliding) return;
		let delta:number = e.stageX - this.recordMouseX;
		this.sliderBtn.x = this.recordSliderX + delta;
		if(this.sliderBtn.x < this.leftBegin) {
			this.sliderBtn.x = this.leftBegin;
		}
		if(this.sliderBtn.x > (this.leftBegin + this.sliderBar.width)) {
			this.sliderBtn.x = (this.leftBegin + this.sliderBar.width)
		}
		this.sliderBarMask.width = this.sliderBtn.x - this.leftBegin;
		let newCur:number = Math.round(this.sliderBarMask.width / (this.sliderBar.width/(this.max-1))) + 1;
		newCur = Math.max(1, newCur);
		if(newCur != this.cur) {
			this.dispatchEvent(new egret.Event(DBSlider.SLIDER_CHANGE,false,false,newCur));
		} 
		this.cur = newCur;
	}

	public setSlider(cur:number,max:number, forceSilder:boolean = true):void {
		this.max = max;
		this.cur = cur;
		if(forceSilder) {
			this.sliderBtn.x = this.leftBegin + this.sliderBar.width / (max - 1) * (cur-1) ;
			this.sliderBarMask.width = this.sliderBtn.x - this.leftBegin;
		}
	}
}
