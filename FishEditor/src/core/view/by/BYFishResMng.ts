module game.by {

	export enum LoadingStats {
		NONE,
		BEGAN,
		END
	}

	export class FishAssetsDelegate {
		public completeCallBack:(mc:FishAssets,params:any)=>void;
		public completeCallObject:any;
		public completeParams:any = null;
		public static valueOf(completeCallBack:(fishAssets:FishAssets,params:any)=>void, completeCallObject:any, completeParams:any = null):FishAssetsDelegate {
			let assetsDelegate:FishAssetsDelegate = new FishAssetsDelegate();
			assetsDelegate.completeCallBack  = completeCallBack;
			assetsDelegate.completeCallObject = completeCallObject;
			assetsDelegate.completeParams =completeParams;
			return assetsDelegate;
		}

	}
	
	export class FishAssets {
		public mcdata:any;
		public mcTexture:egret.Texture;
		public fishDelegates:Array<FishAssetsDelegate> = [];
		public fishKey:string ;
		private mcFactory:egret.MovieClipDataFactory;
		private fishMcData:egret.MovieClipData;
		public fishId:number;
		public loadingStatus:LoadingStats = LoadingStats.NONE;

		public constructor(fishId:number) {
			this.fishId = fishId;
			this.fishKey = "fish" + fishId;
		}

		public beginResLoad() {
			this.loadingStatus = LoadingStats.BEGAN;
			RES.getResAsync(this.fishKey + "_tex_png", this.onTexPngLoadComplete, this);
			RES.getResAsync(this.fishKey + "_mc_json", this.onMcDataLoadComplete, this);
		}

		public isOk():boolean {
			return this.mcdata!=null && this.mcTexture != null;
		}

		private onTexPngLoadComplete(value: any, key: string):void {
			this.mcTexture = value;
			if(this.isOk()) {
				this.onLoadComplete();
			}
		}

		private onMcDataLoadComplete(value: any, key: string):void {
			this.mcdata = value;
			if(this.isOk()) {
				this.onLoadComplete();
			}
		}

		private onLoadComplete():void {
			this.mcFactory = new egret.MovieClipDataFactory( this.mcdata, this.mcTexture );
			this.fishMcData = this.mcFactory.generateMovieClipData(this.fishKey);
			this.loadingStatus = LoadingStats.END;
			for(let delegate of this.fishDelegates) {
				delegate.completeCallBack.call(delegate.completeCallObject, this, delegate.completeParams);
			}
			this.fishDelegates = [];
		}

		public generateMc():egret.MovieClip {
			return new egret.MovieClip(this.fishMcData);
		}
	}

	export class FishTrackCfgDelegate {
		public completeCallBack:(mc:FishTrackCfgAssets)=>void;
		public completeCallObject:any;
		public static valueOf(completeCallBack:(fishAssets:FishTrackCfgAssets)=>void, completeCallObject:any):FishTrackCfgDelegate {
			let assetsDelegate:FishTrackCfgDelegate = new FishTrackCfgDelegate();
			assetsDelegate.completeCallBack  = completeCallBack;
			assetsDelegate.completeCallObject = completeCallObject;
			return assetsDelegate;
		}

	}

	export class FishTrackCfgAssets {
		public trackCfg:TrackCfg;
		public fishDelegates:Array<FishTrackCfgDelegate> = [];
		public trackId:number;
		private trackKey:string;

		public loadingStatus:LoadingStats = LoadingStats.NONE;

		public constructor(trackId:number) {
			this.trackId = trackId;
			this.trackKey = trackId + "_cfg";
		}

		public beginResLoad() {
			this.loadingStatus = LoadingStats.BEGAN;
			RES.getResAsync(this.trackKey, this.onLoadComplete, this);
		}

		private onLoadComplete(value: string, key: string):void {
			this.trackCfg = new TrackCfg();
			this.trackCfg.trackIndex = Number(this.trackId);
			this.trackCfg.setData(value);
			this.loadingStatus = LoadingStats.END;
			for(let delegate of this.fishDelegates) {
				delegate.completeCallBack.call(delegate.completeCallObject, this);
			}
			this.fishDelegates = [];
		}

	}

	export class BYFishResMng {

		private static _instance:BYFishResMng;
		public static get instance():BYFishResMng {
			if(BYFishResMng._instance == null) {
				BYFishResMng._instance = new BYFishResMng();
			}
			return BYFishResMng._instance;
		}
		public constructor() {
		}

		private map:HashMap = new HashMap();
		private trackMap:HashMap = new HashMap();
		public getFishRes(fishid:number, completeCallBack:(fishAssets:FishAssets,params:any)=>void, completeCaller:any, completeParams:any = null):FishAssets {
			let fishAssets:FishAssets = null;
			let fishkey:string = "fish" + fishid;
			if(this.map.contains(fishkey)) {
				fishAssets = this.map.get(fishkey);
				if(fishAssets.loadingStatus == LoadingStats.END) {
					completeCallBack.call(completeCaller, fishAssets, completeParams);
				} else {
					fishAssets.fishDelegates.push(FishAssetsDelegate.valueOf(completeCallBack, completeCaller, completeParams));
				}
			} else {
				fishAssets = new FishAssets(fishid);
				fishAssets.fishDelegates.push(FishAssetsDelegate.valueOf(completeCallBack, completeCaller, completeParams));
				fishAssets.beginResLoad();
			}

			return fishAssets;
		}

		public getFishTrackCfg(trackId:number, completeCallBack:(fishAssets:FishTrackCfgAssets)=>void, completeCaller:any):FishTrackCfgAssets {
			let trackCfgAssets:FishTrackCfgAssets = null;
			let trackKey:string = trackId + "_cfg";
			if(this.trackMap.contains(trackKey)) {
				trackCfgAssets = this.map.get(trackKey);
				if(trackCfgAssets.loadingStatus == LoadingStats.END) {
					completeCallBack.call(completeCaller, trackCfgAssets);
				} else {
					trackCfgAssets.fishDelegates.push(FishTrackCfgDelegate.valueOf(completeCallBack, completeCaller));
				}
			} else {
				trackCfgAssets = new FishTrackCfgAssets(trackId);
				trackCfgAssets.fishDelegates.push(FishTrackCfgDelegate.valueOf(completeCallBack, completeCaller));
				trackCfgAssets.beginResLoad();
			}

			return trackCfgAssets;
		}
	}
}