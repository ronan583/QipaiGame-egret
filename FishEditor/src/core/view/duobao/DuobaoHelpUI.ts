module game.duobao {
    export class DuobaoHelpUI extends ResizePanel {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/duobao/DuobaoHelp.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closebtn: eui.Button;

        private img1: eui.Image;
        private img2: eui.Image;
        private img3: eui.Image;
        private img4: eui.Image;

        private prevBtn: eui.Button;
        private nextBtn: eui.Button;

        private imgArr: Array<eui.Image> = [];

        private cursor: number = 0;

        private jieshaoUnSelect: eui.Image;
        private jieshaoSelect: eui.Image;
        private wanfaUnSelect: eui.Image;
        private wanfaSelect: eui.Image;

        private state: number = 1;
        private jieshaoGroup: eui.Group;
        private ruleGroup: eui.Group;
        private scroller: eui.Scroller;

        private refreshState() {
            if (this.state == 1) {
                this.jieshaoUnSelect.visible = this.wanfaSelect.visible = false;
                this.jieshaoSelect.visible = this.wanfaUnSelect.visible = true;
                this.ruleGroup.visible = false;
                this.jieshaoGroup.visible = true;
            } else {
                this.jieshaoUnSelect.visible = this.wanfaSelect.visible = true;
                this.jieshaoSelect.visible = this.wanfaUnSelect.visible = false;
                this.ruleGroup.visible = true;
                this.jieshaoGroup.visible = false;
            }
        }


        protected childrenCreated(): void {
            super.childrenCreated();
            if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
            this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);

            this.imgArr = [
                this.img1, this.img2, this.img3, this.img4
            ];

            this.prevBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upClick, this);
            this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downClick, this);
            this.jieshaoUnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jieshaoSelectClick, this);
            this.wanfaUnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wanfaSelectClick, this);
            this.updateShow();
            this.refreshState();
        }

        protected addToStage() {
            super.addToStage();
            egret.setTimeout(() => {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }, this, 100);
        }

        protected removeFromStage() {
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }
        }


        private stageClick(e: egret.TouchEvent) {
            if (!this.hitTestPoint(e.stageX, e.stageY, true)) {

                this.closePanel();
            }
        }

        private wanfaSelectClick() {
            this.state = 2;
            this.refreshState();
        }

        private jieshaoSelectClick() {
            this.state = 1;
            this.refreshState();
        }

        private closePanel(): void {
            // AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_HELP_UI);
            PopUpManager.removePopUp(this);
            this.removeFromStage();
        }

        private upClick(): void {
            this.cursor -= 1;
            if (this.cursor < 0) {
                this.cursor = 0;
            }
            this.updateShow();
        }

        private downClick(): void {
            this.cursor += 1;
            if (this.cursor > 3) {
                this.cursor = 3;
            }
            this.updateShow();
        }

        private updateShow(): void {
            if (this.cursor == 0) {
                this.prevBtn.enabled = false;
            } else {
                this.prevBtn.enabled = true;
            }

            if (this.cursor == 3) {
                this.nextBtn.enabled = false;
            } else {
                this.nextBtn.enabled = true;
            }

            for (let img of this.imgArr) {
                img.visible = false;
            }

            this.imgArr[this.cursor].visible = true;
        }
    }
}