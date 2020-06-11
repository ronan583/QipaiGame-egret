module game {
	export class ZjhSetting extends ResizePanel{
		public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/zjh/ZjhSetting.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public closeBtn: IButton;
        private switchEffectBtn: eui.Group;
        private switchMusicEffectBtn: eui.Group;
        private switchMusicBtn: eui.Group;
        private closeImg: eui.Group;
        private openImg: eui.Group;
        // private closeImgFlag: eui.Image;
        // private openImgFlag: eui.Image;

        private closeImg0: eui.Group;
        private openImg0: eui.Group;
        // private closeImgFlag0: eui.Image;
        // private openImgFlag0: eui.Image;

        private closeImg1: eui.Group;
        private openImg1: eui.Group;
        // private closeImgFlag1: eui.Image;
        // private openImgFlag1: eui.Image;

        protected childrenCreated():void
        {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.switchEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchEffect, this);
            this.switchMusicEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicEffect, this);
            this.switchMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusic, this);
            this.initPanel();
            document.querySelector
        }

        public initPanel() {
            var b = egret.localStorage.getItem("ismusic");
            if (b != null || b != "") {
                // this.effectSwitch.selected  = (b == "true");
            }
            let iseffect = egret.localStorage.getItem("iseffect");
            if (iseffect && iseffect == "false") {
                this.closeImg.visible = false;
                this.openImg.visible = true;
            } else {
                this.closeImg.visible = true;
                this.openImg.visible = false;
            }
            this.showMusicEffectToggle(SoundMenager.instance.effectOn)
            this.showMusicToggle(SoundMenager.instance.bgOn)
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
            if (iseffect && iseffect == "false") {
                this.closeImg.visible = false;
                this.openImg.visible = true;
            } else {
                this.closeImg.visible = true;
                this.openImg.visible = false;
            }
        }

        public onMusicEffect(): void {
            SoundMenager.instance.effectOn = !SoundMenager.instance.effectOn
            this.showMusicEffectToggle(SoundMenager.instance.effectOn)
        }

        public onMusic(): void {
            SoundMenager.instance.bgOn = !SoundMenager.instance.bgOn
            this.showMusicToggle(SoundMenager.instance.bgOn)
        }


        public showMusicToggle(open: boolean) {
            this.openImg0.visible = open;
            // this.openImgFlag0.visible = open;
            this.closeImg0.visible = !open;
            // this.closeImgFlag0.visible = !open;
        }

        public showMusicEffectToggle(open: boolean) {
            this.openImg1.visible = open;
            // this.openImgFlag1.visible = open;
            this.closeImg1.visible = !open;
            // this.closeImgFlag1.visible = !open;
        }

        public showEffectToggle(open: boolean) {
            this.openImg1.visible = open;
            // this.openImgFlag1.visible = open;
            this.closeImg1.visible = !open;
            // this.closeImgFlag1.visible = !open;
        }

        public closePanel() {
            PopUpManager.removePopUp(this);
        }
	}
}