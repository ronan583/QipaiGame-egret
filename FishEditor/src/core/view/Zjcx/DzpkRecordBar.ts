class DzpkRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/DzpkRecordBarSkin.exml";
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
		this.roomLevelImg.source = "dzpk_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "dzpk_zjcx_iconwin";
			this.totalWin.font = "dzpk_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "dzpk_zjcx_iconlose";
			this.totalWin.font = "dzpk_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
	}

	public onDetails() {
		let panel = new DzpkRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class DzpkRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/DzpkRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public costMoney: number;

	public selfCard0: eui.Image;
	public selfCard1: eui.Image;
	public selfCardArr: eui.Image[];
	public publicCard0: eui.Image;
	public publicCard1: eui.Image;
	public publicCard2: eui.Image;
	public publicCard3: eui.Image;
	public publicCard4: eui.Image;
	public publicCardArr: eui.Image[];

	public typeBg1: eui.Image;
	public type1: eui.Label;
	public typeTxtArr: string[];

	public winIcon: eui.Image;

	public totalBetLabel: eui.BitmapLabel;
	public winLabel: eui.BitmapLabel;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.selfCardArr = [this.selfCard0, this.selfCard1];
		this.publicCardArr = [this.publicCard0, this.publicCard1, this.publicCard2, this.publicCard3, this.publicCard4];
		this.typeTxtArr = ["高牌", "对子", "双对", "三张", "顺子", "同花", "葫芦", "四张", "同花顺", "皇家"];
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

		this.publicCard0.visible = false;
		this.publicCard1.visible = false;
		this.publicCard2.visible = false;
		this.publicCard3.visible = false;
		this.publicCard4.visible = false;

		this.totalBetLabel.text = CommonUtil.fixMoneyFormat(data.totalMoney / 1000);

		let myType: number = data.type;
		let myList = data.handCards;
		let publicList = data.publicCards;
		for(let i = 0; i < myList.length; i++){
			this.showCard(this.selfCardArr[i], myList[i]);
		}
		this.type1.text = this.typeTxtArr[myType];
		for(let i = 0; i < publicList.length; i++){
			this.publicCardArr[i].visible = true;
			this.showCard(this.publicCardArr[i], publicList[i]);
		}

		if (this.costMoney >= 0) {
			this.winIcon.source = "dzpk_zjcx_iconwin";
			this.winLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "dzpk_zjcx_win_fnt";
		} else {
			this.winIcon.source = "dzpk_zjcx_iconlose";
			this.winLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "dzpk_zjcx_lose_fnt";
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
				return "dzpk_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "dzpk_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "dzpk_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "dzpk_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
