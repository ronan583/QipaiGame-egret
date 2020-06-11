class ErmjRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/ErmjRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public resultIcon: eui.Label;
	public totalWin: eui.Label;
	public roomLevel: eui.Label;
	public zjTime: eui.Label;
	//public zjDiFen: eui.Label;
	public detailBtn: IButton;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public initData(data: any): void {
		this.zjTime.text = data.createTime;
		this.roomLevel.text = GameConfig.roomName(data.gameLevel);
		this.resultIcon.text = (data.costMoney >= 0) ? "赢" : "输";
		this.totalWin.text = CommonUtil.fixMoneyFormat(data.costMoney);
		var details = JSON.parse(data.recordInfo);
		//this.zjDiFen.text = (details.bottomBet / 1000).toString();
	}


}