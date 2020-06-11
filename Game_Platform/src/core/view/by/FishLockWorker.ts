module game.by {
    export class FishLockWorker {
        constructor(fishPond:BYFishPond) {
            this.fishPond = fishPond;
        }

        private fishPond:BYFishPond;
        private startLock:boolean = false;
        setStartLock() {
            this.startLock = true;
        }

        chooseFishByHand(fish:NFish|NFishRing) {

        }

        clearStart() {
            this.startLock = false;
        }

        triggerLockAfterFishDeadOrOut():NFish|NFishRing{
            if(this.startLock) return null;
            let arr = this.fishPond.getAllFish();
            let target:NFish|NFishRing = null;
            for(let f of arr) {
                if(f.deadBeginTime > 0 || (!f['tideOwner'] && this.isOutOfBounds(f))) continue;
                if(!target) {
                    target = f;
                } else {
                    if(f.fishMulti > 160) continue;
                    if(f.fishMulti > target.fishMulti) {
                        target = f;
                    }
                }
            }
            return target;
        }

        clearCheck() {
            this.startLock = false;
        }

        isOutOfBounds(fish: NFish | NFishRing):boolean{
            let w = CommonUtil.getRealWidth();
            if(fish.x < -5 || fish.x > w + 5 || fish.y < -5 || fish.y > 755) {
                return true;
            }
            return false;
		}
    }
}