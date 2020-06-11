class SettingPanel extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public closeBtn : IButton;

	public effectRadio : eui.RadioButton;
	public effectSwitch : IToggleSwitch;

	public musicBar : SettingProgressBar;
	public musicSlider : SettingSlider;

	public soundBar : SettingProgressBar;
	public soundSlider : SettingSlider;

	private switchEffectBtn:eui.Group;
	private closeImg:eui.Image;
	private openImg:eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		this.effectSwitch.addEventListener(eui.UIEvent.CHANGE , this.onEffectSwitch , this);
		this.musicSlider.addEventListener(eui.UIEvent.CHANGE , this.onMusicChange , this);
		this.soundSlider.addEventListener(eui.UIEvent.CHANGE , this.onSoundChange , this);
		this.switchEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchEffect, this);
		this.initPanel();
	}
	
	public initPanel()
	{
		var b = egret.localStorage.getItem("ismusic");
		if (b != null || b != "") {
			this.effectSwitch.selected  = (b == "true");
        }
		let iseffect = egret.localStorage.getItem("iseffect");
		if(iseffect && iseffect == "false") {
			this.closeImg.visible = false;
			this.openImg.visible = true;			
		} else {
			this.closeImg.visible = true;
			this.openImg.visible = false;
		}
		this.musicBar.maximum = this.musicSlider.maximum = this.soundBar.maximum = this.soundSlider.maximum = 100;
		this.musicBar.value = this.musicSlider.value = SoundMenager.instance.getBgVolume() * 100;
		this.soundBar.value = this.soundSlider.value = SoundMenager.instance.getEffectVolume() * 100;
	}

	public onEffectSwitch(event : eui.UIEvent)
	{
		// this.effectRadio.selected = this.effectSwitch.selected;
		egret.localStorage.setItem("iseffect", this.effectSwitch.selected.toString());
	}

	public onSwitchEffect():void {
		let iseffect = egret.localStorage.getItem("iseffect");
		if(iseffect == "true") {
			iseffect = "false";		
		} else {
			iseffect = "true";	
		}
		egret.localStorage.setItem("iseffect", iseffect);

		iseffect = egret.localStorage.getItem("iseffect");
		if(iseffect && iseffect == "false") {
			this.closeImg.visible = false;
			this.openImg.visible = true;			
		} else {
			this.closeImg.visible = true;
			this.openImg.visible = false;
		}
	}

	public onMusicChange(event : eui.UIEvent)
	{
		this.musicBar.value = this.musicSlider.value;
		if(this.musicBar.value <= 0)
		{
			if(SoundMenager.instance.bgOn)
			{
				SoundMenager.instance.bgOn = false;
			}
		}else
		{
			if(!SoundMenager.instance.bgOn)
			{
				SoundMenager.instance.bgOn = true;
			}
		}
		SoundMenager.instance.setBgVolume(this.musicSlider.value / 100);

	}
	public onSoundChange(event : eui.UIEvent)
	{
		this.soundBar.value = this.soundSlider.value;
		if(this.soundSlider.value <= 0)
		{
			if(SoundMenager.instance.effectOn)
			{
				SoundMenager.instance.effectOn = false;
			}
		}else
		{
			if(!SoundMenager.instance.effectOn)
			{
				SoundMenager.instance.effectOn = true;
			}
		}
		SoundMenager.instance.setEffectVolume(this.soundSlider.value / 100);

	}

	public closePanel()
	{
		PopUpManager.removePopUp(this);
	}
}