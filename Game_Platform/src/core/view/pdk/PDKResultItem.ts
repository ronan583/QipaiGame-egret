class PDKResultItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/pdk/PDKResultItem.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public playerName: eui.Label;
	public base: eui.Label;
	public leftCardCount: eui.Label;
	public coin: eui.Label;
	public baopeiImg: eui.Image;
	public selfImg:eui.Image;
	private winImg:eui.Image;

	public showFinishPlayer(player: game.pdk.BattlePlayerInfo): void {
		let battleData: game.pdk.PDKBattleData = game.pdk.PDKBattleData.getInstance();
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		let playerInfo: game.PlayerInfo = roomData.getPlayerInfo(player.playerId);
		if (playerInfo) this.playerName.text = playerInfo.nickName;
		this.base.text = roomData.bottomBet.toFixed(2) + "元";
		this.leftCardCount.text = player.handCards.length.toFixed(0) + (player.isSpring ? "X2" : "");
		this.coin.text = player.money.toFixed(2) + "元";
		this.baopeiImg.visible = player.isBaoPei;

		if(player.playerId == UserService.instance.playerId) {
			this.selfImg.visible = true;
		} else {
			this.selfImg.visible = false;
		}

		if(player.money > 0) {
			this.winImg.visible = true;
		} else {
			this.winImg.visible = false;
		}
	}
}