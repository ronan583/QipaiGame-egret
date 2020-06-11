class BjlRoundResultCard extends eui.Component implements  eui.UIComponent {
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
		this.cardImgArr = [this.cardImg1, this.cardImg2, this.cardImg3];
	}

	private cardImg1:eui.Image;
	private cardImg2:eui.Image;
	private cardImg3:eui.Image;
	private dianImg:eui.Image;
	private failImg:eui.Image;
	private cardImgArr:Array<eui.Image> = [];

	public showItem(cards:Array<number>, dian:number, isfail:boolean) {
		for(let i=0;i<cards.length;i++) {
			if(cards[i] > 0) {
				this.cardImgArr[i].visible = true;
				this.cardImgArr[i].source = "cs_" + cards[i];
			} else {
				this.cardImgArr[i].visible = false;
			}
		}
		this.dianImg.source = "bjlGame_json.resultPoint" + dian;
		this.failImg.visible = isfail;
	}
}