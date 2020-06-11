module game.by {
    export class FishResHelper {
        private static FISH_ONE_ARR:number[] = [
            0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,23,24
        ];
        private static FISH_TWO_ARR:number[] = [
            25,26,27,28
        ];
        private static fish1Sheet:egret.SpriteSheet;
        private static fish2Sheet:egret.SpriteSheet;
        private static fishAnimDataMap:{[index:number]:any;} = {};
        public static getCombination_oneCatch():egret.Texture {
            if(!FishResHelper.fish2Sheet) {
                FishResHelper.fish2Sheet = RES.getRes("fishsheet1-2_json");
            }
            return FishResHelper.fish2Sheet.getTexture("combination_oneCatch");
        }
        public static getFishSheet(fishId:number):egret.SpriteSheet {
            fishId = fishId - 1;
            if(FishResHelper.FISH_ONE_ARR.indexOf(fishId) >= 0) {
                if(!FishResHelper.fish1Sheet) {
                    FishResHelper.fish1Sheet = RES.getRes("fishsheet1-1_json");
                }
                return FishResHelper.fish1Sheet
            }
            if(FishResHelper.FISH_TWO_ARR.indexOf(fishId) >= 0) {
                if(!FishResHelper.fish2Sheet) {
                    FishResHelper.fish2Sheet = RES.getRes("fishsheet1-2_json");
                }
                return FishResHelper.fish2Sheet
            }
            return null;
        }
        public static getAnimData(fishId:number):any {
            if(FishResHelper.fishAnimDataMap[fishId]) {
                return FishResHelper.fishAnimDataMap[fishId]
            }else {
                let key = "fish" + fishId.toFixed(0) + "_mc_json";
                let animData = RES.getRes(key);
                FishResHelper.fishAnimDataMap[fishId] = animData;
                return animData;
            }
        }
    }

    export class NFish extends egret.Sprite{
		
        constructor(fishId:string, fishIndex:number, offsetX:number, offsetY:number,pretime:number = 0) {
            super();
            this._id = fishId;
            this.fishIndex = fishIndex;
            this.fishSheet = FishResHelper.getFishSheet(fishIndex);
            if(!this.fishSheet) {
                this.fishIndex = 1;
                this.fishSheet = FishResHelper.getFishSheet(this.fishIndex);
            }
            this.bitmap = new egret.Bitmap();
            this.addChild(this.bitmap);
            let animRatePassTime = 1000 / 12;
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.pretime = pretime;
            this._fishMulti = FishCfg.getMulti(this.fishIndex);
            this.fishAnim = new NFishAnim(this.fishIndex, this.bitmap, animRatePassTime, this.fishSheet);
            this.fishMotion = new FishMotion();
        }

        private _id : string = "";
		public get id():string {
			return this._id;
		}

		public set id(ids:string) {
			this._id = ids;
        }
        public fishType:FishType = FishType.SMALL;
        private _fishMulti:number = 0;
        public fishIndex:number = 0;
        private fishAnim:NFishAnim;
        private fishSheet:egret.SpriteSheet;
        private bitmap:egret.Bitmap;
        public pretime:number = 0;
		public offsetX:number = 0;
        public offsetY:number = 0;
        private curosr:number = 0;
        private curTrackCfg:NTrackCfg;
        public speed:number = 30;
        private lockImg: eui.Image;
        private hideFilterId:number;
        private fishPond:BYFishPond;
        private _deadBeginTime:number = 0;
        private _deadEffectBeginTime:number = 0;
        private _recordRotation:number = 0;
        private motionTime:number = 20;
        private fishMotion:FishMotion;
        private onCatchImg:eui.Image;
        _deadDealy: number;

        public get fishMulti():number {
            if(this.isOneCatach()) return 100;
            return this._fishMulti;
        }

        public isOneCatach() {
            return this.onCatchImg && this.onCatchImg.visible;
        }
        
        public get fishImg():egret.Bitmap {
            return this.bitmap;
        }

        public setTrackCfg(trackId:number, trackCfg:NTrackCfg) {
            this.curTrackCfg = trackCfg;
            this.motionTime = NTrackCfgCache.getTrackTime(trackId);
            let distance = this.curTrackCfg.allDistance;
            this.speed = distance / this.motionTime;
        }

        public get deadBeginTime():number {
			return this._deadBeginTime;
		}

        bindFishPond(fishPond: BYFishPond) {
			this.fishPond = fishPond;
		}

        update(timestamp:number):void {
            this.fishAnim.update(timestamp);
            if(this.onCatchImg) {
                this.onCatchImg.rotation += 1;
            }
            if(this._deadEffectBeginTime > 0) {
                this.updateDead(timestamp);
            }
        }

        updateMotion(timestamp:number):void {
            this.fishMotion.updateMotion(timestamp);
        }

        public showOnCatch() {
            this.onCatchImg = new eui.Image(FishResHelper.getCombination_oneCatch());
            this.addChildAt(this.onCatchImg, 0);
            this.onCatchImg.anchorOffsetX = this.onCatchImg.width / 2;
            this.onCatchImg.anchorOffsetY = this.onCatchImg.height / 2;
        }

        public startMotion():void {
            let trackItem:NTrackItem = this.curTrackCfg.getTrackItem(this.curosr);
            this.setPosAndRotation(trackItem);
            this.fishMotion.startMotion(this, this.pretime, this.curTrackCfg, this.speed);
        }
        
        private setPosAndRotation(trackItem:NTrackItem) {
            this.x = trackItem.x + this.offsetX;
			this.y = trackItem.y + this.offsetY;
            this.rotation = trackItem.r + 270;
            /*
			if(BYFishPond.instance && BYFishPond.instance.isFlip) {
				this.y = Global.designRect.y - this.y;
				var r:number = this.rotation % 360;
				this.rotation = this.rotation + Math.abs(90 - r) * 2;
			}*/
        }

        public stopMotion() {
            this.fishMotion.stopMotion();
        }

        public getRect():egret.Rectangle {
			var globalPoint: egret.Point = this.parent.localToGlobal(this.x, this.y);
            return new egret.Rectangle(globalPoint.x - this.bitmap.width / 2, globalPoint.y - this.bitmap.height / 2, 
                this.bitmap.width, this.bitmap.height);
		}

		public getPos():egret.Point {
			if(!this.parent) return new egret.Point(0,0);
			return this.parent.localToGlobal(this.x, this.y);
		}

		public showLock():void {
			if(!this.lockImg) {
				this.lockImg = new eui.Image();
				this.lockImg.source = "lock_head";
				this.lockImg.anchorOffsetX = 52;
				this.lockImg.anchorOffsetY = 52;
			}
			this.addChild(this.lockImg);
		}

		public clearLock():void {
			if(this.lockImg && this.lockImg.stage) {
				this.lockImg.parent.removeChild(this.lockImg);
			}
        }
        
        public destoryImm():void {
			this.stopMotion();
            if(!this['tideOwnerId']) {
                 if(this.parent) this.parent.removeChild(this);
                this.fishPond.removeFish(this);
            } else {
                let fishTide = <FishTide>this['tideOwner'];
                fishTide.removeFish(this);
            }
		}

		public hurt(bulletIndex:number):void {
			// 变红色
			this.hurtFilter();
		}

		private hurtFilter():void {
			this.bitmap.filters = [GameConst.getByHurtFilter()];
			if(this.hideFilterId > 0) {
				egret.clearTimeout(this.hideFilterId);
			}
			this.hideFilterId = egret.setTimeout(()=>{
				this.bitmap.filters = [];
			},this,200);
		}

		public speedUp():void {
			this.speed = 1000;
            this.fishMotion.speed = this.speed;
		}

		public isHit(pos:egret.Point):boolean {
			let stagep = this.getPos();
			if(egret.Point.distance(stagep, pos) < this.bitmap.width / 2) {
				return this.bitmap.hitTestPoint(pos.x,pos.y,false);
			}	
        }
        public attachNotice() {
			let attachBg = game.by.BYFishPond.instance.getAttachImgBg();
			let attach = game.by.BYFishPond.instance.getAttachFront();
			this.addChildAt(attachBg, 0);
			this.addChild(attach);
        }
        public dead(dealy:number):void {
            if(this._deadBeginTime > 0) return;
            this._deadBeginTime = egret.getTimer();
            this._recordRotation = this.rotation;
            this._recordRotation = this._recordRotation % 360;
            if(this._recordRotation > 180) {
                this._recordRotation= this._recordRotation - 360;
            }
            this._deadDealy = dealy;
			this.stopMotion();
            let t = (Math.abs(this._recordRotation) / 360) * 1000;
            egret.Tween.get(this).to({rotation:0,scaleX:1.4,scaleY:1.4},t).call(()=>{
                this._deadEffectBeginTime = egret.getTimer();
                this._recordRotation = 0;
            }, this);
            // 死亡的鱼放到最上层
            if(!this['tideOwnerId']) {
                this.fishPond.fishLayer4.addChild(this);
            }
        }
        
        private updateDead(timestamp:number):boolean {
            egret.Tween.removeTweens(this);
			if(timestamp > (this._deadEffectBeginTime + this._deadDealy)) {
				this.destoryImm();
			} else {
				let p:number = ((timestamp - this._deadEffectBeginTime) % 500) / 500;
				if(p < 0.25) {
                    this.rotation = (- 45 * (p / 0.25));
				} else if(p < 0.75){
                    this.rotation = (- 45 + 90 * ((p - 0.25) / 0.5));
				} else {
                    this.rotation = (45 - 45 * ((p - 0.75) / 0.25));
				}
			}
			return false;
		}

        public getCalcWith():number{
            return this.bitmap.width;
        }
    }
}