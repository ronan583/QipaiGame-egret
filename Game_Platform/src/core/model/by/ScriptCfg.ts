module game.by {

	export class ScriptItem {
		public index:number;
		public fishIndex:number;
		public delayTime:number;
		public trackId:number;
		public offsetX:number;
		public offsetY:number;
		public scriptId:number;

		public createdIndex:number = 0;
	}

	export class ScriptSummary {
		public scriptId:number;
		public scriptItems:Array<ScriptItem> = [];
		public getScriptItemByMinute(minute:number):ScriptItem {
			if(this.scriptItems.length > 0) {
				var index:number = Math.floor(minute % this.scriptItems.length);
				return this.scriptItems[index];
			}
			return null;
		}
		public getTotalTime():number {
			if(this.scriptItems.length > 0) {
				return this.scriptItems[this.scriptItems.length - 1].delayTime;
			}
			return 0;
		}
	}

	export class ScriptCfg {
		private static _instance:ScriptCfg;
		public static get instance():ScriptCfg {
			if(ScriptCfg._instance == null) {
				ScriptCfg._instance = new ScriptCfg();
			}
			return ScriptCfg._instance;
		}
		public constructor() {
			
		}
		public trackIndex:number = 0;
		public scriptItemMap:HashMap = new HashMap();
		public scriptSummaryList:Array<ScriptSummary> = [];
		public scriptItemList:Array<ScriptSummary> = [];

		public init():void {
			var scriptSummary:string = RES.getRes("script_dat");
			var scripts:string[] = scriptSummary.split("\n");
			for(let script of scripts) {
				script = script.replace("\r","");
				var scriptSum:ScriptSummary = new ScriptSummary();
				if(script == null || script == "") {
					continue;
				}
				var scriptContent:string = RES.getRes(script.replace("\r",""));
				var ss:string[] = scriptContent.split("\n");
				var index:number = 0;
				var scriptId:number = Number(script.substring(0, script.indexOf("_")));
				scriptSum.scriptId = scriptId;
				scriptSum.scriptItems = [];
				for(let str of ss) {
					str = str.replace("\r","")
					if(str == "") continue;
					let svs:string[] = str.split(",");
					if(svs.length < 2) continue;
					var scriptItem:ScriptItem = new ScriptItem();
					scriptItem.fishIndex = Number(svs[1]);
					scriptItem.delayTime = Number(svs[2]);
					scriptItem.trackId = Number(svs[3]);
					scriptItem.offsetX = Number(svs[4]);
					scriptItem.offsetY = Number(svs[5]);
					scriptItem.index = index;
					scriptItem.scriptId = scriptId;
					scriptSum.scriptItems.push(scriptItem);
					index++;
				}
				this.scriptItemMap[script] = scriptSum;
				this.scriptSummaryList.push(scriptSum);
			}
		}

		public getScriptSummary(minute:number):ScriptSummary {
			var key:string = "20" + (minute < 10 ? "0" + minute.toFixed(0) : minute.toFixed(0));
			return this.scriptItemMap.get(key + "_dat");
		}

		public getScriptSummary2(minute:number):ScriptSummary {
			var key:string = "500" + (minute < 10 ? "0" + minute.toFixed(0) : minute.toFixed(0));
			return this.scriptItemMap.get(key + "_dat");
		}

		public getScriptSummaryByName(name:string):ScriptSummary {
			return this.scriptItemMap.get(name);
		}

	}
}