module game.by {
	export class BYFishRing extends egret.DisplayObjectContainer implements IPool{

		public constructor(fishId:string, fishIndex:number, trackId:number, offsetX:number, offsetY:number,pretime:number) {
			super();
			this.fishIndex = fishIndex;
			this.trackId = trackId;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.pretime = pretime;
			this._id = fishId;
			this._poolKey = "fish_" + fishIndex;
			this.createRing(fishIndex);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
		}

		private ringIndex:number = 19;
		private ringImgs:Array<eui.Image> = [];
		private fishMcArr:Array<egret.MovieClip> = [];
		private fishIndexArr:Array<number> = [];
		private fishPosArr:Array<egret.Point> = [];
		private hideFilterId: number;
		private lockImg: eui.Image;

		public createRing(ringIndex:number):void {
			if(ringIndex == 19) {
				this.fishPosArr = [
					new egret.Point(155,0),
					new egret.Point(0,0),
					new egret.Point(-155,0)
				]
				for(let i=0;i<3;i++) {
					var img:eui.Image = new eui.Image();
				    if(i == 0 || i == 2) {
						img.source = RES.getRes("ring0_1");
					} else {
						img.source = RES.getRes("ring0_0");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [9,12,9];
			} else if(ringIndex == 20) {
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
						img.source = RES.getRes("ring1_0");
					} else {
						img.source = RES.getRes("ring1_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [9,13,13,13];
			} else if(ringIndex == 22) {
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
						img.source = RES.getRes("ring2_0");
					} else {
						img.source = RES.getRes("ring2_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [17,16,16,16,16];
			} else if(ringIndex == 24) {
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
						img.source = RES.getRes("ring3_0");
					} else {
						img.source = RES.getRes("ring3_1");
					}
					
					this.addChild(img);
					this.ringImgs.push(img);
				}
				this.fishIndexArr = [18,16,16,16,16];
			}
		}

		private onFishMcLoadComplete(fishAssets:FishAssets, params:any) {
			let mc:egret.MovieClip = fishAssets.generateMc();
			let fishIndex:number = Number(fishAssets.fishKey.replace("fish_",""));
			this.fishMcArr.push(mc);
			this.addChild(mc);
			mc.x = params.x
			mc.y = params.y
			mc.play(-1);
			mc.rotation = 90;
			if(this.fishIndex == 22) {
				if(fishIndex == 17) {
					mc.x = params.x + 60;
				} else if(fishIndex == 16) {
					mc.x = params.x + 30;
				}
			}
			if(this.fishIndex == 24) {
				if(fishIndex == 18) {
					mc.x = params.x + 60;
				} else if(fishIndex == 16) {
					mc.x = params.x + 30;
				}
			}
		}

		private addStage() {
			for(let i=0;i<this.ringImgs.length;i++) {
				this.ringImgs[i].anchorOffsetX = this.ringImgs[i].width / 2;
				this.ringImgs[i].anchorOffsetY = this.ringImgs[i].height / 2;
				this.ringImgs[i].x = this.fishPosArr[i].x;
				this.ringImgs[i].y = this.fishPosArr[i].y;
			}

			for(let i=0;i<this.fishIndexArr.length;i++) {
				var fishIndex:number = this.fishIndexArr[i];
				BYFishResMng.instance.getFishRes(fishIndex, this.onFishMcLoadComplete, this, this.fishPosArr[i]);
			}

			game.by.BYFishResMng.instance.getFishTrackCfg(this.trackId, this.onTrackLoad, this);
		}

		private onTrackLoad(fishTrackCfgAssets:game.by.FishTrackCfgAssets):void {
			this.curTrackCfg = fishTrackCfgAssets.trackCfg;
			if(this.pretime > 0) {
				this.curosr = Math.floor(this.pretime * 30 / 4);
			}
			this.startMotion();
		}

		public fishType:FishType = FishType.RING;

		private _id : string = "";

		public get id():string {
			return this._id;
		}

		public set id(ids:string) {
			this._id = ids;
		}

		public fishIndex:number;

		private curTrackCfg:TrackCfg;

		private curosr:number = 0;

		public trackId:number = 0;

		public pretime:number = 0;

		public offsetX:number = 0;
		public offsetY:number = 0;
		
		private _free:boolean = false;
		private _poolKey:string = "";

		private mcWidth:number = 0;
		private mcHeight:number = 0;

		public isCopy:boolean = false;

		private isSpeedUp:boolean = false;

		private _deadBeginTime:number = 0;
		private _recordRotation:number = 0;

		public get deadBeginTime():number {
			return this._deadBeginTime;
		}

		private onTrackLoaded(data:TrackCfg):void {
			this.curTrackCfg = data;
			this.startMotion();
		}

		public startMotion():void {
			egret.startTick(this.updateMotion, this);
		}

		public setCursor(cursor:number):void {
			this.curosr += cursor;
		}

		private tick:number = 0;
		public updateMotion(timestamp:number):boolean {
			for(let img of this.ringImgs) {
				img.rotation += 2;
			}
			if((this.tick++ % 4) != 0 && !this.isSpeedUp) return;
			if(this.curosr >= this.curTrackCfg.count()) {
				// this.curosr = 0;
				// 游完了
				// 放回池子里面
				egret.stopTick(this.updateMotion, this);
				if(this.parent) this.parent.removeChild(this);
				// PoolManager.instance.pushObj(this);
				BYData.instance.removeFish(this.id);
				// BYRequest.sendFishOut(this.id);
				return ;
			}
			var trackItem:TrackItem = this.curTrackCfg.getTrackItem(this.curosr);
			if(!trackItem) {
				egret.stopTick(this.updateMotion, this);
				return;
			}
			this.x = trackItem.x + this.offsetX;
			this.y = Global.designRect.y - (trackItem.y + this.offsetY);
			this.rotation = trackItem.r + 90;
			if(BYFishPond.instance && BYFishPond.instance.isFlip) {
				this.y = Global.designRect.y - this.y;
				var r:number = this.rotation % 360;
				this.rotation = this.rotation + Math.abs(90 - r) * 2;
			}
			
			if(this.isSpeedUp) {
				this.curosr = this.curosr + 5;
			} else {
				this.curosr++;
			}

			return false;
		}

		public getRect():egret.Rectangle {
			var globalPoint: egret.Point = this.parent.localToGlobal(this.x, this.y);
			return new egret.Rectangle(globalPoint.x - this.mcWidth / 2, globalPoint.y - this.mcHeight / 2, this.mcWidth, this.mcHeight);
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

		public getPos():egret.Point {
			if(!this.parent) return new egret.Point(0,0);
			return this.parent.localToGlobal(this.x, this.y);
		}

		public showLock():void {
			if(!this.lockImg) {
				this.lockImg = new eui.Image();
				this.lockImg.source = "lock_head";
				this.lockImg.anchorOffsetX = this.lockImg.width / 2;
				this.lockImg.anchorOffsetY = this.lockImg.height / 2;
			}
			this.addChild(this.lockImg);
		}

		public clearLock():void {
			if(this.lockImg && this.lockImg.stage) {
				this.lockImg.parent.removeChild(this.lockImg);
			}
		}

		public set free(isFree:boolean) {
			this._free=isFree;
		}
		public get free():boolean {
			return this._free;
		}
		public set poolKey(key:string) {
			this._poolKey=key;
		}
		public get poolKey():string {
			return this._poolKey;
		}
		public reset():void{
			this.x = this.y =0 ;
			this.curosr = 0;
			this.curTrackCfg = null;
			this.rotation = 0;
		}

		public stopMotion():void {
			egret.stopTick(this.updateMotion, this);
		}

		public dead(dealy:number):void {
			this._deadBeginTime = egret.getTimer();
			this._recordRotation = this.rotation;
			egret.stopTick(this.updateMotion, this);
			egret.startTick(this.updateDead, this);
		}

		private updateDead(timestamp:number):boolean {
			if(timestamp > (this._deadBeginTime + 1000)) {
				egret.stopTick(this.updateDead, this);
				if(this.parent) this.parent.removeChild(this);
				// PoolManager.instance.pushObj(this);
			} else {
				var p:number = ((timestamp - this._deadBeginTime) % 500) / 500;
				if(p < 0.25) {
					this.rotation = this._recordRotation + (- 45 * p);
				} else if(p < 0.75){
					this.rotation = this._recordRotation + (- 45 + 90 * (p - 0.25));
				} else {
					this.rotation = this._recordRotation + (45 - 45 * (p - 0.75));
				}
			}
			return false;
		}

		public destoryImm():void {
			egret.stopTick(this.updateMotion, this);
			if(this.parent) this.parent.removeChild(this);
		}

		public hurt(bulletIndex:number):void {
			// 变红色
			this.hurtFilter();
		}

		private removeStage():void {
			if(this.hideFilterId > 0) {
				egret.clearTimeout(this.hideFilterId);
			}
		}

		private hurtFilter():void {
			if(!this.fishMcArr || this.fishMcArr.length == 0) return;
			for(let byfishmc of this.fishMcArr) {
				byfishmc.filters = [GameConst.getByHurtFilter()];
			}

			if(this.hideFilterId > 0) {
				egret.clearTimeout(this.hideFilterId);
			}
			this.hideFilterId = egret.setTimeout(()=>{
				for(let byfishmc of this.fishMcArr) {
					byfishmc.filters = [];
				}
			},this,600);
		}

		public speedUp():void {
			this.isSpeedUp = true;
		}

		public isHit(pos:egret.Point):boolean {
			for(let ringImg of this.ringImgs) {
				if(ringImg.hitTestPoint(pos.x,pos.y,false)) {
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

	}
}