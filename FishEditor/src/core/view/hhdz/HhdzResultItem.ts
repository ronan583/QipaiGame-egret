module game.hhdz {
	export class HhdzResultItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzResultItemSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public itemIcon: eui.Image;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public showItems(winType) {
			switch (winType) {
				case 2: {
					this.itemIcon.source = "hhdz_history_json.hhdz_history_black_dian_2";
					break;
				}
				case 1: {
					this.itemIcon.source = "hhdz_history_json.hhdz_history_red_dian_2";
					break;
				}
			}
		}
	}
}