class MainMenuIcon extends eui.Component implements  eui.UIComponent {
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
		this.menuAnim = new game.CommonDBLoop(this.menuStr + "_ske_json", this.menuStr + "_tex_json", this.menuStr + "_tex_png", "menuAnim");
		
        this.addChild(this.menuAnim);
		this.menuAnim.x = this.width / 2;
		if(this.isBottom) {
			this.menuAnim.y = this.height;
		} else {
			this.menuAnim.y = this.height / 2;
		}
	}

	public menuStr:string = "";
	public isBottom:boolean = false;
	private menuAnim:game.CommonDBLoop;
	
}