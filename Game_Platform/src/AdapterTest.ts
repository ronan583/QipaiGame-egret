class AdapterTest extends eui.Component implements  eui.UIComponent {
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
		this.width = egret.lifecycle.stage.stageWidth;
		egret.log(egret.lifecycle.stage.stageWidth + "=============" + egret.lifecycle.stage.$stageHeight)
	}
	
}