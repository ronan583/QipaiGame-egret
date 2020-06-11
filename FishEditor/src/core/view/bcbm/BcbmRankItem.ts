module game.bcbm {
	export class BcbmRankItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bcbm/BcbmRankItem.exml"
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public headFrameIcon: eui.Image;
		public headIcon: eui.Image;
		public playerName: eui.Label;
		public playerMoney: eui.Label;
		private data: any;
		private isInit = false;
		protected childrenCreated(): void{
			super.childrenCreated();
			this.isInit = true;
			if(this.data != null){
				this.initItem();
			}
		}
		public initData(data: any){
			console.warn("======================= is init " + this.isInit);
			this.data = data;
			if(this.isInit){
				this.initItem();
			}
		}
		public initItem(){
			this.playerName.text = this.data.nickName;
			//console.warn("----------- name is " + this.playerName.text);
			this.headIcon.source = "gp_head_" + (this.data.headNum + 1);
			this.playerMoney.text = CommonUtil.convertMonetShow(this.data.money);
		}
	}
}