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
			if(this.costMoney == 0){
				this.resultIcon.source = "bjl_zjcx_iconhe";
				this.totalWin.font = "bjl_zjcx_lose_fnt"
				this.totalWin.text = CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));				
			}
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
	public labelArr: eui.BitmapLabel[];

	public nobetIcon0: eui.Image;
	public nobetIcon1: eui.Image;
	public nobetIcon2: eui.Image;
	public nobetIcon3: eui.Image;
	public nobetIcon4: eui.Image;
	public nobetIconArr: eui.Image[];

	public pointZhuang: eui.Image;
	public pointXian: eui.Image;
	public point1: number;
	public point2: number;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.zhuangCardArr = [this.zhuangCard0, this.zhuangCard1, this.zhuangCard2];
		this.xianCardArr = [this.xianCard0, this.xianCard1, this.xianCard2];
		this.labelArr = [this.xianWinLabel, this.zhuangWinLabel, this.heWinLabel, this.xianduiWinLabel, this.zhuangduiWinLabel];
		this.nobetIconArr = [this.nobetIcon1, this.nobetIcon0, this.nobetIcon2, this.nobetIcon4, this.nobetIcon3];
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
		this.point1 = 0;
		this.point2 = 0;
		this.bankerIcon.visible = false;
		this.totalPoolImg.visible = false;
		this.totalBetImg.visible = false;
		for(let i = 0; i < 5; i++){
			this.labelArr[i].visible = true;
		}

		for(let i = 0; i < 5; i++){
			this.nobetIconArr[i].visible = false;
		}

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
			if(zhuangCard[i] < 0){
				continue;
			}
			this.showCard(this.zhuangCardArr[i], zhuangCard[i]);
			this.zhuangCardArr[i].visible = true;
			//算点数
			let point: number = Math.floor(zhuangCard[i] / 4);
			if(point >= 10 && point < 14) point = 0;
			if(point == 14)	point = 1;
			this.point1 += point;
			this.point1 = this.point1 % 10;
		}
		for(let i = 0; i < xianCard.length; i++){
			if(xianCard[i] < 0){
				continue;
			}
			this.showCard(this.xianCardArr[i], xianCard[i]);
			this.xianCardArr[i].visible = true;
			//算点数
			let point: number = Math.floor(xianCard[i] / 4);
			if(point >= 10 && point < 14) point = 0;
			if(point == 14)	point = 1;
			this.point2 += point;
			this.point2 = this.point2 % 10;
		}

		this.pointZhuang.source = "bjlGame_json.resultPoint" + this.point1;
		this.pointXian.source = "bjlGame_json.resultPoint" + this.point2;

		var typeArr = [data.type1, data.type2, data.type3, data.type4, data.type5];
		for(let i = 0; i < 5; i++){
			this.labelArr[i].text = CommonUtil.fixMoneyFormat(typeArr[i] / 1000);
			if(typeArr[i] <= 0){
				this.labelArr[i].visible = false;
				this.nobetIconArr[i].visible = true;
			}
		}
		// this.xianWinLabel.text = CommonUtil.fixMoneyFormat(data.type1 / 1000);
		// this.zhuangWinLabel.text = CommonUtil.fixMoneyFormat(data.type2 / 1000);
		// this.heWinLabel.text = CommonUtil.fixMoneyFormat(data.type3 / 1000);
		// this.xianduiWinLabel.text = CommonUtil.fixMoneyFormat(data.type4 / 1000);
		// this.zhuangduiWinLabel.text = CommonUtil.fixMoneyFormat(data.type5 / 1000);
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
