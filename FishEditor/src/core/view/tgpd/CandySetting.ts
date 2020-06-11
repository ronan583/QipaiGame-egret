module game.tgpd {
    export class CandySetting extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/tgpd/CandySetting.exml";
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
        public confirmBtn: IButton;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.switchBgBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchMusicBtn, this);
            this.switchEffectBtn.addEventListener(eui.UIEvent.CHANGE, this.onswitchEffectBtn, this);
            this.switchQuietBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchQuietBtn, this);
            this.initPanel();
        }

        protected addToStage() {
            super.addToStage();
            egret.setTimeout(() => {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }, this, 100);
        }

        private stageClick(e: egret.TouchEvent) {
            if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
                PopUpManager.removePopUp(this);
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

        public onSwitchQuietBtn(): void {
            console.error(this.switchQuietBtn.selected);
            if (this.switchQuietBtn.selected) {
                this.switchBgBtn.selected = false;
                SoundMenager.instance.bgOn = false;
                this.switchEffectBtn.selected = false;
                SoundMenager.instance.effectOn = false;
            } else {
                this.switchBgBtn.selected = true;
                SoundMenager.instance.bgOn = true;
                this.switchEffectBtn.selected = true;
                SoundMenager.instance.effectOn = true;
            }
        }

        public onSwitchMusicBtn(event: eui.UIEvent) {
            SoundMenager.instance.bgOn = this.switchBgBtn.selected;
            this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
        }

        public onswitchEffectBtn(event: eui.UIEvent) {
            SoundMenager.instance.effectOn = this.switchEffectBtn.selected;
            this.switchQuietBtn.selected = SoundMenager.instance.quietOn;
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            PopUpManager.removePopUp(this, 1);
        }
    }
}