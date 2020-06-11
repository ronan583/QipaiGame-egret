class DZPKChip extends eui.Component implements eui.UIComponent {
    
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public getChipResName(): string {
		return this.chipResName;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}
	public gold: eui.Label;
	private chipResName: string;
	bindPlayer: DZPKHeadIcon;
	public lastValue:number = 0;
	public goldImg:eui.Image;

	public showChip(chipNum: number): void {
		if (chipNum <= 0) {
			this.visible = false;
			this.lastValue = 0;
		} else {
			this.visible = true;
			if(chipNum != this.lastValue) {
				// 播放动画
				for(let i=0;i<5;i++) {
					CommonUtil.registerTimeOut(()=>{
						let img = new eui.Image("ndzpk_chip_gold")
						img.anchorOffsetX = 15;
						img.anchorOffsetY = 15;
						let fromPos = this.bindPlayer.getHeadPos();
						fromPos = this.globalToLocal(fromPos.x, fromPos.y);
						this.addChild(img);
						img.x = fromPos.x;
						img.y = fromPos.y;
						egret.Tween.get(img).to({x:this.goldImg.x, y:this.goldImg.y}, 300).call(()=>{
							if(img.parent) img.parent.removeChild(img);
						}, this);
					}, this, 50 * i)
				}
			}
			this.lastValue = chipNum;
		}
		this.gold.text = chipNum.toFixed(0);
		this.chipResName = "chip_g";
	}

}