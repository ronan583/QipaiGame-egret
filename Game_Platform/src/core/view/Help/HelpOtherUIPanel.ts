module game {
    export class HelpOtherUIPanel extends eui.Component {
        public constructor() {
            super();
            
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/help/HelpOtherUI.exml";
        }

       
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closeBtn:eui.Button;
        private closeBtnPdk:eui.Button;
        private closeBtnFruit:eui.Button;
        private closeBtnErmj:eui.Button;
        private closeBtnCandy:eui.Button;
        private ddz_group:eui.Group;
        private pdk_group:eui.Group;
        private fruit_group:eui.Group;
        private ermj_group:eui.Group;
        private candy_group:eui.Group;
        private scroller:eui.Scroller;
        private scrollerPdk:eui.Scroller;
        private scrollerFruit:eui.Scroller;
        private scrollerErmj:eui.Scroller;
        private scrollerCandy:eui.Scroller;
        private viewport:eui.Group;
        private lastGroup : eui.Group;
        private allHelpUIs:Array<eui.Group>;
        private allHelpScrollers:Array<eui.Scroller>;
        protected childrenCreated():void
        {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.closeBtnPdk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.closeBtnFruit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.closeBtnErmj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.closeBtnCandy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.allHelpUIs = [this.ddz_group, this.pdk_group, this.fruit_group, this.ermj_group, this.candy_group];
            this.allHelpScrollers = [this.scroller, this.scrollerPdk, this.scrollerFruit, this.scrollerErmj, this.scrollerCandy];
            for(let s of this.allHelpScrollers) {
                if(s.horizontalScrollBar != null)
                {
                    s.horizontalScrollBar.autoVisibility = false;
                    s.horizontalScrollBar.visible = false;
                    s.scrollPolicyH = eui.ScrollPolicy.OFF;
                }
                if(s.verticalScrollBar != null)
                {
                    s.verticalScrollBar.autoVisibility = false;
                    s.verticalScrollBar.visible = false;
                }
            }
        }

        private onClose():void {
            PopUpManager.removePopUp(this);
        }

        public showGameHelp(gameType:game.ChildGameType) : void {
            for(let helpUI of this.allHelpUIs) {
                helpUI.visible = false;
            }
            let selectUI:eui.Group;
            if(gameType == game.ChildGameType.DDZ) {
                selectUI = this.ddz_group;
            } else if(gameType == game.ChildGameType.PDK) {
                selectUI = this.pdk_group;
            } else if(gameType == game.ChildGameType.FRUIT) {
                selectUI = this.fruit_group;
            } else if(gameType == game.ChildGameType.ERMJ) {
                selectUI = this.ermj_group;
            } else if(gameType == game.ChildGameType.TGPD) {
                selectUI = this.candy_group;
            }
            selectUI.visible = true;
        }
    }

}
