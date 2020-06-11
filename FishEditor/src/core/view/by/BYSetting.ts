class BYSetting extends eui.Component implements  eui.UIComponent {
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
		this.init();
		this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSettingClick, this);
		this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveClick, this);
		this.fishBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFishClick, this);
		this.chargeBtnOut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChargeClick, this);
		this.chargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChargeClick, this);
		this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.arrowClick, this);
	}

	private settingBtn:eui.Button;
	private leaveBtn:eui.Button;
	private fishBtn:eui.Button;
	private moveGroup:eui.Group;
	private chargeBtnOut:eui.Button;
	private chargeBtn:eui.Button;
	private arrow:eui.Group;

	private isMove:boolean = false;

	private init():void {

	}

	private onSettingClick():void {
		var settingPanel : SettingPanel = new SettingPanel();
		PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
	}

	private onLeaveClick():void {
		RoomRequest.leaveRoom(game.ChildGameType.BY);
	}

	private onFishClick():void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_FISH_BAIKE_PANEL);
	}

	private onChargeClick():void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
	}

	private arrowClick():void {
		if(this.isMove) return;
		if(this.arrow.scaleX == -1) {
			this.chargeBtnOut.visible = false;
			var tw:egret.Tween = egret.Tween.get(this.moveGroup);
			tw.to({x:this.moveGroup.x - 100},500).call(this.moveEnd,this);
		} else {
			this.chargeBtnOut.visible = true;
			var tw:egret.Tween = egret.Tween.get(this.moveGroup);
			tw.to({x:this.moveGroup.x + 100},500).call(this.moveEnd,this);
		}
	}

	private moveEnd():void {
		this.isMove = false;
		this.arrow.scaleX = 0 - this.arrow.scaleX;
	}
}