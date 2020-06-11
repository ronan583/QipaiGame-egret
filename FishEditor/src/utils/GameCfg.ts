class GameCfg {
	public constructor() {
	}

	private static cfgJsonObj:any;

	public static getCfgJsonObj():any {
		if(!GameCfg.cfgJsonObj) {
			GameCfg.cfgJsonObj = RES.getRes("gameCfg_json");
		}
		return GameCfg.cfgJsonObj;
	}

	public static getStringValue(key:string):string {
		let obj = this.getCfgJsonObj();
		if(obj[key]) {
			return obj[key];
		}
		return "";
	}	

	public static getNumberValue(key:string):number {
		let obj = this.getCfgJsonObj();
		if(obj[key]) {
			return Number(obj[key]);
		}
		return 0;
	}	

	public static getMultiGameLevelRecommend(gameType:ChildGameType):Array<number>{
		let obj = this.getCfgJsonObj();
		let key = "gameQuickCfg_" + gameType;
		if(obj[key]) {
			return obj[key]["gameLevelRecommend"];
		}
		return [];
	}

	public static isGameInMultiDefine(gameType:ChildGameType):boolean{
		let obj = this.getCfgJsonObj();
		if(obj["multiPlayerGamesDefine"]) {
			return obj["multiPlayerGamesDefine"].indexOf(gameType) >= 0;
		}
		return false;
	}

}