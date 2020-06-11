module game.hhdz {
    export class HhdzSetting extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/hhdz/HhdzSettingSkin.exml";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public closeBtn: IButton;
        public switchMusicBtn: eui.ToggleSwitch;
        public switchSoundBtn: eui.ToggleSwitch;
        public switchEffectBtn: eui.ToggleSwitch;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
            this.switchMusicBtn.addEventListener(eui.UIEvent.CHANGE, this.onMusicChange, this);
            this.switchSoundBtn.addEventListener(eui.UIEvent.CHANGE, this.onSoundChange, this);
            this.switchEffectBtn.addEventListener(eui.UIEvent.CHANGE, this.onSwitchEffect, this);

            this.initPanel();
        }

        public initPanel() {
            var ismusic = egret.localStorage.getItem("ismusic");
            if (ismusic != null || ismusic != "") {
                this.switchMusicBtn.selected = (ismusic == "true");
            }
            var issound = egret.localStorage.getItem("issound");
            if (issound != null || issound != "") {
                this.switchSoundBtn.selected = (issound == "true");
            }
            let iseffect = egret.localStorage.getItem("iseffect");
            if (iseffect != null || iseffect != "") {
                this.switchEffectBtn.selected = (iseffect == "true");
            }
        }

        public onSwitchEffect(): void {
            let iseffect = egret.localStorage.getItem("iseffect");
            if (iseffect == "true") {
                iseffect = "false";
            } else {
                iseffect = "true";
            }
            egret.localStorage.setItem("iseffect", iseffect);

            iseffect = egret.localStorage.getItem("iseffect");
            if (iseffect != null || iseffect != "") {
                this.switchEffectBtn.selected = this.switchEffectBtn.selected;
            }
        }

        public onMusicChange(event: eui.UIEvent) {
            let iseffect = egret.localStorage.getItem("ismusic");
            if (iseffect == "true") {
                iseffect = "false";
            } else {
                iseffect = "true";
            }
            egret.localStorage.setItem("ismusic", iseffect);
            SoundMenager.instance.bgOn = this.switchMusicBtn.selected;
        }

        public onSoundChange(event: eui.UIEvent) {
            let iseffect = egret.localStorage.getItem("issound");
            if (iseffect == "true") {
                iseffect = "false";
            } else {
                iseffect = "true";
            }
            egret.localStorage.setItem("issound", iseffect);
            if (!SoundMenager.instance.effectOn) {
                SoundMenager.instance.effectOn = this.switchSoundBtn.selected;
            }
        }

        private closeBtnClick(event: egret.TouchEvent): void {
            PopUpManager.removePopUp(this, 1);
        }
    }
}
