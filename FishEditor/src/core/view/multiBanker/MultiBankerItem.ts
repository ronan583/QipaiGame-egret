class MultiBankerItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.itemData) {
			this.showItem(this.itemData, this.gameType);
		}
	}

	private bankerName: eui.Label;
	private roundInfo: eui.Label;
	private vipLevel: eui.BitmapLabel;
	public splitImg: eui.Image;

	private itemData: any;
	private gameType: number;
	public showItem(itemData, gameType: number) {
		this.itemData = itemData;
		this.gameType = gameType;
		if (this.bankerName) {
			this.bankerName.text = itemData.nickName;
			this.roundInfo.text = itemData.currentRound + "/" + itemData.totalRound + "  总盈亏 "
				+ (itemData.cosMoney > 0 ? "+" + CommonUtil.convertMonetShow3(itemData.cosMoney) : CommonUtil.convertMonetShow3(itemData.cosMoney));
			this.vipLevel.text = itemData.vipLevel.toFixed(0);
			if (gameType == ChildGameType.BRNN) {
				this.splitImg.source = "brnn_banker_split_png";
			} else if (gameType == ChildGameType.BJL) {
				this.splitImg.source = "bjl_banker_split_png";
			} else if (gameType == ChildGameType.HHDZ) {
				this.splitImg.source = "hhdz_banker_split_png";
			} else if (gameType == ChildGameType.DiceBao) {
				this.splitImg.source = "tb_banker_split_png";
			} else if (gameType == ChildGameType.BCBM) {
				this.splitImg.source = "bcbm_game_json.bcbm_bankerlist_split";
			} else if (gameType == ChildGameType.LHDZ) {
				this.splitImg.source = "lhdz_banker_split_png";
			} else if (gameType == ChildGameType.FQZS) {
				this.splitImg.source = "fqzs_banker_split_png";
			}
		}
	}

}
