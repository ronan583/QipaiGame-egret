module game.by {
    export class NFishRing extends egret.Sprite{

        constructor(fishId:string, fishIndex:number, ringType:number, offsetX:number, offsetY:number, pretime:number, zuheArr:Array<number>) {
			super();
			this._id = fishId;
			this.fishIndex = fishIndex;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.pretime = pretime;
			this.fishZuheArr = zuheArr;
			// 先生成各种信息，然后创建鱼的皮肤
			this.createRing(ringType, zuheArr);
			for(let i=0;i<this.fishIndexArr.length;i++) {
				let fishIndex = this.fishIndexArr[i];
				let pos = this.fishPosArr[i];
				let bitmap = new egret.Bitmap();
				this.addChild(bitmap);
				bitmap.rotation = -90;
				let fishSheet = FishResHelper.getFishSheet(fishIndex);
				let fishAnim:NFishAnim = new NFishAnim(fishIndex, bitmap, 1000 / 12, fishSheet);
				fishAnim.basePos = pos;
				fishAnim.isRing = true;
				this.fishAnimArr[i] = fishAnim;
			}
			this.fishMotion = new FishMotion();
			this.fishMulti = FishCfg.getMulti(this.fishIndex);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        }
		public fishMulti:number = 0;
        private fishPosArr:Array<egret.Point>;
		private ringImgs:Array<egret.Bitmap> = [];
		private fishIndexArr:Array<number>;
		private fishZuheArr:Array<number>;
		private fishAnimArr:Array<NFishAnim> = [];
		private _deadDealy:number = 0;
		private addStage() {
			for(let i=0;i<this.ringImgs.length;i++) {
				this.ringImgs[i].anchorOffsetX = this.ringImgs[i].width / 2;
				this.ringImgs[i].anchorOffsetY = this.ringImgs[i].height / 2;
				this.ringImgs[i].x = this.fishPosArr[i].x;
				this.ringImgs[i].y = this.fishPosArr[i].y;
			}
		}

		public isOneCatach() {
			return false;
		}

        public createRing(ringIndex:number, zuheArr:Array<number>):void {
			if(ringIndex == 1) {
				this.fishPosArr = [
					new egret.Point(155,0),
					new egret.Point(0,0),
					new egret.Point(-155,0)
				]
				for(let i=0;i<3;i++) {
					var img:eui.Image = new eui.Image();
				    if(i == 0 || i == 2) {
						img.source = RES.getRes("by_ring0_1");
					} else {
						img.source = RES.getRes("by_ring0_0");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [zuheArr[1],zuheArr[0],zuheArr[2]];
			} else if(ringIndex == 2) {
				var f:number = 128;
				var a:number = Math.sin(3.1415926 / 3) * f;
				var b:number = Math.cos(3.1415926 / 3) * f;
				this.fishPosArr = [
					new egret.Point(0,0),
					new egret.Point(f,0),
					new egret.Point(-b,a),
					new egret.Point(-b,-a),
				]
				for(let i=0;i<4;i++) {
					var img:eui.Image = new eui.Image();
				    if(i == 0) {
						img.source = RES.getRes("by_ring1_0");
					} else {
						img.source = RES.getRes("by_ring1_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [zuheArr[0],zuheArr[1],zuheArr[2],zuheArr[3]];
			} else if(ringIndex == 3) {
				var f:number = 120;
				this.fishPosArr = [
					new egret.Point(0,0),
					new egret.Point(f,f),
					new egret.Point(f,-f),
					new egret.Point(-f,f),
					new egret.Point(-f,-f)
				]
				for(let i=0;i<this.fishPosArr.length;i++) {
					var img:eui.Image = new eui.Image();
				    if(i == 0) {
						img.source = RES.getRes("by_ring2_0");
					} else {
						img.source = RES.getRes("by_ring2_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [zuheArr[0],zuheArr[1],zuheArr[2],zuheArr[3],zuheArr[4]];
			} else if(ringIndex == 4) {
				var f:number = 100;
				var a:number = 140;
				this.fishPosArr = [
					new egret.Point(0,0),
					new egret.Point(f,a),
					new egret.Point(f,-a),
					new egret.Point(-f,f),
					new egret.Point(-f,-f)
				]
				for(let i=0;i<this.fishPosArr.length;i++) {
					var img:eui.Image = new eui.Image();
				    if(i == 0) {
						img.source = RES.getRes("by_ring3_0");
					} else {
						img.source = RES.getRes("by_ring3_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [zuheArr[0],zuheArr[1],zuheArr[2],zuheArr[3],zuheArr[4]];
			}
        }
        
		private _id : string = "";
		public get id():string {
			return this._id;
		}

		public set id(ids:string) {
			this._id = ids;
        }
        public fishType:FishType = FishType.SMALL;
        public fishIndex:number = 0;
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
        private _recordRotation:number = 0;
        private motionTime:number = 20;
		private fishMotion:FishMotion;
		private _deadEffectBeginTime:number;

        public setTrackCfg(trackId:number, trackCfg:NTrackCfg) {
            this.curTrackCfg = trackCfg;
            this.motionTime = NTrackCfgCache.getTrackTime(trackId);
            this.speed = this.curTrackCfg.allDistance / this.motionTime;
        }

        public get deadBeginTime():number {
			return this._deadBeginTime;
		}

        bindFishPond(fishPond: BYFishPond) {
			this.fishPond = fishPond;
		}

        update(timestamp:number):void {
			for(let anim of this.fishAnimArr) {
				anim.update(timestamp);
			}
			if(this._deadEffectBeginTime > 0) {
                this.updateDead(timestamp);
            }
        }

        updateMotion(timestamp:number):void {
            this.fishMotion.updateMotion(timestamp);
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
			if(BYFishPond.instance && BYFishPond.instance.isFlip) {
				this.y = Global.designRect.y - this.y;
				var r:number = this.rotation % 360;
				this.rotation = this.rotation + Math.abs(90 - r) * 2;
			}
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

		public getRectArr():Array<egret.Rectangle> {
			var globalPoint: egret.Point = this.parent.localToGlobal(this.x, this.y);
			var arr:Array<egret.Rectangle>= [];
			for(let img of this.ringImgs) {
				var globalPoint: egret.Point = img.localToGlobal(0, 0);
				arr.push(new egret.Rectangle(globalPoint.x - img.width / 2, globalPoint.y - img.height / 2, img.width, img.height));
			}
			
			return arr;
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
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
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
			for(let fishAnim of this.fishAnimArr) {
				fishAnim.fishImg.filters = [GameConst.getByHurtFilter()];
			}
			if(this.hideFilterId > 0) {
				egret.clearTimeout(this.hideFilterId);
			}
			this.hideFilterId = egret.setTimeout(()=>{
				for(let fishAnim of this.fishAnimArr) {
					fishAnim.fishImg.filters = [];
				}
			},this,200);
		}

		public speedUp():void {
			this.speed = 1000;
			this.fishMotion.speed = this.speed;
		}

		public isHit(pos:egret.Point):boolean {
			for(let fishAnim of this.fishAnimArr) {
				if(fishAnim.fishImg.hitTestPoint(pos.x,pos.y,false)) {
					return true;
				}
			}
			return false;
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
			egret.Tween.removeTweens(this)
			if(timestamp > (this._deadEffectBeginTime + this._deadDealy)) {
				this.destoryImm();
			} else {
				let p:number = ((timestamp - this._deadEffectBeginTime) % 1000) / 1000;
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
            return 200;
        }
    }
}