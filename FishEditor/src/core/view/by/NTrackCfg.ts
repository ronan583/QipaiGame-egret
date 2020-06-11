module game.by {
    export class NTrackItem {
        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
        public x:number;
        public y:number;
        public r:number = 0;
        public d:number = 0;
        public getPos():egret.Point {
            return new egret.Point(this.x, this.y);
        }
    }

    export class NTrackCfgCache {
        private static cacheMap:HashMap = new HashMap();
        private static trackTimeMap:HashMap = new HashMap();
        public static getTrackTime(trackId:number):number {
            if(NTrackCfgCache.trackTimeMap.size() == 0) {
                let cfg = <string>RES.getRes("trackTime_cfg");
                let strs = cfg.split(",");
                for(let str of strs) {
                    let ss = str.split("|")
                    this.trackTimeMap.put("tt" + ss[0], Number(ss[1]));
                }
            }
            return this.trackTimeMap.get("tt" + trackId);
        }   

        public static getTrackCfg(trackId:number, stageWidthRatio:number):NTrackCfg{
            stageWidthRatio = Math.min(1, stageWidthRatio)
            if(NTrackCfgCache.cacheMap.contains("trackid_" + trackId)) {
                return  NTrackCfgCache.cacheMap.get("trackid_" + trackId);
            }
            let trackOBj = RES.getRes("track_" + trackId + "_json");
            let trackCfg = new NTrackCfg();
            for(let itemObj of trackOBj.trackItems) {
                let item = new NTrackItem(itemObj.x + 145, itemObj.y);
                item.x = item.x * stageWidthRatio;
                item.r = itemObj.r;
                item.d = itemObj.d;
                trackCfg.trackItems.push(item);
            }
            trackCfg.genRotation();
            NTrackCfgCache.cacheMap.put("trackid_" + trackId, trackCfg)
            return trackCfg;
        }
    }

    export class NTrackCfg {
        constructor() {

        }

        public trackItems:Array<NTrackItem> = [];
        public addTrackItem(p:egret.Point) {
            this.trackItems.push(new NTrackItem(p.x,p.y));
        }

        public getLastPoint():egret.Point {
            return egret.Point.create(this.trackItems[this.trackItems.length - 1].x, this.trackItems[this.trackItems.length - 1].y);
        }

        private distance(p1:NTrackItem, p2:NTrackItem):number {
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        public genRotation() {
            for(let i = 0;i < this.trackItems.length - 1; i++) {
                let cur = this.trackItems[i];
                let next = this.trackItems[i+1];
                var angle:number = Math.atan((next.y - cur.y) /(next.x - cur.x));

                if(next.x < cur.x) {
                    angle = angle*180/3.1415926-180;
                } else {
                    angle = angle*180/3.1415926;
                }
                if(!isNaN(angle)) {
                    cur.r = angle;
                }
                cur.d = this.distance(next, cur);
            }
        }

        count():number {
            return this.trackItems.length;
        }

        getTrackItem(cursor: number): NTrackItem {
            if(cursor >= this.trackItems.length) return null;
            return this.trackItems[cursor];
        }

        fix() {
            let N = this.trackItems.length;
            let outArr = [];
            if ( N < 5 ) {
                for (let  i = 0; i <= N - 1; i++ ) {
                    outArr[i] = this.trackItems[i];
                }
            } else {
                for(let item of this.trackItems) {
                    let m = new NTrackItem(item.x, item.y);
                    m.r = item.r
                    m.d = item.d;
                    outArr.push(m);
                }
                let items = this.trackItems;
                //============x
                outArr[0].x = ( 31.0 * items[0].x + 9.0 * items[1].x - 3.0 * items[2].x - 5.0 * items[3].x + 3.0 * items[4].x ) / 35.0;
                outArr[1].x = ( 9.0 * items[0].x + 13.0 * items[1].x + 12 * items[2].x + 6.0 * items[3].x - 5.0 *items[4].x) / 35.0;
                for (let i = 2; i <= N - 3; i++ ) {
                    outArr[i].x = ( - 3.0 * (items[i - 2].x + items[i + 2].x) +
                            12.0 * (items[i - 1].x + items[i + 1].x) + 17 * items[i].x ) / 35.0;
                }
                outArr[N - 2].x = ( 9.0 * items[N - 1].x + 13.0 * items[N - 2].x + 12.0 * items[N - 3].x + 6.0 * items[N - 4].x - 5.0 * items[N - 5].x ) / 35.0;
                outArr[N - 1].x = ( 31.0 * items[N - 1].x + 9.0 * items[N - 2].x - 3.0 * items[N - 3].x - 5.0 * items[N - 4].x + 3.0 * items[N - 5].x) / 35.0;
                //============y
                outArr[0].y = ( 31.0 * items[0].y + 9.0 * items[1].y - 3.0 * items[2].y - 5.0 * items[3].y + 3.0 * items[4].y ) / 35.0;
                outArr[1].y = ( 9.0 * items[0].y + 13.0 * items[1] .y+ 12 * items[2].y + 6.0 * items[3].y - 5.0 *items[4].y) / 35.0;
                for (let i = 2; i <= N - 3; i++ ) {
                    outArr[i].y = ( - 3.0 * (items[i - 2].y + items[i + 2].y) +
                            12.0 * (items[i - 1].y + items[i + 1].y) + 17 * items[i].y ) / 35.0;
                }
                outArr[N - 2].y = ( 9.0 * items[N - 1].y + 13.0 * items[N - 2].y + 12.0 * items[N - 3].y + 6.0 * items[N - 4].y - 5.0 * items[N - 5].y ) / 35.0;
                outArr[N - 1].y = ( 31.0 * items[N - 1].y + 9.0 * items[N - 2].y - 3.0 * items[N - 3].y - 5.0 * items[N - 4].y + 3.0 * items[N - 5].y) / 35.0;
            }
            this.trackItems = outArr;
            this.genRotation();
        }

        public getTrueDistance() {
            let distance = 0;
            for(let i=0;i<this.trackItems.length-1;i++) {
                let item = this.trackItems[i];
                let nitem = this.trackItems[i + 1];
                distance += this.distance(item, nitem);
            }
            return distance;
        }

    }
}