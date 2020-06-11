module game {
    export class NSettingUI extends ResizePanel {
        public constructor(gameType: game.ChildGameType) {
            super();
            switch (gameType) {
                case game.ChildGameType.DZPK:
                    this.skinName = "resource/eui_skins/setting/DzpkSettingUI.exml";
                    break;
                case game.ChildGameType.BRNN:
                    this.skinName = "resource/eui_skins/setting/BrnnSettingUI.exml";
                    break;
                case game.ChildGameType.BJL:
                    this.skinName = "resource/eui_skins/setting/BjlSettingUI.exml";
                    break;
                case game.ChildGameType.DiceBao:
                    this.skinName = "resource/eui_skins/setting/DiceSettingUI.exml";
                    break;
                case game.ChildGameType.BY:
                    this.skinName = "resource/eui_skins/setting/BySettingUI.exml";
                break;
                case game.ChildGameType.LHDZ:
                    this.skinName = "resource/eui_skins/lhdz/LhdzSetPanel.exml";
                break;
                case game.ChildGameType.HHDZ:
                    this.skinName = "resource/eui_skins/hhdz/HhdzSettingSkin.exml";
                break;
                case game.ChildGameType.DUOBAO:
                    this.skinName = "resource/eui_skins/duobao/DuobaoSetting.exml";
                break;
                case game.ChildGameType.TGPD:
                    this.skinName = "resource/eui_skins/tgpd/CandySetting.exml"
                break;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        }

        private closeBtn: IButton;
        public switchBgBtn: eui.ToggleSwitch;
        public switchEffectBtn: eui.ToggleSwitch;
        public switchQuietBtn: eui.ToggleSwitch;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.switchBgBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchBgBtn, this);
            this.switchQuietBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchQuietBtn, this);
            this.switchEffectBtn.addEventListener(eui.UIEvent.CHANGE, this.onswitchEffectBtn, this);

        }

        //静音
        public onSwitchQuietBtn(): void {
            SoundMenager.instance.PlayClick();
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
            SoundMenager.instance.PlayClick();
            SoundMenager.instance.effectOn = this.switchEffectBtn.selected;
            this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
        }

        //bg
        public onSwitchBgBtn(event: eui.UIEvent) {
            SoundMenager.instance.PlayClick();
            SoundMenager.instance.bgOn = this.switchBgBtn.selected;
            this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
        }

        protected addToStage() {
            super.addToStage();
            egret.setTimeout(()=>{
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
             }, this, 100);
        }

        private removeFromStage() {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
        }

        private stageClick(e:egret.TouchEvent) {
            if(!this.hitTestPoint(e.stageX, e.stageY, true)) {
                PopUpManager.removePopUp(this);
			}
        }

        public udpateStatus(): void {
            //背景音乐
            this.switchBgBtn.selected = SoundMenager.instance.bgOn;

            //音效
            this.switchEffectBtn.selected = SoundMenager.instance.effectOn;

            //静音
            this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
        }

        private onClose() {
            SoundMenager.instance.PlayClick();
            PopUpManager.removePopUp(this);
        }

    }
}
