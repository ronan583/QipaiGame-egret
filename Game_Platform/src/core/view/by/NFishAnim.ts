module game.by {
    export class NFishAnim {
        constructor(fishIndex:number, bitmap:egret.Bitmap, animRatePassTime:number, fishSheet:egret.SpriteSheet) {
            this.bitmap = bitmap;
            this.fishIndex = fishIndex;
            this.animRatePassTime = animRatePassTime;
            this.fishSheet = fishSheet;
            for(let i=0;i<this.frameKeys.length;i++) {
                this.frameKeys[i] = (fishIndex-1) + "_" + this.frameKeys[i];
            }
        }
        private bitmap:egret.Bitmap;
        private fishIndex:number = 0;
        private animRatePassTime:number;
        private lastTickTime:number = 0;
        private frameIndex:number = 0;
        private fishSheet:egret.SpriteSheet;
        private frameKeys = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        public basePos = new egret.Point(0, 0);
        public isRing = false;
        public get fishImg():egret.Bitmap{
            return this.bitmap;
        }
        public update(timestamp:number) {
            if(!this.fishSheet) {
                egret.error("鱼的皮肤找不到：" + this.fishIndex)
                return;
            }
            if((timestamp - this.lastTickTime) > this.animRatePassTime) {
                this.frameIndex++;
                if(this.frameIndex > 11) {
                    this.frameIndex = 0;
                }
                let texture = this.fishSheet.getTexture(this.frameKeys[this.frameIndex]);
                if(texture) {
                    this.bitmap.texture = texture;
                }
                if(this.isRing) {
                    this.bitmap.x = this.basePos.x - texture.textureHeight / 2;
                    this.bitmap.y = this.basePos.y + texture.textureWidth / 2;
                } else {
                    this.bitmap.x = this.basePos.x - texture.textureWidth / 2;
                    this.bitmap.y = this.basePos.y - texture.textureHeight / 2;
                }
                this.lastTickTime = timestamp;
            }
        }
    }
}