class FruitPlayerIcon extends eui.Component implements  eui.UIComponent {
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
		this.headImg.mask = this.headMask;
	}
	
	private headImg:eui.Image;
	private headMask:eui.Image;
	private moneyLabel:eui.Label;
	private waitForPlayer:eui.Image;
	private nameLabel:eui.Label;

	public playerInfo:game.PlayerInfo;

	public showPlayer(playerInfo:game.PlayerInfo):void {
		this.playerInfo = playerInfo;
		this.waitForPlayer.visible = false;
		this.headImg.source = "icon_" + playerInfo.headNum + "_png";
		this.nameLabel.text = playerInfo.nickName;
	}

	public showPlayerMoney(money:number):void {
		this.moneyLabel.text = CommonUtil.fixMoneyFormat(money);
	}

	public clearPlayer():void {
		this.waitForPlayer.visible = true;
		this.headImg.source = "";
		this.moneyLabel.text = "0.00";
		this.nameLabel.text = "";
		this.playerInfo = null;
	}

}