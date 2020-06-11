module game.ddz {
    export class FruitSetting extends ResizePanel {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/fruit/FruitSetting.exml";
        }

        public closeBtn : IButton;
        private switchEffectBtn:eui.Group;
        private switchMusicEffectBtn:eui.Group;
        private switchMusicBtn:eui.Group;
        private closeImg:eui.Image;
        private openImg:eui.Image;
        private closeImgFlag:eui.Image;
        private openImgFlag:eui.Image;

        private closeImg0:eui.Image;
        private openImg0:eui.Image;
        private closeImgFlag0:eui.Image;
        private openImgFlag0:eui.Image;

        private closeImg1:eui.Image;
        private openImg1:eui.Image;
        private closeImgFlag1:eui.Image;
        private openImgFlag1:eui.Image;

        protected childrenCreated():void
        {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
            this.switchEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchEffect, this);
            this.switchMusicEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicEffect, this);
            this.switchMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusic, this);
            this.initPanel();
        }
        
        public initPanel()
        {
            this.showEffectToggle(SoundMenager.instance.quietOn);
            this.showMusicEffectToggle(SoundMenager.instance.effectOn)
            this.showMusicToggle(SoundMenager.instance.bgOn)
        }

        public onEffectSwitch(event : eui.UIEvent)
        {
            // this.effectRadio.selected = this.effectSwitch.selected;
            // egret.localStorage.setItem("iseffect", this.effectSwitch.selected.toString());
        }

        public onSwitchEffect():void {
            if(SoundMenager.instance.quietOn) {
                SoundMenager.instance.effectOn = SoundMenager.instance.bgOn = true;
            } else {
                SoundMenager.instance.effectOn = SoundMenager.instance.bgOn = false;
            }
            this.showEffectToggle(SoundMenager.instance.quietOn);
            this.showMusicEffectToggle(SoundMenager.instance.effectOn)
            this.showMusicToggle(SoundMenager.instance.bgOn)
        }

        public onMusicEffect():void {
            SoundMenager.instance.effectOn = !SoundMenager.instance.effectOn
            this.showMusicEffectToggle(SoundMenager.instance.effectOn)
            this.showEffectToggle(SoundMenager.instance.quietOn);
        }

        public onMusic():void {
            SoundMenager.instance.bgOn = !SoundMenager.instance.bgOn
            this.showMusicToggle(SoundMenager.instance.bgOn)
            this.showEffectToggle(SoundMenager.instance.quietOn);
        }

        public onMusicChange(event : eui.UIEvent)
        {
            /*
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


             */
        }
        public onSoundChange(event : eui.UIEvent)
        {
            /*
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


             */
        }

        public showMusicToggle(open:boolean) {
            SoundMenager.instance.PlayClick();
            this.openImg0.visible = open;
            this.openImgFlag0.visible = open;
            this.closeImg0.visible = !open;
            this.closeImgFlag0.visible = !open;
        }

        public showMusicEffectToggle(open:boolean) {
            SoundMenager.instance.PlayClick();
            this.openImg1.visible = open;
            this.openImgFlag1.visible = open;
            this.closeImg1.visible = !open;
            this.closeImgFlag1.visible = !open;
        }

        public showEffectToggle(open:boolean) {
            SoundMenager.instance.PlayClick();
            this.openImg.visible = open;
            this.openImgFlag.visible = open;
            this.closeImg.visible = !open;
            this.closeImgFlag.visible = !open;
        }

        public closePanel()
        {
            SoundMenager.instance.PlayClick();
            PopUpManager.removePopUp(this);
        }
    }
}
