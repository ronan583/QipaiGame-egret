class PlayerGoldShow extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public goldLabel:eui.Label;
	public goldBitmapLabel:eui.BitmapLabel;
	public typeArea:eui.Group;
	public typeLabel:eui.Label;
	private typeImg:eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.typeArea.visible = false;
	}

	public playerId:number = 0;

	public showGold(gold:number):void {
		this.goldLabel.text = gold.toString();
		this.goldBitmapLabel.text = gold.toString();
	}

	public hideType():void {
		this.typeArea.visible = false;
	}

	public showType(type:number):void {
		this.typeArea.visible = true;
		let str:string = game.GameConst.getTypeText(type);
		this.typeLabel.text = str;
		this.typeImg.source = game.GameConst.getTypeImgName(type)
	}
	
}