class DzpkChipGroup extends eui.Component implements  eui.UIComponent {
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
		this.chipImgArr = [this.chip1Img, this.chip2Img, this.chip3Img, this.chip4Img, this.chip5Img];
		this.hideAllChip();
	}

	public goldLabel:eui.Label;
	public chipImgArr:Array<eui.Image>;
	private chip1Img:eui.Image;
	private chip2Img:eui.Image;
	private chip3Img:eui.Image;
	private chip4Img:eui.Image;
	private chip5Img:eui.Image;

	private hideAllChip():void {
		for(let chipImg of this.chipImgArr) {
			chipImg.visible = false;
		}
	}

	public showGold(gold:number, bottom:number):void {
		let goldstr:string = gold.toFixed(0);
		this.goldLabel.text = goldstr;
		this.hideAllChip();
		let count = Math.floor(gold / (bottom * 10));
		count = Math.max(count, 1);
		count = Math.min(count, 5);
		this.chipImgArr[count - 1].visible = true;
	}

	public flyToWin(pos:egret.Point):void {
		var animChipArr:Array<eui.Image> = [];
		for(let chipImg of this.chipImgArr) {
			if(chipImg.visible && chipImg.parent) {
				var globalPos:egret.Point = chipImg.parent.localToGlobal(chipImg.x, chipImg.y);
                var animChip:eui.Image = new eui.Image();
                this.stage.addChild(animChip);
                animChip.x = globalPos.x;
                animChip.y = globalPos.y;
				animChip.source = chipImg.source;
                var tw:egret.Tween = egret.Tween.get(animChip);
                tw.to({x:pos.x, y:pos.y}, 500);
				animChipArr.push(animChip);
			}
		}
		egret.setTimeout(()=>{
			for(let chip of animChipArr) {
				chip.parent.removeChild(chip);
			}
		},this,550);
	}
	
}