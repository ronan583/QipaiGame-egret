module game.hhdz {
	export class HhdzBigRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public winFails: number[];
		public bigRoadRowLists: HhdzBigRowList[] = [];
		public roadGroup: eui.Group;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public addItem(type: number): boolean {
			//
			var currRowList: HhdzBigRowList;
			if (this.bigRoadRowLists.length > 0) {
				currRowList = this.bigRoadRowLists[this.bigRoadRowLists.length - 1];
				if (currRowList.stakeType == type) {
					return currRowList.addItem(type);
				} else {
					this.createNewRow(type);
				}
			} else {

				this.createNewRow(type);
			}

			return true;
		}

		private createNewRow(type) {
			var currRowList: HhdzBigRowList;
			currRowList = new HhdzBigRowList();
			currRowList.stakeType = type;
			var lastRowList = this.bigRoadRowLists[this.bigRoadRowLists.length - 1];
			if (this.bigRoadRowLists.length > 0 && lastRowList.changeColNum < lastRowList.bigRoadItems.length) {
				currRowList.changeColNum = lastRowList.changeColNum - 1;
			}
			this.bigRoadRowLists.push(currRowList);
			this.roadGroup.addChild(currRowList);
			currRowList.addItem(type);
			if (this.bigRoadRowLists.length > 24) {
				this.roadGroup.removeChildAt(0);
				this.bigRoadRowLists.splice(0, 1);
			}
		}

		public clear() {
			for (var i = 0; i < this.bigRoadRowLists.length; i++) {
				this.bigRoadRowLists[i].clear();
			}
			this.bigRoadRowLists.splice(0, this.bigRoadRowLists.length);
			this.roadGroup.removeChildren();
		}


		private updateRoad(data) {

		}
	}
}