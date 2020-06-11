class QznnRecordBar extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/QznnRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjLine: eui.Image;
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
		this.roomLevelImg.source = "qznn_zjcx_labellevel" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney >= 0){
			this.resultIcon.source = "qznn_zjcx_iconwin";
			this.totalWin.font = "qznn_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "qznn_zjcx_iconlose";
			this.totalWin.font = "qznn_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
	}

	public onDetails() {
		let panel = new QznnRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);


		console.log(this.detailData);
		console.log("-----------------------");
		console.log(panel.otherCards);
		console.log(panel.otherType);
		console.log(panel.otherIsNiu);
		console.log("-----------------------");
	}

	private niuValue(cardType: number): string {
		if (cardType == 0) {
			return "无牛"
		} else if (cardType == 1) {
			return "牛一"
		} else if (cardType == 2) {
			return "牛二"
		} else if (cardType == 3) {
			return "牛三"
		} else if (cardType == 4) {
			return "牛四"
		} else if (cardType == 5) {
			return "牛五"
		} else if (cardType == 6) {
			return "牛六"
		} else if (cardType == 7) {
			return "牛七"
		} else if (cardType == 8) {
			return "牛八"
		} else if (cardType == 9) {
			return "牛九"
		} else if (cardType == 10) {
			return "牛牛"
		} else if (cardType == 11) {
			return "炸弹"
		} else if (cardType == 12) {
			return "五花牛"
		}
		return "";
	}
}
class QznnRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/QznnRecordPanelSkin.exml";
	}
	public recordData: any;

	public isBanker: boolean;
	public costMoney: number;

	public myCards: number[] = [0, 0, 0, 0, 0];
	public myType: number;
	public myIsNiu: boolean;
	public otherCards: Array<number[]> = new Array<number[]>();
	public otherType: Array<number> = new Array<number>();
	public otherIsNiu: Array<boolean> = new Array<boolean>();;

	private bankerGroup: eui.Group;
	private bgImg: eui.Image;
	private bgImg0: eui.Image;
	private winIcon: eui.Image;
	public bankerIcon: eui.Image;
	public winMoneyLabel: eui.BitmapLabel;

	private myGroup: QznnRecordCardGroup;
	private otherGroup0: QznnRecordCardGroup;
	private otherGroup1: QznnRecordCardGroup;
	private otherGroup2: QznnRecordCardGroup;
	private otherGroup3: QznnRecordCardGroup;
	private otherGroup00: QznnRecordCardGroup;
	private otherGroupArr: QznnRecordCardGroup[];


	protected childrenCreated(): void {
		super.childrenCreated();
		this.otherGroupArr = [this.otherGroup0, this.otherGroup1, this.otherGroup2, this.otherGroup3];
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

	public init(data: any, money: number){
		for (let i = 0; i < 4; i++) {
			this.otherGroupArr[i].visible = false;
			this.otherGroupArr[i].recoverY();
		}
		this.otherGroup00.visible = false;
		this.otherGroup00.recoverY();
		this.bankerIcon.visible = false;

		this.initData(data, money);
		this.initUI();
	}

	public initData(data: any, money: number) {
		this.isBanker = data.isBanker;
		this.costMoney = money;

		let card1 = data.myResult.cards;
		let arrLength1 = card1.length;
		for (let i = 0; i < card1.length; i++) {
			for (let j = 0; j < card1[i].length; j++) {
				this.myCards[i * card1[0].length + j] = card1[i][j];
			}
		}
		this.myType = data.myResult.playType;
		this.myIsNiu = this.myType > 0 ? true : false;
		this.myGroup.init(this.myCards, this.myType, this.myIsNiu);

		if (this.isBanker) {
			for (let i = 0; i < data.otherResult.length; i++) {
				let result = data.otherResult[i];
				this.otherCards.push([0, 0, 0, 0, 0]);
				for (let j = 0; j < result.cards.length; j++) {
					for (let k = 0; k < result.cards[j].length; k++) {
						this.otherCards[i][j * result.cards[0].length + k] = result.cards[j][k];
					}
				}
				this.otherType[i] = result.playType;
				this.otherIsNiu[i] = this.otherType[i] > 0 ? true : false;

				this.otherGroupArr[i].init(this.otherCards[i], this.otherType[i], this.otherIsNiu[i]);
				this.otherGroupArr[i].visible = true;
			}
		} else {
			let result = data.otherResult;
			this.otherCards.push([0, 0, 0, 0, 0]);
			for (let j = 0; j < result.cards.length; j++) {
				for (let k = 0; k < result.cards[j].length; k++) {
					this.otherCards[0][j * result.cards[0].length + k] = result.cards[j][k];
				}
			}
			this.otherType.push(result.playType);
			this.otherIsNiu.push(this.otherType[0] > 0 ? true : false);

			this.otherGroup00.init(this.otherCards[0], this.otherType[0], this.otherIsNiu[0]);
			this.otherGroup00.visible = true;
		}
	}

	private initUI() {
		if(this.isBanker){
			this.bankerIcon.visible = true;
			this.bgImg.visible = true;
			this.bgImg0.visible = false;
		}else{
			this.bankerIcon.visible = false;
			this.bgImg0.visible = true;
			this.bgImg.visible = false;		
		}
		if(this.costMoney >= 0){
			this.winMoneyLabel.font = "qznn_zjcx_win_fnt";
			this.winMoneyLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winIcon.source = "qznn_zjcx_iconwin";
		} else{
			this.winMoneyLabel.font = "qznn_zjcx_lose_fnt";
			this.winMoneyLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney))
			this.winIcon.source = "qznn_zjcx_iconlose";
		}
	}
}

class QznnRecordCardGroup extends eui.Component implements eui.UIComponent{
	public constructor() {
		super();
	}
	public cardCodes: number[] = [0, 0, 0, 0, 0];
	public isNiu: boolean;
	public playType: number;

	public card0: eui.Image;
	public card1: eui.Image;
	public card2: eui.Image;
	public card3: eui.Image;
	public card4: eui.Image;
	public cardArr: eui.Image[] ;

	public defaultY3: number;
	public defaultY4: number;

	public niuImg: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardArr= [this.card0, this.card1, this.card2, this.card3, this.card4];
		this.defaultY3 = this.card3.y;
		this.defaultY4 = this.card4.y;
	}
	

	public init(cards: number[], type: number, isNiu: boolean) {
		for(let i = 0; i < 5; i++){
			this.showCard(this.cardArr[i], cards[i]);
		}
		this.niuImg.source = "qznn_niu" + type;
		if(isNiu){
			this.card3.y -= 10;
			this.card4.y -= 10;
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
				return "qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "qznnresult_card_spade" + cardNum;
		}
		return "";
	}
	public recoverY(){
		this.card3.y = this.defaultY3;
		this.card4.y = this.defaultY4;
	}
}
