module game {
	export class NHelpUI extends ResizePanel {
		public constructor(gameType: game.ChildGameType) {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            switch (gameType) {
                case game.ChildGameType.FRUIT:
                    this.skinName = "resource/eui_skins/help/FruitHelpUI.exml";
                    break;
                case game.ChildGameType.BJL:
                    this.skinName = "resource/eui_skins/help/BjlHelpUI.exml";
                    break;
                case game.ChildGameType.ZJH:
                    this.skinName = "resource/eui_skins/help/ZjhHelpUI.exml";
                    break;
                case game.ChildGameType.QYNN:
                    this.skinName = "resource/eui_skins/help/QznnHelpUI.exml";
                    break;
                case game.ChildGameType.DDZ:
                    this.skinName = "resource/eui_skins/help/DdzHelpUI.exml";
                    break;
                case game.ChildGameType.BRNN:
                    this.skinName = "resource/eui_skins/help/BrnnHelpUI.exml";
                    break;
                case game.ChildGameType.LHDZ:
                    this.skinName = "resource/eui_skins/help/LhdzHelpUI.exml";
                    break;
                case game.ChildGameType.PDK:
                    this.skinName = "resource/eui_skins/help/PdkHelpUI.exml";
                    break;
                case game.ChildGameType.ERMJ:
                    this.skinName = "resource/eui_skins/help/ErmjHelpUI.exml";
                    break;
                case game.ChildGameType.HHDZ:
                    this.skinName = "resource/eui_skins/help/HhdzHelpUI.exml";
                    break;
                case game.ChildGameType.TGPD:
                    this.skinName = "resource/eui_skins/help/TgpdHelpUI.exml";
                    break;
                case game.ChildGameType.DUOBAO:
                    this.skinName = "resource/eui_skins/duobao/DuobaoHelp.exml";
                    break;
                case game.ChildGameType.DZPK:
                    this.skinName = "resource/eui_skins/help/DzpkHelpUI.exml";
                    break;
                case game.ChildGameType.DiceBao:
                    this.skinName = "resource/eui_skins/help/HlsbHelpUI.exml";
                    break;
                case game.ChildGameType.BCBM:
                    this.skinName = "resource/eui_skins/help/BcbmHelpUI.exml";
                    break;
                case game.ChildGameType.FQZS:
                    this.skinName = "resource/eui_skins/help/FqzsHelpUI.exml";
                    break;
                case game.ChildGameType.BY:
                    this.skinName = "resource/eui_skins/help/ByHelpUI.exml";
                    break;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closebtn: eui.Image;
        private scroller: eui.Scroller;
        public viewport: eui.Group;

        private data: any;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
        }

        protected addToStage() {
            super.addToStage();
            egret.setTimeout(()=>{
               egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }, this, 100);
        }

        private removeFromStage() {
            egret.lifecycle.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
        }

        private stageClick(e:egret.TouchEvent) {
            if(!this.hitTestPoint(e.stageX, e.stageY, true)) {
                this.onClose();
            }
        }

		private onClose() {
            egret.lifecycle.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            PopUpManager.removePopUp(this);
		}

	}
}