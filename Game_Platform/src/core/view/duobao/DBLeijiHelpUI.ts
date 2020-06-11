class DBLeijiHelpUI extends ResizePanel implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private scroller:eui.Scroller;
	private closeBtn:eui.Button;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
		if (this.scroller.horizontalScrollBar != null) {
			this.scroller.horizontalScrollBar.autoVisibility = false;
			this.scroller.horizontalScrollBar.visible = false;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		}
		if (this.scroller.verticalScrollBar != null) {
			this.scroller.verticalScrollBar.autoVisibility = false;
			this.scroller.verticalScrollBar.visible = false;
		}
		egret.setTimeout(() => {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
		}, this, 100);	
	}

	// protected addToStage() {
	// 	super.addToStage();

	// }	

    private stageClick(e:egret.TouchEvent) {
        if(!this.hitTestPoint(e.stageX, e.stageY, true)) {
            PopUpManager.removePopUp(this);
        }
    }
	private onClose() {
        PopUpManager.removePopUp(this);
	}
	
}