module game.by {
	import ColorMatrixFilter = egret.ColorMatrixFilter;
	import MainContext = egret.MainContext;

	export class BYFishFactory {
		private static _instance:BYFishFactory;
		public static get instance():BYFishFactory {
			if(BYFishFactory._instance == null) {
				BYFishFactory._instance = new BYFishFactory();
			}
			return BYFishFactory._instance;
		}

		public trackMap:HashMap = new HashMap();
		private waitToDealMap:HashMap = new HashMap();

		public createFish(fishId:string, fishIndex:number,trackId:number, offsetX:number, offsetY:number,pretime:number = 0):BYFish {
			var poolkey:string = "fish_" + fishIndex;
			var poolObj:IPool = PoolManager.instance.popObj(poolkey);
			if(poolObj != null) {
				var fish:BYFish = <BYFish>poolObj;
				fish.id = fishId;
				fish.trackId = trackId;
				fish.pretime = pretime;
				fish.offsetX = 0;
				fish.offsetY = 0;
				fish.isCopy = true;
				return fish;
			} else {				
				return new BYFish(fishId, fishIndex,trackId,offsetX,offsetY,pretime);
			}
		}

		public createFishRing(fishId:string, fishIndex:number,trackId:number, offsetX:number, offsetY:number,pretime:number = 0):BYFishRing {
			var poolkey:string = "fish_" + fishIndex;
			var poolObj:IPool = PoolManager.instance.popObj(poolkey);
			if(poolObj != null) {
				var fish:BYFishRing = <BYFishRing>poolObj;
				fish.id = fishId;
				fish.trackId = trackId;
				fish.pretime = pretime;
				fish.offsetX = 0;
				fish.offsetY = 0;
				fish.isCopy = true;
				return fish;
			} else {				
				return new BYFishRing(fishId, fishIndex,trackId,offsetX,offsetY,pretime);
			}
		}
	}

	export class BYFish extends eui.Component implements IPool{
		public forcestop: boolean;
		private updateid: number;

