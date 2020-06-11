module game.brnn {
	export class BrnnStartPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		// public backBtn : IButton;
		// public roomBtn0 : IButton;
		// public roomBtn1 : IButton;
		// public roomBtn2 : IButton;
		public items : BrnnCornerItem[] = [];

		public goldNum : eui.Label;
		// public backBtn : IButton;
		public _scroller : eui.Scroller;
		public itemGroup : eui.Group;
        private addMoneyBtn:eui.Button;
		public radioGroup : BrnnStartPanelRadioGroup;
		public currLevel : number;
		private roomTop:RoomTop;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.roomTop.backFunc = this.onBackHall;
            this.roomTop.backFuncObj = this;

			// this.roomBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtn0, this);
			// this.roomBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtn1, this);
			// this.roomBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtn2, this);
			// this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBackHall , this);
		}

		public showUI()
		{
			this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		public initUI(data)
		{
			this.clearTimeout();
			this.itemGroup.removeChildren();
			this.items.splice(0,this.items.length);
			var cornerItem : BrnnCornerItem;
			this.radioGroup.updateStateByIndex(0);
			var level0Index = 0;
			var level1Index = 0;
			var level2Index = 0;
			var level3Index = 0;
			data.sort((itemData1 , itemData2 )=>
			{
				if(itemData1.gameLevel == itemData2.gameLevel)
				{
					return itemData1.order - itemData2.order;
				}
				return itemData1.gameLevel - itemData2.gameLevel;
			});
			for(var i = 0 ; i < data.length ; i++)
			{
				cornerItem = new BrnnCornerItem();
				cornerItem.scaleX = cornerItem.scaleY = 0.95;
				this.itemGroup.addChild(cornerItem);
				this.items.push(cornerItem);
				cornerItem.initData(data[i]);
				switch(cornerItem.gameLevel)
				{
					case 0:
					{
						level0Index++;
						cornerItem.updateRoomTitle(level0Index);
						break;
					}case 1:
					{
						level1Index++;
						cornerItem.updateRoomTitle(level1Index);
						break;
					}case 2:
					{
						level2Index++;
						cornerItem.updateRoomTitle(level2Index);
						break;
					}case 3:
					{
						level3Index++;
						cornerItem.updateRoomTitle(level3Index);
						break;
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
		public updateSingleRoom(data)
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				if(this.items[i].roomId == data.roomInfos[0].roomId)
				{
					this.items[i].countDown.stop();
					this.items[i].clearAllTimeOut();
					if(this.items[i].parent != null)
					{
						this.items[i].initData(data.roomInfos[0]);
					}
				}
			}
		}

		private onBRNNBtnClick(index:number) : void {
			// 发送进入房间协议
			RoomRequest.sendEnterRoomInfo(game.ChildGameType.BRNN, index);
		}

		public onBackHall()
		{
			egret.Tween.get(this).to({x:this.width},500,egret.Ease.cubicOut); 
			game.AppFacade.instance.sendNotification(PanelNotify.BACK_HALL);
			PopUpManager.removePopUp(this);
		}
		
		public clearTimeout()
		{
			for(var i = 0 ; i < this.items.length ; i++)
			{
				this.items[i].clearAllTimeOut();
			}
		}

	}
}