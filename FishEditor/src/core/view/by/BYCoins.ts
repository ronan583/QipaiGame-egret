class BYCoins extends eui.Component implements  eui.UIComponent {
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
		this.subBtn.name = "subBtn";
		this.addBtn.name = "addBtn";
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add, this);
		this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sub, this);
	}

	public subBtn:eui.Image;
	public addBtn:eui.Image;
	public bulletValueLabel:eui.Label;
	public valueUnitImg:eui.Image;
	public bgImg:eui.Image;

	private bulletMoneyGroup:eui.Group;
	private waittingGroup:eui.Group;

	private unit:number = 0;
	public showWaitting(iswatting:boolean):void {
		this.bulletMoneyGroup.visible = !iswatting;
		this.waittingGroup.visible = iswatting;
	}

	public showCoins(playerId:number, bulletMoney:number):void {
		this.bulletValueLabel.text = (bulletMoney / 1000).toFixed(3);
		if(playerId == game.UserService.instance.playerId) {
			this.subBtn.visible = true;
			this.addBtn.visible = true;
		} else {
			this.subBtn.visible = false;
			this.addBtn.visible = false;
		}
	}

	private add():void {
		var base:number = game.RoomManager.getInstance().curRoomData.bottomBet / 10;
		var bm:number = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId).curBulletMoney + 1000 * base;
		if(bm > game.RoomManager.getInstance().curRoomData.bottomBet * 1000) {
			bm = base * 1000;
		}
		BYRequest.sendBulletMoney(bm);
	}

	private sub():void {
		var base:number = game.RoomManager.getInstance().curRoomData.bottomBet / 10;
		var bm:number = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId).curBulletMoney - base * 1000;
		if(bm <= 0) {
			bm = game.RoomManager.getInstance().curRoomData.bottomBet * 1000;
		}
		BYRequest.sendBulletMoney(bm);
	}

}