import UserService = game.UserService;

class UserInfoSkin extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public headShow:HeadShow;
	public vipLevelIcon : eui.Image;
	public userAccountLabel : eui.Label;
	private userIDLabel:eui.Label;
	public levelLabel : eui.Label;
	public vipLevelGroup : eui.Group;
	public vipGroup : eui.Group;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP , this.openUserInfoPanel , this);
	}

	public openUserInfoPanel (event : egret.TouchEvent)
	{
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_USERINFO_PANEL);
	}
	
	public updateHeadIcon(data : any)
	{
		var iconIndex = data.number;
		if(data.type == 1)
		{
			this.headShow.showHead(iconIndex);
			this.headShow.showFrame(UserService.instance.headFrameNum);
		}else if(data.type == 2)
		{
			this.headShow.showFrame(iconIndex);
		}
	}

	public updateName()
	{
		this.userAccountLabel.text = game.UserService.instance.name;
		this.userIDLabel.text = "ID:" + game.UserService.instance.userId;
	}
}