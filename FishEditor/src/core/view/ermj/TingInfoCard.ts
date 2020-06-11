module game.ermj {
	export class TingInfoCard extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/TingInfoCard.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public cardIcon: eui.Image;
		public fanLabel: eui.Label;
		public numLabel: eui.Label;

		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}