		public constructor(fishId:string, fishIndex:number, trackId:number, offsetX:number, offsetY:number,pretime:number) {
			super();
			this.fishIndex = fishIndex;
			this.trackId = trackId;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.pretime = pretime;
			this._id = fishId;
			this._poolKey = "fish_" + fishIndex;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		public fishType:FishType = FishType.SMALL;

		private _id : string = "";

		public get id():string {
			return this._id;
		}

		public set id(ids:string) {
			this._id = ids;
		}

		public fishIndex:number;

		private fishMc:egret.MovieClip;

		private curTrackCfg:TrackCfg;

		private curosr:number = 0;

		public trackId:number = 0;

		public pretime:number = 0;

		public offsetX:number = 0;
		public offsetY:number = 0;
		private _free:boolean = false;
		private _poolKey:string = "";

		private debugDrawShape:egret.Shape = new egret.Shape();
		private mcWidth:number = 0;
		private mcHeight:number = 0;

		public isCopy:boolean = false;

		private isSpeedUp:boolean = false;

		private _deadBeginTime:number = 0;
		private _recordRotation:number = 0;
		private hideFilterId: number;
		private lockImg: eui.Image;

		private destoryTimeId:number;

		public get deadBeginTime():number {
			return this._deadBeginTime;
		}

		private onFishLoadComplete(fishAssets:game.by.FishAssets,params:any):void {
			this.fishMc = fishAssets.generateMc();
			this.addChild(this.fishMc);
			this.fishMc.play(-1);
			game.by.BYFishResMng.instance.getFishTrackCfg(this.trackId, this.onTrackLoad, this);
		}

		private onTrackLoad(fishTrackCfgAssets:game.by.FishTrackCfgAssets):void {
			this.curTrackCfg = fishTrackCfgAssets.trackCfg;
			if(this.pretime > 0) {
				this.curosr = Math.floor(this.pretime * 30 / 4);
			}
			this.startMotion();
		}

		public addStage() {
			if(this.isCopy) {
				console.log("我是缓存池里出来的");
			}
			if(this.fishMc == null) {
				game.by.BYFishResMng.instance.getFishRes(this.fishIndex, this.onFishLoadComplete, this);
			} else {
				this.fishMc.play(-1);
			}
			game.by.BYFishResMng.instance.getFishTrackCfg(this.trackId, this.onTrackLoad, this);
		}

		public start():void {
			this.fishMc.play(-1);
			game.by.BYFishResMng.instance.getFishTrackCfg(this.trackId, this.onTrackLoad, this);
		}

		private updatetrack(data:TrackCfg):void {
			this.curTrackCfg = data;
		}

		private ismotion:boolean = false;

		public startMotion():void {
			this.ismotion = true;
		}

		public setCursor(cursor:number):void {
			this.curosr += cursor;
		}

		private tick:number = 0;
		public updateMotion(timestamp:number):void {
			if(!this.ismotion) return;
			if((this.tick++ % 4) != 0 && !this.isSpeedUp) return;
			if(!this.curTrackCfg) {
				console.log("找不到配置文件:" + this.trackId)	
				return;
			}
			var trackItem:TrackItem = this.curTrackCfg.getTrackItem(this.curosr);
			
			if(this.curosr >= this.curTrackCfg.count() || !trackItem) {
				// this.curosr = 0;
				// 游完了
				// 放回池子里面
				this.stopMotion();
				// 不移除  隐藏就好
				if(this.parent) this.parent.removeChild(this);
				BYFishPond.instance.removeFish(this);
				// PoolManager.instance.pushObj(this);
				BYData.instance.removeFish(this.id);
				return ;
			}
			
			this.x = trackItem.x + this.offsetX;
			this.y = Global.designRect.y - (trackItem.y + this.offsetY);

			this.rotation = trackItem.r + 180;
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

			if(this.mcWidth == 0 && this.fishMc) {
				var texture:egret.Texture = this.fishMc.movieClipData.getTextureByFrame(1);
				this.mcWidth = texture.textureWidth;
				this.mcHeight = texture.textureHeight;
			}

			return;
		}

		public getRect():egret.Rectangle {
			var globalPoint: egret.Point = this.parent.localToGlobal(this.x, this.y);
			return new egret.Rectangle(globalPoint.x - this.mcWidth / 2, globalPoint.y - this.mcHeight / 2, this.mcWidth, this.mcHeight);
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
			// this.x = this.y =0 ;
			this.curosr = 0;
			// this.curTrackCfg = null;
			this.rotation = 0;
			this.stopMotion();
		}

		public stopMotion():void {
			this.ismotion = false;
			if(this.fishMc != null) {
				this.fishMc.stop();
			}
		}

		public dead(dealy:number):void {
			this._deadBeginTime = egret.getTimer();
			this._recordRotation = this.rotation;
			this.stopMotion();
			egret.startTick(this.updateDead, this);
		}

		private updateDead(timestamp:number):boolean {
			if(timestamp > (this._deadBeginTime + 1000)) {
				this.stopMotion();
				if(this.parent) this.parent.removeChild(this);
				BYFishPond.instance.removeFish(this);
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
			this.stopMotion();
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
			// PoolManager.instance.pushObj(this);
		}

		private hurtFilter():void {
			if(!this.fishMc) return;
			this.fishMc.filters = [GameConst.getByHurtFilter()];
			if(this.hideFilterId > 0) {
				egret.clearTimeout(this.hideFilterId);
			}
			this.hideFilterId = egret.setTimeout(()=>{
				this.fishMc.filters = [];
			},this,600);
		}

		public speedUp():void {
			this.isSpeedUp = true;
		}

		public isHit(pos:egret.Point):boolean {
			let stagep = this.getPos();
			if(egret.Point.distance(stagep, pos) < this.mcWidth / 2) {
				return this.fishMc.hitTestPoint(pos.x,pos.y,false);
			}	
		}

		public addBossBg():void {
			var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( 
				RES.getRes("bossBg_mc_json"), RES.getRes("bossBg_tex_png") );
			var mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("bossBg"));
			this.addChild(mc);
			this.setChildIndex(mc,0);
			mc.play(-1);
			mc.rotation = mc.rotation + 90;
		}

		public attachNotice() {
			let attachBg = game.by.BYFishPond.instance.getAttachImgBg();
			let attach = game.by.BYFishPond.instance.getAttachFront();
			this.addChildAt(attachBg, 0);
			this.addChild(attach);
		}
	}
}
