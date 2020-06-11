module game.by {

	export class TrackItem {
		public x:number;
		public y:number;
		public r:number;
		public l:number;
	}

	export class TrackCfg {
		public constructor() {
		}
		public trackIndex:number = 0;
		public trackItems:Array<TrackItem>;

		public setData(data:string):void {
			var strs:string[] = data.split("\n");
			this.trackItems = [];
			for(let str of strs) {
				let ss:string[] = str.split(",");
				var trackItem:TrackItem = new TrackItem();
				trackItem.x = Number(ss[0]);
				trackItem.y = Number(ss[1]);
				trackItem.r = Number(ss[2]);
				trackItem.l = Number(ss[3]);
				this.trackItems.push(trackItem);
			}
		}

		public getTrackItem(cursor:number):TrackItem {
			return this.trackItems[cursor];
		}

		public count():number {
			return this.trackItems.length;
		}

	}
}