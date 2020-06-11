class GameInfoIcon extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.refreshGameIcon();
	}

	public gameType: number = 0;
	public updateImg: eui.Image;
	public gameBtn: eui.Button;

	public checkUpdateShow(): void {
		/*
		let gameInfo:game.GamePackInfo = game.ModuleLoader.getInstance().getGameInfo(this.gameType);
		let isNeedUpdate:boolean = false;
		if(gameInfo != null && gameInfo.checkUpdate()) {
			isNeedUpdate = true;
		}
		*/
	}

	public refreshGameIcon(): void {
		var source: string = ""
		switch (this.gameType) {
			case game.ChildGameType.BRNN:
				source = "icon_brnn"
				break;
			case game.ChildGameType.DDZ:
				source = "icon_ddz"
				break;
			case game.ChildGameType.DZPK:
				source = "icon_dzpk"
				break;
			case game.ChildGameType.ERMJ:
				source = "icon_ermj"
				break;
			case game.ChildGameType.HHDZ:
				source = "icon_hhdz"
				break;
			case game.ChildGameType.LHDZ:
				source = "icon_lhdz"
				break;
			case game.ChildGameType.PDK:
				source = "icon_pdk"
				break;
			case game.ChildGameType.QYNN:
				source = "icon_qznn"
				break;
			case game.ChildGameType.ZJH:
				source = "icon_zjh"
				break;
			case game.ChildGameType.BRNN:
				source = "icon_brnn_png"
				break;
			case game.ChildGameType.FQZS:
				source = "gp_icon_lhdz"
				break;
		}
	}

}