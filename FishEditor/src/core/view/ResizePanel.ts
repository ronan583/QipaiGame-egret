module game {
    export class ResizePanel extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        }

        protected addToStage() {
            this.width = egret.lifecycle.stage.stageWidth;
            if(this.width > 1624) {
                this.width = 1624
            }
        }

        public isOutOfDesign() {
            return this.width > 1334;
        }

        public getOutOfDesignScale() {
            return (this.width - 1334) / 290;
        }
    }
}