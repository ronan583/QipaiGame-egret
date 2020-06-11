class DDZResultItem extends eui.Component implements eui.UIComponent {

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	private isLord: boolean;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.multiImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMultiPanel, this);
	}

	private showMultiPanel(): void {

		if (this.isLord) {
			this.lordGroup.visible = !this.lordGroup.visible;
		} else {
			this.multiGroup.visible = !this.multiGroup.visible;
		}
	}

	public itemBg: eui.Image;
	public lordFlag: eui.Image;
	public playerName: eui.Label;
	public base: eui.Label;
	public multi: eui.Label;
	public coin: eui.Label;
	public multiImg: eui.Label;

	public multiGroup: eui.Group;
	public lordMulti: eui.Label;
	public bombMulti: eui.Label;
	public springMulti: eui.Label;
	public peasantMulti: eui.Label;
	public commonMulti: eui.Label;
	public totalMulti: eui.Label;

	public lordGroup: eui.Group;
	public lord: eui.Label;
	public bomb: eui.Label;
	public spring: eui.Label;
	public total: eui.Label;
	public lordName: eui.Label;

	public showFinishPlayer(player: game.ddz.BattlePlayerInfo): void {
		let battleData: game.ddz.DDZBattleData = game.ddz.DDZBattleData.getInstance();
		let multiInfo: game.ddz.DdzMultipleDetail = battleData.finishData.multiInfo;
		if (player.playerId == battleData.landlordId) {
			this.lordFlag.visible = true;
			this.isLord = true;
			this.lordName.text = player.nickName;
		} else {
			this.lordFlag.visible = false;
			this.isLord = false;
			this.lordName.text = '';
		}
		let roomData: game.RoomData = game.RoomManager.getInstance().curRoomData;
		this.playerName.text = player.nickName;
		this.base.text = roomData.bottomBet.toFixed(2) + "元";
		this.multi.text = player.totalMulti.toFixed(0);
		this.coin.text = player.money.toFixed(2) + "元";

		this.lordMulti.text = multiInfo.rob.toFixed(0);
		this.bombMulti.text = multiInfo.bomb.toFixed(0);
		this.springMulti.text = multiInfo.spring.toFixed(0);
		this.peasantMulti.text = multiInfo.jiabei.toFixed(0);
		this.commonMulti.text = multiInfo.common.toFixed(0);
		this.totalMulti.text = multiInfo.total.toFixed(0);

		this.lord.text = multiInfo.rob.toFixed(0);
		this.bomb.text = multiInfo.bomb.toFixed(0);
		this.spring.text = multiInfo.spring.toFixed(0);
		this.total.text = multiInfo.total.toFixed(0);

		let battleFinishData: game.ddz.BattleFinishInfo = battleData.finishData;
		if (player.playerId == UserService.instance.playerId) {
			if (player.playerId == battleData.landlordId) {
				//我是地主  地主赢了 我赢了
				if (battleFinishData.isWin) {
					this.itemBg.source = 'ddz_battle_json.ddz_results_win_frame';
					this.playerName.textColor = 0xF1D991;
					this.base.textColor = 0xF1D991;
					this.multi.textColor = 0xF1D991;
					this.coin.textColor = 0xF1D991;
					this.multiImg.visible = true;
					this.itemBg.visible = true;
				} else {
					this.itemBg.source = 'ddz_battle_json.ddz_results_lose_frame';
					this.playerName.textColor = 0x70A7D5;
					this.base.textColor = 0x70A7D5;
					this.multi.textColor = 0x70A7D5;
					this.coin.textColor = 0x70A7D5;
					this.multiImg.visible = true;
					this.itemBg.visible = true;
				}
			}
			else {
				//我不是地主  地主赢了 我输了
				if (battleFinishData.isWin) {
					this.itemBg.source = 'ddz_battle_json.ddz_results_lose_frame';
					this.playerName.textColor = 0x70A7D5;
					this.base.textColor = 0x70A7D5;
					this.multi.textColor = 0x70A7D5;
					this.coin.textColor = 0x70A7D5;
					this.multiImg.visible = true;
					this.itemBg.visible = true;
				} else {
					this.itemBg.source = 'ddz_battle_json.ddz_results_win_frame';
					this.playerName.textColor = 0xF1D991;
					this.base.textColor = 0xF1D991;
					this.multi.textColor = 0xF1D991;
					this.coin.textColor = 0xF1D991;
					this.multiImg.visible = true;
					this.itemBg.visible = true;
				}
			}
		} else {
			this.itemBg.source = '';
			this.playerName.textColor = 0xe4cdbe;
			this.base.textColor = 0xe4cdbe;
			this.multi.textColor = 0xe4cdbe;
			this.coin.textColor = 0xe4cdbe;
			this.multiImg.visible = false;
			this.itemBg.visible = false;
		}
	}
}