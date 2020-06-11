import ModuleLoader = game.ModuleLoader;
import AppFacade = game.AppFacade;

class GameIcon extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.showIcon();
		// this.updateInfo.visible = false;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameIconClick, this);
		this.updateImg.visible = false;
		this.tempShape = new egret.Shape();
		this.updateGroup.addChild(this.tempShape);
		this.updateCdImg.mask = this.tempShape;
		this.tempShape.rotation = -90;
		this.tempShape.x = this.updateCdImg.x + this.updateCdImg.width / 2;
		this.tempShape.y = this.updateCdImg.y + this.updateCdImg.height / 2;
		this.updateGroup.visible = false;
		this.updateInfo.visible = false;
		//this.setChildIndex(this.updateInfo, this.numChildren + 1);
		this.testStartTime = egret.getTimer();
		// egret.startTick(this.updateTest, this);

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchEffect, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEffect, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapEffect, this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEffect, this);

		if (this.anchorOffsetX == 0 && this.anchorOffsetY == 0) {

			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
			this.x += this.anchorOffsetX;
			this.y += this.anchorOffsetY;
		}


		this.shanguangAnim = new game.CommonDB("shanguang_ske_dbbin", "shanguang_tex_json", "shanguang_tex_png",
			"animation", 1500, false, { "func": this.nextAnim, "caller": this });
		this.shanguangGroup.addChild(this.shanguangAnim);
		this.shanguangAnim.visible = false;
	}

	private shanguangGroup: eui.Group;
	public updateImg: eui.Image;
	private gameIconMask: eui.Image;
	private gameIconImg: eui.Image;
	public updateInfo: eui.Label;
	public game: game.ChildGameType = game.ChildGameType.NONE;
	private tempShape: egret.Shape;
	public updateGroup: eui.Group;
	public updateCdImg: eui.Image;
	public updateBg:eui.Image;
	private testStartTime: number;
	private shanguangAnim: game.CommonDB;

	private qynnRoom: QynnStartPanel;
	private brnnRoom: game.brnn.BrnnStartPanel;
	private lhdzRoom: game.lhdz.LhdzStartPanel;
	private hhdzRoom: game.hhdz.NHhdzStartPanel;
	private ermjzRoom: game.ermj.ErmjStartPanel;
	private bjlRoom: game.bjl.BjlStartPanel;
	private tgpdRoom: game.tgpd.NTgpdRoomUI;
	private diceBaoRoom: game.tb.TbStartPanel;
	private bcbmRoom: game.bcbm.BcbmRoomUI;


	private updateTest(timestamp: number): boolean {
		this.showProgress((timestamp - this.testStartTime) / 1000, 100);
		return true;
	}

	private hideAll() {
		for (let i = 1; i <= 17; i++) {
			if (this["gameIconImg" + i]) this["gameIconImg" + i].visible = false;
			//this["gameIconMask" + i].visible = false;
		}
	}

	private hideAllMask() {
		for (let i = 1; i <= 17; i++) {
			// this["gameIconMask" + i].visible = false;
		}
	}

	public showIcon(): void {
		this.hideAll();
		let iconStr = game.GameConst.getGameIconRes(this.game);
		this.gameIconImg = this["gameIconImg" + this.game];
		//this.gameIconMask = this["gameIconMask" + this.game];
		this["gameIconImg" + this.game].visible = true;
		//this["gameIconMask" + this.game].visible = false;
	}

	private onGameIconClick(): void {
		SoundMenager.instance.playEffect("gameClick_mp3")
		if (game.GameInfoMng.instance.isGameNeedUpdate(this.game)) {
			game.GameInfoMng.instance.updateGame(this.game);
		} else {
			if(ModuleLoader.getInstance().IsResLoaded(this.game)) {
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_ON_RES_COMPLETE, this.game);
				this.openGameTruely(this.game);
			} else {
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME, this.game);
				ModuleLoader.getInstance().loadRes(this.game, this.openGameTruely, this);
			}
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
				var tgpdMediator = new game.tgpd.TgpdBattleMediator();
				AppFacade.getInstance().registerMediator(tgpdMediator);
			}
			if (this.tgpdRoom == null){
				this.tgpdRoom = new game.tgpd.NTgpdRoomUI();
			}
			if(tgpdMediator != null){
				tgpdMediator.tgpdRoom = this.tgpdRoom;
			}
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

	public refresh(): void {
		if (game.GameInfoMng.instance.isGameNeedUpdate(this.game)) {
			//this["gameIconMask" + this.game].visible = true;
			this.updateGroup.visible = true;
			this.updateCdImg.visible = false;
			// this.showProgress(15,100);
		} else {
			//this["gameIconMask" + this.game].visible = false;
		}
	}

	public showProgress(downloadSize: number, totalSize: number): void {
		this.updateGroup.visible = true;
		this.updateInfo.visible = true;
		this.updateCdImg.visible = true;
		this.updateCdImg.source = "download_game_bg_png";
		this.updateBg.source = "download_game_bg_png";
		let percent: number = downloadSize / totalSize;
		if(isNaN(percent)) {
			this.updateInfo.text = "0%";
		} else {
			this.updateInfo.text = (percent * 100).toFixed(0) + "%";
		}
		
		let angle: number =Math.max(0.01, Math.min(percent, 0.95)) * 360;
		angle = angle % 360;
		console.log("angle eeeeeeeeeeeeeee " + angle)
		this.changeGraphics(angle, this.tempShape);
	}

	private changeGraphics(angle, shape: egret.Shape) {
		shape.graphics.clear();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.moveTo(0, 0);
		// shape.graphics.lineTo(100, 50);
		//shape.graphics.drawArc(this.updateCdImg.width / 2, this.updateCdImg.height / 2, 
		//	90, -90 * Math.PI / 180, (angle - 90) * Math.PI / 180, false);
		shape.graphics.drawArc(0, 0,
			90, 0, angle * Math.PI / 180, true);
		shape.graphics.lineTo(0, 0);

		shape.graphics.endFill();
	}

	public completeUpdate(): void {
		this.updateImg.visible = false;
		this.updateGroup.visible = false;
		this.updateInfo.visible = false;
		this.hideAllMask();
		// CommonUtil.noticeMsg(game.GameConst.getGameName(this.game) + "更新完成");
		CommonUtil.noticeGameUpdateCompleteMsg(game.GameConst.getGameName(this.game));
	}
	private onTapEffect(event: egret.TouchEvent): void {
		SoundMenager.instance.PlayClick();
	}

	public resetBtnStatus(): void {
		if (this.filters) {
			this.filters = null;
			var sign: number = this.gameIconImg.scaleX / Math.abs(this.gameIconImg.scaleX);
			egret.Tween.get(this.gameIconImg).to({ scaleX: 1 * sign, scaleY: 1 }, 50, egret.Ease.sineOut);
		}

	}

	private OnTouchEffect(event: egret.TouchEvent): void {
		var sign: number = this.scaleX / Math.abs(this.scaleX);

		switch (event.type) {
			case egret.TouchEvent.TOUCH_BEGIN:
				var colorMatrix = [
					1, 0, 0, 0, 50,
					0, 1, 0, 0, 50,
					0, 0, 1, 0, 50,
					0, 0, 0, 1, 0
				];
				var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
				this.filters = [colorFlilter];
				egret.Tween.get(this).to({ scaleX: 0.95 * sign, scaleY: 0.95 }, 80, egret.Ease.sineIn);
				break;

			case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
			case egret.TouchEvent.TOUCH_END:
			case egret.TouchEvent.TOUCH_CANCEL:
				this.filters = null;
				egret.Tween.get(this).to({ scaleX: 1 * sign, scaleY: 1 }, 50, egret.Ease.sineOut);
				break;
		}

	}

	private _nextNode: GameIcon;
	private _iscontinueAnim: boolean = true;
	public setNextLineNode(gameIcon: GameIcon): void {
		this._nextNode = gameIcon;
	}
	public beginAnimPlay() {
		if (!this.visible) return;
		this.shanguangGroup.addChild(this.shanguangAnim);
		this.shanguangAnim.restartRunAnim();
		this.shanguangAnim.visible = true;
	}
	public nextAnim() {
		if (this._nextNode && this._iscontinueAnim) {
			this._nextNode.beginAnimPlay();
		}
	}
	public clearAnim() {
		this._iscontinueAnim = false;
	}
	public enableAnim() {
		this._iscontinueAnim = true;
	}
}