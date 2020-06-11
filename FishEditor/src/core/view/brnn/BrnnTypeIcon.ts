class BrnnTypeIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	private bgImg : eui.Image;
	private typeImg : eui.Image;
	private typeAnim0: DragonAnim;
	private typeAnim1 : DragonAnim;
	private typeAnim2 : DragonAnim;
	private typeAnim10 : DragonAnim;
	private typeAnim11 : DragonAnim;
	private typeAnim12 : DragonAnim;

	private typeAnimArr:Array<DragonAnim>;

	protected childrenCreated() {
		super.childrenCreated();
		this.typeAnimArr = [this.typeAnim0, this.typeAnim1, this.typeAnim2, this.typeAnim10, this.typeAnim11, this.typeAnim12];
	}
	
	public ShowUI(value) {
		for(let anim of this.typeAnimArr) {
			anim.visible = false;
		}
		if(value = 0) {
			this.typeAnim0.visible = true;
			this.typeAnim0.playerOnce(null, null, "niu" + value);
		}
		if(value >= 1 && value <= 6) {
			this.typeAnim1.visible = true;
			this.typeAnim1.playerOnce(null, null, "niu" + value);
		}
		if(value >= 7 && value <= 9) {
			this.typeAnim2.visible = true;
			this.typeAnim2.playerOnce();
		}
		if(value == 10) {
			this.typeAnim10.visible = true;
			this.typeAnim10.playerOnce();
		} else if(value == 11) {
			this.typeAnim11.visible = true;
			this.typeAnim11.playerOnce();
		} else if(value == 12) {
			this.typeAnim12.visible = true;
			this.typeAnim12.playerOnce();
		}
	}


}