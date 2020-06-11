module game {
	export class QuickStartItem {
		public gameType:number;
		public gameLevel:number;
		public date:number;
	}
	export class QuickStartData {
		
		public constructor() {
		}

		public startItems:Array<QuickStartItem> = [];

		public getItemByGameType(gameType:ChildGameType) {
			for(let item of this.startItems) {
				if(item.gameType == gameType) {
					return item;
				}
			}
			return null;
		}

		public sortItems() {
			this.startItems.sort((a:QuickStartItem, b:QuickStartItem):number=>{
				return a.date - b.date;
			});
		}

		public getLastItem():QuickStartItem {
			if(!this.startItems || this.startItems.length == 0) return null;
			return this.startItems[this.startItems.length - 1];
		}

		public addStartItem(gameType:ChildGameType, gameLevel:number) {
			let item = this.getItemByGameType(gameType);
			if(!item) {
				item = new QuickStartItem();
				this.startItems.push(item);
			}
			item.gameType = gameType;
			item.gameLevel = gameLevel;
			item.date = new Date().getTime();
		}

	}

	export class QuickStart {
		private static _instance:QuickStart;	
		public static get instance():QuickStart {
			if(!QuickStart._instance) {
				QuickStart._instance = new QuickStart();
			}
			return  QuickStart._instance;
		}

		private startData:QuickStartData;
		private startItem:QuickStartItem;
		private recommendLevel:number = 1;
		private gameType:number = 0;

		public recordQuickStartData(gameType:ChildGameType, gameLevel:number) {
			let startData = this.getStartData();
			startData.addStartItem(gameType, gameLevel);
			startData.sortItems();
			NativeApi.setLocalData("quick_start_data", JSON.stringify(startData));
		}

		private getStartData():QuickStartData {
			if(!this.startData) {
				let str = NativeApi.getLocalData("quick_start_data");
				if(str && str != "") {
					this.startData = new QuickStartData();
					this.startData.startItems = JSON.parse(str).startItems;
					this.startData.sortItems();
				} else {
					this.startData = new QuickStartData();
				}
			}
			return this.startData;
		}

		private quickStartMultiGame(gameType:number) {
			this.gameType = gameType;
			let arr = GameCfg.getMultiGameLevelRecommend(gameType);
			this.recommendLevel = 1;
			for(let i=arr.length - 1; i>=0;i--) {
				if(UserService.instance.money >= arr[i]) {
					this.recommendLevel = i + 1;
					break;
				}
			}
		
			if(ModuleLoader.getInstance().IsResLoaded(gameType)) {
				this.onLoadComplete0();
			} else {
				ModuleLoader.getInstance().loadRes(gameType, this.onLoadComplete0, this);
			}
		}

		public quickStart(gameType:number = 0) {
			if(GameCfg.isGameInMultiDefine(gameType)) {
				this.quickStartMultiGame(gameType);
				return;
			}
			let startItem:QuickStartItem = null;
			if(gameType == 0) {
				startItem = this.getStartData().getLastItem();	
			} else {
				startItem = this.getStartData().getItemByGameType(gameType);	
				if(!startItem) {
					startItem = new QuickStartItem();
					startItem.gameType = gameType;
					startItem.gameLevel = 0;
				}
			}

			if(!startItem) {
				TipsUI.showTips({
					"text": "您还没有开始过游戏",
					"callback": this.onOk,
					"callbackObject": this,
					"tipsType": TipsType.OnlyOk
				})
			} else {
				// 优先先加载资源
				this.startItem = startItem;
				if(ModuleLoader.getInstance().IsResLoaded(this.startItem.gameType)) {
					this.onLoadComplete();
				} else {
					ModuleLoader.getInstance().loadRes(startItem.gameType, this.onLoadComplete, this);
				}
			}
		}

		private onLoadComplete() {
			if(this.startItem.gameType == ChildGameType.DUOBAO) {
				DuobaoRequest.sendEnterGame(this.startItem.gameLevel);
			} else if(this.startItem.gameType == ChildGameType.TGPD){
				AppFacade.getInstance().sendNotification(PanelNotify.OPEN_TGPD_BATTLE_UI, this.startItem.gameLevel);
			} else {
				RoomRequest.sendEnterRoomInfo(this.startItem.gameType, this.startItem.gameLevel);
			}
		}

		private onLoadComplete0() {
			RoomRequest.sendEnterRoomInfo(this.gameType, this.recommendLevel);
		}

		public helpToEnterGame(gameType:ChildGameType, gameLevel:number) {
			this.gameType = gameType;
			this.recommendLevel = gameLevel;
			if(ModuleLoader.getInstance().IsResLoaded(gameType)) {
				this.onLoadComplete0();
			} else {
				ModuleLoader.getInstance().loadRes(gameType, this.onLoadComplete0, this);
			}
		}

		private onOk() {

		}

	}
}