module game {
	export interface IPool {
		free:boolean;
		poolKey:string;
		reset():void;
	}

	export class PoolManager {
		public constructor() {
		}
		private static _instance:PoolManager = null;
		public static get instance():PoolManager {
			if(PoolManager._instance==null) {
				PoolManager._instance = new PoolManager();
			}
			return PoolManager._instance;
		}

		private objMap:HashMap = new HashMap();

		public pushObj(poolObj:IPool):void {
			poolObj.reset();
			var list:Array<IPool> = null;
			if(this.objMap.contains(poolObj.poolKey)){
				list= this.objMap.get(poolObj.poolKey);
			}else {
				list= [];
				this.objMap.put(poolObj.poolKey,list);
			}
			if(list.indexOf(poolObj) < 0) list.push(poolObj);
		}
		
		public popObj(poolKey:string):IPool {
			if(this.objMap.contains(poolKey)){
				var list:Array<IPool>= this.objMap.get(poolKey);
				if(list.length > 0) {
					var obj:IPool = list[list.length- 1];
					list.splice(list.length - 1,1);
					// console.log("get from pool , left : " + list.length);
					return obj;
				}
			}
			return null;
		}

	}
}