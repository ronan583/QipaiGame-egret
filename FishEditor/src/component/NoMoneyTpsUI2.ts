class NoMoneyTipsUI2 extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		var w = egret.MainContext.instance.stage.stageWidth;
		var h = egret.MainContext.instance.stage.stageHeight;
		this.maskBg = new egret.Shape();
		this.maskBg.graphics.beginFill(0x000000, 0.5);
		this.maskBg.graphics.drawRect(0, 0, w, h);
		this.maskBg.graphics.endFill();
		this.maskBg.width = egret.MainContext.instance.stage.stageWidth;
		this.maskBg.height = egret.MainContext.instance.stage.stageHeight;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	public bg: eui.Image;
	public message: string;
	private maskBg: egret.Shape;
	private tipsType: TipsType;
	public tipsLabel: eui.Label;
	public okBtn: IButton;
	public okBtn1: IButton;
	public cancelBtn: IButton;
	public closeBtn: IButton;
	public okCallback: Function;
	public callbackObject: any;

	public cancelCallback: Function;
	public isInit: boolean = false;
	public okBitmapLabelPath: string = "";

	public forceCloseExitGame:boolean = false;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelTouch, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
		this.addChildAt(this.maskBg, 0);
		this.isInit = true;
		this.UpdatePanel();
	}

	private onAddToStage(): void {
		if (this.okBitmapLabelPath != undefined && this.okBitmapLabelPath != "") {
			NoMoneyTipsUI2.instance.okBtn.imageLabelPath = this.okBitmapLabelPath;
		} else {
			// TipsUI.instance.okBtn.imageLabelPath = "icon_confirm";
		}
	}

	private onOkTouch(event: egret.TouchEvent) {
		if (this.okCallback != null) {
			this.okCallback(this.callbackObject);
		}
		if(!this.forceCloseExitGame) {
			NoMoneyTipsUI2.removeTips(this);
		}
	}

	private onCancelTouch(event: egret.TouchEvent) {
		if (this.cancelCallback != null) {
			this.cancelCallback(this.callbackObject);
		}
		if(!this.forceCloseExitGame) {
			NoMoneyTipsUI2.removeTips(this);
		}
	}

	private onCloseTouch() {
		NoMoneyTipsUI2.removeTips(this);
		if(this.forceCloseExitGame) {
			let gameScenes = GameLayerManager.gameLayer().findGameScenes()
			if(gameScenes.length > 0) {
				let gameScene = gameScenes[0];
				CommonUtil.leaveGame(gameScene.gameType);
			}
		}
	}
	static instance: NoMoneyTipsUI2;
	// type 1 : ok and cancel , type 2 : ok
	public static showTips(data): NoMoneyTipsUI2 {
		if (NoMoneyTipsUI2.instance != null && NoMoneyTipsUI2.instance.stage) {
			NoMoneyTipsUI2.instance.parent.removeChild(NoMoneyTipsUI2.instance)
		}
		NoMoneyTipsUI2.instance = new NoMoneyTipsUI2();
		NoMoneyTipsUI2.instance.message = data.text;
		NoMoneyTipsUI2.instance.okCallback = data.callback;
		NoMoneyTipsUI2.instance.callbackObject = data.callbackObject;
		NoMoneyTipsUI2.instance.tipsType = data.tipsType;
		NoMoneyTipsUI2.instance.cancelCallback = data.cancelCallback;
		NoMoneyTipsUI2.instance.forceCloseExitGame = data.forceCloseExitGame;
		NoMoneyTipsUI2.instance.okBitmapLabelPath = data.okBitmapLabelPath;

		if (NoMoneyTipsUI2.instance.isInit) {
			NoMoneyTipsUI2.instance.UpdatePanel();
		}
		NoMoneyTipsUI2.instance.effectExe(data.effectType);
		return NoMoneyTipsUI2.instance;
	}

	public static showTipsByInstance(tipsUI: NoMoneyTipsUI2): NoMoneyTipsUI2 {
		//if(TipsUI.instance == null)
		//{
			NoMoneyTipsUI2.instance = tipsUI;
		//}
		if (NoMoneyTipsUI2.instance.isInit) {
			NoMoneyTipsUI2.instance.UpdatePanel();
		}
		NoMoneyTipsUI2.instance.effectExe(0);
		return NoMoneyTipsUI2.instance;
	}

	private UpdatePanel() {
		this.tipsLabel.text = this.message;
	}

	//**1.渐显 ， 1.从下往上弹出 ，2.从右往左弹出 ， 3.从左往右弹出 */
	private effectExe(effectType) {
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		switch (effectType) {
			case 0: {
				// TODO: Implement case content
				this.alpha = 0;
				egret.Tween.get(this).to({ alpha: 1 }, 300);
				break;
			}
			case 1: {
				this.alpha = 0;
				this.maskBg.alpha = 0;
				this.y += this.getHeight();
				// egret.Tween.get(tips.maskBg).to({alpha:1},500,egret.Ease.backOut); 	                
				egret.Tween.get(this).to({ alpha: 1, y: this.y - this.getHeight() }, 500, egret.Ease.backOut).call(this.OnTweenComplete, this);
				break;
			}
			case 2: {
				this.alpha = 0;
				this.maskBg.alpha = 0;
				this.x -= this.getWidth();
				egret.Tween.get(this).to({ alpha: 1, x: this.x + this.getWidth() }, 500, egret.Ease.backOut).call(this.OnTweenComplete, this);
				break;
			}
			case 3: {
				this.alpha = 0;
				this.maskBg.alpha = 0;
				this.x += this.getWidth();
				egret.Tween.get(this).to({ alpha: 1, x: this.x - this.getWidth() }, 500, egret.Ease.backOut).call(this.OnTweenComplete, this);
				break;
			}
			default: {
			}
		}
	}

	public OnTweenComplete() {
		egret.Tween.get(this.maskBg).to({ alpha: 1 }, 500, egret.Ease.backOut);
	}

	public static removeTips(tips:egret.DisplayObject) {
		if (tips && tips.stage) {
			tips.parent.removeChild(tips);
		}
		/*
			var onComplete: Function = function () {
				if (tips.parent) {
					tips.parent.removeChild(tips);
					tips = null;
				}
			};
			egret.Tween.get(tips).to({ alpha: 0 }, 300).call(onComplete, this);
		 */
	}
	// 获取高度
	public getHeight(): number {
		return this.bg.height;

	}
	// 获取宽度
	public getWidth(): number {
		return this.bg.width;

	}
}