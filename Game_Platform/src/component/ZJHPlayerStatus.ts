class ZJHPlayerStatus extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public kanpaiStatus:eui.Image;
	public shibaiStatus:eui.Image;
	public qipaiStatus:eui.Image;

	public showStatus(status:game.zjh.ZJHPlayerStatus):void {
		this.hideAll();
		if(status == game.zjh.ZJHPlayerStatus.QIPAI) {
			this.qipaiStatus.visible = true;
		} else if(status == game.zjh.ZJHPlayerStatus.SHIBAI) {
			this.shibaiStatus.visible = true;
		} else if(status == game.zjh.ZJHPlayerStatus.KANPAI) {
			this.kanpaiStatus.visible = true;
		}
	}

	public hideAll() : void {
		this.kanpaiStatus.visible = false;
		this.shibaiStatus.visible = false;
		this.qipaiStatus.visible = false;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		// 默认没有展示
		this.hideAll();
	}
	
}