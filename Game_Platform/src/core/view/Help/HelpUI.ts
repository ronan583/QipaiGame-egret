module game {
    export class HelpUI extends eui.Component {
        public constructor() {
            super();
            
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/help/HelpUI.exml";
        }

       
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closeBtn:eui.Button;

        private zjhGroup:eui.Group;
        private ddzGroup:eui.Group;
        private hhdzGroup:eui.Group;
        private lhdzGroup:eui.Group;
        private pdkGroup:eui.Group;
        private brnnGroup:eui.Group;
        private allHelpUIs:Array<eui.Group>;
        private qznnGroup:eui.Group;
        private ermjGroup:eui.Group;
        private fruitGroup:eui.Group;
        private duobaoGroup:eui.Group;
        private dzpkGroup:eui.Group;
        private candyGroup:eui.Group;
        private bjlGroup:eui.Group;

        private scroller:eui.Scroller;
        private viewport:eui.Group;
        private lastGroup : eui.Group;

        protected childrenCreated():void
        {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.allHelpUIs = [this.zjhGroup, this.ddzGroup, this.hhdzGroup, this.lhdzGroup, this.pdkGroup
                ,this.brnnGroup, this.qznnGroup, this.ermjGroup,this.fruitGroup,this.duobaoGroup,this.dzpkGroup,this.candyGroup,this.bjlGroup];
            
            if(this.scroller.horizontalScrollBar != null)
            {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if(this.scroller.verticalScrollBar != null)
            {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }

        }

        private onClose():void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HELP_UI);
        }

        public showGameHelp(gameType:game.ChildGameType) : void {
            for(let helpUI of this.allHelpUIs) {
                helpUI.visible = false;
                this.addChild(helpUI);
            }
            let selectUI:eui.Group;
            if(gameType == game.ChildGameType.ZJH) {
                selectUI = this.zjhGroup;
            } else if(gameType == game.ChildGameType.DDZ) {
                selectUI = this.ddzGroup;
            } else if(gameType == game.ChildGameType.HHDZ) {
                selectUI = this.hhdzGroup;
            } else if(gameType == game.ChildGameType.LHDZ) {
                selectUI = this.lhdzGroup;
            } else if(gameType == game.ChildGameType.PDK) {
                selectUI = this.pdkGroup;
            } else if(gameType == game.ChildGameType.ERMJ) {
                selectUI = this.ermjGroup;
            } else if(gameType == game.ChildGameType.QYNN) {
                selectUI = this.qznnGroup;
            } else if(gameType == game.ChildGameType.BRNN) {
                selectUI = this.brnnGroup;
            }else if(gameType == game.ChildGameType.BJL){
                selectUI = this.bjlGroup;
            }else if(gameType == game.ChildGameType.TGPD){
                selectUI = this.candyGroup;
            }else if(gameType == game.ChildGameType.DUOBAO){
                selectUI = this.duobaoGroup;
            }else if(gameType == game.ChildGameType.DZPK){
                selectUI = this.dzpkGroup;
            }else if(gameType == game.ChildGameType.FRUIT){
                selectUI = this.fruitGroup;
            }
            selectUI.visible = true;
            this.viewport.addChild(selectUI);
            selectUI.x = selectUI.y = 0;
        }
    }

}
