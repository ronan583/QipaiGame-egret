class GameHelper {
	public constructor() {
	}

	private static _instance:GameHelper;
	public static get instance():GameHelper {
		if(!GameHelper._instance) {
			GameHelper._instance = new GameHelper();
		}
		return GameHelper._instance;
	}

	private qynnRoom: QynnStartPanel;
	private brnnRoom: game.brnn.BrnnStartPanel;
	private lhdzRoom: game.lhdz.LhdzStartPanel;
	private hhdzRoom: game.hhdz.NHhdzStartPanel;
	private ermjzRoom: game.ermj.ErmjStartPanel;
	private bjlRoom: game.bjl.BjlStartPanel;
	private tgpdRoom: game.tgpd.NTgpdRoomUI;
	private diceBaoRoom: game.tb.TbStartPanel;
	private bcbmRoom: game.bcbm.BcbmRoomUI;


	public enterGame(gameType:game.ChildGameType) {
		if(ModuleLoader.getInstance().IsResLoaded(gameType)) {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_ON_RES_COMPLETE, gameType);
			this.openGameTruely(gameType);
		} else {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME, gameType);
			ModuleLoader.getInstance().loadRes(gameType, this.openGameTruely, this);
		}
	}

	private openGameTruely(gameType: game.ChildGameType): void {
		if (ResLoading.instance && ResLoading.instance.stage) {
			ResLoading.instance.parent.removeChild(ResLoading.instance);
		}
		if (gameType == game.ChildGameType.ZJH) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJH_ROOM_UI);
		} else if (gameType == game.ChildGameType.BRNN) {
			if (AppFacade.getInstance().retrieveMediator(game.brnn.BrnnStartPanelMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.brnn.BrnnStartPanelMediator());
			}
			AppFacade.instance.sendNotification(PanelNotify.OPEN_BRNN_START_UI);

		} else if (gameType == game.ChildGameType.DDZ) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DDZ_ROOM_UI);
		} else if (gameType == game.ChildGameType.PDK) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_PDK_ROOM_UI);
		} else if (gameType == game.ChildGameType.DZPK) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DZPK_ROOM_UI);
		} else if (gameType == game.ChildGameType.LHDZ) {

			if (AppFacade.getInstance().retrieveMediator(game.lhdz.LhdzStartMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.lhdz.LhdzStartMediator());
			}
			if (AppFacade.getInstance().retrieveMediator(game.lhdz.LhdzBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.lhdz.LhdzBattleMediator());
			}

			AppFacade.instance.sendNotification(PanelNotify.OPEN_LHDZ_START_UI);

		} else if (gameType == game.ChildGameType.HHDZ) {

			if (AppFacade.getInstance().retrieveMediator(game.hhdz.HhdzStartMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.hhdz.HhdzStartMediator());
			}
			if (AppFacade.getInstance().retrieveMediator(game.hhdz.HhdzBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.hhdz.HhdzBattleMediator());
			}

			AppFacade.instance.sendNotification(PanelNotify.OPEN_HHDZ_START_UI);
		} else if (gameType == game.ChildGameType.ERMJ) {
			if (AppFacade.getInstance().retrieveMediator(game.ermj.ErmjBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.ermj.ErmjBattleMediator());
			}

			if (this.ermjzRoom == null) {
				this.ermjzRoom = new game.ermj.ErmjStartPanel();
			}
			PopUpManager.addPopUp(this.ermjzRoom, false, 0, 0, 0);
		} else if (gameType == game.ChildGameType.BY) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BY_ROOM_UI);
		} else if (gameType == game.ChildGameType.BJL) {
			if (AppFacade.getInstance().retrieveMediator(game.bjl.BjlStartPanelMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.bjl.BjlStartPanelMediator());
			}
			if (AppFacade.getInstance().retrieveMediator(game.bjl.BjlBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.bjl.BjlBattleMediator());
			}
			AppFacade.instance.sendNotification(PanelNotify.OPEN_BJL_START_UI);
		} else if (gameType == game.ChildGameType.FRUIT) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SGJ_ROOM_UI);
		} else if (gameType == game.ChildGameType.TGPD) {
			if (AppFacade.getInstance().retrieveMediator(game.tgpd.TgpdBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.tgpd.TgpdBattleMediator());
			}
			if (this.tgpdRoom == null)
				this.tgpdRoom = new game.tgpd.NTgpdRoomUI();

			PopUpManager.addPopUp(this.tgpdRoom, false, 0, 0, 0);
		} else if (gameType == game.ChildGameType.DUOBAO) {
			AppFacade.getInstance().sendNotification(PanelNotify.OPEN_DUOBAO_ROOM_UI, true);
		} else if (gameType == game.ChildGameType.QYNN) {
			if (this.qynnRoom == null) {
				this.qynnRoom = new QynnStartPanel();
			}
			PopUpManager.addPopUp(this.qynnRoom, false, 0, 0, 0);
		} else if (gameType == game.ChildGameType.DiceBao) {
			if (AppFacade.getInstance().retrieveMediator(game.tb.TbStartPanelMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.tb.TbStartPanelMediator());
			}
			if (AppFacade.getInstance().retrieveMediator(game.tb.TbBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.tb.TbBattleMediator());
			}
			AppFacade.instance.sendNotification(PanelNotify.OPEN_TB_START_UI);
		} else if (gameType == game.ChildGameType.FQZS) {
			if (AppFacade.getInstance().retrieveMediator(game.fqzs.FqzsStartMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.fqzs.FqzsStartMediator());
			}
			if (AppFacade.getInstance().retrieveMediator(game.fqzs.FqzsBattleMediator.NAME) == null) {
				AppFacade.getInstance().registerMediator(new game.fqzs.FqzsBattleMediator());
			}
			AppFacade.instance.sendNotification(PanelNotify.OPEN_FQZS_START_UI);
		} else if (gameType == game.ChildGameType.BCBM) {
            if (AppFacade.getInstance().retrieveMediator(game.bcbm.BcbmRoomMediator.NAME) == null) {
                AppFacade.getInstance().registerMediator(new game.bcbm.BcbmRoomMediator());
            }
            if (AppFacade.getInstance().retrieveMediator(game.bcbm.BcbmBattleMediator.NAME) == null) {
                AppFacade.getInstance().registerMediator(new game.bcbm.BcbmBattleMediator());
            }
            AppFacade.instance.sendNotification(PanelNotify.OPEN_BCBM_ROOM_UI);
        }
	}

}