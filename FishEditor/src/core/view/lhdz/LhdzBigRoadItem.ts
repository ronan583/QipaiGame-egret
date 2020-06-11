module game.lhdz {
	export class LhdzBigRoadItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public itemIcon: eui.Image;
		public heNum: eui.Label;
		private heNums = 0;
		private isInit = false;
		private winType = -1;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.isInit = true;
			if (this.winType != -1) {
				this.showIcon();
			}
		}

		public updateItem(winType: number) {
			this.heNum.visible = false;
			this.winType = winType;
			if (this.isInit) {
				this.showIcon();
			}
		}
		public showIcon() {
			if (this.winType == 2) {
				this.itemIcon.source = "lhdz_battle_json.dl_item_red";
			} else if (this.winType == 1) {
				this.itemIcon.source = "lhdz_battle_json.dl_item_blue";
			}
		}

		public addHeNum() {
			if (!this.heNum.visible) {
				this.heNum.visible = true;
			}
			this.heNums++;
			if (this.winType == 2) {
				this.heNum.textColor = 0xe5532c;
			} else if (this.winType == 1) {
				this.heNum.textColor = 0x6c87d8;
			}
			this.heNum.text = this.heNums + '';
		}
	}
}