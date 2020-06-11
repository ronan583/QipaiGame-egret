module game.bjl {
	export class BjlResultRoad extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		public resultGroup : eui.Group;
		public bjlResultItems : BjlResultItem[];

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.bjlResultItems = [];
			for(let i=0;i < this.resultGroup.numChildren; i++) {
				BjlItemCache.instance.push(this.resultGroup.getChildAt(i));
			}
			this.resultGroup.removeChildren();
		}

		public updateRoad(data)
		{
			var bjlResultItem : BjlResultItem;
			var filterNum = 0;
			this.clear();
			if(data.length > 48)
			{
				filterNum = data.length - 48;
			}
			for(var i = 0 ; i < data.length ; i++)
			{
				if(i < filterNum)
				{
					continue;
				}
				if(this.resultGroup.numChildren >= i - filterNum + 1)
				{
					bjlResultItem = <BjlResultItem>this.resultGroup.getChildAt(i - filterNum);
				}else
				{
					// bjlResultItem = new BjlResultItem();
					bjlResultItem = BjlItemCache.instance.createBjlResultItem();
					this.resultGroup.addChild(bjlResultItem);
					this.bjlResultItems.push(bjlResultItem);
				}
				bjlResultItem.updateItem(data[i].winType);
			}
		}

		public addItem(data)
		{
			let bjlResultItem : BjlResultItem;
			// bjlResultItem = new BjlResultItem();
			bjlResultItem = BjlItemCache.instance.createBjlResultItem();
			this.resultGroup.addChild(bjlResultItem);
			this.bjlResultItems.push(bjlResultItem);
			bjlResultItem.updateItem(data);
			if(this.bjlResultItems.length > 48)
			{
				let item = this.bjlResultItems[0];
				this.bjlResultItems.splice(0,1);
				this.resultGroup.removeChildAt(0);
				BjlItemCache.instance.push(item);
			}
		}

		public getLastResultItem():BjlResultItem
		{
			if(this.bjlResultItems.length > 0)
			{
				return this.bjlResultItems[this.bjlResultItems.length - 1];
			}
			return null;
		}

		public clear()
		{
			this.resultGroup.removeChildren();
			for(let item of this.bjlResultItems) {
				BjlItemCache.instance.push(item);
			}
			this.bjlResultItems = [];
		}
	}
}