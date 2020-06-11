class DDZPlayerIcon extends eui.Component implements eui.UIComponent {

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public headIconImg: eui.Image;
	public headFrameImg: eui.Image;
	public gold: eui.Label;
	public playerName: eui.Label;

	public lordMaozi: eui.Image;

	public playerInfo: game.PlayerInfo;
	private dizhuFlagShow: boolean;
	private originX: number = 0;
	private originY: number = 0;

	private gameVipLabel:eui.BitmapLabel;

	public showMoney(playerInfo: game.PlayerInfo): void {
		this.showPlayerInfo(playerInfo, 0);
		if (game.ddz.DDZBattleData.getInstance().getPlayer(playerInfo.playerId) != null) {
			let m = game.ddz.DDZBattleData.getInstance().getPlayer(playerInfo.playerId).money;
			this.gold.text = CommonUtil.fixMoneyFormat(m);
		}
	}

	public showPlayerInfo(playerInfo: game.PlayerInfo, multi: number = 0): void {
		this.visible = true;
		this.playerInfo = playerInfo;
		let battlePlayer: game.ddz.DDZPlayerInfo = game.ddz.DDZBattleData.getInstance().getPlayer(playerInfo.playerId);
		let isTrusteeship: boolean = false;
		if (battlePlayer != null && battlePlayer.playerId != game.UserService.instance.playerId) {
			isTrusteeship = battlePlayer.isTrusteeship;
		}
		let money: number = battlePlayer == null || battlePlayer.money == 0 ? playerInfo.money : battlePlayer.money;
		let obj = {
			"playerName": playerInfo.nickName,
			"headIcon": "icon_" + playerInfo.headNum + "_png",
			"headFrame": "frame_" + playerInfo.headFrameNum + "_png",
			"gold": money.toFixed(2),
			"multi": multi == undefined ? "X0倍" : "X" + multi.toFixed(0) + "倍",
			"trusteeship": 0,
			"vip": "num_vip_" + playerInfo.vipLevel + "_png",
			"location": playerInfo.city
		}
		this['data'] = obj;

		this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
		this.headFrameImg.source = "gp_headframe_0_1";
		this.gold.text = CommonUtil.fixMoneyFormat(money);
		this.playerName.text = CommonUtil.limitName(playerInfo.nickName, 6);
		this.gameVipLabel.text = playerInfo.vipLevel.toFixed(0);
	}

}