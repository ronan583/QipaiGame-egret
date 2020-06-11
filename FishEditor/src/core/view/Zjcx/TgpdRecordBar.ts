class TgpdRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/TgpdRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjTime: eui.Label;
	public zjSy: eui.Label;
	public zjRoom: eui.Label;
	public zjZS: eui.Label;
	public zjDXS: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public initData(data: any): void {
		this.zjTime.text = data.time;
		this.zjRoom.text = this.roomName(data.room);
		this.zjSy.text = data.money.toString();
		var detals = JSON.parse(data.details);
		this.zjZS.text = detals.stakeCount;
		this.zjDXS.text = detals.lineCount;
	}
	private roomName(roomLevel: number): string {
		if (roomLevel == 1) {
			return "金币场";
		}
		return "";
	}

}