class InnerUpdateInfo extends game.ResizePanel{
	
    public static loadingUIInstance:LoadingUI;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/loading/InnerUpdateInfo.exml";
	}

	private progressbar:eui.Image;
	private progressbg:eui.Image;
	private maskRect:eui.Rect;
	private bgimg:eui.Image;
	private loadingAnim:DragonAnim;
	private progressLabel:eui.Label;
	private updateInfoLabel:eui.Label;

	private tipsLabel:eui.Label;

	protected childrenCreated():void {
		super.childrenCreated();
		this.progressbar.mask = this.maskRect;
		let max = Math.min(this.bgimg.width, this.width);
		this.tipsLabel.text = game.GameConst.getTipsLabel();
		this.maskRect.width = 1;
		this.updateInfoLabel.text = "正在检测内更新";

		
	}

	protected addToStage() {
		super.addToStage();
	}

	public updateProgress(data:any) {
		let p = data.current / data.total + data.progress.progress;
		this.onProgress(p * 100, 100);
		this.updateInfoLabel.text = "正在更新游戏：" + (data.progress.current / 1024 / 1024).toFixed(2) + '/' + (data.progress.total / 1024 / 1024).toFixed(2) +'M'
	}

	public updateProgressInDownloadInfo(data:game.DownloadInfo) {
		let p = data.downloadedSize / data.totalSize;
		this.onProgress(p * 100, 100);
		this.updateInfoLabel.text = "正在更新游戏：" + (data.downloadedSize / 1024 / 1024).toFixed(2) + '/' + (data.totalSize / 1024 / 1024).toFixed(2) +'M'
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