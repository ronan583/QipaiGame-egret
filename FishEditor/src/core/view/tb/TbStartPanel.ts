module game.tb {
	export class TbStartPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbStartPanelSkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public items : TbCornerItem[] = [];
		public _scroller : eui.Scroller;
		public itemGroup : eui.Group;
		public radioGroup : TbStartPanelRadioGroup;
		private roomTop:RoomTop;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.roomTop.backFunc = this.onBackHall;
            this.roomTop.backFuncObj = this;
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
            }

		}

		public showUI()
		{
			// this.goldNum.text = UserService.instance.money.toFixed(2);
		}

		public initUI(data)
		{
			this.clearTimeout();
			this.itemGroup.removeChildren();
			this.items.splice(0,this.items.length);
			var cornerItem : TbCornerItem;
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
				cornerItem = new TbCornerItem();
				// cornerItem.scaleX = cornerItem.scaleY = 0.95;
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
							TbRequest.requestSingleRoom(this.items[i].roomId);
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
				TbRequest.requestRoomList(0);
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
						this.items[i].initData(data.roomInfos);
					}
				}
			}
		}

		// private onBRNNBtnClick(index:number) : void {
		// 	// 发送进入房间协议
		// 	RoomRequest.sendEnterRoomInfo(game.ChildGameType.BRNN, index);
		// }

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