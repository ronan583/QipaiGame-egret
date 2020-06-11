class BYCanonView extends eui.Component implements  eui.UIComponent {
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
		this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change, this);
	}

	private equiped:eui.Image;
	private canonBg:eui.Image;
	private canonImg:eui.Image;
	private changeBtn:eui.Group;
	private flagImg:eui.Image;
	private index:number = 0;

	public showCanon(index:number):void {
		this.canonImg.source = "cannon_gun_" + index.toFixed(0);
		this.canonBg.source = "cannon_gun_" + index.toFixed(0) + "_bg";
		this.flagImg.source = "cannon_gun_name_" + index.toFixed(0);
		var player:game.by.BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
		if(index == player.canonIndex) {
			this.equiped.visible = true;
			this.changeBtn.visible = false;
		} else {
			this.equiped.visible = false;
			this.changeBtn.visible = true;
		}
		this.index = index;
	}

	private change():void {
		var player:game.by.BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
		player.canonIndex = this.index;
		this.changeBtn.visible = false;
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHANGE_CANON_PANEL);
		BYRequest.changeCanon(player.canonIndex);
	}
	
}
