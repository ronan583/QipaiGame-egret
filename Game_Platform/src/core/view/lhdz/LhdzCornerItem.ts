module game.lhdz {
	export class LhdzCornerItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		public reulstGroup : eui.Group;
		// public gameLevelLabel : eui.Label;
		public gameLevelIcon : eui.Image;
		public recountLabel : eui.Label;
		public statusLabel : eui.Label;
		public enterGameBtn : IButton;
		public cornerPanel : LhdzCornerRoad;
		public zhuangNumLabel : eui.Label;
		public xianNumLabel : eui.Label;
		public heNumLabel : eui.Label;
		public gameLevelLabel : eui.BitmapLabel;

		public countDown:game.BattleStartCountDown;
		public gameLevel : number;
		public roomId : number;
		public roomOrder : number;
		private type : number;
		private winFails:Object;		
		private timeoutIdList:Array<number> = [];
		public enterGameNotify : string;
		private isInit : boolean = false;
		private data : Object;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.countDown = new game.BattleStartCountDown();
			this.enterGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnterGame , this);
			this.countDown.countDownLabel = this.recountLabel;
			this.isInit = true;
		}

		public refresh()
		{
			this.initData(this.data);
		}

		public initData(data)
		{
			this.data = data;
			// this.enterGameNotify = enterGameNotify;
			this.gameLevel = data.gameLevel;
			this.roomId = data.roomId;
			this.roomOrder = data.order;
			this.type = data.type;
			if(data.type == 1)
			{
				this.statusLabel.text = "下注中";
			}else
			{
				this.statusLabel.text = "正在结算";
			}
			this.winFails = data.winFails;
			//倒计时			
			if(data.downTime > 0)
			{
				this.countDown.startCountDown(data.downTime);
				this.registerTimeout(this.onNextStatus ,data.downTime * 1000);
			}else
			{
				this.recountLabel.text = "0";
				LhdzRequest.requestSingleRoom(this.roomId);

			}
			var winTypes = [];
			for(var i = 0 ; i < data.winFails.length ; i++)
			{
				winTypes.push(data.winFails[i].winType)
			}
			this.cornerPanel.UpdateCorner(winTypes);
			var longNum = 0;
			var huNum = 0;
			var heNum = 0;
			var winType = null;
			for(var i = 0; i < data.winFails.length ; i++)
			{
				winType = data.winFails[i].winType;
				
				// for(var j = 0; j < winType.length ; j++)
				// {
					switch(winType)
					{
						case 1:{
							longNum++;
							break;
						}
						case 2:{
							huNum++;
							break;
						}
						case 3:{
							heNum++;
							break;
						}
					}
				// }
			}
			this.heNumLabel.text = "和 " + heNum.toString();
			this.xianNumLabel.text = "龙 " + longNum.toString();
			this.zhuangNumLabel.text = "虎 " + huNum.toString();

		}

		public updateRoomTitle(index)
		{
			var titleStr = "";
			switch(this.gameLevel)
			{
				case 0:
				{
					titleStr = "体验场";
					break;
				}case 1:
				{
					titleStr = "普通场";
					break;
				}case 2:
				{
					titleStr = "贵宾场";
					break;
				}case 3:
				{
					titleStr = "豪华场";
					break;
				}
			}
			
			this.gameLevelLabel.text = titleStr + index;
			// this.gameLevelIcon.source = "roomRes_json.level" + index + "_label";
		}

		public onNextStatus()
		{
			this.recountLabel.text = "0";
			this.registerTimeout(function(){
				LhdzRequest.requestSingleRoom(this.roomId);
			}, 1000);
		}

		public onEnterGame(event)
		{
			var lType = 0;
			// if(this.roomId <= 6)
			// {
				lType = this.roomId;
			// }
			//发送进入游戏协议
			// game.RoomManager.getInstance().bjlWinFailsData = this.winFails;
			UserService.roomId = this.roomId;
			UserService.instance.roomOrder = this.roomOrder;
			RoomRequest.sendEnterRoomInfo(ChildGameType.LHDZ ,lType);
			AppFacade.instance.sendNotification(PanelNotify.CLOSE_LHDZ_START_UI);
			AppFacade.instance.sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
			// AppFacade.getInstance().sendNotification(this.enterGameNotify);
		}
		
		private registerTimeout(func:Function, time:number):void {
			var holder:any = this;
			var timeOutId:number = egret.setTimeout(function(){
				func.call(holder);
				let index:number = this.timeoutIdList.indexOf(timeOutId);
				if(index >= 0) {
					this.timeoutIdList.splice(index, 1);
				}
			} , this , time);
			this.timeoutIdList.push(timeOutId);
		}

		public clearAllTimeOut():void {
			if(this.timeoutIdList.length > 0) {
				for(let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}
	}
}