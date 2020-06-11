class DDZSmallPoker extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		// 初始化显示背面
		this.showFrontOrBack(game.CardDirection.BACK);
	}

	public bg: eui.Image;
	public cardImg: eui.Image;
	private kingType: game.ddz.KingType = game.ddz.KingType.NONE;

	public showFrontOrBack(dir: game.CardDirection): void {
		if (dir == game.CardDirection.FRONT) {
			this.cardImg.visible = true;
			this.bg.visible = false;
		} else {
			this.cardImg.visible = false;
			this.bg.visible = true;
		}
	}

	public isBackShow() {
		return this.bg.visible;
	}

	/**
	 * 显示扑克牌数字
	 */
	public showCard(cardNum: number): void {
		this.showFrontOrBack(game.CardDirection.FRONT);
		this.cardImg.source = "cs2_" + cardNum;
	}

}