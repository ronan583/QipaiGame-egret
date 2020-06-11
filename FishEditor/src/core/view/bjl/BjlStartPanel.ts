module game.bjl {
	export class BjlStartPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		public item0 : StartCornerItem;
		public item1 : StartCornerItem;
		public item2 : StartCornerItem;
		public item3 : StartCornerItem;
		public item4 : StartCornerItem;
		public item5 : StartCornerItem;
		public item6 : StartCornerItem;
		public items : StartCornerItem[];
		public goldNum : eui.Label;
		public backBtn : IButton;
		public nameLabel : eui.Label;
		public _scroller : eui.Scroller;
		public itemGroup : eui.Group;
        private addMoneyBtn:eui.Button;
		public radioGroup : StartPanelRadioGroup;
		public currLevel : number;

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
        public onTestBtn(){
            RoomRequest.sendPlayerRecord(ChildGameType.BJL);
        }
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.items = [];//[this.item0,this.item1 , this.item2 , this.item3 , this.item4 , this.item5, this.item6];
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall , this);
			if(this._scroller.horizontalScrollBar != null)
            {
                this._scroller.horizontalScrollBar.autoVisibility = false;
                this._scroller.horizontalScrollBar.visible = false;
                this._scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if(this._scroller.verticalScrollBar != null)
            {
                this._scroller.verticalScrollBar.autoVisibility = false;
                this._scroller.verticalScrollBar.visible = false;
                // this._scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
                // console.log(this._scroller.scrollPolicyV);
            }
			this._scroller.throwSpeed = 0;
			this._scroller.addEventListener(eui.UIEvent.CHANGE, this.onScrollerChange, this);
			this.addMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestBtn, this);
			// this.addMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenChargePanel, this);
			this.currLevel = 0;
		}
		private tick:number = 0;
		private onScrollerChange(e:eui.UIEvent) {
			if(this.tick++ % 5 == 0) {
				for(let i=0;i<this.itemGroup.numChildren;i++) {
					let item:StartCornerItem = <StartCornerItem>this.itemGroup.getChildAt(i);
					if(item.y + 253 < this._scroller.viewport.scrollV) {
						item.visible = false;
					} else if(item.y > (this._scroller.viewport.scrollV + 534)) {
						item.visible = false;
					} else {
						item.visible = true;
					}
				}
			}
		}

		public onOpenChargePanel(event)
        {
            game.AppFacade.instance.sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
        }

		public showUI()
		{
			this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		public clearTimeout()
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				this.items[i].clearAllTimeOut();
			}
		}

		private onBackHall()
		{
			AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);  
			AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BJL_START_UI);
		}

		private removeStage() {
			for(let i=0;i<this.itemGroup.numChildren;i++) {
				let item:StartCornerItem = <StartCornerItem>this.itemGroup.getChildAt(i);
				item.clearAllTimeOut();
				item.visible = false;
			}

			CommonUtil.removeTimeout(this);
		}

		private itemData:Array<any> = [];

		private createNext(data:any,levelIndex:number, index:number) {
			CommonUtil.registerTimeOut(()=>{
				let cornerItem : StartCornerItem;
				if(index < this.itemGroup.numChildren) {
					cornerItem = <StartCornerItem>this.itemGroup.getChildAt(index);
					cornerItem.visible = true;
				} else {
					cornerItem = new StartCornerItem();
					cornerItem.scaleX = cornerItem.scaleY = 0.95;
					this.itemGroup.addChild(cornerItem);
					this.items.push(cornerItem);
				}
				cornerItem.initData(data, PanelNotify.CLOSE_BJL_START_UI);
				cornerItem.updateRoomTitle(levelIndex);

				if(cornerItem.y + 253 < this._scroller.viewport.scrollV) {
					cornerItem.visible = false;
				} else if(cornerItem.y > (this._scroller.viewport.scrollV + 534)) {
					cornerItem.visible = false;
				} else {
					cornerItem.visible = true;
				}
			}, this, 300 * index);
		}

		public initUI(data)
		{
			this.clearTimeout();
			// this.itemGroup.removeChildren();
			for(let i=0;i<this.itemGroup.numChildren;i++) {
				let item:StartCornerItem = <StartCornerItem>this.itemGroup.getChildAt(i);
				item.clearAllTimeOut();
				item.visible = false;
			}
			//this.items.splice(0,this.items.length);
			let cornerItem : StartCornerItem;
			this.radioGroup.updateStateByIndex(0);
			var level0Index = 0;
			var level1Index = 0;
			var level2Index = 0;
			var level3Index = 0;
			this.nameLabel.text = UserService.instance.name;
			data.sort((itemData1 , itemData2 )=>
			{
				if(itemData1.gameLevel == itemData2.gameLevel)
				{
					return itemData1.order - itemData2.order;
				}
				return itemData1.gameLevel - itemData2.gameLevel;
			});
			this.itemData = data;
			for(var i = 0 ; i < data.length ; i++)
			{
				switch(data[i].gameLevel)
				{
					case 0:
					{
						level0Index++;
						this.createNext(data[i],level0Index,i);
						break;
					}case 1:
					{
						level1Index++;
						this.createNext(data[i],level1Index,i);
						break;
					}case 2:
					{
						level2Index++;
						this.createNext(data[i],level2Index,i);
						break;
					}case 3:
					{
						level3Index++;
						this.createNext(data[i],level3Index,i);
						break;
					}
				}
			}
		}

		public updateSingleRoom(data)
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				if(this.items[i].roomId == data.roomInfos.roomId)
				{
					this.items[i].countDown.stop();
					this.items[i].clearAllTimeOut();
					if(this.items[i].parent != null)
					{
						this.items[i].initDataWithoutUpdateCornor(data.roomInfos , PanelNotify.CLOSE_BJL_START_UI);
					}
				}
			}
		}

		public updateGameLevel(type : string)
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				if(type == "all")
				{
					if(this.itemGroup.getChildIndex(this.items[i]) == -1)
					{
						this.itemGroup.addChild(this.items[i]);
					}
				}else
				{
					if(this.items[i].gameLevel == Number(type))
					{
						if(this.itemGroup.getChildIndex(this.items[i]) == -1)
						{
							this.itemGroup.addChild(this.items[i]);
							BjlRequest.requestSingleRoom(this.items[i].roomId);
						}
					}else
					{
						if(this.itemGroup.getChildIndex(this.items[i]) != -1)
						{
							this.itemGroup.removeChild(this.items[i]);
						}
					}
				}
			}
			this._scroller.stopAnimation();
			this._scroller.viewport.scrollV = 0;;
			
			if(type == "all")
			{
				BjlRequest.requestRoomList(0);
			}
		}
	}
}  