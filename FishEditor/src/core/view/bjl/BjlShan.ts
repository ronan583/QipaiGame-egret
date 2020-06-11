module game.bjl {
    export class BjlShan {
        private display:egret.DisplayObject;
        constructor(display:egret.DisplayObject) {
            this.display = display;
        }
        private startTime:number;
        public play() {
            this.startTime = egret.getTimer();
            egret.startTick(this.update, this);
        }

        private update(timestamp:number):boolean {
            let delta = timestamp - this.startTime;
            let flag = Math.floor(delta / 500);
            if(flag % 2 == 0) {
                this.display.alpha = (delta - flag * 500) / 500
            } else {
                this.display.alpha = (500 - delta + flag * 500) / 500
            }
            return false;
        }

        public stop() {
            egret.stopTick(this.update, this);
            this.display.alpha = 0.01;
        }

    }
}