class CommonBg extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private loadingAnimGroup:eui.Group;
	private loadingAnim:game.CommonDBLoop;

	protected childrenCreated():void
	{
		super.childrenCreated();

		if(this.loadingAnim == null) {
			this.loadingAnim = new game.CommonDBLoop("loadingAnim_ske_json", "loadingAnim_tex_json", "loadingAnim_tex_png", "loadingAnim");
			this.loadingAnimGroup.addChild(this.loadingAnim);
			this.loadingAnim.x = this.loadingAnimGroup.width / 2;
			this.loadingAnim.y = this.loadingAnimGroup.height / 2;
		}
	}
	
}