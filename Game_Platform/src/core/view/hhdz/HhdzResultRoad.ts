module game.hhdz {
	export class HhdzResultRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public resultGroup: eui.Group;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public updateRoad(winTypes) {
			this.resultGroup.removeChildren();
			var hhdzResultItem: HhdzResultItem;
			var filterNum = 0;
			if (winTypes.length > 72) {
				filterNum = winTypes.length - 72;
			}
			for (var i = filterNum; i < winTypes.length; i++) {
				hhdzResultItem = new HhdzResultItem();
				hhdzResultItem.showItems(winTypes[i]);
				this.resultGroup.addChild(hhdzResultItem);
			}
		}
	}
}