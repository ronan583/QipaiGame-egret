class LongHuRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/LongHuRecordBarSkin.exml";
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
		this.bankerIcon.visible = false;
		this.zjTime.text = data.createTime;
		this.roomLevelImg.source = "lhdz_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "lhdz_zjcx_iconwin";
			this.totalWin.font = "lhdz_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "lhdz_zjcx_iconlose";
			this.totalWin.font = "lhdz_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isBanker){
			this.bankerIcon.visible = true;
		}	
	}

	public onDetails() {
		let panel = new LongHuRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class LongHuRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/LongHuRecordPanelSkin.exml";
	}

	public winIcon1: eui.Image;
	public winIcon2: eui.Image;

	public longCard: eui.Image;
	public huCard: eui.Image;

	public totalPoolImg: eui.Image;
	public totalBetImg: eui.Image;
	public bankerIcon: eui.Image;

	public longWinLabel: eui.Label;
	public huWinLabel: eui.Label;
	public heWinLabel: eui.Label;

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
		this.bankerIcon.visible = false;
		this.totalPoolImg.visible = false;
		this.totalBetImg.visible = false;
		this.winIcon1.visible = false;
		this.winIcon2.visible = false;

		let isBanker = data.isBanker;
		if(isBanker){
			this.bankerIcon.visible = true;
			this.totalPoolImg.visible = true;
		}else{
			this.totalBetImg.visible = true;
		}

		let winType = data.resutlType;
		if(winType == 1){
			this.winIcon1.visible = true;
		}else if(winType == 2){
			this.winIcon2.visible = true;
		}
		
		this.showCard(this.longCard, data.longCard);
		this.showCard(this.huCard, data.huCard);


		this.longWinLabel.text = CommonUtil.fixMoneyFormat(data.type1 / 1000);
		this.huWinLabel.text = CommonUtil.fixMoneyFormat(data.type2 / 1000);
		this.heWinLabel.text = CommonUtil.fixMoneyFormat(data.type3 / 1000);
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
				return "lhdz_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "lhdz_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "lhdz_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "lhdz_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
