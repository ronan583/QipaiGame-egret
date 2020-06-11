module game.by {
    export class FishCfg {
        private static cfgObj:any;
        public static getMulti(fishId:number):number {
            if(!FishCfg.cfgObj) {
                FishCfg.cfgObj = RES.getRes("fishCfg_json");
            }
            for(let obj of FishCfg.cfgObj) {
                if(obj.fishId == fishId) {
                    return obj.multi;
                }
            }
            return 0;
        }
    }
}