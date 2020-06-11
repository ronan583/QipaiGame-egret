enum RankType {
	total = 1,
	today = 2,
	level = 3
}
class RankUI extends ResizePanel {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/common/rank/RankUI.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public titleImg: eui.Image;
	public closeBtn: IButton;
	private totalSelectBtn: eui.Button;
	private todaySelectBtn: eui.Button;
	private totalBtn: eui.Button;
	private todayBtn: eui.Button;
	public rankGroup: eui.Group;
	private ranType = RankType.total;
	public winGoldRankScoller: eui.Scroller;  //滑动\
	private totalData: any = null;
	private todayData: any = null;

	private refreshBtnStatus(): void {
		if (this.ranType == RankType.total) {
			this.totalSelectBtn.visible = true;
			this.totalBtn.visible = false;
			this.todaySelectBtn.visible = false;
			this.todayBtn.visible = true;
		} else if (this.ranType == RankType.today) {
			this.totalSelectBtn.visible = false;
			this.totalBtn.visible = true;
			this.todaySelectBtn.visible = true;
			this.todayBtn.visible = false;
		}
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this["title"] = this.titleImg;
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		this.totalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCoinClick, this);
		this.totalSelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCoinClick, this);
		this.todayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeClick, this);
		this.todaySelectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeClick, this);

		this.ranType = RankType.total;
		this.refreshBtnStatus();

		this.winGoldRankScoller.verticalScrollBar.autoVisibility = false;
		this.winGoldRankScoller.verticalScrollBar.visible = false;
	}

	private onCoinClick(): void {
		this.ranType = RankType.total;
		this.refreshBtnStatus();
		this.reqeustData();
	}

	private onTimeClick(): void {
		this.ranType = RankType.today;
		this.refreshBtnStatus();
		this.reqeustData();
	}

	public updateUI(data) {
		if (data.type == RankType.total) {
			this.totalData = data;
		} else if (data.type == RankType.today) {
			this.todayData = data;
		}
		var rankItem: GoldWinRankItem;
		var rankingInfos = data.rankingInfos;
		this.rankGroup.removeChildren();
		this.winGoldRankScoller.viewport.scrollV = 0;
		this.winGoldRankScoller.viewport.scrollH = 0;
		for (var i = 0; i < rankingInfos.length; i++) {
			rankItem = new GoldWinRankItem();
			rankItem.initData(rankingInfos[i], data.type);
			this.rankGroup.addChild(rankItem);
		}
	}

	public reqeustData() {
		if (this.ranType == RankType.total && this.totalData != null) {
			this.updateUI(this.totalData);
			return;
		}
		if (this.ranType == RankType.today && this.todayData != null) {
			this.updateUI(this.todayData);
			return;
		}
		UserRequest.sendRanking(this.ranType);
	}

	private closePanel(event: egret.TouchEvent) {
		PopUpManager.removePopUp(this, 1);
		this.totalData = null;
		this.todayData = null;
	}
}