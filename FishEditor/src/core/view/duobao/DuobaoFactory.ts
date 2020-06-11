module game {
	export class DuobaoFactory {
		public constructor() {
		}

		private static movieClipDataCache:HashMap = new HashMap();

		public static getMoviewClipData(mcIndex:number):egret.MovieClipData {
			let mcData:egret.MovieClipData = <egret.MovieClipData>DuobaoFactory.movieClipDataCache.get("mcdata_" + mcIndex.toFixed(0));
			if(!mcData) {
				var data = RES.getRes("anim_gem_" + mcIndex.toFixed(0) + "_mc_json");
				var txtr = RES.getRes("anim_gem_" + mcIndex.toFixed(0) + "_tex_png");
				var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
				mcData = mcFactory.generateMovieClipData("anim_gem_" + mcIndex.toFixed(0));
				DuobaoFactory.movieClipDataCache.put("mcdata_" + mcIndex.toFixed(0), mcData);
			}
			return mcData;
		}
	}
}