class Cuopai extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private beginY:number = 0;
	private defaultMaskWidth:number = 0;
	private maskShape:egret.Shape;
	public getAnimTime():number {
		return (this.fanpaiMc.totalFrames / this.fanpaiMc.frameRate) * 1000;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.testBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play0, this);
		this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
		this.maskShape = new egret.Shape();
		this.maskShape.x = this.maskRect.x;
		this.maskShape.y = this.maskRect.y;
		this.maskShape.graphics.beginFill(0xffffff);
		this.maskShape.graphics.drawRect(0,0,this.maskRect.width,this.maskRect.height);
		this.maskShape.graphics.endFill();
		this.addChild(this.maskShape);
		this.maskRect.visible = false;
		this.cardGroup.mask = this.maskShape;
		this.defaultMaskWidth = this.maskRect.width;
		this.beginY = this.cardGroup.y = this.maskShape.y + this.maskShape.height;
		let data = RES.getRes("cuopai_mc_json");
		let txtr = RES.getRes("cuopai_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.fanpaiMc = new egret.MovieClip(mcFactory.generateMovieClipData("cuopai"));
		this.addChildAt(this.fanpaiMc, 0);
		this.fanpaiMc.x = 192
		this.fanpaiMc.y = 60
		this.cardImg.visible = false;
	}

	private cardNumImg:eui.Image;
	private maskRect:eui.Rect;
	private cardGroup:eui.Group;
	private cardFlowerImg:eui.Image;
	private fanpaiMc:egret.MovieClip;
	private cardImg:eui.Image;
	private testBtn:eui.Button;
	private testBtn1:eui.Button;
	private completeFunc:Function;
	private completeCaller:any;

	private onTest() {
		if(this.cardGroup.mask) {
			this.cardGroup.mask = null;
		} else {
			this.cardGroup.mask = this.maskShape;
		}
	}

	private play0() {
		this.play(59);
	}

	public play(cardValue:number, completeFunc?:Function, completeCaller?:any) {
		this.beginY = this.cardGroup.y = this.maskRect.y + this.maskRect.height;
		this.cardImg.visible = false;
		this.cardGroup.visible = true;
		this.maskShape.width = this.defaultMaskWidth;
		this.cardImg.source = "oc_" + cardValue;
		this.completeFunc = completeFunc;
		this.completeCaller = completeCaller;
		if(cardValue == 64) {
			this.cardFlowerImg.source = "csp_xiaowang"
			this.cardNumImg.visible = false;
		} else if(cardValue == 68) {
			this.cardFlowerImg.source = "csp_dawang"
			this.cardNumImg.visible = false;
		} else {
			let suit:number = Math.floor(cardValue % 4);
			let cardN:number = Math.floor(cardValue / 4);
			if(cardN == 14) {
				cardN = 1;
			} else if(cardN == 15){
				cardN = 2;
			}
			this.cardNumImg.visible = true;
			if(suit == 0) {
				this.cardFlowerImg.source = "csp_fangkuai"
				this.cardNumImg.source = "plist_puke_value_0_" + cardN;
			} else if(suit == 1) {
				this.cardFlowerImg.source = "csp_caohua"
				this.cardNumImg.source = "plist_puke_value_1_" + cardN;
			} else if(suit == 2) {
				this.cardFlowerImg.source = "csp_hongtao"
				this.cardNumImg.source = "plist_puke_value_0_" + cardN;
			} else if(suit == 3) {
				this.cardFlowerImg.source = "csp_heitao"
				this.cardNumImg.source = "plist_puke_value_1_" + cardN;
			}
		}
		if(this.fanpaiMc.hasEventListener(egret.Event.ENTER_FRAME)) {
			this.fanpaiMc.removeEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
		}
		this.fanpaiMc.addEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
		this.fanpaiMc.gotoAndPlay(1,1);
	}

	public stop() {
		this.fanpaiMc.removeEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
		this.fanpaiMc.stop();
	}

	private mcEnterFrame() {
		let frame = this.fanpaiMc.currentFrame;
		if(frame >= 8 && frame < 14) {
			let maskWidth = this.defaultMaskWidth + ((frame - 8) / 6) * 10;
			this.maskShape.graphics.clear();
			this.maskShape.graphics.beginFill(0xffffff);
			this.maskShape.graphics.drawRect(0,0,maskWidth,this.maskRect.height);
			this.maskShape.graphics.endFill();
		}
		if(frame >= 7 && frame < 16) {
			this.cardGroup.y = this.beginY - ((frame - 7) / 8) * 20;
		}
		if(frame == 17) {
			SoundMenager.instance.playEffect("fanpai_mp3");
		}
		if(frame >= 17) {
			this.cardGroup.visible = false;
			this.cardImg.visible = true;
			this.cardImg.rotation = (this.fanpaiMc.totalFrames - frame) * 10;
		}

		if(frame == this.fanpaiMc.totalFrames) {
			if(this.completeFunc && this.completeCaller) {
				this.completeFunc.call(this.completeCaller);
			}
			this.fanpaiMc.removeEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
			this.fanpaiMc.stop();
		}
		
	}

}