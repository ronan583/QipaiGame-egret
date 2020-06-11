class BcbmRecordBar extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BcbmRecordBarSkin.exml";
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
		this.roomLevelImg.source = "bcbm_zjcx_levelimg" + data.gameLevel;
		this.costMoney = data.costMoney / 1000;
		if (this.costMoney >= 0) {
			this.resultIcon.source = "bcbm_zjcx_iconwin";
			this.totalWin.font = "bcbm_zjcx_win_fnt"
			this.totalWin.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		} else {
			this.resultIcon.source = "bcbm_zjcx_iconlose";
			this.totalWin.font = "bcbm_zjcx_lose_fnt"
			this.totalWin.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
		}
		this.detailData = JSON.parse(data.recordInfo);
		if(this.detailData.isBanker){
			this.bankerIcon.visible = true;
		}
	}

	public onDetails() {
		let panel = new BcbmRecordPanel();
		PopUpManager.addPopUp(panel, true, 0, 0, 1);
		panel.init(this.detailData, this.costMoney);
	}
}

class BcbmRecordPanel extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/zjcx/BcbmRecordPanelSkin.exml";
	}
	public recordData: any;

	public isBanker: boolean;
	public costMoney: number;



	public winTypeIcon: eui.Image;
	public multiIcon: eui.Image;
	public bankerIcon: eui.Image;
	private winIcon: eui.Image;
	private totalBetIcon: eui.Image;
	private totalPoolIcon: eui.Image;
	public winMoneyLabel: eui.BitmapLabel;
	public totalBetLabel: eui.BitmapLabel;


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
		this.totalBetIcon.visible = false;
		this.totalPoolIcon.visible = false;
		this.winTypeIcon.scaleX = this.winTypeIcon.scaleY = 1;

		this.initData(data, money);
	}

	public initData(data: any, money: number) {
		this.isBanker = data.isBanker;
		this.costMoney = money;

		let multiName = "";

		if (this.isBanker) {
			this.bankerIcon.visible = true;
			this.totalPoolIcon.visible = true;
			this.totalBetLabel.text = CommonUtil.fixMoneyFormat(Math.abs(data.allStakeMoney / 1000));
		} else {
			this.totalBetIcon.visible = true;
			this.totalBetLabel.text = CommonUtil.fixMoneyFormat(Math.abs(data.myStakeMoney / 1000));
		}

		if (this.costMoney >= 0) {
			this.winMoneyLabel.font = "bcbm_zjcx_win_fnt";
			this.winMoneyLabel.text = "+" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney));
			this.winIcon.source = "bcbm_zjcx_iconwin";
			multiName = "w";
		} else {
			this.winMoneyLabel.font = "bcbm_zjcx_lose_fnt";
			this.winMoneyLabel.text = "-" + CommonUtil.fixMoneyFormat(Math.abs(this.costMoney))
			this.winIcon.source = "bcbm_zjcx_iconlose";
			multiName = "l";
		}
		this.showWinType(data.resutlType, multiName);
	}

	private showWinType(type: number, multiName: string) {
		if (type < 2) {
			this.winTypeIcon.source = "bcbm_caricon_bsj6";
			this.multiIcon.source = "bcbm_result_mutiple40" + multiName;
		} else if (type < 3) {
			this.winTypeIcon.source = "bcbm_caricon_bsj6";
			this.winTypeIcon.scaleX = this.winTypeIcon.scaleY = 0.8;
			this.multiIcon.source = "bcbm_result_mutiple5" + multiName;
		} else if (type < 4) {
			this.winTypeIcon.source = "bcbm_caricon_benz6";
			this.multiIcon.source = "bcbm_result_mutiple30" + multiName;
		} else if (type < 5) {
			this.winTypeIcon.source = "bcbm_caricon_benz6";
			this.winTypeIcon.scaleX = this.winTypeIcon.scaleY = 0.8;
			this.multiIcon.source = "bcbm_result_mutiple5" + multiName;
		} else if (type < 6) {
			this.winTypeIcon.source = "bcbm_caricon_bmw6";
			this.multiIcon.source = "bcbm_result_mutiple20" + multiName;
		} else if (type < 7) {
			this.winTypeIcon.source = "bcbm_caricon_bmw6";
			this.winTypeIcon.scaleX = this.winTypeIcon.scaleY = 0.8;
			this.multiIcon.source = "bcbm_result_mutiple5" + multiName;
		} else if (type < 8) {
			this.winTypeIcon.source = "bcbm_caricon_vw6";
			this.multiIcon.source = "bcbm_result_mutiple10" + multiName;
		} else if (type < 9) {
			this.winTypeIcon.source = "bcbm_caricon_vw6";
			this.winTypeIcon.scaleX = this.winTypeIcon.scaleY = 0.8;
			this.multiIcon.source = "bcbm_result_mutiple5" + multiName;
		}
	}
}