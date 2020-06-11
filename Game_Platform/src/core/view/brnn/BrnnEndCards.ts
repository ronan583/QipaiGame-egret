class BrnnEndCards extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private originY:number = 0;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.originY = this.cardImg1.y;
	}

	private cardImg1:eui.Image;
	private cardImg2:eui.Image;
	private cardImg3:eui.Image;
	private cardImg4:eui.Image;
	private cardImg5:eui.Image;
	private niuTypeImg:eui.Image;

	public showCard(cardInfo:BrnnCardInfo) {
		this.cardImg4.y = this.cardImg5.y = this.originY;
		if(cardInfo.cards.length > 1) {
			this.cardImg1.source = "cs_" + cardInfo.cards[0][0];
			this.cardImg2.source = "cs_" + cardInfo.cards[0][1];
			this.cardImg3.source = "cs_" + cardInfo.cards[0][2];
			this.cardImg4.source = "cs_" + cardInfo.cards[1][0];
			this.cardImg5.source = "cs_" + cardInfo.cards[1][1];
			this.cardImg5.y = this.cardImg4.y = this.originY - 20;
		} else {
			this.cardImg1.source = "cs_" + cardInfo.cards[0][0];
			this.cardImg2.source = "cs_" + cardInfo.cards[0][1];
			this.cardImg3.source = "cs_" + cardInfo.cards[0][2];
			this.cardImg4.source = "cs_" + cardInfo.cards[0][3];
			this.cardImg5.source = "cs_" + cardInfo.cards[0][4];
		}
		this.niuTypeImg.source = "brnn_end_niu_" + cardInfo.value;
	}
	
}