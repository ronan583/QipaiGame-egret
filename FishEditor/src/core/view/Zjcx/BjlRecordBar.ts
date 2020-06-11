class BjlRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BjlRecordBarSkin.exml";
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
		this.roomLevelImg.source = "bjl_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "bjl_zjcx_iconwin";
			this.totalWin.font = "bjl_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "bjl_zjcx_iconlose";
			this.totalWin.font = "bjl_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isBanker){
			this.bankerIcon.visible = true;
		}	
	}

	public onDetails() {
		let panel = new BjlRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class BjlRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BjlRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public isBanker: boolean;
	public costMoney: number;

	public zhuangCard1: eui.Image;
	public zhuangCard2: eui.Image;
	public zhuangCard0: eui.Image;
	public zhuangCardArr: eui.Image[];
	public xianCard1: eui.Image;
	public xianCard2: eui.Image;
	public xianCard0: eui.Image;
	public xianCardArr: eui.Image[];

	public totalPoolImg: eui.Image;
	public totalBetImg: eui.Image;
	public bankerIcon: eui.Image;

	public zhuangWinLabel: eui.BitmapLabel;
	public xianWinLabel: eui.BitmapLabel;
	public heWinLabel: eui.BitmapLabel;
	public zhuangduiWinLabel: eui.BitmapLabel;
	public xianduiWinLabel: eui.BitmapLabel;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.zhuangCardArr = [this.zhuangCard0, this.zhuangCard1, this.zhuangCard2];
		this.xianCardArr = [this.xianCard0, this.xianCard1, this.xianCard2];
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
		for(let i = 0; i < 3; i++){
			this.zhuangCardArr[i].visible = false;
		}
		for(let i = 0; i < 3; i++){
			this.xianCardArr[i].visible = false;
		}

		let isBanker = data.isBanker;
		if(isBanker){
			this.bankerIcon.visible = true;
			this.totalPoolImg.visible = true;
		}else{
			this.totalBetImg.visible = true;
		}
		
		let zhuangCard = data.zhuangCard;
		let xianCard = data.xianCard;
		for(let i = 0; i < zhuangCard.length; i++){
			this.showCard(this.zhuangCardArr[i], zhuangCard[i]);
			this.zhuangCardArr[i].visible = true;
		}
		for(let i = 0; i < xianCard.length; i++){
			this.showCard(this.xianCardArr[i], xianCard[i]);
			this.xianCardArr[i].visible = true;
		}

		this.xianWinLabel.text = CommonUtil.fixMoneyFormat(data.type1 / 1000);
		this.zhuangWinLabel.text = CommonUtil.fixMoneyFormat(data.type2 / 1000);
		this.heWinLabel.text = CommonUtil.fixMoneyFormat(data.type3 / 1000);
		this.xianduiWinLabel.text = CommonUtil.fixMoneyFormat(data.type4 / 1000);
		this.zhuangduiWinLabel.text = CommonUtil.fixMoneyFormat(data.type5 / 1000);
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
				return "bjl_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "bjl_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "bjl_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "bjl_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
