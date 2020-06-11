class DDZJiaofen extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.callBtnArr = [this.callBtn1, this.callBtn2, this.callBtn3];
		this.callBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCallBtnClick0, this);
		this.callBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCallBtnClick1, this);
		this.callBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCallBtnClick2, this);
		this.callBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCallBtnClick3, this);
	}

	public callBtn0: eui.Button;
	public callBtn1: eui.Button;
	public callBtn2: eui.Button;
	public callBtn3: eui.Button;

	public callBtnArr: Array<eui.Button>;
	public activeBtns: Array<eui.Button> = new Array<eui.Button>();

	public clock: DDZClock;

	private sendCall(score: number): void {
		DDZRequest.callScore(score);
	}

	private onCallBtnClick0(): void {
		this.sendCall(0);
	}

	private onCallBtnClick1(): void {
		this.sendCall(1);
	}

	private onCallBtnClick2(): void {
		this.sendCall(2);
	}

	private onCallBtnClick3(): void {
		this.sendCall(3);
	}

	private hideAll(): void {
		this.callBtn1.visible = false;
		this.callBtn2.visible = false;
		this.callBtn3.visible = false;
	}

	public show(score: number): void {
		this.visible = true;
		this.activeBtns = new Array<eui.Button>();
		for (let i = 0; i < 3; i++) {
			if (i >= score) {
				this.activeBtns.push(this.callBtnArr[i]);
			}
		}
		this.showActive();
		this.clock.startClock(game.ddz.DDZBattleData.getInstance().downTime);
	}

	public hide(): void {
		this.visible = false;
	}

	public showActive(): void {
		this.hideAll();
		let xprefix = 319;
		for (let i = 0; i < this.activeBtns.length; i++) {
			this.activeBtns[i].visible = true;
			this.activeBtns[i].left = xprefix;
			xprefix += this.activeBtns[i].width + 10;
		}
	}

}
