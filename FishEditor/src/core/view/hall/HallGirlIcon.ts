class HallGirlIcon extends eui.Component implements  eui.UIComponent {
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
		
		this.animGirl = new game.CommonDBLoop("DTqipai_ske_dbbin", "DTqipai_tex_json", "DTqipai_tex_png", "menuAnim");
		this.animGroup.addChild(this.animGirl);
		this.animGirl.x = this.animGroup.width / 2 + 35;
		this.animGirl.y	= this.animGroup.height + 10;
		this.animGirl.mask = this.maskRect;
	}

	private maskRect:eui.Rect;
	private animGroup:eui.Group;
	private animGirl:game.CommonDBLoop;
	
}