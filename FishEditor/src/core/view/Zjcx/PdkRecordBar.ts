class PdkRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/PdkRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjLine: eui.Image;

	public bankerIcon: eui.Image;	
	public resultIcon: eui.Image;
	public totalWin: eui.BitmapLabel;
	public roomLevelImg: eui.Image;
	public zjTime: eui.Label;
	public detailBtn: IButton;

	public detailData: any;
	public costMoney: number;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetails, this);
	}

	public initData(data: any): void {
		this.zjTime.text = data.createTime;
		this.roomLevelImg.source = "ddk_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "ddk_zjcx_iconwin";
			this.totalWin.font = "ddk_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "ddk_zjcx_iconlose";
			this.totalWin.font = "ddk_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
	}

	public onDetails() {
		let panel = new PdkRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class PdkRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/PdkRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public costMoney: number;

	public bankerIcon: eui.Image;
	public roleIcon: eui.Image;

	public winIcon: eui.Image;
	public winLabel: eui.BitmapLabel;

	public bottomBet: eui.Label;
	public publicMulti: eui.Label;
	public farmerMulti: eui.Label;
	public allMulti: eui.Label;
	public callScore: eui.Label;
	public boomNum: eui.Label;
	public spring: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	protected addToStage() {
		super.addToStage();
		egret.setTimeout(() => {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
		}, this, 100);
	}
	private removeFromStage() {
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
	}

	private stageClick(e: egret.TouchEvent) {
		if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
			PopUpManager.removePopUp(this);
		}
	}

	public init(data: any, money: number) {
		this.costMoney = money;

		this.bottomBet.text = data.bottomBet / 1000 + "";
		this.publicMulti.text = "x" + data.publicMultiple;
		this.farmerMulti.text = "x" + data.nMMultiple;
		this.allMulti.text = "x" + data.allMultiple;
		this.callScore.text = data.score;
		this.boomNum.text = "x" + data.boom;
		this.spring.text = (data.spring == 0 ? "---" : ("x" + data.spring))

		if(data.isDz){
			this.bankerIcon.visible = true;
			this.roleIcon.source = "ddk_zjcx_imgbanker";
		}else{
			this.bankerIcon.visible = false;
			this.roleIcon.source = "ddk_zjcx_imgfarmer";
		}

		if (this.costMoney >= 0) {
			this.winIcon.source = "ddk_zjcx_iconwin";
			this.winLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "ddk_zjcx_win_fnt";
		} else {
			this.winIcon.source = "ddk_zjcx_iconlose";
			this.winLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "ddk_zjcx_lose_fnt";
		}
	}	

	private showCard(cardImg: eui.Image, cardNum: number) {
		let suit: number = Math.floor(cardNum % 4);
		let cardN: number = Math.floor(cardNum / 4);
		if (cardN == 14) {
			cardN = 1;
		}
		cardImg.source = this.getSuitSource(suit, cardN);
	}
	private getSuitSource(cardSuit: game.CardSuit, cardNum: number): string {
		switch (cardSuit) {
			case game.CardSuit.CLUB:
				return "ddk_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "ddk_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "ddk_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "ddk_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
