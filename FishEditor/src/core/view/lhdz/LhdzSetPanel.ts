class LhdzSetPanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/lhdz/LhdzSetPanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public closeBtn: IButton;
	public switchBgBtn: eui.ToggleSwitch;
	public switchEffectBtn: eui.ToggleSwitch;
	public switchQuietBtn: eui.ToggleSwitch;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.initPanel();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
		this.switchBgBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchBgBtn, this);
		this.switchQuietBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchQuietBtn, this);
		this.switchEffectBtn.addEventListener(eui.UIEvent.CHANGE, this.onswitchEffectBtn, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
	}

	protected addToStage() {
		super.addToStage();
		egret.setTimeout(() => {
			if (this.stage) this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
		}, this, 100);
	}

	private removeFromStage() {
		if (this.stage) this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
	}

	private stageClick(e: egret.TouchEvent) {
		if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
			this.closeBtnClick(null);
		}
	}

	public initPanel() {
		//背景音乐
		this.switchBgBtn.selected = SoundMenager.instance.bgOn;

		//音效
		this.switchEffectBtn.selected = SoundMenager.instance.effectOn;

		//静音
		this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
	}

	//静音
	public onSwitchQuietBtn(): void {
		if (this.switchQuietBtn.selected) {
			this.switchBgBtn.selected = SoundMenager.instance.bgOn = false;
			this.switchEffectBtn.selected = SoundMenager.instance.effectOn = false;
		} else {
			this.switchBgBtn.selected = SoundMenager.instance.bgOn = true;
			this.switchEffectBtn.selected = SoundMenager.instance.effectOn = true;
		}
	}

	//音乐
	public onswitchEffectBtn(event: eui.UIEvent) {
		SoundMenager.instance.effectOn = this.switchEffectBtn.selected;
		this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
	}

	//bg
	public onSwitchBgBtn(event: eui.UIEvent) {
		SoundMenager.instance.bgOn = this.switchBgBtn.selected;
		this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
	}

	private closeBtnClick(event: egret.TouchEvent): void {
		PopUpManager.removePopUp(this, 1);
	}
}