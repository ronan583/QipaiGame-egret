module game.bjl {
	export class BjlBigRoadItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public itemIcon : eui.Image;
		public heNumIcon : eui.Image;
		private heNum = 0;
		private isInit = false;
		private winType = -1;
		private playerHeLabel:eui.Label;
		private bankerHeLabel:eui.Label;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.isInit = true;
			if(this.winType != -1)
			{
				this.showIcon();
			}
		}

		public updateItem(winType : number)
		{
			this.winType = winType;
			if(this.isInit)
			{
				this.showIcon();
			}
		}
		public showIcon()
		{
			this.heNumIcon.visible = false;
			if(this.winType == BjlStakeTpye.yaxian)
			{
				this.itemIcon.source = "hlssm_luzi_item_1_2";
			}else if(this.winType == BjlStakeTpye.yazhuang)
			{
				this.itemIcon.source = "hlssm_luzi_item_1_1";
			}
		}

		public addHeNum()
		{
			this.heNum++;
			// this.heNumIcon.source = "bjlGame_json.lzt_item_dl" + this.heNum;
			if(this.winType == BjlStakeTpye.yaxian)
			{
				this.playerHeLabel.visible = true;
				this.playerHeLabel.text = this.heNum.toFixed(0);
			} else if(this.winType == BjlStakeTpye.yazhuang)
			{
				this.bankerHeLabel.visible = true;
				this.bankerHeLabel.text = this.heNum.toFixed(0);
			}
		}
		public reset() {
			this.bankerHeLabel.visible = false;
			this.playerHeLabel.visible = false;
		}
	}
}