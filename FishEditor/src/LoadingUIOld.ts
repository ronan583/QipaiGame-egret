class LoadingUIOld extends egret.Sprite {

    public static loadingUIInstance:LoadingUIOld;

    public constructor() {
        super();
        this.createView();
        LoadingUIOld.loadingUIInstance = this;
    }

    private textField: egret.TextField;
    private versionLabel: egret.TextField;
    private bg:egret.Bitmap;
    private waitingImg:egret.Bitmap;
    private bar:egret.Sprite;
    private barFront:egret.Bitmap;
    private barBack:egret.Bitmap;
    private maskShape:egret.Shape;
    private loadingText:eui.BitmapLabel;
    private shaizi:egret.Bitmap;
    private loadingAnim:game.CommonDBLoop;
    private createView(): void {
        this.bg = new egret.Bitmap(RES.getRes("loadingBg_jpg"));
        // this.bg = new egret.Bitmap(RES.getRes("loadingpreview_jpg"));
        this.addChild(this.bg);
        this.waitingImg = new egret.Bitmap(RES.getRes("loading_waiting_png"));
        this.addChild(this.waitingImg);
        this.loadingText = new eui.BitmapLabel();
        this.loadingText.font = "commonfnt_fnt";
        this.addChild(this.loadingText);
        //this.shaizi = new egret.Bitmap(RES.getRes("loading_waiting_shaizi_png"));
        //this.addChild(this.shaizi);
        this.bar = new egret.Sprite();
        this.barFront = new egret.Bitmap(RES.getRes("progress_bar_png"));
        this.barBack = new egret.Bitmap(RES.getRes("progress_bg_png"));
        this.bar.addChild(this.barBack);
        this.bar.addChild(this.barFront);
        this.barFront.height =this.barFront.height + 1;
        this.maskShape = new egret.Shape();
        this.bar.addChild(this.maskShape);
        
        this.addChild(this.bar);

        this.textField = new egret.TextField();
        //this.addChild(this.textField);
        this.versionLabel = new egret.TextField();
        this.versionLabel.textColor = 0xF6D19D;
        this.addChild(this.versionLabel);
        this.versionLabel.x = 1280 - 150;
        this.versionLabel.y = 720 - 80;
        this.versionLabel.text = Global.version;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this.loadingAnim = new game.CommonDBLoop("loadingAnim_ske_json", "loadingAnim_tex_json", "loadingAnim_tex_png", "loadingAnim");
        this.addChild(this.loadingAnim);
        
    }

    private onAddToStage():void {
        this.bar.x = 0;
        this.bar.y = this.stage.stageHeight / 2 + 216;
        this.waitingImg.x = this.stage.stageWidth / 2 - 104;
        this.waitingImg.y = this.stage.stageHeight / 2 + 260;
        this.barFront.x = 0;
        this.barFront.mask = this.maskShape;
        this.textField.y = this.stage.stageHeight / 2 + 240;
        this.textField.x = this.stage.stageWidth / 2-200;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.bg.width = 1334;
        this.bg.height = 750;
        this.loadingText.x = this.waitingImg.x + 208;
        this.loadingText.y = this.waitingImg.y + 5;

        //this.shaizi.y = this.waitingImg.y - 10;
        //this.shaizi.x = this.waitingImg.x + 360;

        this.loadingAnim.x = this.stage.stageWidth / 2;
        this.loadingAnim.y = this.stage.stageHeight / 2;

    }

    public onProgress(current: number, total: number): void {
        if(this.bar.stage != null) {
            let width =  (current / total) * 1285;
            this.maskShape.graphics.clear();
            this.maskShape.graphics.beginFill(0);
            this.maskShape.graphics.drawRect(0,0,width,44);
            this.maskShape.graphics.endFill();
        }
        let percent = (current / total) * 100;
        // this.textField.text = `Loading...` + percent.toFixed(0) + "%";
        this.loadingText.text = percent.toFixed(0) + "%";
    }
}
