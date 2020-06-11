module game.by {
    export class FishTide extends egret.DisplayObjectContainer{
        constructor(fishTideInfo:FishTideInfo) {
            super();
            this.fishTideInfo = fishTideInfo;
            this.genFishesByData();
            this.setChildIndex(this.centerFish, this.numChildren + 1);
            this.fishMotion = new FishMotion();
            this.pretime = (BYData.instance.servetTime - fishTideInfo.createTime);
            this.startTime = egret.getTimer();
        }
        private fishArr:Array<NFish|NFishRing> = [];
        private fishTideInfo:FishTideInfo;
        public fishIndex = 0;
        private maxRadius = 0;
        private pretime:number = 0;
        private centerFish:NFish|NFishRing;
        private startTime:number = 0;

        private updateToShow:number = 0;

        public getAllFishes() {
            return this.fishArr;
        }

        private fishMotion:FishMotion;
        public destoryImm() {
            if(this.parent) {
                this.parent.removeChild(this);
                BYFishPond.instance.removeFishTide(this);
            }
        }

        public startMotion() {
            let trackCfg = NTrackCfgCache.getTideTrackCfg(
                !this.fishTideInfo.isRight, 
                egret.lifecycle.stage.stageWidth / 1624, this.maxRadius);
            this.x = trackCfg.trackItems[0].x;
            this.y = trackCfg.trackItems[0].y;
            this.fishMotion.startMotion(this, this.pretime, trackCfg, 50);
        }

        genFishesByData():Array<NFish|NFishRing>{
            this.fishTideInfo.tideRoundArr.sort((a1:FishTideRound,a2:FishTideRound):number=>{
                return a2.round - a1.round;
            })
            for(let tideRound of this.fishTideInfo.tideRoundArr) {
                if(tideRound.fishesCount == 1) {
                    if(tideRound.deadFishIds.length == 0) {
                        // 是中心鱼 
                        let fish:NFish|NFishRing;
                        if(tideRound.isZuHe) {
                            fish = new NFishRing(this.fishTideInfo.fishTideId + '_' + tideRound.round + '_' + 0,
                                tideRound.fishesId, tideRound.isZuHe, 0,0,0, tideRound.childFishesId)
                        } else {
                            fish = new NFish(this.fishTideInfo.fishTideId + '_' + tideRound.round + '_' + 0, 
                                tideRound.fishesId, 0, 0, 0);
                        }
                        this.fishArr.push(fish);
                        if(this.fishTideInfo.isRight) {
                            fish.rotation = 90;
                        } else {
                            fish.rotation = -90;
                        }
                        this.addChild(fish);
                        fish['tideOwnerId'] = this.fishTideInfo.fishTideId;
                        fish['tideOwner'] = this;
                        this.centerFish = fish;
                        fish.visible = false;
                    }   
                } else {
                    this.createRingFish(tideRound, this.fishTideInfo.fishTideId);
                }
            }
            //this.createRingFish(300, 60, 2)
            //this.createRingFish(180, 45, 3)
            //this.createRingFish(60, 15, 4)
            return this.fishArr;
        }
        private createRingFish(tideRound:FishTideRound, tideId:number) {
        // private createRingFish(radius, count, fishId) {
            let radius = tideRound.radius;
            let count = tideRound.fishesCount;
            let fishId = tideRound.fishesId;
            let splitAngle = 360 / count;
            for(let i=0;i<count;i++) {
                if(tideRound.deadFishIds.indexOf(i) >= 0) continue;
                let angle = splitAngle * i;
                let fish = new NFish(tideId + '_' + tideRound.round + '_' + i, fishId,0,0,0);
                let arc= angle * 3.1415926 / 180;
                fish.x = radius * Math.cos(arc);
                fish.y = radius * Math.sin(arc);
                this.fishArr.push(fish);
                if(this.fishTideInfo.isRight) {
                    fish.rotation = 90;
                } else {
                    fish.rotation = -90;
                }
                this.addChild(fish);
                fish.visible = false;
                fish['tideOwnerId'] = tideId;
                fish['tideOwner'] = this;
            }
            if(radius > this.maxRadius) {
                this.maxRadius = radius;
            }
        }

        private tick:number = 0;
        public update(timestamp:number):boolean {
            if((this.tick++ % 2 == 0) && this.updateToShow < this.fishArr.length) {
                this.fishArr[this.updateToShow].visible = true;
                this.updateToShow++;
            }
            for(let fish of this.fishArr) {
                fish.update(timestamp);
            }
            this.fishMotion.updateMotion(timestamp);
            let passTime = timestamp - this.startTime + this.pretime
            if(passTime > 15000) {
                let removes = [];
                for(let fish of this.fishArr) {
                    if(this.isOutOfBounds(fish)) {
                        removes.push(fish)
                    }
                }

                for(let rf of removes) {
                    let idx = this.fishArr.indexOf(rf);
                    if(idx >= 0) {
                        this.fishArr.splice(idx, 1);
                    }
                    BYFishPond.instance.removeFish(rf);
                }
            }
            return false;
        }

        public removeFish(fish:NFish|NFishRing) {
            if(fish.parent) fish.parent.removeChild(fish);
            let idx = this.fishArr.indexOf(fish);
            if(idx >= 0) {
                this.fishArr.splice(idx, 1);
            }
        }

        isOutOfBounds(fish: NFish | NFishRing):boolean{
            let w = CommonUtil.getRealWidth();
            let pos = fish.getPos();
            if(pos.x == 0 && pos.y == 0) return;
            if(pos.x < -5 || pos.x > w + 5 || pos.y < -5 || pos.y > 755) {
                return true;
            }
            return false;
		}
    }
}