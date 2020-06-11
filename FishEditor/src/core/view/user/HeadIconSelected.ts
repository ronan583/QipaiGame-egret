class HeadIconSelected extends eui.Component implements eui.UIComponent {

	public constructor() {
		super();
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public headImg: eui.Image;
	public selectedIcon: eui.Image;
	// public lockIcon: eui.Image;
	public needLevel: number;
	public frameIndex: number;
	private _selected: boolean = false;
	private type: changeIconType;
	public iconIndex: number;
	public needVIPLevel: number;
	private headShow: HeadShow;

	public set selected(value) {
		if (this._selected != value) {
			if (this.needVIPLevel > game.UserService.instance.vipLevel) {
				return;
			}
			this._selected = value;

			this.selectedIcon.visible = value;
		}
	}

	public init(iconIndex: number, type: changeIconType, needVIPLevel: number) {
		this.iconIndex = iconIndex;
		this.type = type;
		this.needVIPLevel = needVIPLevel;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		// if (this.type == changeIconType.head) {
		// 	this.headShow.showHead(this.iconIndex);
		// 	this.headShow.hideFrame();
		// } else {
		// 	this.headShow.showFrame(this.iconIndex);
		// 	this.headShow.hideHead();
		// }
		// if (this.needVIPLevel <= game.UserService.instance.vipLevel) {
		// 	this.lockIcon.visible = false
		// } else {
		// 	this.lockIcon.visible = true;
		// }
		this.headImg.source = "gp_head_" + (this.iconIndex + 1);
		this.selectedIcon.visible = this._selected;
	}

}