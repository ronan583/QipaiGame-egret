class PDKPlayCard extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.tipsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTipsBtnClick, this);
		this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBtnClick, this);
	}

	public tipsBtn: eui.Button;
	public playBtn: eui.Button;

	private allowDonot: boolean;
	public clock: DDZClock;

	public init(): void {
		this.tipsBtn.filters = [];
		this.playBtn.filters = [];
		this.tipsBtn.enabled = true;
		this.playBtn.enabled = true;
	}

	private onBuyaoBtnClick(): void {
		if (!this.allowDonot) {
			return;
		}
		PDKRequest.playStep(true, []);
	}

	private onTipsBtnClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.PDK_PLAY_CARD_TIPS);
	}

	private onPlayBtnClick(): void {
		game.AppFacade.getInstance().sendNotification(PanelNotify.PDK_PLAY_CARD);
	}

	private onYaobuqiClick(): void {
		PDKRequest.playStep(true, []);
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

		this.tipsBtn.visible = true;
		this.playBtn.visible = true;

		this.clock.startClock(game.pdk.PDKBattleData.getInstance().downTime);
	}

	public showNormal(lastPlayerId: number): void {
		this.allowDonot = lastPlayerId != game.UserService.instance.playerId;
		if (!this.allowDonot) {
			this.tipsBtn.visible = true;
			this.playBtn.visible = true;
		} else {
			if (!game.pdk.PDKBattleData.getInstance()) {
				// 没有打过上家的牌
				this.tipsBtn.visible = false;
				this.playBtn.visible = false;
				this.showForcePass();
			} else {
				this.tipsBtn.filters = [];
				this.playBtn.filters = [];

				this.tipsBtn.visible = true;
				this.playBtn.visible = true;
			}
		}
		this.clock.startClock(game.pdk.PDKBattleData.getInstance().downTime);
	}

	private showForcePass(): void {
		var passImg: eui.Image = new eui.Image();
		passImg.source = "pdk_no_more";
		this.stage.addChild(passImg);
		passImg.x = this.stage.stageWidth / 2 - passImg.width / 2;
		passImg.y = this.stage.stageHeight - passImg.height;

		egret.setTimeout(() => {
			var t: egret.Tween = egret.Tween.get(passImg);
			t.to({ alpha: 0 }, 1000).call(() => {
				passImg.parent.removeChild(passImg);
			}, this);
		}, this, 2000);
	}

}