module game {
	export class ModuleLoader {
		private static _instance: ModuleLoader;
		public static getInstance(): ModuleLoader {
			if (ModuleLoader._instance == null) {
				ModuleLoader._instance = new ModuleLoader();
			}
			return ModuleLoader._instance;
		}
		public constructor() {
		}

		private loadSuc:boolean = false;
		private curGameType:number = 0;
		private func:Function;
		private funcObj:any;
		private loadedGrouArr:Array<game.ChildGameType> = [];


		private getGameResLoadInfo(type: game.ChildGameType): any {
			let resUrl: string = "";
			let resGroup: string = "";
			let resPreloadUrl: string = "";
			let resPreloadGroup: string = "";
			if (type == ChildGameType.DDZ) {
				resUrl = "assets/ddz/ddz.res.json";
				resPreloadUrl = "assets/ddz/ddz_preload.res.json";
				resGroup = "ddz";
				resPreloadGroup = "ddz_preload"
			}
			if (type == ChildGameType.LHDZ) {
				resUrl = "assets/lhdz/lhdz.res.json";
				resPreloadUrl = "assets/lhdz/lhdz_preload.res.json";
				resGroup = "lhdz";
				resPreloadGroup = "lhdz_preload"
			}
			if (type == ChildGameType.PDK) {
				resUrl = "assets/pdk/pdk.res.json";
				resGroup = "pdk";
				resPreloadUrl = "assets/pdk/pdk_preload.res.json";
				resPreloadGroup = "pdk_preload"
			}
			if (type == ChildGameType.HHDZ) {
				resUrl = "assets/hhdz/hhdz.res.json";
				resGroup = "hhdz";
				resPreloadUrl = "assets/hhdz/hhdz_preload.res.json";
				resPreloadGroup = "hhdz_preload"
			}
			if (type == ChildGameType.DZPK) {
				resUrl = "assets/dzpk/dzpk.res.json";
				resGroup = "dzpk";
				resPreloadUrl = "assets/dzpk/dzpk_preload.res.json";
				resPreloadGroup = "dzpk_preload"
			}
			if (type == ChildGameType.ERMJ) {
				resUrl = "assets/ermj/ermj.res.json";
				resGroup = "ermj";
				resPreloadUrl = "assets/ermj/ermj_preload.res.json";
				resPreloadGroup = "ermj_preload"
			}
			if (type == ChildGameType.BY) {
				resUrl = "assets/by/by.res.json";
				resGroup = "by";
				resPreloadUrl = "assets/by/by_preload.res.json";
				resPreloadGroup = "by_preload"
			}
			if (type == ChildGameType.BJL) {
				resUrl = "assets/bjl/bjl.res.json";
				resGroup = "bjl";
				resPreloadUrl = "assets/bjl/bjl_preload.res.json";
				resPreloadGroup = "bjl_preload"
			}
			if (type == ChildGameType.FRUIT) {
				resUrl = "assets/fruit/fruit.res.json";
				resGroup = "fruit";
				resPreloadUrl = "assets/fruit/fruit_preload.res.json";
				resPreloadGroup = "fruit_preload"
			}
			if (type == ChildGameType.TGPD) {
				resUrl = "assets/tgpd/tgdz.res.json";
				resGroup = "candyGame";
				resPreloadUrl = "assets/tgpd/tgdz_preload.res.json";
				resPreloadGroup = "tgdz_preload"
			}
			if (type == ChildGameType.DUOBAO) {
				resUrl = "assets/duobao/duobao.res.json";
				resGroup = "duobao";
				resPreloadUrl = "assets/duobao/duobao_preload.res.json";
				resPreloadGroup = "duobao_preload"
			}
			if (type == ChildGameType.ZJH) {
				resUrl = "assets/zjh/zjh.res.json";
				resGroup = "zjh";
				resPreloadUrl = "assets/zjh/zjh_preload.res.json";
				resPreloadGroup = "zjh_preload"
			}
			if (type == ChildGameType.BRNN) {
				resUrl = "assets/brnn/brnn.res.json";
				resGroup = "brnn";
				resPreloadUrl = "assets/brnn/brnn_preload.res.json";
				resPreloadGroup = "brnn_preload"
			}
			if (type == ChildGameType.QYNN) {
				resUrl = "assets/qznn/qznn.res.json";
				resGroup = "qznn";
				resPreloadUrl = "assets/qznn/qznn_preload.res.json";
				resPreloadGroup = "qznn_preload"
			}
			if (type == ChildGameType.DiceBao) {
				resUrl = "assets/tb/tb.res.json";
				resGroup = "tb";
				resPreloadUrl = "assets/tb/tb_preload.res.json";
				resPreloadGroup = "tb_preload"
			}
			if(type == ChildGameType.BCBM)
			{
				resUrl = "assets/bcbm/bcbm.res.json";
				resGroup = "bcbm";
				resPreloadUrl = "assets/bcbm/bcbm_preload.res.json";
				resPreloadGroup = "bcbm_preload"
			}
			if (type == ChildGameType.FQZS) {
				resUrl = "assets/fqzs/fqzs.res.json";
				resGroup = "fqzs";
				resPreloadUrl = "assets/fqzs/fqzs_preload.res.json";
				resPreloadGroup = "fqzs_preload"
			}
			return { resUrl: resUrl, resGroup: resGroup, resPreloadUrl: resPreloadUrl, resPreloadGroup: resPreloadGroup };
		}

