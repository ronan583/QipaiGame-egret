module game.bjl {
	export class BjlYueyouRoad extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public roadRowLists : BjlYueyouRowList[];
		public roadGroup : eui.Group;
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.roadRowLists = [];
		}
		public addItem(type : BjlStakeTpye):boolean
		{
			var currRowList : BjlYueyouRowList;
			if(this.roadRowLists.length > 0)
			{
				currRowList = this.roadRowLists[this.roadRowLists.length - 1];
				if(currRowList.stakeType == type)
				{
					currRowList.addItem(type);
				}else
				{
					this.createNewRow(type);
				}
			}else{
				if(type == BjlStakeTpye.he)
				{
					return false;
				}
				this.createNewRow(type);
			}
			return true;
		}


		private createNewRow(type)
		{
			var currRowList = new BjlYueyouRowList();
			currRowList.stakeType = type;
			this.roadRowLists.push(currRowList);
			this.roadGroup.addChild(currRowList);
			currRowList.removeChildren();
			currRowList.addItem(type);

			if(this.roadRowLists.length > 24)
			{
				this.roadGroup.removeChildAt(0);
				this.roadRowLists.splice(0,1);
			}
		}

		public clear()
		{
			for(var i = 0 ; i < this.roadRowLists.length ; i++)
			{
				this.roadRowLists[i].clear();
			}
			this.roadRowLists.splice(0,this.roadRowLists.length);
			this.roadGroup.removeChildren();
		}

	}
}