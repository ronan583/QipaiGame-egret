class HongHeiRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/HongHeiRecordBarSkin.exml";
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
		//todo
		this.roomLevelImg.source = "hhdz_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
		//todo
			this.resultIcon.source = "hhdz_zjcx_iconwin";
			this.totalWin.font = "hhdz_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "hhdz_zjcx_iconlose";
			this.totalWin.font = "hhdz_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isBanker){
			this.bankerIcon.visible = true;
		}	
	}

	public onDetails() {
		let panel = new HongheiRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class HongheiRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/HongHeiRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public isBanker: boolean;
	public costMoney: number;

	public winIcon1: eui.Image;
	public winIcon2: eui.Image;

	public hongCard1: eui.Image;
	public hongCard2: eui.Image;
	public hongCard0: eui.Image;
	public hongCardArr: eui.Image[];
	public heiCard1: eui.Image;
	public heiCard2: eui.Image;
	public heiCard0: eui.Image;
	public heiCardArr: eui.Image[];

	public hongType: eui.Image;
	public heiType: eui.Image;

	public totalPoolImg: eui.Image;
	public totalBetImg: eui.Image;
	public bankerIcon: eui.Image;

	public hongWinLabel: eui.Label;
	public heiWinLabel: eui.Label;
	public luckyWinLabel: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.hongCardArr = [this.hongCard0, this.hongCard1, this.hongCard2];
		this.heiCardArr = [this.heiCard0, this.heiCard1, this.heiCard2];
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

		this.hongWinLabel.visible = true;
		this.heiWinLabel.visible = true;
		this.luckyWinLabel.visible = true;

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
		
		let heiList = data.heiList;
		let hongList = data.hongList;
		for(let i = 0; i < heiList.length; i++){
			this.showCard(this.heiCardArr[i], heiList[i]);
		}
		for(let i = 0; i < hongList.length; i++){
			this.showCard(this.hongCardArr[i], hongList[i]);
		}

		this.heiType.source = "hhdz_history_cardtype_" + data.heiType;
		this.hongType.source = "hhdz_history_cardtype_" + data.hongType;

		this.hongWinLabel.text = CommonUtil.fixMoneyFormat(data.type1 / 1000);
		this.heiWinLabel.text = CommonUtil.fixMoneyFormat(data.type2 / 1000);
		this.luckyWinLabel.text = CommonUtil.fixMoneyFormat(data.type3 / 1000);
		if(data.type1 == 0){
			this.hongWinLabel.text = "未下注";
		}
		if(data.type2 == 0){
			this.heiWinLabel.text = "未下注";
		}
		if(data.type3 == 0){
			this.luckyWinLabel.text = "未下注";
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
				return "hhdz_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "hhdz_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "hhdz_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "hhdz_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
