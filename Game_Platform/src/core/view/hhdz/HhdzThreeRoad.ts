module game.hhdz {
	export class HhdzThreeRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public roadRowLists: HhdzThreeRowList[];
		public roadGroup: eui.Group;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.roadRowLists = [];
		}
		public addItem(type: number, sourcePath): boolean {
		var currRowList: HhdzThreeRowList;
			if (this.roadRowLists.length > 0) {
				currRowList = this.roadRowLists[this.roadRowLists.length - 1];
				if (currRowList.stakeType == type) {
					currRowList.addItem(type, sourcePath);
				} else {
					this.createNewRow(type, sourcePath);
				}
			} else {
				this.createNewRow(type, sourcePath);
			}
			return true;
		}


		private createNewRow(type, sourcePath) {
			var currRowList: HhdzThreeRowList = new HhdzThreeRowList();
			currRowList.stakeType = type;
			var lastRowList = this.roadRowLists[this.roadRowLists.length - 1];
			if (this.roadRowLists.length > 0 && lastRowList.changeColNum < lastRowList.roadItems.length) {
				currRowList.changeColNum = lastRowList.changeColNum - 1;
			}
			this.roadRowLists.push(currRowList);
			this.roadGroup.addChild(currRowList);
			currRowList.removeChildren();
			currRowList.addItem(type, sourcePath);
			if (this.roadRowLists.length > 35) {
				this.roadGroup.removeChildAt(0);
				this.roadRowLists.splice(0, 1);
			}
		}

		public clear() {
			for (var i = 0; i < this.roadRowLists.length; i++) {
				this.roadRowLists[i].clear();
			}
			this.roadRowLists.splice(0, this.roadRowLists.length);
			this.roadGroup.removeChildren();
		}
	}
}