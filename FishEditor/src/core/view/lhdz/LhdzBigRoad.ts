module game.lhdz {
	export class LhdzBigRoad extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
		}

		public winFails: number[];
		public bigRoadRowLists: LhdzBigRowList[] = [];
		public roadGroup: eui.Group;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			//this.bigRoadRowLists = [];
		}

		public addItem(type: number): boolean {
			var currRowList: LhdzBigRowList;
			if (this.bigRoadRowLists.length > 0) {
				currRowList = this.bigRoadRowLists[this.bigRoadRowLists.length - 1];
				if (currRowList.stakeType == type || type == 3) {
					return currRowList.addItem(type);
				} else {
					this.createNewRow(type);
				}
			} else {
				if (type == 3) {
					return false;
				}
				this.createNewRow(type);
			}

			return true;
		}

		private createNewRow(type) {
			var currRowList: LhdzBigRowList;
			currRowList = new LhdzBigRowList();
			currRowList.stakeType = type;
			var lastRowList = this.bigRoadRowLists[this.bigRoadRowLists.length - 1];
			if (this.bigRoadRowLists.length > 0 && lastRowList.changeColNum < lastRowList.bigRoadItems.length) {
				currRowList.changeColNum = lastRowList.changeColNum - 1;
			}
			this.bigRoadRowLists.push(currRowList);
			this.roadGroup.addChild(currRowList);
			currRowList.removeChildren();
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