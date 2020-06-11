class BSTweenCard extends eui.Component implements eui.UIComponent {
	public constructor(cardBgRes: string = "") {
		super();
		this.cardBgRes = cardBgRes;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private cardBgRes: string = "";

	private p0x: number = 0;
	private p0y: number = 0;

	private p1x: number = 0;
	private p1y: number = 0;

	private p2x: number = 0;
	private p2y: number = 0;

	private completeCallback: Function;
	private completeCallbackCaller: any;
	public tweenCard: eui.Image;
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.cardBgRes != "") {
			this.tweenCard.source = this.cardBgRes;
		}
	}

	private card: egret.DisplayObject;

	public startTween(p0x: number, p0y: number, p2x: number, p2y: number,
		targetScaleX: number, targetScaleY: number, card: egret.DisplayObject,
		callback: Function = null, callbackCaller: any = null): void {
		this.card = card;
		this.p0x = p0x;
		this.p0y = p0y;
		this.p2x = p2x;
		this.p2y = p2y;

		this.p1x = (this.p0x + this.p2x) / 2;
		this.p1y = (this.p0y + this.p2y) / 2 * 0.5;
		let tw = egret.Tween.get(this);
		this.completeCallback = callback;
		this.completeCallbackCaller = callbackCaller;
		// tw.to({factor: 1, scaleX:targetScaleX, scaleY:targetScaleY}, 500);
		tw.to({ x: this.p2x, y: this.p2y, scaleX: targetScaleX, scaleY: targetScaleY, rotation: 0 }, 500).call(this.onComplete, this);
	}

	public startTween2(p0x: number, p0y: number, p2x: number, p2y: number,
		targetScaleX: number, targetScaleY: number, rotation: number, card: egret.DisplayObject,
		callback: Function = null, callbackCaller: any = null): void {
		this.card = card;
		this.p0x = p0x;
		this.p0y = p0y;
		this.p2x = p2x;
		this.p2y = p2y;

		this.p1x = (this.p0x + this.p2x) / 2;
		this.p1y = (this.p0y + this.p2y) / 2 * 0.5;
		let tw = egret.Tween.get(this);
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
		this.completeCallback = callback;
		this.completeCallbackCaller = callbackCaller;
		// tw.to({factor: 1, scaleX:targetScaleX, scaleY:targetScaleY}, 500);
		tw.to({ x: this.p2x, y: this.p2y, scaleX: targetScaleX, scaleY: targetScaleY, rotation: rotation }, 350).call(this.onComplete, this);
	}

	private onComplete(): void {
		if (this.parent) this.parent.removeChild(this);
		this.card.visible = true;
		CommonCardSoundPlayer.instance.playerSendCard();
		if (this.completeCallback != null) {
			this.completeCallback.call(this.completeCallbackCaller);
		}
	}

	public hideTween(): void {
		this.scaleX = 1;
		this.scaleY = 1;
		this.card.visible = true;
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		this.x = (1 - value) * (1 - value) * this.p0x + 2 * value * (1 - value) * this.p1x + value * value * this.p2x;
		this.y = (1 - value) * (1 - value) * this.p0y + 2 * value * (1 - value) * this.p1y + value * value * this.p2y;
	}

}