class RoomTop extends eui.Component implements  eui.UIComponent {
	public static curRoomTop:RoomTop;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.backToMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.addMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenChargePanel, this);
	}

	private addToStage() {
		this.goldNum.text = UserService.instance.money.toFixed(2);
		this.playerName.text = UserService.instance.name;
		RoomTop.curRoomTop = this;
	}

	public refresh() {
		this.goldNum.text = UserService.instance.money.toFixed(2);
		this.playerName.text = UserService.instance.name;
	}

	private playerName:eui.Label;

	private backToMainBtn:eui.Button;

	private addMoneyBtn:eui.Button;

	private goldNum:eui.BitmapLabel;
	public backFunc:Function;
	public backFuncObj:any;

	private back() {
		if(this.backFunc && this.backFuncObj) {
			this.backFunc.call(this.backFuncObj);
		}
	}

	public onOpenChargePanel(event)
	{
		game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
	}
	
}