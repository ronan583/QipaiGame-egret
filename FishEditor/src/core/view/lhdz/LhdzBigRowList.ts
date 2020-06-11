module game.lhdz {
	export class LhdzBigRowList extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public stakeType: number;
		public bigRoadItems: LhdzBigRoadItem[] = [];
		public changeColNum = 6;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public addItem(type): boolean {
			var item: LhdzBigRoadItem;
			if (type == 3) {
				item = this.bigRoadItems[this.bigRoadItems.length - 1];
				item.addHeNum();
				return false;
			} else {
				item = new LhdzBigRoadItem();
				this.addChild(item);
				this.bigRoadItems.push(item);
				item.updateItem(type);
				item.y = (this.numChildren - 1) * 21;
				if (this.bigRoadItems.length > this.changeColNum) {
					item.y = (this.changeColNum - 1) * 21;
					item.x = (this.numChildren - this.changeColNum) * 21;
				}
				return true;
			}
		}

		public clear() {
			this.bigRoadItems.splice(0, this.bigRoadItems.length);
			this.removeChildren();
		}

	}
}