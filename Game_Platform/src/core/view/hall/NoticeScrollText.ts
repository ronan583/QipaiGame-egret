class NoticeScrollText extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private maskRect : eui.Rect;
	private contentGroup:eui.Group;
	private itemArr : any[] = [];
	private currItem : any;

	private isPlayer : boolean = false;

	private scrollerTextFiled:egret.TextField;
	private isInit : boolean = false;
	private timer : egret.Timer;
	private armature: dragonBones.Armature ;
	private curAnimState:string;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.timer = new egret.Timer(5000,1);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onNextNotice , this);
		this.contentGroup.mask = this.maskRect;
		this.scrollerTextFiled = new egret.TextField()
		this.contentGroup.addChild(this.scrollerTextFiled);
		this.scrollerTextFiled.y = 7;
		if(this.itemArr.length > 0)
		{
			this.showScrollNotice();
		}else
		{
			this.alpha = 0;
		}
		this.isInit = true;
	}

	private onAnimComplete() {
		if(this.curAnimState == "start") {
			this.curAnimState = "idle"
		}
		this.armature.animation.play(this.curAnimState, 0);
	}

	private addToStage() {
		if(this.armature)dragonBones.WorldClock.clock.add(this.armature);
	}

	private removeStage() {
		dragonBones.WorldClock.clock.remove(this.armature);
	}

	public addNoticeItem(item)
	{
		this.itemArr.push(item);
		if(this.isPlayer)
		{
			return;
		}
		this.currItem = item;
		if(this.isInit)
		{
			this.showScrollNotice();
		}
	}

	private showScrollNotice()
	{
		this.alpha = 1;
		let jsonObj = JSON.parse(this.currItem.content);
		let arr:Array<egret.ITextElement> = [];
		for(let d of jsonObj) {
			arr.push(d);
		}
		this.scrollerTextFiled.textFlow = arr;
		this.scrollerTextFiled.x = this.width;
		egret.Tween.get(this.scrollerTextFiled).to({x:-this.scrollerTextFiled.textWidth},15000).call(this.onScrollComplete , this);
		this.curAnimState = "start";
	}
	
	private onScrollComplete()
	{
		this.currItem.count--;
		var index = 0;
		index = this.itemArr.indexOf(this.currItem);
		if(this.currItem.count <= 0)
		{
			this.itemArr.splice(index , 1);
			index--;
			
		}
		if(this.itemArr.length > 0)
		{
			index++;
			index %= this.itemArr.length;
			this.currItem = this.itemArr[index % this.itemArr.length];
			this.timer.start();
		}else
		{
			this.currItem = null;
			this.isPlayer = false;
			return;
		}
		this.alpha = 0;
		
	}

	private onNextNotice()
	{
		this.showScrollNotice();
	}

}
class ScrollNoticeItem
{

}