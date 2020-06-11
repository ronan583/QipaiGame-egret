class DDZJiabei extends eui.Component implements  eui.UIComponent {
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

		this.jiaobei0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiabei0, this);
		this.jiaobei1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiabei1, this);
	}

	public jiaobei0:eui.Button;
	public jiaobei1:eui.Button;
	public clock:DDZClock;
	
	public show():void {
		this.visible = true;
		this.clock.startClock(game.ddz.DDZBattleData.getInstance().downTime);
	}

	private onJiabei0():void {
		DDZRequest.callDouble(1);
	}

	private onJiabei1():void {
		DDZRequest.callDouble(2);
	}
}