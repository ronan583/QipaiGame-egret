class NoticeMsgUI extends ResizePanel implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private gameCompleteGroup:eui.Group;
	private errorGroup:eui.Group;
	private msgLabel:eui.Label;
	private gameMsgLabel:eui.Label;
	private errorMsgLabel:eui.Label;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.touchEnabled = this.touchChildren = false;
	}

	public showMsg(msg:string):void {
		this.msgLabel.text = msg;
		egret.setTimeout(()=> {
			if(this.parent) {
				this.parent.removeChild(this);
			}
		}, this, 2000);
	}

	public showGameCompleteMsg(msg:string) {
		this.errorGroup.visible = false;
		this.gameCompleteGroup.visible = true;
		this.gameMsgLabel.text = msg;
		egret.setTimeout(()=> {
			if(this.parent) {
				this.parent.removeChild(this);
			}
		}, this, 2000);
	}

	public showErrorMsg(msg:string) {
		this.errorGroup.visible = true;
		this.gameCompleteGroup.visible = false;
		this.errorMsgLabel.text = msg;
		egret.setTimeout(()=> {
			if(this.parent) {
				this.parent.removeChild(this);
			}
		}, this, 2000);
	}
}