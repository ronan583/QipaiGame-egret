module game.lhdz {
	export class LhdzResultRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public resultGroup: eui.Group;
		public bjlResultItems: LhdzResultItem[] = [];


		protected childrenCreated(): void {
			super.childrenCreated();
		}


		public updateRoad(winTypes) {
			var bjlResultItem: LhdzResultItem;
			var filterNum = 0;
			if (winTypes.length > 48) {
				filterNum = winTypes.length - 48;
			}
			this.resultGroup.removeChildren();
			for (var i = 0; i < winTypes.length; i++) {
				if (i < filterNum) {
					continue;
				}
				if (this.resultGroup.numChildren >= i - filterNum + 1) {
					bjlResultItem = <LhdzResultItem>this.resultGroup.getChildAt(i - filterNum);
				} else {
					bjlResultItem = new LhdzResultItem();
					this.resultGroup.addChild(bjlResultItem);
					this.bjlResultItems.push(bjlResultItem);
				}
				bjlResultItem.updateItem(winTypes[i]);
			}
		}

		public addItem(data) {
			var bjlResultItem: LhdzResultItem;
			bjlResultItem = new LhdzResultItem();
			this.resultGroup.addChild(bjlResultItem);
			this.bjlResultItems.push(bjlResultItem);
			bjlResultItem.updateItem(data);
			if (this.bjlResultItems.length > 48) {
				this.bjlResultItems.splice(0, 1);
				this.resultGroup.removeChildAt(0);
			}
		}

		public getLastResultItem(): LhdzResultItem {
			if (this.bjlResultItems.length > 0) {
				return this.bjlResultItems[this.bjlResultItems.length - 1];
			}
			return null;
		}

		public clear() {
			this.resultGroup.removeChildren();
			this.bjlResultItems.splice(0, this.bjlResultItems.length);
		}

	}
}