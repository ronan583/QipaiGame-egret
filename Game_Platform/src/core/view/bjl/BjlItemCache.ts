module game.bjl {
	export class BjlItemCache {
		private static _instance:BjlItemCache;
		public static get instance():BjlItemCache {
			if(BjlItemCache._instance == null) {
				BjlItemCache._instance = new BjlItemCache();
			}
			return BjlItemCache._instance;
		}
		public constructor() {
		}

		private list:Array<any> = [];
		private bigRaodNodelist:Array<any> = [];

		public push(item:any) {
			this.list.push(item);
		}

		public pushBigRoadNode(item: any) {
			this.bigRaodNodelist.push(item);
		}

		private pop():any {
			if(this.list.length > 0) {
				let item = this.list[this.list.length - 1];
				this.list.splice(this.list.length - 1, 1);
				return item;
			}
			return null;
		}

		private popBigRoadNode():any {
			if(this.bigRaodNodelist.length > 0) {
				let item = this.bigRaodNodelist[this.bigRaodNodelist.length - 1];
				this.bigRaodNodelist.splice(this.bigRaodNodelist.length - 1, 1);
				return item;
			}
			return null;
		}

		public createBjlResultItem():BjlResultItem {
			let item:BjlResultItem = this.pop();
			if(!item) {
				item = new BjlResultItem();
			}
			return item;
		}

		public createBigRoadNode():BjlBigRoadItem {
			let item:BjlBigRoadItem = this.popBigRoadNode();
			if(!item) {
				item = new BjlBigRoadItem();
			} else {
				item.reset();
			}
			return item;
		}
	}
}