class BrnnRecordBar extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BrnnRecordBarSkin.exml";
	}

	public bgImage: eui.Image;
	public zjLine: eui.Image;
	public resultIcon: eui.Image;
	public totalWin: eui.BitmapLabel;
	public roomLevelImg: eui.Image;
	public zjTime: eui.Label;
	public detailBtn: IButton;
	public bankerIcon: eui.Image;

	public detailData: any;
	public costMoney: number;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetails, this);
	}

	public initData(data: any): void {
		this.bankerIcon.visible = false;
		this.zjTime.text = data.createTime;
		this.roomLevelImg.source = "brnn_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if (this.costMoney >= 0) {
			this.resultIcon.source = "brnn_zjcx_iconwin";
			this.totalWin.font = "brnn_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		} else {
			this.resultIcon.source = "brnn_zjcx_iconlose";
			this.totalWin.font = "brnn_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isBanker){
			this.bankerIcon.visible = true;
		}
	}

	public onDetails() {
		let panel = new BrnnRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
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
class BrnnRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BrnnRecordPanelSkin.exml";
	}
	public recordData: any;

	public isBanker: boolean;
	public costMoney: number;

	public cards0: number[] = [0, 0, 0, 0, 0];
	public cards1: number[] = [0, 0, 0, 0, 0];
	public cards2: number[] = [0, 0, 0, 0, 0];
	public cards3: number[] = [0, 0, 0, 0, 0];
	public cards4: number[] = [0, 0, 0, 0, 0];
	public cardsArr: number[][];
	public type0: number;
	public type1: number;
	public type2: number;
	public type3: number;
	public type4: number;
	public typeArr: number[];
	public isNiu0: boolean;
	public isNiu1: boolean;
	public isNiu2: boolean;
	public isNiu3: boolean;
	public isNiu4: boolean;
	public isNiuArr: boolean[];

	public betLabel0: eui.Label;
	public betLabel1: eui.Label;
	public betLabel2: eui.Label;
	public betLabel3: eui.Label;
	public betLabel4: eui.Label;
	public betLabelArr: eui.Label[];

	public winMoneyLabel0: eui.BitmapLabel;
	public winMoneyLabel1: eui.BitmapLabel;
	public winMoneyLabel2: eui.BitmapLabel;
	public winMoneyLabel3: eui.BitmapLabel;
	public winMoneyLabel4: eui.BitmapLabel;
	public winMoneyLabelArr: eui.BitmapLabel[];

	public nobetImg0: eui.Image;
	public nobetImg1: eui.Image;
	public nobetImg2: eui.Image;
	public nobetImg3: eui.Image;
	public nobetImg4: eui.Image;
	public nobetImgArr: eui.Image[];

	private cardGroup0: BrnnRecordCardGroup;
	private cardGroup1: BrnnRecordCardGroup;
	private cardGroup2: BrnnRecordCardGroup;
	private cardGroup3: BrnnRecordCardGroup;
	private cardGroup4: BrnnRecordCardGroup;
	private cardGroupArr: BrnnRecordCardGroup[];

	public bankerWinBg: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardsArr = [this.cards0, this.cards1, this.cards2, this.cards3, this.cards4];
		this.typeArr = [this.type0, this.type1, this.type2, this.type3, this.type4];
		this.isNiuArr = [this.isNiu0, this.isNiu1, this.isNiu2, this.isNiu3, this.isNiu4];
		this.betLabelArr = [this.betLabel0, this.betLabel1, this.betLabel2, this.betLabel3, this.betLabel4];
		this.winMoneyLabelArr = [this.winMoneyLabel0, this.winMoneyLabel1, this.winMoneyLabel2, this.winMoneyLabel3, this.winMoneyLabel4];
		this.nobetImgArr = [this.nobetImg0, this.nobetImg1, this.nobetImg2, this.nobetImg3, this.nobetImg4];
		this.cardGroupArr = [this.cardGroup0, this.cardGroup1, this.cardGroup2, this.cardGroup3, this.cardGroup4];
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
		for (let i = 0; i < 5; i++) {
			//this.cardGroupArr[i].visible = false;
			this.cardGroupArr[i].recoverY();
		}
		this.initData(data, money);
		// this.initUI();
	}

	public initData(data: any, money: number) {
		// this.isBanker = data.isBanker;
		this.costMoney = money;
		this.isBanker = data.isBanker;

		let playerRecords: Array<any> = new Array<any>();
		playerRecords.push(data.playerRecord0);
		playerRecords.push(data.playerRecord1);
		playerRecords.push(data.playerRecord2);
		playerRecords.push(data.playerRecord3);
		playerRecords.push(data.playerRecord4);

		for (let i = 0; i < 5; i++) {
			if (playerRecords[i].card1.length < 5) {
				this.cardsArr[i][0] = playerRecords[i].card1[0];
				this.cardsArr[i][1] = playerRecords[i].card1[1];
				this.cardsArr[i][2] = playerRecords[i].card1[2];
				this.cardsArr[i][3] = playerRecords[i].card2[0];
				this.cardsArr[i][4] = playerRecords[i].card2[1];
			} else {
				for (let j = 0; j < 5; j++) {
					this.cardsArr[i][j] = playerRecords[i].card1[j];
				}
			}

			this.typeArr[i] = playerRecords[i].type;
			this.isNiuArr[i] = this.typeArr[i] > 0 ? true : false;
			this.cardGroupArr[i].init(this.cardsArr[i], this.typeArr[i], this.isNiuArr[i]);

			if(i == 0){
				this.nobetImg0.visible = false;
				this.betLabel0.visible = false;
				if(this.isBanker){
					this.winMoneyLabel0.visible = true;
					this.bankerWinBg.visible = true;
				}else{
					this.winMoneyLabel0.visible = false;
					this.bankerWinBg.visible = false;
				}
			} else if (playerRecords[i].stakeMoney == 0) {
				this.nobetImgArr[i].visible = true;
				this.betLabelArr[i].visible = false;
			} else {
				this.nobetImgArr[i].visible = false;
				this.betLabelArr[i].text = "下注: " + playerRecords[i].stakeMoney / 1000;
				this.betLabelArr[i].visible = true;
			}

			if (playerRecords[i].winMoney >= 0) {
				this.winMoneyLabelArr[i].font = "brnn_zjcx_win_fnt";
				this.winMoneyLabelArr[i].text = "+" + CommonUtil.fixMoneyFormat(Math.abs(playerRecords[i].winMoney / 1000));
			} else {
				this.winMoneyLabelArr[i].font = "brnn_zjcx_lose_fnt";
				this.winMoneyLabelArr[i].text = "-" + CommonUtil.fixMoneyFormat(Math.abs(playerRecords[i].winMoney / 1000));
			}
		}
	}

	// private initUI() {
	// 	if (this.isBanker) {
	// 		this.bankerIcon.visible = true;
	// 		this.bgImg.visible = true;
	// 		this.bgImg0.visible = false;
	// 	} else {
	// 		this.bankerIcon.visible = false;
	// 		this.bgImg0.visible = true;
	// 		this.bgImg.visible = false;
	// 	}
	// 	if (this.costMoney >= 0) {
	// 		this.winMoneyLabel.font = "brnn_zjcx_win_fnt";
	// 		this.winMoneyLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
	// 		this.winIcon.source = "brnn_zjcx_iconwin";
	// 	} else {
	// 		this.winMoneyLabel.font = "brnn_zjcx_lose_fnt";
	// 		this.winMoneyLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney))
	// 		this.winIcon.source = "brnn_zjcx_iconlose";
	// 	}
	// }
}


class BrnnRecordCardGroup extends eui.Component implements eui.UIComponent {
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
	public cardArr: eui.Image[];

	public defaultY3: number;
	public defaultY4: number;

	public niuImg: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardArr = [this.card0, this.card1, this.card2, this.card3, this.card4];
		this.defaultY3 = this.card3.y;
		this.defaultY4 = this.card4.y;
	}


	public init(cards: number[], type: number, isNiu: boolean) {
		for (let i = 0; i < 5; i++) {
			this.showCard(this.cardArr[i], cards[i]);
		}
		this.niuImg.source = "brnn_zjcx_json.qznn_niu" + type;
		if (isNiu) {
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
				return "brnn_zjcx_json.qznnresult_card_club" + cardNum;
			case game.CardSuit.DIAMOND:
				return "brnn_zjcx_json.qznnresult_card_diamond" + cardNum;
			case game.CardSuit.HEART:
				return "brnn_zjcx_json.qznnresult_card_heart" + cardNum;
			case game.CardSuit.SPADE:
				return "brnn_zjcx_json.qznnresult_card_spade" + cardNum;
		}
		return "";
	}
	public recoverY() {
		this.card3.y = this.defaultY3;
		this.card4.y = this.defaultY4;
	}
}
