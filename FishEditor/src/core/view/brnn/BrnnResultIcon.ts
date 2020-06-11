class BrnnResultIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
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
		if(value == 0) {
			this.typeAnim0.visible = true;
			this.typeAnim0.playerOnce();
		}
		if(value >= 1 && value <= 6) {
			this.typeAnim1.visible = true;
			this.typeAnim1.playerOnce(null, null, "niu" + value);
		}
		if(value >= 7 && value <= 9) {
			this.typeAnim2.visible = true;
			this.typeAnim2.playerOnce(null, null, "niu" + value);
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

	public ShowUI0(brnnResultValue:number)
	{
		egret.log("show brnn type icon : " + brnnResultValue);
		if(brnnResultValue <= 0)
		{
			this.typeImg.source = "brnn_niu_0";
			this.bgImg.source = "brnn_niu_bg5";
			this.bgImg.visible = true;
			this.typeImg.visible = true;
			this.typeAnim10.visible = this.typeAnim11.visible = this.typeAnim12.visible = false;
		}else
		{
			this.typeImg.source = "brnn_niu_" + brnnResultValue.toFixed(0);
			if(brnnResultValue >= 1 && brnnResultValue <=3) {
				this.bgImg.source = "brnn_niu_bg3";
			} else if(brnnResultValue >= 4 && brnnResultValue <= 6) {
				this.bgImg.source = "brnn_niu_bg2";
			} else if(brnnResultValue >= 7 && brnnResultValue <= 9) {
				this.bgImg.source = "brnn_niu_bg1";
			}
			if(brnnResultValue >= 10) {
				this.bgImg.visible = false;
				this.typeImg.visible = false;
				if(brnnResultValue == 10) {
					this.typeAnim11.visible = this.typeAnim12.visible = false;
					this.typeAnim10.visible = true;
					this.typeAnim10.playerOnce();
				} else if(brnnResultValue == 11) {
					this.typeAnim10.visible = this.typeAnim12.visible = false;
					this.typeAnim11.visible = true;
					this.typeAnim11.playerOnce();
				} else if(brnnResultValue == 12) {
					this.typeAnim11.visible = this.typeAnim10.visible = false;
					this.typeAnim12.visible = true;
					this.typeAnim12.playerOnce();
				}
			} else {
				this.typeAnim10.visible = this.typeAnim11.visible = this.typeAnim12.visible = false;
				this.bgImg.visible = true;
				this.typeImg.visible = true;
			}
		}
		
	}
}