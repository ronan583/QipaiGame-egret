class VIPPanel extends eui.Component implements  eui.UIComponent {
	
	
	public constructor() {
		super();
	}



	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public closeBtn : IButton;
	public vipExpBar : eui.ProgressBar;
	public currVIPNum : eui.Image;
	public nextVIPNum : eui.Image;
	public fullLevelTip : eui.Image;
	public chargeNumLabel : eui.BitmapLabel;
	public agLabel : eui.Label;
	public hideLabel : eui.Label;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		if(game.UserService.instance.vipLevel >=6)
		{
			//最大等级处理
			this.fullLevelTip.visible = true;
			this.vipExpBar.maximum = game.UserService.instance.vipTotlExp;
			this.vipExpBar.value = game.UserService.instance.vipTotlExp;

			this.currVIPNum.source = "num_vip_" + 6;
			this.nextVIPNum.source = "num_vip_" + 6;
			//this.agLabel.visible = this.hideLabel.visible = this.chargeNumLabel.visible = false;
		}else
		{
			this.currVIPNum.source = "num_vip_" + game.UserService.instance.vipLevel ;
			this.nextVIPNum.source = "num_vip_" + (game.UserService.instance.vipLevel+1) ;

			this.vipExpBar.maximum = game.UserService.instance.vipTotlExp;
			this.vipExpBar.value = game.UserService.instance.vipExp;

			this.chargeNumLabel.text = (game.UserService.instance.vipTotlExp - game.UserService.instance.vipExp).toString();
			//this.agLabel.x = this.chargeNumLabel.textWidth + this.chargeNumLabel.x;
		}
	}
	
	private closePanel(event : egret.TouchEvent)
	{
		PopUpManager.removePopUp(this , 1);
	}
	
}