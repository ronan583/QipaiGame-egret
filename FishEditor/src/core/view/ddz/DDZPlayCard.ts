class DDZPlayCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.buyaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyaoBtnClick, this);
		this.tipsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTipsBtnClick, this);
		this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBtnClick, this);
		this.yaobuqiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYaobuqiClick, this);
	}

	public buyaoBtn: eui.Button;
	public tipsBtn: eui.Button;
	public playBtn: eui.Button;
	public yaobuqiBtn: eui.Button;
	private allowDonot: boolean;
	public clock: DDZClock;

	public init(): void {
		this.buyaoBtn.filters = [];
		this.tipsBtn.filters = [];
		this.playBtn.filters = [];
		this.yaobuqiBtn.filters = [];
		this.buyaoBtn.enabled = true;
		this.tipsBtn.enabled = true;
		this.playBtn.enabled = true;
		this.yaobuqiBtn.enabled = true;
	}

	private onBuyaoBtnClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.DDZ_PLAY_CLEAR_ALL_CHOOSE);
		if (!this.allowDonot) {
			return;
		}
		DDZRequest.playStep(true, []);
	}

	private onTipsBtnClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.DDZ_PLAY_CARD_TIPS);
	}

	private onPlayBtnClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.DDZ_PLAY_CARD);
	}

	private onYaobuqiClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.DDZ_PLAY_CLEAR_ALL_CHOOSE);
		DDZRequest.playStep(true, []);
	}

	public disableBtn(btn: eui.Button): void {
		var colorMatrix = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		var flilter = new egret.ColorMatrixFilter(colorMatrix);
		btn.filters = [flilter];
		btn.enabled = false;
	}

	public showFirst(): void {
		this.allowDonot = false;
		this.yaobuqiBtn.visible = false;
		this.buyaoBtn.visible = true;
		this.tipsBtn.visible = true;
		this.playBtn.visible = true;
		this.disableBtn(this.buyaoBtn);
		this.clock.startClock(game.ddz.DDZBattleData.getInstance().downTime);
	}

	public showNormal(lastPlayerId: number): boolean {
		this.allowDonot = lastPlayerId != game.UserService.instance.playerId;
		let showNoBigger = false;
		if (!this.allowDonot) {
			this.disableBtn(this.buyaoBtn);
			this.yaobuqiBtn.visible = false;
			this.buyaoBtn.visible = true;
			this.tipsBtn.visible = true;
			this.playBtn.visible = true;
		} else {
			this.buyaoBtn.enabled = true;
			this.buyaoBtn.filters = [];
			// 看看有没有打过上家牌的
			game.ddz.DDZBattleData.getInstance().group();
			let cards: number[] = game.ddz.DDZBattleData.getInstance().checkCard(false);
			if (cards.length == 0) {
				// 没有打过上家的牌
				this.yaobuqiBtn.visible = true;
				this.buyaoBtn.visible = false;
				this.tipsBtn.visible = false;
				this.playBtn.visible = false;
				showNoBigger = true
			} else {
				this.tipsBtn.filters = [];
				this.playBtn.filters = [];
				this.tipsBtn.enabled = true;
				this.playBtn.enabled = true;
				this.yaobuqiBtn.visible = false;
				this.buyaoBtn.visible = true;
				this.tipsBtn.visible = true;
				this.playBtn.visible = true;
			}
		}
		this.clock.startClock(game.ddz.DDZBattleData.getInstance().downTime);
		return showNoBigger;
	}

	private showForcePass(): void {
		var passImg: eui.Image = new eui.Image();
		passImg.source = "ddz_battle_json.ddz_no_bigger";
		this.stage.addChild(passImg);
		let maxWidth = Math.min(1624, this.stage.stageWidth);
		passImg.x = maxWidth / 2 - passImg.width / 2;
		passImg.y = this.stage.stageHeight - passImg.height - 100;

		egret.setTimeout(() => {
			var t: egret.Tween = egret.Tween.get(passImg);
			t.to({ alpha: 0 }, 1000).call(() => {
				passImg.parent.removeChild(passImg);
			}, this);
		}, this, 2000);
	}

}