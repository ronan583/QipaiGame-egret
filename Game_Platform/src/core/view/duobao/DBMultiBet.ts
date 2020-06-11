class DBMultiBet extends eui.Component implements  eui.UIComponent {
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

	private img:eui.Image;
	
	public showLight(isLight:boolean):void {
		if(isLight) {
			this.img.source = "duobao_zuanshi1";
		} else {
			this.img.source = "duobao_zuanshi2";
		}
	}

}