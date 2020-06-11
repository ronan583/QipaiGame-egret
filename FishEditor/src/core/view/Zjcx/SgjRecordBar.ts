class SgjRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/SgjRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjTime: eui.Label;
	public zjSy: eui.Label;
	public zjRoom: eui.Label;
	public zjXs: eui.Label;
	public zjDz: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public initData(data: any): void {
		this.zjTime.text = data.time;
		this.zjRoom.text = GameConfig.roomName(data.room);
		this.zjSy.text = (data.money / 1000).toFixed(2);
		var details = JSON.parse(data.details);
		this.zjDz.text = (details.stakeCount / 1000).toString();
		this.zjXs.text = (details.lineCount).toString();
	}
}