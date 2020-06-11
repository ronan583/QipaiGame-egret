class GoldWinRankItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public headIcon: eui.Image;
	public head_vip_k: eui.Image;
	public userAccountLabel: eui.Label;
	public userIdLabe: eui.Label;
	public rankLabel: eui.Label;

	public rankNumLabel: eui.BitmapLabel;
	public top3Icon: eui.Image;
	public rankNumBG: eui.Image;
	public rank_content_bg: eui.Image;
	public valueIcon: eui.Image;
	public valueLabel: eui.BitmapLabel;
	public rank_self: eui.Image;

	private isInit = false;
	private data: any;
	private type: number;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.isInit = true;
		if (this.data != null) {
			this.initItem();
		}
	}

	public initData(data: any, type: number) {
		this.data = data;
		this.type = type;
		if (this.isInit) {
			this.initItem();
		}
	}

	private initItem() {
		this.userAccountLabel.text = this.data.nickName;
		this.userIdLabe.text = "ID:" + this.data.userId;
		this.head_vip_k.source = "vip_k_" + this.data.vipLevel;
		this.headIcon.source = "gp_head_" + (this.data.headNum - 1);
		//this.headShow.showFrame(this.data.headFrameNum)
		if (this.data.playerId == game.UserService.instance.playerId) {
			this.rank_self.visible = true;
		} else {
			this.rank_self.visible = false;
		}
		if (this.data.number <= 3) {
			this.rankNumLabel.visible = false;
			this.top3Icon.visible = true;
			this.top3Icon.source = "rank_" + (this.data.number)
			this.rank_content_bg.source = "rank_content_bg";
		} else {
			this.rankNumLabel.visible = true;
			this.top3Icon.visible = false;
			this.rankNumLabel.text = this.data.number.toString();
			this.rank_content_bg.source = "rank_content_bg";
		}
		this.valueIcon.source = "rank_coin";
		if (this.type === RankType.total) {
			this.rankLabel.text = "财富";
		} else if (this.type === RankType.today) {
			this.rankLabel.text = "赢取";
		}
		this.valueLabel.text = CommonUtil.moneyFormatNoDecimal(this.data.value / 1000);
	}
}