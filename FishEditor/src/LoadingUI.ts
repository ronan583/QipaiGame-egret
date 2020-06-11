class LoadingUI extends game.ResizePanel{
	
    public static loadingUIInstance:LoadingUI;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/loading/LoadingUINew.exml";
		LoadingUI.loadingUIInstance = this;
	}

	private progressbar:eui.Image;
	private progressbg:eui.Image;
	private maskRect:eui.Rect;
	private bgimg:eui.Image;
	private loadingAnim:DragonAnim;
	private progressLabel:eui.Label;
	private versionLabel:eui.Label;

	private tipsLabel:eui.Label;

	protected childrenCreated():void {
		super.childrenCreated();
		this.progressbar.mask = this.maskRect;
		let max = Math.min(this.bgimg.width, this.width);
		this.tipsLabel.text = game.GameConst.getTipsLabel();
		this.versionLabel.text = Global.version;
	}

	protected addToStage() {
		super.addToStage();
	}

	public onProgress(current: number, total: number): void {
        if(this.progressbar){
			let width =  (current / total) * this.progressbar.width;
            this.maskRect.width = width;
        }
        let percent = (current / total) * 100;
        // this.textField.text = `Loading...` + percent.toFixed(0) + "%";
        this.progressLabel.text = percent.toFixed(0) + "%";
    }
}