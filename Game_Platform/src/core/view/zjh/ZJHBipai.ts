import ZJHData = game.zjh.ZJHData;

class ZJHBipai extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private pkAnim: game.CommonDB;
	private animGroup: eui.Group;
	private leftNode: eui.Group;
	private rightNode: eui.Group;

	private selfWin: boolean;
	private targetHead: HeadIcon;
	private otherHead: HeadIcon;

	private func: Function;
	private funcObj: any;

	private bipaiData: any = null;

	public showAnim(bipaiData: any, targetHead: HeadIcon, otherHead: HeadIcon) {
		this.visible = true;
		this.bipaiData = bipaiData;
		this.targetHead = targetHead;
		this.otherHead = otherHead;
		if (!this.pkAnim) {
			this.pkAnim = new game.CommonDB("zjh_pk_ske_dbbin", "zjh_pk_tex_json", "zjh_pk_tex_png", "animation", 1000);
			this.animGroup.addChild(this.pkAnim);
			this.pkAnim.x = this.animGroup.width / 2;
			this.pkAnim.y = this.animGroup.height / 2;
		} else {
			this.animGroup.addChild(this.pkAnim);
			this.pkAnim.restartRunAnim();
		}
		CommonUtil.registerTimeOut(this.showResult2, this, 100);
		CommonUtil.registerTimeOut(this.showResult, this, 1000);
		
	}

	private showResult2() {
		if (this.bipaiData.otherPlayerId = UserService.instance.playerId) {		//自己的头像永远在左边
			this.otherHead.tweenMoveTo(this.getLeftGlobalPos());
			this.targetHead.tweenMoveTo(this.getRightGlobalPos());
		} else {
			this.targetHead.tweenMoveTo(this.getLeftGlobalPos());
			this.otherHead.tweenMoveTo(this.getRightGlobalPos());
		}
		CommonUtil.registerTimeOut(() => {
			if (this.bipaiData.winPlayerId == this.targetHead.playerInfo.playerId) {
				this.otherHead.showPkWin();
			} else {
				this.targetHead.showPkWin();
			}
		}, this, 200);
	}

	public getLeftGlobalPos() {
		return this.leftNode.localToGlobal(0, 0);
	}

	public getRightGlobalPos() {
		return this.rightNode.localToGlobal(0, 0);
	}

	private showResult() {
		this.targetHead.backState();
		this.otherHead.backState();
		// game.AppFacade.getInstance().sendNotification(CommonDataNotify.UPDATE_ZJH_BATTLE_INFO);
		game.AppFacade.getInstance().sendNotification(PanelNotify.ZJH_FOLD_CARDS, this.bipaiData.failPlayerId);
		game.AppFacade.getInstance().sendNotification(PanelNotify.ZJH_SHOW_TIPS, { "playerId": this.bipaiData.failPlayerId, "status": 4 });

		CommonUtil.registerTimeOut(() => {
			this.hideAll();
			if (this.func) {
				this.func.call(this.funcObj);
			}
		}, this, 200)
	}

	private hideAll() {
		this.visible = false;
	}

	public addCompleteCall(func: Function, funcObj: any) {
		this.func = func;
		this.funcObj = funcObj;
	}

}
