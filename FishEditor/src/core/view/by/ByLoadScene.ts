class BYLoadScene extends GameLoadScene {
	public constructor(gameType:game.ChildGameType) {
		super(gameType);
		if(gameType == game.ChildGameType.BY) {
			this.skinName = "resource/eui_skins/gameload/BYLoadScene.exml";
		}
		this.game = gameType;
	}
	private progressbar:eui.Image;
    private progressbg:eui.Image;
    private progressLabel:eui.Label;
    private maskRect:eui.Rect;

    public animOver:boolean = false;
    public leaveFlag:boolean = false;
    
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
        super.childrenCreated();
        this.progressbar.mask = this.maskRect;
	}

	public leave() {
        this.leaveFlag = true;
        if(this.animOver && this.stage) {
            this.parent.removeChild(this);
        }
	}

	public init():void {
        this.animOver = false;
        this.leaveFlag = false;
        if(this.anim) {
            this.anim.playerOnce(()=>{
                this.anim.playerTimes(null, null, 100, "idle");
                this.animOver = true;
                if(this.leaveFlag) {
                    this.parent.removeChild(this);
                }
            }, this, "start");
        }
	}

    public onProgress(current: number, total: number): void {
        if(this.progressbar){
			let width =  (current / total) * this.progressbar.width;
            this.maskRect.width = width;
            let percent = (current / total) * 100;
            this.progressLabel.text = percent.toFixed(0) + "%";
        }
        egret.log("BYLoadScene ... onProgress..." + current + "  " + total + "  " + this.maskRect.width);
    }
}