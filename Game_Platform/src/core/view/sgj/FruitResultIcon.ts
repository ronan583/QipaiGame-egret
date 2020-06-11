class FruitResultIcon extends eui.Component implements  eui.UIComponent {
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
	
	private fruitIconImg:eui.Image;
	private fruitMultiLabel:eui.Label;

	public showResult(fruitIndex:number, count:number) {
		this.fruitIconImg.source = "fruitIcon_" + fruitIndex;
		this.fruitMultiLabel.text = "X" + count;
	}

	

}