module game.brnn {
	export class BrnnRankItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public itemBG : eui.Image;
		public topIcon : eui.Image;
		public rankNumLabel : eui.BitmapLabel;
		public headIcon : eui.Image;
		public headFrameIcon : eui.Image;
		public moneyLabel : eui.BitmapLabel;
		public betNumLabel : eui.BitmapLabel;
		public winNumLabel : eui.BitmapLabel;
		public vipLevelIcon : eui.Image;
		public userAccountLabel : eui.Label;
		private isInit = false;
		private data : any;
		private rank : number = -1;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.isInit = true;
			if(this.data != null)
			{
				this.initItem();
			}
		}
		public initData(rank ,  data : any)
		{
			this.data = data;
			this.rank = rank;
			if(this.isInit)
			{
				this.initItem();
			}
		}

		public initItem()
		{
			this.userAccountLabel.text = this.data.nickName;
			this.vipLevelIcon.source = "vip_" + this.data.vipLevel; 
			this.headIcon.source = "gp_head_" + this.data.headNum;
			this.headFrameIcon.source = "gp_headframe_0_" + (this.data.headNum < 6 ? 2: 1);
			this.moneyLabel.text = this.data.money.toFixed(2);
			this.winNumLabel.text = this.data.winCount + " 局";
			this.betNumLabel.text = this.data.stake + " 元";
			if(this.rank == 0)
			{
				this.topIcon.visible = true;
				this.rankNumLabel.visible = false;
				this.topIcon.source = "brnnGame_json.star";
			}else
			{
				if(this.rank <= 8)
				{
					this.topIcon.visible = true;
					this.rankNumLabel.visible = false;
					this.topIcon.source = "brnnGame_json.rich_" + this.rank;
				}else
				{
					this.rankNumLabel.visible = true;
					this.topIcon.visible = false;
					this.rankNumLabel.text = this.rank.toString();
				}
			}
		}
	}
}