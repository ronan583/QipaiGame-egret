class LhdbRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/LhdbRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjTime: eui.Label;
	public zjRoom: eui.Label;
	public zjXianShu: eui.Label;
	public zjDianShu: eui.Label;
	public zjXHJB: eui.Label;
	public zjHDJB: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public initData(data: any): void {

		this.zjTime.text = data.time;
		this.zjRoom.text = this.roomName(data.room);
		var detals = JSON.parse(data.details);
		this.zjDianShu.text = detals.stakeCount;
		this.zjXianShu.text = detals.lineCount;
		this.zjXHJB.text = (data.costMoney / 1000).toFixed(2);
		this.zjHDJB.text = (data.money / 1000).toFixed(2);
	}
	private roomName(roomLevel: number): string {
		if (roomLevel == 1) {
			return "金币场";
		}
		return "";
	}

}