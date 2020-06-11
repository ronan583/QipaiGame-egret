module game.hhdz {
    export class HHBird extends egret.DisplayObjectContainer {

        constructor() {
            super();
            // create bird here and add to this container
            this.birdMc = TweenUtils.getMovieClip("hhdz_bird", "hhdz_bird");
            this.addChild(this.birdMc);
            this.birdMc.gotoAndPlay(1,-1);
            this.birdMc.scaleX = this.birdMc.scaleY = 0.6;
        }

        private birdMc:egret.MovieClip;
        private startTime:number;
        private dir:egret.Point;
        private speed:number;
        private startPoint:egret.Point;
        private needTime:number = 0;
        private delta:egret.Point;
        public startFromTo(from:egret.Point, to:egret.Point, speed:number = 800) {
            this.x = from.x;
            this.y = from.y;
            this.startTime = egret.getTimer();
            let detlax = to.x - from.x;
            let deltay = to.y - from.y;
            let offset = new egret.Point(detlax, deltay);
            offset.normalize(1);
            to = new egret.Point(to.x - offset.x * 10, to.y - offset.y * 10);
            this.delta = new egret.Point(to.x - from.x, to.y - from.y);
            this.speed = speed;
            this.startPoint = from;
            this.needTime = (egret.Point.distance(from, to) / speed) * 1000;
            let angle = Math.atan(deltay / detlax) * 180 / 3.1415926;
            this.birdMc.rotation = angle;
            egret.startTick(this.updateMotion, this);
        }

        private updateMotion(timestamp:number):boolean {
            let pass = timestamp - this.startTime;
            this.x = this.startPoint.x + (pass / this.needTime) * this.delta.x;
            this.y = this.startPoint.y + (pass / this.needTime) * this.delta.y;
            if(pass >= this.needTime) {
                this.stop();
            }
            return false;
        }
        private stop() {
            egret.stopTick(this.updateMotion, this);
            this.birdMc.stop();
            if(this.parent) this.parent.removeChild(this);
        }
    }
}