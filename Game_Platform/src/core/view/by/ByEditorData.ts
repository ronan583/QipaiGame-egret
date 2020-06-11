module game.by {
    export class ByEditorData {
		
        public static colorArr:Array<number> = [
            0xef5b9c,  
            0xf15b6c,
            0x987165,
            0xf26522,
            0x54211d,
            0xf47920,
            0x6b473c,
            0x69541b,
            0xfcaf17,
            0x6d5826,
            0x5f5d46,
            0x1d1626,
            0x6c4c49,
            0x563645,
            0x4f5555,
            0x74787c,
            0xf2eada,
            0xd9d6c3,
            0xfffffb,
            0xf173ac,
            0x402e4c,
            0x4b2f3d,
            0x8552a1,
            0x6950a1,
            0x121a2a,
            0x181d4b,
            0x46485f,
            0x444693,
            0x2585a6,
            0x228fbd,
            0x11264f,
            0x5e7c85,
            0xafdfe4,
            0x00a6ac,
            0x50b7c1,
            0x508a88,
            0x293047,
            0x122e29,
            0x27342b,
            0x40835e,
            0x45b97c,
            0x007d65,
            0x77ac98,
            0x1d953f,
            0x74905d,
            0xabc88b,
            0x4d4f36,
            0x2e3a1f,
            0x80752c,
            0xd3c6a6
        ];

        private static _instance:ByEditorData;
        public static get instance():ByEditorData {
            if(!ByEditorData._instance) {
                ByEditorData._instance = new ByEditorData();
            }
            return ByEditorData._instance;
        }

        public trackIds:Array<number> = [];

        public trackMap:HashMap = new HashMap();

        public clearStorage() {
            egret.localStorage.clear();
        }

        public loadFromStorage() {
            let trackIdStr = egret.localStorage.getItem("record_trackid_list");
            if(trackIdStr) {
                // 已经存储了数据  读取所有的数据
                let strs = trackIdStr.split(",");
                for(let s of strs) {
                    let trackId = Number(s);
                    let trackJsonContent = egret.localStorage.getItem("record_trackid_" + trackId.toFixed(0));
                    if(trackJsonContent) {
                        this.trackIds.push(trackId);
                        let obj = JSON.parse(trackJsonContent);
                        let trackCfg = new NTrackCfg();
                        for(let itemObj of obj.trackItems) {
                            let item = new NTrackItem(itemObj.x, itemObj.y);
                            item.r = itemObj.r;
                            item.d = itemObj.d;
                            trackCfg.trackItems.push(item);
                        }
                        this.trackMap.put("record_trackid_" + trackId, trackCfg);
                    }
                }
            }
        }

        public saveTrack(trackId:number, trackCfg:NTrackCfg) {
            if(this.trackIds.indexOf(trackId) < 0) {
                this.trackIds.push(trackId);
            }
            egret.localStorage.setItem("record_trackid_list", this.trackIds.join(","));
            this.trackMap.put("record_trackid_" + trackId, trackCfg);
            egret.localStorage.setItem("record_trackid_" + trackId.toFixed(0), JSON.stringify(trackCfg));
            egret.localStorage.setItem("last_trackid", trackId.toFixed(0));
            egret.log("save track id : " + trackId + "    last trackid : " + trackId);
        }

        getTrackCfg(trackId: number) {
            let trackCfg = this.trackMap.get("record_trackid_" + trackId);
            return trackCfg;
        }
        
        delete(trackId:number) {
            let idx = this.trackIds.indexOf(trackId);
            if(idx >= 0) {
                this.trackIds.splice(idx,1);
                egret.localStorage.removeItem("record_trackid_" + trackId.toFixed(0));
                this.trackMap.remove("record_trackid_" + trackId)
            }
        }

        getLastTrackId():number {
            let lastStr = egret.localStorage.getItem("last_trackid");
            if(!lastStr) return 0;
            return Number(lastStr);
        }

        getLastTrackCfg():NTrackCfg {
            let lastStr = egret.localStorage.getItem("last_trackid");
            if(!lastStr) return null;
            let tid = Number(lastStr);
            return this.trackMap.get("record_trackid_" + tid);
        }
    }
}