module game.bcbm {
	export class BcbmHistoryIcon extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bcbm/BcbmHistoryIcon.exml"
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			// this.anchorOffsetX = this.width/2;
			//this.anchorOffsetY = this.height/2;
		}

		public icon: eui.Image;
	}
}