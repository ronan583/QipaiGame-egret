module game.bjl {
	export class BjlResultItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public itemIcon : eui.Image;
		public blueDuiIcon : eui.Image;
		public redDuiIcon : eui.Image;
		public stakeType : BjlStakeTpye;
		public isInit : boolean = false;
		public winType : number[];

		protected childrenCreated():void
		{
			super.childrenCreated();
			if(this.winType != null)
			{
				this.updateItem(this.winType);
			}
			this.isInit = true;
		}

		public updateItem(winType : number[])
		{
			this.winType = winType;
			if(this.isInit)
			{
				this.showItems(winType);
			}
		}

		public showItems(winType){
			this.blueDuiIcon.visible = this.redDuiIcon.visible = false;
			for(var i = 0 ; i < winType.length ; i++)
			{
				switch(winType[i])
				{
					case   BjlStakeTpye.he:{
						this.itemIcon.source = "bjlGame_json.hlssm_luzi_item_5_3";
						this.stakeType = winType[i];
						break;
					}
					case   BjlStakeTpye.yaxian:{
						this.itemIcon.source = "bjlGame_json.hlssm_luzi_item_5_2";
						this.stakeType = winType[i];
						break;
					}
					case   BjlStakeTpye.yazhuang:{
						this.itemIcon.source = "bjlGame_json.hlssm_luzi_item_5_1";
						this.stakeType = winType[i];
						break;
					}
					case   BjlStakeTpye.xiandui:{
						this.blueDuiIcon.visible = true;
						break;
					}
					case   BjlStakeTpye.zhuangdui:{
						this.redDuiIcon.visible = true;
						break;
					}
				}
			}
		}
	}
}