module game.by{
    export class FishMotion {

        private lastMotionTime:number = 0;
        public pretime:number = 0;
        private lastRotation = 0;
        private curosr:number = 0;
        private ismotion:boolean = false;
        private curTrackCfg:NTrackCfg;
        public speed:number = 30;
        private fish:NFish|NFishRing|FishTide;

        public isRing = false;
        
        public startMotion(fish:NFish|NFishRing|FishTide, pretime:number, trackCfg:NTrackCfg, speed:number) {
            if(egret.is(fish, "game.by.NFishRing")) {
                this.isRing = true;
            }
            this.fish = fish;
            this.pretime = pretime;
            this.curTrackCfg = trackCfg;
            this.speed = speed;
            this.lastMotionTime = egret.getTimer();
            this.curosr = 0;
            if(this.pretime > 0) {
                this.lastMotionTime -= this.pretime;
            }
            this.ismotion = true;
        }

        public stopMotion(){
            this.ismotion = false;
        }

        public updateMotion(timestamp:number):void {
			if(!this.ismotion) return;
			if(!this.curTrackCfg) {
				return;
			}
            let trackItem:NTrackItem = this.curTrackCfg.getTrackItem(this.curosr);
            let pt = timestamp - this.lastMotionTime;
            let pd = (pt / 1000) * this.speed;
            let d2c = egret.Point.distance(new egret.Point(this.fish.x, this.fish.y), trackItem.getPos());
            let ad = d2c + pd;
            let fitItem:NTrackItem = null;
            let count = this.curTrackCfg.count();
            let previewd = 0;
            for(let i=this.curosr;i<count;i++) {
                let c:NTrackItem = this.curTrackCfg.getTrackItem(i);
                if(!c) break;
                previewd += c.d;
                if(ad < previewd) {
                    fitItem = c;
                    previewd -= c.d;
                    this.curosr = i;
                    break;
                }
            }
            if(!fitItem) {
                this.fish.destoryImm();
                return;
            }
            let nItem = this.curTrackCfg.getTrackItem(this.curosr + 1);
            if(!nItem) {
                this.fish.destoryImm();
                return;
            }
            let dp = new egret.Point(nItem.x - fitItem.x, nItem.y - fitItem.y);
            dp.normalize(1);
            let pp = ad - previewd;
            this.fish.x = fitItem.x + pp * dp.x;
            this.fish.y = fitItem.y + pp * dp.y;
            if(!egret.is(this.fish, "game.by.FishTide")) {
                if(this.fish.fishIndex != 29) {
                    let angle:number = Math.atan((nItem.y - this.fish.y) /(nItem.x - this.fish.x));
                    if(nItem.x < this.fish.x) {
                        angle = angle*180/3.1415926-180;
                    } else {
                        angle = angle*180/3.1415926;
                    }
                    if(!isNaN(angle)) {
                        if(angle < 0) {
                            angle += 360;
                        }
                        angle = (angle % 360);
                        let v = this.lastRotation;
                        if(v < 0) {
                            v += 360;
                        }
                        let delta = this.calcAngleFromTo(v, angle);
                        this.lastRotation = (v + (delta % 360) * (pp / fitItem.d)) % 360;
                        if(this.isRing) {
                            this.fish.rotation = this.lastRotation;    
                        } else {
                            this.fish.rotation = this.lastRotation - 90;    
                        }
                    }
                } else {
                    this.fish.rotation = -90;
                    if(dp.x < 0) {
                        this.fish.scaleY = -1;
                    } else {    
                        this.fish.scaleY = 1;
                    }
                }
            }
            this.lastMotionTime = timestamp;
			return;
        }

        private calcAngleFromTo(from:number, to:number) {
            let f = from > 180 ? from - 360 : from;
            let t = to > 180 ? to - 360 : to;
            let r = t - f;
            let r2 = to - from;
            if(Math.abs(r2) < Math.abs(r)) {
                return r2;
            }
            return r;
        }
    }
}