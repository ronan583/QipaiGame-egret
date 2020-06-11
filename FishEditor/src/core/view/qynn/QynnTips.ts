class QynnTips extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public tipLabel: eui.Image;
	public countLabel: eui.BitmapLabel;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.tipLabel.addEventListener(eui.UIEvent.RESIZE, this.onResize, this);
	}

	public initUI(tipSource, countNum) {
		this.tipLabel.source = tipSource;
		this.tipLabel.validateNow();
		// this.countLabel.textColor = countColor;
		this.countLabel.text = countNum;
		this.countLabel.validateNow();
		this.countLabel.x = this.tipLabel.width + this.tipLabel.x + 10;
		this.stopEllipsis();
	}

	public onResize(event: eui.UIEvent) {
		this.countLabel.x = this.tipLabel.width + this.tipLabel.x + 10;
	}

	public startEllipsis(time: number = 99): void {
		if (this.endTime > 0) {
			this.stopEllipsis();
		}
		this.endTime = Math.floor(egret.getTimer() / 1000) + time;
		egret.startTick(this.showEllipsis, this);
	}

	public stopEllipsis(): void {
		this.endTime = 0;
		egret.stopTick(this.showEllipsis, this);
	}

	private endTime: number;
	private lastTime = -1;
	private showEllipsis(timestamp: number): boolean {
		let time = this.endTime - Math.floor(timestamp / 1000);
		if (time < 0) {
			this.stopEllipsis();
		} else {
			this.lastTime = time;
			if (time % 3 == 0) {
				this.countLabel.text = '...';
			} else if (time % 3 == 1) {
				this.countLabel.text = '..';
			} else if (time % 3 == 2) {
				this.countLabel.text = '.';
			}
		}
		return true;
	}
}