module game.by {
	export class FishMcRes {
		public mcdata:any;
		public mcTexture:egret.Texture;

		public isOk():boolean {
			return this.mcdata!=null && this.mcTexture != null;
		}

		public completeCallBack:(mc:egret.MovieClip)=>void;
		public completeCallObject:any;

		public fishKey:string ;
	}
	export class BYFishMCFactory {
		private static _instance:BYFishMCFactory;
		public static get instance():BYFishMCFactory {
			if(BYFishMCFactory._instance == null) {
				BYFishMCFactory._instance = new BYFishMCFactory();
			}
			return BYFishMCFactory._instance;
		}
		public constructor() {
			this.mcFactoryMap = new HashMap();
			this.fishMcResMap = new HashMap();
		}

		private mcFactoryMap:HashMap;
		private fishMcResMap:HashMap;

		public getFish000(fishIndex:number,func:(mc:egret.MovieClip)=>void,thisObject:any):void {
			var key:string = "fish" + fishIndex;
			var mcFactory:egret.MovieClipDataFactory = null;
			if(this.mcFactoryMap.contains(key)) {
				mcFactory = this.mcFactoryMap.get(key);
				func.call(thisObject, new egret.MovieClip(mcFactory.generateMovieClipData("fish")));
			} else {
				var fishRes:FishMcRes = this.getFishMcRes(key);
				fishRes.completeCallBack = func;
				fishRes.completeCallObject = thisObject;
				RES.getResAsync(key + "_tex_png", this.onTexPngLoadComplete, this);
				RES.getResAsync(key + "_mc_json", this.onMcDataLoadComplete, this);
			}
		}

		public getFishAsync(fishIndex:number) {
			var key:string = "fish" + fishIndex;
			RES.getResAsync(key + "_tex_png"); 
			RES.getResAsync(key + "_mc_json"); 
			var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes(key + "_mc_json"), RES.getRes(key + "_tex_png") );
			this.mcFactoryMap.put(key, mcFactory);
		}

		public getFish(fishIndex:number):egret.MovieClip {
			var key:string = "fish" + fishIndex;
			if(this.mcFactoryMap.contains(key)) {
				var mcFactory:egret.MovieClipDataFactory = this.mcFactoryMap.get(key);
				return new egret.MovieClip(mcFactory.generateMovieClipData(key));
			}
			return null;
		}

		private onTexPngLoadComplete(value: any, key: string):void {
			var fishKey:string = key.substring(0, key.indexOf("_"));
			var fishRes:FishMcRes = this.getFishMcRes(fishKey);
			fishRes.mcTexture = value;
			if(fishRes.isOk()) {
				this.onLoadComplete(fishRes);
			}
		}

		private onMcDataLoadComplete(value: any, key: string):void {
			var fishKey:string = key.substring(0, key.indexOf("_"));
			var fishRes:FishMcRes = this.getFishMcRes(fishKey);
			fishRes.mcdata = value;
			if(fishRes.isOk()) {
				this.onLoadComplete(fishRes);
			}
		}

		private onLoadComplete(fishRes:FishMcRes):void {
			var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( fishRes.mcdata, fishRes.mcTexture );
			this.mcFactoryMap.put(fishRes.fishKey, mcFactory);
			fishRes.completeCallBack.call(fishRes.completeCallObject, new egret.MovieClip(mcFactory.generateMovieClipData(fishRes.fishKey)));
		}

		private getFishMcRes(key:string):FishMcRes {
			if(this.fishMcResMap.contains(key)) {
				return this.fishMcResMap.get(key);
			} else {
				let fishRes:FishMcRes = new FishMcRes();
				fishRes.fishKey = key;
				this.fishMcResMap.put(key, fishRes);
				return fishRes;
			}
		}
	}
}