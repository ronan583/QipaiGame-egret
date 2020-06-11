module game {
	export class GameScene extends ResizePanel {
		private uicompletelist: Array<UICompleteCallback> = [];
		private isComponentInited:boolean = false;
		public notifyObj:any;
		public notifyFunc:Function;
		private _openComplete:boolean = false;

		public gameType:ChildGameType;

		public constructor() {
			super();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		public get Inited() {
			return this._openComplete;
		}

		protected addToStage(){
            super.addToStage();
			if(this.isComponentInited) {
				this.onOpen();
				this._openComplete = true;
				for(let f of this.uicompletelist) {
					this[f.funcname].call(this);
				}
				this.uicompletelist = [];

				this.notify();
			}
			if(RoomUI.curActiveRoomUI && RoomUI.curActiveRoomUI.stage) {
				RoomUI.curActiveRoomUI.parent.removeChild(RoomUI.curActiveRoomUI)
			}
        }

		protected childrenCreated():void
        {
            super.childrenCreated();
			this.componentInit();
			this.onOpen();
			this.isComponentInited = true;
			this._openComplete = true;
			for(let f of this.uicompletelist) {
                this[f.funcname].call(this);
            }
            this.uicompletelist = [];
			this.notify();
		}

		private notify() {
			if(this.notifyObj && this.notifyFunc) {
				this.notifyFunc.call(this.notifyObj);
			}
		}

		protected componentInit() {

		}

		protected onOpen() {

		}

		protected onLeave() {
			this._openComplete = false;
			game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HELP_UI);
			game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BANKERLIST);
			SoundMenager.instance.stopEffectOrVoiceImm();
			game.DeliverNetWorker.instance.dropAllNet();
			// 离开游戏场景之后 room data 通用重置
			RoomManager.getInstance().curRoomData = null;
		}

		public refreshPlayerInfo() {
			
		}

		public callAfterUIInit(funcname: string) {
            if(this.isComponentInited) {
                this[funcname].call(this);
            } else {
                this.uicompletelist.push(new UICompleteCallback(funcname));
            }
        }

		public setTimeOut(func:Function, timeout:number):game.TickTimeOut{
			return CommonUtil.registerTimeOut(func, this, timeout);
		}

		public clearAllTimeOut() {
			CommonUtil.removeTimeout(this);
		}

		private removeStage() {
			if(game.RoomUI.curActiveRoomUI && !game.RoomUI.curActiveRoomUI) {
				PopUpManager.addPopUp(game.RoomUI.curActiveRoomUI);
			}
			CommonUtil.removeTimeout(this);
			this.onLeave();
		}
		
		public handleBankDrawMoney(drawmoney:number, totalmoney:number) {
			
		}

	}
}