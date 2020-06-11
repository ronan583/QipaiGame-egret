class FruitLineIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	private lineIconImg:eui.Image;
	private linexIndex:number;
	private startTime:number;

	public showLine(lineIndex:number,isopen:boolean) {
		this.linexIndex = lineIndex;
		this.lineIconImg.source = "nf_l" + (lineIndex ).toFixed(0) + "_" + (isopen ? "on" : "off");
	}

	public bright() {
		let color:number = game.GameConst.getFruitColorFilter(this.linexIndex);//0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
		let alpha:number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		let blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		let blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		let strength:number = 1;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		let quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		let inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		let knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
		let glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
			strength, quality, inner, knockout );
		this.lineIconImg.filters = [
			glowFilter
		]
		this.startTime = egret.getTimer();
		egret.startTick(this.updateBright, this);
	}

	private updateBright(timestamp:number):boolean {
		if(this.lineIconImg.filters.length == 0) {
			egret.stopTick(this.updateBright, this);
			return;
		}
		let growFilter = <egret.GlowFilter>this.lineIconImg.filters[0];
		if(growFilter) {
			let pass = timestamp - this.startTime;
			let p = Math.floor(pass / 1000) % 2;
			if(p == 0) {
				growFilter.strength = ((pass % 1000) / 1000) * 5;
			} else {
				growFilter.strength = (1 - (pass % 1000) / 1000) * 5;
			}
		}
	}

	public stopBright() {
		this.lineIconImg.filters = [];
		egret.stopTick(this.updateBright, this);
	}
	
}