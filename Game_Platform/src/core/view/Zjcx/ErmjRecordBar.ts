class ErmjRecordBar extends eui.Component {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/ErmjRecordBarSkin.exml";
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
	// public resultIconDefaultX: number;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetails, this);
	}

	public initData(data: any): void {
		this.resultIcon.scaleX = this.resultIcon.scaleY = 1;

		this.zjTime.text = data.createTime;
		this.roomLevelImg.source = "ermj_zjcx_level" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if(this.costMoney > 0){
			this.resultIcon.source = "ermj_zjcx_iconwin";
			this.totalWin.font = "ermj_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}else{
			this.resultIcon.source = "ermj_zjcx_iconlose";
			this.totalWin.font = "ermj_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			if(this.costMoney == 0){
				this.resultIcon.source = "ermj_zjcx_iconliuju";
				this.resultIcon.scaleX = this.resultIcon.scaleY = 0.7;
				this.totalWin.text = CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			}
		}
		this.detailData = JSON.parse(data.recordInfo);
	}

	public onDetails() {
		let panel = new ErmjRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}

}
class ErmjRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/ErmjRecordPanelSkin.exml";
	}
		
		
	public recordData: any;

	public costMoney: number;
	public allCards: Array<number> = new Array<number>();
	public allCardImgs: Array<eui.Image> = new Array<eui.Image>();

	public huIcon: eui.Image;
	
	public winIcon: eui.Image;
	public winLabel: eui.BitmapLabel;

	public fanshu: eui.Label;
	public bottomBet: eui.Label;

	public winFanImg: eui.Image;
	public fanImg: eui.Image;

	public majongCard0: eui.Image;
	public majongCard1: eui.Image;
	public majongCard2: eui.Image;
	public majongCard3: eui.Image;
	public majongCard4: eui.Image;
	public majongCard5: eui.Image;
	public majongCard6: eui.Image;
	public majongCard7: eui.Image;
	public majongCard8: eui.Image;
	public majongCard9: eui.Image;
	public majongCard10: eui.Image;
	public majongCard11: eui.Image;
	public majongCard12: eui.Image;
	public majongCard13: eui.Image;
	public majongCard14: eui.Image;
	public majongCard15: eui.Image;
	public majongCard16: eui.Image;
	public majongCard17: eui.Image;
	public majongCardArr: eui.Image[];

	public cardGroup: eui.Group;

	public sourcePath = "ermj_battle_json.playedTiles";

	protected childrenCreated(): void {
		super.childrenCreated();
		this.majongCardArr = [this.majongCard0, this.majongCard1, this.majongCard2, this.majongCard3, this.majongCard4, this.majongCard5, 
		this.majongCard6, this.majongCard7, this.majongCard8, this.majongCard9, this.majongCard10, this.majongCard11, 
		this.majongCard12, this.majongCard13, this.majongCard14, this.majongCard15, this.majongCard16, this.majongCard17, ]
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
		for(let i = 0; i < 18; i++){
			this.majongCardArr[i].visible = false;
		}
		this.winIcon.scaleX = this.winIcon.scaleY = 1;
		this.huIcon.visible = false;
		this.costMoney = money;

		this.bottomBet.text = data.bottomBet / 1000 + "";
		this.fanshu.text = data.totalFan + "";

		var fallLength = 0;
		//this.cardGroup.removeChildren();
		if(data.fallCards){
			fallLength = data.fallCards.length;
			for (let i = 0; i < data.fallCards.length; i++) {
				this.majongCardArr[i].visible = true;
				this.showCard(this.majongCardArr[i], data.fallCards[i]);
				this.majongCardArr[i].x -= 8;
				// let majong = new eui.Image();
				// this.cardGroup.addChild(majong);
				// this.showCard(majong, data.fallCards[i]);
				this.allCards.push(data.fallCards[i]);
			}
		}
		for(let i = 0; i < data.handCards.length; i++){
			this.majongCardArr[i + fallLength].visible = true;
			this.showCard(this.majongCardArr[i + fallLength], data.handCards[i]);
			// let majong = new eui.Image();
			// this.cardGroup.addChild(majong);
			// this.showCard(this.majongCardArr[i + fallLength], data.handCards[i]);
			this.allCards.push(data.handCards[i]);
		}
		if (this.costMoney > 0) {
			this.winIcon.source = "ermj_zjcx_iconwin";
			this.winLabel.font = "ermj_zjcx_win_fnt";
			this.winLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winFanImg.visible = false;
			this.fanImg.visible = true;

			this.huIcon.visible = true;
			let huCard = data.huCard;
			let index = this.allCards.indexOf(huCard);
			if(index >= 0){
				this.huIcon.x = this.majongCardArr[index].x + 8;
				this.huIcon.y = this.majongCardArr[index].y - 30;
			}
		} else {
			this.winIcon.source = "ermj_zjcx_iconlose";
			this.winLabel.font = "ermj_zjcx_lose_fnt";
			this.winLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winFanImg.visible = true;
			this.fanImg.visible = false;
			if(this.costMoney == 0){
				this.winIcon.source = "ermj_zjcx_iconliuju";
				this.winIcon.scaleX = this.winIcon.scaleY = 0.7;
			}
		}
	}	

	private showCard(cardImg: eui.Image, cardNum: number) {
		cardImg.source = this.sourcePath + cardNum;
	}
}
