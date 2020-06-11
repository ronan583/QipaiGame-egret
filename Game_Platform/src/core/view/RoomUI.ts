module game {
	export class RoomUI extends ResizePanel {

		public static curActiveRoomUI:RoomUI;

		private uicompletelist: Array<UICompleteCallback> = [];
		private isComponentInited:boolean = false;
		public notifyObj:any;
		public notifyFunc:Function;

		public selectGameLevel:number = 0;
		private gameType:ChildGameType;
		protected itemDatas:Array<GameRuleItem>
		public constructor(gameType:game.ChildGameType) {
			super();
			this.gameType = gameType;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		public get Inited() {
			return this.isComponentInited;
		}

		protected addToStage(){
            super.addToStage();
			if(this.isComponentInited) {
				this.onOpen();
				for(let f of this.uicompletelist) {
					this[f.funcname].call(this);
				}
				this.uicompletelist = [];
				this.notify();
			}
			RoomUI.curActiveRoomUI = this;
        }

		protected childrenCreated():void
        {
            super.childrenCreated();
			this.componentInit();
			this.onOpen();
			this.isComponentInited = true;
			
			for(let f of this.uicompletelist) {
                this[f.funcname].call(this);
            }
            this.uicompletelist = [];
			this.notify();
			if(this['backBtn']) {
				this['backBtn'].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackCheck, this);
			}
		}

		private notify() {
			if(this.notifyObj && this.notifyFunc) {
				this.notifyFunc.call(this.notifyObj);
			}
		}

		private onBackCheck() {
			if(Global.IS_SDK_MODE) {
			   egret.ExternalInterface.call("leaveGame", "");
		   }
	   }

		protected componentInit() {

		}

		protected onOpen() {
			this.itemDatas = GameRuleData.Instance.getGameRuleItems(this.gameType);
			if(this.itemDatas.length == 0) {
				RoomRequest.reqGameRule(this.gameType);
			} else {
				this.refreshItems(this.itemDatas)
			}
		}

		protected onLeave() {
			
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

		public setTimeOut(func:Function, timeout:number) {
			CommonUtil.registerTimeOut(func, this, timeout);
		}

		public clearAllTimeOut() {
			CommonUtil.removeTimeout(this);
		}

		private removeStage() {
			CommonUtil.removeTimeout(this);
			this.onLeave();
		}

		public refreshItems(items:Array<GameRuleItem>) {

		}

		public refreshItemsByData() {
			this.itemDatas = GameRuleData.Instance.getGameRuleItems(this.gameType);
			this.refreshItems(this.itemDatas);
		}
		
	}
}