		public IsResLoaded(gameType:game.ChildGameType) {
			/*
			let resData = this.getGameResLoadInfo(gameType);
			if (resData.resUrl != "" && resData.resGroup != "") {
				if (!RES.isGroupLoaded(resData.resGroup)) {
					return false;
				}
			}
			*/
			return this.loadedGrouArr.indexOf(gameType) >= 0;
		}

		public loadRes(type: ChildGameType, func: Function, funcObj: any) {
			this.errorCount = 0;
			let resData = this.getGameResLoadInfo(type);
			if (resData.resUrl != "" && resData.resGroup != "") {
				if (!RES.hasRes(resData.resGroup) || !RES.isGroupLoaded(resData.resGroup)) {
					/*
					不用以前的加载进度条使用每个游戏不同的启动动画
					const loadingView = ResLoading.instance;
					ResLoading.instance.init();
					egret.MainContext.instance.stage.addChild(loadingView);
					*/
					this.curGameType = type;
					this.func = func;
					this.funcObj = funcObj;
					new CustomLoader().loadGroupAndRes("resource/" + resData.resPreloadUrl, resData.resPreloadGroup,
						this.onPreloadAnimComplete, this, type, null, this.onError, this);
					/*
					await this.loadResByPath(resUrl, resGroup, type);
					if(this.loadSuc) {
						if(func != null && funcObj != null) {
							func.call(funcObj, type);
						}
					} else {
						CommonUtil.noticeMsg("游戏资源有误，需要重新更新");
					}
					*/
				}
			}
		}
		private errorCount: number = 0;
		private onPreloadAnimComplete() {
			//显示启动动画
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_LOAD, this.curGameType);
			let resData = this.getGameResLoadInfo(this.curGameType);
			let gameLoadMediator:GameLoadMediator = <GameLoadMediator>game.AppFacade.getInstance().retrieveMediator(GameLoadMediator.NAME);
			new CustomLoader().loadGroupAndRes("resource/" + resData.resUrl, resData.resGroup,
				this.onComplete, this, this.curGameType, gameLoadMediator.curActiveLoadScene, this.onError, this);
				// this.onComplete, this, this.curGameType, null, this.onError, this);
		}

		private onComplete() {
			// 记录资源已经加载
			this.loadedGrouArr.push(this.curGameType);
			if(this.func) {
				this.func.call(this.funcObj, this.curGameType);
				game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_GAME_LOAD);
			}
			this.errorCount = 0;
		}

		private onError() {
			this.errorCount++;
			if (this.errorCount > 2) {
				// 资源下载失败还需要更新
				if (ResLoading.instance.parent)
					egret.MainContext.instance.stage.removeChild(ResLoading.instance);
				GameInfoMng.instance.getGameInfo(this.curGameType).curGamePackVersion = "";
				GameInfoMng.instance.getGameInfo(this.curGameType).complete = false;
				game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_GAME_ICONS);
			} else {
				let resData = this.getGameResLoadInfo(this.curGameType);
				new CustomLoader().loadGroupAndRes("resource/" + resData.resUrl, resData.resGroup,
					this.onComplete, this, this.curGameType, null, this.onError, this);
			}
		}

		public destoryRes(type: ChildGameType): void {
			var resGroup: string = "";
			if (type == ChildGameType.DDZ) {
				resGroup = "ddz";
			}
			if (resGroup != "") {
				RES.destroyRes(resGroup);
			}
		}

		public async loadResByPath(resPath: string, name: string, type: game.ChildGameType) {
			try {
				RES.setMaxLoadingThread(1);
				const loadingView = ResLoading.instance;
				ResLoading.instance.init();
				egret.MainContext.instance.stage.addChild(loadingView);
				await RES.loadConfig("resource/" + resPath, "resource/");
				egret.log("config " + resPath + " load complete");
				egret.log("res " + name + " load start");
				// await RES.loadGroup(name, 0 , loadingView);
				egret.log("res" + name + " load complete");
				egret.MainContext.instance.stage.removeChild(loadingView);
				this.loadSuc = true;
			}
			catch (e) {
				console.error(e);
				this.loadSuc = false;
				// 资源下载失败还需要更新
				if (ResLoading.instance.parent)
					egret.MainContext.instance.stage.removeChild(ResLoading.instance);
				GameInfoMng.instance.getGameInfo(type).curGamePackVersion = "";
				GameInfoMng.instance.getGameInfo(type).complete = false;
				game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_GAME_ICONS);
			}
		}

	}
}