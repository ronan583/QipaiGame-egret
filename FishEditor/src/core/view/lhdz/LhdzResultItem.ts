module game.lhdz {
	export class LhdzResultItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public itemIcon: eui.Image;
		public stakeType: number;
		public isInit: boolean = false;
		public winType: number;

		protected childrenCreated(): void {
			super.childrenCreated();
			if (this.winType != null) {
				this.updateItem(this.winType);
			}
			this.isInit = true;
		}
		public updateItem(winType: number) {
			if (this.isInit) {
				this.showItems(winType);
			}
		}

		public showItems(winType) {
			this.stakeType = winType;
			switch (winType) {
				case 2: {
					this.itemIcon.source = "lhdz_battle_json.lhdz_tiger";
					break;
				}
				case 1: {
					this.itemIcon.source = "lhdz_battle_json.lhdz_dragon";
					break;
				}
				case 3: {
					this.itemIcon.source = "lhdz_battle_json.lhdz_draw";
					break;
				}
			}
		}
	}
}