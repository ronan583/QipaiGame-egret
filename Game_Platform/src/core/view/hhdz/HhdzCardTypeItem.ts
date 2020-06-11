module game.hhdz {
	export class HhdzCardTypeItem extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzCardTypeItem.exml";
		}

		public bg: eui.Image;
		public newImg: eui.Image;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public show(cardType: number, isNew: boolean = false): void {
			this.bg.source = "hhdz_game_json.hhdz_history_cardtype_" + cardType;
			this.newImg.visible = isNew;
		}
	}
}