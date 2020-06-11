class WaitLoadingTips extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public loadIcon :eui.Image;
	public tipLabel : eui.Label;
	public bg : eui.Image;

	private textStr : string = "连接中...";
	private isInit : boolean = false;
	private timer : egret.Timer;
	private timeout = -1;
	protected childrenCreated():void
	{
		super.childrenCreated();
		// EffectUtils.rotationEffect(this.loadIcon , 2000);
		this.isInit = true;
		this.updateTips();
	}
	private index;
	public onTimer()
	{
		this.loadIcon.rotation += 30;
		if(this.timeout < egret.getTimer())
		{
			game.AppFacade.instance.sendNotification(PanelNotify.CLOSE_WAITLOADING_PANEL);
		}
	}
	public showLoading(text)
	{
		this.textStr = text;
		if(this.isInit)
		{
			this.updateTips();
		}
	}

	public hideLoading()
	{
		this.timeout = -1;
		this.textStr = "";
		this.timer.stop();
	}

	private updateTips()
	{
		this.timeout = egret.getTimer() + 10000;
		if(this.timer == null)
		{
			this.timer = new egret.Timer(90,0);
			this.timer.addEventListener(egret.TimerEvent.TIMER , this.onTimer , this);
		}
		if(!this.timer.running)
		{
			this.timer.start();
		}
		this.tipLabel.text = this.textStr;
		
		this.bg.width = this.loadIcon.width + 50 + this.tipLabel.textWidth;
	}
	
}