module game.tb {
	export class TbCornerItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbCornerItem.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public cornerPanel : TbCornerPanel;
		// public gameLevelLabel : eui.Label;
		public recountLabel : eui.Label;
		public statusLabel : eui.Label;
		public enterGameBtn : IButton;
		public totalNumLabel :eui.Label;
		public bigNumLabel :eui.Label;
		public smallNumLabel :eui.Label;
		public baoZiNumLabel :eui.Label;
		
		public roomLevelLabel : eui.BitmapLabel;

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
				this.statusLabel.text = "结算中";
			}
			//倒计时			
			if(data.downTime > 0)
			{
				this.countDown.startCountDown(data.downTime);
				this.registerTimeout(this.onNextStatus ,data.downTime * 1000);
			}else
			{
				this.recountLabel.text = "0";
				TbRequest.requestSingleRoom(this.roomId); 
			}
			this.cornerPanel.UpdateCorner(data.roundInfos);
			this.totalNumLabel.text=this.cornerPanel.totalNum.toString();
			this.bigNumLabel.text=this.cornerPanel.bigNum.toString();
			this.smallNumLabel.text=this.cornerPanel.smallNum.toString();
			this.baoZiNumLabel.text=this.cornerPanel.baoZiNum.toString();
		}

		public updateRoomTitle(index)
		{
			this.roomLevelLabel.text = this.getName();
		}
		
		public getName() : string
		{
			switch(this.gameLevel)
			{
				case 0:
				{
					return "体验场";
				}
				case 1:
				{
					return "普通场";
				}
				case 2:
				{  
					return "贵宾场";
				}
				case 3:
				{
					return "豪华场";
				}
			}
			return "房间";
		}

		public onNextStatus()
		{
			this.recountLabel.text = "0";
			this.registerTimeout(function(){
				TbRequest.requestSingleRoom(this.roomId);
			}, 1000);
		}

		public onEnterGame(event)
		{
			var lType = 0;
			lType = this.roomId;
			//发送进入游戏协议
			UserService.roomId = this.roomId;
			UserService.instance.roomOrder = this.roomOrder;
			RoomRequest.sendEnterRoomInfo(game.ChildGameType.DiceBao ,this.gameLevel);
			AppFacade.instance.sendNotification(PanelNotify.CLOSE_TB_START_UI);
			AppFacade.instance.sendNotification(PanelNotify.OPEN_WAITLOADING_PANEL,"请求数据中...");
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