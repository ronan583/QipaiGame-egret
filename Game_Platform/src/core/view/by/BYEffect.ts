module game.by {
	export class BYEffectFactory {
		private static _instance:BYEffectFactory;
		public static get instance():BYEffectFactory {
			if(!BYEffectFactory._instance) {
				BYEffectFactory._instance = new BYEffectFactory();
			}
			return BYEffectFactory._instance;
		}

		public static getEffect(effectName:string, autoStop:boolean = true):BYEffect {
			var poolObj:IPool = PoolManager.instance.popObj(effectName);
			if(poolObj) {
				return <BYEffect>poolObj;
			} else {
				return new BYEffect(effectName, autoStop);
			}
		}

	}
	export class BYEffect extends egret.DisplayObjectContainer implements IPool{
		public constructor(effectName:string, autoStop:boolean = true) {
			super();
			this._poolKey = effectName;
			var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes(effectName + "_mc_json"), RES.getRes(effectName + "_tex_png") );
			this.effectMc = new egret.MovieClip(mcFactory.generateMovieClipData(effectName));
			this.addChild(this.effectMc);
			this.touchEnabled = false;
			this.touchChildren = false;
			this.effectMc.addEventListener(egret.Event.ENTER_FRAME, this.updateMc, this);
			this.effectMc.gotoAndPlay(1);
			this.autoStop = autoStop;
		}

		private effectMc:egret.MovieClip;
		private _free:boolean = false;
		private _poolKey:string = "";
		private autoStop:boolean;

		public play():void {
			this.effectMc.gotoAndPlay(1);
		}

		private updateMc():void {
			if(this.effectMc.currentFrame >= this.effectMc.totalFrames) {
				if(this.autoStop) {
					// 停止播放
					this.effectMc.stop();
					this.destory();	
				} else {
					this.effectMc.gotoAndPlay(1);
				}
			}
		}

		public destory():void{
			this.effectMc.stop();
			if(this.parent) {
				this.parent.removeChild(this);
			}
			PoolManager.instance.pushObj(this);
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
			
		}

	}
}