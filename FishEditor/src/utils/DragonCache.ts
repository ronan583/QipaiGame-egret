module game {
	export class DragonCache {
		private static _instance:DragonCache;
		public static get instance() {
			if(!DragonCache._instance) {
				DragonCache._instance = new DragonCache();
			}
			return DragonCache._instance;
		}
		public constructor() {
		}

		private cacheMap:HashMap = new HashMap();

		public getDragonFactory(dragonbonesData:string, textureData:string, texture:string):dragonBones.EgretFactory {
			if(this.cacheMap.contains(dragonbonesData)) {
				return this.cacheMap.get(dragonbonesData);
			}

			let dragonbonesDataC = RES.getRes(dragonbonesData);
			let textureDataC = RES.getRes(textureData);
			let textureC = RES.getRes(texture);
			let dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
			dragonbonesFactory.parseDragonBonesData(dragonbonesDataC);
			dragonbonesFactory.parseTextureAtlasData(textureDataC, textureC);
			return dragonbonesFactory;
		}
	}
}