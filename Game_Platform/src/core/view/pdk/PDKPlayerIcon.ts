class PDKPlayerIcon extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addMoney.visible = false;
		this.subMoney.visible = false;
		this.winAnim.visible = false;
		if (this.playerInfo) {
			this.showPlayerInfo(this.playerInfo);
		}
	}

	public headIconImg: eui.Image;
	public gold: eui.Label;
	public playerName: eui.Label;
	public addMoney: eui.BitmapLabel;
	public subMoney: eui.BitmapLabel;
	public gameVipLabel:eui.BitmapLabel;
	public trusteeshipState: eui.Image;

	public playerInfo: game.PlayerInfo;
	private winAnim:DragonAnim;
	private originMoneyY: number = 0;

	public showMoney(playerInfo: game.PlayerInfo): void {
		this.showPlayerInfo(playerInfo);
	}

	public showMoneyImm(money:number):void {
		this.gold.text = CommonUtil.fixMoneyFormat(money);
	}

	public showMoneyAnim(money: number, total: number): void {
		if (money > 0) {
			this.originMoneyY = this.addMoney.y;
			this.addMoney.visible = true;
			this.addMoney.text = money.toFixed(2) + "y";
			var tw: egret.Tween = egret.Tween.get(this.addMoney);
			var holder = this;
			tw.to({ y: -100, alpha: 0 }, 2500, egret.Ease.sineInOut).call(() => {
				holder.addMoney.visible = false;
				holder.addMoney.y = holder.originMoneyY;
				holder.addMoney.alpha = 1;
			});
		} else {
			this.originMoneyY = this.subMoney.y;
			this.subMoney.visible = true;
			this.subMoney.text = money.toFixed(2) + "y";
			var tw: egret.Tween = egret.Tween.get(this.subMoney);
			var holder = this;
			tw.to({ y: -100, alpha: 0 }, 2500, egret.Ease.sineInOut).call(() => {
				holder.subMoney.visible = false;
				holder.subMoney.y = holder.originMoneyY;
				holder.subMoney.alpha = 1;
			});
		}
		console.log("=================taotal:" + total);
		if (total) {
			this.gold.text = CommonUtil.fixMoneyFormat(total);
		}
		let obj = {
			"playerName": this.playerInfo.nickName,
			"headIcon": "icon_" + this.playerInfo.headNum + "_png",
			"headFrame": "frame_" + this.playerInfo.headFrameNum + "_png",
			"gold": CommonUtil.fixMoneyFormat(total),
			"multi": "0倍",
			"trusteeship": 0,
			"vip": "num_vip_" + this.playerInfo.vipLevel + "_png",
			"location": this.playerInfo.city
		}
		this['data'] = obj;
	}

	public showPlayerInfo(playerInfo: game.PlayerInfo): void {
		this.playerInfo = playerInfo;
		if (!this.headIconImg) {
			// 还没有初始化完
			return;
		}
		this.visible = true;
		let battlePlayer: game.pdk.PDKPlayerInfo = game.pdk.PDKBattleData.getInstance().getPlayer(playerInfo.playerId);
		let money: number = battlePlayer == null || battlePlayer.money == 0 ? playerInfo.money : battlePlayer.money;
		this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
		if (money) {
			this.gold.text = CommonUtil.fixMoneyFormat(money);
		}
		this.gameVipLabel.text = playerInfo.vipLevel.toFixed(0);
		this.playerName.text = CommonUtil.limitName(playerInfo.nickName,4);
		this.trusteeshipState.visible = false;
	}

	public getHeadPos() : egret.Point {
		return this.localToGlobal(this.width / 2, this.height / 2);
	}

	public showWinAnim() {
		this.winAnim.visible = true;
		this.winAnim.playerOnce(()=>{
			this.winAnim.visible = false;
		}, this);
	}
}