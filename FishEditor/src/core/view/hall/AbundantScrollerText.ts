class ScrollerItem {
	public textObjArr:Array<egret.ITextElement> = [];
	public count:number = 0;

	constructor(textObjArr:Array<egret.ITextElement>, count:number) {
		this.textObjArr = textObjArr;
		this.count = count;
	}
}

class AbundantScrollerText extends ResizePanel implements  eui.UIComponent {
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
		this.scrollerText = new egret.TextField();
		this.contentGroup.addChild(this.scrollerText);
		this.contentGroup.mask = this.maskRect;
		if(this.waitText != "") {
			this.showNotice(this.waitText, this.waitCount, true);
		}
	}
	
	private anim:DragonAnim;
	private contentGroup:eui.Group;
	private maskRect:eui.Rect;
	private scrollerText:egret.TextField;
	private scrollerItems:Array<ScrollerItem> = [];
	private isrunning = false;

	private static _instance:AbundantScrollerText;

	private waitText:string = "";
	private waitCount:number = 0;
	private bg:eui.Rect;
	
	public showNotice(text:string, count:number, needStart:boolean) {
		if(!this.contentGroup) {
			// 说明我还没初始化好
			return;
		}
		if(needStart) {
			// 第一次进来
			this.anim.setLoop(false);
			this.anim.playerOnce(()=>{
				this.anim.setLoop(true);
				this.bg.visible = true;
				this.anim.playerAnimOnce("idle", 0);
			}, this, "start");
		}
		let arr:Array<egret.ITextElement> = [];
		for(let d of JSON.parse(text)) {
			arr.push(d);
		}
		this.scrollerItems.push(new ScrollerItem(arr, count));
		this.handleScroller();
	}

	private handleScroller() {
		if(this.isrunning) {
			return;
		}
		let item = this.getWaitToHandlerItem();
		if(!item) {
			// 我应该消失了
			this.anim.setLoop(false);
			this.bg.visible = false;
			this.anim.playerOnce(()=>{
				if(this.parent) {
					this.parent.removeChild(this);
				}
			}, this, "end");
			return;
		}
		this.scrollerText.textFlow = item.textObjArr;
		this.scrollerText.x = (this.contentGroup.width - this.scrollerText.textWidth) / 2;
		this.scrollerText.y = 35;
		this.isrunning = true;
		egret.Tween.get(this.scrollerText).to({y:2}, 500).call(()=>{
			CommonUtil.registerTimeOut(()=>{
				egret.Tween.get(this.scrollerText).to({y:-40}, 500).call(()=>{
					this.isrunning = false;
					this.handleScroller();
				}, this);
			}, this, 2000)
		}, this);
	}

	private getWaitToHandlerItem() {
		if(this.scrollerItems.length > 0) {
			let item = this.scrollerItems[0];
			if(item.count == 0) {
				this.scrollerItems.splice(0, 1);
			}
			if(this.scrollerItems.length == 0) {
				return null;
			}
			item = this.scrollerItems[0];
			item.count --;
			return item;
		}
		return null;
	}

	public static showNotice(text:string, count:number, delay:number = 3000) {
		egret.setTimeout(()=>{
			if(!AbundantScrollerText._instance) {
				AbundantScrollerText._instance = new AbundantScrollerText();
			}
			let needStart:boolean = false;
			if(!AbundantScrollerText._instance.parent) {
				GameLayerManager.gameLayer().effectLayer.addChild(AbundantScrollerText._instance);
				needStart = true;
			}
			AbundantScrollerText._instance.showNotice(text,count,needStart);
		}, this, delay)
	}

}