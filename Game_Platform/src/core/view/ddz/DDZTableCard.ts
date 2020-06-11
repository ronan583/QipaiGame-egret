class DDZTableCard extends eui.Component implements  eui.UIComponent {
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
		this.showFrontOrBack(game.CardDirection.BACK);
		this.lordlandImg.visible = false;
	}
	
	public bg: eui.Image;
	public cardImg: eui.Image;
	public cardNumber:number;
	private lordlandImg:eui.Image;
	private kingType: game.ddz.KingType = game.ddz.KingType.NONE;

	public showFrontOrBack(dir: game.CardDirection): void {
		if (dir == game.CardDirection.FRONT) {
			this.cardImg.visible = true;
			this.bg.visible = false;
		} else {
			this.cardImg.visible = false;
			this.bg.visible = true;
		}
	}

	public showCard(cardNum: number): void {
		this.showFrontOrBack(game.CardDirection.FRONT);
		this.cardNumber = cardNum;
		this.cardImg.source = "cs3_" + cardNum;
	}

	public showLandlord() {
		this.lordlandImg.visible = true;
	}
}