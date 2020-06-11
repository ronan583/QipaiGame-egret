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
		this.roomLevelImg.source = "pdk_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.totalWin.font = "pdk_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.totalWin.font = "pdk_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isWin){
			this.resultIcon.source = "pdk_zjcx_iconwin";
		} else{
			this.resultIcon.source = "pdk_zjcx_iconlose";
		}
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

	public baopeiIcon: eui.Image;
	
	public winIcon: eui.Image;
	public winLabel: eui.BitmapLabel;

	public bottomBet: eui.Label;
	public boomNum: eui.Label;
	public spring: eui.Label;
	public cardNum: eui.Label;

	public cardnumImg: eui.Label;
	public cardnumImg1: eui.Label;
	

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
		this.boomNum.text = "x" + data.boomCount;
		this.spring.text = (data.spring == 0 ? "---" : ("x" + data.spring));
		this.cardNum.text = data.cardNum + "";

		if(data.isBaoPei){
			this.baopeiIcon.visible = true;
		}else{
			this.baopeiIcon.visible = false;
		}

		if (this.costMoney >= 0) {
			//this.winIcon.source = "pdk_zjcx_iconwin";
			this.winLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "pdk_zjcx_win_fnt";
			this.cardnumImg.visible = true;
			this.cardnumImg1.visible = false;
		} else {
			//this.winIcon.source = "pdk_zjcx_iconlose";
			this.winLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "pdk_zjcx_lose_fnt";
			this.cardnumImg.visible = false;
			this.cardnumImg1.visible = true;			
		}

		if(data.isWin){
			this.winIcon.source = "pdk_zjcx_iconwin";
		} else{
			this.winIcon.source = "pdk_zjcx_iconlose";
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
				return "pdk_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "pdk_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "pdk_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "pdk_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
