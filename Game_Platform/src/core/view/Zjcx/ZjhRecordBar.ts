class ZjhRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/ZjhRecordBarSkin.exml";
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
		this.roomLevelImg.source = "zjh_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "zjh_zjcx_iconwin_png";
			this.totalWin.font = "zjh_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "zjh_zjcx_iconlose_png";
			this.totalWin.font = "zjh_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
	}

	public onDetails() {
		let panel = new ZjhRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class ZjhRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/ZjhRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public bgImg1: eui.Image;
	public bgImg2: eui.Image;
	public costMoney: number;

	public selfCard1: eui.Image;
	public selfCard2: eui.Image;
	public selfCard0: eui.Image;
	public selfCardArr: eui.Image[];
	public winnerCard1: eui.Image;
	public winnerCard2: eui.Image;
	public winnerCard0: eui.Image;
	public winnerCardArr: eui.Image[];

	public typeBg1: eui.Image;
	public type1: eui.Label;
	public typeBg2: eui.Image;
	public type2: eui.Label;

	public typeTxtArr: string[];

	public winIcon: eui.Image;
	public discardIcon: eui.Image;

	public totalBetLabel: eui.BitmapLabel;
	public winLabel: eui.BitmapLabel;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.selfCardArr = [this.selfCard0, this.selfCard1, this.selfCard2];
		this.winnerCardArr = [this.winnerCard0, this.winnerCard1, this.winnerCard2];
		//0.散牌 1.对子 2.顺子 3.同花 4.同花顺 5.豹子
		this.typeTxtArr = ["高牌", "对子", "顺子", "同花", "同花顺", "豹子"];
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

		this.winnerCard0.visible = false;
		this.winnerCard1.visible = false;
		this.winnerCard2.visible = false;
		this.type2.visible = false;
		this.typeBg2.visible = false;
		this.discardIcon.visible = false;

		this.totalBetLabel.text = CommonUtil.fixMoneyFormat(data.totalStake / 1000);

		let myType: number = data.myType;
		let myList = data.handCards;
		let winnerType: number;
		let winnerList: number[];
		for(let i = 0; i < myList.length; i++){
			this.showCard(this.selfCardArr[i], myList[i]);
		}
		this.type1.text = this.typeTxtArr[myType];

		if (this.costMoney < 0) {
			this.bgImg1.visible = true;
			this.bgImg2.visible = false;
			winnerType = data.winType;
			winnerList = data.winCardList;
			this.winIcon.source = "zjh_zjcx_iconlose_png";
			this.winLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "zjh_zjcx_lose_fnt";
			for (let i = 0; i < winnerList.length; i++) {
				this.showCard(this.winnerCardArr[i], winnerList[i]);
				this.winnerCardArr[i].visible = true;
			}
			this.typeBg2.visible = true;
			this.type2.visible = true;
			this.type2.text = this.typeTxtArr[winnerType];
			if(data.isQi){
				this.discardIcon.visible = true;
			}
		} else {
			this.bgImg1.visible = false;
			this.bgImg2.visible = true;
			this.winLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winLabel.font = "zjh_zjcx_win_fnt";
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
				return "zjh_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "zjh_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "zjh_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "zjh_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
}
