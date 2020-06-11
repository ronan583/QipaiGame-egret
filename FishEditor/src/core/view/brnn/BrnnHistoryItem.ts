module game.brnn {
	export class BrnnHistoryItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public result1 : eui.Image;
		public result2 : eui.Image;
		public result3 : eui.Image;
		public result4 : eui.Image;
		private isInit = false;
		private data : any;
		private resultArr : eui.Image[];

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.resultArr = [this.result1, this.result2 , this.result3,this.result4];
			this.isInit = true;
			if(this.data != null)
			{
				this.initItem();
			}
		}

		public initData(data : any)
		{
			this.data = data;
			if(this.isInit)
			{
				this.initItem();
			}
		}


		private initItem()
		{
			for(var i = 0 ; i < this.data.length ; i++)
			{
				if(this.data[i])
				{
					this.resultArr[i].source ="brnn_win_flag";
				}else
				{
					this.resultArr[i].source ="brnn_lose_flag";
				}
			}
		}
	}
}